/* =========================================================
   من سيربح المليون — منطق اللعبة
   =========================================================
   تعمل اللعبة فورًا بدون مفتاح API عبر بنك أسئلة احتياطي مدمج.
   لتفعيل التوليد الحيّ للأسئلة بواسطة الذكاء الاصطناعي، ضع
   مفتاح OpenAI في المتغير AI_API_KEY بالأسفل (انظر التعليقات
   في نهاية الملف لشرح كامل وأفضل الممارسات الأمنية).
   ========================================================= */

/* =========================================================
   ⭐ إعدادات الذكاء الاصطناعي — نظام الفشل المتسلسل (Failover)
   =========================================================
   يمكنك وضع ما يصل إلى 3 مزوّدين. عند فشل المزوّد الأول
   (تجاوز حد الطلبات / خطأ شبكة / صيغة خاطئة) ينتقل تلقائياً
   إلى الثاني، فإن فشل إلى الثالث، فإن فشل الجميع يُستخدم
   بنك الأسئلة المحلي. ضع مفاتيحك في API_KEY لكل مزوّد.
   ========================================================= */
const AI_CONFIGS = [
  {
    // المزوّد الأساسي — Groq
    name: "Groq",
    API_KEY: "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",
    ENDPOINT: "https://api.groq.com/openai/v1/chat/completions",
    MODEL: "openai/gpt-oss-120b",
    // Groq لا يدعم frequency_penalty / presence_penalty
    extraParams: { temperature: 1.0, max_tokens: 300 },
  },
  {
    // المزوّد الاحتياطي الأول — DeepSeek عبر OpenRouter
    name: "OpenRouter",
    API_KEY: "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",
    ENDPOINT: "https://openrouter.ai/api/v1/chat/completions",
    MODEL: "deepseek/deepseek-chat",
    // OpenRouter يدعم معظم باراميترات OpenAI
    extraParams: { temperature: 1.0, top_p: 0.95, frequency_penalty: 0.8, presence_penalty: 0.5, max_tokens: 300 },
  },
  {
  // المزوّد الاحتياطي الثاني — Groq
    name: "Groq",
    API_KEY: "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",
    ENDPOINT: "https://api.groq.com/openai/v1/chat/completions",
    MODEL: "llama-3.3-70b-versatile",
    // Groq لا يدعم frequency_penalty / presence_penalty
    extraParams: { temperature: 1.0, max_tokens: 300 },
  },
];

// المهلة الزمنية لكل طلب (بالمللي ثانية) قبل اعتباره فاشلاً والانتقال للتالي
const AI_TIMEOUT_MS = 12000;

// عدد المحاولات لكل مزوّد قبل الانتقال للتالي (لتفادي الأسئلة المكررة)
const AI_MAX_ATTEMPTS = 3;

// بنك المواضيع المتنوّع — يُختار عشوائياً في كل طلب لإجبار النموذج
// على عدم تكرار نفس السؤال (خاصة مع النماذج الصغيرة مثل Llama-3.1-8b)
const TOPICS = [
  "جغرافيا", "تاريخ", "علوم", "رياضيات", "أدب", "فنون",
  "رياضة", "دين", "تكنولوجيا", "فضاء", "طب", "حيوانات",
  "نباتات", "طعام", "موسيقى", "أفلام", "لغات", "اقتصاد",
  "سياسة", "فلسفة", "كيمياء", "فيزياء", "فلك", "بحار ومحيطات",
  "حضارات قديمة", "شخصيات تاريخية", "عواصم ومدن", "معالم سياحية",
  "اختراعات", "اكتشافات علمية", "أساطير", "كتب وروايات",
];

// القالب المشترك لكل المزوّدين
const AI_SYSTEM_PROMPT =
  "أنت مولّد أسئلة محترف للعبة 'من سيربح المليون' باللغة العربية. " +
  "كل سؤال يجب أن يكون فريداً ومختلفاً عن أي سؤال سابق. " +
  "أعطِ الإجابة دائماً بصيغة JSON صارمة فقط بدون أي نص إضافي.";

