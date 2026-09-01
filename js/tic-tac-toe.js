/* =========================================================
   tic-tac-toe.js — لعبة "إكس-أو" (Tic-Tac-Toe)
   =========================================================
   يحتوي: أربعة أوضاع (لاعبان / AI سهل / AI متوسط / AI صعب Minimax)،
   نظام النقاط والسجل، تأثيرات الجسيمات الاحتفالية، وربط شاشات اللعبة.

   ⚠️ يعتمد على core.js (يُحمَّل بعده — آخر الملفات).
   ========================================================= */
/* =========================================================
   لعبة إكس-أو (Tic-Tac-Toe)
   - أربعة أوضاع: لاعبان، AI سهل، AI متوسط، AI صعب (Minimax)
   - اختيار رمز اللاعب (X أو O)
   - نقاط وسجل لكل وضع على حدة، محفوظة في الجلسة
   - واجهة احتفالية + جسيمات + حركات SVG
   ========================================================= */

const TTT_MODE_LABELS = {
  pvp:    "لاعبان محلي",
  easy:   "AI سهل",
  medium: "AI متوسط",
  hard:   "AI صعب (Minimax)",
};

const TTT_WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],   // صفوف
  [0, 3, 6], [1, 4, 7], [2, 5, 8],   // أعمدة
  [0, 4, 8], [2, 4, 6],              // أقطار
];

/* حالة اللعبة */
const tttState = {
  mode: "pvp",         // pvp | easy | medium | hard
  playerSymbol: "X",   // رمز اللاعب البشري (في أوضاع AI)
  aiSymbol: "O",       // رمز الذكاء الاصطناعي
  board: Array(9).fill(null), // null | "X" | "O"
  currentTurn: "X",    // من يلعب الآن
  locked: false,       // true أثناء تفكير AI أو بعد انتهاء المباراة
  gameActive: false,
  // النقاط لكل وضع: { X, O, draw }
  scores: {
    pvp:    { X: 0, O: 0, draw: 0 },
    easy:   { X: 0, O: 0, draw: 0 },
    medium: { X: 0, O: 0, draw: 0 },
    hard:   { X: 0, O: 0, draw: 0 },
  },
  // السجل الاحترافي لكل وضع (آخر 30 مباراة)
  history: {
    pvp:    [],
    easy:   [],
    medium: [],
    hard:   [],
  },
  particlesAnim: null, // معرّف requestAnimationFrame للجسيمات
};

/* ====== تحميل/حفظ النقاط والسجل (localStorage) ====== */
const TTT_STORAGE_KEY = "millionaire_ttt_v1";

