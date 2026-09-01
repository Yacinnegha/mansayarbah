/* =========================================================
   battle.js — وضع معركة الأسئلة (لاعب ضد لاعب)
   =========================================================
   يحتوي: الاتصال بخادم Socket.IO، إنشاء الغرف والانضمام إليها،
   مزامنة الأسئلة والنقاط بين اللاعبين، مؤقت المعركة، ونتيجة المواجهة.

   ⚠️ يعتمد على core.js وmillionaire.js (يُحمَّل بعدهما).
   ========================================================= */

/* =========================================================
   وضع معركة الأسئلة (Battle Mode)
   ========================================================= */

let battleState = {
  socket: null,
  roomId: null,
  isHost: false,         // true = منشئ الغرفة (يملك صلاحية بدء اللعبة)
  myIndex: 0,            // فهرسي في مصفوفة اللاعبين
  playerName: "",
  players: [],           // مصفوفة اللاعبين: {name, score, active, answered, isMe}
  requiredPlayers: 2,    // الحد الأدنى لبدء اللعبة
  currentQuestion: null,
  currentIndex: 0,
  totalQuestions: 15,
  myAnswer: null,
  revealed: false,
  serverUrl: "",
  timerInterval: null,
  questionStartTime: 0,
  rematchRequested: false, // منع تكرار طلب إعادة المباراة على العميل
  prefetchedNextQuestion: null,  // 🚀 Prefetch: السؤال التالي المُرفق مع كشف الإجابة
};

/* --- حفظ/تحميل رابط الخادم --- */
function loadBattleServerUrl() {
  try { battleState.serverUrl = localStorage.getItem("millionaire_battle_server") || ""; } catch {}
}

function saveBattleServerUrl() {
  const url = document.getElementById("battle-server-url").value.trim().replace(/\/+$/, "");
  if (!url) {
    showBattleServerStatus("الرجاء إدخال رابط الخادم", "#ef4444");
    return;
  }
  battleState.serverUrl = url;
  try { localStorage.setItem("millionaire_battle_server", url); } catch {}
  showBattleServerStatus("✓ تم حفظ رابط الخادم", "#10b981");
  sounds.click();
}

function showBattleServerStatus(text, color) {
  const el = document.getElementById("battle-server-status");
  el.textContent = text;
  el.style.color = color;
}

/* --- تبديل التبويبات --- */
function switchBattleTab(tab) {
  sounds.click();
  document.getElementById("tab-create").classList.toggle("active", tab === "create");
  document.getElementById("tab-join").classList.toggle("active", tab === "join");
  document.getElementById("form-create").style.display = tab === "create" ? "" : "none";
  document.getElementById("form-join").style.display = tab === "join" ? "" : "none";
}

/* --- الاتصال بالخادم --- */
function connectToBattleServer() {
  return new Promise((resolve) => {
    if (!battleState.serverUrl) {
      showBattleServerStatus("الرجاء حفظ رابط الخادم أولاً", "#ef4444");
      resolve(false);
      return;
    }
    if (battleState.socket && battleState.socket.connected) {
      resolve(true);
      return;
    }

    try {
      battleState.socket = io(battleState.serverUrl, {
        transports: ["websocket"],
        reconnection: false,
      });
    } catch (err) {
      showBattleServerStatus("فشل الاتصال: " + err.message, "#ef4444");
      resolve(false);
      return;
    }

    battleState.socket.on("connect", () => {
      resolve(true);
    });

    battleState.socket.on("connect_error", (err) => {
      showBattleServerStatus("فشل الاتصال بالخادم: " + err.message, "#ef4444");
      resolve(false);
    });

    // تسجيل معالجات الأحداث
    registerBattleHandlers();

    // مهلة 5 ثوانٍ
    setTimeout(() => {
      if (!battleState.socket.connected) {
        showBattleServerStatus("انتهت مهلة الاتصال", "#ef4444");
        resolve(false);
      }
    }, 5000);
  });
}