function buildAIPrompt(difficulty, topic) {
  return `ولّد سؤالاً ثقافياً واحداً حول موضوع: «${topic}»
بمستوى صعوبة: ${difficultyLabel(difficulty)} (لعبة من سيربح المليون).

الشروط:
- سؤال أصلي ومختلف عن أي سؤال آخر.
- 4 خيارات متقاربة ومنطقية، إجابة صحيحة واحدة فقط.
- تجنّب الأسئلة المحفوظة سابقاً قدر الإمكان.

أعطِ النتيجة بصيغة JSON فقط بالشكل التالي:
{"question":"نص السؤال","options":["الخيار1","الخيار2","الخيار3","الخيار4"],"answerIndex":0}`;
}

/* ---------- إعدادات اللعبة ---------- */
const PRIZES = [
  1000, 2000, 3000, 5000, 8000,           // سهل   (1-5)
  16000, 32000, 64000,                    // متوسط (6-8)
  125000, 250000, 500000,                 // صعب   (9-11)
  1000000, 2000000, 3000000, 5000000,     // خبير  (12-15)
];
// مراحل الأمان (ضمان الجائزة عند الوصول لها)
const SAFE_LEVELS = [4, 8, 11]; // الفهارس (0-based) لـ 5000 ، 64000 ، 500000
const TOTAL_QUESTIONS = PRIZES.length; // 15

/* ---------- بنك الأسئلة الاحتياطي (تُستخدم عند غياب API) ---------- */
const FALLBACK_QUESTIONS = {
  easy: [
    { q: "كم عدد ألوان قوس قزح؟", o: ["5", "7", "9", "12"], a: 1 },
    { q: "ما عاصمة مصر؟", o: ["القاهرة", "تونس", "الدوحة", "بغداد"], a: 0 },
    { q: "كم عدد أيام الأسبوع؟", o: ["5", "6", "7", "8"], a: 2 },
    { q: "ما لون السماء في النهار الصافي؟", o: ["أخضر", "أزرق", "أحمر", "أسود"], a: 1 },
    { q: "كم عدد أرجل العنكبوت؟", o: ["6", "8", "10", "4"], a: 1 },
    { q: "ما العضو المسؤول عن ضخ الدم؟", o: ["الكبد", "الرئة", "القلب", "الكلية"], a: 2 },
    { q: "كم ثانية في الدقيقة؟", o: ["30", "45", "60", "100"], a: 2 },
    { q: "ما الحيوان الذي يُلقب بسيد الغابة؟", o: ["النمر", "الفيل", "الأسد", "الذئب"], a: 2 },
  ],
  medium: [
    { q: "في أي عام بدأت الحرب العالمية الأولى؟", o: ["1912", "1914", "1916", "1918"], a: 1 },
    { q: "من مؤلف رواية 'البؤساء'؟", o: ["ديكنز", "تولستوي", "فيكتور هوغو", "شكسبير"], a: 2 },
    { q: "ما أطول نهر في العالم؟", o: ["النيل", "الأمازون", "اليانغتسي", "المسيسيبي"], a: 0 },
    { q: "ما العنصر الكيميائي رمزه Au؟", o: ["الفضة", "الذهب", "النحاس", "الحديد"], a: 1 },
    { q: "كم عدد كواكب المجموعة الشمسية؟", o: ["7", "8", "9", "10"], a: 1 },
    { q: "من رسم لوحة الموناليزا؟", o: ["فان جوخ", "بيكاسو", "دافنشي", "مايكل أنجلو"], a: 2 },
    { q: "ما عاصمة كندا؟", o: ["تورنتو", "مونتريال", "أوتاوا", "فانكوفر"], a: 2 },
  ],
  hard: [
    { q: "ما العالم الذي صاغ نظرية النسبية العامة؟", o: ["نيوتن", "أينشتاين", "بور", "هوكينغ"], a: 1 },
    { q: "ما السنة التي هبط فيها الإنسان على القمر؟", o: ["1965", "1969", "1972", "1958"], a: 1 },
    { q: "ما أعمق خندق محيطي في العالم؟", o: ["خندق بورتوريكو", "خندق ماريانا", "خندق اليابان", "خندق ساندويتش"], a: 1 },
    { q: "من ألّف كتاب 'الأمير' في السياسة؟", o: ["أفلاطون", "مكيافيلي", "هوبز", "روسو"], a: 1 },
    { q: "ما لغة البرمجة التي طوّرها غيدو فان روسم؟", o: ["Ruby", "Python", "Java", "Go"], a: 1 },
    { q: "ما العدد الذرّي للكربون؟", o: ["4", "6", "8", "12"], a: 1 },
    { q: "في أي دولة تقع مدينة 'كوسكو' التاريخية؟", o: ["بوليفيا", "البيرو", "الإكوادور", "تشيلي"], a: 1 },
  ],
  expert: [
    { q: "ما مقدار ثابت بلانك مقرّباً (بجول·ثانية)؟", o: ["6.6×10⁻³⁴", "3×10⁸", "9.8", "1.6×10⁻¹⁹"], a: 0 },
    { q: "من الحائز على جائزة نوبل للفيزياء عام 1921؟", o: ["بور", "أينشتاين", "كوري", "بلانك"], a: 1 },
    { q: "ما اسم أصغر وحدة بنية في الحاسوب الكمومي؟", o: ["البِت", "الترانزستور", "الكيوبِت", "النانو"], a: 2 },
    { q: "ما العالم الذي اكتشف البنسلين؟", o: ["باستور", "فليمنغ", "كوخ", "ليشمان"], a: 1 },
    { q: "في أي عام سقطت الأندلس (غرناطة)؟", o: ["1453", "1492", "1517", "1500"], a: 1 },
    { q: "ما أطول عظمة في جسم الإنسان؟", o: ["الظنبوب", "عظم الفخذ", "الزند", "العضد"], a: 1 },
  ],
};