function loadTttData() {
  try {
    const raw = localStorage.getItem(TTT_STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (data && typeof data === "object") {
      if (data.scores) {
        for (const k of Object.keys(tttState.scores)) {
          if (data.scores[k]) tttState.scores[k] = { X: 0, O: 0, draw: 0, ...data.scores[k] };
        }
      }
      if (data.history) {
        for (const k of Object.keys(tttState.history)) {
          if (Array.isArray(data.history[k])) tttState.history[k] = data.history[k].slice(-30);
        }
      }
    }
  } catch (err) {
    console.warn("تعذّر تحميل بيانات إكس-أو:", err);
  }
}

function saveTttData() {
  try {
    localStorage.setItem(TTT_STORAGE_KEY, JSON.stringify({
      scores: tttState.scores,
      history: tttState.history,
    }));
  } catch {}
}

/* ====== تهيئة منتقي الوضع والرمز ====== */
let tttIntroInitialized = false;
function initTttIntro() {
  if (tttIntroInitialized) return;
  tttIntroInitialized = true;

  const modeGrid = document.getElementById("ttt-mode-grid");
  if (modeGrid) {
    modeGrid.querySelectorAll(".ttt-mode-option").forEach(btn => {
      btn.addEventListener("click", () => {
        modeGrid.querySelectorAll(".ttt-mode-option").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        tttState.mode = btn.getAttribute("data-mode");
        updateTttIntroVisibility();
        updateTttScoreboard();
      });
    });
  }

  const symGrid = document.getElementById("ttt-symbol-grid");
  if (symGrid) {
    symGrid.querySelectorAll(".ttt-symbol-option").forEach(btn => {
      btn.addEventListener("click", () => {
        symGrid.querySelectorAll(".ttt-symbol-option").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        tttState.playerSymbol = btn.getAttribute("data-symbol");
        tttState.aiSymbol = tttState.playerSymbol === "X" ? "O" : "X";
        // مزامنة منتقي شاشة النهاية إن كان مرئياً
        syncTttSymbolCards();
        // في أوضاع AI، قد تتغير قيم/تسميات الرقائق، فحدّثها
        updateTttScoreboard();
        updateTttMiniScore();
      });
    });
  }

  // الحالة الأولية
  updateTttIntroVisibility();
  updateTttScoreboard();
}

/* إظهار/إخفاء بطاقة "اختر رمزك" — تُخفى في وضع اللاعبان المحلي */
function updateTttIntroVisibility() {
  const symCard = document.getElementById("ttt-symbol-card");
  if (symCard) {
    symCard.style.display = tttState.mode === "pvp" ? "none" : "";
  }
}

/* تحديث تسميات رقائق النقاط حسب الوضع */
function updateTttLabels() {
  const isPvp = tttState.mode === "pvp";
  const setLabel = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };
  if (isPvp) {
    setLabel("ttt-score-label-X", "انتصارات X");
    setLabel("ttt-score-label-O", "انتصارات O");
    setLabel("ttt-score-label-draw", "تعادل");
    setLabel("ttt-mini-label-X", "X");
    setLabel("ttt-mini-label-O", "O");
    setLabel("ttt-mini-label-draw", "تعادل");
  } else {
    setLabel("ttt-score-label-X", "فوزك");
    setLabel("ttt-score-label-O", "خسارتك");
    setLabel("ttt-score-label-draw", "تعادل");
    setLabel("ttt-mini-label-X", "فوز");
    setLabel("ttt-mini-label-O", "خسارة");
    setLabel("ttt-mini-label-draw", "تعادل");
  }
}

/* إحصاءات اللاعب ضد AI من السجل (تتحمل تغيير الرمز) */
function getTttPlayerStats(mode) {
  const hist = tttState.history[mode] || [];
  const wins = hist.filter(h => h.playerWon === true).length;
  const losses = hist.filter(h => h.playerWon === false).length;
  const draws = hist.filter(h => h.playerWon === null || h.result === "draw").length;
  return { wins, losses, draws };
}

/* القيم المعروضة على رقائق النقاط المصغّرة حسب الوضع */
function getTttMiniDisplayValues() {
  const s = tttState.scores[tttState.mode];
  if (tttState.mode === "pvp") {
    return { X: s.X, O: s.O, draw: s.draw };
  }
  const stats = getTttPlayerStats(tttState.mode);
  return { X: stats.wins, O: stats.losses, draw: stats.draws };
}

/* مزامنة حالة active بين بطاقة intro وبطاقة شاشة النهاية */
function syncTttSymbolCards() {
  const target = tttState.playerSymbol;
  document.querySelectorAll(".ttt-symbol-option").forEach(b => {
    if (b.getAttribute("data-symbol") === target) b.classList.add("active");
    else b.classList.remove("active");
  });
}

