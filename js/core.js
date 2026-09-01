/* =========================================================
   core.js — البنية المشتركة بين جميع الألعاب
   =========================================================
   يحتوي: الحالة العامة (state)، مفتاح API والنماذج، تفضيلات الصوت،
   المؤثرات الصوتية (Web Audio API)، تنقل الشاشات (showScreen)،
   تحليل JSON المتين، بنية استدعاء الذكاء الاصطناعي (callOpenRouterWithFallback)،
   شاشة الإعدادات وضبط النماذج، ودالة التهيئة init().

   ⚠️ يجب تحميل هذا الملف أولاً قبل بقية ملفات الألعاب.
   ========================================================= */
/* ====== الحالة ====== */
let state = {
  screen: "menu",
  selectedMode: null,
  currentIndex: 0,
  question: null,
  loading: false,
  locked: false,
  lifelines: { fifty: true, friend: true, audience: true, switch: true, double: true },
  mistakes: 0,
  streak: 0,
  bestStreak: 0,
  totalCorrect: 0,
  usedSwitchThisQuestion: false,
  usedDoubleThisQuestion: false,
  askedQuestions: new Set(),
  awaitingNext: false,
  doubleRetryMode: false,
  selectedIndex: null,
  revealed: false,
  eliminatedIndices: [],
  soundEnabled: true,
  timerInterval: null,
  timerRemaining: 0,
  apiKey: "",
  nextQuestionPromise: null,  // 🚀 Prefetch: وعد السؤال التالي المُجهّز مسبقاً
  lastResult: null,
  questionSource: null, // "ai" أو "bank" — لتمييز خلفية السؤال بصمت
  usedTopicKeywords: new Set(), // تتبّع تركيبات (موضوع::كلمة) المستخدمة لتفادي تكرار أسئلة الذكاء الاصطناعي
  islamicMode: false, // تخصيص المواضيع الإسلامية (العقيدة، أصول الفقه، الفقه)
  biologyMode: false, // تخصيص مواضيع علم الأحياء (3 مستويات × وحدات × كلمات مفتاحية)
};

function loadApiKey() {
  try { state.apiKey = localStorage.getItem("millionaire_api_key") || ""; } catch {}
}

function saveApiKeyToStorage(key) {
  state.apiKey = key;
  try { localStorage.setItem("millionaire_api_key", key); } catch {}
}

// fallbackApiKey أُزيل — النماذج المجانية لا تحتاج مفتاح احتياطي

/* ====== ضبط النماذج المخصصة ====== */
function loadCustomModels() {
  try {
    const raw = localStorage.getItem("millionaire_custom_models");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.primary && parsed.fallback) {
        AI_MODELS = [
          { id: parsed.primary, label: parsed.primary.split(":")[0] },
          { id: parsed.fallback, label: parsed.fallback.split(":")[0] },
        ];
        console.log("[Models] نماذج مخصصة:", AI_MODELS.map(m => m.id));
        return;
      }
    }
  } catch {}
  // لا تخصيص محفوظ — استخدم الافتراضي
  AI_MODELS = [...DEFAULT_AI_MODELS];
}

function saveCustomModels(primary, fallback) {
  try {
    localStorage.setItem("millionaire_custom_models", JSON.stringify({ primary, fallback }));
  } catch {}
  AI_MODELS = [
    { id: primary, label: primary.split(":")[0] },
    { id: fallback, label: fallback.split(":")[0] },
  ];
  console.log("[Models] تم حفظ النماذج المخصصة:", AI_MODELS.map(m => m.id));
}

function resetCustomModels() {
  try { localStorage.removeItem("millionaire_custom_models"); } catch {}
  AI_MODELS = [...DEFAULT_AI_MODELS];
  console.log("[Models] تم العودة للنماذج الافتراضية");
}

function loadSoundPref() {
  try {
    const v = localStorage.getItem("millionaire_sound");
    if (v !== null) state.soundEnabled = v === "1";
  } catch {}
}

function saveSoundPref() {
  try { localStorage.setItem("millionaire_sound", state.soundEnabled ? "1" : "0"); } catch {}
}