/* =========================================================
   حالة اللعبة
   ========================================================= */
const state = {
  currentIndex: 0,
  question: null,
  locked: false,           // منع النقر المزدوج أثناء الأنيميشن
  lifelines: { fifty: true, friend: true, audience: true },
  usedFallbackIndices: { easy: [], medium: [], hard: [], expert: [] },
  nextQuestionPromise: null, // وعد السؤال التالي (للـ prefetch)
  askedQuestions: new Set(),  // ⭐ تخزين الأسئلة المطروقة لمنع التكرار
};

/* =========================================================
   اختصارات DOM
   ========================================================= */
const $ = (id) => document.getElementById(id);
const els = {
  startScreen: $("start-screen"),
  gameScreen: $("game-screen"),
  endScreen: $("end-screen"),
  startBtn: $("start-btn"),
  restartBtn: $("restart-btn"),
  currentPrize: $("current-prize"),
  qNumber: $("q-number"),
  qText: $("question-text"),
  difficultyTag: $("difficulty-tag"),
  answers: $("answers"),
  assistPanel: $("assist-panel"),
  ladder: $("prize-ladder"),
  ll5050: $("ll-5050"),
  llFriend: $("ll-friend"),
  llAudience: $("ll-audience"),
  endTitle: $("end-title"),
  endMessage: $("end-message"),
  finalPrize: $("final-prize"),
};

/* =========================================================
   مساعدات عامة
   ========================================================= */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function getDifficulty(index) {
  if (index < 5)  return "easy";
  if (index < 8)  return "medium";
  if (index < 11) return "hard";
  return "expert";
}

function difficultyLabel(d) {
  return { easy: "سهل", medium: "متوسط", hard: "صعب", expert: "خبير" }[d];
}

function formatNumber(n) {
  return n.toLocaleString("en-US");
}

