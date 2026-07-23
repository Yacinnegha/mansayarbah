/* =========================================================
   من سيربح المليون — منطق اللعبة
   ========================================================= */

/* ====== بنك الأسئلة المدمج ====== */
const QUESTION_BANK = {
  easy: [
    { q: "ما عاصمة مصر؟", o: ["القاهرة", "الإسكندرية", "الجيزة", "أسوان"], a: 0, topic: "عواصم ومدن", explanation: "القاهرة هي عاصمة مصر وأكبر مدنها." },
    { q: "كم عدد القارات في العالم؟", o: ["5", "6", "7", "8"], a: 2, topic: "جغرافيا", explanation: "هناك 7 قارات: آسيا، أفريقيا، أمريكا الشمالية، أمريكا الجنوبية، أنتاركتيكا، أوروبا، أستراليا." },
    { q: "ما لون السماء في يوم صافٍ؟", o: ["أحمر", "أزرق", "أخضر", "أصفر"], a: 1, topic: "علوم", explanation: "السماء تظهر زرقاء بسبب تشتت ضوء الشمس في الغلاف الجوي." },
    { q: "كم عدد أيام الأسبوع؟", o: ["5", "6", "7", "8"], a: 2, topic: "معرفة عامة", explanation: "أيام الأسبوع سبعة من السبت إلى الجمعة." },
    { q: "ما الحيوان الذي يُلقب بملك الغابة؟", o: ["النمر", "الفيل", "الأسد", "الذئب"], a: 2, topic: "حيوانات", explanation: "الأسد يُلقب بملك الغابة لقوته وهيمنته." },
    { q: "كم عدد ألوان قوس قزح؟", o: ["5", "6", "7", "8"], a: 2, topic: "علوم", explanation: "قوس قزح يحتوي على 7 ألوان: أحمر، برتقالي، أصفر، أخضر، أزرق، نيلي، بنفسجي." },
    { q: "ما أكبر كوكب في المجموعة الشمسية؟", o: ["الأرض", "المريخ", "المشتري", "زحل"], a: 2, topic: "فضاء", explanation: "المشتري هو أكبر كوكب في المجموعة الشمسية." },
    { q: "كم عدد فصول السنة؟", o: ["2", "3", "4", "5"], a: 2, topic: "معرفة عامة", explanation: "فصول السنة أربعة: الربيع، الصيف، الخريف، الشتاء." },
    { q: "ما العضو المسؤول عن ضخ الدم؟", o: ["الرئة", "القلب", "الكبد", "الكلية"], a: 1, topic: "طب", explanation: "القلب يضخ الدم إلى جميع أنحاء الجسم." },
    { q: "كم عدد لاعبي كرة القدم في الفريق الواحد؟", o: ["9", "10", "11", "12"], a: 2, topic: "رياضة", explanation: "فريق كرة القدم يتكون من 11 لاعباً." },
    { q: "ما عاصمة فرنسا؟", o: ["لندن", "باريس", "برلين", "مدريد"], a: 1, topic: "عواصم ومدن", explanation: "باريس هي عاصمة فرنسا." },
    { q: "ما الكوكب الأقرب إلى الشمس؟", o: ["الزهرة", "الأرض", "عطارد", "المريخ"], a: 2, topic: "فضاء", explanation: "عطارد هو الكوكب الأقرب إلى الشمس." },
    { q: "كم عدد حروف اللغة العربية؟", o: ["26", "28", "30", "32"], a: 1, topic: "لغات", explanation: "اللغة العربية تحتوي على 28 حرفاً." },
    { q: "ما أكبر محيط في العالم؟", o: ["الأطلسي", "الهندي", "الهادئ", "المتجمد"], a: 2, topic: "بحار ومحيطات", explanation: "المحيط الهادئ هو أكبر محيط في العالم." },
    { q: "ما ناتج 7 × 8؟", o: ["54", "56", "58", "64"], a: 1, topic: "رياضيات", explanation: "7 × 8 = 56" },
    { q: "ما لون ورق الشجر؟", o: ["أحمر", "أزرق", "أخضر", "أصفر"], a: 2, topic: "نباتات", explanation: "ورق الشجر أخضر بسبب مادة الكلوروفيل." },
    { q: "كم عدد أسنان الإنسان البالغ؟", o: ["28", "30", "32", "34"], a: 2, topic: "طب", explanation: "الإنسان البالغ لديه 32 سنّاً بما فيها أضراس العقل." },
    { q: "ما عاصمة اليابان؟", o: ["سيول", "بكين", "طوكيو", "بانكوك"], a: 2, topic: "عواصم ومدن", explanation: "طوكيو هي عاصمة اليابان." },
    { q: "في أي قارة تقع مصر؟", o: ["آسيا", "أفريقيا", "أوروبا", "أمريكا"], a: 1, topic: "جغرافيا", explanation: "مصر تقع في قارة أفريقيا." },
    { q: "ما الحيوان الذي ينتج العسل؟", o: ["الفراشة", "النحلة", "النملة", "الذبابة"], a: 1, topic: "حيوانات", explanation: "النحل ينتج العسل من رحيق الأزهار." },
    { q: "كم ثانية في الدقيقة؟", o: ["30", "45", "60", "90"], a: 2, topic: "معرفة عامة", explanation: "الدقيقة تحتوي على 60 ثانية." },
    { q: "ما أكبر دولة عربية من حيث المساحة؟", o: ["مصر", "السعودية", "الجزائر", "السودان"], a: 2, topic: "جغرافيا", explanation: "الجزائر هي أكبر دولة عربية من حيث المساحة." },
    { q: "ما العملة الرسمية للولايات المتحدة؟", o: ["اليورو", "الجنيه", "الدولار", "الين"], a: 2, topic: "اقتصاد", explanation: "الدولار هو العملة الرسمية للولايات المتحدة." },
    { q: "كم عدد عظام جسم الإنسان البالغ؟", o: ["186", "206", "226", "246"], a: 1, topic: "طب", explanation: "جسم الإنسان البالغ يحتوي على 206 عظمة." },
    { q: "ما العضو المسؤول عن التنفس؟", o: ["القلب", "الرئة", "المعدة", "الدماغ"], a: 1, topic: "طب", explanation: "الرئتان مسؤولتان عن تنفس الأكسجين." },
  ],
  medium: [
    { q: "من هو مؤسس الدولة الأموية؟", o: ["عمر بن الخطاب", "معاوية بن أبي سفيان", "عبد الملك بن مروان", "الوليد بن عبد الملك"], a: 1, topic: "تاريخ", explanation: "معاوية بن أبي سفيان أسس الدولة الأموية عام 661م." },
    { q: "ما أطول نهر في العالم؟", o: ["نهر الأمازون", "نهر النيل", "نهر المسيسيبي", "نهر اليانغتسي"], a: 1, topic: "جغرافيا", explanation: "نهر النيل يُعد أطول نهر في العالم بطول يبلغ 6650 كم." },
    { q: "في أي عام هبط الإنسان على القمر؟", o: ["1965", "1969", "1972", "1975"], a: 1, topic: "اكتشافات علمية", explanation: "هبط الإنسان على القمر عام 1969 في مهمة أبولو 11." },
    { q: "من هو مكتشف الجاذبية؟", o: ["أينشتاين", "نيوتن", "غاليليو", "تسلا"], a: 1, topic: "اكتشافات علمية", explanation: "إسحاق نيوتن اكتشف قانون الجاذبية." },
    { q: "ما أكبر صحراء في العالم؟", o: ["صحراء كالاهاري", "الصحراء الكبرى", "صحراء جوبي", "صحراء أنتاركتيكا"], a: 3, topic: "جغرافيا", explanation: "صحراء أنتاركتيكا هي أكبر صحراء (باردة) في العالم." },
    { q: "من كتب رواية 'البؤساء'؟", o: ["تولستوي", "فيكتور هوغو", "ديكنز", "دوستويفسكي"], a: 1, topic: "كتب وروايات", explanation: "فيكتور هوغو كتب رواية 'البؤساء' عام 1862." },
    { q: "ما الرمز الكيميائي للذهب؟", o: ["Go", "Au", "Gd", "Ag"], a: 1, topic: "كيمياء", explanation: "الرمز الكيميائي للذهب هو Au من الكلمة اللاتينية Aurum." },
    { q: "كم عدد لاعبي كرة السلة في الفريق داخل الملعب؟", o: ["5", "6", "7", "11"], a: 0, topic: "رياضة", explanation: "فريق كرة السلة يتكون من 5 لاعبين داخل الملعب." },
    { q: "ما عاصمة أستراليا؟", o: ["سيدني", "ملبورن", "كانبرا", "بيرث"], a: 2, topic: "عواصم ومدن", explanation: "كانبرا هي عاصمة أستراليا وليست سيدني كما يظن البعض." },
    { q: "من رسم لوحة الموناليزا؟", o: ["ميكيلانجيلو", "رافاييل", "ليوناردو دافنشي", "فان جوخ"], a: 2, topic: "فنون", explanation: "ليوناردو دافنشي رسم الموناليزا في القرن 16." },
    { q: "ما سرعة الضوء تقريباً؟", o: ["300,000 كم/ث", "150,000 كم/ث", "500,000 كم/ث", "1,000,000 كم/ث"], a: 0, topic: "فيزياء", explanation: "سرعة الضوء حوالي 300,000 كيلومتر في الثانية." },
    { q: "في أي قارة تقع جبال الهيمالايا؟", o: ["أفريقيا", "آسيا", "أوروبا", "أمريكا"], a: 1, topic: "جغرافيا", explanation: "جبال الهيمالايا تقع في قارة آسيا." },
    { q: "من هو مؤلف مسرحية 'روميو وجولييت'؟", o: ["شكسبير", "موليير", "جوته", "تشيخوف"], a: 0, topic: "أدب", explanation: "ويليام شكسبير ألف روميو وجولييت." },
    { q: "ما الرمز الكيميائي للماء؟", o: ["CO2", "H2O", "O2", "NaCl"], a: 1, topic: "كيمياء", explanation: "الماء يتكون من ذرتي هيدروجين وذرة أكسجين H2O." },
    { q: "كم عدد أضلاع المثلث؟", o: ["2", "3", "4", "5"], a: 1, topic: "رياضيات", explanation: "المثلث له 3 أضلاع." },
    { q: "ما عاصمة كندا؟", o: ["تورنتو", "مونتريال", "أوتاوا", "فانكوفر"], a: 2, topic: "عواصم ومدن", explanation: "أوتاوا هي عاصمة كندا." },
    { q: "من اخترع المصباح الكهربائي؟", o: ["نيكولا تيسلا", "توماس إديسون", "ألكسندر بيل", "بنجامين فرانكلين"], a: 1, topic: "اختراعات", explanation: "توماس إديسون اخترع المصباح الكهربائي عملياً عام 1879." },
    { q: "ما أكبر كوكب في المجموعة الشمسية؟", o: ["زحل", "الأرض", "المشتري", "نبتون"], a: 2, topic: "فضاء", explanation: "المشتري هو أكبر كوكب في المجموعة الشمسية." },
    { q: "كم سنة في القرن الواحد؟", o: ["50", "100", "200", "500"], a: 1, topic: "معرفة عامة", explanation: "القرن يساوي 100 سنة." },
    { q: "ما المعدن السائل في درجة الحرارة العادية؟", o: ["الحديد", "الزئبق", "النحاس", "الذهب"], a: 1, topic: "كيمياء", explanation: "الزئبق هو المعدن الوحيد السائل في درجة الحرارة العادية." },
    { q: "أين تقع الأهرامات؟", o: ["الأردن", "مصر", "العراق", "السودان"], a: 1, topic: "معالم سياحية", explanation: "أهرامات الجيزة تقع في مصر." },
    { q: "من هو القائد الذي فتح القسطنطينية؟", o: ["صلاح الدين", "محمد الفاتح", "هارون الرشيد", "بلاط"], a: 1, topic: "تاريخ", explanation: "محمد الفاتح فتح القسطنطينية عام 1453م." },
    { q: "ما العملة الرسمية لليابان؟", o: ["اليورو", "الين", "الوون", "اليوان"], a: 1, topic: "اقتصاد", explanation: "الين هو العملة الرسمية لليابان." },
    { q: "ما عدد لاعبي فريق الكرة الطائرة؟", o: ["5", "6", "7", "11"], a: 1, topic: "رياضة", explanation: "فريق الكرة الطائرة يتكون من 6 لاعبين." },
    { q: "ما أكبر بحيرة في العالم؟", o: ["بحر الخزر", "البحر الميت", "بحيرة فيكتوريا", "بحيرة سوبيريور"], a: 3, topic: "بحار ومحيطات", explanation: "بحيرة سوبيريور هي أكبر بحيرة مياه عذبة في العالم." },
    { q: "من مؤلف رواية 'مئة عام من العزلة'؟", o: ["ماركيز", "بورخيس", "لوبوسا", "أليندي"], a: 0, topic: "كتب وروايات", explanation: "غابرييل غارسيا ماركيز ألف مئة عام من العزلة." },
  ],
  hard: [
    { q: "ما اسم العالم الذي وضع النظرية النسبية؟", o: ["نيوتن", "أينشتاين", "بوهر", "هوكينغ"], a: 1, topic: "اكتشافات علمية", explanation: "ألبرت أينشتاين وضع النظرية النسبية عام 1905." },
    { q: "في أي عام سقطت الأندلس؟", o: ["1453", "1492", "1517", "1609"], a: 1, topic: "تاريخ", explanation: "سقطت غرناطة آخر معاقل المسلمين في الأندلس عام 1492م." },
    { q: "ما أعمق نقطة في المحيطات؟", o: ["خندق بورتوريكو", "خندق ماريانا", "خندق جاوة", "خندق تونغا"], a: 1, topic: "بحار ومحيطات", explanation: "خندق ماريانا هو أعمق نقطة في المحيطات عند 11 كم تقريباً." },
    { q: "من هو مؤلف كتاب 'الأمير'؟", o: ["ماكيافيلي", "هوبز", "لوك", "روسو"], a: 0, topic: "كتب وروايات", explanation: "نيكولو ماكيافيلي ألف كتاب 'الأمير' عام 1513." },
    { q: "ما الرمز الكيميائي للفضة؟", o: ["Si", "Ag", "Sv", "Ar"], a: 1, topic: "كيمياء", explanation: "الرمز الكيميائي للفضة هو Ag من الكلمة اللاتينية Argentum." },
    { q: "كم عدد رقع رقعة الشطرنج؟", o: ["49", "64", "81", "100"], a: 1, topic: "معرفة عامة", explanation: "رقعة الشطرنج تتكون من 64 مربعاً (8×8)." },
    { q: "ما أطول سلسلة جبال في العالم؟", o: ["جبال روكي", "جبال الأنديز", "جبال الهيمالايا", "جبال الألب"], a: 1, topic: "جغرافيا", explanation: "جبال الأنديز هي أطول سلسلة جبال في العالم بطول 7000 كم." },
    { q: "من هو مكتشف البنسلين؟", o: ["لويس باستور", "ألكسندر فليمنغ", "روبرت كوخ", "إدوارد جينر"], a: 1, topic: "اكتشافات علمية", explanation: "ألكسندر فليمنغ اكتشف البنسلين عام 1928." },
    { q: "ما مساحة إفريقيا تقريباً؟", o: ["20 مليون كم²", "30 مليون كم²", "40 مليون كم²", "50 مليون كم²"], a: 1, topic: "جغرافيا", explanation: "مساحة أفريقيا حوالي 30 مليون كيلومتر مربع." },
    { q: "من رسم لوحة 'الليلة المرصعة بالنجوم'؟", o: ["بيكاسو", "فان جوخ", "مونيه", "سيزان"], a: 1, topic: "فنون", explanation: "فينسنت فان جوخ رسم 'الليلة المرصعة بالنجوم' عام 1889." },
    { q: "ما أصغر دولة في العالم من حيث المساحة؟", o: ["موناكو", "الفاتيكان", "سان مارينو", "مالطا"], a: 1, topic: "جغرافيا", explanation: "الفاتيكان هي أصغر دولة في العالم بمساحة 0.44 كم²." },
    { q: "في أي عام بدأت الحرب العالمية الأولى؟", o: ["1912", "1914", "1916", "1918"], a: 1, topic: "تاريخ", explanation: "بدأت الحرب العالمية الأولى عام 1914." },
    { q: "ما اسم أول قمر صناعي أُطلق للفضاء؟", o: ["أبولو", "سبوتنيك", "فوياجر", "هابل"], a: 1, topic: "فضاء", explanation: "سبوتنيك 1 كان أول قمر صناعي أطلقه الاتحاد السوفيتي عام 1957." },
    { q: "من هو مؤلف 'الجمهورية'؟", o: ["أرسطو", "أفلاطون", "سقراط", "هوميروس"], a: 1, topic: "فلسفة", explanation: "أفلاطون ألف كتاب 'الجمهورية' عن الدولة العادلة." },
    { q: "ما العدد الذري للأكسجين؟", o: ["6", "7", "8", "9"], a: 2, topic: "كيمياء", explanation: "العدد الذري للأكسجين هو 8." },
    { q: "كم عدد دول الاتحاد الأوروبي (تقريباً)؟", o: ["22", "27", "32", "35"], a: 1, topic: "سياسة", explanation: "الاتحاد الأوروبي يضم 27 دولة عضو." },
    { q: "ما اسم الجسر الذي يربط آسيا بأمريكا الشمالية جغرافياً؟", o: ["جسر البوسفور", "مضيق بيرينغ", "قناة بنما", "مضيق جبل طارق"], a: 1, topic: "جغرافيا", explanation: "مضيق بيرينغ يفصل بين آسيا وأمريكا الشمالية." },
    { q: "من هو قائد ثورة كوبا؟", o: ["تشي جيفارا", "فيدل كاسترو", "هوغو تشافيز", "زاباتا"], a: 1, topic: "شخصيات تاريخية", explanation: "فيدل كاسترو قاد الثورة الكوبية عام 1959." },
    { q: "ما اسم الحضارة التي بنت مدينة Machu Picchu؟", o: ["المايا", "الإنكا", "الأزتيك", "الأولمك"], a: 1, topic: "حضارات قديمة", explanation: "حضارة الإنكا بنت Machu Picchu في بيرو." },
    { q: "ما أصل كلمة 'الجبر' في الرياضيات؟", o: ["إغريقي", "عربي", "هندي", "فارسي"], a: 1, topic: "رياضيات", explanation: "كلمة الجبر من كتاب 'الجبر والمقابلة' للعالم محمد بن موسى الخوارزمي." },
    { q: "ما لغة البرمجة الأقدم بين التالية؟", o: ["Python", "C", "Fortran", "Java"], a: 2, topic: "تكنولوجيا", explanation: "Fortran ظهرت عام 1957 وهي أقدم من C و Python و Java." },
    { q: "كم عدد أعمال سيدنا سليمان حسب التراث؟", o: ["100", "300", "500", "700"], a: 1, topic: "دين", explanation: "حسب التراث، لسليمان 300 ملك و 700 سرية." },
    { q: "ما أكبر شبه جزيرة في العالم؟", o: ["شبه الجزيرة العربية", "شبه الجزيرة الهندية", "شبه الجزيرة الإسكندنافية", "شبه جزيرة كامتشاتكا"], a: 0, topic: "جغرافيا", explanation: "شبه الجزيرة العربية هي أكبر شبه جزيرة في العالم." },
    { q: "ما اسم العاصمة البيزنطية قبل أن تصبح إسطنبول؟", o: ["روما", "القسطنطينية", "أثينا", "أنقرة"], a: 1, topic: "تاريخ", explanation: "كانت تُسمى القسطنطينية قبل أن تصبح إسطنبول." },
    { q: "ما اسم المضيق الذي يربط البحر الأبيض المتوسط بالمحيط الأطلسي؟", o: ["مضيق هرمز", "مضيق جبل طارق", "مضيق البوسفور", "مضيق باب المندب"], a: 1, topic: "بحار ومحيطات", explanation: "مضيق جبل طارق يربط المتوسط بالأطلسي." },
  ],
  expert: [
    { q: "ما اسم العالم الذي اكتشف الراديوم؟", o: ["ماري كوري", "ألبرت أينشتاين", "إرنست رذرفورد", "نيلز بور"], a: 0, topic: "اكتشافات علمية", explanation: "ماري كوري اكتشفت الراديوم والبولونيوم وحصلت على نوبل مرتين." },
    { q: "في أي عام تأسست الأمم المتحدة؟", o: ["1939", "1945", "1949", "1955"], a: 1, topic: "سياسة", explanation: "تأسست الأمم المتحدة عام 1945 بعد الحرب العالمية الثانية." },
    { q: "من هو مؤلف رواية 'الحرب والسلام'؟", o: ["ديكنز", "تولستوي", "دوستويفسكي", "تورغينيف"], a: 1, topic: "كتب وروايات", explanation: "ليو تولستوي ألف 'الحرب والسلام' عام 1869." },
    { q: "ما اسم أصغر كوكب في المجموعة الشمسية؟", o: ["عطارد", "المريخ", "بلوتو", "الزهرة"], a: 0, topic: "فضاء", explanation: "عطارد هو أصغر كوكب في المجموعة الشمسية." },
    { q: "ما اسم المعركة التي انتصر فيها صلاح الدين على الصليبيين؟", o: ["عين جالوت", "حطين", "القادسية", "اليرموك"], a: 1, topic: "تاريخ", explanation: "معركة حطين عام 1187 انتصر فيها صلاح الدين على الصليبيين." },
    { q: "ما سرعة دوران الأرض حول محورها عند خط الاستواء؟", o: ["≈ 465 م/ث", "≈ 1000 م/ث", "≈ 100 م/ث", "≈ 3000 م/ث"], a: 0, topic: "فلك", explanation: "تدور الأرض بسرعة ~465 متر/ثانية عند خط الاستواء." },
    { q: "من هو الفيلسوف صاحب مقولة 'أعرف أنني لا أعرف'؟", o: ["أفلاطون", "سقراط", "أرسطو", "ديكارت"], a: 1, topic: "فلسفة", explanation: "سقراط قال 'أعرف أنني لا أعرف شيئاً'." },
    { q: "ما اسم أصغر وحدة في المادة؟", o: ["الجزيء", "الذرة", "الكوارك", "الإلكترون"], a: 2, topic: "فيزياء", explanation: "الكوارك هو أصغر وحدة معروفة في المادة، ويتكون منها البروتون والنيوترون." },
    { q: "ما اسم أعلى قمة جبلية في العالم؟", o: ["K2", "إفرست", "كانشنجونغا", "أنابورنا"], a: 1, topic: "جغرافيا", explanation: "قمة إفرست هي أعلى قمة في العالم بارتفاع 8848 متراً." },
    { q: "كم عدد ركعات صلاة الكسوف؟", o: ["2", "4", "6", "8"], a: 0, topic: "دين", explanation: "صلاة الكسوف ركعتان بركوعين وسجودين في كل ركعة." },
    { q: "ما اسم الفيزيائي الذي اكتشف الإشعاع الكهرومغناطيسي؟", o: ["ماكسويل", "هيرتز", "فاراداي", "تسلا"], a: 1, topic: "اكتشافات علمية", explanation: "هاينريش هيرتز أثبت وجود الموجات الكهرومغناطيسية." },
    { q: "في أي عام سقطت الإمبراطورية العثمانية؟", o: ["1908", "1918", "1922", "1924"], a: 2, topic: "تاريخ", explanation: "انتهت الخلافة العثمانية رسمياً عام 1922 وأُلغيت عام 1924." },
    { q: "ما اسم أصغر دولة عربية من حيث عدد السكان؟", o: ["البحرين", "جزر القمر", "قطر", "جيبوتي"], a: 0, topic: "جغرافيا", explanation: "البحرين هي أصغر دولة عربية من حيث عدد السكان." },
    { q: "ما اسم المركب الكيميائي المسؤول عن طعم الليمون الحامض؟", o: ["الأسيتيك", "الستريك", "الملحي", "الفورميك"], a: 1, topic: "كيمياء", explanation: "حمض الستريك هو المسؤول عن طعم الليمون الحامض." },
    { q: "من هو مؤلف موسيقى 'السيمفونية التاسعة'؟", o: ["موتسارت", "بيتهوفن", "باخ", "تشايكوفسكي"], a: 1, topic: "موسيقى", explanation: "لودفيج فان بيتهوفن ألف السيمفونية التاسعة." },
    { q: "ما اسم أول رائد فضاء مشى على القمر؟", o: ["يوري غاغارين", "نيل أرمسترونغ", "باز ألدرين", "مايكل كولينز"], a: 1, topic: "فضاء", explanation: "نيل أرمسترونغ أول من مشى على القمر عام 1969." },
    { q: "ما اسم العالم الذي اكتشف الدورة الدموية؟", o: ["جالينوس", "ابن النفيس", "هارفي", "أبقراط"], a: 2, topic: "اكتشافات علمية", explanation: "وليام هارفي اكتشف الدورة الدموية الكبرى (وابن النفيس سبقه بالصغرى)." },
    { q: "كم عدد أبواب الجنة حسب التراث الإسلامي؟", o: ["4", "6", "8", "12"], a: 2, topic: "دين", explanation: "للجنة 8 أبواب حسب التراث الإسلامي." },
    { q: "ما اسم أقدم جامعة في العالم؟", o: ["الأزهر", "القرويين", "بولونيا", "أكسفورد"], a: 1, topic: "تاريخ", explanation: "جامعة القرويين في المغرب أسسها فاطمة الفهرية عام 859م." },
    { q: "ما اسم النهر الذي يمر بأكبر عدد من العواصم؟", o: ["النيل", "الدانوب", "الراين", "الأمازون"], a: 1, topic: "جغرافيا", explanation: "نهر الدانوب يمر بـ 4 عواصم أوروبية: فيينا، براتيسلافا، بودابست، بلغراد." },
    { q: "من هو العالم العربي صاحب كتاب 'القانون في الطب'؟", o: ["ابن سينا", "الرازي", "ابن النفيس", "الزهراوي"], a: 0, topic: "طب", explanation: "ابن سينا ألف 'القانون في الطب' الذي ظل مرجعاً لأوروبا لقرون." },
    { q: "ما اسم أصغر جسيم في الكون حسب النموذج المعياري؟", o: ["الإلكترون", "الفوتون", "الكوارك", "النيوترينو"], a: 2, topic: "فيزياء", explanation: "الكواركات من أصغر الجسيمات المعروفة ضمن النموذج المعياري." },
    { q: "في أي عام انتهت الحرب الباردة تقريباً؟", o: ["1985", "1989", "1991", "1995"], a: 2, topic: "تاريخ", explanation: "انتهت الحرب الباردة بتفكك الاتحاد السوفيتي عام 1991." },
    { q: "ما اسم العالم الذي طوّر نظرية الكم؟", o: ["بور", "هايزنبرغ", "بلانك", "شرودنغر"], a: 2, topic: "فيزياء", explanation: "ماكس بلانك وضع أسس نظرية الكم عام 1900." },
    { q: "كم عدد سور القرآن الكريم؟", o: ["100", "114", "120", "130"], a: 1, topic: "دين", explanation: "عدد سور القرآن الكريم 114 سورة." },
  ],
};