/* ====== المؤثرات الصوتية (Web Audio API) ====== */
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch {}
  }
  return audioCtx;
}

function playTone(freq, duration, type = "sine", volume = 0.15) {
  if (!state.soundEnabled) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {}
}

const sounds = {
  click: () => playTone(600, 0.05, "sine", 0.1),
  select: () => playTone(440, 0.1, "sine", 0.12),
  correct: () => { playTone(523, 0.12); setTimeout(() => playTone(659, 0.12), 120); setTimeout(() => playTone(784, 0.2), 240); },
  wrong: () => { playTone(311, 0.15, "sawtooth", 0.1); setTimeout(() => playTone(233, 0.3, "sawtooth", 0.1), 150); },
  next: () => playTone(880, 0.1, "sine", 0.1),
  safe: () => { playTone(659, 0.1); setTimeout(() => playTone(880, 0.15), 100); },
  lifeline: () => { playTone(698, 0.08); setTimeout(() => playTone(523, 0.12), 80); },
  loseLife: () => playTone(200, 0.3, "sawtooth", 0.1),
  win: () => { playTone(523, 0.1); setTimeout(() => playTone(659, 0.1), 100); setTimeout(() => playTone(784, 0.1), 200); setTimeout(() => playTone(1047, 0.4), 300); },
  walkaway: () => playTone(440, 0.2, "sine", 0.1),
  tick: () => playTone(1000, 0.03, "square", 0.05),
  recover: () => { playTone(659, 0.08); setTimeout(() => playTone(880, 0.12), 80); },
};

/* ====== تنقل الشاشات ====== */
function showScreen(name) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const el = document.getElementById("screen-" + name);
  if (el) el.classList.add("active");
  state.screen = name;
  sounds.click();

  if (name === "stats") renderStats();
  if (name === "modes") renderModes();
  if (name === "settings") renderSettings();
}

/* ====== دالة مساعدة: تحليل JSON بشكل متين ======
   تحاول تحليل النص كـ JSON، وإذا فشلت (مثلاً بسبب اقتطاع max_tokens)،
   تحاول إصلاح الأعطال الشائعة مثل:
   - نصوص غير مغلقة (unterminated strings)
   - أقواس مفقودة
   تُرجع الكائن المحلّل أو null عند الفشل الكامل. */
function robustJSONParse(text) {
  // محاولة أولية مباشرة
  try {
    return JSON.parse(text);
  } catch {}

  // حاول استخراج كتلة JSON فقط (بين أول { وآخر })
  const match = text.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch {}
  }

  // محاولة إصلاح اقتطاع النصوص: أضف علامات اقتباس مغلقة مفقودة
  // هذه الحالة تحدث كثيراً مع max_tokens محدود
  let repaired = match ? match[0] : text;

  // عدّ علامات الاقتباس المزدوجة غير المُهرّبة
  let quoteCount = 0;
  for (let i = 0; i < repaired.length; i++) {
    if (repaired[i] === '"' && (i === 0 || repaired[i - 1] !== '\\')) quoteCount++;
  }

  // إذا كان عدد علامات الاقتباس فردياً، أضف واحدة في النهاية
  if (quoteCount % 2 !== 0) {
    repaired += '"';
  }

  // أضف أقواس مغلقة مفقودة
  let openBraces = 0, openBrackets = 0;
  for (const ch of repaired) {
    if (ch === '{') openBraces++;
    else if (ch === '}') openBraces--;
    else if (ch === '[') openBrackets++;
    else if (ch === ']') openBrackets--;
  }
  while (openBrackets > 0) { repaired += ']'; openBrackets--; }
  while (openBraces > 0) { repaired += '}'; openBraces--; }

  try {
    return JSON.parse(repaired);
  } catch {}

  // محاولة أخيرة: اقتطع حتى آخر فاصلة صالحة وأضف أقواس الإغلاق
  // هذا يفيد عندما يكون حقل أخير (مثل explanation) مقطوعاً
  const lastComma = repaired.lastIndexOf('",');
  if (lastComma > 0) {
    let truncated = repaired.substring(0, lastComma + 1); // نشمل الفاصلة والاقتباس
    // أغلق أي أقواس مفتوحة
    let ob = 0, obr = 0;
    for (const ch of truncated) {
      if (ch === '{') ob++;
      else if (ch === '}') ob--;
      else if (ch === '[') obr++;
      else if (ch === ']') obr--;
    }
    while (obr > 0) { truncated += ']'; obr--; }
    while (ob > 0) { truncated += '}'; ob--; }
    try {
      const obj = JSON.parse(truncated);
      // تأكد أن الحقول الأساسية موجودة
      if (obj.question && obj.options) return obj;
    } catch {}
  }

  return null;
}