/* ⭐ تطبيع نص السؤال لمقارنة التشابه ومنع التكرار
   يُزيل التشكيل والمسافات الزائدة وعلامات الترقيم ويوحّد الحالة،
   فيميّز أن "ما هي عاصمة مصر؟" و"ماهي عاصمة مصر" هما نفس السؤال. */
function normalizeQuestion(text) {
  return (text || "")
    .toLowerCase()
    // إزالة التشكيل العربي
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, "")
    // توحيد أشكال الهمزات والألف
    .replace(/[إأآا]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ة/g, "ه")
    // إزالة علامات الترقيم والمسافات الزائدة
    .replace(/[؟!.,،؛:"'()\[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// هل السؤال مكرّر (مطروق سابقاً)؟
function isDuplicate(text) {
  return state.askedQuestions.has(normalizeQuestion(text));
}

// تسجيل سؤال كـ "مطروق" لمنع تكراره لاحقاً
function rememberQuestion(text) {
  state.askedQuestions.add(normalizeQuestion(text));
}

// اختيار موضوع عشوائي غير مُستخدَم حديثاً
const recentTopics = [];
function pickRandomTopic() {
  let t;
  let attempts = 0;
  do {
    t = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    attempts++;
  } while (recentTopics.includes(t) && attempts < 10);
  recentTopics.push(t);
  // احتفظ بآخر 8 مواضيع فقط
  if (recentTopics.length > 8) recentTopics.shift();
  return t;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* =========================================================
   إدارة الشاشات
   ========================================================= */
function showScreen(screen) {
  [els.startScreen, els.gameScreen, els.endScreen].forEach((s) =>
    s.classList.remove("active")
  );
  screen.classList.add("active");
}

/* =========================================================
   بناء سلم الجوائز
   ========================================================= */
function buildLadder() {
  els.ladder.innerHTML = "";
  PRIZES.forEach((amount, i) => {
    const li = document.createElement("li");
    li.className = "prize-step";
    if (SAFE_LEVELS.includes(i)) li.classList.add("safe");
    li.dataset.index = i;
    li.innerHTML = `
      <span class="step-num">${i + 1}</span>
      <span class="step-amount">${formatNumber(amount)}</span>
    `;
    els.ladder.appendChild(li);
  });
  updateLadder();
}

function updateLadder() {
  const steps = els.ladder.querySelectorAll(".prize-step");
  steps.forEach((step, i) => {
    step.classList.remove("current", "done");
    if (i < state.currentIndex) step.classList.add("done");
    if (i === state.currentIndex) step.classList.add("current");
  });
}

/* =========================================================
   توليد الأسئلة — نظام فشل متسلسل (3 مزوّدين) + بنك احتياطي
   ========================================================= */

// محاولة جلب سؤال من مزوّد واحد (مع مهلة زمنية AbortController)
async function tryFetchOne(cfg, difficulty, topic) {
  // تخطّي المزوّدين الذين لم يُضَف لهم مفتاح
  if (!cfg.API_KEY) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);

  try {
    const res = await fetch(cfg.ENDPOINT, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cfg.API_KEY}`,
      },
      body: JSON.stringify({
        model: cfg.MODEL,
        messages: [
          { role: "system", content: AI_SYSTEM_PROMPT },
          { role: "user", content: buildAIPrompt(difficulty, topic) },
        ],
        ...cfg.extraParams,  // باراميترات خاصة بكل مزوّد (لتجنّب HTTP 400)
      }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status} من ${cfg.name}`);

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) throw new Error(`استجابة فارغة من ${cfg.name}`);

    // استخراج JSON حتى لو أحاطه النموذج بعلامات ```
    const match = text.match(/\{[\s\S]*\}/);
    const obj = JSON.parse(match ? match[0] : text);

    if (
      typeof obj.question === "string" &&
      obj.question.trim().length > 0 &&
      Array.isArray(obj.options) &&
      obj.options.length === 4 &&
      obj.options.every((o) => typeof o === "string" && o.trim().length > 0) &&
      Number.isInteger(obj.answerIndex) &&
      obj.answerIndex >= 0 &&
      obj.answerIndex < 4
    ) {
      return { q: obj.question, o: obj.options, a: obj.answerIndex };
    }
    throw new Error(`صيغة غير صحيحة من ${cfg.name}`);
  } finally {
    clearTimeout(timer);
  }
}