/* ====== أوضاع اللعبة ====== */
const CLASSIC_PRIZES = [1000, 2000, 3000, 5000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000, 2000000, 3000000, 5000000];
const MARATHON_PRIZES = [500,1000,2000,3000,5000,7000,10000,15000,20000,25000,35000,50000,70000,100000,150000,200000,300000,400000,550000,700000,900000,1200000,1600000,2100000,2700000,3500000,4500000,6000000,8000000,10000000];

const MODES = {
  classic: {
    id: "classic", name: "كلاسيكي", description: "اللعبة الأصلية بـ 15 سؤالاً ووسائل مساعدة، طريقك للمليون",
    icon: "💰", color: "linear-gradient(135deg, #f59e0b, #d97706)",
    totalQuestions: 15, hasLifelines: true, hasTimer: false, timerSeconds: 0,
    allowWalkAway: true, mistakes: 0,
    prizes: CLASSIC_PRIZES, safeLevels: [4, 8, 11],
    rules: ["15 سؤالاً بصعوبة متدرجة من السهل للخبير", "ثلاث مراحل أمان: عند السؤال 5 و9 و12 تضمن المبلغ", "وسائل مساعدة: 50:50، الاتصال بصديق، رأي الجمهور، استبدال السؤال، الإجابة المزدوجة", "يمكنك الانسحاب في أي وقت والاحتفاظ بما ربحت", "الجائزة الكبرى: 5,000,000"],
  },
  endless: {
    id: "endless", name: "لانهائي", description: "أسئلة لا تنتهي بصعوبة متزايدة، كم سؤالاً تستطيع إجابته؟",
    icon: "♾️", color: "linear-gradient(135deg, #8b5cf6, #d946ef)",
    totalQuestions: 0, hasLifelines: true, hasTimer: false, timerSeconds: 0,
    allowWalkAway: false, mistakes: 0,
    prizes: [], safeLevels: [],
    rules: ["أسئلة لا نهائية حتى تخطئ", "كل 5 أسئلة ترتفع الصعوبة", "أعلى عدد من الإجابات الصحيحة يُسجّل كأفضل نتيجة", "وسائل المساعدة متاحة مرة واحدة", "يمكنك العودة للقائمة الرئيسية في أي وقت"],
  },
  survival: {
    id: "survival", name: "بقاء", description: "3 أرواح فقط، أخطاؤك تُحوّل إلى نقاط تعليمي. تستطيع الاستمرار",
    icon: "🛡️", color: "linear-gradient(135deg, #10b981, #14b8a6)",
    totalQuestions: 0, hasLifelines: false, hasTimer: true, timerSeconds: 45,
    allowWalkAway: false, mistakes: 3,
    prizes: [], safeLevels: [],
    rules: ["تبدأ بـ 3 أرواح (قلوب)", "كل إجابة خاطئة أو انتهاء وقت يخصم قلباً", "كل 10 إجابات صحيحة تستعيد قلباً (بحد أقصى 3)", "اللعبة تنتهي عند نفاد الأرواح", "النقاط = عدد الإجابات الصحيحة × 100", "يمكنك العودة للقائمة الرئيسية في أي وقت"],
  },
  marathon: {
    id: "marathon", name: "ماراثون", description: "30 سؤالاً، أصعب رحلة في تاريخ اللعبة بجوائز ضخمة",
    icon: "🏆", color: "linear-gradient(135deg, #f43f5e, #f97316)",
    totalQuestions: 30, hasLifelines: true, hasTimer: true, timerSeconds: 60,
    allowWalkAway: true, mistakes: 0,
    prizes: MARATHON_PRIZES, safeLevels: [4, 9, 14, 19, 24],
    rules: ["30 سؤالاً — أطول تحدٍّ على الإطلاق", "60 ثانية لكل سؤال", "5 مراحل أمان للوصول لجائزة 10,000,000", "وسائل المساعدة: مرة واحدة لكل نوع", "فقط للأبطال الذين لا يستسلمون!"],
  },
};