function updateTttScoreboard() {
  const s = tttState.scores[tttState.mode];
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  // تحديث التسميات أولاً
  updateTttLabels();

  if (tttState.mode === "pvp") {
    setVal("ttt-score-X", s.X);
    setVal("ttt-score-O", s.O);
    setVal("ttt-score-draw", s.draw);
  } else {
    // في أوضاع AI: اعرض فوز/خسارة اللاعب من السجل (يتحمل تغيير الرمز)
    const stats = getTttPlayerStats(tttState.mode);
    setVal("ttt-score-X", stats.wins);
    setVal("ttt-score-O", stats.losses);
    setVal("ttt-score-draw", stats.draws);
  }

  // تلميح
  const hint = document.getElementById("ttt-intro-hint");
  if (hint) {
    const hist = tttState.history[tttState.mode] || [];
    const total = hist.length;
    if (total === 0) {
      hint.textContent = `الوضع الحالي: ${TTT_MODE_LABELS[tttState.mode]} — لا يوجد سجل بعد.`;
    } else if (tttState.mode === "pvp") {
      const xWins = hist.filter(h => h.result === "X").length;
      const oWins = hist.filter(h => h.result === "O").length;
      const draws = hist.filter(h => h.result === "draw").length;
      hint.textContent = `السجل الكلي (${TTT_MODE_LABELS[tttState.mode]}): ${total} مباراة — X: ${xWins}، O: ${oWins}، تعادل: ${draws}.`;
    } else {
      const stats = getTttPlayerStats(tttState.mode);
      hint.textContent = `السجل الكلي (${TTT_MODE_LABELS[tttState.mode]}): ${total} مباراة — فوز: ${stats.wins}، خسارة: ${stats.losses}، تعادل: ${stats.draws}.`;
    }
  }
}

/* ====== بدء المباراة ====== */
function startTttGame() {
  initTttIntro();
  // تأكد من أن رمز اللاعب ورمز AI متطابقان مع الاختيار
  tttState.aiSymbol = tttState.playerSymbol === "X" ? "O" : "X";

  // تهيئة لوحة فارغة
  tttState.board = Array(9).fill(null);
  tttState.currentTurn = "X"; // X يبدأ دائماً
  tttState.locked = false;
  tttState.gameActive = true;

  // عرض اسم الوضع
  const chip = document.getElementById("ttt-mode-name-chip");
  if (chip) chip.textContent = TTT_MODE_LABELS[tttState.mode];

  // إخفاء لوحة النهاية إن كانت ظاهرة
  const overlay = document.getElementById("ttt-end-overlay");
  if (overlay) overlay.style.display = "none";
  stopTttParticles();

  // مسح خط الفوز
  const winSvg = document.getElementById("ttt-win-line-svg");
  if (winSvg) winSvg.innerHTML = "";

  // تحديث النقاط المصغّرة
  updateTttMiniScore();

  showScreen("ttt-playing");
  renderTttBoard();
  updateTttTurnIndicator();

  // إن كان AI يبدأ (أي اللاعب اختار O)، دعه يلعب
  if (tttState.mode !== "pvp" && tttState.currentTurn === tttState.aiSymbol) {
    scheduleTttAiMove();
  }
}

/* ====== رسم اللوحة ====== */
function renderTttBoard() {
  const board = document.getElementById("ttt-board");
  if (!board) return;
  board.innerHTML = "";
  tttState.board.forEach((val, i) => {
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "ttt-cell";
    cell.setAttribute("role", "gridcell");
    cell.setAttribute("data-index", i);
    cell.style.animationDelay = (i * 0.05) + "s"; // ظهور متدرّج
    if (val) {
      cell.classList.add("filled", "mark-" + val);
      cell.innerHTML = val === "X" ? tttXSvg() : tttOSvg();
    } else if (tttState.locked || !tttState.gameActive) {
      cell.classList.add("locked");
    }
    cell.addEventListener("click", () => onTttCellClick(i));
    board.appendChild(cell);
  });
}

function tttXSvg() {
  return `<svg viewBox="0 0 100 100"><line x1="22" y1="22" x2="78" y2="78"></line><line x1="78" y1="22" x2="22" y2="78"></line></svg>`;
}
function tttOSvg() {
  return `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="30"></circle></svg>`;
}

/* ====== تحديث مؤشر الدور ====== */
function updateTttTurnIndicator() {
  const ind = document.getElementById("ttt-turn-indicator");
  const txt = document.getElementById("ttt-turn-text");
  if (!ind || !txt) return;
  ind.setAttribute("data-turn", tttState.currentTurn);

  if (!tttState.gameActive) {
    txt.textContent = "انتهت المباراة";
    return;
  }
  if (tttState.mode === "pvp") {
    txt.textContent = `دور ${tttState.currentTurn}`;
  } else {
    if (tttState.currentTurn === tttState.playerSymbol) {
      txt.textContent = `دورك (${tttState.currentTurn})`;
    } else {
      txt.textContent = `الذكاء الاصطناعي يفكّر… (${tttState.currentTurn})`;
    }
  }
}