/* جلب سؤال عبر المزوّد الأول الناجح.
   - نُجرّب كل مزوّد حتى AI_MAX_ATTEMPTS مرات لتفادي الأسئلة المكررة.
   - إن أعاد السؤال نفسه، نختار موضوعاً مختلفاً ونحاول مجدداً.
   - إن فشل الجميع نلجأ إلى البنك المحلي. */
async function getQuestion(difficulty) {
  for (const cfg of AI_CONFIGS) {
    if (!cfg.API_KEY) continue;

    for (let attempt = 1; attempt <= AI_MAX_ATTEMPTS; attempt++) {
      const topic = pickRandomTopic();
      try {
        const q = await tryFetchOne(cfg, difficulty, topic);
        if (q && !isDuplicate(q.q)) {
          rememberQuestion(q.q);
          console.log(`✅ تم توليد سؤال جديد عبر ${cfg.name} (موضوع: ${topic})`);
          return q;
        }
        // سؤال مكرر — أعد المحاولة بموضوع آخر
        if (q) {
          console.warn(`🔁 سؤال مكرر من ${cfg.name}، إعادة المحاولة (${attempt}/${AI_MAX_ATTEMPTS})…`);
        }
      } catch (err) {
        console.warn(`⚠️ فشل ${cfg.name}: ${err.message} — جارٍ الانتقال للمزوّد التالي…`);
        break; // خطأ شبكي/صيغة: لا داعي لإعادة المحاولة على نفس المزوّد
      }
    }
  }
  console.log("📦 جميع المزوّدين فشلوا — استخدام بنك الأسئلة المحلي");
  return getFallbackQuestion(difficulty);
}

function getFallbackQuestion(difficulty) {
  const bank = FALLBACK_QUESTIONS[difficulty];
  const used = state.usedFallbackIndices[difficulty];
  // إن استُنفدت الأسئلة، أعد التدوير
  if (used.length >= bank.length) used.length = 0;
  let idx;
  do {
    idx = Math.floor(Math.random() * bank.length);
  } while (used.includes(idx));
  used.push(idx);
  const item = bank[idx];
  // خلط الخيارات مع تعديل فهرس الإجابة
  const correctText = item.o[item.a];
  const shuffled = shuffle(item.o);
  const result = {
    q: item.q,
    o: shuffled,
    a: shuffled.indexOf(correctText),
  };
  rememberQuestion(result.q); // سجّل سؤال البنك أيضاً لمنع تكراره لاحقاً
  return result;
}

/* =========================================================
   النظام المسبق (Prefetch) — يُجهّز السؤال التالي في الخلفية
   =========================================================
   نبدأ بطلب السؤال التالي فور ظهور السؤال الحالي، فلا ينتظر
   اللاعب بعد الإجابة. نُخزّن الوعد (Promise) لا القيمة، حتى
   إن لم يكن الطلب قد اكتمل بعد، سيحلّ عند انتظارنا له.
   ========================================================= */
async function loadQuestion() {
  state.locked = true;

  // إن كان هناك سؤال مُجهّز مسبقاً انتظره، وإلا اطلبه الآن
  let q;
  if (state.nextQuestionPromise) {
    els.qText.textContent = "جارٍ تجهيز السؤال…";
    q = await state.nextQuestionPromise;
    state.nextQuestionPromise = null;
  } else {
    els.qText.textContent = "جارٍ تحميل السؤال…";
    q = await getQuestion(getDifficulty(state.currentIndex));
  }

  state.question = q;
  renderQuestion(getDifficulty(state.currentIndex));
  state.locked = false;

  // 🔥 ابدأ تجهيز السؤال التالي فوراً في الخلفية
  prefetchNextQuestion();
}