const LETTERS = ["أ", "ب", "ج", "د"];

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
  lastResult: null,
};

/* ====== الإحصائيات (localStorage) ====== */
function loadStats() {
  try {
    const raw = localStorage.getItem("millionaire_stats");
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    gamesPlayed: 0, gamesWon: 0, totalWinnings: 0,
    bestClassicPrize: 0, bestEndlessScore: 0, bestStreak: 0,
    totalCorrect: 0, totalQuestions: 0, fastestAnswer: 0,
    perfectGames: 0, lastPlayed: 0, dailyStreak: 0, lastPlayDate: "",
  };
}

function saveStats(stats) {
  try { localStorage.setItem("millionaire_stats", JSON.stringify(stats)); } catch {}
}

function loadApiKey() {
  try { state.apiKey = localStorage.getItem("millionaire_api_key") || ""; } catch {}
}

function saveApiKeyToStorage(key) {
  state.apiKey = key;
  try { localStorage.setItem("millionaire_api_key", key); } catch {}
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

/* ====== اختيار الوضع ====== */
function renderModes() {
  const grid = document.getElementById("modes-grid");
  grid.innerHTML = "";
  Object.values(MODES).forEach(mode => {
    const card = document.createElement("div");
    card.className = "mode-card";
    card.style.borderTop = `4px solid transparent`;
    card.style.background = `var(--bg-card)`;
    card.innerHTML = `
      <div class="mode-icon">${mode.icon}</div>
      <div class="mode-name">${mode.name}</div>
      <div class="mode-desc">${mode.description}</div>
    `;
    card.onclick = () => showRules(mode.id);
    grid.appendChild(card);
  });
}

function showRules(modeId) {
  const mode = MODES[modeId];
  state.selectedMode = modeId;
  document.getElementById("rules-title").textContent = `${mode.icon} ${mode.name}`;
  const content = document.getElementById("rules-content");
  content.innerHTML = `
    <h3>قواعد وضع ${mode.name}</h3>
    <ul>${mode.rules.map(r => `<li>${r}</li>`).join("")}</ul>
  `;
  showScreen("rules");
}

function startSelectedMode() {
  if (!state.selectedMode) return;
  startGame(state.selectedMode);
}

/* ====== بدء اللعبة ====== */
function defaultLifelines(hasLifelines) {
  if (!hasLifelines) return { fifty: false, friend: false, audience: false, switch: false, double: false };
  return { fifty: true, friend: true, audience: true, switch: true, double: true };
}

function startGame(modeId) {
  const mode = MODES[modeId];
  state.selectedMode = modeId;
  state.currentIndex = 0;
  state.question = null;
  state.loading = true;
  state.locked = false;
  state.lifelines = defaultLifelines(mode.hasLifelines);
  state.mistakes = 0;
  state.streak = 0;
  state.bestStreak = 0;
  state.totalCorrect = 0;
  state.usedSwitchThisQuestion = false;
  state.usedDoubleThisQuestion = false;
  state.askedQuestions = new Set();
  state.awaitingNext = false;
  state.doubleRetryMode = false;
  state.selectedIndex = null;
  state.revealed = false;
  state.eliminatedIndices = [];

  // إعدادات الرأس
  document.getElementById("game-mode-name").textContent = `${mode.icon} ${mode.name}`;
  document.getElementById("prize-chip").style.display = mode.prizes.length > 0 ? "" : "none";
  document.getElementById("lives-chip").style.display = mode.mistakes > 0 ? "" : "none";
  document.getElementById("score-chip").style.display = mode.id === "endless" || mode.id === "survival" ? "" : "none";
  document.getElementById("walkaway-btn").style.display = mode.allowWalkAway ? "" : "none";
  document.getElementById("exit-menu-btn").style.display = (mode.totalQuestions === 0) ? "" : "none";

  renderPrizeLadder();
  renderLifelines();

  // مسح أي محتوى من الجولة السابقة قبل عرض الشاشة
  // لتفادي وميض السؤال القديم قبل تحميل الجديد
  document.getElementById("question-text").textContent = "جارٍ تحميل السؤال…";
  document.getElementById("options-grid").innerHTML = "";
  document.getElementById("question-topic").style.display = "none";
  document.getElementById("correct-count-tag").style.display = "none";
  document.getElementById("explanation-panel").style.display = "none";
  document.getElementById("assist-panel").style.display = "none";
  document.getElementById("next-question-wrapper").style.display = "none";
  document.getElementById("loading-progress-wrapper").style.display = "none";
  document.getElementById("timer-container").style.display = "none";
  document.getElementById("loading-next").style.display = "none";
  document.getElementById("streak-badge").style.display = "none";

  showScreen("playing");
  loadQuestion();
}

/* ====== توليد السؤال ====== */
function getDifficultyFromIndex(index, total) {
  if (total === 0) {
    if (index < 5) return "easy";
    if (index < 12) return "medium";
    if (index < 22) return "hard";
    return "expert";
  }
  const ratio = index / total;
  if (ratio < 0.33) return "easy";
  if (ratio < 0.55) return "medium";
  if (ratio < 0.78) return "hard";
  return "expert";
}

function normalizeQuestion(text) {
  return (text || "").toLowerCase()
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, "")
    .replace(/[إأآا]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[؟!.,،؛:"'()\[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getFallbackQuestion(difficulty, askedSet) {
  const bank = QUESTION_BANK[difficulty];
  // ابحث عن سؤال غير مكرر
  const available = bank.filter(q => !askedSet.has(normalizeQuestion(q.q)));
  const pool = available.length > 0 ? available : bank;
  return pool[Math.floor(Math.random() * pool.length)];
}

const TOPICS = [
  "جغرافيا", "تاريخ", "علوم", "رياضيات", "أدب", "فنون",
  "رياضة", "دين", "تكنولوجيا", "فضاء", "طب", "حيوانات",
  "نباتات", "طعام", "موسيقى", "أفلام", "لغات", "اقتصاد",
  "سياسة", "فلسفة", "كيمياء", "فيزياء", "فلك", "بحار ومحيطات",
  "حضارات قديمة", "شخصيات تاريخية", "عواصم ومدن", "معالم سياحية",
  "اختراعات", "اكتشافات علمية", "كتب وروايات",
];

async function fetchQuestionFromAI(index, total) {
  if (!state.apiKey) return null;

  const difficulty = getDifficultyFromIndex(index, total);
  const diffLabel = { easy: "سهل", medium: "متوسط", hard: "صعب", expert: "خبير" }[difficulty];
  const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];

  const systemPrompt = "أنت مولّد أسئلة محترف للعبة 'من سيربح المليون' باللغة العربية. كل سؤال يجب أن يكون فريداً ومختلفاً عن أي سؤال سابق. أعطِ الإجابة دائماً بصيغة JSON صارمة فقط بدون أي نص إضافي.";
  const userPrompt = `ولّد سؤالاً ثقافياً واحداً حول موضوع: «${topic}»\nبمستوى صعوبة: ${diffLabel} (لعبة من سيربح المليون).\n\nالشروط:\n- سؤال أصلي ومختلف عن أي سؤال آخر.\n- 4 خيارات متقاربة ومنطقية، إجابة صحيحة واحدة فقط.\n- أضف حقل "explanation" قصير (جملة واحدة) يشرح لماذا الإجابة صحيحة.\n- أضف حقل "topic" يعكس الموضوع.\n\nأعطِ النتيجة بصيغة JSON فقط بالشكل التالي:\n{"question":"نص السؤال","options":["الخيار1","الخيار2","الخيار3","الخيار4"],"answerIndex":0,"explanation":"شرح قصير","topic":"الموضوع"}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${state.apiKey}`,
        "HTTP-Referer": "https://who-wants-to-be-a-millionaire.local",
        "X-Title": "Arabic Millionaire Game",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 1.0,
        max_tokens: 400,
      }),
    });

    if (!res.ok) throw new Error("HTTP " + res.status);

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) return null;

    const match = text.match(/\{[\s\S]*\}/);
    const obj = JSON.parse(match ? match[0] : text);

    if (
      typeof obj.question === "string" && obj.question.trim().length > 0 &&
      Array.isArray(obj.options) && obj.options.length === 4 &&
      obj.options.every(o => typeof o === "string" && o.trim().length > 0) &&
      Number.isInteger(obj.answerIndex) && obj.answerIndex >= 0 && obj.answerIndex < 4
    ) {
      return {
        q: obj.question.trim(),
        o: obj.options.map(x => x.trim()),
        a: obj.answerIndex,
        explanation: typeof obj.explanation === "string" ? obj.explanation.trim() : undefined,
        topic: typeof obj.topic === "string" ? obj.topic.trim() : topic,
        difficulty,
      };
    }
    return null;
  } catch (err) {
    console.warn("فشل توليد السؤال بالذكاء الاصطناعي:", err.message);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function loadQuestion() {
  state.loading = true;
  state.locked = false;
  state.awaitingNext = false;
  state.doubleRetryMode = false;
  state.selectedIndex = null;
  state.revealed = false;
  state.eliminatedIndices = [];
  document.getElementById("loading-next").style.display = "none";
  document.getElementById("next-question-wrapper").style.display = "none";
  document.getElementById("explanation-panel").style.display = "none";
  document.getElementById("assist-panel").style.display = "none";

  const mode = MODES[state.selectedMode];
  const difficulty = getDifficultyFromIndex(state.currentIndex, mode.totalQuestions);

  // جرّب AI أولاً إن وُجد مفتاح
  let q = null;
  if (state.apiKey) {
    q = await fetchQuestionFromAI(state.currentIndex, mode.totalQuestions);
    if (q) {
      const norm = normalizeQuestion(q.q);
      if (state.askedQuestions.has(norm)) q = null; // مكرر
    }
  }

  // fallback للبنك المحلي
  if (!q) {
    q = getFallbackQuestion(difficulty, state.askedQuestions);
  }

  state.question = q;
  state.askedQuestions.add(normalizeQuestion(q.q));
  state.loading = false;

  renderQuestion();
  startTimer();
}

/* ====== المؤقت ====== */
function startTimer() {
  const mode = MODES[state.selectedMode];
  if (!mode.hasTimer) {
    document.getElementById("timer-container").style.display = "none";
    return;
  }
  if (state.locked || state.awaitingNext || state.doubleRetryMode) {
    document.getElementById("timer-container").style.display = "none";
    return;
  }
  state.timerRemaining = mode.timerSeconds;
  document.getElementById("timer-container").style.display = "";
  updateTimerUI();

  if (state.timerInterval) clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    state.timerRemaining--;
    if (state.timerRemaining <= 0) {
      clearInterval(state.timerInterval);
      handleTimeout();
    } else {
      if (state.timerRemaining <= 6) sounds.tick();
      updateTimerUI();
    }
  }, 1000);
}

function stopTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
  document.getElementById("timer-container").style.display = "none";
}

function updateTimerUI() {
  const mode = MODES[state.selectedMode];
  const el = document.getElementById("timer-value");
  const bar = document.getElementById("timer-bar");
  el.textContent = state.timerRemaining + " ثانية";
  if (state.timerRemaining <= 10) el.style.color = "#ef4444"; else el.style.color = "#00d4ff";
  const ratio = state.timerRemaining / mode.timerSeconds;
  bar.style.width = (ratio * 100) + "%";
  bar.classList.toggle("danger", state.timerRemaining <= 10);
}

function handleTimeout() {
  if (state.locked) return;
  const mode = MODES[state.selectedMode];
  if (mode.mistakes > 0) {
    addMistake();
    sounds.loseLife();
    if (state.mistakes >= mode.mistakes) {
      endGame(false, 0, "ended");
    } else {
      // عرض زر التالي
      state.locked = true;
      state.awaitingNext = true;
      stopTimer();
      renderQuestion();
      document.getElementById("next-question-wrapper").style.display = "";
      document.getElementById("next-question-btn").textContent = "⏰ انتهى الوقت — السؤال التالي ←";
    }
  } else {
    endGame(false, 0, "timeout");
  }
}

/* ====== عرض السؤال ====== */
function renderQuestion() {
  const mode = MODES[state.selectedMode];
  const q = state.question;
  if (!q) return;

  document.getElementById("question-number").textContent = (state.currentIndex + 1) + (mode.totalQuestions > 0 ? ` من ${mode.totalQuestions}` : "");
  document.getElementById("question-topic").textContent = q.topic || "";
  document.getElementById("question-topic").style.display = q.topic ? "" : "none";

  if (mode.id === "endless" || mode.id === "survival") {
    document.getElementById("correct-count-tag").textContent = `إجابات صحيحة: ${state.totalCorrect}`;
    document.getElementById("correct-count-tag").style.display = "";
  } else {
    document.getElementById("correct-count-tag").style.display = "none";
  }

  document.getElementById("question-text").textContent = q.q;

  // الخيارات
  const grid = document.getElementById("options-grid");
  grid.innerHTML = "";
  q.o.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.dataset.index = i;

    const isSelected = i === state.selectedIndex;
    const isCorrect = state.revealed && i === q.a;
    const isWrong = state.revealed && isSelected && i !== q.a;
    const isEliminated = state.eliminatedIndices.includes(i);

    if (isEliminated) btn.classList.add("eliminated");
    else if (isCorrect) btn.classList.add("correct");
    else if (isWrong) btn.classList.add("wrong");
    else if (isSelected) btn.classList.add("selected");

    btn.innerHTML = `<span class="option-letter">${LETTERS[i]}</span><span>${opt}</span>`;
    btn.disabled = state.locked || state.loading || isEliminated || state.awaitingNext;
    btn.onclick = () => handleAnswer(i);
    grid.appendChild(btn);
  });

  // تحديث الرأس
  if (mode.prizes.length > 0) {
    document.getElementById("current-prize").textContent = (mode.prizes[state.currentIndex] || 0).toLocaleString("en-US");
  }
  if (mode.mistakes > 0) {
    renderLives();
  }
  if (mode.id === "endless" || mode.id === "survival") {
    document.getElementById("current-score").textContent = state.totalCorrect * 100;
  }

  // شارة السلسلة
  document.getElementById("streak-badge").style.display = state.streak > 0 ? "" : "none";
  document.getElementById("streak-count").textContent = state.streak;

  // سلم الجوائز
  renderPrizeLadder();

  // شرح الإجابة
  if (state.locked && !state.doubleRetryMode && q.explanation) {
    document.getElementById("explanation-text").textContent = q.explanation;
    document.getElementById("explanation-panel").style.display = "";
  }

  // زر السؤال التالي
  if (state.awaitingNext) {
    document.getElementById("next-question-wrapper").style.display = "";
    const btn = document.getElementById("next-question-btn");
    if (mode.totalQuestions > 0 && state.currentIndex + 1 >= mode.totalQuestions) {
      btn.textContent = "🏆 إنهاء اللعبة";
    } else {
      btn.textContent = "السؤال التالي ←";
    }
  } else {
    document.getElementById("next-question-wrapper").style.display = "none";
  }

  renderLifelines();
}