/* --- تسجيل معالجات أحداث الخادم --- */
function registerBattleHandlers() {
  const s = battleState.socket;
  if (!s) return;

  s.on("room_created", (data) => {
    if (data.success) {
      battleState.roomId = data.roomId;
      battleState.isHost = true;
      battleState.myIndex = 0;
      battleState.requiredPlayers = data.requiredPlayers || 2;
      document.getElementById("waiting-room-id").textContent = data.roomId;
      document.getElementById("waiting-player-name").textContent = battleState.playerName;
      document.getElementById("waiting-required-players").textContent = battleState.requiredPlayers;
      showScreen("battle-waiting");
      updateWaitingScreen();
    }
  });

  s.on("room_joined", (data) => {
    if (data.success) {
      battleState.roomId = data.roomId;
      battleState.isHost = false;
      battleState.myIndex = data.playerIndex;
      document.getElementById("waiting-room-id").textContent = data.roomId;
      document.getElementById("waiting-player-name").textContent = battleState.playerName;
      showScreen("battle-waiting");
      updateWaitingScreen();
    }
  });

  s.on("players_update", (data) => {
    // تحديث قائمة اللاعبين في شاشة الانتظار
    battleState.requiredPlayers = data.requiredPlayers || battleState.requiredPlayers;
    document.getElementById("waiting-required-players").textContent = battleState.requiredPlayers;
    document.getElementById("waiting-active-count").textContent = data.activeCount;
    document.getElementById("waiting-max-players").textContent = "4";

    // اعرض قائمة اللاعبين
    const listEl = document.getElementById("waiting-players-list");
    listEl.innerHTML = "";
    data.players.forEach((p) => {
      const item = document.createElement("div");
      item.className = "waiting-player-item" + (p.index === battleState.myIndex ? " me" : "") + (p.active ? "" : " inactive");
      item.innerHTML = `<span class="waiting-player-avatar">${p.index + 1}</span>` +
        `<span class="waiting-player-name">${escapeHtml(p.name)}${p.index === 0 ? ' <span class="host-badge">منشئ</span>' : ''}</span>` +
        (p.index === battleState.myIndex ? '<span class="you-badge">أنت</span>' : '');
      listEl.appendChild(item);
    });

    // تحكم المنشئ ببدء اللعبة
    const hostControls = document.getElementById("waiting-host-controls");
    const nonHostMsg = document.getElementById("waiting-nonhost-msg");
    const startBtn = document.getElementById("waiting-start-btn");
    const startHint = document.getElementById("waiting-start-hint");

    if (battleState.isHost) {
      hostControls.style.display = "";
      nonHostMsg.style.display = "none";
      if (data.canStart) {
        startBtn.disabled = false;
        startBtn.textContent = `ابدأ اللعبة (${data.activeCount} لاعبين)`;
        startHint.textContent = `الحد الأدنى للبدء: ${data.requiredPlayers} لاعبين`;
        startHint.style.color = "#10b981";
      } else {
        startBtn.disabled = true;
        startBtn.textContent = "ابدأ اللعبة";
        startHint.textContent = `بانتظار وصول ${data.requiredPlayers} لاعبين على الأقل (الحالي: ${data.activeCount})`;
        startHint.style.color = "rgba(255,255,255,0.6)";
      }
    } else {
      hostControls.style.display = "none";
      nonHostMsg.style.display = "";
      nonHostMsg.textContent = `بانتظار أن يبدأ منشئ الغرفة اللعبة… (${data.activeCount}/${data.requiredPlayers} لاعبين)`;
    }
  });

  s.on("generating_questions", (data) => {
    document.getElementById("battle-generating-text").textContent = data.message || "جارٍ توليد الأسئلة…";
    showScreen("battle-generating");
  });

  s.on("game_start", (data) => {
    battleState.totalQuestions = data.totalQuestions || 15;
    // املأ مصفوفة اللاعبين
    battleState.players = (data.playerNames || []).map((name, i) => ({
      name,
      score: 0,
      active: data.activeFlags ? data.activeFlags[i] : true,
      answered: false,
      isMe: i === battleState.myIndex,
    }));
    // أعد ظهور زر إعادة المباراة في حال إخفاؤه من جولة سابقة بالتخلف
    const rematchBtn = document.getElementById("battle-rematch-btn");
    if (rematchBtn) {
      rematchBtn.style.display = "";
      rematchBtn.disabled = false;
    }
    // أخفِ أي زر فوز بالتخلف من جولة سابقة
    hideForfeitOffer();
    showScreen("battle-playing");
    renderBattlePlayers();
  });

  s.on("next_question", (data) => {
    // 🚀 Prefetch: إن وُجد سؤال مُجهّز مسبقاً وللإفاضل نفس الفهرس، استخدمه
    if (battleState.prefetchedNextQuestion &&
        battleState.prefetchedNextQuestion.index === data.index) {
      console.log(`[Prefetch-Battle] ⚡ استخدام السؤال المُجهّز مسبقاً بدلاً من إعادة المعالجة`);
      handleBattleQuestion(battleState.prefetchedNextQuestion);
      battleState.prefetchedNextQuestion = null;
    } else {
      handleBattleQuestion(data);
      battleState.prefetchedNextQuestion = null;
    }
  });

  s.on("player_answered", (data) => {
    if (battleState.players[data.playerIndex]) {
      battleState.players[data.playerIndex].answered = true;
      renderBattlePlayers();
    }
    // إظهار رسالة "أجاب لاعب"
    const remaining = battleState.players.filter((p) => p.active && !p.answered).length;
    if (battleState.myAnswer === null && remaining > 0) {
      const answeredCount = battleState.players.filter((p) => p.active && p.answered).length;
      showBattleAnswerStatus(`✓ أجاب ${answeredCount} لاعب — أسرع!`);
    }
  });

  s.on("question_reveal", (data) => {
    // 🚀 Prefetch: خزّن السؤال التالي إن أرفقه الخادم
    if (data.nextQuestion) {
      battleState.prefetchedNextQuestion = data.nextQuestion;
      console.log(`[Prefetch-Battle] ⚡ تم استلام السؤال التالي مسبقاً مع كشف الإجابة`);
    } else {
      battleState.prefetchedNextQuestion = null;
    }
    handleBattleReveal(data);
  });

  s.on("game_end", (data) => {
    handleBattleEnd(data);
  });

  s.on("player_left", (data) => {
    if (battleState.players[data.playerIndex]) {
      battleState.players[data.playerIndex].active = false;
      renderBattlePlayers();
    }
    if (state.screen === "battle-playing") {
      showBattleAnswerStatus(`غادر ${data.name || "لاعب"} المعركة.`);
    }
  });

  s.on("forfeit_win_offer", (data) => {
    handleForfeitWinOffer(data);
  });

  s.on("host_left", (data) => {
    stopBattleTimer();
    alert(data.message || "غادر منشئ الغرفة");
    if (battleState.socket) {
      battleState.socket.disconnect();
      battleState.socket = null;
    }
    battleState.roomId = null;
    battleState.isHost = false;
    battleState.players = [];
    showScreen("battle-lobby");
  });

  s.on("rematch_started", (data) => {
    // أعد تهيئة الحالة للاعبيين الجدد (قد يتغير الترتيب بعد إعادة البناء)
    battleState.rematchRequested = false;
    document.getElementById("rematch-waiting-msg").style.display = "none";
    // أعد ظهور زر إعادة المباراة (قد أُخفي في جولة فوز بالتخلف سابقة)
    const rematchBtn = document.getElementById("battle-rematch-btn");
    if (rematchBtn) {
      rematchBtn.style.display = "";
      rematchBtn.disabled = false;
    }
    hideForfeitOffer();
    showScreen("battle-generating");
  });

  s.on("opponent_left", () => {
    // للتوافق مع الإصدارات السابقة — لا حاجة له الآن
  });

  s.on("error_msg", (data) => {
    alert(data.message || "خطأ غير معروف");
    // إذا كان الخطأ متعلقاً بطلب إعادة المباراة، أعد تفعيل الزر
    if (battleState.rematchRequested) {
      battleState.rematchRequested = false;
      document.getElementById("battle-rematch-btn").disabled = false;
      document.getElementById("rematch-waiting-msg").style.display = "none";
    }
  });
}