// ابدأ طلب السؤال التالي مبكراً (إن لم يكن قد بدأ بعد)
function prefetchNextQuestion() {
  const nextIndex = state.currentIndex + 1;
  // لا تُجهّز ما بعد السؤال الأخير
  if (nextIndex >= TOTAL_QUESTIONS) {
    state.nextQuestionPromise = null;
    return;
  }
  if (state.nextQuestionPromise) return; // تجهيز جارٍ بالفعل
  state.nextQuestionPromise = getQuestion(getDifficulty(nextIndex));
}

/* =========================================================
   عرض السؤال والخيارات
   ========================================================= */
function renderQuestion(difficulty) {
  els.qNumber.textContent = state.currentIndex + 1;
  els.qText.textContent = state.question.q;

  els.difficultyTag.textContent = difficultyLabel(difficulty);
  // السهل = الأسلوب الافتراضي (سماوي)، أما المتوسط/الصعب فبألوان مميزة
  els.difficultyTag.className = "difficulty-tag";
  if (difficulty === "medium" || difficulty === "hard") {
    els.difficultyTag.classList.add(difficulty);
  } else if (difficulty === "expert") {
    els.difficultyTag.classList.add("hard"); // نستخدم نمط الصعب للخبير
  }

  els.currentPrize.textContent = formatNumber(PRIZES[state.currentIndex]);
  updateLadder();

  // إخفاء لوحة المساعدة من السؤال السابق وإعادة بناء الخيارات
  els.assistPanel.classList.add("hidden");
  const letters = ["أ", "ب", "ج", "د"];
  els.answers.innerHTML = "";
  state.question.o.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.dataset.index = i;
    btn.innerHTML = `<span class="letter">${letters[i]}</span><span class="text">${opt}</span>`;
    btn.addEventListener("click", () => handleAnswer(btn, i));
    els.answers.appendChild(btn);
  });
}

/* =========================================================
   معالجة اختيار الإجابة
   ========================================================= */
async function handleAnswer(btn, chosenIndex) {
  if (state.locked) return;
  state.locked = true;

  const buttons = els.answers.querySelectorAll(".answer-btn");
  buttons.forEach((b) => (b.disabled = true));
  btn.classList.add("selected");

  await sleep(700); // إثارة قبل الكشف :)

  const correct = chosenIndex === state.question.a;
  if (correct) {
    btn.classList.add("correct");
    await sleep(1200);

    state.currentIndex++;
    if (state.currentIndex >= TOTAL_QUESTIONS) {
      endGame(true);
    } else {
      loadQuestion();
    }
  } else {
    btn.classList.add("wrong");
    // أظهر الإجابة الصحيحة
    buttons[state.question.a].classList.add("correct");
    await sleep(1500);
    endGame(false);
  }
}

/* =========================================================
   وسائل المساعدة
   ========================================================= */
// 1) حذف إجابتين
function useFifty() {
  if (!state.lifelines.fifty || state.locked) return;
  state.lifelines.fifty = false;
  els.ll5050.classList.add("used");
  els.ll5050.disabled = true;

  const buttons = Array.from(els.answers.querySelectorAll(".answer-btn"));
  const wrong = buttons
    .map((b, i) => ({ b, i }))
    .filter((x) => x.i !== state.question.a);
  const toRemove = shuffle(wrong).slice(0, 2);
  toRemove.forEach((x) => x.b.classList.add("eliminated"));
}