function renderLives() {
  const mode = MODES[state.selectedMode];
  if (mode.mistakes <= 0) return;
  const remaining = mode.mistakes - state.mistakes;
  let html = "";
  for (let i = 0; i < mode.mistakes; i++) {
    html += i < remaining ? "❤️" : "🖤";
  }
  document.getElementById("lives-display").textContent = html;
}

function renderPrizeLadder() {
  const mode = MODES[state.selectedMode];
  const ladder = document.getElementById("prize-ladder");
  if (mode.prizes.length === 0) {
    ladder.style.display = "none";
    return;
  }
  ladder.style.display = "";
  let html = "<h3>سلم الجوائز</h3>";
  // عرض معكوس (الأعلى أولاً)
  for (let i = mode.prizes.length - 1; i >= 0; i--) {
    let cls = "prize-step";
    if (mode.safeLevels.includes(i)) cls += " safe";
    if (i < state.currentIndex) cls += " done";
    if (i === state.currentIndex) cls += " current";
    html += `<div class="${cls}"><span class="step-number">${i + 1}</span><span class="step-amount">${mode.prizes[i].toLocaleString("en-US")}</span></div>`;
  }
  ladder.innerHTML = html;
}

function renderLifelines() {
  const mode = MODES[state.selectedMode];
  const container = document.getElementById("lifelines");
  if (!mode.hasLifelines) { container.innerHTML = ""; return; }

  const lifelines = [
    { key: "fifty", icon: "½", title: "حذف إجابتين", available: state.lifelines.fifty },
    { key: "friend", icon: "☎", title: "الاتصال بصديق", available: state.lifelines.friend },
    { key: "audience", icon: "👥", title: "رأي الجمهور", available: state.lifelines.audience },
    { key: "switch", icon: "🔁", title: "استبدال السؤال", available: state.lifelines.switch && !state.usedSwitchThisQuestion },
    { key: "double", icon: "⚡", title: "إجابة مزدوجة", available: state.lifelines.double && !state.usedDoubleThisQuestion },
  ];

  container.innerHTML = lifelines.map(l => 
    `<button class="lifeline-btn" ${!l.available ? "disabled" : ""} title="${l.title}" onclick="useLifeline('${l.key}')">${l.icon}</button>`
  ).join("");
}