/* ====== تحديث النقاط المصغّرة ====== */
function updateTttMiniScore() {
  const v = getTttMiniDisplayValues();
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };
  setVal("ttt-mini-X", v.X);
  setVal("ttt-mini-O", v.O);
  setVal("ttt-mini-draw", v.draw);
  // حدّث التسميات أيضاً (قد تتغير عند تبديل الوضع)
  updateTttLabels();
}

/* ====== النقر على خلية ====== */
function onTttCellClick(index) {
  if (!tttState.gameActive || tttState.locked) return;
  if (tttState.board[index] !== null) return;

  // في أوضاع AI، اللاعب يلعب فقط في دوره
  if (tttState.mode !== "pvp" && tttState.currentTurn !== tttState.playerSymbol) return;

  makeTttMove(index, tttState.currentTurn);
}

/* ====== تنفيذ حركة ====== */
function makeTttMove(index, symbol) {
  if (tttState.board[index] !== null) return false;
  tttState.board[index] = symbol;

  // أعد رسم الخلية المحددة فقط (للأداء)
  const cell = document.querySelector(`.ttt-cell[data-index="${index}"]`);
  if (cell) {
    cell.classList.add("filled", "mark-" + symbol);
    cell.innerHTML = symbol === "X" ? tttXSvg() : tttOSvg();
  }

  sounds.select();

  // تحقق من الفوز/التعادل
  const winInfo = checkTttWin(tttState.board);
  if (winInfo) {
    endTttGame(winInfo.winner, winInfo.line);
    return true;
  }
  if (tttState.board.every(v => v !== null)) {
    endTttGame("draw", null);
    return true;
  }

  // بدّل الدور
  tttState.currentTurn = tttState.currentTurn === "X" ? "O" : "X";
  updateTttTurnIndicator();

  // إن كان الدور الآن على AI، جدوِل حركته
  if (tttState.mode !== "pvp" && tttState.currentTurn === tttState.aiSymbol && tttState.gameActive) {
    scheduleTttAiMove();
  }
  return true;
}

/* ====== جدولة حركة AI مع تأخير طبيعي ====== */
function scheduleTttAiMove() {
  tttState.locked = true;
  // علّم كل الخلايا الفارغة بأنها مغلقة مؤقتاً
  document.querySelectorAll(".ttt-cell:not(.filled)").forEach(c => c.classList.add("locked"));
  updateTttTurnIndicator();

  const delay = 400 + Math.floor(Math.random() * 400); // 400-800ms
  setTimeout(() => {
    if (!tttState.gameActive) {
      tttState.locked = false;
      return;
    }
    const move = chooseTttAiMove(tttState.mode, tttState.board, tttState.aiSymbol, tttState.playerSymbol);
    tttState.locked = false;
    document.querySelectorAll(".ttt-cell.locked:not(.filled)").forEach(c => c.classList.remove("locked"));
    if (move !== null && move >= 0 && move < 9) {
      makeTttMove(move, tttState.aiSymbol);
    }
  }, delay);
}

/* ====== التحقق من الفوز ====== */
function checkTttWin(board) {
  for (const line of TTT_WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return null;
}

/* ====== اختيار حركة AI حسب الوضع ====== */
function chooseTttAiMove(mode, board, aiSymbol, humanSymbol) {
  const empty = board.map((v, i) => v === null ? i : null).filter(i => i !== null);
  if (empty.length === 0) return null;

  if (mode === "easy") {
    // حركة عشوائية
    return empty[Math.floor(Math.random() * empty.length)];
  }

  if (mode === "medium") {
    // 1. ابحث عن فرصة فوز للم AI
    const winMove = findWinningMove(board, aiSymbol);
    if (winMove !== null) return winMove;
    // 2. امنع فوز اللاعب
    const blockMove = findWinningMove(board, humanSymbol);
    if (blockMove !== null) return blockMove;
    // 3. المركز إن كان متاحاً
    if (board[4] === null) return 4;
    // 4. زاوية عشوائية
    const corners = [0, 2, 6, 8].filter(i => board[i] === null);
    if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];
    // 5. أي حركة عشوائية
    return empty[Math.floor(Math.random() * empty.length)];
  }

  if (mode === "hard") {
    // Minimax كامل — لا يُهزم
    return bestMinimaxMove(board, aiSymbol, humanSymbol);
  }

  // افتراضي
  return empty[Math.floor(Math.random() * empty.length)];
}