// 2) الاتصال بصديق
function useFriend() {
  if (!state.lifelines.friend || state.locked) return;
  state.lifelines.friend = false;
  els.llFriend.classList.add("used");
  els.llFriend.disabled = true;

  // الصديق يميل للإجابة الصحيحة (85%) لكنه ليس أكيداً دائماً
  const letters = ["أ", "ب", "ج", "د"];
  const confident = Math.random() < 0.85;
  const guessIndex = confident
    ? state.question.a
    : Math.floor(Math.random() * 4);
  const surety = confident ? 80 + Math.floor(Math.random() * 18) : 40 + Math.floor(Math.random() * 30);

  showAssist(
    "☎ الاتصال بصديق",
    `مرحباً! أعتقد أن الإجابة الصحيحة هي الخيار <b>${letters[guessIndex]}</b> ` +
    `(${state.question.o[guessIndex]}). أنا متأكد بنحو <b>${surety}%</b>.`
  );
}

// 3) سؤال الجمهور
function useAudience() {
  if (!state.lifelines.audience || state.locked) return;
  state.lifelines.audience = false;
  els.llAudience.classList.add("used");
  els.llAudience.disabled = true;

  const letters = ["أ", "ب", "ج", "د"];
  // توليد نسب: الإجابة الصحيحة تحظى بأعلى نسبة عادةً
  const correctPct = 45 + Math.floor(Math.random() * 35); // 45-80
  let remaining = 100 - correctPct;
  const others = [0, 1, 2, 3].filter((i) => i !== state.question.a);
  const pcts = {};
  pcts[state.question.a] = correctPct;
  others.forEach((i, k) => {
    if (k === others.length - 1) pcts[i] = remaining;
    else {
      const v = Math.floor(Math.random() * remaining);
      pcts[i] = v;
      remaining -= v;
    }
  });

  let html = `<span class="assist-title">📊 رأي الجمهور</span><div class="poll-bars">`;
  [0, 1, 2, 3].forEach((i) => {
    html += `
      <div class="poll-row">
        <span class="poll-letter">${letters[i]}</span>
        <div class="poll-track"><div class="poll-fill" style="width:0"></div></div>
        <span class="poll-pct">${pcts[i]}%</span>
      </div>`;
  });
  html += `</div>`;
  showAssist(null, html);

  // تحريك الأعمدة
  setTimeout(() => {
    els.assistPanel.querySelectorAll(".poll-fill").forEach((bar, k) => {
      bar.style.width = pcts[k] + "%";
    });
  }, 100);
}

function showAssist(title, html) {
  els.assistPanel.classList.remove("hidden");
  els.assistPanel.innerHTML = title
    ? `<span class="assist-title">${title}</span>${html}`
    : html;
}

/* =========================================================
   إنهاء اللعبة
   ========================================================= */
function endGame(won) {
  let prize;
  let message;

  if (won) {
    prize = PRIZES[TOTAL_QUESTIONS - 1]; // الجائزة الكبرى
    message = "🎉 مبروك! لقد أجبت على جميع الأسئلة وفزت بالجائزة الكبرى!";
    els.endTitle.textContent = "الفوز الكبير!";
  } else {
    // ابحث عن آخر مرحلة أمان تم بلوغها
    const lastSafe = SAFE_LEVELS.filter((i) => i < state.currentIndex).pop();
    prize = lastSafe !== undefined ? PRIZES[lastSafe] : 0;
    message =
      prize > 0
        ? `أحسنت! لقد بلغت مرحلة أمان وربحت المبلغ المضمون.`
        : `للأسف إجابة خاطئة. حظ أوفر في المرة القادمة!`;
    els.endTitle.textContent = "انتهت اللعبة";
  }

  els.endMessage.textContent = message;
  els.finalPrize.textContent = formatNumber(prize);
  showScreen(els.endScreen);
}

/* =========================================================
   بدء / إعادة تشغيل اللعبة
   ========================================================= */
function startGame() {
  state.currentIndex = 0;
  state.locked = false;
  state.lifelines = { fifty: true, friend: true, audience: true };
  state.usedFallbackIndices = { easy: [], medium: [], hard: [], expert: [] };
  state.nextQuestionPromise = null; // إلغاء أي تجهيز سابق من جولة منتهية
  state.askedQuestions = new Set(); // مسح سجل الأسئلة المطروقة في الجولة الجديدة

  // إعادة تفعيل وسائل المساعدة
  [els.ll5050, els.llFriend, els.llAudience].forEach((b) => {
    b.classList.remove("used");
    b.disabled = false;
  });
  els.currentPrize.textContent = "0";

  buildLadder();
  showScreen(els.gameScreen);
  loadQuestion();
}