/* ====== معالجة الإجابة ====== */
async function handleAnswer(chosenIndex) {
  if (state.locked || !state.question) return;
  state.locked = true;
  state.selectedIndex = chosenIndex;
  stopTimer();
  sounds.select();

  const q = state.question;
  const correct = chosenIndex === q.a;

  await sleep(700);

  if (correct) {
    // إجابة صحيحة — اكشف عنها بالأخضر
    state.revealed = true;
    renderQuestion();
    sounds.correct();
    state.streak++;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    state.totalCorrect++;

    // استعادة قلب في وضع البقاء كل 10 إجابات صحيحة
    const mode = MODES[state.selectedMode];
    if (mode.mistakes > 0 && state.totalCorrect % 10 === 0 && state.mistakes > 0) {
      state.mistakes--;
      sounds.recover();
    }

    await sleep(1100);
    if (mode.safeLevels.includes(state.currentIndex)) sounds.safe();
    else sounds.next();

    // عرض زر السؤال التالي بدلاً من الانتقال التلقائي
    state.awaitingNext = true;
    renderQuestion();
  } else {
    // وسيلة الإجابة المزدوجة: لا تكشف عن الإجابة الصحيحة، فقط أظهر الخطأ ثم اسمح بإعادة المحاولة
    if (state.usedDoubleThisQuestion && !state.doubleRetryMode) {
      sounds.wrong();
      // أظهر الإجابة الخاطئة بالأحمر فقط (دون كشف الصحيحة)
      // revealed تبقى false حتى لا تظهر الإجابة الصحيحة بالأخضر
      state.revealed = false;
      // استخدم حالة مؤقتة لعرض الإجابة الخاطئة بالأحمر
      state.doubleRetryMode = true;
      state.eliminatedIndices = [...state.eliminatedIndices, chosenIndex];
      state.locked = false;
      // أعد رسم لإظهار الخيار الخاطئ مشطوباً
      renderQuestion();
      // انتظار قصير قبل عرض رسالة إعادة المحاولة
      await sleep(600);
      showAssist("🎯 الإجابة المزدوجة", "إجابة خاطئة! يمكنك المحاولة مرة أخرى. اختر إجابة أخرى من الخيارات المتبقية.");
      startTimer();
      return;
    }

    // لا توجد إجابة مزدوجة أو استُخدمت بالفعل — اكشف عن الصحيحة والخاطئة
    state.revealed = true;
    renderQuestion();

    sounds.wrong();
    state.streak = 0;

    const mode = MODES[state.selectedMode];
    if (mode.mistakes > 0 && state.mistakes + 1 < mode.mistakes) {
      state.mistakes++;
      sounds.loseLife();
      await sleep(1400);
      state.awaitingNext = true;
      renderQuestion();
    } else {
      await sleep(1500);
      const lastSafe = mode.safeLevels.filter(i => i < state.currentIndex).pop();
      const prize = lastSafe !== undefined ? mode.prizes[lastSafe] : 0;
      endGame(false, prize, "wrong");
    }
  }
}