/* ابحث عن حركة تُنهي المباراة بالفوز للرمز المُعطى */
function findWinningMove(board, symbol) {
  for (const line of TTT_WIN_LINES) {
    const [a, b, c] = line;
    const cells = [board[a], board[b], board[c]];
    const symbolCount = cells.filter(v => v === symbol).length;
    const emptyCount = cells.filter(v => v === null).length;
    if (symbolCount === 2 && emptyCount === 1) {
      // أعِد الفهرس الفارغ
      if (board[a] === null) return a;
      if (board[b] === null) return b;
      if (board[c] === null) return c;
    }
  }
  return null;
}

/* ====== Minimax ====== */
function bestMinimaxMove(board, aiSymbol, humanSymbol) {
  let bestScore = -Infinity;
  let bestMove = null;
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = aiSymbol;
      const score = minimax(board, 0, false, aiSymbol, humanSymbol);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
}

function minimax(board, depth, isMaximizing, aiSymbol, humanSymbol) {
  const winInfo = checkTttWin(board);
  if (winInfo) {
    if (winInfo.winner === aiSymbol) return 10 - depth;
    if (winInfo.winner === humanSymbol) return depth - 10;
  }
  if (board.every(v => v !== null)) return 0; // تعادل

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = aiSymbol;
        const score = minimax(board, depth + 1, false, aiSymbol, humanSymbol);
        board[i] = null;
        if (score > best) best = score;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = humanSymbol;
        const score = minimax(board, depth + 1, true, aiSymbol, humanSymbol);
        board[i] = null;
        if (score < best) best = score;
      }
    }
    return best;
  }
}

/* ====== إنهاء المباراة ====== */
function endTttGame(result, winningLine) {
  tttState.gameActive = false;
  tttState.locked = true;

  // علّم خلايا الفوز
  if (winningLine) {
    winningLine.forEach(i => {
      const cell = document.querySelector(`.ttt-cell[data-index="${i}"]`);
      if (cell) cell.classList.add("winning");
    });
    drawTttWinLine(winningLine);
  }

  // سجّل القيم المعروضة على الرقائق *قبل* تحديث النقاط
  const prevDisplay = getTttMiniDisplayValues();

  // تحديث النقاط (حسب الرمز الفائز)
  const s = tttState.scores[tttState.mode];
  if (result === "X") s.X++;
  else if (result === "O") s.O++;
  else s.draw++;

  // أضف للسجل (يحتوي playerWon — وهو ما تعرضه رقائق وضع AI)
  pushTttHistory(tttState.mode, result);

  // القيم المعروضة *بعد* التحديث
  const newDisplay = getTttMiniDisplayValues();
  bumpTttMini("ttt-mini-X", newDisplay.X, prevDisplay.X);
  bumpTttMini("ttt-mini-O", newDisplay.O, prevDisplay.O);
  bumpTttMini("ttt-mini-draw", newDisplay.draw, prevDisplay.draw);

  // حدّث لوحة النقاط في intro أيضاً
  updateTttScoreboard();

  // صوت
  if (result === "draw") sounds.wrong();
  else sounds.win();

  // أظهر لوحة النهاية الاحتفالية
  showTttEndOverlay(result, winningLine);

  // احفظ
  saveTttData();
}

/* ارتداد رقم النتيجة عند التحديث */
function bumpTttMini(id, newVal, oldVal) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = newVal;
  if (newVal !== oldVal) {
    el.classList.remove("bump");
    // إعادة تشغيل الأنميشن
    void el.offsetWidth;
    el.classList.add("bump");
  }
}