/* =========================================================
   ربط الأحداث
   ========================================================= */
els.startBtn.addEventListener("click", startGame);
els.restartBtn.addEventListener("click", startGame);
els.ll5050.addEventListener("click", useFifty);
els.llFriend.addEventListener("click", useFriend);
els.llAudience.addEventListener("click", useAudience);

/* =========================================================
   =========================================================
   ⭐ شرح نظام الذكاء الاصطناعي (Failover + Prefetch) ⭐
   =========================================================

   تعمل اللعبة مباشرةً (بدون أي إعداد) عبر بنك أسئلة محلي
   مدمج يضمن تجربة كاملة دائماً. لكن للميزة الكاملة — توليد
   أسئلة لا نهائية ومتنوعة حيّاً — نستخدم نماذج لغوية عبر API.

   🔹 نظام الفشل المتسلسل (Failover)
   ----------------------------------
   في أعلى الملف يوجد مصفوفة AI_CONFIGS تضم حتى 3 مزوّدين:

       const AI_CONFIGS = [
         { name:"Groq",       API_KEY:"...", ENDPOINT:"...", MODEL:"..." }, // أساسي
         { name:"OpenAI",     API_KEY:"...", ENDPOINT:"...", MODEL:"..." }, // احتياطي 1
         { name:"DeepSeek",   API_KEY:"...", ENDPOINT:"...", MODEL:"..." }, // احتياطي 2
       ];

   الترتيب عند توليد كل سؤال:
       Groq → إن فشل → OpenAI → إن فشل → DeepSeek → إن فشل → بنك الأسئلة المحلي
   (الفشل يشمل: تجاوز حد الطلبات 429، أخطاء الشبكة، انتهاء المهلة
    الزمنية AI_TIMEOUT_MS = 12 ثانية، أو صيغة JSON خاطئة)

   تابع العملية في وحدة تحكم المتصفح (Console) لرؤية أي مزوّد
   نجح وأيهم فشل، مع رسائل توضيحية بالعربية.

   🔹 التحميل المسبق (Prefetch) — لكسب الوقت
   ------------------------------------------
   فور ظهور السؤال الحالي، يبدأ النظام بطلب السؤال التالي في
   الخلفية ويُخزّن وعده (Promise) في state.nextQuestionPromise.
   عندما يُجيب اللاعب وينتقل للسؤال التالي، يكون قد اكتمل غالباً
   فيظهر فوراً دون أي انتظار. إن لم يكتمل بعد، يُنتظر الاكتمال.

   🔹 لماذا وضع المفاتيح هنا يُعتبر "مؤقتاً فقط"؟
   ----------------------------------------------
   وضع المفتاح داخل كود الواجهة الأمامية (frontend) يجعله مكشوفاً
   لأي زائر يفتح أدوات المطوّر. هذا مقبول للتجربة المحلية فقط.

   🔹 الطريقة الآمنة (للنشر الحقيقي على الإنترنت)
   ----------------------------------------------
   أنشئ خادماً وسيطاً (Node.js / PHP / Python) يحتفظ بالمفاتيح
   سرّاً ويُعيد السؤال فقط، ثم ضع عنوانه في ENDPOINT.

   🔹 مزوّدين إضافيين متوافقين بنفس صيغة OpenAI
   --------------------------------------------
   • Groq:        https://api.groq.com/openai/v1/chat/completions
   • DeepSeek:    https://api.deepseek.com/v1/chat/completions
   • OpenRouter:  https://openrouter.ai/api/v1/chat/completions
   • Together / Mistral / ... إلخ.
   ========================================================= */