async function goToNextQuestion() {
  sounds.click();
  const mode = MODES[state.selectedMode];

  // إن كان السؤال الحالي هو الأخير، أنهِ اللعبة مباشرةً
  if (mode.totalQuestions > 0 && state.currentIndex + 1 >= mode.totalQuestions) {
    const prize = mode.prizes[state.currentIndex] || 0;
    endGame(true, prize, "win");
    return;
  }

  // إخفاء زر السؤال التالي وكل العناصر المرتبطة بالسؤال الحالي
  document.getElementById("next-question-wrapper").style.display = "none";
  document.getElementById("explanation-panel").style.display = "none";
  document.getElementById("assist-panel").style.display = "none";

  // إفراغ منطقة السؤال والخيارات لتفادي عرض السؤال القديم أثناء التحميل
  document.getElementById("question-text").textContent = "";
  document.getElementById("options-grid").innerHTML = "";
  document.getElementById("question-topic").style.display = "none";
  document.getElementById("correct-count-tag").style.display = "none";

  // إيقاف أي مؤقّت نشط
  stopTimer();

  // عرض شريط التحميل
  showLoadingProgress();

  // الانتقال للسؤال التالي
  state.currentIndex++;
  state.usedSwitchThisQuestion = false;
  state.usedDoubleThisQuestion = false;

  // ابدأ تحميل السؤال بشكل غير متزامن مع متابعة تقدّم الشريط
  const loadPromise = loadQuestion();
  await loadPromise;

  // أكمل الشريط إلى 100% ثم أخفِه
  await completeLoadingProgress();
  hideLoadingProgress();
}

/* ====== شريط تحميل السؤال التالي ====== */
let loadingProgressInterval = null;
let loadingProgressValue = 0;

function showLoadingProgress() {
  const wrapper = document.getElementById("loading-progress-wrapper");
  const bar = document.getElementById("loading-progress-bar");
  const status = document.getElementById("loading-progress-status");
  const label = document.getElementById("loading-progress-label");

  loadingProgressValue = 0;
  bar.style.width = "0%";
  status.textContent = "يرجى الانتظار…";
  label.textContent = state.apiKey
    ? "جارٍ توليد سؤال جديد بالذكاء الاصطناعي…"
    : "جارٍ تجهيز السؤال التالي…";
  wrapper.style.display = "";

  // محاكاة تقدّم تدريجي حتى 90% ثم توقّف حتى يكتمل التحميل فعلياً
  if (loadingProgressInterval) clearInterval(loadingProgressInterval);
  loadingProgressInterval = setInterval(() => {
    if (loadingProgressValue < 90) {
      // تباطؤ تدريجي كلما اقتربنا من 90%
      const increment = loadingProgressValue < 30 ? 8
                      : loadingProgressValue < 60 ? 4
                      : loadingProgressValue < 80 ? 1.5
                      : 0.4;
      loadingProgressValue = Math.min(90, loadingProgressValue + increment);
      bar.style.width = loadingProgressValue + "%";

      // تحديث الرسالة حسب التقدّم
      if (loadingProgressValue >= 30 && loadingProgressValue < 70) {
        status.textContent = "جارٍ المعالجة…";
      } else if (loadingProgressValue >= 70) {
        status.textContent = "يكاد يكتمل…";
      }
    }
  }, 120);
}

async function completeLoadingProgress() {
  if (loadingProgressInterval) {
    clearInterval(loadingProgressInterval);
    loadingProgressInterval = null;
  }
  const bar = document.getElementById("loading-progress-bar");
  const status = document.getElementById("loading-progress-status");
  // اكتمل الشريط إلى 100%
  loadingProgressValue = 100;
  bar.style.width = "100%";
  status.textContent = "✓ تم تجهيز السؤال!";
  // انتظار قصير لإظهار اكتمال الشريط قبل الانتقال
  await sleep(350);
}