/* --- إنشاء غرفة --- */
async function createBattleRoom() {
  const name = document.getElementById("create-name").value.trim();
  const roomId = document.getElementById("create-room-id").value.trim();
  const password = document.getElementById("create-password").value;
  const apiKey = document.getElementById("create-api-key").value.trim();

  if (!name) { alert("الرجاء إدخال اسمك"); return; }
  if (!roomId) { alert("الرجاء إدخال معرف الغرفة"); return; }
  if (!password) { alert("الرجاء إدخال كلمة المرور"); return; }

  // تحقق من رابط الخادم
  document.getElementById("battle-server-url").value = battleState.serverUrl;
  if (!battleState.serverUrl) {
    alert("الرجاء حفظ رابط الخادم أولاً");
    return;
  }

  const connected = await connectToBattleServer();
  if (!connected) {
    alert("فشل الاتصال بالخادم. تأكد من رابط الخادم.");
    return;
  }

  battleState.playerName = name;
  battleState.socket.emit("create_room", {
    roomId,
    password,
    apiKey,
    playerName: name,
    requiredPlayers: parseInt(document.getElementById("create-required-players").value) || 2,
  });
  sounds.click();
}

/* --- بدء اللعبة (المنشئ فقط) --- */
function hostStartGame() {
  if (!battleState.isHost) return;
  if (!battleState.socket) return;
  sounds.click();
  battleState.socket.emit("start_game", {});
}