/* رسم خط الفوز عبر SVG */
function drawTttWinLine(line) {
  const svg = document.getElementById("ttt-win-line-svg");
  if (!svg) return;
  // إحداثيات مركز كل خلية في شبكة 300×300
  // اللوحة 3×3 مع padding 8 وgap 8 — لتبسيط، نستخدم نسب مركزية
  const centers = [
    [50, 50],   [150, 50],  [250, 50],
    [50, 150],  [150, 150], [250, 150],
    [50, 250],  [150, 250], [250, 250],
  ];
  const [a, , c] = line;
  const [x1, y1] = centers[a];
  const [x2, y2] = centers[c];
  svg.innerHTML = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"></line>`;
}

/* ====== إضافة للسجل ====== */
function pushTttHistory(mode, result) {
  const entry = {
    result,                       // "X" | "O" | "draw"
    mode,
    timestamp: Date.now(),
    // في أوضاع AI، نُسجّل هل فاز اللاعب أم لا
    playerWon: tttState.mode !== "pvp"
      ? (result === tttState.playerSymbol ? true : (result === "draw" ? null : false))
      : null,
  };
  tttState.history[mode].push(entry);
  // اقتطع إلى آخر 30 مباراة
  if (tttState.history[mode].length > 30) {
    tttState.history[mode] = tttState.history[mode].slice(-30);
  }
}

/* ====== لوحة النهاية ====== */
function showTttEndOverlay(result, winningLine) {
  const overlay = document.getElementById("ttt-end-overlay");
  if (!overlay) return;
  const emoji = document.getElementById("ttt-end-emoji");
  const title = document.getElementById("ttt-end-title");
  const subtitle = document.getElementById("ttt-end-subtitle");
  const picker = document.getElementById("ttt-end-symbol-picker");

  if (result === "draw") {
    if (emoji) emoji.textContent = "🤝";
    if (title) title.textContent = "تعادل!";
    if (subtitle) subtitle.textContent = "مباراة متكافئة! حظاً أوفر في الجولة القادمة.";
  } else {
    if (emoji) emoji.textContent = "🎉";
    if (title) title.textContent = `فاز ${result}!`;
    let sub = "";
    if (tttState.mode === "pvp") {
      sub = `اللاعب ${result} يفوز بالمباراة!`;
    } else {
      if (result === tttState.playerSymbol) {
        sub = "تهانينا! لقد فزت على الذكاء الاصطناعي. 🏆";
      } else {
        sub = "خسرت أمام الذكاء الاصطناعي. حاول مرة أخرى! 💪";
      }
    }
    if (subtitle) subtitle.textContent = sub;
  }

  overlay.style.display = "";

  // منتقي الرمز يظهر فقط في أوضاع AI
  initTttEndSymbolPicker();
  if (picker) {
    picker.style.display = (tttState.mode !== "pvp") ? "" : "none";
  }
  // مزامنة حالة active مع tttState.playerSymbol الحالي
  syncTttSymbolCards();

  // أطلق الجسيمات الاحتفالية (للفوز فقط)
  if (result !== "draw") {
    startTttParticles(result);
  }
}

/* تهيئة منتقي الرمز في شاشة النهاية (مرة واحدة) */
let tttEndInitPicked = false;
function initTttEndSymbolPicker() {
  if (tttEndInitPicked) return;
  tttEndInitPicked = true;
  const grid = document.getElementById("ttt-end-symbol-grid");
  if (!grid) return;
  grid.querySelectorAll(".ttt-symbol-option").forEach(btn => {
    btn.addEventListener("click", () => {
      grid.querySelectorAll(".ttt-symbol-option").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      tttState.playerSymbol = btn.getAttribute("data-symbol");
      tttState.aiSymbol = tttState.playerSymbol === "X" ? "O" : "X";
      // مزامنة بطاقة intro
      syncTttSymbolCards();
      // القيم المعروضة قد تتغير (الفوز/الخسارة يُعاد توزيعهما)
      updateTttScoreboard();
      updateTttMiniScore();
    });
  });
}