/* ====== دالة موحدة لاستدعاء Google AI Studio API مع دعم النموذج الاحتياطي ======
   تجرب النموذج الأساسي (Gemini Flash-Lite — الأخف والأسرع) أولاً، وفي حال الفشل
   تنتقل للنموذج الاحتياطي (Gemini Flash — متوفر دائماً وسرعة أعلى).
   
   تُرجع { data, usedModel } عند النجاح، أو ترمي الخطأ الأخير عند الفشل الكامل.
   
   ⚠️ مهم: كل نموذج يحصل على AbortController خاص به مع مهلة 30 ثانية.
   
   📝 Google AI Studio API format:
   - Endpoint: https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent
   - Auth: مفتاح API يُمرّ كمعامل ?key=
   - Body: { contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: {...} } */
/* ====== النماذج الافتراضية ====== */
const DEFAULT_AI_MODELS = [
  { id: "gemini-3.5-flash-lite", label: "(النموذج الأكثر تقدما)" },
  { id: "gemini-3.1-flash-lite", label: "(النموذج الأخف)" },
];

/* ====== النماذج الفعّالة — يمكن تخصيصها من الإعدادات ====== */
let AI_MODELS = [...DEFAULT_AI_MODELS];

/* ====== دالة مساعدة: تحويل رسائل OpenAI-style إلى صيغة Gemini ======
   Gemini يتوقع: { contents: [{ role: "user"|"model", parts: [{ text: ... }] }] }
   بينما OpenAI يستخدم: { messages: [{ role: "system"|"user"|"assistant", content: ... }] }
   في Gemini، يُدمج الـ system prompt مع أول رسالة user، ولا يوجد دور "assistant". */
function convertMessagesToGeminiFormat(messages) {
  const result = [];
  let systemInstruction = null;

  for (const msg of messages) {
    if (msg.role === "system") {
      // ادمج جميع رسائل النظام في تعليمة نظام واحدة
      if (systemInstruction) {
        systemInstruction += "\n\n" + msg.content;
      } else {
        systemInstruction = msg.content;
      }
    } else if (msg.role === "user") {
      result.push({
        role: "user",
        parts: [{ text: msg.content }],
      });
    } else if (msg.role === "assistant") {
      result.push({
        role: "model",
        parts: [{ text: msg.content }],
      });
    }
  }

  // Gemini يتطلب أن يبدأ الحوار بـ user (وليس model).
  // إذا كان أول عنصر model (بسبب تحويل assistant سابق)، فلن يكون valid — لكن نادراً ما يحدث.

  const body = { contents: result };
  if (systemInstruction) {
    body.systemInstruction = {
      role: "system",
      parts: [{ text: systemInstruction }],
    };
  }
  return body;
}

/* ====== دالة مساعدة: تحويل استجابة Gemini إلى صيغة OpenAI-like ======
   Gemini يرجع: { candidates: [{ content: { parts: [{ text: ... }], role: "model" } }] }
   نُحوّلها إلى صيغة متوافقة مع بقية الكود: { choices: [{ message: { content: ... } }] }
   Gemini قد يُرجع message blocked بسبب safety — نُرجع كائن error مشابه. */