/* --- عرض الفوز بالتخلف (عند بقاء لاعب واحد فقط) --- */
function handleForfeitWinOffer(data) {
  // اعرض اللافتة فقط في شاشة اللعب
  if (state.screen !== "battle-playing") return;

  const offerEl = document.getElementById("battle-forfeit-offer");
  if (!offerEl) return;

  // إذا لم تكن أنت اللاعب المتبقي، تجاهل (الخادم يرسل لك وحدك)
  if (data.winnerIndex !== battleState.myIndex) return;

  const remainingQuestions = data.remainingQuestions || 0;
  const infoEl = document.getElementById("forfeit-remaining-info");
  if (infoEl) {
    infoEl.textContent = remainingQuestions > 0
      ? `الأسئلة المتبقية: ${remainingQuestions}`
      : "لم تبقَ أسئلة.";
  }

  offerEl.style.display = "";
  sounds.next();
}

/* --- إخفاء عرض الفوز بالتخلف --- */
function hideForfeitOffer() {
  const offerEl = document.getElementById("battle-forfeit-offer");
  if (offerEl) offerEl.style.display = "none";
}

/* --- إرسال طلب الفوز بالتخلف فوراً --- */
function claimForfeitWinNow() {
  if (!battleState.socket) return;
  sounds.click();
  // عطّل الزر مؤقتاً لمنع النقر المزدوج
  const claimBtn = document.getElementById("forfeit-claim-btn");
  if (claimBtn) claimBtn.disabled = true;
  battleState.socket.emit("claim_forfeit_win", {});
  // الخادم سيرسل game_end والذي سيُخفي اللافتة ضمنياً عبر تغيير الشاشة
}

/* --- (مهمل) كان يُستدعى من زر 'أكمل الأسئلة' الذي أُزيل — نُبقيه للتوافق فقط --- */
function dismissForfeitOffer() {
  hideForfeitOffer();
}

/* --- طلب إعادة المباراة (أي لاعب نشط) --- */
function requestRematch() {
  if (!battleState.socket) return;
  if (battleState.rematchRequested) return;
  sounds.click();
  battleState.rematchRequested = true;
  document.getElementById("battle-rematch-btn").disabled = true;
  const msg = document.getElementById("rematch-waiting-msg");
  msg.style.display = "";
  msg.textContent = "جارٍ بدء المباراة المعادة…";
  battleState.socket.emit("request_rematch", {});
}

/* --- الانضمام لغرفة --- */
async function joinBattleRoom() {
  const name = document.getElementById("join-name").value.trim();
  const roomId = document.getElementById("join-room-id").value.trim();
  const password = document.getElementById("join-password").value;

  if (!name) { alert("الرجاء إدخال اسمك"); return; }
  if (!roomId) { alert("الرجاء إدخال معرف الغرفة"); return; }
  if (!password) { alert("الرجاء إدخال كلمة المرور"); return; }

  if (!battleState.serverUrl) {
    alert("الرجاء حفظ رابط الخادم أولاً");
    return;
  }

  const connected = await connectToBattleServer();
  if (!connected) {
    alert("فشل الاتصال بالخادم. تأكد من رابط الخادم.");
    return;
  }

  battleState.playerName = name;
  battleState.socket.emit("join_room", {
    roomId,
    password,
    playerName: name,
  });
  sounds.click();
}