function hideLoadingProgress() {
  document.getElementById("loading-progress-wrapper").style.display = "none";
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

/* ====== وسائل المساعدة ====== */
function useLifeline(key) {
  if (state.locked || !state.question) return;
  const mode = MODES[state.selectedMode];
  if (!mode.hasLifelines) return;
  if (!state.lifelines[key]) return;
  if (key === "switch" && state.usedSwitchThisQuestion) return;
  if (key === "double" && state.usedDoubleThisQuestion) return;

  state.lifelines[key] = false;
  sounds.lifeline();

  if (key === "fifty") useFifty();
  else if (key === "friend") useFriend();
  else if (key === "audience") useAudience();
  else if (key === "switch") useSwitch();
  else if (key === "double") useDouble();

  renderLifelines();
}

function useFifty() {
  const q = state.question;
  const wrong = [0, 1, 2, 3].filter(i => i !== q.a);
  const shuffled = wrong.sort(() => Math.random() - 0.5).slice(0, 2);
  state.eliminatedIndices = [...state.eliminatedIndices, ...shuffled];
  renderQuestion();
}

function useFriend() {
  const q = state.question;
  const confident = Math.random() < 0.85;
  const guessIndex = confident ? q.a : Math.floor(Math.random() * 4);
  const surety = confident ? 80 + Math.floor(Math.random() * 18) : 40 + Math.floor(Math.random() * 30);
  showAssist("☎ الاتصال بصديق", `مرحباً! أعتقد أن الإجابة الصحيحة هي الخيار <b style="color:#f5b800">${LETTERS[guessIndex]}</b> (${q.o[guessIndex]}). أنا متأكد بنحو <b style="color:#f5b800">${surety}%</b>.`);
}

function useAudience() {
  const q = state.question;
  const correctPct = 45 + Math.floor(Math.random() * 35);
  let rem = 100 - correctPct;
  const others = [0, 1, 2, 3].filter(i => i !== q.a);
  const pcts = {};
  pcts[q.a] = correctPct;
  others.forEach((i, k) => {
    if (k === others.length - 1) pcts[i] = rem;
    else {
      const v = Math.floor(Math.random() * rem);
      pcts[i] = v;
      rem -= v;
    }
  });

  let html = "";
  [0, 1, 2, 3].forEach(i => {
    html += `<div class="poll-row"><span class="poll-letter">${LETTERS[i]}</span><div class="poll-bar-bg"><div class="poll-bar-fill" data-pct="${pcts[i]}"></div></div><span class="poll-pct">${pcts[i]}%</span></div>`;
  });
  showAssist("📊 رأي الجمهور", html);

  setTimeout(() => {
    document.querySelectorAll(".poll-bar-fill").forEach(bar => {
      bar.style.width = bar.dataset.pct + "%";
    });
  }, 100);
}

async function useSwitch() {
  state.usedSwitchThisQuestion = true;
  state.loading = true;
  state.locked = false;
  state.selectedIndex = null;
  state.revealed = false;
  state.eliminatedIndices = [];
  stopTimer();
  document.getElementById("loading-next").style.display = "";
  document.getElementById("loading-next").textContent = "جارٍ استبدال السؤال…";

  const mode = MODES[state.selectedMode];
  let q = null;
  if (state.apiKey) {
    q = await fetchQuestionFromAI(state.currentIndex, mode.totalQuestions);
    if (q && state.askedQuestions.has(normalizeQuestion(q.q))) q = null;
  }
  if (!q) {
    const difficulty = getDifficultyFromIndex(state.currentIndex, mode.totalQuestions);
    q = getFallbackQuestion(difficulty, state.askedQuestions);
  }
  state.question = q;
  state.askedQuestions.add(normalizeQuestion(q.q));
  state.loading = false;
  document.getElementById("loading-next").style.display = "none";
  renderQuestion();
  startTimer();
}

function useDouble() {
  state.usedDoubleThisQuestion = true;
  showAssist("🎯 الإجابة المزدوجة", "تم تفعيل الإجابة المزدوجة! إذا أخطأت، يمكنك المحاولة مرة أخرى.");
}

function showAssist(title, content) {
  const panel = document.getElementById("assist-panel");
  panel.innerHTML = `<span class="assist-panel-title">${title}</span>${content}`;
  panel.style.display = "";
}

/* ====== الانسحاب والعودة ====== */
function walkAway() {
  if (state.locked) return;
  sounds.walkaway();
  const mode = MODES[state.selectedMode];
  const prize = state.currentIndex > 0 ? (mode.prizes[state.currentIndex - 1] || 0) : 0;
  endGame(false, prize, "walkaway");
}

function exitToMenu() {
  if (state.locked) return;
  if (!confirm("هل تريد إنهاء اللعبة والعودة للقائمة الرئيسية؟")) return;
  sounds.click();
  stopTimer();
  showScreen("menu");
}

/* ====== إنهاء اللعبة ====== */
function addMistake() {
  state.mistakes++;
}

function endGame(won, prize, reason) {
  stopTimer();
  state.lastResult = { won, prize, reason, correctCount: state.totalCorrect, bestStreak: state.bestStreak, mode: state.selectedMode };

  // تحديث الإحصائيات
  const stats = loadStats();
  stats.gamesPlayed++;
  if (won) stats.gamesWon++;
  stats.totalWinnings += prize;
  stats.totalCorrect += state.totalCorrect;
  stats.totalQuestions += state.currentIndex + (won ? 1 : 0);
  stats.bestStreak = Math.max(stats.bestStreak, state.bestStreak);
  stats.lastPlayed = Date.now();
  const today = new Date().toDateString();
  if (stats.lastPlayDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    stats.dailyStreak = stats.lastPlayDate === yesterday ? stats.dailyStreak + 1 : 1;
    stats.lastPlayDate = today;
  }
  const mode = MODES[state.selectedMode];
  if (state.selectedMode === "classic" && prize > stats.bestClassicPrize) stats.bestClassicPrize = prize;
  if (state.selectedMode === "endless" && state.totalCorrect > stats.bestEndlessScore) stats.bestEndlessScore = state.totalCorrect;
  if (won && state.mistakes === 0) stats.perfectGames++;
  saveStats(stats);

  // عرض شاشة النهاية
  const icon = won ? "🏆" : (reason === "walkaway" ? "👋" : (reason === "timeout" ? "⏰" : "💔"));
  document.getElementById("end-icon").textContent = icon;
  
  let title = "انتهت اللعبة";
  if (won) title = "🎉 تهانينا! فزت!";
  else if (reason === "walkaway") title = "انسحبت بمكسب!";
  else if (reason === "timeout") title = "انتهى الوقت!";
  else if (reason === "ended") title = "نفدت الأرواح!";
  
  document.getElementById("end-title").textContent = title;
  
  let subtitle = "";
  if (won) subtitle = `أكملت ${mode.name} بنجاح وحصلت على الجائزة الكبرى!`;
  else if (reason === "walkaway") subtitle = `قررت الانسحاب والاحتفاظ بمكسبك.`;
  else if (reason === "timeout") subtitle = `انتهى الوقت قبل أن تجيب.`;
  else if (reason === "ended") subtitle = `نفدت جميع أرواحك. حظ أوفر في المرة القادمة!`;
  else subtitle = `إجابة خاطئة. توقفت عند السؤال ${state.currentIndex + 1}.`;
  document.getElementById("end-subtitle").textContent = subtitle;

  document.getElementById("end-prize").textContent = prize.toLocaleString("en-US");
  document.getElementById("end-correct").textContent = state.totalCorrect;
  document.getElementById("end-streak").textContent = state.bestStreak;

  if (won) sounds.win();
  else if (reason === "walkaway") sounds.walkaway();
  else sounds.wrong();

  setTimeout(() => showScreen("end"), 500);
}

/* ====== الإحصائيات ====== */
function renderStats() {
  const stats = loadStats();
  const container = document.getElementById("stats-container");
  const cards = [
    { icon: "🎮", label: "ألعاب لعبتها", value: stats.gamesPlayed },
    { icon: "🏆", label: "مرات الفوز", value: stats.gamesWon },
    { icon: "💰", label: "إجمالي المكاسب", value: stats.totalWinnings.toLocaleString("en-US") },
    { icon: "💎", label: "أفضل جائزة كلاسيكية", value: stats.bestClassicPrize.toLocaleString("en-US") },
    { icon: "♾️", label: "أفضل نتيجة لانهائية", value: stats.bestEndlessScore },
    { icon: "🔥", label: "أطول سلسلة", value: stats.bestStreak },
    { icon: "✅", label: "إجمالي الإجابات الصحيحة", value: stats.totalCorrect },
    { icon: "🎯", label: "ألعاب مثالية", value: stats.perfectGames },
    { icon: "📅", label: "أيام متتالية", value: stats.dailyStreak },
  ];
  container.innerHTML = cards.map(c => 
    `<div class="stat-card"><div class="stat-card-icon">${c.icon}</div><div class="stat-card-label">${c.label}</div><div class="stat-card-value">${c.value}</div></div>`
  ).join("");
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
  state.apiKey = "";
  state.soundEnabled = true;
  alert("تم حذف جميع البيانات.");
  showScreen("menu");
}

/* ====== التهيئة ====== */
function init() {
  loadApiKey();
  loadSoundPref();
  document.getElementById("sound-icon").textContent = state.soundEnabled ? "🔊" : "🔇";
  showScreen("menu");
}

// ابدأ عند تحميل الصفحة
window.addEventListener("DOMContentLoaded", init);