function convertGeminiResponseToOpenAIFormat(geminiData) {
  // فحص الأخطاء المحتملة
  if (geminiData.error) {
    return { error: geminiData.error };
  }

  // فحص promptFeedback (blocking)
  if (geminiData.promptFeedback && geminiData.promptFeedback.blockReason) {
    return {
      error: {
        message: `تم حجب الطلب: ${geminiData.promptFeedback.blockReason}`,
      },
    };
  }

  const candidate = geminiData.candidates?.[0];
  if (!candidate) {
    return { error: { message: "استجابة فارغة من Gemini" } };
  }

  // فحص finishReason
  if (candidate.finishReason === "SAFETY") {
    return {
      error: { message: "تم حجب الاستجابة لسبب أمني" },
    };
  }

  const text = candidate.content?.parts?.map(p => p.text).filter(Boolean).join("").trim();
  if (!text) {
    return { error: { message: "استجابة فارغة من Gemini" } };
  }

  return {
    choices: [
      {
        message: { content: text },
        finishReason: candidate.finishReason,
      },
    ],
  };
}

async function callOpenRouterWithFallback({ body, signal, referer, title }) {
  // دالة متوافقة مع الكود الحالي — تُحوّل إلى Google AI Studio داخلياً
  return callGoogleAIStudioWithFallback({ body, signal, referer, title });
}