/* --- مغادرة الردهة --- */
function leaveBattleLobby() {
  if (battleState.socket) {
    battleState.socket.emit("leave_room", {});
    battleState.socket.disconnect();
    battleState.socket = null;
  }
  battleState.roomId = null;
  battleState.isHost = false;
  battleState.myIndex = 0;
  battleState.players = [];
  showScreen("battle-lobby");
}

/* --- مغادرة المعركة أثناء اللعب --- */
function leaveBattleGame() {
  if (!confirm("هل تريد مغادرة المعركة؟ ستخسر إذا كانت اللعبة جارية.")) return;
  stopBattleTimer();
  hideForfeitOffer();
  if (battleState.socket) {
    battleState.socket.emit("leave_room", {});
    battleState.socket.disconnect();
    battleState.socket = null;
  }
  battleState.roomId = null;
  battleState.players = [];
  showScreen("menu");
}

/* --- استقبال سؤال جديد --- */
function handleBattleQuestion(data) {
  battleState.currentQuestion = data.question;
  battleState.currentIndex = data.index;
  battleState.myAnswer = null;
  battleState.revealed = false;
  battleState.questionStartTime = Date.now();
  // أعد ضبط حالة "أجاب" لكل اللاعبين
  battleState.players.forEach((p) => { p.answered = false; });

  // إخفاء لوحات سابقة
  document.getElementById("battle-answer-status").style.display = "none";
  document.getElementById("battle-reveal-panel").style.display = "none";
  document.getElementById("battle-reveal-panel").innerHTML = "";
  document.getElementById("battle-explanation-panel").style.display = "none";
  // ملاحظة: لا نخفي زر "فز بالتخلف الآن" — يبقى ظاهراً طوال بقاء اللاعب وحيداً

  // تمييز صامت لمصدر السؤال (AI = خلفية خضراء، بنك = خلفية زرقاء)
  const battleCard = document.querySelector(".battle-question-card");
  if (battleCard) {
    battleCard.classList.remove("source-ai", "source-bank");
    const src = data.source || (data.question && data.question.source);
    if (src === "ai") battleCard.classList.add("source-ai");
    else if (src === "bank") battleCard.classList.add("source-bank");
  }

  // عرض السؤال
  const q = data.question;
  document.getElementById("battle-q-counter").textContent = `سؤال ${data.index + 1}/${data.total}`;
  document.getElementById("battle-q-topic").textContent = q.topic || "";
  document.getElementById("battle-q-topic").style.display = q.topic ? "" : "none";

  const diffMap = { easy: "سهل (نقطة)", medium: "متوسط (نقطتان)", hard: "صعب (3 نقاط)" };
  document.getElementById("battle-q-difficulty").textContent = diffMap[q.difficulty] || "";
  document.getElementById("battle-q-points").textContent = `${q.points} نقطة`;

  document.getElementById("battle-question-text").textContent = q.q;

  // عرض الخيارات
  const grid = document.getElementById("battle-options-grid");
  grid.innerHTML = "";
  q.o.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerHTML = `<span class="option-letter">${LETTERS[i]}</span><span>${opt}</span>`;
    btn.onclick = () => submitBattleAnswer(i);
    grid.appendChild(btn);
  });

  // حدّث بطاقات اللاعبين
  renderBattlePlayers();

  // ابدأ المؤقّت
  startBattleTimer(data.timeLimit || 30);
}

/* --- إرسال إجابة --- */
function submitBattleAnswer(answerIndex) {
  if (battleState.myAnswer !== null || battleState.revealed) return;
  battleState.myAnswer = answerIndex;
  stopBattleTimer();

  const timeMs = Date.now() - battleState.questionStartTime;
  battleState.socket.emit("submit_answer", { answerIndex, timeMs });

  // علّم أنني أجبت
  if (battleState.players[battleState.myIndex]) {
    battleState.players[battleState.myIndex].answered = true;
  }

  // تعطيل الأزرار
  const buttons = document.querySelectorAll("#battle-options-grid .option-btn");
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === answerIndex) btn.classList.add("selected");
  });

  sounds.select();

  // رسالة الحالة
  const remaining = battleState.players.filter((p) => p.active && !p.answered).length;
  if (remaining > 0) {
    showBattleAnswerStatus("✓ أجبت! في انتظار بقية اللاعبين…");
  } else {
    showBattleAnswerStatus("⏳ جارٍ كشف الإجابة…");
  }
  renderBattlePlayers();
}