function closeTttEnd() {
  const overlay = document.getElementById("ttt-end-overlay");
  if (overlay) overlay.style.display = "none";
  stopTttParticles();
}

/* ====== لعبة جديدة (نفس الوضع) ====== */
function newTttGame() {
  // أغلق لوحة النهاية
  closeTttEnd();
  // أعد الضبط
  tttState.board = Array(9).fill(null);
  tttState.currentTurn = "X";
  tttState.locked = false;
  tttState.gameActive = true;
  // مسح خط الفوز
  const winSvg = document.getElementById("ttt-win-line-svg");
  if (winSvg) winSvg.innerHTML = "";
  // إعادة الرسم
  renderTttBoard();
  updateTttTurnIndicator();
  updateTttMiniScore();

  // إن كان AI يبدأ
  if (tttState.mode !== "pvp" && tttState.currentTurn === tttState.aiSymbol) {
    scheduleTttAiMove();
  }
}

/* ====== إعادة الضبط (تصفير النقاط والسجل للوضع الحالي) ====== */
function resetTttScores() {
  if (!confirm(`هل تريد إعادة ضبط النقاط والسجل للوضع: ${TTT_MODE_LABELS[tttState.mode]}؟`)) return;
  tttState.scores[tttState.mode] = { X: 0, O: 0, draw: 0 };
  tttState.history[tttState.mode] = [];
  saveTttData();
  updateTttScoreboard();
  updateTttMiniScore();
  // ابدأ مباراة جديدة بعد إعادة الضبط
  newTttGame();
}

/* ====== الخروج ====== */
function exitTttGame() {
  if (!confirm("هل تريد الخروج من المباراة؟ لن تُحفظ نتيجة هذه الجولة.")) return;
  tttState.gameActive = false;
  tttState.locked = false;
  stopTttParticles();
  showScreen("ttt-intro");
  updateTttScoreboard();
}

/* ====== نظام الجسيمات (انفجار احتفالي) ====== */
function startTttParticles(winnerSymbol) {
  const canvas = document.getElementById("ttt-particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  // اضبط أبعاد اللوحة القماشية على أبعاد العنصر الأب
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, Math.floor(rect.width));
  canvas.height = Math.max(1, Math.floor(rect.height));

  const colors = winnerSymbol === "X"
    ? ["#00f0ff", "#7df9ff", "#8b5cf6", "#ffffff"]
    : ["#ff2d95", "#ff7ec0", "#8b5cf6", "#ffffff"];

  const particles = [];
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const count = 90;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const speed = 2 + Math.random() * 5;
    particles.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.5,
      size: 2 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1.0,
      decay: 0.012 + Math.random() * 0.012,
      gravity: 0.06,
    });
  }

  stopTttParticles();
  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = 0;
    for (const p of particles) {
      if (p.life <= 0) continue;
      alive++;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.life -= p.decay;

      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 12;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    if (alive > 0) {
      tttState.particlesAnim = requestAnimationFrame(tick);
    } else {
      tttState.particlesAnim = null;
    }
  }
  tttState.particlesAnim = requestAnimationFrame(tick);
}

function stopTttParticles() {
  if (tttState.particlesAnim) {
    cancelAnimationFrame(tttState.particlesAnim);
    tttState.particlesAnim = null;
  }
  const canvas = document.getElementById("ttt-particles");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

/* ====== ربط showScreen بلعبة إكس-أو ======
   نغلّف showScreen القديم لتهيئة intro عند الدخول.
*/
const originalShowScreenTtt = showScreen;
showScreen = function(name) {
  originalShowScreenTtt(name);
  if (name === "ttt-intro") {
    initTttIntro();
    updateTttScoreboard();
  }
  if (name !== "ttt-playing") {
    // أوقف الجسيمات عند مغادرة شاشة اللعب
    stopTttParticles();
  }
};

/* ====== تحميل بيانات إكس-أو عند البدء ====== */
loadTttData();