async function callGoogleAIStudioWithFallback({ body, signal, referer, title }) {
  // نستخدم مفتاح API واحد
  const apiKey = state.apiKey;
  if (!apiKey) {
    throw new Error("مفتاح Google AI Studio API غير مُعرَّف");
  }

  let lastError = null;
  const PER_MODEL_TIMEOUT = 30000; // 30 ثانية لكل نموذج

  // تحويل الرسائل من صيغة OpenAI إلى صيغة Gemini
  const geminiBody = convertMessagesToGeminiFormat(body.messages || []);
  // انسخ معاملات التوليد المهمة إن وُجدت
  if (body.temperature !== undefined) {
    geminiBody.generationConfig = geminiBody.generationConfig || {};
    geminiBody.generationConfig.temperature = body.temperature;
  }
  if (body.max_tokens !== undefined) {
    geminiBody.generationConfig = geminiBody.generationConfig || {};
    geminiBody.generationConfig.maxOutputTokens = body.max_tokens;
  }

  for (let i = 0; i < AI_MODELS.length; i++) {
    const model = AI_MODELS[i];
    const modelLabel = model.label;

    // أنشئ AbortController خاص بهذه المحاولة مع مهلة خاصة
    const perModelController = new AbortController();
    const perModelTimer = setTimeout(() => perModelController.abort(), PER_MODEL_TIMEOUT);

    // ادمج signal الخارجي (إن وُجد) مع signal النموذج الحالي
    let externalAbortHandler = null;
    if (signal) {
      if (signal.aborted) {
        clearTimeout(perModelTimer);
        lastError = new Error("الطلب مُلغى خارجياً");
        continue;
      }
      externalAbortHandler = () => perModelController.abort();
      signal.addEventListener("abort", externalAbortHandler);
    }

    try {
      // Google AI Studio endpoint format:
      // https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={apiKey}
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model.id}:generateContent?key=${encodeURIComponent(apiKey)}`;

      const res = await fetch(url, {
        method: "POST",
        signal: perModelController.signal,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(geminiBody),
      });

      // إذا كانت حالة HTTP غير ناجحة، اقرأ نص الخطأ وتجاوز
      if (!res.ok) {
        let errDetail = "";
        try { errDetail = await res.text(); } catch {}
        console.warn(`[API] فشل النموذج ${modelLabel} (HTTP ${res.status}): ${errDetail.slice(0, 200)}`);
        lastError = new Error(`HTTP ${res.status}: ${errDetail.slice(0, 80)}`);
        continue;
      }

      const rawData = await res.json();

      // ⚠️ فحص حاسم: Gemini قد يُرجع HTTP 200 مع كائن خطأ في الجسم
      if (rawData.error) {
        const errMsg = rawData.error.message || JSON.stringify(rawData.error);
        console.warn(`[API] المزود أرجع خطأ للنموذج ${modelLabel}: ${errMsg}`);
        lastError = new Error(errMsg);
        continue; // جرّب النموذج التالي
      }

      // تحويل الاستجابة إلى صيغة OpenAI-like
      const data = convertGeminiResponseToOpenAIFormat(rawData);

      if (data.error) {
        console.warn(`[API] خطأ في استجابة النموذج ${modelLabel}: ${data.error.message}`);
        lastError = new Error(data.error.message);
        continue;
      }

      // تحقق أيضاً من أن choices موجودة وcontent صالح
      const content = data.choices?.[0]?.message?.content;
      if (!content || (typeof content === "string" && content.trim().toLowerCase().startsWith("error:"))) {
        console.warn(`[API] استجابة فارغة أو خطأ للنموذج ${modelLabel}: ${String(content).slice(0, 80)}`);
        lastError = new Error(content ? "خطأ في المحتوى: " + content.slice(0, 50) : "استجابة فارغة");
        continue; // جرّب النموذج التالي
      }

      console.log(`[API] ✅ نجح النموذج ${modelLabel}`);
      return { data, usedModel: model.id, modelLabel };
    } catch (err) {
      // ميّز بين انتهاء المهلة وإلغاء خارجي
      const isExternalAbort = signal && signal.aborted;
      if (isExternalAbort) {
        console.warn(`[API] الطلب مُلغى خارجياً أثناء النموذج ${modelLabel}`);
        lastError = err;
        throw err;
      }
      console.warn(`[API] فشل النموذج ${modelLabel}: ${err.message}`);
      lastError = err;
      continue;
    } finally {
      clearTimeout(perModelTimer);
      if (signal && externalAbortHandler) {
        signal.removeEventListener("abort", externalAbortHandler);
      }
    }
  }
  // كل النماذج فشلت — ارمِ آخر خطأ
  throw lastError || new Error("فشل جميع النماذج");
}

/* ====== الإعدادات ====== */
function renderSettings() {
  document.getElementById("api-key-input").value = state.apiKey;
  document.getElementById("sound-checkbox").checked = state.soundEnabled;
  const status = document.getElementById("api-status");
  if (state.apiKey) {
    status.textContent = "✓ مفتاح محفوظ — سيُستخدم الذكاء الاصطناعي لتوليد الأسئلة";
    status.style.color = "#10b981";
  } else {
    status.textContent = "لم يُحفظ مفتاح — ستُستخدم الأسئلة المدمجة فقط";
    status.style.color = "rgba(255,255,255,0.5)";
  }
  // تحديث حقول النماذج المخصصة
  const primaryInput = document.getElementById("primary-model-input");
  const fallbackInput = document.getElementById("fallback-model-input");
  if (primaryInput) primaryInput.value = AI_MODELS[0]?.id || "";
  if (fallbackInput) fallbackInput.value = AI_MODELS[1]?.id || "";
  // تحديث حالة لوحة ضبط النماذج
  const modelStatus = document.getElementById("model-status");
  if (modelStatus) {
    const isDefault = AI_MODELS.length === DEFAULT_AI_MODELS.length &&
      AI_MODELS.every((m, i) => m.id === DEFAULT_AI_MODELS[i].id);
    if (isDefault) {
      modelStatus.textContent = "النماذج الافتراضية مُفعّلة";
      modelStatus.style.color = "rgba(255,255,255,0.5)";
    } else {
      modelStatus.textContent = "✓ نماذج مخصصة محفوظة";
      modelStatus.style.color = "#a78bfa";
    }
  }
}

/* ====== ضبط النماذج — دوال الواجهة ====== */
function toggleModelSettings() {
  const panel = document.getElementById("model-settings-panel");
  if (!panel) return;
  const isVisible = panel.style.display !== "none";
  panel.style.display = isVisible ? "none" : "block";
  if (!isVisible) {
    // عند الفتح، املأ الحقول بالقيم الحالية
    const primaryInput = document.getElementById("primary-model-input");
    const fallbackInput = document.getElementById("fallback-model-input");
    if (primaryInput) primaryInput.value = AI_MODELS[0]?.id || "";
    if (fallbackInput) fallbackInput.value = AI_MODELS[1]?.id || "";
  }
}

function handleSaveModels() {
  const primary = document.getElementById("primary-model-input").value.trim();
  const fallback = document.getElementById("fallback-model-input").value.trim();
  const status = document.getElementById("model-status");

  if (!primary || !fallback) {
    if (status) {
      status.textContent = "⚠ أدخل اسمي النموذجين الأساسي والاحتياطي";
      status.style.color = "#ef4444";
    }
    return;
  }

  if (primary === fallback) {
    if (status) {
      status.textContent = "⚠ يجب أن يختلف النموذج الاحتياطي عن الأساسي";
      status.style.color = "#ef4444";
    }
    return;
  }

  saveCustomModels(primary, fallback);
  if (status) {
    status.textContent = "✓ تم حفظ النماذج المخصصة!";
    status.style.color = "#10b981";
  }
  sounds.correct();
  setTimeout(() => renderSettings(), 2000);
}

function handleResetModels() {
  resetCustomModels();
  renderSettings();
  const status = document.getElementById("model-status");
  if (status) {
    status.textContent = "✓ تم العودة للنماذج الافتراضية";
    status.style.color = "#10b981";
  }
  sounds.click();
}

// ملاحظة: دوال المعالجة (handlers) مُنفصلة عن دوال الحفظ الفعلية
// لتفادي تعارض الأسماء. دالة saveApiKeyToStorage(key) تحفظ فعلياً،
// بينما handleSaveApiKey() تقرأ القيمة من المدخل ثم تستدعيها.
function handleSaveApiKey() {
  const key = document.getElementById("api-key-input").value.trim();
  if (!key) {
    const status = document.getElementById("api-status");
    status.textContent = "⚠ الرجاء إدخال مفتاح صحيح أولاً";
    status.style.color = "#ef4444";
    return;
  }
  saveApiKeyToStorage(key);
  renderSettings();
  const status = document.getElementById("api-status");
  const original = status.textContent;
  status.textContent = "✓ تم حفظ المفتاح بنجاح! سيُستخدم في الأسئلة القادمة.";
  status.style.color = "#10b981";
  sounds.correct();
  setTimeout(() => renderSettings(), 2500);
}

function handleClearApiKey() {
  saveApiKeyToStorage("");
  document.getElementById("api-key-input").value = "";
  // امسح أيضاً خانة مفتاح API في نموذج إنشاء الغرفة
  const createApiKeyInput = document.getElementById("create-api-key");
  if (createApiKeyInput) createApiKeyInput.value = "";
  renderSettings();
  sounds.click();
}

function toggleSoundCheckbox(checkbox) {
  state.soundEnabled = checkbox.checked;
  saveSoundPref();
  if (state.soundEnabled) sounds.click();
  document.getElementById("sound-icon").textContent = state.soundEnabled ? "🔊" : "🔇";
}

function toggleSound() {
  state.soundEnabled = !state.soundEnabled;
  saveSoundPref();
  document.getElementById("sound-icon").textContent = state.soundEnabled ? "🔊" : "🔇";
  if (state.soundEnabled) sounds.click();
}

function resetAllData() {
  if (!confirm("هل أنت متأكد؟ سيتم حذف جميع الإحصائيات والإعدادات.")) return;
  localStorage.removeItem("millionaire_stats");
  localStorage.removeItem("millionaire_api_key");
  localStorage.removeItem("millionaire_sound");
  localStorage.removeItem("millionaire_custom_models");
  state.apiKey = "";
  state.soundEnabled = true;
  resetCustomModels();
  alert("تم حذف جميع البيانات.");
  showScreen("menu");
}

/* ====== التهيئة ====== */
function init() {
  loadApiKey();
  loadCustomModels();
  loadSoundPref();
  loadBattleServerUrl();
  initRequiredPlayersSelector();
  document.getElementById("sound-icon").textContent = state.soundEnabled ? "🔊" : "🔇";
  showScreen("menu");
}

// ابدأ عند تحميل الصفحة
window.addEventListener("DOMContentLoaded", init);