/* --- كشف الإجابة --- */
function handleBattleReveal(data) {
  battleState.revealed = true;
  stopBattleTimer();

  const q = battleState.currentQuestion;
  const myIdx = battleState.myAnswer;

  // تمييز الخيارات
  const buttons = document.querySelectorAll("#battle-options-grid .option-btn");
  buttons.forEach((btn, i) => {
    btn.classList.remove("selected");
    if (i === data.correctIndex) {
      btn.classList.add("correct");
    } else if (i === myIdx) {
      btn.classList.add("wrong");
    }
  });

  // حدّث نقاط اللاعبين
  if (data.scores && data.active) {
    battleState.players.forEach((p, i) => {
      if (data.scores[i] !== undefined) p.score = data.scores[i];
      if (data.active[i] !== undefined) p.active = data.active[i];
      p.answered = true; // الكشف يعني الكل أجاب أو انتهى الوقت
    });
  }
  renderBattlePlayers();

  // اعرض لوحة الكشف لكل اللاعبين
  const panel = document.getElementById("battle-reveal-panel");
  panel.innerHTML = "";
  panel.style.display = "";

  battleState.players.forEach((p, i) => {
    const row = document.createElement("div");
    row.className = "battle-reveal-row" + (p.isMe ? " me" : "") + (!p.active ? " inactive" : "");

    const nameSpan = `<span class="reveal-name">${escapeHtml(p.name)}${p.isMe ? " (أنت)" : ""}</span>`;
    const ans = data.answers[i];
    const isCorrect = data.correct[i];

    let answerSpan;
    if (!p.active) {
      answerSpan = `<span class="reveal-answer reveal-timeout">🚪 غادر المعركة</span>`;
    } else if (ans === null || ans === undefined) {
      answerSpan = `<span class="reveal-answer reveal-timeout">⏰ لم يُجب</span>`;
    } else if (isCorrect) {
      answerSpan = `<span class="reveal-answer reveal-correct">✓ ${LETTERS[ans]} — صحيحة (+${q.points})</span>`;
    } else {
      answerSpan = `<span class="reveal-answer reveal-wrong">✗ ${LETTERS[ans]} — خاطئة</span>`;
    }

    row.innerHTML = nameSpan + answerSpan;
    panel.appendChild(row);
  });

  // عرض الشرح
  if (data.explanation) {
    document.getElementById("battle-explanation-text").textContent = data.explanation;
    document.getElementById("battle-explanation-panel").style.display = "";
  }

  // إخفاء حالة الإجابة
  document.getElementById("battle-answer-status").style.display = "none";

  // أصوات — صحيحة أنا؟
  const myCorrect = data.correct[battleState.myIndex];
  const anyCorrect = data.correct.some((c) => c);
  const allCorrect = data.correct.every((c, i) => !data.active[i] || c);
  if (myCorrect) sounds.correct();
  else sounds.wrong();
}

/* --- نهاية المعركة --- */
function handleBattleEnd(data) {
  stopBattleTimer();
  hideForfeitOffer();

  // حدّث النقاط النهائية للاعبين
  if (data.scores && data.active) {
    battleState.players.forEach((p, i) => {
      if (data.scores[i] !== undefined) p.score = data.scores[i];
      if (data.active[i] !== undefined) p.active = data.active[i];
    });
  }

  // حدد ما إذا كنت فائزاً
  const isWinner = data.winners && data.winners.includes(battleState.myIndex);
  const isTie = data.isTie;
  const activeCount = battleState.players.filter((p) => p.active).length;

  let icon, title, subtitle;
  if (data.forfeitWin && isWinner) {
    // فزت بالتخلف عبر الزر الفوري
    icon = "🏆";
    title = "فزت بالتخلف!";
    subtitle = "أنهيت المعركة فوراً بعد مغادرة المنافسين.";
  } else if (activeCount === 1 && battleState.players[battleState.myIndex] && battleState.players[battleState.myIndex].active) {
    // أنا اللاعب الوحيد المتبقي — فزت بالتخلف (أكملت الأسئلة)
    icon = "🏆";
    title = "فزت بالتخلف!";
    subtitle = "غادر بقية اللاعبين المعركة وأكملت الأسئلة.";
  } else if (isTie && isWinner) {
    icon = "🤝";
    title = "تعادل!";
    subtitle = "انتهت المعركة بالتعادل بين المتصدرين!";
  } else if (isWinner) {
    icon = "🎉";
    title = "فزت!";
    subtitle = "أحسنت! تفوقت على بقية اللاعبين.";
  } else {
    icon = "💔";
    title = "خسرت";
    subtitle = "حظ أوفر في المرة القادمة.";
  }

  document.getElementById("battle-end-icon").textContent = icon;
  document.getElementById("battle-end-title").textContent = title;
  document.getElementById("battle-end-subtitle").textContent = subtitle;

  // اعرض إحصائيات جميع اللاعبين
  const statsEl = document.getElementById("battle-end-stats");
  statsEl.innerHTML = "";
  battleState.players.forEach((p, i) => {
    const stat = document.createElement("div");
    const isWinnerStat = data.winners && data.winners.includes(i);
    stat.className = "end-stat" + (isWinnerStat ? " winner" : "") + (!p.active ? " inactive" : "") + (p.isMe ? " me" : "");
    stat.innerHTML = `
      <span class="stat-label">${escapeHtml(p.name)}${p.isMe ? " (أنت)" : ""}${i === 0 ? ' 👑' : ''}</span>
      <span class="stat-value">${p.score}</span>
      ${isWinnerStat ? '<span class="winner-badge">🏆 فائز</span>' : ''}
      ${!p.active ? '<span class="left-badge">غادر</span>' : ''}
    `;
    statsEl.appendChild(stat);
  });

  if (isWinner) sounds.win();
  else if (isTie) sounds.next();
  else sounds.wrong();

  // أعد ضبط زر إعادة المباراة
  battleState.rematchRequested = false;
  document.getElementById("rematch-waiting-msg").style.display = "none";

  // عند الفوز بالتخلف (لاعب واحد متبقٍّ فقط)، أخفِ زر "إعادة المباراة"
  // لأن إعادة المباراة تتطلب لاعبين اثنين على الأقل
  const rematchBtn = document.getElementById("battle-rematch-btn");
  const isForfeitWinSituation = data.forfeitWin === true || activeCount === 1;
  if (isForfeitWinSituation) {
    rematchBtn.style.display = "none";
    rematchBtn.disabled = true;
  } else {
    rematchBtn.style.display = "";
    rematchBtn.disabled = false;
  }

  showScreen("battle-end");

  // لا تفصل Socket — نحتاجه لإعادة المباراة
}

/* --- أدوات مساعدة --- */
function renderBattlePlayers() {
  // اعرض بطاقات اللاعبين في رأس شاشة اللعب
  const container = document.getElementById("battle-players-container");
  if (!container) return;
  container.innerHTML = "";

  battleState.players.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "battle-player" +
      (p.isMe ? " me" : "") +
      (!p.active ? " inactive" : "") +
      (p.answered ? " answered" : "");
    card.innerHTML = `
      <span class="battle-player-name">${escapeHtml(p.name)}${p.isMe ? "" : ""}</span>
      <span class="battle-player-score">${p.score}</span>
      ${p.answered && p.active ? '<span class="answered-dot">✓</span>' : ''}
      ${!p.active ? '<span class="left-dot">✕</span>' : ''}
    `;
    container.appendChild(card);
  });
}

function updateWaitingScreen() {
  // يُستدعى عند فتح شاشة الانتظار — يعتمد بشكل أساسي على players_update من الخادم
  // هذه الدالة تستخدم لعرض الحالة الأولية قبل وصول أول تحديث
  document.getElementById("waiting-required-players").textContent = battleState.requiredPlayers || 2;
  document.getElementById("waiting-active-count").textContent = "1";
  document.getElementById("waiting-max-players").textContent = "4";

  // اعرض لاعباً واحداً (أنا) مؤقتاً
  const listEl = document.getElementById("waiting-players-list");
  if (listEl && !listEl.hasChildNodes()) {
    const item = document.createElement("div");
    item.className = "waiting-player-item me";
    item.innerHTML = `<span class="waiting-player-avatar">1</span>` +
      `<span class="waiting-player-name">${escapeHtml(battleState.playerName)}${battleState.isHost ? ' <span class="host-badge">منشئ</span>' : ''}</span>` +
      '<span class="you-badge">أنت</span>';
    listEl.appendChild(item);
  }

  // تحكم المنشئ
  const hostControls = document.getElementById("waiting-host-controls");
  const nonHostMsg = document.getElementById("waiting-nonhost-msg");
  if (battleState.isHost) {
    hostControls.style.display = "";
    nonHostMsg.style.display = "none";
    const startBtn = document.getElementById("waiting-start-btn");
    startBtn.disabled = true;
    startBtn.textContent = "ابدأ اللعبة";
    document.getElementById("waiting-start-hint").textContent = `بانتظار وصول ${battleState.requiredPlayers || 2} لاعبين على الأقل (الحالي: 1)`;
  } else {
    hostControls.style.display = "none";
    nonHostMsg.style.display = "";
    nonHostMsg.textContent = "بانتظار أن يبدأ منشئ الغرفة اللعبة…";
  }
}

function escapeHtml(text) {
  if (text === null || text === undefined) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* --- تهيئة محدد عدد اللاعبين الأدنى --- */
function initRequiredPlayersSelector() {
  const selector = document.getElementById("required-players-selector");
  if (!selector) return;
  const hiddenInput = document.getElementById("create-required-players");
  selector.querySelectorAll(".rp-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      selector.querySelectorAll(".rp-option").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      hiddenInput.value = btn.getAttribute("data-value");
      sounds.click();
    });
  });
}

function showBattleAnswerStatus(text) {
  const el = document.getElementById("battle-answer-status");
  el.textContent = text;
  el.style.display = "";
}

function startBattleTimer(seconds) {
  const total = seconds;
  let remaining = total;
  const valueEl = document.getElementById("battle-timer-value");
  const barEl = document.getElementById("battle-timer-bar");
  const container = document.getElementById("battle-timer-container");
  container.style.display = "";

  valueEl.textContent = remaining + " ثانية";
  valueEl.style.color = remaining <= 10 ? "#ef4444" : "#00d4ff";
  barEl.style.width = "100%";
  barEl.classList.toggle("danger", remaining <= 10);

  if (battleState.timerInterval) clearInterval(battleState.timerInterval);
  battleState.timerInterval = setInterval(() => {
    remaining--;
    if (remaining <= 0) {
      clearInterval(battleState.timerInterval);
      battleState.timerInterval = null;
      valueEl.textContent = "0 ثانية";
      barEl.style.width = "0%";
      // انتهى الوقت — إذا لم يُجب، أرسل null
      if (battleState.myAnswer === null && !battleState.revealed) {
        battleState.myAnswer = -1; // علامة على انتهاء الوقت
        battleState.socket.emit("submit_answer", { answerIndex: null, timeMs: total * 1000 });
        showBattleAnswerStatus("⏰ انتهى الوقت!");
      }
    } else {
      if (remaining <= 6) sounds.tick();
      valueEl.textContent = remaining + " ثانية";
      valueEl.style.color = remaining <= 10 ? "#ef4444" : "#00d4ff";
      barEl.style.width = (remaining / total * 100) + "%";
      barEl.classList.toggle("danger", remaining <= 10);
    }
  }, 1000);
}

function stopBattleTimer() {
  if (battleState.timerInterval) {
    clearInterval(battleState.timerInterval);
    battleState.timerInterval = null;
  }
  document.getElementById("battle-timer-container").style.display = "none";
}

/* --- تعبئة رابط الخادم عند فتح الردهة --- */
// نستخدم حدث showScreen المُعدّل
const originalShowScreen = showScreen;
showScreen = function(name) {
  originalShowScreen(name);
  if (name === "battle-lobby") {
    document.getElementById("battle-server-url").value = battleState.serverUrl;
    if (battleState.serverUrl) {
      showBattleServerStatus("✓ رابط الخادم محفوظ", "#10b981");
    } else {
      showBattleServerStatus("أدخل رابط الخادم أولاً", "rgba(255,255,255,0.5)");
    }
    // املأ خانة مفتاح API في نموذج إنشاء الغرفة بالمفتاح المحفوظ تلقائياً
    // (يمكن للاعب تعديله لاحقاً إن أراد)
    const createApiKeyInput = document.getElementById("create-api-key");
    if (createApiKeyInput && state.apiKey && !createApiKeyInput.value.trim()) {
      createApiKeyInput.value = state.apiKey;
    }
  }
  if (name === "battle-waiting") {
    updateWaitingScreen();
  }
};

