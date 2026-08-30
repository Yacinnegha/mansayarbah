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
  nextQuestionPromise: null,  // 🚀 Prefetch: وعد السؤال التالي المُجهّز مسبقاً
  lastResult: null,
  questionSource: null, // "ai" أو "bank" — لتمييز خلفية السؤال بصمت
  usedTopicKeywords: new Set(), // تتبّع تركيبات (موضوع::كلمة) المستخدمة لتفادي تكرار أسئلة الذكاء الاصطناعي
  islamicMode: false, // تخصيص المواضيع الإسلامية (العقيدة، أصول الفقه، الفقه)
  biologyMode: false, // تخصيص مواضيع علم الأحياء (3 مستويات × وحدات × كلمات مفتاحية)
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
  // تحديث ظهور بطاقة مفتاح الذكاء الاصطناعي (تظهر فقط عند عدم وجود مفتاح محفوظ)
  updateModesApiKeyCard();
}

/* ====== بطاقة توليد الأسئلة بالذكاء الاصطناعي (داخل شاشة المودات) ======
   تظهر فقط عندما لا يكون هناك مفتاح API محفوظ، لتذكير المستخدم بحفظ مفتاح.
   بمجرد حفظ المفتاح، تختفي البطاقة تلقائياً. */
function updateModesApiKeyCard() {
  const card = document.getElementById("ai-key-card");
  if (!card) return;
  // تظهر فقط إذا لم يكن هناك مفتاح محفوظ سلفاً
  if (state.apiKey && state.apiKey.trim().length > 0) {
    card.style.display = "none";
  } else {
    card.style.display = "block";
  }
}

function handleSaveModesApiKey() {
  const input = document.getElementById("modes-api-key-input");
  const status = document.getElementById("modes-api-status");
  if (!input || !status) return;
  const key = input.value.trim();
  if (!key) {
    status.textContent = "⚠ الرجاء إدخال مفتاح صحيح أولاً";
    status.style.color = "#ef4444";
    return;
  }
  // استخدم نفس دالة الحفظ الموحدة المستخدمة في الإعدادات
  saveApiKeyToStorage(key);
  input.value = "";
  status.textContent = "✓ تم حفظ المفتاح بنجاح! سيُستخدم الذكاء الاصطناعي في الأسئلة القادمة.";
  status.style.color = "#10b981";
  sounds.correct();
  // بعد فترة وجيزة، أخفِ البطاقة بالكامل لأن المفتاح أصبح محفوظاً
  setTimeout(() => {
    updateModesApiKeyCard();
    status.textContent = "";
  }, 1800);
}

function showRules(modeId) {
  const mode = MODES[modeId];
  state.selectedMode = modeId;
  document.getElementById("rules-title").textContent = `${mode.icon} ${mode.name}`;
  const content = document.getElementById("rules-content");
  const islamicToggleHTML = `
    <div class="islamic-toggle-wrapper" style="margin-top: 16px; padding: 12px 16px; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 10px;">
      <label class="toggle-label" style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
        <input type="checkbox" id="islamic-mode-toggle" onchange="toggleIslamicMode(this.checked)" style="width: 18px; height: 18px; accent-color: #10b981;">
        <span style="font-size: 0.95em;">
          <span style="font-weight: 700; color: #10b981;">🕌 المواضيع الإسلامية فقط</span>
          <span style="display: block; font-size: 0.82em; opacity: 0.75; margin-top: 2px;">العقيدة، أصول الفقه، الفقه (الطهارة، الصلاة، الصيام)</span>
        </span>
      </label>
    </div>
  `;
  const biologyToggleHTML = `
    <div class="biology-toggle-wrapper" style="margin-top: 10px; padding: 12px 16px; background: rgba(6, 182, 212, 0.08); border: 1px solid rgba(6, 182, 212, 0.25); border-radius: 10px;">
      <label class="toggle-label" style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
        <input type="checkbox" id="biology-mode-toggle" onchange="toggleBiologyMode(this.checked)" style="width: 18px; height: 18px; accent-color: #06b6d4;">
        <span style="font-size: 0.95em;">
          <span style="font-weight: 700; color: #06b6d4;">🧬 مواضيع علم الأحياء فقط</span>
          <span style="display: block; font-size: 0.82em; opacity: 0.75; margin-top: 2px;">3 مستويات متدرجة (الخلايا، البيئة، الوراثة،التعبير الجيني…)</span>
        </span>
      </label>
    </div>
  `;
  content.innerHTML = `
    <h3>قواعد وضع ${mode.name}</h3>
    <ul>${mode.rules.map(r => `<li>${r}</li>`).join("")}</ul>
    ${islamicToggleHTML}
    ${biologyToggleHTML}
  `;
  // Restore checkbox state
  const toggle = document.getElementById("islamic-mode-toggle");
  if (toggle) toggle.checked = state.islamicMode;
  const bioToggle = document.getElementById("biology-mode-toggle");
  if (bioToggle) bioToggle.checked = state.biologyMode;
  showScreen("rules");
}

function toggleIslamicMode(enabled) {
  state.islamicMode = enabled;
  // استثناء متبادل: تفعيل الوضع الإسلامي يعطّل وضع الأحياء
  if (enabled && state.biologyMode) {
    state.biologyMode = false;
    const bioToggle = document.getElementById("biology-mode-toggle");
    if (bioToggle) bioToggle.checked = false;
  }
  console.log(`[Islamic Mode] ${enabled ? "مفعّل" : "معطّل"}`);
}

function toggleBiologyMode(enabled) {
  state.biologyMode = enabled;
  // استثناء متبادل: تفعيل وضع الأحياء يعطّل الوضع الإسلامي
  if (enabled && state.islamicMode) {
    state.islamicMode = false;
    const islamicToggle = document.getElementById("islamic-mode-toggle");
    if (islamicToggle) islamicToggle.checked = false;
  }
  console.log(`[Biology Mode] ${enabled ? "مفعّل" : "معطّل"}`);
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
  state.nextQuestionPromise = null;  // 🚀 إعادة ضبط Prefetch
  state.questionSource = null;
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
  state.usedTopicKeywords = new Set(); // إعادة ضبط الكلمات المفتاحية المستخدمة لكل جولة جديدة
  // islamicMode لا يُعاد ضبطه هنا — يبقى كما اختاره المستخدم في شاشة القواعد
  state.awaitingNext = false;
  state.doubleRetryMode = false;
  state.selectedIndex = null;
  state.revealed = false;
  state.eliminatedIndices = [];

  // إعدادات الرأس
  const islamicBadge = state.islamicMode ? " 🕌" : "";
  const biologyBadge = state.biologyMode ? " 🧬" : "";
  document.getElementById("game-mode-name").textContent = `${mode.icon} ${mode.name}${islamicBadge}${biologyBadge}`;
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

  // إزالة علامات مصدر السؤال من البطاقة قبل بداية جولة جديدة
  const card = document.querySelector(".question-card");
  if (card) card.classList.remove("source-ai", "source-bank", "source-ai-islamic", "source-islamic-bank", "source-ai-biology", "source-biology-bank");

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

/* =========================================================
   بنك الفقرات الإسلامية — مستخرج من الملف الشرعي
   يحتوي على 173 فقرة في 5 مواضيع
   ========================================================= */

const ISLAMIC_PARAGRAPHS = [
  { topic: "العقيدة", title: "التمسك بما كان عليه الصحابة", content: "هو أهم أصول السنة الذي يقوم على اتباع ما كان عليه أصحاب رسول الله ﷺ والاقتداء بهم في فهم الدين", keywords: ["اتباع", "صحابة", "اقتداء"] },
  { topic: "العقيدة", title: "ترك البدع", content: "تجنب كل محدثة في الدين، فإن كل بدعة ضلالة وإن رآها الناس حسنة", keywords: ["ترك البدع", "ضلالة"] },
  { topic: "العقيدة", title: "ترك الخصومات في الدين", content: "مجانبة الجدال والمراء في مسائل الاعتقاد والرجوع إلى ما ثبت في الآثار", keywords: ["ترك الخصومات", "جدال"] },
  { topic: "العقيدة", title: "الله هو الحق", content: "الله هو الحق المبين، وأسماؤه وصفاته حق، ووعده حق", keywords: ["حق", "يقين", "صدق"] },
  { topic: "العقيدة", title: "الإيمان بصفات الله", content: "إثبات ما وصف الله به نفسه وما وصفه به رسوله بلا تشبيه بالمخلوقين", keywords: ["صفات", "إثبات", "بلا تشبيه"] },
  { topic: "العقيدة", title: "أزلية صفات الله", content: "صفات الله لا بداية لها كما أن الله لا بداية له، لم يزل موصوفاً بها قبل خلقه للخلق", keywords: ["أزلية", "صفات"] },
  { topic: "العقيدة", title: "شمولية العلم الإلهي", content: "الله يعلم عدد قطر الأمطار، وعدد الحصى والرمال، وما تكنه الصدور", keywords: ["علم", "إحاطة", "شمول"] },
  { topic: "العقيدة", title: "علو الله على عرشه", content: "الله مستوٍ على عرشه، بائن من خلقه، وعلمه محيط بكل مكان", keywords: ["استواء", "علو", "عرش"] },
  { topic: "العقيدة", title: "إثبات السمع والبصر", content: "لله سمع وبصر حقيقيان يليقان به، لا كسمع وبصر المخلوقين", keywords: ["سمع", "بصر"] },
  { topic: "العقيدة", title: "السنة تفسر القرآن", content: "السنة واجبة الاتباع وهي الدليل على معاني القرآن والمفسرة له والمفصلة لمجمله", keywords: ["سنة", "تفسير", "اتباع"] },
  { topic: "العقيدة", title: "الإيمان بالقدر", content: "التصديق بأن الله قدر الخير والشر قبل خلق الخلق، ولا يقال \"لم\" أو \"كيف\"", keywords: ["قدر", "خير", "شر"] },
  { topic: "العقيدة", title: "القرآن كلام الله", content: "اليقين بأن القرآن هو كلام الله منزل غير مخلوق", keywords: ["قرآن", "كلام الله", "غير مخلوق"] },
  { topic: "العقيدة", title: "رؤية الله في الآخرة", content: "إثبات رؤية المؤمنين لربهم يوم القيامة عيانا كما يشاء الله", keywords: ["رؤية", "قيامة", "عيان"] },
  { topic: "العقيدة", title: "الإيمان بالميزان", content: "اعتقاد أن أعمال العباد توزن يوم القيامة، وله كفتان ولسان", keywords: ["ميزان", "وزن", "أعمال"] },
  { topic: "العقيدة", title: "تكليم الله لعباده", content: "الله يكلم عباده يوم القيامة حقيقة بلا ترجمان ولا واسطة", keywords: ["كلام", "حساب", "بلا ترجمان"] },
  { topic: "العقيدة", title: "الإيمان بالحوض", content: "لرسول الله ﷺ حوض في القيامة ترد عليه أمته، آنيته كعدد نجوم السماء", keywords: ["حوض", "شرب"] },
  { topic: "العقيدة", title: "سعة الحوض", content: "حوض النبي ﷺ مسيرة شهر، ماؤه أبيض من اللبن وأحلى من العسل", keywords: ["حوض", "سعة", "شرب"] },
  { topic: "العقيدة", title: "عذاب القبر وحقيقته", content: "الإيمان بأن العبد يسأل في قبره عن ربه ودينه ونبيه", keywords: ["قبر", "سؤال", "الأصول الثلاثة"] },
  { topic: "العقيدة", title: "الإيمان بمنكر ونكير", content: "هما الملكان اللذان يفتنان العباد في قبورهم ويسألانهم", keywords: ["منكر", "نكير", "سؤال"] },
  { topic: "العقيدة", title: "الشفاعة حق", content: "خروج عصاة الموحدين من النار بشفاعة النبي ﷺ وغيره من الشافعين", keywords: ["شفاعة", "خروج", "عصاة"] },
  { topic: "العقيدة", title: "المسيح الدجال", content: "الإيمان بخروجه في آخر الزمان وأنه أعور كذاب يفتن الناس", keywords: ["دجال", "فتنة", "خروج"] },
  { topic: "العقيدة", title: "نزول عيسى عليه السلام", content: "ينزل عيسى ابن مريم فيقتل الدجال ويحكم بالعدل", keywords: ["عيسى", "نزول", "قتل الدجال"] },
  { topic: "العقيدة", title: "الإيمان قول وعمل", content: "الإيمان تصديق بالجنان وقول باللسان وعمل بالأركان", keywords: ["إيمان", "تصديق", "قول", "عمل"] },
  { topic: "العقيدة", title: "زيادة الإيمان ونقصانه", content: "الإيمان يزيد بالطاعة وينقص بالمعصية ويتفاضل فيه الخلق", keywords: ["زيادة", "نقصان", "تفاضل"] },
  { topic: "العقيدة", title: "الاستثناء في الإيمان", content: "مشروعية قول \"أنا مؤمن إن شاء الله\" طلباً للكمال وتجنباً للتزكية", keywords: ["استثناء", "مشيئة", "تزكية"] },
  { topic: "العقيدة", title: "لا نكفر أحداً بالذنب", content: "لا يخرج المسلم من الإسلام بارتكاب الكبيرة ما لم يستحلها", keywords: ["تكفير", "ذنب", "كبيرة"] },
  { topic: "العقيدة", title: "حقوق الأئمة والولاة", content: "وجوب السمع والطاعة لولي الأمر في غير معصية، والجهاد معه براً كان أو فاجراً", keywords: ["سمع", "طاعة", "بر أو فاجر"] },
  { topic: "العقيدة", title: "الجمعة خلف الولاة", content: "الصلاة خلف كل إمام مسلم جائزة ونافذة وإن كان ظالماً", keywords: ["جمعة", "صلاة", "سلطان"] },
  { topic: "العقيدة", title: "فضل أبي بكر وعمر", content: "هما أفضل الأمة بعد نبيها ثم عثمان ثم علي", keywords: ["تفضيل", "الصديق", "الفاروق"] },
  { topic: "العقيدة", title: "الكف عما شجر بين الصحابة", content: "تجنب الخوض في خلافاتهم والترحم عليهم جميعاً", keywords: ["كف", "الصحابة", "ترحم"] },
  { topic: "العقيدة", title: "اللوح والقلم", content: "الإيمان بأن الله كتب كل ما هو كائن في اللوح المحفوظ", keywords: ["لوح", "قلم", "مقادير"] },
  { topic: "العقيدة", title: "الصراط يوم القيامة", content: "هو الجسر الممدود على متن جهنم يعبره الناس حسب أعمالهم", keywords: ["صراط", "عبور", "حشر"] },
  { topic: "العقيدة", title: "عصمة الأنبياء في التبليغ", content: "الأنبياء صادقون بلغوا رسالات ربهم وأقاموا الحجة", keywords: ["أنبياء", "تبليغ", "صدق"] },
  { topic: "العقيدة", title: "تفضيل القرن الأول", content: "خير الناس قرن الصحابة ثم الذين يلونهم ثم الذين يلونهم", keywords: ["قرون", "فضل", "صحابة"] },
  { topic: "العقيدة", title: "الإيمان بالبعث والنشور", content: "اليقين بإحياء الموتى وخروجهم من قبورهم للحساب", keywords: ["بعث", "نشور", "حشر"] },
  { topic: "العقيدة", title: "تحريم سب الصحابة", content: "من سب أحداً من أصحاب النبي ﷺ فهو مبتدع ضال", keywords: ["سب", "صحابة", "ضلال"] },
  { topic: "العقيدة", title: "مشيئة الله النافذة", content: "ما شاء الله كان وما لم يشأ لم يكن، ولا غالب لمشيئته", keywords: ["مشيئة", "إرادة", "قدر"] },
  { topic: "العقيدة", title: "تحريم السحر", content: "السحر حقيقة واستعماله كفر بالله العظيم", keywords: ["سحر", "كفر", "حقيقة"] },
  { topic: "العقيدة", title: "الإيمان بالملائكة", content: "هم عباد مكرمون لا يعصون الله ما أمرهم", keywords: ["ملائكة", "عبادة", "إيمان"] },
  { topic: "العقيدة", title: "ملك الموت", content: "الإيمان بوجوده وأنه يقبض الأرواح بإذن ربه", keywords: ["ملك الموت", "قبض", "روح"] },
  { topic: "العقيدة", title: "أشراط الساعة", content: "التصديق بكل ما ثبت من علامات الساعة الكبرى والصغرى", keywords: ["أشراط", "الساعة", "علامات"] },
  { topic: "العقيدة", title: "عذاب أهل الكبائر", content: "هم تحت المشيئة، إن شاء الله عذبهم وإن شاء غفر لهم", keywords: ["كبيرة", "مشيئة", "عذاب"] },
  { topic: "العقيدة", title: "الله الخالق وحده", content: "لا خالق مع الله، وكل ما سواه مخلوق وفي ملكه", keywords: ["خلق", "توحيد", "ربوبية"] },
  { topic: "العقيدة", title: "تفضيل المهاجرين والأنصار", content: "الإيمان بفضل السابقين الأولين من المهاجرين والأنصار على من بعدهم، وحبهم دين وبغضهم نفاق", keywords: ["مهاجرون", "أنصار", "فضيلة"] },
  { topic: "العقيدة", title: "حقوق آل البيت", content: "محبة قرابة رسول الله ﷺ ورعاية حقهم، وموالاتهم من غير غلو ولا جفاء", keywords: ["آل البيت", "محبة", "موالاة"] },
  { topic: "العقيدة", title: "أمهات المؤمنين", content: "الإيمان بفضل أزواج النبي ﷺ والترحم عليهن، وهن أزواجه في الجنة", keywords: ["أمهات المؤمنين", "طهر", "فضل"] },
  { topic: "العقيدة", title: "الكرامة للأولياء", content: "التصديق بكرامات الله لأوليائه وما يظهره على أيديهم من خوارق العادات", keywords: ["كرامة", "أولياء", "تصديق"] },
  { topic: "العقيدة", title: "علاقة العلم بالعمل", content: "العلم لا ينفع صاحبه إلا إذا قارنه العمل الصالح وموافقة السنة", keywords: ["علم", "عمل", "نفع"] },
  { topic: "العقيدة", title: "النفخ في الصور", content: "الإيمان بنفختي الصور؛ نفخة الصعق ونفخة البعث والنشور", keywords: ["الصُور", "نفخ", "إسرافيل"] },
  { topic: "العقيدة", title: "رؤية النبي لربه", content: "الإيمان بصحة ما أثر عن النبي ﷺ أنه رأى ربه ليلة المعراج", keywords: ["رؤية", "معراج"] },
  { topic: "العقيدة", title: "تنزيه الله عن النوم والنقائص", content: "الله قيوم لا تأخذه سنة ولا نوم، ولا يلحقه عجز ولا فناء", keywords: ["قيوم", "نفي النوم"] },
  { topic: "العقيدة", title: "الحساب وسرعته", content: "الله يحاسب الخلق جميعاً في وقت يسير، وهو أسرع الحاسبين", keywords: ["حساب", "سرعة", "عدل"] },
  { topic: "العقيدة", title: "تطاير الصحف", content: "يوم القيامة يأخذ المؤمن كتاب أعماله بيمينه، والكافر بشماله أو من وراء ظهره", keywords: ["كتاب", "يمين", "شمال"] },
  { topic: "العقيدة", title: "شهادة الجوارح", content: "الإيمان بأن جوارح العباد تشهد عليهم يوم القيامة بما عملوا", keywords: ["جوارح", "شهادة"] },
  { topic: "العقيدة", title: "القضاء والقدر نافذان", content: "لا يقع في ملك الله إلا ما أراد، والعباد صائرون لما خلقوا له", keywords: ["قضاء", "قدر", "نفوذ المشيئة"] },
  { topic: "العقيدة", title: "الإيمان بالكتب", content: "التصديق بكل الكتب المنزلة على الرسل كالتوراة والإنجيل والزبور والقرآن", keywords: ["كتب", "وحي", "تصديق"] },
  { topic: "العقيدة", title: "عصمة الوحي", content: "القرآن كتاب عزيز لا يأتيه الباطل من بين يديه ولا من خلفه", keywords: ["وحي", "قرآن", "حفظ"] },
  { topic: "العقيدة", title: "إثبات الضحك لله", content: "الله يضحك إلى عباده ويضحك من قنوطهم ويفرح لتوبتهم، ضحكاً حقيقياً يليق به", keywords: ["ضحك", "صفات", "فرح"] },
  { topic: "العقيدة", title: "إثبات العجب لله", content: "الله يعجب من صنيع بعض عباده، وعجبه كمال لا نقص فيه", keywords: ["عجب", "كمال"] },
  { topic: "العقيدة", title: "إثبات الغضب والسخط", content: "الله يغضب ويسخط على من عصاه وكفر به حقيقة", keywords: ["غضب", "سخط", "عدل"] },
  { topic: "العقيدة", title: "بقاء الجنة والنار", content: "الجنة والنار لا تبيدان ولا تفنيان، وبقاؤهما دائم بإبقاء الله لهما", keywords: ["خلود", "بقاء", "عدم فناء"] },
  { topic: "العقيدة", title: "موقف الحشر", content: "يقف الناس في المحشر ألوف السنين حفاة عراة غرلاً بانتظار الحساب", keywords: ["حشر", "قيامة", "وقوف"] },
  { topic: "العقيدة", title: "تنزيه الله عن الصاحبة والولد", content: "الله فرد صمد، لا يحتاج أحدا من خلقه، منزه عن للزوجة أو الولد", keywords: ["صمد", "نفي الولد"] },
  { topic: "العقيدة", title: "وحدانية الله في الربوبية", content: "الله وحده خالق كل شيء ومدبر الأمر، لا شريك له في ملكه", keywords: ["توحيد", "ربوبية", "خلق"] },
  { topic: "العقيدة", title: "وحدانية الله في الألوهية", content: "إفراد الله بالعبادة والدعاء والذبح والنذر، ولا معبود بحق سواه", keywords: ["ألوهية", "عبادة", "إفراد"] },
  { topic: "العقيدة", title: "عذاب القبر للكفار والمؤمنين", content: "عذاب القبر حق يقع على الكافر وعلى بعض عصاة المؤمنين", keywords: ["عذاب", "قبر", "تمحيص"] },
  { topic: "العقيدة", title: "النعيم في القبر", content: "المؤمن الصالح ينعم في قبره ويفتح له باب إلى الجنة", keywords: ["نعيم", "قبر", "روضة"] },
  { topic: "أصول الفقه", title: "الوجوب النظر والاستدلال", content: "أوجب الله تعالى على عباده التفكر والاعتبار في آيات كتابه للوصول إلى العلم بما خفي من الدلائل. فالأدلة منها ما هو جلي يدرك بداهة ومنها خفي لا يدرك إلا بالنظر الصحيح", keywords: ["النظر", "الاستدلال", "ظهور وخفاء الأدلة"] },
  { topic: "أصول الفقه", title: "القرآن الكريم أصل الأصول", content: "هو الكتاب العزيز الذي لا يأتيه الباطل من بين يديه ولا من خلفه، وهو تبيان لكل شيء. نزل بلسان عربي مبين ويشتمل على نصوص ظاهرة الدلالة وأخرى تحتمل التأويل", keywords: ["القرآن", "التبيان"] },
  { topic: "أصول الفقه", title: "حجية السنة النبوية", content: "السنة وحي من الله، وطاعة الرسول ﷺ مقرونة بطاعة الله عز وجل في كتابه. وهي تبيّن مراد الله من فرائضه وتستقل بتشريع أحكام لم ترد نصاً في القرآن", keywords: ["السنة", "طاعة الرسول", "الوحي"] },
  { topic: "أصول الفقه", title: "الإجماع حجة قطعية", content: "أصل الإجماع من الكتاب والسنة، وهو اتفاق الأمة الذي لا يجوز خلافه. والأمة معصومة من الاجتماع على ضلالة في كل عصر", keywords: ["الإجماع", "اتفاق الأمة", "العصمة"] },
  { topic: "أصول الفقه", title: "القياس ومجاله", content: "هو إلحاق فرع بأصل في حكم لعلة جامعة بينهما، وهو طريق شرعي للوصول إلى أحكام الحوادث. لا يُصار إليه إلا عند عدم وجود نص من كتاب أو سنة أو إجماع", keywords: ["القياس", "الفرع", "الأصل", "العلة"] },
  { topic: "أصول الفقه", title: "إبطال التقليد للعالم", content: "يجب على من ملك آلة العلم والاجتهاد أن يرجع إلى الأصول ولا يقلد غيره بغير حجة. التقليد غفلة وترك لما أوجب الله من اتباع الحجة والدليل", keywords: ["إبطال التقليد", "الحجة", "الاتباع"] },
  { topic: "أصول الفقه", title: "تقليد العامي للعالم", content: "يجوز للعامي ومن لا يحسن الاستدلال أن يقلد المجتهد في أحكام دينه. ويجب عليه الاجتهاد في اختيار الأعلم والأوثق من المفتين", keywords: ["تقليد العامي", "الاجتهاد في اختيار المفتي الصالح"] },
  { topic: "أصول الفقه", title: "دلالة الأمر على الوجوب", content: "اللفظ المطلق للأمر يقتضي الوجوب وإيجاب الفعل إلا إذا قامت قرينة تصرفه للندب أو الإباحة. والأمر يفيد الفور في المبادرة إلى الامتثال", keywords: ["الأمر", "الوجوب", "الفور"] },
  { topic: "أصول الفقه", title: "دلالة النهي على التحريم", content: "ما نهى عنه النبي ﷺ فهو للمنع والتحريم إلا ما دل الدليل على أنه نهي تنزيه. ومخالفة النهي تقتضي فساد المنهي عنه في الغالب", keywords: ["النهي", "التحريم", "التنزيه"] },
  { topic: "أصول الفقه", title: "العموم والخصوص", content: "اللفظ العام يجري على استغراق جنسه ما لم يقم دليل على تخصيصه. والتخصيص يكون بالقرآن أو السنة أو الإجماع أو القياس", keywords: ["العموم", "الخصوص", "التخصيص"] },
  { topic: "أصول الفقه", title: "الناسخ والمنسوخ", content: "أجاز الله النسخ في كتابه وسنة نبيه رحمة بالعباد. والمعرفة به ضرورية لتمييز الأحكام الباقية من التي ارتفع حكمها", keywords: ["النسخ", "المنسوخ المنتهي حكمه", "الناسخ الباقي حكمه"] },
  { topic: "أصول الفقه", title: "حجية خبر الواحد العدل", content: "يجب العمل بخبر الواحد إذا كان راويه عدلاً ضابطاً. وهو يوجب العلم الظاهر والعمل دون القطع على الغيب", keywords: ["خبر الواحد", "العدالة", "الضبط"] },
  { topic: "أصول الفقه", title: "إجماع أهل المدينة", content: "إجماع أهل المدينة في المسائل التي طريقها التوقيف والعمل المتوارث حجة مقدمة حسب المذهب المالكي. فخبرهم في ذلك بمنزلة التواتر", keywords: ["أهل المدينة", "الإجماع", "التوقيف"] },
  { topic: "أصول الفقه", title: "دليل الخطاب (المفهوم)", content: "هو تعليق الحكم بصفة أو شرط يقتضي نفي الحكم عما عداه. وهو أصل معمول به في استنباط الأحكام عند كثير من الفقهاء", keywords: ["دليل الخطاب", "الصفة"] },
  { topic: "أصول الفقه", title: "العلة والمعلول", content: "العلة هي الصفة التي علق الشارع الحكم بها. والمعلول هو الحكم الشرعي الذي يتبع العلة وجوداً وعدماً", keywords: ["العلة", "المعلول", "الحكم"] },
  { topic: "أصول الفقه", title: "صحة العلة بالطرد والجريان", content: "من علامات صحة العلة اطرادها في معلولاتها وعدم انتقاضها. فالعلة المستقيمة هي التي لا يفسدها أصل", keywords: ["الطرد", "اطراد العلة"] },
  { topic: "أصول الفقه", title: "تخصيص العلة", content: "العلة الشرعية لا يجوز تخصيصها عند المحققين لأنها بمنزلة النص. وتخصيصها يبطل كونها أمارة صحيحة على الحكم", keywords: ["تخصيص العلة", "النص"] },
  { topic: "أصول الفقه", title: "الاستحسان", content: "عند الإمام أحمد هو العدول عن مقتضى القياس إلى حكم آخر لأثر أو ضرورة. وهو معمول به في مواضع مخصوصة رعاية للمصلحة", keywords: ["الاستحسان", "القياس", "المصلحة"] },
  { topic: "أصول الفقه", title: "استصحاب الحال", content: "بقاء الأمر على ما كان عليه في براءة الذمة حتى يرد سمع يغيره. فالأصل في العبادات التوقيف وفي الأعيان براءة الذمة", keywords: ["استصحاب الحال", "براءة الذمة"] },
  { topic: "أصول الفقه", title: "شرع من قبلنا", content: "ما ثبت من شرائع الأنبياء السابقين ولم ينسخه شرعنا فهو يلزمنا اتباعه. والحجة في ذلك الأمر بالاقتداء بهداهم", keywords: ["شرع من قبلنا", "الأنبياء", "الاتباع"] },
  { topic: "أصول الفقه", title: "شروط المفتي والمجتهد", content: "يجب أن يكون المفتي عالماً بالكتاب والسنة، ولسان العرب، وأقوال السلف. كما يشترط فيه العدالة والتقوى وحسن النية", keywords: ["الاجتهاد", "الفتوى", "شروط المجتهد"] },
  { topic: "أصول الفقه", title: "حكم المجتهد في الفروع", content: "الحق عند الله في مسائل الاجتهاد واحد والمصيب له أجران والمخطئ له أجر. ولا يجوز تأثيم المخالف في مسائل الاجتهاد", keywords: ["الحق", "الاجتهاد", "الأجر"] },
  { topic: "أصول الفقه", title: "البيان وتأخيره", content: "لا يجوز تأخير البيان عن وقت الحاجة إلى العمل بالحكم. وقد يكون البيان بالقول أو الفعل أو الكتابة", keywords: ["البيان", "وقت الحاجة"] },
  { topic: "أصول الفقه", title: "خطاب الواحد خطاب للجميع", content: "إذا خاطب النبي ﷺ أحداً من أمته فالحكم عام للجميع ما لم يقم دليل الخصوص. فالجنس الواحد يتساوى في أحكام الشرع", keywords: ["الخطاب", "العموم", "الجنس"] },
  { topic: "أصول الفقه", title: "القياس على المخصوص", content: "يجوز القياس على أصل ثبت حكمه بطريق التخصيص إذا عُرفت علته. فإلحاق العبد بالأمة في تنصيف الحد مثال على ذلك", keywords: ["القياس", "التخصيص", "العلة"] },
  { topic: "أصول الفقه", title: "أفعال النبي ﷺ", content: "أفعال الرسول ﷺ الأصل فيها الاتباع والوجوب رداً إلى قوله تعالى {لقد كان لكم في رسول الله أسوة حسنة}. وتُحمل على الإباحة أو الندب بقرينة", keywords: ["أفعال الرسول", "التأسي", "الاتباع"] },
  { topic: "أصول الفقه", title: "تكرار المأمور به", content: "الأمر المطلق لا يقتضي التكرار بلفظه، بل يقتضي إيجاد الفعل مرة واحدة. ولا يلزم التكرار إلا بدليل مستأنف", keywords: ["الأمر", "التكرار", "الامتثال"] },
  { topic: "أصول الفقه", title: "إثبات الأسماء بالقياس", content: "يجوز إثبات الأسماء الشرعية من جهة القياس قياساً على أخذ الأحكام به. فتسمية النبيذ خمراً لقياس معناه على الخمر", keywords: ["الأسماء", "القياس", "التسمية"] },
  { topic: "أصول الفقه", title: "إثبات الحدود بالقياس", content: "يجوز إثبات المقدرات والحدود من طريق القياس كما تثبت سائر الأحكام. وإجماع الصحابة في حد الخمر دليل على ذلك", keywords: ["الحدود", "المقدرات", "القياس"] },
  { topic: "أصول الفقه", title: "تعارض الأخبار", content: "عند تعارض الأخبار وتساويها بحيث ينتفي الجمع بينها يُصار إلى الترجيح بتقديم الأقوى إسناداً أو متناً. ولا يُطرح أحد الخبرين إلا بدليل", keywords: ["تعارض الأخبار", "الترجيح"] },
  { topic: "أصول الفقه", title: "العلم العام والعلم الخاص", content: "العلم نوعان: عام لا يسع أحداً جهله كجمل الفرائض، وخاص يطلبه العلماء بالاستنباط والقياس", keywords: ["العلم العام", "العلم الخاص", "الاستنباط"] },
  { topic: "فقه : الطهارة", title: "طهورية ماء البحر", content: "ماء البحر طهور يصح التطهر به، وميتته حلال للأكل، وهو أصل في تطهير النجاسات", keywords: ["ماء البحر", "طهور", "حلال"] },
  { topic: "فقه : الطهارة", title: "الماء المطلق والنجاسة", content: "كل ماء من سماء أو بئر أو ثلج فهو طهور، ما لم تخالطه نجاسة تغير طعمه أو لونه أو ريحه", keywords: ["الماء المطلق", "التغير", "النجاسة"] },
  { topic: "فقه : الطهارة", title: "حد الماء القليل والقلتان", content: "الماء الذي يبلغ القلتين (خمس قرب) لا ينجس بوقوع النجاسة فيه إلا بالتغير، وما دونهما ينجس بمجرد المخالطة", keywords: ["القلتان", "الماء القليل", "التنجس"] },
  { topic: "فقه : الطهارة", title: "الماء المستعمل", content: "الماء الذي أدي به فرض الطهارة طاهر في نفسه لكنه غير مطهر لغيره في وضوء أو غسل جديد", keywords: ["الماء المستعمل", "طاهر", "غير مطهر"] },
  { topic: "فقه : الطهارة", title: "طهارة سؤر ما يؤكل لحمه", content: "سؤر الحيوان الذي يؤكل لحمه (ما يتبقى من شربه) طاهر يجوز الشرب منه والوضوء به", keywords: ["السؤر", "الحيوان المأكول", "الطهارة"] },
  { topic: "فقه : الطهارة", title: "الاستعاذة عند دخول الخلاء", content: "يُشرع للمسلم قبل دخول الخلاء قول: \"اللهم إني أعوذ بك من الخبث والخبائث\" طلباً للستر من الجن", keywords: ["دخول الخلاء", "الاستعاذة", "طلب الستر"] },
  { topic: "فقه : الطهارة", title: "استقبال القبلة واستدبارها", content: "يُمنع استقبال القبلة أو استدبارها ببول أو غائط في الأرض الجرداء، ويجوز ذلك في البنيان لوجود الحائل", keywords: ["استقبال القبلة واستدبارها", "البنيان"] },
  { topic: "فقه : الطهارة", title: "النية في الوضوء", content: "النية شرط لصحة الوضوء، فلا يجزئ الغسل بغير نية رفع الحدث أو استباحة الصلاة", keywords: ["النية", "رفع الحدث الأصغر"] },
  { topic: "فقه : الطهارة", title: "التسمية في ابتداء الطهارة", content: "يُستحب قول \"بسم الله\" في أول الوضوء", keywords: ["التسمية", "ابتداء الوضوء"] },
  { topic: "فقه : الطهارة", title: "مسح الرأس والأذنين", content: "مسح الرأس فريضة، ومسح الأذنين ظاهرهما وباطنهما من تمام مسح الرأس وسننه", keywords: ["مسح الرأس", "الأذنان", "الاستيعاب"] },
  { topic: "فقه : الطهارة", title: "تخليل الأصابع", content: "يجب تعاهد ما بين أصابع اليدين والرجلين بالماء لضمان وصول الطهور للبشرة", keywords: ["التخليل", "وصول الماء"] },
  { topic: "فقه : الطهارة", title: "الترتيب والموالاة", content: "يجب غسل أعضاء الوضوء مرتبة كما ذكرها القرآن، والموالاة بينها بحيث لا يجف العضو قبل غسل ما بعده", keywords: ["الترتيب", "الموالاة"] },
  { topic: "فقه : الطهارة", title: "نواقض الوضوء (الخارج من السبيلين)", content: "كل ما خرج من البول أو الغائط أو الريح أو المذي يوجب إعادة الوضوء", keywords: ["البول", "الغائط", "الريح"] },
  { topic: "فقه : الطهارة", title: "النوم الناقض للوضوء", content: "النوم المستثقل الذي يزول معه الإدراك ينقض الوضوء، أما خفق الرأس جالساً فلا ينقض", keywords: ["النوم", "زوال الادراك"] },
  { topic: "فقه : الطهارة", title: "أكل لحم الإبل", content: "أكل لحم الجزور ينقض الوضوء ويوجب إعادته، بخلاف أكل لحم الغنم والبقر", keywords: ["لحم الإبل", "الجزور", "نقض الوضوء"] },
  { topic: "فقه : الطهارة", title: "صفة الغسل", content: "يبدأ بغسل اليدين والفرج، ثم وضوء الصلاة، ثم إفاضة الماء على الرأس والجسد", keywords: ["غسل الجنابة", "تعميم الجسد"] },
  { topic: "فقه : الطهارة", title: "التيمم عند فقد الماء", content: "يُشرع التيمم بالصعيد الطاهر (التراب أو الصخر الذي فيه غبار) عند انعدام الماء أو العجز عن استخدامه لمرض", keywords: ["التيمم", "فقد الماء", "الصعيد"] },
  { topic: "فقه : الطهارة", title: "صفة التيمم", content: "ضربة واحدة للوجه والكفين، وقيل ضربتان، ويمسح بهما الوجه وظهر الكفين", keywords: ["مسح الوجه", "مسح الكفان"] },
  { topic: "فقه : الطهارة", title: "بطلان التيمم بوجود الماء", content: "إذا وجد المتيمم الماء قبل الدخول في الصلاة بطل تيممه ووجب عليه الوضوء", keywords: ["وجود الماء", "بطلان التيمم"] },
  { topic: "فقه : الطهارة", title: "نجاسة الكلب", content: "ولوغ الكلب في الإناء ينجس الماء، ويجب غسل الإناء سبع مرات أولاهن بالتراب", keywords: ["ولوغ الكلب", "الغسل سبعاً", "التراب"] },
  { topic: "فقه : الطهارة", title: "سنن الفطرة العشر", content: "منها قص الشارب، وإعفاء اللحية، والسواك، ونتف الابط، وقص الأظفار وحلق العانة", keywords: ["سنن الفطرة", "النظافة", "السنة"] },
  { topic: "فقه : الطهارة", title: "السواك ومشروعيته", content: "السواك سنة مرغبة عند كل وضوء وعند كل صلاة وفي حالات تغير رائحة الفم", keywords: ["السواك", "مطهرة للفم"] },
  { topic: "فقه : الطهارة", title: "الاستبراء من البول", content: "يجب التنزه من البول والاستبراء منه حتى ينقطع تماماً لئلا ينجس الثوب", keywords: ["الاستبراء", "التنزه من البول"] },
  { topic: "فقه: الصلاة", title: "الشك في عدد الركعات", content: "من شك في صلاته فلم يدر كم صلى، فإنه يبني على اليقين وهو الأقل، ثم يتم صلاته ويسجد للسهو قبل السلام", keywords: ["الشك", "اليقين", "يسجد للسهو"] },
  { topic: "فقه: الصلاة", title: "تكرار السهو في الصلاة", content: "إذا سها المصلي مراراً في صلاة واحدة، فإن ذلك يجزئه فيه سجدتان فقط للسهو، ولا تتعدد السجدات بتعدد السهو", keywords: ["سجدتان", "السهو", "صلاة واحدة"] },
  { topic: "فقه: الصلاة", title: "سهو المأموم", content: "ليس على من سها خلف الإمام سجود للسهو، إذ الإمام يحمل عنه السهو، أما إذا سها الإمام وجب على المأموم اتباعه في السجود", keywords: ["سها خلف الإمام", "سجود"] },
  { topic: "فقه: الصلاة", title: "وجوب صلاة الجمعة", content: "صلاة الجمعة واجبة على كل مسلم حر بالغ مقيم، ولا تجب على المرأة ولا الصبي ولا العبد ولا المسافر", keywords: ["صلاة الجمعة", "واجبة", "مسلم"] },
  { topic: "فقه: الصلاة", title: "العدد في الجمعة", content: "يشترط لصحة الجمعة حضور أربعين رجلاً من أهل الاستيطان في القرية عند الشافعي وأحمد، بينما يرى مالك وجوبها بوجود جماعة تستوطن وتبيع وتشتري", keywords: ["العدد", "الجمعة", "أربعين رجلاً"] },
  { topic: "فقه: الصلاة", title: "وقت صلاة الجمعة", content: "وقت الجمعة هو وقت الظهر، ويبدأ من زوال الشمس عن كبد السماء", keywords: ["وقت الجمعة", "زوال الشمس"] },
  { topic: "فقه: الصلاة", title: "خطبة الجمعة", content: "الخطبة شرط في صحة الجمعة، ويشترط أن يخطب الإمام خطبتين قائماً يفصل بينهما بجلوس، ويفتتحهما بحمد الله والثناء عليه والصلاة على رسوله", keywords: ["خطبة الجمعة", "خطبتين", "الإمام"] },
  { topic: "فقه: الصلاة", title: "إدراك الجمعة", content: "من أدرك مع الإمام ركعة من صلاة الجمعة فقد أدرك الجمعة ويضيف إليها أخرى، ومن أدرك أقل من ركعة أتمها ظهراً أربعاً", keywords: ["ركعة", "صلاة الجمعة", "أدرك"] },
  { topic: "فقه: الصلاة", title: "غسل الجمعة", content: "الغسل يوم الجمعة سُنة مؤكدة لكل من أراد حضور الصلاة", keywords: ["الغسل", "يوم الجمعة", "سُنة"] },
  { topic: "فقه: الصلاة", title: "مواقيت الصلوات الخمس", content: "مواقيت الصلاة مكتوبة موقوتة، للظهر من الزوال لصيرورة الظل مثله، ثم العصر، ثم المغرب بالغروب، ثم العشاء بمغيب الشفق، ثم الصبح من طلوع الفجر إلى شروق الشمس", keywords: ["مواقيت الصلاة", "مغيب الشفق", "طلوع الفجر"] },
  { topic: "فقه: الصلاة", title: "تكبيرة الإحرام", content: "الصلاة لا تنعقد إلا بتكبيرة الإحرام، ولفظها \"الله أكبر\"، وهي ركن أساسي", keywords: ["تكبيرة الإحرام", "الصلاة"] },
  { topic: "فقه: الصلاة", title: "ركنية الفاتحة", content: "قراءة فاتحة الكتاب ركن في كل ركعة من ركعات الصلاة للإمام والمنفرد، لقول النبي صلى الله عليه وسلم: \"لا صلاة لمن لم يقرأ بفاتحة الكتاب\"", keywords: ["فاتحة الكتاب", "ركن", "الصلاة"] },
  { topic: "فقه: الصلاة", title: "الطمأنينة في الأركان", content: "الطمأنينة في الركوع والسجود والاعتدال والجلوس بين السجدتين ركن لا تصح الصلاة بدونه، ويجب سكون الأعضاء في كل ركن من هذه الأركان", keywords: ["الطمأنينة", "ركن", "سكون الأعضاء"] },
  { topic: "فقه: الصلاة", title: "التشهد الأخير والتسليم", content: "الجلوس للتشهد الأخير ركن، وكذلك التسليم للخروج من الصلاة ركن، ولفظه \"السلام عليكم\"، وبذلك يتحلل المصلي من صلاته", keywords: ["التشهد الأخير", "التسليم", "ركن"] },
  { topic: "فقه: الصلاة", title: "الجهر والإسرار", content: "القراءة في الصبح والمغرب والعشاء تكون جهرا، وفي الظهر والعصر سرا، وهذا النقل متواتر عن عامة المسلمين وعن النبي صلى الله عليه وسلم", keywords: ["الجهر", "الإسرار", "القراءة"] },
  { topic: "فقه: الصلاة", title: "الوتر وأهميته", content: "الوتر ركعة واحدة في آخر صلاة الليل، وهو سُنة مؤكدة حافظ عليها النبي صلى الله عليه وسلم في الحضر والسفر، ولا ينبغي تركه", keywords: ["الوتر", "صلاة الليل", "سُنة مؤكدة"] },
  { topic: "فقه: الصلاة", title: "تحية المسجد", content: "يستحب لمن دخل المسجد أن لا يجلس حتى يركع ركعتين تحية للمسجد، إلا إذا دخل والإمام في صلاة الفريضة فإنه يدخل معه", keywords: ["دخل المسجد", "ركعتين", "تحية"] },
  { topic: "فقه: الصلاة", title: "الكلام العمد في الصلاة", content: "الكلام العمد لغير مصلحة الصلاة يبطلها بإجماع الفقهاء، لقوله صلى الله عليه وسلم: \"إن في الصلاة لشغلاً\"، ويجب على المتكلم الإعادة", keywords: ["الكلام العمد", "يبطلها", "الصلاة"] },
  { topic: "فقه: الصلاة", title: "الضحك في الصلاة", content: "أجمع أهل العلم على أن الضحك يفسد الصلاة ويوجب الإعادة، وأما التبسم فلا يبطلها وإن كان الأولى تركه للمحافظة على الخشوع", keywords: ["الضحك", "يفسد الصلاة"] },
  { topic: "فقه: الصلاة", title: "الأكل والشرب عمدًا", content: "الأكل والشرب في الصلاة عمداً من مبطلات الصلاة، لأن ذلك ينافي هيئة العبادة والاشتغال بذكر الله ومناجاته", keywords: ["الأكل والشرب", "مبطلات الصلاة"] },
  { topic: "فقه: الصلاة", title: "ترك ركن عمداً", content: "من ترك ركناً من أركان الصلاة عمداً، مثل الركوع أو السجود، بطلت صلاته ووجب عليه استئنافها من جديد لفوات شرط صحتها", keywords: ["ترك ركن", "بطلت صلاته"] },
  { topic: "فقه: الصلاة", title: "انتقاض الوضوء", content: "إذا انتقض وضوء المصلي أثناء الصلاة بحدث أصغر أو أكبر، بطلت صلاته ووجب عليه الانصراف للتطهر ثم إعادة الصلاة", keywords: ["انتقاض الوضوء", "بطلت صلاته"] },
  { topic: "فقه: الصلاة", title: "العمل الكثير المتوالي", content: "العمل الكثير من غير جنس الصلاة إذا كان متوالياً يبطل الصلاة، لأنه يخرجها عن هيئتها المشروعة وينافي الخشوع المطلوب فيها", keywords: ["العمل الكثير", "يبطل الصلاة"] },
  { topic: "فقه: الصلاة", title: "صلاة الصبي والصبية", content: "تصح صلاة الصبي المميز وتعتبر له نافلة، وكذلك الصبية، ويؤمرون بالصلاة لسبع سنين ويضربون عليها لعشر تأديباً وتعويداً", keywords: ["صلاة الصبي", "نافلة"] },
  { topic: "فقه: الصلاة", title: "تحويل النية", content: "إذا افتتح المصلي صلاة فريضة ثم حول نيتها إلى نافلة لغرض شرعي جاز ذلك، أما تحويل النافلة إلى فريضة فلا يصح", keywords: ["تحويل النية", "فريضة", "نافلة"] },
  { topic: "فقه: الصلاة", title: "قضاء الفوائت", content: "من فاتته صلاة مكتوبة وجب عليه قضاؤها فور تذكرها، لقوله صلى الله عليه وسلم: \"من نسي صلاة أو نام عنها فليصلها إذا ذكرها\"", keywords: ["صلاة مكتوبة", "قضاؤها"] },
  { topic: "فقه: الصيام", title: "الصيام في اللغة هو", content: "الصيام في اللغة هو الإمساك، وفي الشرع هو الإمساك عن المفطرات من طلوع الفجر إلى غروب الشمس بنية", keywords: ["الصيام", "الإمساك", "بنية"] },
  { topic: "فقه: الصيام", title: "لا يجزئ صيام الفرض", content: "لا يجزئ صيام الفرض من شهر رمضان أو نذر أو كفارة إلا أن ينوي الصائم الصيام قبل الفجر من الليل", keywords: ["صيام", "الفرض", "النية"] },
  { topic: "فقه: الصيام", title: "في صيام التطوع لا", content: "في صيام التطوع لا بأس إن أصبح المرء ولم يطعم شيئاً أن ينوي الصوم قبل الزوال كما فعل النبي صلى الله عليه وسلم", keywords: ["صيام", "التطوع", "الزوال"] },
  { topic: "فقه: الصيام", title: "يصام شهر رمضان لرؤية", content: "يصام شهر رمضان لرؤية الهلال ويفطر لرؤيته، فإن غم الهلال فيكمل ثلاثين يوما من شهر شعبان ثم يصام رمضان", keywords: ["رمضان", "رؤية", "الهلال"] },
  { topic: "فقه: الصيام", title: "صيام شهر رمضان واجب", content: "صيام شهر رمضان واجب على كل بالغ من رجل أو امرأة أو عبد", keywords: ["صيام", "واجب", "بالغ"] },
  { topic: "فقه: الصيام", title: "أجمع أهل العلم على", content: "أجمع أهل العلم على أن الله حرم على الصائم في نهار الصوم الأكل والشرب والجماع", keywords: ["الصائم", "المفطرات"] },
  { topic: "فقه: الصيام", title: "من أكل أو شرب", content: "من أكل أو شرب في نهار رمضان ناسياً فليتم صومه ولا قضاء عليه عند الشافعي وأحمد، بينما يرى مالك وجوب القضاء", keywords: ["ناسياً", "صومه", "القضاء"] },
  { topic: "فقه: الصيام", title: "أجمع أهل العلم على", content: "أجمع أهل العلم على إبطال صوم من استقاء عامداً ووجوب القضاء عليه، أما من ذرعه القيء فلا شيء عليه", keywords: ["استقاء", "عامداً", "القضاء"] },
  { topic: "فقه: الصيام", title: "السحور مستحب، وينتهي بطلوع", content: "السحور مستحب، وينتهي بطلوع الفجر الصادق المنتشر في الأفق الذي يحرم معه الطعام والشراب", keywords: ["السحور", "مندوب", "الفجر"] },
  { topic: "فقه: الصيام", title: "من أفطر وهو يرى", content: "من أفطر وهو يرى أن الشمس قد غابت ثم تبين له أنها لم تغرب فعليه قضاء يوم مكانه عند عامة الفقهاء", keywords: ["أفطر", "الشمس", "قضاء"] },
  { topic: "فقه: الصيام", title: "المسافر له أن يفطر", content: "المسافر له أن يفطر في رمضان ويقضي، وإن صام فيه أجزأه، والفطر رخصة للمسافر", keywords: ["المسافر", "يفطر", "رخصة"] },
  { topic: "فقه: الصيام", title: "الشيخ الكبير والعجوز العاجزان", content: "الشيخ الكبير والعجوز العاجزان عن الصوم لهما أن يفطرا، وعليهما إطعام مسكين عن كل يوم مدا", keywords: ["الشيخ", "الكبير", "يفطرا"] },
  { topic: "فقه: الصيام", title: "قضاء رمضان إن شاء", content: "قضاء رمضان إن شاء الصائم فرقه وإن شاء تابعه، وتفريقه جائز لقوله تعالى \"فعدة من أيام أخر\" ولم يشترط التتابع", keywords: ["القضاء", "فرقه", "تابعه"] },
  { topic: "فقه: الصيام", title: "من فرط في قضاء", content: "من فرط في قضاء رمضان حتى دخل عليه رمضان آخر فعليه القضاء وإطعام مسكين لكل يوم مفرط فيه", keywords: ["فرط", "القضاء", "إطعام"] },
  { topic: "فقه: الصيام", title: "إذا حاضت المرأة في", content: "إذا حاضت المرأة في بعض النهار بطل صومها ولزمها القضاء، وإن طهرت قبل الفجر ونوت الصوم أجزأها وإن لم تغتسل", keywords: ["حاضت", "القضاء", "طهرت"] },
  { topic: "فقه: الصيام", title: "من ارتد عن الإسلام", content: "من ارتد عن الإسلام في نهار رمضان فقد أفطر وفسد صومه، ومن نوى الإفطار عازماً عليه فقد أفطر", keywords: ["ارتد", "أفطر", "نوى"] },
  { topic: "فقه: الصيام", title: "الصائم لا قضاء عليه", content: "الصائم لا قضاء عليه فيما يزدرده مما يجري مع الريق مما بين أسنانه مما لا يقدر على الامتناع منه", keywords: ["الصائم", "يزدرده", "الريق"] },
  { topic: "فقه: الصيام", title: "صوم يوم الفطر ويوم", content: "صوم يوم الفطر ويوم النحر وأيام التشريق غير جائز لنهي رسول الله صلى الله عليه وسلم عن ذلك", keywords: ["الفطر", "النحر", "أيام التشريق"] },
  { topic: "فقه: الصيام", title: "يؤمر الصبي بالصوم إذا", content: "يؤمر الصبي بالصوم إذا أطاقه وتمرن عليه ويكون ذلك له تطوعاً، ولا فريضة عليه حتى يبلغ", keywords: ["الصبي", "يؤمر بالصوم", "تطوعاً"] },
  { topic: "فقه: الصيام", title: "السواك لا بأس به", content: "السواك لا بأس به للصائم في أول النهار، ولكن يكرهه الشافعي في آخره لئلا يذهب خلوف فم الصائم", keywords: ["السواك", "للصائم", "خلوف"] }
];

/* ====== اختيار فقرة إسلامية عشوائية مع كلمة مفتاحية واحدة ====== */
function pickRandomIslamicParagraph(usedSet) {
  // حاول العثور على فقرة غير مستخدمة (حتى 30 محاولة)
  for (let attempt = 0; attempt < 30; attempt++) {
    const para = ISLAMIC_PARAGRAPHS[Math.floor(Math.random() * ISLAMIC_PARAGRAPHS.length)];
    const keyword = para.keywords[Math.floor(Math.random() * para.keywords.length)];
    const key = para.title + '::' + keyword;
    if (!usedSet || !usedSet.has(key)) {
      return { para, keyword };
    }
  }
  // fallback: عشوائي مطلق
  const para = ISLAMIC_PARAGRAPHS[Math.floor(Math.random() * ISLAMIC_PARAGRAPHS.length)];
  const keyword = para.keywords[Math.floor(Math.random() * para.keywords.length)];
  return { para, keyword };
}

/* ====== بنك أسئلة إسلامية احتياطي ====== */
/* يُنشأ تلقائياً من الفقرات — يُستخدم عند فشل الذكاء الاصطناعي */
const ISLAMIC_QUESTION_BANK = {
  easy: [
  { q: "ماذا يقول أهل العلم عن \"التمسك بما كان عليه الصحابة\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "هو الأصل الأول الذي يقوم على اتباع ما كان عليه أصحاب رسول الله ﷺ والاقتداء بهم ف...", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "العقيدة", explanation: "هو الأصل الأول الذي يقوم على اتباع ما كان عليه أصحاب رسول الله ﷺ والاقتداء بهم في فهم الدين" },
  { q: "ماذا يقول أهل العلم عن \"ترك البدع\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "تجنب كل محدثة في الدين، فإن كل بدعة ضلالة وإن رآها الناس حسنة", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "العقيدة", explanation: "تجنب كل محدثة في الدين، فإن كل بدعة ضلالة وإن رآها الناس حسنة" },
  { q: "ماذا يقول أهل العلم عن \"ترك الخصومات في الدين\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "مجانبة الجدال والمراء في مسائل الاعتقاد والرجوع إلى ما ثبت في الآثار"], a: 3, topic: "العقيدة", explanation: "مجانبة الجدال والمراء في مسائل الاعتقاد والرجوع إلى ما ثبت في الآثار" },
  { q: "ماذا يقول أهل العلم عن \"الله هو الحق\" في باب العقيدة؟", o: ["الله هو الحق المبين، وأسماؤه وصفاته حق، ووعده حق", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "العقيدة", explanation: "الله هو الحق المبين، وأسماؤه وصفاته حق، ووعده حق" },
  { q: "ماذا يقول أهل العلم عن \"الإيمان بصفات الله\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "إثبات ما وصف الله به نفسه وما وصفه به رسوله بلا تشبيه بالمخلوقين"], a: 3, topic: "العقيدة", explanation: "إثبات ما وصف الله به نفسه وما وصفه به رسوله بلا تشبيه بالمخلوقين" },
  { q: "ماذا يقول أهل العلم عن \"أزلية صفات الله\" في باب العقيدة؟", o: ["صفات الله لا بداية لها كما أن الله لا بداية له، لم يزل موصوفاً بها قبل خلقه للخل...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "العقيدة", explanation: "صفات الله لا بداية لها كما أن الله لا بداية له، لم يزل موصوفاً بها قبل خلقه للخلق" },
  { q: "ماذا يقول أهل العلم عن \"شمولية العلم الإلهي\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "الله يعلم عدد قطر الأمطار، وعدد الحصى والرمال، وما تكنه الصدور"], a: 3, topic: "العقيدة", explanation: "الله يعلم عدد قطر الأمطار، وعدد الحصى والرمال، وما تكنه الصدور" },
  { q: "ماذا يقول أهل العلم عن \"علو الله على عرشه\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "الله مستوٍ على عرشه، بائن من خلقه، وعلمه محيط بكل مكان"], a: 3, topic: "العقيدة", explanation: "الله مستوٍ على عرشه، بائن من خلقه، وعلمه محيط بكل مكان" },
  { q: "ماذا يقول أهل العلم عن \"إثبات السمع والبصر\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "لله سمع وبصر حقيقيان يليقان به، لا كسمع وبصر المخلوقين"], a: 3, topic: "العقيدة", explanation: "لله سمع وبصر حقيقيان يليقان به، لا كسمع وبصر المخلوقين" },
  { q: "ماذا يقول أهل العلم عن \"السنة تفسر القرآن\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "السنة واجبة الاتباع وهي الدليل على معاني القرآن والمفسرة له والمفصلة لمجمله"], a: 3, topic: "العقيدة", explanation: "السنة واجبة الاتباع وهي الدليل على معاني القرآن والمفسرة له والمفصلة لمجمله" },
  { q: "ماذا يقول أهل العلم عن \"الإيمان بالقدر\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "التصديق بأن الله قدر الخير والشر قبل خلق الخلق، ولا يقال \"لم\" أو \"كيف\"", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "العقيدة", explanation: "التصديق بأن الله قدر الخير والشر قبل خلق الخلق، ولا يقال \\\"لم\\\" أو \\\"كيف\\\"" },
  { q: "ماذا يقول أهل العلم عن \"القرآن كلام الله\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اليقين بأن القرآن هو كلام الله منزل غير مخلوق", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "العقيدة", explanation: "اليقين بأن القرآن هو كلام الله منزل غير مخلوق" },
  { q: "ماذا يقول أهل العلم عن \"رؤية الله في الآخرة\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "إثبات رؤية المؤمنين لربهم يوم القيامة عيانا كما يشاء الله"], a: 3, topic: "العقيدة", explanation: "إثبات رؤية المؤمنين لربهم يوم القيامة عيانا كما يشاء الله" },
  { q: "ماذا يقول أهل العلم عن \"الإيمان بالميزان\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "اعتقاد أن أعمال العباد توزن يوم القيامة، وله كفتان ولسان", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "العقيدة", explanation: "اعتقاد أن أعمال العباد توزن يوم القيامة، وله كفتان ولسان" },
  { q: "ماذا يقول أهل العلم عن \"تكليم الله لعباده\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "الله يكلم عباده يوم القيامة حقيقة بلا ترجمان ولا واسطة"], a: 3, topic: "العقيدة", explanation: "الله يكلم عباده يوم القيامة حقيقة بلا ترجمان ولا واسطة" },
  { q: "ماذا يقول أهل العلم عن \"الإيمان بالحوض\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "لرسول الله ﷺ حوض في القيامة ترد عليه أمته، آنيته كعدد نجوم السماء", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "العقيدة", explanation: "لرسول الله ﷺ حوض في القيامة ترد عليه أمته، آنيته كعدد نجوم السماء" },
  { q: "ماذا يقول أهل العلم عن \"سعة الحوض\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "حوض النبي ﷺ مسيرة شهر، ماؤه أبيض من اللبن وأحلى من العسل", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "العقيدة", explanation: "حوض النبي ﷺ مسيرة شهر، ماؤه أبيض من اللبن وأحلى من العسل" },
  { q: "ماذا يقول أهل العلم عن \"عذاب القبر وحقيقته\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "الإيمان بأن العبد يسأل في قبره عن ربه ودينه ونبيه"], a: 3, topic: "العقيدة", explanation: "الإيمان بأن العبد يسأل في قبره عن ربه ودينه ونبيه" },
  { q: "ماذا يقول أهل العلم عن \"الإيمان بمنكر ونكير\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "هما الملكان اللذان يفتنان العباد في قبورهم ويسألانهم", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "العقيدة", explanation: "هما الملكان اللذان يفتنان العباد في قبورهم ويسألانهم" },
  { q: "ماذا يقول أهل العلم عن \"الشفاعة حق\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "خروج عصاة الموحدين من النار بشفاعة النبي ﷺ وغيره من الشافعين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "العقيدة", explanation: "خروج عصاة الموحدين من النار بشفاعة النبي ﷺ وغيره من الشافعين" },
  { q: "ماذا يقول أهل العلم عن \"المسيح الدجال\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "الإيمان بخروجه في آخر الزمان وأنه أعور كذاب يفتن الناس", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "العقيدة", explanation: "الإيمان بخروجه في آخر الزمان وأنه أعور كذاب يفتن الناس" },
  { q: "ماذا يقول أهل العلم عن \"نزول عيسى عليه السلام\" في باب العقيدة؟", o: ["ينزل عيسى ابن مريم فيقتل الدجال ويحكم بالعدل", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "العقيدة", explanation: "ينزل عيسى ابن مريم فيقتل الدجال ويحكم بالعدل" },
  { q: "ماذا يقول أهل العلم عن \"الإيمان قول وعمل\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "الإيمان تصديق بالجنان وقول باللسان وعمل بالأركان"], a: 3, topic: "العقيدة", explanation: "الإيمان تصديق بالجنان وقول باللسان وعمل بالأركان" },
  { q: "ماذا يقول أهل العلم عن \"زيادة الإيمان ونقصانه\" في باب العقيدة؟", o: ["الإيمان يزيد بالطاعة وينقص بالمعصية ويتفاضل فيه الخلق", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "العقيدة", explanation: "الإيمان يزيد بالطاعة وينقص بالمعصية ويتفاضل فيه الخلق" },
  { q: "ماذا يقول أهل العلم عن \"الاستثناء في الإيمان\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "مشروعية قول \"أنا مؤمن إن شاء الله\" طلباً للكمال وتجنباً للتزكية"], a: 3, topic: "العقيدة", explanation: "مشروعية قول \\\"أنا مؤمن إن شاء الله\\\" طلباً للكمال وتجنباً للتزكية" },
  { q: "ماذا يقول أهل العلم عن \"لا نكفر أحداً بالذنب\" في باب العقيدة؟", o: ["لا يخرج المسلم من الإسلام بارتكاب الكبيرة ما لم يستحلها", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "العقيدة", explanation: "لا يخرج المسلم من الإسلام بارتكاب الكبيرة ما لم يستحلها" },
  { q: "ماذا يقول أهل العلم عن \"حقوق الأئمة والولاة\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "وجوب السمع والطاعة لولي الأمر في غير معصية، والجهاد معه براً كان أو فاجراً", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "العقيدة", explanation: "وجوب السمع والطاعة لولي الأمر في غير معصية، والجهاد معه براً كان أو فاجراً" },
  { q: "ماذا يقول أهل العلم عن \"الجمعة خلف الولاة\" في باب العقيدة؟", o: ["الصلاة خلف كل إمام مسلم جائزة ونافذة وإن كان ظالماً", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "العقيدة", explanation: "الصلاة خلف كل إمام مسلم جائزة ونافذة وإن كان ظالماً" },
  { q: "ماذا يقول أهل العلم عن \"فضل أبي بكر وعمر\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "هما أفضل الأمة بعد نبيها ثم عثمان ثم علي", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "العقيدة", explanation: "هما أفضل الأمة بعد نبيها ثم عثمان ثم علي" },
  { q: "ماذا يقول أهل العلم عن \"الكف عما شجر بين الصحابة\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "تجنب الخوض في خلافاتهم والترحم عليهم جميعاً"], a: 3, topic: "العقيدة", explanation: "تجنب الخوض في خلافاتهم والترحم عليهم جميعاً" },
  { q: "ماذا يقول أهل العلم عن \"اللوح والقلم\" في باب العقيدة؟", o: ["الإيمان بأن الله كتب كل ما هو كائن في اللوح المحفوظ", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "العقيدة", explanation: "الإيمان بأن الله كتب كل ما هو كائن في اللوح المحفوظ" },
  { q: "ماذا يقول أهل العلم عن \"الصراط يوم القيامة\" في باب العقيدة؟", o: ["هو الجسر الممدود على متن جهنم يعبره الناس حسب أعمالهم", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "العقيدة", explanation: "هو الجسر الممدود على متن جهنم يعبره الناس حسب أعمالهم" },
  { q: "ماذا يقول أهل العلم عن \"عصمة الأنبياء في التبليغ\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "الأنبياء صادقون بلغوا رسالات ربهم وأقاموا الحجة", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "العقيدة", explanation: "الأنبياء صادقون بلغوا رسالات ربهم وأقاموا الحجة" },
  { q: "ماذا يقول أهل العلم عن \"تفضيل القرن الأول\" في باب العقيدة؟", o: ["خير الناس قرن الصحابة ثم الذين يلونهم ثم الذين يلونهم", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "العقيدة", explanation: "خير الناس قرن الصحابة ثم الذين يلونهم ثم الذين يلونهم" },
  { q: "ماذا يقول أهل العلم عن \"الإيمان بالبعث والنشور\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اليقين بإحياء الموتى وخروجهم من قبورهم للحساب", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "العقيدة", explanation: "اليقين بإحياء الموتى وخروجهم من قبورهم للحساب" },
  { q: "ماذا يقول أهل العلم عن \"تحريم سب الصحابة\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "من سب أحداً من أصحاب النبي ﷺ فهو مبتدع ضال"], a: 3, topic: "العقيدة", explanation: "من سب أحداً من أصحاب النبي ﷺ فهو مبتدع ضال" },
  { q: "ماذا يقول أهل العلم عن \"مشيئة الله النافذة\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "ما شاء الله كان وما لم يشأ لم يكن، ولا غالب لمشيئته", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "العقيدة", explanation: "ما شاء الله كان وما لم يشأ لم يكن، ولا غالب لمشيئته" },
  { q: "ماذا يقول أهل العلم عن \"تحريم السحر\" في باب العقيدة؟", o: ["السحر حقيقة واستعماله كفر بالله العظيم", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "العقيدة", explanation: "السحر حقيقة واستعماله كفر بالله العظيم" },
  { q: "ماذا يقول أهل العلم عن \"الإيمان بالملائكة\" في باب العقيدة؟", o: ["هم عباد مكرمون لا يعصون الله ما أمرهم", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "العقيدة", explanation: "هم عباد مكرمون لا يعصون الله ما أمرهم" },
  { q: "ماذا يقول أهل العلم عن \"ملك الموت\" في باب العقيدة؟", o: ["الإيمان بوجوده وأنه يقبض الأرواح بإذن ربه", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "العقيدة", explanation: "الإيمان بوجوده وأنه يقبض الأرواح بإذن ربه" },
  { q: "ماذا يقول أهل العلم عن \"أشراط الساعة\" في باب العقيدة؟", o: ["التصديق بكل ما ثبت من علامات الساعة الكبرى والصغرى", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "العقيدة", explanation: "التصديق بكل ما ثبت من علامات الساعة الكبرى والصغرى" },
  { q: "ماذا يقول أهل العلم عن \"عذاب أهل الكبائر\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "هم تحت المشيئة، إن شاء الله عذبهم وإن شاء غفر لهم", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "العقيدة", explanation: "هم تحت المشيئة، إن شاء الله عذبهم وإن شاء غفر لهم" },
  { q: "ماذا يقول أهل العلم عن \"الله الخالق وحده\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "لا خالق مع الله، وكل ما سواه مخلوق وفي ملكه"], a: 3, topic: "العقيدة", explanation: "لا خالق مع الله، وكل ما سواه مخلوق وفي ملكه" },
  { q: "ماذا يقول أهل العلم عن \"تفضيل المهاجرين والأنصار\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "الإيمان بفضل السابقين الأولين من المهاجرين والأنصار على من بعدهم، وحبهم دين وبغض...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "العقيدة", explanation: "الإيمان بفضل السابقين الأولين من المهاجرين والأنصار على من بعدهم، وحبهم دين وبغضهم نفاق" },
  { q: "ماذا يقول أهل العلم عن \"حقوق آل البيت\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "محبة قرابة رسول الله ﷺ ورعاية حقهم، وموالاتهم من غير غلو ولا جفاء"], a: 3, topic: "العقيدة", explanation: "محبة قرابة رسول الله ﷺ ورعاية حقهم، وموالاتهم من غير غلو ولا جفاء" },
  { q: "ماذا يقول أهل العلم عن \"أمهات المؤمنين\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "الإيمان بفضل أزواج النبي ﷺ والترحم عليهن، وهن أزواجه في الجنة", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "العقيدة", explanation: "الإيمان بفضل أزواج النبي ﷺ والترحم عليهن، وهن أزواجه في الجنة" },
  { q: "ماذا يقول أهل العلم عن \"الكرامة للأولياء\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "التصديق بكرامات الله لأوليائه وما يظهره على أيديهم من خوارق العادات", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "العقيدة", explanation: "التصديق بكرامات الله لأوليائه وما يظهره على أيديهم من خوارق العادات" },
  { q: "ماذا يقول أهل العلم عن \"علاقة العلم بالعمل\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "العلم لا ينفع صاحبه إلا إذا قارنه العمل الصالح وموافقة السنة", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "العقيدة", explanation: "العلم لا ينفع صاحبه إلا إذا قارنه العمل الصالح وموافقة السنة" },
  { q: "ماذا يقول أهل العلم عن \"النفخ في الصور\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "الإيمان بنفختي الصور؛ نفخة الصعق ونفخة البعث والنشور"], a: 3, topic: "العقيدة", explanation: "الإيمان بنفختي الصور؛ نفخة الصعق ونفخة البعث والنشور" },
  { q: "ماذا يقول أهل العلم عن \"رؤية النبي لربه\" في باب العقيدة؟", o: ["الإيمان بصحة ما أثر عن النبي ﷺ أنه رأى ربه ليلة المعراج", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "العقيدة", explanation: "الإيمان بصحة ما أثر عن النبي ﷺ أنه رأى ربه ليلة المعراج" },
  { q: "ماذا يقول أهل العلم عن \"تنزيه الله عن النوم والنقائص\" في باب العقيدة؟", o: ["الله قيوم لا تأخذه سنة ولا نوم، ولا يلحقه عجز ولا فناء", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "العقيدة", explanation: "الله قيوم لا تأخذه سنة ولا نوم، ولا يلحقه عجز ولا فناء" }
  ],
  medium: [
  { q: "ماذا يقول أهل العلم عن \"الحساب وسرعته\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "الله يحاسب الخلق جميعاً في وقت يسير، وهو أسرع الحاسبين", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "العقيدة", explanation: "الله يحاسب الخلق جميعاً في وقت يسير، وهو أسرع الحاسبين" },
  { q: "ماذا يقول أهل العلم عن \"تطاير الصحف\" في باب العقيدة؟", o: ["يوم القيامة يأخذ المؤمن كتاب أعماله بيمينه، والكافر بشماله أو من وراء ظهره", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "العقيدة", explanation: "يوم القيامة يأخذ المؤمن كتاب أعماله بيمينه، والكافر بشماله أو من وراء ظهره" },
  { q: "ماذا يقول أهل العلم عن \"شهادة الجوارح\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "الإيمان بأن جوارح العباد تشهد عليهم يوم القيامة بما عملوا", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "العقيدة", explanation: "الإيمان بأن جوارح العباد تشهد عليهم يوم القيامة بما عملوا" },
  { q: "ماذا يقول أهل العلم عن \"القضاء والقدر نافذان\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "لا يقع في ملك الله إلا ما أراد، والعباد صائرون لما خلقوا له", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "العقيدة", explanation: "لا يقع في ملك الله إلا ما أراد، والعباد صائرون لما خلقوا له" },
  { q: "ماذا يقول أهل العلم عن \"الإيمان بالكتب\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "التصديق بكل الكتب المنزلة على الرسل كالتوراة والإنجيل والزبور والقرآن", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "العقيدة", explanation: "التصديق بكل الكتب المنزلة على الرسل كالتوراة والإنجيل والزبور والقرآن" },
  { q: "ماذا يقول أهل العلم عن \"عصمة الوحي\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "القرآن كتاب عزيز لا يأتيه الباطل من بين يديه ولا من خلفه"], a: 3, topic: "العقيدة", explanation: "القرآن كتاب عزيز لا يأتيه الباطل من بين يديه ولا من خلفه" },
  { q: "ماذا يقول أهل العلم عن \"إثبات الضحك لله\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "الله يضحك إلى عباده ويضحك من قنوطهم ويفرح لتوبتهم، ضحكاً حقيقياً يليق به", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "العقيدة", explanation: "الله يضحك إلى عباده ويضحك من قنوطهم ويفرح لتوبتهم، ضحكاً حقيقياً يليق به" },
  { q: "ماذا يقول أهل العلم عن \"إثبات العجب لله\" في باب العقيدة؟", o: ["الله يعجب من صنيع بعض عباده، وعجبه كمال لا نقص فيه", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "العقيدة", explanation: "الله يعجب من صنيع بعض عباده، وعجبه كمال لا نقص فيه" },
  { q: "ماذا يقول أهل العلم عن \"إثبات الغضب والسخط\" في باب العقيدة؟", o: ["الله يغضب ويسخط على من عصاه وكفر به حقيقة", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "العقيدة", explanation: "الله يغضب ويسخط على من عصاه وكفر به حقيقة" },
  { q: "ماذا يقول أهل العلم عن \"بقاء الجنة والنار\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "الجنة والنار لا تبيدان ولا تفنيان، وبقاؤهما دائم بإبقاء الله لهما"], a: 3, topic: "العقيدة", explanation: "الجنة والنار لا تبيدان ولا تفنيان، وبقاؤهما دائم بإبقاء الله لهما" },
  { q: "ماذا يقول أهل العلم عن \"موقف الحشر\" في باب العقيدة؟", o: ["يقف الناس في المحشر ألوف السنين حفاة عراة غرلاً بانتظار الحساب", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "العقيدة", explanation: "يقف الناس في المحشر ألوف السنين حفاة عراة غرلاً بانتظار الحساب" },
  { q: "ماذا يقول أهل العلم عن \"تنزيه الله عن الصاحبة والولد\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "الله فرد صمد، لا يحتاج أحدا من خلقه، منزه عن للزوجة أو الولد", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "العقيدة", explanation: "الله فرد صمد، لا يحتاج أحدا من خلقه، منزه عن للزوجة أو الولد" },
  { q: "ماذا يقول أهل العلم عن \"وحدانية الله في الربوبية\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "الله وحده خالق كل شيء ومدبر الأمر، لا شريك له في ملكه", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "العقيدة", explanation: "الله وحده خالق كل شيء ومدبر الأمر، لا شريك له في ملكه" },
  { q: "ماذا يقول أهل العلم عن \"وحدانية الله في الألوهية\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "إفراد الله بالعبادة والدعاء والذبح والنذر، ولا معبود بحق سواه", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "العقيدة", explanation: "إفراد الله بالعبادة والدعاء والذبح والنذر، ولا معبود بحق سواه" },
  { q: "ماذا يقول أهل العلم عن \"عذاب القبر للكفار والمؤمنين\" في باب العقيدة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "عذاب القبر حق يقع على الكافر وعلى بعض عصاة المؤمنين"], a: 3, topic: "العقيدة", explanation: "عذاب القبر حق يقع على الكافر وعلى بعض عصاة المؤمنين" },
  { q: "ماذا يقول أهل العلم عن \"النعيم في القبر\" في باب العقيدة؟", o: ["المؤمن الصالح ينعم في قبره ويفتح له باب إلى الجنة", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "العقيدة", explanation: "المؤمن الصالح ينعم في قبره ويفتح له باب إلى الجنة" },
  { q: "ماذا يقول أهل العلم عن \"الوجوب النظر والاستدلال\" في باب أصول الفقه؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "أوجب الله تعالى على عباده التفكر والاعتبار في آيات كتابه للوصول إلى العلم بما خف..."], a: 3, topic: "أصول الفقه", explanation: "أوجب الله تعالى على عباده التفكر والاعتبار في آيات كتابه للوصول إلى العلم بما خفي من الدلائل. فالأدلة منها ما هو جلي يدرك بداهة ومنها خفي لا يدرك إلا " },
  { q: "ماذا يقول أهل العلم عن \"القرآن الكريم أصل الأصول\" في باب أصول الفقه؟", o: ["لا أصل له في الشريعة الإسلامية", "هو الكتاب العزيز الذي لا يأتيه الباطل من بين يديه ولا من خلفه، وهو تبيان لكل شيء...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "أصول الفقه", explanation: "هو الكتاب العزيز الذي لا يأتيه الباطل من بين يديه ولا من خلفه، وهو تبيان لكل شيء. نزل بلسان عربي مبين ويشتمل على نصوص ظاهرة الدلالة وأخرى تحتمل التأوي" },
  { q: "ماذا يقول أهل العلم عن \"حجية السنة النبوية\" في باب أصول الفقه؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "السنة وحي من الله، وطاعة الرسول ﷺ مقرونة بطاعة الله عز وجل في كتابه. وهي تبيّن م..."], a: 3, topic: "أصول الفقه", explanation: "السنة وحي من الله، وطاعة الرسول ﷺ مقرونة بطاعة الله عز وجل في كتابه. وهي تبيّن مراد الله من فرائضه وتستقل بتشريع أحكام لم ترد نصاً في القرآن" },
  { q: "ماذا يقول أهل العلم عن \"الإجماع حجة قطعية\" في باب أصول الفقه؟", o: ["لا أصل له في الشريعة الإسلامية", "أصل الإجماع من الكتاب والسنة، وهو اتفاق الأمة الذي لا يجوز خلافه. والأمة معصومة ...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "أصول الفقه", explanation: "أصل الإجماع من الكتاب والسنة، وهو اتفاق الأمة الذي لا يجوز خلافه. والأمة معصومة من الاجتماع على ضلالة في كل عصر" },
  { q: "ماذا يقول أهل العلم عن \"القياس ومجاله\" في باب أصول الفقه؟", o: ["هو إلحاق فرع بأصل في حكم لعلة جامعة بينهما، وهو طريق شرعي للوصول إلى أحكام الحوا...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "أصول الفقه", explanation: "هو إلحاق فرع بأصل في حكم لعلة جامعة بينهما، وهو طريق شرعي للوصول إلى أحكام الحوادث. لا يُصار إليه إلا عند عدم وجود نص من كتاب أو سنة أو إجماع" },
  { q: "ماذا يقول أهل العلم عن \"إبطال التقليد للعالم\" في باب أصول الفقه؟", o: ["يجب على من ملك آلة العلم والاجتهاد أن يرجع إلى الأصول ولا يقلد غيره بغير حجة. ال...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "أصول الفقه", explanation: "يجب على من ملك آلة العلم والاجتهاد أن يرجع إلى الأصول ولا يقلد غيره بغير حجة. التقليد غفلة وترك لما أوجب الله من اتباع الحجة والدليل" },
  { q: "ماذا يقول أهل العلم عن \"تقليد العامي للعالم\" في باب أصول الفقه؟", o: ["لا أصل له في الشريعة الإسلامية", "يجوز للعامي ومن لا يحسن الاستدلال أن يقلد المجتهد في أحكام دينه. ويجب عليه الاجت...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "أصول الفقه", explanation: "يجوز للعامي ومن لا يحسن الاستدلال أن يقلد المجتهد في أحكام دينه. ويجب عليه الاجتهاد في اختيار الأعلم والأوثق من المفتين" },
  { q: "ماذا يقول أهل العلم عن \"دلالة الأمر على الوجوب\" في باب أصول الفقه؟", o: ["اللفظ المطلق للأمر يقتضي الوجوب وإيجاب الفعل إلا إذا قامت قرينة تصرفه للندب أو ا...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "أصول الفقه", explanation: "اللفظ المطلق للأمر يقتضي الوجوب وإيجاب الفعل إلا إذا قامت قرينة تصرفه للندب أو الإباحة. والأمر يفيد الفور في المبادرة إلى الامتثال" },
  { q: "ماذا يقول أهل العلم عن \"دلالة النهي على التحريم\" في باب أصول الفقه؟", o: ["ما نهى عنه النبي ﷺ فهو للمنع والتحريم إلا ما دل الدليل على أنه نهي تنزيه. ومخالف...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "أصول الفقه", explanation: "ما نهى عنه النبي ﷺ فهو للمنع والتحريم إلا ما دل الدليل على أنه نهي تنزيه. ومخالفة النهي تقتضي فساد المنهي عنه في الغالب" },
  { q: "ماذا يقول أهل العلم عن \"العموم والخصوص\" في باب أصول الفقه؟", o: ["اللفظ العام يجري على استغراق جنسه ما لم يقم دليل على تخصيصه. والتخصيص يكون بالقر...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "أصول الفقه", explanation: "اللفظ العام يجري على استغراق جنسه ما لم يقم دليل على تخصيصه. والتخصيص يكون بالقرآن أو السنة أو الإجماع أو القياس" },
  { q: "ماذا يقول أهل العلم عن \"الناسخ والمنسوخ\" في باب أصول الفقه؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "أجاز الله النسخ في كتابه وسنة نبيه رحمة بالعباد. والمعرفة به ضرورية لتمييز الأحك...", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "أصول الفقه", explanation: "أجاز الله النسخ في كتابه وسنة نبيه رحمة بالعباد. والمعرفة به ضرورية لتمييز الأحكام الباقية من التي ارتفع حكمها" },
  { q: "ماذا يقول أهل العلم عن \"حجية خبر الواحد العدل\" في باب أصول الفقه؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "يجب العمل بخبر الواحد إذا كان راويه عدلاً ضابطاً. وهو يوجب العلم الظاهر والعمل د..."], a: 3, topic: "أصول الفقه", explanation: "يجب العمل بخبر الواحد إذا كان راويه عدلاً ضابطاً. وهو يوجب العلم الظاهر والعمل دون القطع على الغيب" },
  { q: "ماذا يقول أهل العلم عن \"إجماع أهل المدينة\" في باب أصول الفقه؟", o: ["لا أصل له في الشريعة الإسلامية", "إجماع أهل المدينة في المسائل التي طريقها التوقيف والعمل المتوارث حجة مقدمة حسب ا...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "أصول الفقه", explanation: "إجماع أهل المدينة في المسائل التي طريقها التوقيف والعمل المتوارث حجة مقدمة حسب المذهب المالكي. فخبرهم في ذلك بمنزلة التواتر" },
  { q: "ماذا يقول أهل العلم عن \"دليل الخطاب (المفهوم)\" في باب أصول الفقه؟", o: ["لا أصل له في الشريعة الإسلامية", "هو تعليق الحكم بصفة أو شرط يقتضي نفي الحكم عما عداه. وهو أصل معمول به في استنباط...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "أصول الفقه", explanation: "هو تعليق الحكم بصفة أو شرط يقتضي نفي الحكم عما عداه. وهو أصل معمول به في استنباط الأحكام عند كثير من الفقهاء" },
  { q: "ماذا يقول أهل العلم عن \"العلة والمعلول\" في باب أصول الفقه؟", o: ["العلة هي الصفة التي علق الشارع الحكم بها. والمعلول هو الحكم الشرعي الذي يتبع الع...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "أصول الفقه", explanation: "العلة هي الصفة التي علق الشارع الحكم بها. والمعلول هو الحكم الشرعي الذي يتبع العلة وجوداً وعدماً" },
  { q: "ماذا يقول أهل العلم عن \"صحة العلة بالطرد والجريان\" في باب أصول الفقه؟", o: ["لا أصل له في الشريعة الإسلامية", "من علامات صحة العلة اطرادها في معلولاتها وعدم انتقاضها. فالعلة المستقيمة هي التي...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "أصول الفقه", explanation: "من علامات صحة العلة اطرادها في معلولاتها وعدم انتقاضها. فالعلة المستقيمة هي التي لا يفسدها أصل" },
  { q: "ماذا يقول أهل العلم عن \"تخصيص العلة\" في باب أصول الفقه؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "العلة الشرعية لا يجوز تخصيصها عند المحققين لأنها بمنزلة النص. وتخصيصها يبطل كونه..."], a: 3, topic: "أصول الفقه", explanation: "العلة الشرعية لا يجوز تخصيصها عند المحققين لأنها بمنزلة النص. وتخصيصها يبطل كونها أمارة صحيحة على الحكم" },
  { q: "ماذا يقول أهل العلم عن \"الاستحسان\" في باب أصول الفقه؟", o: ["لا أصل له في الشريعة الإسلامية", "عند الإمام أحمد هو العدول عن مقتضى القياس إلى حكم آخر لأثر أو ضرورة. وهو معمول ب...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "أصول الفقه", explanation: "عند الإمام أحمد هو العدول عن مقتضى القياس إلى حكم آخر لأثر أو ضرورة. وهو معمول به في مواضع مخصوصة رعاية للمصلحة" },
  { q: "ماذا يقول أهل العلم عن \"استصحاب الحال\" في باب أصول الفقه؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "بقاء الأمر على ما كان عليه في براءة الذمة حتى يرد سمع يغيره. فالأصل في العبادات ..."], a: 3, topic: "أصول الفقه", explanation: "بقاء الأمر على ما كان عليه في براءة الذمة حتى يرد سمع يغيره. فالأصل في العبادات التوقيف وفي الأعيان براءة الذمة" },
  { q: "ماذا يقول أهل العلم عن \"شرع من قبلنا\" في باب أصول الفقه؟", o: ["لا أصل له في الشريعة الإسلامية", "ما ثبت من شرائع الأنبياء السابقين ولم ينسخه شرعنا فهو يلزمنا اتباعه. والحجة في ذ...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "أصول الفقه", explanation: "ما ثبت من شرائع الأنبياء السابقين ولم ينسخه شرعنا فهو يلزمنا اتباعه. والحجة في ذلك الأمر بالاقتداء بهداهم" },
  { q: "ماذا يقول أهل العلم عن \"شروط المفتي والمجتهد\" في باب أصول الفقه؟", o: ["لا أصل له في الشريعة الإسلامية", "يجب أن يكون المفتي عالماً بالكتاب والسنة، ولسان العرب، وأقوال السلف. كما يشترط ف...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "أصول الفقه", explanation: "يجب أن يكون المفتي عالماً بالكتاب والسنة، ولسان العرب، وأقوال السلف. كما يشترط فيه العدالة والتقوى وحسن النية" },
  { q: "ماذا يقول أهل العلم عن \"حكم المجتهد في الفروع\" في باب أصول الفقه؟", o: ["لا أصل له في الشريعة الإسلامية", "الحق عند الله في مسائل الاجتهاد واحد والمصيب له أجران والمخطئ له أجر. ولا يجوز ت...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "أصول الفقه", explanation: "الحق عند الله في مسائل الاجتهاد واحد والمصيب له أجران والمخطئ له أجر. ولا يجوز تأثيم المخالف في مسائل الاجتهاد" },
  { q: "ماذا يقول أهل العلم عن \"البيان وتأخيره\" في باب أصول الفقه؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "لا يجوز تأخير البيان عن وقت الحاجة إلى العمل بالحكم. وقد يكون البيان بالقول أو ا...", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "أصول الفقه", explanation: "لا يجوز تأخير البيان عن وقت الحاجة إلى العمل بالحكم. وقد يكون البيان بالقول أو الفعل أو الكتابة" },
  { q: "ماذا يقول أهل العلم عن \"خطاب الواحد خطاب للجميع\" في باب أصول الفقه؟", o: ["لا أصل له في الشريعة الإسلامية", "إذا خاطب النبي ﷺ أحداً من أمته فالحكم عام للجميع ما لم يقم دليل الخصوص. فالجنس ا...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "أصول الفقه", explanation: "إذا خاطب النبي ﷺ أحداً من أمته فالحكم عام للجميع ما لم يقم دليل الخصوص. فالجنس الواحد يتساوى في أحكام الشرع" },
  { q: "ماذا يقول أهل العلم عن \"القياس على المخصوص\" في باب أصول الفقه؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "يجوز القياس على أصل ثبت حكمه بطريق التخصيص إذا عُرفت علته. فإلحاق العبد بالأمة ف...", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "أصول الفقه", explanation: "يجوز القياس على أصل ثبت حكمه بطريق التخصيص إذا عُرفت علته. فإلحاق العبد بالأمة في تنصيف الحد مثال على ذلك" },
  { q: "ماذا يقول أهل العلم عن \"أفعال النبي ﷺ\" في باب أصول الفقه؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "أفعال الرسول ﷺ الأصل فيها الاتباع والوجوب رداً إلى قوله تعالى {لقد كان لكم في رس..."], a: 3, topic: "أصول الفقه", explanation: "أفعال الرسول ﷺ الأصل فيها الاتباع والوجوب رداً إلى قوله تعالى {لقد كان لكم في رسول الله أسوة حسنة}. وتُحمل على الإباحة أو الندب بقرينة" },
  { q: "ماذا يقول أهل العلم عن \"تكرار المأمور به\" في باب أصول الفقه؟", o: ["الأمر المطلق لا يقتضي التكرار بلفظه، بل يقتضي إيجاد الفعل مرة واحدة. ولا يلزم ال...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "أصول الفقه", explanation: "الأمر المطلق لا يقتضي التكرار بلفظه، بل يقتضي إيجاد الفعل مرة واحدة. ولا يلزم التكرار إلا بدليل مستأنف" },
  { q: "ماذا يقول أهل العلم عن \"إثبات الأسماء بالقياس\" في باب أصول الفقه؟", o: ["لا أصل له في الشريعة الإسلامية", "يجوز إثبات الأسماء الشرعية من جهة القياس قياساً على أخذ الأحكام به. فتسمية النبي...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "أصول الفقه", explanation: "يجوز إثبات الأسماء الشرعية من جهة القياس قياساً على أخذ الأحكام به. فتسمية النبيذ خمراً لقياس معناه على الخمر" },
  { q: "ماذا يقول أهل العلم عن \"إثبات الحدود بالقياس\" في باب أصول الفقه؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "يجوز إثبات المقدرات والحدود من طريق القياس كما تثبت سائر الأحكام. وإجماع الصحابة...", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "أصول الفقه", explanation: "يجوز إثبات المقدرات والحدود من طريق القياس كما تثبت سائر الأحكام. وإجماع الصحابة في حد الخمر دليل على ذلك" },
  { q: "ماذا يقول أهل العلم عن \"تعارض الأخبار\" في باب أصول الفقه؟", o: ["لا أصل له في الشريعة الإسلامية", "عند تعارض الأخبار وتساويها بحيث ينتفي الجمع بينها يُصار إلى الترجيح بتقديم الأقو...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "أصول الفقه", explanation: "عند تعارض الأخبار وتساويها بحيث ينتفي الجمع بينها يُصار إلى الترجيح بتقديم الأقوى إسناداً أو متناً. ولا يُطرح أحد الخبرين إلا بدليل" },
  { q: "ماذا يقول أهل العلم عن \"العلم العام والعلم الخاص\" في باب أصول الفقه؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "العلم نوعان: عام لا يسع أحداً جهله كجمل الفرائض، وخاص يطلبه العلماء بالاستنباط و...", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "أصول الفقه", explanation: "العلم نوعان: عام لا يسع أحداً جهله كجمل الفرائض، وخاص يطلبه العلماء بالاستنباط والقياس" },
  { q: "ماذا يقول أهل العلم عن \"طهورية ماء البحر\" في باب فقه : الطهارة؟", o: ["ماء البحر طهور يصح التطهر به، وميتته حلال للأكل، وهو أصل في تطهير النجاسات", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه : الطهارة", explanation: "ماء البحر طهور يصح التطهر به، وميتته حلال للأكل، وهو أصل في تطهير النجاسات" },
  { q: "ماذا يقول أهل العلم عن \"الماء المطلق والنجاسة\" في باب فقه : الطهارة؟", o: ["كل ماء من سماء أو بئر أو ثلج فهو طهور، ما لم تخالطه نجاسة تغير طعمه أو لونه أو ر...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه : الطهارة", explanation: "كل ماء من سماء أو بئر أو ثلج فهو طهور، ما لم تخالطه نجاسة تغير طعمه أو لونه أو ريحه" },
  { q: "ماذا يقول أهل العلم عن \"حد الماء القليل والقلتان\" في باب فقه : الطهارة؟", o: ["الماء الذي يبلغ القلتين (خمس قرب) لا ينجس بوقوع النجاسة فيه إلا بالتغير، وما دون...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه : الطهارة", explanation: "الماء الذي يبلغ القلتين (خمس قرب) لا ينجس بوقوع النجاسة فيه إلا بالتغير، وما دونهما ينجس بمجرد المخالطة" },
  { q: "ماذا يقول أهل العلم عن \"الماء المستعمل\" في باب فقه : الطهارة؟", o: ["لا أصل له في الشريعة الإسلامية", "الماء الذي أدي به فرض الطهارة طاهر في نفسه لكنه غير مطهر لغيره في وضوء أو غسل جد...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه : الطهارة", explanation: "الماء الذي أدي به فرض الطهارة طاهر في نفسه لكنه غير مطهر لغيره في وضوء أو غسل جديد" },
  { q: "ماذا يقول أهل العلم عن \"طهارة سؤر ما يؤكل لحمه\" في باب فقه : الطهارة؟", o: ["سؤر الحيوان الذي يؤكل لحمه (ما يتبقى من شربه) طاهر يجوز الشرب منه والوضوء به", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه : الطهارة", explanation: "سؤر الحيوان الذي يؤكل لحمه (ما يتبقى من شربه) طاهر يجوز الشرب منه والوضوء به" },
  { q: "ماذا يقول أهل العلم عن \"الاستعاذة عند دخول الخلاء\" في باب فقه : الطهارة؟", o: ["يُشرع للمسلم قبل دخول الخلاء قول: \"اللهم إني أعوذ بك من الخبث والخبائث\" طلباً ...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه : الطهارة", explanation: "يُشرع للمسلم قبل دخول الخلاء قول: \\\"اللهم إني أعوذ بك من الخبث والخبائث\\\" طلباً للستر من الجن" },
  { q: "ماذا يقول أهل العلم عن \"استقبال القبلة واستدبارها\" في باب فقه : الطهارة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "يُمنع استقبال القبلة أو استدبارها ببول أو غائط في الأرض الجرداء، ويجوز ذلك في ال...", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "فقه : الطهارة", explanation: "يُمنع استقبال القبلة أو استدبارها ببول أو غائط في الأرض الجرداء، ويجوز ذلك في البنيان لوجود الحائل" },
  { q: "ماذا يقول أهل العلم عن \"النية في الوضوء\" في باب فقه : الطهارة؟", o: ["النية شرط لصحة الوضوء، فلا يجزئ الغسل بغير نية رفع الحدث أو استباحة الصلاة", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه : الطهارة", explanation: "النية شرط لصحة الوضوء، فلا يجزئ الغسل بغير نية رفع الحدث أو استباحة الصلاة" },
  { q: "ماذا يقول أهل العلم عن \"التسمية في ابتداء الطهارة\" في باب فقه : الطهارة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "يُستحب قول \"بسم الله\" في أول الوضوء", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "فقه : الطهارة", explanation: "يُستحب قول \\\"بسم الله\\\" في أول الوضوء" },
  { q: "ماذا يقول أهل العلم عن \"مسح الرأس والأذنين\" في باب فقه : الطهارة؟", o: ["لا أصل له في الشريعة الإسلامية", "مسح الرأس فريضة، ومسح الأذنين ظاهرهما وباطنهما من تمام مسح الرأس وسننه", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه : الطهارة", explanation: "مسح الرأس فريضة، ومسح الأذنين ظاهرهما وباطنهما من تمام مسح الرأس وسننه" }
  ],
  hard: [
  { q: "ماذا يقول أهل العلم عن \"تخليل الأصابع\" في باب فقه : الطهارة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "يجب تعاهد ما بين أصابع اليدين والرجلين بالماء لضمان وصول الطهور للبشرة", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "فقه : الطهارة", explanation: "يجب تعاهد ما بين أصابع اليدين والرجلين بالماء لضمان وصول الطهور للبشرة" },
  { q: "ماذا يقول أهل العلم عن \"الترتيب والموالاة\" في باب فقه : الطهارة؟", o: ["لا أصل له في الشريعة الإسلامية", "يجب غسل أعضاء الوضوء مرتبة كما ذكرها القرآن، والموالاة بينها بحيث لا يجف العضو ق...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه : الطهارة", explanation: "يجب غسل أعضاء الوضوء مرتبة كما ذكرها القرآن، والموالاة بينها بحيث لا يجف العضو قبل غسل ما بعده" },
  { q: "ماذا يقول أهل العلم عن \"نواقض الوضوء (الخارج من السبيلين)\" في باب فقه : الطهارة؟", o: ["لا أصل له في الشريعة الإسلامية", "كل ما خرج من البول أو الغائط أو الريح أو المذي يوجب إعادة الوضوء", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه : الطهارة", explanation: "كل ما خرج من البول أو الغائط أو الريح أو المذي يوجب إعادة الوضوء" },
  { q: "ماذا يقول أهل العلم عن \"النوم الناقض للوضوء\" في باب فقه : الطهارة؟", o: ["النوم المستثقل الذي يزول معه الإدراك ينقض الوضوء، أما خفق الرأس جالساً فلا ينقض", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه : الطهارة", explanation: "النوم المستثقل الذي يزول معه الإدراك ينقض الوضوء، أما خفق الرأس جالساً فلا ينقض" },
  { q: "ماذا يقول أهل العلم عن \"أكل لحم الإبل\" في باب فقه : الطهارة؟", o: ["لا أصل له في الشريعة الإسلامية", "أكل لحم الجزور ينقض الوضوء ويوجب إعادته، بخلاف أكل لحم الغنم والبقر", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه : الطهارة", explanation: "أكل لحم الجزور ينقض الوضوء ويوجب إعادته، بخلاف أكل لحم الغنم والبقر" },
  { q: "ماذا يقول أهل العلم عن \"صفة الغسل\" في باب فقه : الطهارة؟", o: ["يبدأ بغسل اليدين والفرج، ثم وضوء الصلاة، ثم إفاضة الماء على الرأس والجسد", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه : الطهارة", explanation: "يبدأ بغسل اليدين والفرج، ثم وضوء الصلاة، ثم إفاضة الماء على الرأس والجسد" },
  { q: "ماذا يقول أهل العلم عن \"التيمم عند فقد الماء\" في باب فقه : الطهارة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "يُشرع التيمم بالصعيد الطاهر (التراب أو الصخر الذي فيه غبار) عند انعدام الماء أو ...", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "فقه : الطهارة", explanation: "يُشرع التيمم بالصعيد الطاهر (التراب أو الصخر الذي فيه غبار) عند انعدام الماء أو العجز عن استخدامه لمرض" },
  { q: "ماذا يقول أهل العلم عن \"صفة التيمم\" في باب فقه : الطهارة؟", o: ["ضربة واحدة للوجه والكفين، وقيل ضربتان، ويمسح بهما الوجه وظهر الكفين", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه : الطهارة", explanation: "ضربة واحدة للوجه والكفين، وقيل ضربتان، ويمسح بهما الوجه وظهر الكفين" },
  { q: "ماذا يقول أهل العلم عن \"بطلان التيمم بوجود الماء\" في باب فقه : الطهارة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "إذا وجد المتيمم الماء قبل الدخول في الصلاة بطل تيممه ووجب عليه الوضوء"], a: 3, topic: "فقه : الطهارة", explanation: "إذا وجد المتيمم الماء قبل الدخول في الصلاة بطل تيممه ووجب عليه الوضوء" },
  { q: "ماذا يقول أهل العلم عن \"نجاسة الكلب\" في باب فقه : الطهارة؟", o: ["لا أصل له في الشريعة الإسلامية", "ولوغ الكلب في الإناء ينجس الماء، ويجب غسل الإناء سبع مرات أولاهن بالتراب", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه : الطهارة", explanation: "ولوغ الكلب في الإناء ينجس الماء، ويجب غسل الإناء سبع مرات أولاهن بالتراب" },
  { q: "ماذا يقول أهل العلم عن \"سنن الفطرة العشر\" في باب فقه : الطهارة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "منها قص الشارب، وإعفاء اللحية، والسواك، ونتف الابط، وقص الأظفار وحلق العانة", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "فقه : الطهارة", explanation: "منها قص الشارب، وإعفاء اللحية، والسواك، ونتف الابط، وقص الأظفار وحلق العانة" },
  { q: "ماذا يقول أهل العلم عن \"السواك ومشروعيته\" في باب فقه : الطهارة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "السواك سنة مرغبة عند كل وضوء وعند كل صلاة وفي حالات تغير رائحة الفم"], a: 3, topic: "فقه : الطهارة", explanation: "السواك سنة مرغبة عند كل وضوء وعند كل صلاة وفي حالات تغير رائحة الفم" },
  { q: "ماذا يقول أهل العلم عن \"الاستبراء من البول\" في باب فقه : الطهارة؟", o: ["لا أصل له في الشريعة الإسلامية", "يجب التنزه من البول والاستبراء منه حتى ينقطع تماماً لئلا ينجس الثوب", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه : الطهارة", explanation: "يجب التنزه من البول والاستبراء منه حتى ينقطع تماماً لئلا ينجس الثوب" },
  { q: "ماذا يقول أهل العلم عن \"الشك في عدد الركعات\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من شك في صلاته فلم يدر كم صلى، فإنه يبني على اليقين وهو الأقل، ثم يتم صلاته ويسج...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصلاة", explanation: "من شك في صلاته فلم يدر كم صلى، فإنه يبني على اليقين وهو الأقل، ثم يتم صلاته ويسجد للسهو قبل السلام" },
  { q: "ماذا يقول أهل العلم عن \"تكرار السهو في الصلاة\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "إذا سها المصلي مراراً في صلاة واحدة، فإن ذلك يجزئه فيه سجدتان فقط للسهو، ولا تتع...", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "فقه: الصلاة", explanation: "إذا سها المصلي مراراً في صلاة واحدة، فإن ذلك يجزئه فيه سجدتان فقط للسهو، ولا تتعدد السجدات بتعدد السهو" },
  { q: "ماذا يقول أهل العلم عن \"سهو المأموم\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "ليس على من سها خلف الإمام سجود للسهو، إذ الإمام يحمل عنه السهو، أما إذا سها الإم..."], a: 3, topic: "فقه: الصلاة", explanation: "ليس على من سها خلف الإمام سجود للسهو، إذ الإمام يحمل عنه السهو، أما إذا سها الإمام وجب على المأموم اتباعه في السجود" },
  { q: "ماذا يقول أهل العلم عن \"وجوب صلاة الجمعة\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "صلاة الجمعة واجبة على كل مسلم حر بالغ مقيم، ولا تجب على المرأة ولا الصبي ولا الع..."], a: 3, topic: "فقه: الصلاة", explanation: "صلاة الجمعة واجبة على كل مسلم حر بالغ مقيم، ولا تجب على المرأة ولا الصبي ولا العبد ولا المسافر" },
  { q: "ماذا يقول أهل العلم عن \"العدد في الجمعة\" في باب فقه: الصلاة؟", o: ["يشترط لصحة الجمعة حضور أربعين رجلاً من أهل الاستيطان في القرية عند الشافعي وأحمد...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه: الصلاة", explanation: "يشترط لصحة الجمعة حضور أربعين رجلاً من أهل الاستيطان في القرية عند الشافعي وأحمد، بينما يرى مالك وجوبها بوجود جماعة تستوطن وتبيع وتشتري" },
  { q: "ماذا يقول أهل العلم عن \"وقت صلاة الجمعة\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "وقت الجمعة هو وقت الظهر، ويبدأ من زوال الشمس عن كبد السماء"], a: 3, topic: "فقه: الصلاة", explanation: "وقت الجمعة هو وقت الظهر، ويبدأ من زوال الشمس عن كبد السماء" },
  { q: "ماذا يقول أهل العلم عن \"خطبة الجمعة\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "الخطبة شرط في صحة الجمعة، ويشترط أن يخطب الإمام خطبتين قائماً يفصل بينهما بجلوس،...", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "فقه: الصلاة", explanation: "الخطبة شرط في صحة الجمعة، ويشترط أن يخطب الإمام خطبتين قائماً يفصل بينهما بجلوس، ويفتتحهما بحمد الله والثناء عليه والصلاة على رسوله" },
  { q: "ماذا يقول أهل العلم عن \"إدراك الجمعة\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "من أدرك مع الإمام ركعة من صلاة الجمعة فقد أدرك الجمعة ويضيف إليها أخرى، ومن أدرك..."], a: 3, topic: "فقه: الصلاة", explanation: "من أدرك مع الإمام ركعة من صلاة الجمعة فقد أدرك الجمعة ويضيف إليها أخرى، ومن أدرك أقل من ركعة أتمها ظهراً أربعاً" },
  { q: "ماذا يقول أهل العلم عن \"غسل الجمعة\" في باب فقه: الصلاة؟", o: ["الغسل يوم الجمعة سُنة مؤكدة لكل من أراد حضور الصلاة", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه: الصلاة", explanation: "الغسل يوم الجمعة سُنة مؤكدة لكل من أراد حضور الصلاة" },
  { q: "ماذا يقول أهل العلم عن \"مواقيت الصلوات الخمس\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "مواقيت الصلاة مكتوبة موقوتة، للظهر من الزوال لصيرورة الظل مثله، ثم العصر، ثم الم..."], a: 3, topic: "فقه: الصلاة", explanation: "مواقيت الصلاة مكتوبة موقوتة، للظهر من الزوال لصيرورة الظل مثله، ثم العصر، ثم المغرب بالغروب، ثم العشاء بمغيب الشفق، ثم الصبح من طلوع الفجر إلى شروق ال" },
  { q: "ماذا يقول أهل العلم عن \"تكبيرة الإحرام\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "الصلاة لا تنعقد إلا بتكبيرة الإحرام، ولفظها \"الله أكبر\"، وهي ركن أساسي", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "فقه: الصلاة", explanation: "الصلاة لا تنعقد إلا بتكبيرة الإحرام، ولفظها \\\"الله أكبر\\\"، وهي ركن أساسي" },
  { q: "ماذا يقول أهل العلم عن \"ركنية الفاتحة\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "قراءة فاتحة الكتاب ركن في كل ركعة من ركعات الصلاة للإمام والمنفرد، لقول النبي صل...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصلاة", explanation: "قراءة فاتحة الكتاب ركن في كل ركعة من ركعات الصلاة للإمام والمنفرد، لقول النبي صلى الله عليه وسلم: \\\"لا صلاة لمن لم يقرأ بفاتحة الكتاب\\\"" },
  { q: "ماذا يقول أهل العلم عن \"الطمأنينة في الأركان\" في باب فقه: الصلاة؟", o: ["الطمأنينة في الركوع والسجود والاعتدال والجلوس بين السجدتين ركن لا تصح الصلاة بدو...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه: الصلاة", explanation: "الطمأنينة في الركوع والسجود والاعتدال والجلوس بين السجدتين ركن لا تصح الصلاة بدونه، ويجب سكون الأعضاء في كل ركن من هذه الأركان" },
  { q: "ماذا يقول أهل العلم عن \"التشهد الأخير والتسليم\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "الجلوس للتشهد الأخير ركن، وكذلك التسليم للخروج من الصلاة ركن، ولفظه \"السلام علي...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصلاة", explanation: "الجلوس للتشهد الأخير ركن، وكذلك التسليم للخروج من الصلاة ركن، ولفظه \\\"السلام عليكم\\\"، وبذلك يتحلل المصلي من صلاته" },
  { q: "ماذا يقول أهل العلم عن \"الجهر والإسرار\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "القراءة في الصبح والمغرب والعشاء تكون جهرا، وفي الظهر والعصر سرا، وهذا النقل متو...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصلاة", explanation: "القراءة في الصبح والمغرب والعشاء تكون جهرا، وفي الظهر والعصر سرا، وهذا النقل متواتر عن عامة المسلمين وعن النبي صلى الله عليه وسلم" },
  { q: "ماذا يقول أهل العلم عن \"الوتر وأهميته\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "الوتر ركعة واحدة في آخر صلاة الليل، وهو سُنة مؤكدة حافظ عليها النبي صلى الله علي...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصلاة", explanation: "الوتر ركعة واحدة في آخر صلاة الليل، وهو سُنة مؤكدة حافظ عليها النبي صلى الله عليه وسلم في الحضر والسفر، ولا ينبغي تركه" },
  { q: "ماذا يقول أهل العلم عن \"تحية المسجد\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "يستحب لمن دخل المسجد أن لا يجلس حتى يركع ركعتين تحية للمسجد، إلا إذا دخل والإمام...", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "فقه: الصلاة", explanation: "يستحب لمن دخل المسجد أن لا يجلس حتى يركع ركعتين تحية للمسجد، إلا إذا دخل والإمام في صلاة الفريضة فإنه يدخل معه" },
  { q: "ماذا يقول أهل العلم عن \"الكلام العمد في الصلاة\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "الكلام العمد لغير مصلحة الصلاة يبطلها بإجماع الفقهاء، لقوله صلى الله عليه وسلم: ..."], a: 3, topic: "فقه: الصلاة", explanation: "الكلام العمد لغير مصلحة الصلاة يبطلها بإجماع الفقهاء، لقوله صلى الله عليه وسلم: \\\"إن في الصلاة لشغلاً\\\"، ويجب على المتكلم الإعادة" },
  { q: "ماذا يقول أهل العلم عن \"الضحك في الصلاة\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "أجمع أهل العلم على أن الضحك يفسد الصلاة ويوجب الإعادة، وأما التبسم فلا يبطلها وإ...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصلاة", explanation: "أجمع أهل العلم على أن الضحك يفسد الصلاة ويوجب الإعادة، وأما التبسم فلا يبطلها وإن كان الأولى تركه للمحافظة على الخشوع" },
  { q: "ماذا يقول أهل العلم عن \"الأكل والشرب عمدًا\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "الأكل والشرب في الصلاة عمداً من مبطلات الصلاة، لأن ذلك ينافي هيئة العبادة والاشت...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصلاة", explanation: "الأكل والشرب في الصلاة عمداً من مبطلات الصلاة، لأن ذلك ينافي هيئة العبادة والاشتغال بذكر الله ومناجاته" },
  { q: "ماذا يقول أهل العلم عن \"ترك ركن عمداً\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "من ترك ركناً من أركان الصلاة عمداً، مثل الركوع أو السجود، بطلت صلاته ووجب عليه ا...", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "فقه: الصلاة", explanation: "من ترك ركناً من أركان الصلاة عمداً، مثل الركوع أو السجود، بطلت صلاته ووجب عليه استئنافها من جديد لفوات شرط صحتها" },
  { q: "ماذا يقول أهل العلم عن \"انتقاض الوضوء\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "إذا انتقض وضوء المصلي أثناء الصلاة بحدث أصغر أو أكبر، بطلت صلاته ووجب عليه الانص...", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "فقه: الصلاة", explanation: "إذا انتقض وضوء المصلي أثناء الصلاة بحدث أصغر أو أكبر، بطلت صلاته ووجب عليه الانصراف للتطهر ثم إعادة الصلاة" },
  { q: "ماذا يقول أهل العلم عن \"العمل الكثير المتوالي\" في باب فقه: الصلاة؟", o: ["العمل الكثير من غير جنس الصلاة إذا كان متوالياً يبطل الصلاة، لأنه يخرجها عن هيئت...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه: الصلاة", explanation: "العمل الكثير من غير جنس الصلاة إذا كان متوالياً يبطل الصلاة، لأنه يخرجها عن هيئتها المشروعة وينافي الخشوع المطلوب فيها" },
  { q: "ماذا يقول أهل العلم عن \"صلاة الصبي والصبية\" في باب فقه: الصلاة؟", o: ["تصح صلاة الصبي المميز وتعتبر له نافلة، وكذلك الصبية، ويؤمرون بالصلاة لسبع سنين و...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه: الصلاة", explanation: "تصح صلاة الصبي المميز وتعتبر له نافلة، وكذلك الصبية، ويؤمرون بالصلاة لسبع سنين ويضربون عليها لعشر تأديباً وتعويداً" },
  { q: "ماذا يقول أهل العلم عن \"تحويل النية\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "إذا افتتح المصلي صلاة فريضة ثم حول نيتها إلى نافلة لغرض شرعي جاز ذلك، أما تحويل ...", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "فقه: الصلاة", explanation: "إذا افتتح المصلي صلاة فريضة ثم حول نيتها إلى نافلة لغرض شرعي جاز ذلك، أما تحويل النافلة إلى فريضة فلا يصح" },
  { q: "ماذا يقول أهل العلم عن \"قضاء الفوائت\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "من فاتته صلاة مكتوبة وجب عليه قضاؤها فور تذكرها، لقوله صلى الله عليه وسلم: \"من ..."], a: 3, topic: "فقه: الصلاة", explanation: "من فاتته صلاة مكتوبة وجب عليه قضاؤها فور تذكرها، لقوله صلى الله عليه وسلم: \\\"من نسي صلاة أو نام عنها فليصلها إذا ذكرها\\\"" },
  { q: "ماذا يقول أهل العلم عن \"الصيام في اللغة هو\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "الصيام في اللغة هو الإمساك، وفي الشرع هو الإمساك عن المفطرات من طلوع الفجر إلى غ...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصيام", explanation: "الصيام في اللغة هو الإمساك، وفي الشرع هو الإمساك عن المفطرات من طلوع الفجر إلى غروب الشمس بنية" },
  { q: "ماذا يقول أهل العلم عن \"لا يجزئ صيام الفرض\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "لا يجزئ صيام الفرض من شهر رمضان أو نذر أو كفارة إلا أن ينوي الصائم الصيام قبل ال...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصيام", explanation: "لا يجزئ صيام الفرض من شهر رمضان أو نذر أو كفارة إلا أن ينوي الصائم الصيام قبل الفجر من الليل" },
  { q: "ماذا يقول أهل العلم عن \"في صيام التطوع لا\" في باب فقه: الصيام؟", o: ["في صيام التطوع لا بأس إن أصبح المرء ولم يطعم شيئاً أن ينوي الصوم قبل الزوال كما ...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه: الصيام", explanation: "في صيام التطوع لا بأس إن أصبح المرء ولم يطعم شيئاً أن ينوي الصوم قبل الزوال كما فعل النبي صلى الله عليه وسلم" },
  { q: "ماذا يقول أهل العلم عن \"يصام شهر رمضان لرؤية\" في باب فقه: الصيام؟", o: ["يصام شهر رمضان لرؤية الهلال ويفطر لرؤيته، فإن غم الهلال فيكمل ثلاثين يوما من شهر...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه: الصيام", explanation: "يصام شهر رمضان لرؤية الهلال ويفطر لرؤيته، فإن غم الهلال فيكمل ثلاثين يوما من شهر شعبان ثم يصام رمضان" },
  { q: "ماذا يقول أهل العلم عن \"صيام شهر رمضان واجب\" في باب فقه: الصيام؟", o: ["صيام شهر رمضان واجب على كل بالغ من رجل أو امرأة أو عبد", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه: الصيام", explanation: "صيام شهر رمضان واجب على كل بالغ من رجل أو امرأة أو عبد" },
  { q: "ماذا يقول أهل العلم عن \"أجمع أهل العلم على\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "أجمع أهل العلم على أن الله حرم على الصائم في نهار الصوم الأكل والشرب والجماع", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصيام", explanation: "أجمع أهل العلم على أن الله حرم على الصائم في نهار الصوم الأكل والشرب والجماع" },
  { q: "ماذا يقول أهل العلم عن \"من أكل أو شرب\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "من أكل أو شرب في نهار رمضان ناسياً فليتم صومه ولا قضاء عليه عند الشافعي وأحمد، ب...", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "فقه: الصيام", explanation: "من أكل أو شرب في نهار رمضان ناسياً فليتم صومه ولا قضاء عليه عند الشافعي وأحمد، بينما يرى مالك وجوب القضاء" },
  { q: "ماذا يقول أهل العلم عن \"أجمع أهل العلم على\" في باب فقه: الصيام؟", o: ["أجمع أهل العلم على إبطال صوم من استقاء عامداً ووجوب القضاء عليه، أما من ذرعه الق...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه: الصيام", explanation: "أجمع أهل العلم على إبطال صوم من استقاء عامداً ووجوب القضاء عليه، أما من ذرعه القيء فلا شيء عليه" },
  { q: "ماذا يقول أهل العلم عن \"السحور مستحب، وينتهي بطلوع\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "السحور مستحب، وينتهي بطلوع الفجر الصادق المنتشر في الأفق الذي يحرم معه الطعام وا..."], a: 3, topic: "فقه: الصيام", explanation: "السحور مستحب، وينتهي بطلوع الفجر الصادق المنتشر في الأفق الذي يحرم معه الطعام والشراب" },
  { q: "ماذا يقول أهل العلم عن \"من أفطر وهو يرى\" في باب فقه: الصيام؟", o: ["من أفطر وهو يرى أن الشمس قد غابت ثم تبين له أنها لم تغرب فعليه قضاء يوم مكانه عن...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه: الصيام", explanation: "من أفطر وهو يرى أن الشمس قد غابت ثم تبين له أنها لم تغرب فعليه قضاء يوم مكانه عند عامة الفقهاء" },
  { q: "ماذا يقول أهل العلم عن \"المسافر له أن يفطر\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "المسافر له أن يفطر في رمضان ويقضي، وإن صام فيه أجزأه، والفطر رخصة للمسافر", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "فقه: الصيام", explanation: "المسافر له أن يفطر في رمضان ويقضي، وإن صام فيه أجزأه، والفطر رخصة للمسافر" },
  { q: "ماذا يقول أهل العلم عن \"الشيخ الكبير والعجوز العاجزان\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "الشيخ الكبير والعجوز العاجزان عن الصوم لهما أن يفطرا، ويستحب لهما إطعام مسكين عن...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصيام", explanation: "الشيخ الكبير والعجوز العاجزان عن الصوم لهما أن يفطرا، ويستحب لهما إطعام مسكين عن كل يوم مداً من حنطة" },
  { q: "ماذا يقول أهل العلم عن \"قضاء رمضان إن شاء\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "قضاء رمضان إن شاء الصائم فرقه وإن شاء تابعه، وتفريقه جائز لقوله تعالى \"فعدة من ...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصيام", explanation: "قضاء رمضان إن شاء الصائم فرقه وإن شاء تابعه، وتفريقه جائز لقوله تعالى \\\"فعدة من أيام أخر\\\" ولم يشترط التتابع" },
  { q: "ماذا يقول أهل العلم عن \"من فرط في قضاء\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "من فرط في قضاء رمضان حتى دخل عليه رمضان آخر فعليه القضاء وإطعام مسكين لكل يوم مف..."], a: 3, topic: "فقه: الصيام", explanation: "من فرط في قضاء رمضان حتى دخل عليه رمضان آخر فعليه القضاء وإطعام مسكين لكل يوم مفرط فيه" },
  { q: "ماذا يقول أهل العلم عن \"إذا حاضت المرأة في\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "إذا حاضت المرأة في بعض النهار بطل صومها ولزمها القضاء، وإن طهرت قبل الفجر ونوت ا...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصيام", explanation: "إذا حاضت المرأة في بعض النهار بطل صومها ولزمها القضاء، وإن طهرت قبل الفجر ونوت الصوم أجزأها وإن لم تغتسل" },
  { q: "ماذا يقول أهل العلم عن \"من ارتد عن الإسلام\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "من ارتد عن الإسلام في نهار رمضان فقد أفطر وفسد صومه، ومن نوى الإفطار عازماً عليه..."], a: 3, topic: "فقه: الصيام", explanation: "من ارتد عن الإسلام في نهار رمضان فقد أفطر وفسد صومه، ومن نوى الإفطار عازماً عليه فقد أفطر" },
  { q: "ماذا يقول أهل العلم عن \"الصائم لا قضاء عليه\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "الصائم لا قضاء عليه فيما يزدرده مما يجري مع الريق مما بين أسنانه مما لا يقدر على..."], a: 3, topic: "فقه: الصيام", explanation: "الصائم لا قضاء عليه فيما يزدرده مما يجري مع الريق مما بين أسنانه مما لا يقدر على الامتناع منه" },
  { q: "ماذا يقول أهل العلم عن \"صوم يوم الفطر ويوم\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "صوم يوم الفطر ويوم النحر وأيام التشريق غير جائز لنهي رسول الله صلى الله عليه وسل...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصيام", explanation: "صوم يوم الفطر ويوم النحر وأيام التشريق غير جائز لنهي رسول الله صلى الله عليه وسلم عن ذلك" },
  { q: "ماذا يقول أهل العلم عن \"يؤمر الصبي بالصوم إذا\" في باب فقه: الصيام؟", o: ["يؤمر الصبي بالصوم إذا أطاقه وتمرن عليه ويكون ذلك له تطوعاً، ولا فريضة عليه حتى ي...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه: الصيام", explanation: "يؤمر الصبي بالصوم إذا أطاقه وتمرن عليه ويكون ذلك له تطوعاً، ولا فريضة عليه حتى يبلغ" },
  { q: "ماذا يقول أهل العلم عن \"السواك لا بأس به\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "السواك لا بأس به للصائم في أول النهار، ولكن يكرهه الشافعي في آخره لئلا يذهب خلوف..."], a: 3, topic: "فقه: الصيام", explanation: "السواك لا بأس به للصائم في أول النهار، ولكن يكرهه الشافعي في آخره لئلا يذهب خلوف فم الصائم" }
  ],
  expert: [  // نستخدم hard كمصدر لـ expert أيضاً
  { q: "ماذا يقول أهل العلم عن \"تخليل الأصابع\" في باب فقه : الطهارة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "يجب تعاهد ما بين أصابع اليدين والرجلين بالماء لضمان وصول الطهور للبشرة", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "فقه : الطهارة", explanation: "يجب تعاهد ما بين أصابع اليدين والرجلين بالماء لضمان وصول الطهور للبشرة" },
  { q: "ماذا يقول أهل العلم عن \"الترتيب والموالاة\" في باب فقه : الطهارة؟", o: ["لا أصل له في الشريعة الإسلامية", "يجب غسل أعضاء الوضوء مرتبة كما ذكرها القرآن، والموالاة بينها بحيث لا يجف العضو ق...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه : الطهارة", explanation: "يجب غسل أعضاء الوضوء مرتبة كما ذكرها القرآن، والموالاة بينها بحيث لا يجف العضو قبل غسل ما بعده" },
  { q: "ماذا يقول أهل العلم عن \"نواقض الوضوء (الخارج من السبيلين)\" في باب فقه : الطهارة؟", o: ["لا أصل له في الشريعة الإسلامية", "كل ما خرج من البول أو الغائط أو الريح أو المذي يوجب إعادة الوضوء", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه : الطهارة", explanation: "كل ما خرج من البول أو الغائط أو الريح أو المذي يوجب إعادة الوضوء" },
  { q: "ماذا يقول أهل العلم عن \"النوم الناقض للوضوء\" في باب فقه : الطهارة؟", o: ["النوم المستثقل الذي يزول معه الإدراك ينقض الوضوء، أما خفق الرأس جالساً فلا ينقض", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه : الطهارة", explanation: "النوم المستثقل الذي يزول معه الإدراك ينقض الوضوء، أما خفق الرأس جالساً فلا ينقض" },
  { q: "ماذا يقول أهل العلم عن \"أكل لحم الإبل\" في باب فقه : الطهارة؟", o: ["لا أصل له في الشريعة الإسلامية", "أكل لحم الجزور ينقض الوضوء ويوجب إعادته، بخلاف أكل لحم الغنم والبقر", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه : الطهارة", explanation: "أكل لحم الجزور ينقض الوضوء ويوجب إعادته، بخلاف أكل لحم الغنم والبقر" },
  { q: "ماذا يقول أهل العلم عن \"صفة الغسل\" في باب فقه : الطهارة؟", o: ["يبدأ بغسل اليدين والفرج، ثم وضوء الصلاة، ثم إفاضة الماء على الرأس والجسد", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه : الطهارة", explanation: "يبدأ بغسل اليدين والفرج، ثم وضوء الصلاة، ثم إفاضة الماء على الرأس والجسد" },
  { q: "ماذا يقول أهل العلم عن \"التيمم عند فقد الماء\" في باب فقه : الطهارة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "يُشرع التيمم بالصعيد الطاهر (التراب أو الصخر الذي فيه غبار) عند انعدام الماء أو ...", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "فقه : الطهارة", explanation: "يُشرع التيمم بالصعيد الطاهر (التراب أو الصخر الذي فيه غبار) عند انعدام الماء أو العجز عن استخدامه لمرض" },
  { q: "ماذا يقول أهل العلم عن \"صفة التيمم\" في باب فقه : الطهارة؟", o: ["ضربة واحدة للوجه والكفين، وقيل ضربتان، ويمسح بهما الوجه وظهر الكفين", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه : الطهارة", explanation: "ضربة واحدة للوجه والكفين، وقيل ضربتان، ويمسح بهما الوجه وظهر الكفين" },
  { q: "ماذا يقول أهل العلم عن \"بطلان التيمم بوجود الماء\" في باب فقه : الطهارة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "إذا وجد المتيمم الماء قبل الدخول في الصلاة بطل تيممه ووجب عليه الوضوء"], a: 3, topic: "فقه : الطهارة", explanation: "إذا وجد المتيمم الماء قبل الدخول في الصلاة بطل تيممه ووجب عليه الوضوء" },
  { q: "ماذا يقول أهل العلم عن \"نجاسة الكلب\" في باب فقه : الطهارة؟", o: ["لا أصل له في الشريعة الإسلامية", "ولوغ الكلب في الإناء ينجس الماء، ويجب غسل الإناء سبع مرات أولاهن بالتراب", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه : الطهارة", explanation: "ولوغ الكلب في الإناء ينجس الماء، ويجب غسل الإناء سبع مرات أولاهن بالتراب" },
  { q: "ماذا يقول أهل العلم عن \"سنن الفطرة العشر\" في باب فقه : الطهارة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "منها قص الشارب، وإعفاء اللحية، والسواك، ونتف الابط، وقص الأظفار وحلق العانة", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "فقه : الطهارة", explanation: "منها قص الشارب، وإعفاء اللحية، والسواك، ونتف الابط، وقص الأظفار وحلق العانة" },
  { q: "ماذا يقول أهل العلم عن \"السواك ومشروعيته\" في باب فقه : الطهارة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "السواك سنة مرغبة عند كل وضوء وعند كل صلاة وفي حالات تغير رائحة الفم"], a: 3, topic: "فقه : الطهارة", explanation: "السواك سنة مرغبة عند كل وضوء وعند كل صلاة وفي حالات تغير رائحة الفم" },
  { q: "ماذا يقول أهل العلم عن \"الاستبراء من البول\" في باب فقه : الطهارة؟", o: ["لا أصل له في الشريعة الإسلامية", "يجب التنزه من البول والاستبراء منه حتى ينقطع تماماً لئلا ينجس الثوب", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه : الطهارة", explanation: "يجب التنزه من البول والاستبراء منه حتى ينقطع تماماً لئلا ينجس الثوب" },
  { q: "ماذا يقول أهل العلم عن \"الشك في عدد الركعات\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من شك في صلاته فلم يدر كم صلى، فإنه يبني على اليقين وهو الأقل، ثم يتم صلاته ويسج...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصلاة", explanation: "من شك في صلاته فلم يدر كم صلى، فإنه يبني على اليقين وهو الأقل، ثم يتم صلاته ويسجد للسهو قبل السلام" },
  { q: "ماذا يقول أهل العلم عن \"تكرار السهو في الصلاة\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "إذا سها المصلي مراراً في صلاة واحدة، فإن ذلك يجزئه فيه سجدتان فقط للسهو، ولا تتع...", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "فقه: الصلاة", explanation: "إذا سها المصلي مراراً في صلاة واحدة، فإن ذلك يجزئه فيه سجدتان فقط للسهو، ولا تتعدد السجدات بتعدد السهو" },
  { q: "ماذا يقول أهل العلم عن \"سهو المأموم\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "ليس على من سها خلف الإمام سجود للسهو، إذ الإمام يحمل عنه السهو، أما إذا سها الإم..."], a: 3, topic: "فقه: الصلاة", explanation: "ليس على من سها خلف الإمام سجود للسهو، إذ الإمام يحمل عنه السهو، أما إذا سها الإمام وجب على المأموم اتباعه في السجود" },
  { q: "ماذا يقول أهل العلم عن \"وجوب صلاة الجمعة\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "صلاة الجمعة واجبة على كل مسلم حر بالغ مقيم، ولا تجب على المرأة ولا الصبي ولا الع..."], a: 3, topic: "فقه: الصلاة", explanation: "صلاة الجمعة واجبة على كل مسلم حر بالغ مقيم، ولا تجب على المرأة ولا الصبي ولا العبد ولا المسافر" },
  { q: "ماذا يقول أهل العلم عن \"العدد في الجمعة\" في باب فقه: الصلاة؟", o: ["يشترط لصحة الجمعة حضور أربعين رجلاً من أهل الاستيطان في القرية عند الشافعي وأحمد...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه: الصلاة", explanation: "يشترط لصحة الجمعة حضور أربعين رجلاً من أهل الاستيطان في القرية عند الشافعي وأحمد، بينما يرى مالك وجوبها بوجود جماعة تستوطن وتبيع وتشتري" },
  { q: "ماذا يقول أهل العلم عن \"وقت صلاة الجمعة\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "وقت الجمعة هو وقت الظهر، ويبدأ من زوال الشمس عن كبد السماء"], a: 3, topic: "فقه: الصلاة", explanation: "وقت الجمعة هو وقت الظهر، ويبدأ من زوال الشمس عن كبد السماء" },
  { q: "ماذا يقول أهل العلم عن \"خطبة الجمعة\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "الخطبة شرط في صحة الجمعة، ويشترط أن يخطب الإمام خطبتين قائماً يفصل بينهما بجلوس،...", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "فقه: الصلاة", explanation: "الخطبة شرط في صحة الجمعة، ويشترط أن يخطب الإمام خطبتين قائماً يفصل بينهما بجلوس، ويفتتحهما بحمد الله والثناء عليه والصلاة على رسوله" },
  { q: "ماذا يقول أهل العلم عن \"إدراك الجمعة\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "من أدرك مع الإمام ركعة من صلاة الجمعة فقد أدرك الجمعة ويضيف إليها أخرى، ومن أدرك..."], a: 3, topic: "فقه: الصلاة", explanation: "من أدرك مع الإمام ركعة من صلاة الجمعة فقد أدرك الجمعة ويضيف إليها أخرى، ومن أدرك أقل من ركعة أتمها ظهراً أربعاً" },
  { q: "ماذا يقول أهل العلم عن \"غسل الجمعة\" في باب فقه: الصلاة؟", o: ["الغسل يوم الجمعة سُنة مؤكدة لكل من أراد حضور الصلاة", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه: الصلاة", explanation: "الغسل يوم الجمعة سُنة مؤكدة لكل من أراد حضور الصلاة" },
  { q: "ماذا يقول أهل العلم عن \"مواقيت الصلوات الخمس\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "مواقيت الصلاة مكتوبة موقوتة، للظهر من الزوال لصيرورة الظل مثله، ثم العصر، ثم الم..."], a: 3, topic: "فقه: الصلاة", explanation: "مواقيت الصلاة مكتوبة موقوتة، للظهر من الزوال لصيرورة الظل مثله، ثم العصر، ثم المغرب بالغروب، ثم العشاء بمغيب الشفق، ثم الصبح من طلوع الفجر إلى شروق ال" },
  { q: "ماذا يقول أهل العلم عن \"تكبيرة الإحرام\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "الصلاة لا تنعقد إلا بتكبيرة الإحرام، ولفظها \"الله أكبر\"، وهي ركن أساسي", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "فقه: الصلاة", explanation: "الصلاة لا تنعقد إلا بتكبيرة الإحرام، ولفظها \\\"الله أكبر\\\"، وهي ركن أساسي" },
  { q: "ماذا يقول أهل العلم عن \"ركنية الفاتحة\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "قراءة فاتحة الكتاب ركن في كل ركعة من ركعات الصلاة للإمام والمنفرد، لقول النبي صل...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصلاة", explanation: "قراءة فاتحة الكتاب ركن في كل ركعة من ركعات الصلاة للإمام والمنفرد، لقول النبي صلى الله عليه وسلم: \\\"لا صلاة لمن لم يقرأ بفاتحة الكتاب\\\"" },
  { q: "ماذا يقول أهل العلم عن \"الطمأنينة في الأركان\" في باب فقه: الصلاة؟", o: ["الطمأنينة في الركوع والسجود والاعتدال والجلوس بين السجدتين ركن لا تصح الصلاة بدو...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه: الصلاة", explanation: "الطمأنينة في الركوع والسجود والاعتدال والجلوس بين السجدتين ركن لا تصح الصلاة بدونه، ويجب سكون الأعضاء في كل ركن من هذه الأركان" },
  { q: "ماذا يقول أهل العلم عن \"التشهد الأخير والتسليم\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "الجلوس للتشهد الأخير ركن، وكذلك التسليم للخروج من الصلاة ركن، ولفظه \"السلام علي...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصلاة", explanation: "الجلوس للتشهد الأخير ركن، وكذلك التسليم للخروج من الصلاة ركن، ولفظه \\\"السلام عليكم\\\"، وبذلك يتحلل المصلي من صلاته" },
  { q: "ماذا يقول أهل العلم عن \"الجهر والإسرار\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "القراءة في الصبح والمغرب والعشاء تكون جهرا، وفي الظهر والعصر سرا، وهذا النقل متو...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصلاة", explanation: "القراءة في الصبح والمغرب والعشاء تكون جهرا، وفي الظهر والعصر سرا، وهذا النقل متواتر عن عامة المسلمين وعن النبي صلى الله عليه وسلم" },
  { q: "ماذا يقول أهل العلم عن \"الوتر وأهميته\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "الوتر ركعة واحدة في آخر صلاة الليل، وهو سُنة مؤكدة حافظ عليها النبي صلى الله علي...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصلاة", explanation: "الوتر ركعة واحدة في آخر صلاة الليل، وهو سُنة مؤكدة حافظ عليها النبي صلى الله عليه وسلم في الحضر والسفر، ولا ينبغي تركه" },
  { q: "ماذا يقول أهل العلم عن \"تحية المسجد\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "يستحب لمن دخل المسجد أن لا يجلس حتى يركع ركعتين تحية للمسجد، إلا إذا دخل والإمام...", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "فقه: الصلاة", explanation: "يستحب لمن دخل المسجد أن لا يجلس حتى يركع ركعتين تحية للمسجد، إلا إذا دخل والإمام في صلاة الفريضة فإنه يدخل معه" },
  { q: "ماذا يقول أهل العلم عن \"الكلام العمد في الصلاة\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "الكلام العمد لغير مصلحة الصلاة يبطلها بإجماع الفقهاء، لقوله صلى الله عليه وسلم: ..."], a: 3, topic: "فقه: الصلاة", explanation: "الكلام العمد لغير مصلحة الصلاة يبطلها بإجماع الفقهاء، لقوله صلى الله عليه وسلم: \\\"إن في الصلاة لشغلاً\\\"، ويجب على المتكلم الإعادة" },
  { q: "ماذا يقول أهل العلم عن \"الضحك في الصلاة\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "أجمع أهل العلم على أن الضحك يفسد الصلاة ويوجب الإعادة، وأما التبسم فلا يبطلها وإ...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصلاة", explanation: "أجمع أهل العلم على أن الضحك يفسد الصلاة ويوجب الإعادة، وأما التبسم فلا يبطلها وإن كان الأولى تركه للمحافظة على الخشوع" },
  { q: "ماذا يقول أهل العلم عن \"الأكل والشرب عمدًا\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "الأكل والشرب في الصلاة عمداً من مبطلات الصلاة، لأن ذلك ينافي هيئة العبادة والاشت...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصلاة", explanation: "الأكل والشرب في الصلاة عمداً من مبطلات الصلاة، لأن ذلك ينافي هيئة العبادة والاشتغال بذكر الله ومناجاته" },
  { q: "ماذا يقول أهل العلم عن \"ترك ركن عمداً\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "من ترك ركناً من أركان الصلاة عمداً، مثل الركوع أو السجود، بطلت صلاته ووجب عليه ا...", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "فقه: الصلاة", explanation: "من ترك ركناً من أركان الصلاة عمداً، مثل الركوع أو السجود، بطلت صلاته ووجب عليه استئنافها من جديد لفوات شرط صحتها" },
  { q: "ماذا يقول أهل العلم عن \"انتقاض الوضوء\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "إذا انتقض وضوء المصلي أثناء الصلاة بحدث أصغر أو أكبر، بطلت صلاته ووجب عليه الانص...", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "فقه: الصلاة", explanation: "إذا انتقض وضوء المصلي أثناء الصلاة بحدث أصغر أو أكبر، بطلت صلاته ووجب عليه الانصراف للتطهر ثم إعادة الصلاة" },
  { q: "ماذا يقول أهل العلم عن \"العمل الكثير المتوالي\" في باب فقه: الصلاة؟", o: ["العمل الكثير من غير جنس الصلاة إذا كان متوالياً يبطل الصلاة، لأنه يخرجها عن هيئت...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه: الصلاة", explanation: "العمل الكثير من غير جنس الصلاة إذا كان متوالياً يبطل الصلاة، لأنه يخرجها عن هيئتها المشروعة وينافي الخشوع المطلوب فيها" },
  { q: "ماذا يقول أهل العلم عن \"صلاة الصبي والصبية\" في باب فقه: الصلاة؟", o: ["تصح صلاة الصبي المميز وتعتبر له نافلة، وكذلك الصبية، ويؤمرون بالصلاة لسبع سنين و...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه: الصلاة", explanation: "تصح صلاة الصبي المميز وتعتبر له نافلة، وكذلك الصبية، ويؤمرون بالصلاة لسبع سنين ويضربون عليها لعشر تأديباً وتعويداً" },
  { q: "ماذا يقول أهل العلم عن \"تحويل النية\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "إذا افتتح المصلي صلاة فريضة ثم حول نيتها إلى نافلة لغرض شرعي جاز ذلك، أما تحويل ...", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "فقه: الصلاة", explanation: "إذا افتتح المصلي صلاة فريضة ثم حول نيتها إلى نافلة لغرض شرعي جاز ذلك، أما تحويل النافلة إلى فريضة فلا يصح" },
  { q: "ماذا يقول أهل العلم عن \"قضاء الفوائت\" في باب فقه: الصلاة؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "من فاتته صلاة مكتوبة وجب عليه قضاؤها فور تذكرها، لقوله صلى الله عليه وسلم: \"من ..."], a: 3, topic: "فقه: الصلاة", explanation: "من فاتته صلاة مكتوبة وجب عليه قضاؤها فور تذكرها، لقوله صلى الله عليه وسلم: \\\"من نسي صلاة أو نام عنها فليصلها إذا ذكرها\\\"" },
  { q: "ماذا يقول أهل العلم عن \"الصيام في اللغة هو\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "الصيام في اللغة هو الإمساك، وفي الشرع هو الإمساك عن المفطرات من طلوع الفجر إلى غ...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصيام", explanation: "الصيام في اللغة هو الإمساك، وفي الشرع هو الإمساك عن المفطرات من طلوع الفجر إلى غروب الشمس بنية" },
  { q: "ماذا يقول أهل العلم عن \"لا يجزئ صيام الفرض\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "لا يجزئ صيام الفرض من شهر رمضان أو نذر أو كفارة إلا أن ينوي الصائم الصيام قبل ال...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصيام", explanation: "لا يجزئ صيام الفرض من شهر رمضان أو نذر أو كفارة إلا أن ينوي الصائم الصيام قبل الفجر من الليل" },
  { q: "ماذا يقول أهل العلم عن \"في صيام التطوع لا\" في باب فقه: الصيام؟", o: ["في صيام التطوع لا بأس إن أصبح المرء ولم يطعم شيئاً أن ينوي الصوم قبل الزوال كما ...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه: الصيام", explanation: "في صيام التطوع لا بأس إن أصبح المرء ولم يطعم شيئاً أن ينوي الصوم قبل الزوال كما فعل النبي صلى الله عليه وسلم" },
  { q: "ماذا يقول أهل العلم عن \"يصام شهر رمضان لرؤية\" في باب فقه: الصيام؟", o: ["يصام شهر رمضان لرؤية الهلال ويفطر لرؤيته، فإن غم الهلال فيكمل ثلاثين يوما من شهر...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه: الصيام", explanation: "يصام شهر رمضان لرؤية الهلال ويفطر لرؤيته، فإن غم الهلال فيكمل ثلاثين يوما من شهر شعبان ثم يصام رمضان" },
  { q: "ماذا يقول أهل العلم عن \"صيام شهر رمضان واجب\" في باب فقه: الصيام؟", o: ["صيام شهر رمضان واجب على كل بالغ من رجل أو امرأة أو عبد", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه: الصيام", explanation: "صيام شهر رمضان واجب على كل بالغ من رجل أو امرأة أو عبد" },
  { q: "ماذا يقول أهل العلم عن \"أجمع أهل العلم على\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "أجمع أهل العلم على أن الله حرم على الصائم في نهار الصوم الأكل والشرب والجماع", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصيام", explanation: "أجمع أهل العلم على أن الله حرم على الصائم في نهار الصوم الأكل والشرب والجماع" },
  { q: "ماذا يقول أهل العلم عن \"من أكل أو شرب\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "من أكل أو شرب في نهار رمضان ناسياً فليتم صومه ولا قضاء عليه عند الشافعي وأحمد، ب...", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "فقه: الصيام", explanation: "من أكل أو شرب في نهار رمضان ناسياً فليتم صومه ولا قضاء عليه عند الشافعي وأحمد، بينما يرى مالك وجوب القضاء" },
  { q: "ماذا يقول أهل العلم عن \"أجمع أهل العلم على\" في باب فقه: الصيام؟", o: ["أجمع أهل العلم على إبطال صوم من استقاء عامداً ووجوب القضاء عليه، أما من ذرعه الق...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه: الصيام", explanation: "أجمع أهل العلم على إبطال صوم من استقاء عامداً ووجوب القضاء عليه، أما من ذرعه القيء فلا شيء عليه" },
  { q: "ماذا يقول أهل العلم عن \"السحور مستحب، وينتهي بطلوع\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "السحور مستحب، وينتهي بطلوع الفجر الصادق المنتشر في الأفق الذي يحرم معه الطعام وا..."], a: 3, topic: "فقه: الصيام", explanation: "السحور مستحب، وينتهي بطلوع الفجر الصادق المنتشر في الأفق الذي يحرم معه الطعام والشراب" },
  { q: "ماذا يقول أهل العلم عن \"من أفطر وهو يرى\" في باب فقه: الصيام؟", o: ["من أفطر وهو يرى أن الشمس قد غابت ثم تبين له أنها لم تغرب فعليه قضاء يوم مكانه عن...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه: الصيام", explanation: "من أفطر وهو يرى أن الشمس قد غابت ثم تبين له أنها لم تغرب فعليه قضاء يوم مكانه عند عامة الفقهاء" },
  { q: "ماذا يقول أهل العلم عن \"المسافر له أن يفطر\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "المسافر له أن يفطر في رمضان ويقضي، وإن صام فيه أجزأه، والفطر رخصة للمسافر", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 2, topic: "فقه: الصيام", explanation: "المسافر له أن يفطر في رمضان ويقضي، وإن صام فيه أجزأه، والفطر رخصة للمسافر" },
  { q: "ماذا يقول أهل العلم عن \"الشيخ الكبير والعجوز العاجزان\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "الشيخ الكبير والعجوز العاجزان عن الصوم لهما أن يفطرا، ويستحب لهما إطعام مسكين عن...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصيام", explanation: "الشيخ الكبير والعجوز العاجزان عن الصوم لهما أن يفطرا، ويستحب لهما إطعام مسكين عن كل يوم مداً من حنطة" },
  { q: "ماذا يقول أهل العلم عن \"قضاء رمضان إن شاء\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "قضاء رمضان إن شاء الصائم فرقه وإن شاء تابعه، وتفريقه جائز لقوله تعالى \"فعدة من ...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصيام", explanation: "قضاء رمضان إن شاء الصائم فرقه وإن شاء تابعه، وتفريقه جائز لقوله تعالى \\\"فعدة من أيام أخر\\\" ولم يشترط التتابع" },
  { q: "ماذا يقول أهل العلم عن \"من فرط في قضاء\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "من فرط في قضاء رمضان حتى دخل عليه رمضان آخر فعليه القضاء وإطعام مسكين لكل يوم مف..."], a: 3, topic: "فقه: الصيام", explanation: "من فرط في قضاء رمضان حتى دخل عليه رمضان آخر فعليه القضاء وإطعام مسكين لكل يوم مفرط فيه" },
  { q: "ماذا يقول أهل العلم عن \"إذا حاضت المرأة في\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "إذا حاضت المرأة في بعض النهار بطل صومها ولزمها القضاء، وإن طهرت قبل الفجر ونوت ا...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصيام", explanation: "إذا حاضت المرأة في بعض النهار بطل صومها ولزمها القضاء، وإن طهرت قبل الفجر ونوت الصوم أجزأها وإن لم تغتسل" },
  { q: "ماذا يقول أهل العلم عن \"من ارتد عن الإسلام\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "من ارتد عن الإسلام في نهار رمضان فقد أفطر وفسد صومه، ومن نوى الإفطار عازماً عليه..."], a: 3, topic: "فقه: الصيام", explanation: "من ارتد عن الإسلام في نهار رمضان فقد أفطر وفسد صومه، ومن نوى الإفطار عازماً عليه فقد أفطر" },
  { q: "ماذا يقول أهل العلم عن \"الصائم لا قضاء عليه\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "الصائم لا قضاء عليه فيما يزدرده مما يجري مع الريق مما بين أسنانه مما لا يقدر على..."], a: 3, topic: "فقه: الصيام", explanation: "الصائم لا قضاء عليه فيما يزدرده مما يجري مع الريق مما بين أسنانه مما لا يقدر على الامتناع منه" },
  { q: "ماذا يقول أهل العلم عن \"صوم يوم الفطر ويوم\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "صوم يوم الفطر ويوم النحر وأيام التشريق غير جائز لنهي رسول الله صلى الله عليه وسل...", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 1, topic: "فقه: الصيام", explanation: "صوم يوم الفطر ويوم النحر وأيام التشريق غير جائز لنهي رسول الله صلى الله عليه وسلم عن ذلك" },
  { q: "ماذا يقول أهل العلم عن \"يؤمر الصبي بالصوم إذا\" في باب فقه: الصيام؟", o: ["يؤمر الصبي بالصوم إذا أطاقه وتمرن عليه ويكون ذلك له تطوعاً، ولا فريضة عليه حتى ي...", "لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف"], a: 0, topic: "فقه: الصيام", explanation: "يؤمر الصبي بالصوم إذا أطاقه وتمرن عليه ويكون ذلك له تطوعاً، ولا فريضة عليه حتى يبلغ" },
  { q: "ماذا يقول أهل العلم عن \"السواك لا بأس به\" في باب فقه: الصيام؟", o: ["لا أصل له في الشريعة الإسلامية", "من البدع المحدثة في الدين", "اختلف فيه السلف ولم يُحسم الخلاف", "السواك لا بأس به للصائم في أول النهار، ولكن يكرهه الشافعي في آخره لئلا يذهب خلوف..."], a: 3, topic: "فقه: الصيام", explanation: "السواك لا بأس به للصائم في أول النهار، ولكن يكرهه الشافعي في آخره لئلا يذهب خلوف فم الصائم" }
  ]
};

/* ====== الحصول على سؤال إسلامي احتياطي ====== */
function getIslamicFallbackQuestion(difficulty, askedSet) {
  const bank = ISLAMIC_QUESTION_BANK[difficulty] || ISLAMIC_QUESTION_BANK.medium;
  const available = bank.filter(q => !askedSet || !askedSet.has(normalizeQuestion(q.q)));
  const pool = available.length > 0 ? available : bank;
  return pool[Math.floor(Math.random() * pool.length)];
}


/* =========================================================
 منهج علم الأحياء (3 مستويات)
   ========================================================= */
/* =========================================================
   منهج علم الأحياء — 3 مستويات دراسية × وحدات × كلمات مفتاحية
   مستخرج من الملف المرجعي للمستويات الثلاثة.
   - يُختار المستوى تلقائياً حسب صعوبة السؤال الحالي (تدرّج).
   - تُختار الوحدة ثم كلمة مفتاحية واحدة عشوائياً وإرسالها
     للذكاء الاصطناعي لتوليد السؤال في سياق الوحدة.
   - يُبنى من هذا المنهج بنك أسئلة بيولوجية احتياطي:
     سؤال واحد لكل كلمة مفتاحية في سياق وحدتها.
   ========================================================= */
const BIOLOGY_CURRICULUM = [
  {
    name: "المستوى الأول",
    units: [
      { title: "الخلايا والكائنات الحية", keywords: ["نظرية الخلية", "العضيات", "النواة", "الميتوكوندريا", "البلاستيدات الخضراء", "بدائيات النوى", "حقيقيات النواة", "الأنسجة", "أجهزة الأعضاء", "المعالجة الحسية"] },
      { title: "نمو الكائنات الحية وتكاثرها", keywords: ["التكاثر الجنسي", "التكاثر اللاجنسي", "الأمشاج", "الإخصاب", "نجاح النسل", "التلقيح", "تشتت البذور", "العوامل البيئية", "ازدهار الطحالب"] },
      { title: "المادة والطاقة في الكائنات الحية", keywords: ["البناء الضوئي", "الكلوروفيل", "الجلوكوز", "أدينوسين ثلاثي الفوسفات (ATP)", "التنفس الخلوي", "الميتوكوندريا", "الأكسجين", "ثاني أكسيد الكربون", "انتقال الطاقة"] },
      { title: "التفاعلات في النظم البيئية", keywords: ["الجماعة", "المجتمع", "النظام البيئي", "العوامل الحيوية", "العوامل اللاحيوية", "القدرة الاستيعابية", "التنافس", "الافتراس", "التكافل"] },
      { title: "المادة والطاقة في النظم البيئية", keywords: ["الشبكات الغذائية", "المستويات الغذائية", "المنتجات", "المستهلكات", "المحللات", "الأهرامات البيئية", "تدفق الطاقة", "البناء الضوئي في النظم البيئية", "آثار الاضطرابات"] },
      { title: "النظم البيئية والتنوع البيولوجي", keywords: ["التنوع البيولوجي", "صحة النظام البيئي", "الاستقرار", "الاستدامة", "الأنواع الأساسية", "خدمات النظام البيئي", "التأثير البشري", "الصون", "المرونة"] },
      { title: "الوراثة والتباين", keywords: ["الكروموسومات", "الجينات", "الأليلات", "البروتينات", "الصفات", "الطفرات", "مربعات بونت", "التباين الوراثي", "الانقسام المنصف"] },
    ]
  },
  {
    name: "المستوى الثاني",
    units: [
      { title: "علم البيئة والنظم الطبيعية", keywords: ["العوامل الحيوية", "العوامل اللاحيوية", "النظم البيئية", "المناطق الأحيائية", "الكُوى البيئية", "نمو الجماعة", "القدرة الاستيعابية", "التنافس", "دورات المفترس والفريسة"] },
      { title: "من الخلايا إلى الكائنات الحية", keywords: ["نظرية الخلية", "بدائيات النوى", "حقيقيات النواة", "العضيات", "الخلايا الجذعية", "التمايز", "الأنسجة", "أجهزة الأعضاء", "الاتزان الداخلي", "حلقات التغذية الراجعة"] },
      { title: "دورة الخلية والتمايز", keywords: ["الطور البيني", "الانقسام المتساوي", "انقسام السيتوبلازم", "تنظيم دورة الخلية", "السرطان", "الإخصاب", "التطور الجنيني", "التخصص الخلوي", "الخلايا الجذعية"] },
      { title: "الطاقة والمادة في النظم الحيوية", keywords: ["الكربوهيدرات", "البروتينات", "الليبيدات", "الأحماض النووية", "البناء الضوئي", "الكلوروفيل", "التنفس الخلوي", "التخمر", "المستويات الغذائية", "دورة الكربون", "دورة النيتروجين"] },
      { title: "التعبير الجيني والتنظيم", keywords: ["بنية الحمض النووي", "التضاعف", "نسخ الحمض النووي الريبي", "معالجة الرنا المرسال", "الترجمة", "الشفرة الوراثية", "تخليق البروتين", "الطفرات", "تنظيم الجينات"] },
      { title: "وراثة الصفات وتباينها", keywords: ["الانقسام المنصف", "العبور الكروموسومي", "الوراثة المندلية", "مربعات بونت", "التهجين الثنائي", "السيادة المشتركة", "السيادة غير التامة", "أشجار النسب", "الصفات متعددة الجينات", "التأثيرات البيئية على النمط الظاهري"] },
      { title: "التنوع البيولوجي والتأثيرات البشرية", keywords: ["التنوع البيولوجي", "خدمات النظام البيئي", "الانقراض", "التعاقب البيئي", "المرونة", "غازات الاحتباس الحراري", "تحمض المحيطات", "الصون", "الاستدامة", "تغير المناخ"] },
    ]
  },
  {
    name: "المستوى الثالث",
    units: [
      { title: "كيمياء الحياة", keywords: ["الروابط الهيدروجينية", "التماسك/الالتصاق", "الجزيئات الكبيرة", "التخليق بنزع الماء", "التحلل المائي", "الأحماض النووية", "المجموعات الوظيفية", "بنية البروتين", "الدهون الثلاثية"] },
      { title: "بنية الخلية ووظيفتها", keywords: ["غشاء البلازما", "نموذج الفسيفساء المائع", "النفاذية الاختيارية", "نظام الغشاء الداخلي", "الميتوكوندريا", "البلاستيدات الخضراء", "نظرية التعايش الداخلي", "التنظيم الأسموزي", "مضخة الصوديوم والبوتاسيوم"] },
      { title: "الطاقة الخلوية", keywords: ["التحفيز الإنزيمي", "التثبيط التنافسي", "التثبيط غير التنافسي", "اقتران الـ ATP", "البناء الضوئي (التفاعلات المعتمدة على الضوء، دورة كالفن)", "التنفس الخلوي (تحلل السكر، دورة كريبس، الفسفرة التأكسدية)", "التخمر", "الإنتروبيا"] },
      { title: "الاتصال الخلوي ودورة الخلية", keywords: ["نقل الإشارة", "المستقبلات المقترنة بالبروتين ج", "الروابط", "تنظيم التغذية الراجعة", "الاتزان الداخلي", "نقاط تفتيش دورة الخلية", "مراحل الانقسام المتساوي", "السرطان", "الإشارة الصماء"] },
      { title: "الوراثة", keywords: ["الانقسام المنصف الأول والثاني", "العبور الكروموسومي", "الوراثة المندلية", "قانون الانفصال", "قانون التوزيع المستقل", "مربعات بونت", "أشجار النسب", "الوراثة غير المندلية", "التشوهات الكروموسومية"] },
      { title: "التعبير الجيني والتنظيم", keywords: ["تضاعف الحمض النووي (الخيط القائد/الخيط المتأخر)", "النسخ", "معالجة الحمض النووي الريبي", "الترجمة", "الأوبيرونات (lac, trp)", "عوامل النسخ", "الطفرات", "الحمض النووي المؤتلف", "تفاعل البوليميراز المتسلسل (PCR)", "الرحلان الكهربائي الهلامي"] },
      { title: "علم البيئة", keywords: ["سلوك الحيوان (الفطري مقابل المكتسب)", "الأهرامات الغذائية", "الشبكات الغذائية", "النمو الأسي مقابل النمو اللوجستي", "دورات المفترس والفريسة", "مؤشرات التنوع البيولوجي", "الأنواع الغازية", "تأثيرات تغير المناخ", "مرونة النظام البيئي"] },
    ]
  }
];

/* ====== خلط مصفوفة (نسخة جديدة) — لخيارات بنك الأحياء ====== */
function shuffleBiologyArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* =========================================================
   بناء بنك الأسئلة البيولوجية الاحتياطي تلقائياً:
   من كل كلمة مفتاحية في سياق وحدتها يُنشأ سؤال واحد،
   مع تدوير قوالب الأسئلة لتنوّع أكبر وتوزيعها على
   مستويات الصعوبة (المستوى الأول = سهل، الثاني = متوسط،
   الثالث = صعب/خبير).
   ========================================================= */
const BIOLOGY_LEVEL_NAMES = ["المستوى الأول", "المستوى الثاني", "المستوى الثالث"];

function buildBiologyFallbackBank() {
  const bank = { easy: [], medium: [], hard: [] };
  const difficultyByLevel = ["easy", "medium", "hard"];
  let templateCounter = 0;

  BIOLOGY_CURRICULUM.forEach((level, li) => {
    const difficulty = difficultyByLevel[li];
    level.units.forEach((unit, ui) => {
      unit.keywords.forEach((keyword, ki) => {
        const template = templateCounter++ % 3;
        let q, o, a;

        if (template === 0) {
          /* القالب 1: إلى أي وحدة ينتمي المفهوم؟ */
          q = `في منهج علم الأحياء (${level.name})، تُدرَّس الكلمة المفتاحية «${keyword}» ضمن وحدة:`;
          const others = level.units.filter((_, idx) => idx !== ui).map(u => u.title);
          const wrongs = shuffleBiologyArray(others).slice(0, 3);
          o = shuffleBiologyArray([unit.title, ...wrongs]);
          a = o.indexOf(unit.title);
        } else if (template === 1) {
          /* القالب 2: أي مستوى دراسي يتناول المفهوم؟ */
          q = `أي مستوى من مستويات منهج علم الأحياء يتناول «${keyword}» ضمن وحدة «${unit.title}»؟`;
          const otherLevels = BIOLOGY_LEVEL_NAMES.filter(n => n !== level.name);
          o = shuffleBiologyArray([level.name, "المستوى الرابع", ...otherLevels]);
          a = o.indexOf(level.name);
        } else {
          /* القالب 3: أي كلمة مفتاحية ترتبط بالوحدة؟ */
          q = `أي الكلمات المفتاحية التالية ترتبط بوحدة «${unit.title}» في ${level.name}؟`;
          const otherKeywords = new Set();
          level.units.forEach((u, idx) => {
            if (idx === ui) return;
            u.keywords.forEach(k => { if (k !== keyword) otherKeywords.add(k); });
          });
          const wrongs = shuffleBiologyArray([...otherKeywords]).slice(0, 3);
          o = shuffleBiologyArray([keyword, ...wrongs]);
          a = o.indexOf(keyword);
        }

        bank[difficulty].push({
          q,
          o,
          a,
          topic: "أحياء: " + unit.title,
          explanation: `«${keyword}» من الكلمات المفتاحية لوحدة «${unit.title}» في ${level.name} من منهج علم الأحياء.`,
          difficulty,
        });
      });
    });
  });

  return bank;
}

/* البنك الاحتياطي البيولوجي — يُستخدم عند فشل الذكاء الاصطناعي */
const BIOLOGY_QUESTION_BANK = buildBiologyFallbackBank();

/* ====== الحصول على سؤال بيولوجي احتياطي ====== */
function getBiologyFallbackQuestion(difficulty, askedSet) {
  // خبير → بنك الصعب، وصعوبة غير معروفة → المتوسط
  const key = difficulty === "expert" ? "hard"
    : BIOLOGY_QUESTION_BANK[difficulty] ? difficulty : "medium";
  const bank = BIOLOGY_QUESTION_BANK[key];
  const available = bank.filter(q => !askedSet || !askedSet.has(normalizeQuestion(q.q)));
  const pool = available.length > 0 ? available : bank;
  return pool[Math.floor(Math.random() * pool.length)];
}

/* ====== اختيار المستوى حسب صعوبة السؤال (تدرّج المستويات) ======
   سهل → المستوى الأول، متوسط → المستوى الثاني، صعب/خبير → المستوى الثالث */
function biologyLevelForDifficulty(difficulty) {
  const idx = difficulty === "easy" ? 0 : difficulty === "medium" ? 1 : 2;
  return BIOLOGY_CURRICULUM[idx];
}

/* ====== اختيار وحدة + كلمة مفتاحية واحدة عشوائياً من المستوى ====== */
function pickRandomBiologyKeyword(level, usedSet) {
  // حاول العثور على تركيبة غير مستخدمة (حتى 40 محاولة)
  for (let attempt = 0; attempt < 40; attempt++) {
    const unit = level.units[Math.floor(Math.random() * level.units.length)];
    const keyword = unit.keywords[Math.floor(Math.random() * unit.keywords.length)];
    const key = level.name + "::" + unit.title + "::" + keyword;
    if (!usedSet || !usedSet.has(key)) {
      return { unit, keyword };
    }
  }
  // fallback: عشوائي مطلق
  const unit = level.units[Math.floor(Math.random() * level.units.length)];
  const keyword = unit.keywords[Math.floor(Math.random() * unit.keywords.length)];
  return { unit, keyword };
}

/* ====== توليد سؤال بيولوجي بالذكاء الاصطناعي ====== */
async function fetchBiologyQuestionFromAI(index, total) {
  if (!state.apiKey) return null;

  const difficulty = getDifficultyFromIndex(index, total);
  const diffLabel = { easy: "سهل", medium: "متوسط", hard: "صعب", expert: "خبير" }[difficulty];

  // تدرّج المستويات: اختر مستوى المنهج حسب صعوبة السؤال
  const level = biologyLevelForDifficulty(difficulty);

  // اختيار وحدة عشوائية ثم كلمة مفتاحية واحدة عشوائية منها
  const { unit, keyword } = pickRandomBiologyKeyword(level, state.usedTopicKeywords);

  // اختيار موضع عشوائي للإجابة الصحيحة
  const forcedAnswerIndex = Math.floor(Math.random() * 4);
  const forcedLetter = ["A", "B", "C", "D"][forcedAnswerIndex];

  const systemPrompt = "أنت مولّد أسئلة محترف في علم الأحياء باللغة العربية. تولّد أسئلة علمية دقيقة وموثوقة تغطي مفاهيم المنهج الدراسي. أعطِ الإجابة دائماً بصيغة JSON صارمة فقط بدون أي نص إضافي.";
  const userPrompt = `ولّد سؤالاً واحداً في علم الأحياء يدور تحديداً حول الكلمة المفتاحية: «${keyword}»
ضمن الوحدة الدراسية: «${unit.title}»
من المستوى الدراسي: «${level.name}» من منهج علم الأحياء
بمستوى صعوبة: ${diffLabel} (لعبة من سيربح المليون).

الشروط:
- السؤال يجب أن يرتبط مباشرة بالكلمة المفتاحية وفي سياق الوحدة والمستوى المذكورين.
- سؤال أصلي ودقيق من الناحية العلمية البيولوجية.
- 4 خيارات متقاربة ومنطقية، إجابة صحيحة واحدة فقط.
- هام جداً: ضع الإجابة الصحيحة في الخيار ${forcedLetter} تحديداً (أي answerIndex = ${forcedAnswerIndex}).
- رتّب بقية الخيارات عشوائياً في الأماكن الأخرى.
- أضف حقل "explanation" قصير (جملة واحدة) يشرح لماذا الإجابة صحيحة.
- أضف حقل "topic" يعكس اسم الوحدة.
- أضف حقل "keyword" يعكس الكلمة المفتاحية.
- قيمة "answerIndex" في الـ JSON يجب أن تكون ${forcedAnswerIndex} بالضبط.

أعطِ النتيجة بصيغة JSON فقط بالشكل التالي:
{"question":"نص السؤال","options":["الخيار1","الخيار2","الخيار3","الخيار4"],"answerIndex":${forcedAnswerIndex},"explanation":"شرح قصير","topic":"اسم الوحدة","keyword":"الكلمة المفتاحية"}`;

  try {
    const { data } = await callOpenRouterWithFallback({
      body: {
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 600,
      },
      referer: "https://who-wants-to-be-a-millionaire.local",
      title: "Arabic Biology Millionaire Game",
    });

    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) return null;

    const obj = robustJSONParse(text);
    if (!obj) {
      console.warn("[AI-Biology] فشل تحليل JSON:", text.slice(0, 100));
      return null;
    }

    if (
      typeof obj.question === "string" && obj.question.trim().length > 0 &&
      Array.isArray(obj.options) && obj.options.length === 4 &&
      obj.options.every(o => typeof o === "string" && o.trim().length > 0) &&
      Number.isInteger(obj.answerIndex) && obj.answerIndex >= 0 && obj.answerIndex < 4
    ) {
      let options = obj.options.map(x => x.trim());
      let answerIndex = obj.answerIndex;
      if (answerIndex !== forcedAnswerIndex) {
        const correctOpt = options[answerIndex];
        options[answerIndex] = options[forcedAnswerIndex];
        options[forcedAnswerIndex] = correctOpt;
        answerIndex = forcedAnswerIndex;
      }

      state.usedTopicKeywords.add(level.name + "::" + unit.title + "::" + keyword);
      return {
        q: obj.question.trim(),
        o: options,
        a: answerIndex,
        explanation: typeof obj.explanation === "string" ? obj.explanation.trim() : undefined,
        topic: typeof obj.topic === "string" ? obj.topic.trim() : "أحياء: " + unit.title,
        keyword,
        difficulty,
      };
    }
    return null;
  } catch (err) {
    console.warn("فشل توليد السؤال البيولوجي بالذكاء الاصطناعي:", err.message);
    return null;
  }
}


/* =========================================================
   قاموس المواضيع والكلمات المفتاحية — 50 كلمة لكل موضوع
   (31 موضوعاً × 50 كلمة = 1550 كلمة مفتاحية) لتنوّع أقصى
   لأسئلة الذكاء الاصطناعي وتفادي التكرار. يتم اختيار
   (موضوع + كلمة مفتاحية واحدة) عشوائياً لكل سؤال جديد،
   مع تتبّع ما سبق استخدامه.
   ========================================================= */
const TOPIC_KEYWORDS = {
  "جغرافيا": [
    "جبال الهيمالايا", "صحراء الربع الخالي",
    "نهر الأمازون", "نهر النيل",
    "البحر الميت", "جبال الأنديز",
    "صحراء الكلهاري", "مضيق جبل طارق",
    "بحر قزوين", "جبال الألب",
    "دلتا النيل", "خط الاستواء",
    "غابات الأمازون", "الصحراء الكبرى",
    "جبل إفرست", "بحيرة فيكتوريا",
    "جبال روكي", "نهر المسيسيبي",
    "المحيط المتجمد الشمالي", "مضيق هرمز",
    "بحيرة بايكال", "هضبة التبت",
    "بركان فيزوف", "جزر المالديف",
    "هضبة الحبشة", "وادي الأردن",
    "شلالات إجواسو", "كاب هورن",
    "خليج العقبة", "البحيرات الكبرى",
    "نهر الفولغا", "صحراء موهافي",
    "جبال الأورال", "هضبة الأناضول",
    "بحيرة تانغانيكا", "مضيق ماجلان",
    "جبل كليمنجارو", "صحراء ناميب",
    "وادي الموت", "البحر الأسود",
    "بحر اليابان", "خليج البنغال",
    "نهر الكونغو", "نهر الدانوب",
    "نهر الراين", "بحيرة جنيف",
    "هضبة إيران", "خليج غينيا",
    "سهول سيبيريا", "هضبة ديكن"
  ],
  "تاريخ": [
    "سقوط الأندلس", "فتح الأندلس",
    "الثورة الفرنسية", "الحرب العالمية الأولى",
    "الحرب العالمية الثانية", "الدولة الأموية",
    "الدولة العباسية", "الدولة العثمانية",
    "الثورة الصناعية", "الحرب الباردة",
    "معركة حطين", "فتح القسطنطينية",
    "الثورة البلشفية", "استقلال الجزائر",
    "نهاية الاتحاد السوفيتي", "معركة عين جالوت",
    "سقوط روما", "الثورة الأمريكية",
    "عصر النهضة", "الحملة الصليبية الأولى",
    "فتح مصر", "ثورة 23 يوليو",
    "معركة بلاط الشهداء", "صلح الحديبية",
    "غزوة بدر", "غزوة أحد",
    "غزوة الخندق", "صلح وستفاليا",
    "معركة اليرموك", "ثورة العرابيين",
    "حرب البوير", "الثورة المكسيكية",
    "حرب فيتنام", "حرب كوريا",
    "أزمة الكوبا", "سقوط جدار برلين",
    "ثورة الفاتح من سبتمبر", "الحرب الأهلية الأمريكية",
    "حرب القرم", "الثورة الروسية",
    "تأسيس الأمم المتحدة", "مؤتمر برلين",
    "اتفاقية سايكس بيكو", "وعد بلفور",
    "ثورة الزنج", "ثورة القرامطة",
    "الدولة الفاطمية", "الدولة المملوكية",
    "حرب السنوات السبع", "معركة ستالينغراد"
  ],
  "علوم": [
    "التمثيل الضوئي", "دورة الماء",
    "الجهاز العصبي", "الحمض النووي DNA",
    "الخلايا الجذعية",
    "البكتيريا", "الفيروسات",
    "جهاز المناعة", "نظام الدورة الدموية",
    "الجهاز الهضمي", "الميتوكوندريا",
    "التكاثر اللاجنسي", "الكروموسومات",
    "الجينات الوراثية", "هرمونات الإنسان",
    "الانقسام الخلوي", "الغدد الصماء",
    "الأيض الخلوي", "الجهاز التنفسي",
    "الخلايا العصبية", "الريبوسومات",
    "جريان الطاقة", "التوازن الأسموزي",
    "غشاء الخلية", "الإنزيمات",
    "تخثر الدم", "الأكسجين في الدم",
    "الجلد البشري", "حاسة الشم",
    "حاسة التذوق", "العين البشرية",
    "الأذن البشرية", "نظام الغدد الصماء",
    "الكبد البشري", "الكلى البشرية",
    "الدم البشري", "خلايا الدم الحمراء",
    "خلايا الدم البيضاء", "الصفائح الدموية",
    "الجهاز اللمفاوي", "الخلايا التائية",
    "الأجسام المضادة", "نظام التوازن الداخلي",
    "الهرمونات النباتية", "النباتات الوعائية",
    "البذور", "التلقيح",
    "السلوك الحيواني", "الانقراض"
  ],
  "رياضيات": [
    "نظرية فيثاغورس", "نظرية فيرما الأخيرة",
    "الأعداد الأولية", "ثابت الدائرة باي",
    "التفاضل والتكامل", "نظرية المجموعات",
    "الهندسة الإقليدية", "المتتاليات الحسابية",
    "الاحتمالات", "الإحصاء",
    "الجبر الخطي", "نظرية الأعداد",
    "الأعداد المركبة", "حساب المثلثات",
    "اللوغاريتمات", "معادلات الدرجة الثانية",
    "المصفوفات", "الهندسة التحليلية",
    "التحويلات الهندسية", "الكسور العشرية",
    "الأعداد النسبية", "التوافيق والتباديل",
    "النسبة الذهبية", "متتالية فيبوناتشي",
    "نظرية الأشكال", "الهندسة الكسيرية",
    "حساب التفاضل", "نظرية الاحتمالات",
    "التفاضل الجزئي", "التفاضل الشعاعي",
    "نظرية غالوا", "مبرهنة بيازو",
    "نظرية الأعداد التحليلية", "نظرية التوزيع",
    "الهندسة اللاإقليدية", "التبولوجيا",
    "نظرية المخططات", "نظرية الألعاب",
    "نظرية الفوضى", "النمذجة الرياضية",
    "التحسين الرياضي", "الجبر التجريدي",
    "الهندسة الجبرية", "النظرية المثلثية",
    "المعادلات التفاضلية", "التحليل الحقيقي",
    "التحليل المركب", "نظرية القياس",
    "المنطق الرياضي", "نظرية الحقول"
  ],
  "أدب": [
    "الشعر الجاهلي", "المعلقات السبع",
    "ألف ليلة وليلة", "الأدب الأندلسي",
    "الشعر الحر", "الرواية العربية الحديثة",
    "الأدب المقارن", "المسرحية العربية",
    "الرمزية في الأدب", "السرد القصصي",
    "الرواية البوليسية", "أدب السجون",
    "الأدب الفلسفي", "أدب الرحلات",
    "المدرسة الرومانسية", "المدرسة الكلاسيكية",
    "أدب الأطفال", "الأدب الشعبي",
    "المقامة الأدبية", "النقد الأدبي",
    "أدب المهجر", "الرسائل الأدبية",
    "الخطابة العربية", "الشعراء الصعاليك",
    "النثر الفني", "الموشحات الأندلسية",
    "أدب المقاومة", "مدرسة الإحياء والبعث",
    "الرمزية الفرنسية", "أدب الحرب",
    "القصة القصيرة",
    "الأدب الصوفي", "الشعر الفصيح",
    "الشعر الشعبي", "الأدب الملحمي",
    "المسرح الملحمي", "مسرح الهاجس",
    "مسرح العبث", "الأدب الواقعي",
    "الأدب الطليعي", "السريالية في الأدب",
    "الأدب البريدي",
    "أدب المنفى", "الشعر الحديث",
    "أدب الاعتذاريات", "أدب الحكمة",
    "الخطابة الدينية", "المواعظ الأدبية"
  ],
  "فنون": [
    "المدرسة التكعيبية", "المدرسة السريالية",
    "المدرسة الانطباعية", "الفن التجريدي",
    "فن البورتريه", "النحت اليوناني",
    "المعمار الإسلامي", "فن الخط العربي",
    "فن الزخرفة", "الرسم الزيتي",
    "الفسيفساء البيزنطية", "فن الباروك",
    "فن عصر النهضة", "المدرسة الرومانسية",
    "التصوير الجداري", "فن الكولاج",
    "النحت الفرعوني", "العمارة القوطية",
    "التصميم الجرافيكي", "العمارة الحديثة",
    "الرسم بالألوان المائية", "فن الأرابيسك",
    "المنمنمات الفارسية", "الواقعية الاشتراكية",
    "فن البوب آرت", "الرمزية في الرسم",
    "المدرسة الواقعية", "فن الفيوم",
    "العمارة الإسلامية في الأندلس", "فن النحت الباروكي",
    "الفن الزخرفي", "فن الفسيفساء",
    "فن الرسم على الزجاج", "فن التذهيب",
    "فن التجصيص", "فن النقش",
    "العمارة الأموية", "العمارة العباسية",
    "العمارة المملوكية", "العمارة العثمانية",
    "الفن الحديث", "الفن المعاصر",
    "الفن الرقمي", "التصوير الفوتوغرافي",
    "فن النحت الحديث", "الفن التركيبي",
    "فن الأداء", "فن الفيديو",
    "فن اللاند آرت", "الفن الحركي"
  ],
  "رياضة": [
    "كأس العالم", "الألعاب الأولمبية",
    "بطولة ويمبلدون", "دوري أبطال أوروبا",
    "كرة السلة الأمريكية", "سباق الفورمولا 1",
    "البطولات الأربع في التنس", "رياضة الجولف",
    "الملاكمة العالمية", "سباقات الماراثون",
    "رياضة التايكوندو", "الكاراتيه",
    "الجودو", "رفع الأثقال",
    "السباحة الأولمبية", "الهوكي على الجليد",
    "البيسبول الأمريكي", "كرة القدم الأمريكية",
    "الرجبي", "الكريكيت",
    "الفروسية", "الرماية",
    "التزحلق على الجليد", "الكيك بوكسينج",
    "رياضة التجديف", "الغطس",
    "المصارعة الرومانية", "الجمباز الفني",
    "سباقات الدراجات", "بطولة فرنسا للتنس",
    "سباقات الخيول", "بطولة أمريكا المفتوحة",
    "البطولات الإفريقية", "كأس الأمم الأفريقية",
    "دوري الإنجليزي الممتاز", "الدوري الإسباني",
    "كرة اليد", "الكرة الطائرة",
    "تنس الطاولة", "البلياردو",
    "الشطرنج", "ألعاب القوى",
    "الوثب الطويل", "القفز العالي",
    "رمي الرمح", "دفع الجلة",
    "الوثب الثلاثي", "العاب القوى للمعاقين",
    "السباحة المتزامنة", "رياضة الترياثلون"
  ],
  "دين": [
    "الأديان السماوية", "الأديان الوثنية",
    "الفرق الإسلامية", "الحج في الإسلام",
    "الصيام في الأديان", "الزكاة",
    "الصلاة", "الوضوء",
    "الطواف بالكعبة", "غار حراء",
    "الإسراء والمعراج", "الهجرة النبوية",
    "غزوة بدر الكبرى", "غزوة أحد",
    "غزوة الخندق", "صلح الحديبية",
    "الفقه الإسلامي", "الحديث الشريف",
    "التفسير", "العقيدة الإسلامية",
    "الرسل والأنبياء", "الديانة المسيحية",
    "الديانة اليهودية", "الهندوسية",
    "البوذية", "الصحابة الكرام",
    "الخلفاء الراشدون", "أركان الإسلام",
    "فقه العبادات", "الديانة الزرادشتية",
    "أركان الإيمان", "القرآن الكريم",
    "السنة النبوية", "الفرق الكلامية",
    "المذاهب الفقهية",
    "الأدعية والأذكار",
    "الآخرة في الإسلام", "عالم الجن",
    "الملائكة في الإسلام", "اليوم الآخر",
    "القضاء والقدر", "الأخلاق الإسلامية",
    "التوحيد", "الشرك في الإسلام",
    "البعث والنشور", "الجنة والنار",
    "الأناجيل الأربعة", "التلمود"
  ],
  "تكنولوجيا": [
    "الذكاء الاصطناعي", "البلوك تشين",
    "الحوسبة السحابية", "إنترنت الأشياء",
    "الواقع الافتراضي", "البيانات الضخمة",
    "الأمن السيبراني", "خوارزميات التعلم الآلي",
    "الروبوتات", "الطباعة ثلاثية الأبعاد",
    "الشبكات العصبية", "تقنية الجيل الخامس",
    "الحاسوب الكمومي", "العملات الرقمية",
    "التعرف على الصوت", "السيارات ذاتية القيادة",
    "الطائرات المسيّرة", "التشفير",
    "الذكاء الاصطناعي التوليدي", "أنظمة التشغيل",
    "البرمجة الكائنية", "تطوير الويب",
    "قواعد البيانات", "الواقع المعزز",
    "تقنية النانو", "البصمة الإلكترونية",
    "التحقق البيومتري", "الخوادم السحابية",
    "محركات البحث", "أنظمة التشفير المتقدمة",
    "الشبكات اللاسلكية", "تقنية البلوتوث",
    "الترميز الرقمي", "خوارزميات الفرز",
    "هياكل البيانات", "لغات البرمجة",
    "تطبيقات الهاتف", "تقنية الباركود",
    "نظم المعلومات الجغرافية", "أجهزة الاستشعار",
    "تقنية النسخ واللصق", "البريد الإلكتروني",
    "الشبكة العنكبوتية", "خوادم الويب",
    "واجهات برمجة التطبيقات", "تقنية الحاويات",
    "النظم الموزعة", "البرمجة الوظيفية",
    "الذكاء الاصطناعي المحادثي", "تقنيات الواقع المدمج"
  ],
  "فضاء": [
    "الثقوب السوداء", "المجموعة الشمسية",
    "المجرات الحلزونية", "النجوم النيوترونية",
    "السدم الفضائية", "النيازك والشهب",
    "المذنبات", "حلقات زحل",
    "أقمار المشتري", "القمر الصناعي",
    "محطة الفضاء الدولية", "تلسكوب هابل",
    "الكوكب الأحمر", "كوكب الزهرة",
    "عطارد", "أورانوس",
    "نبتون", "بلوتو",
    "حزام كايبر", "سحابة أورت",
    "النجوم الزائفة", "انفجار السوبرنوفا",
    "الإشعاع الكوني الخلفي", "الثقب الدودي",
    "جاذبية النجوم", "الموجات الثقالية",
    "البحث عن حياة خارج الأرض", "الكواكب الخارجية",
    "المذنبات الدورية", "تلسكوب جيمس ويب",
    "نجم الشمال", "نجم سهيل",
    "درب التبانة", "المجموعات النجمية",
    "النجوم العملاقة", "الأقزام البيضاء",
    "الأقزام الحمراء", "النجوم الثنائية",
    "النجوم المتغيرة", "الشمس الباعثة",
    "الدفق الشمسي", "الرياح الشمسية",
    "الشفق القطبي", "الغلاف الجوي للكواكب",
    "أقمار الكواكب", "اكتشاف الكواكب",
    "المسابر الفضائية", "الاستكشاف الفضائي",
    "محطة مير الفضائية", "برنامج أبولو"
  ],
  "طب": [
    "جهاز الدورة الدموية", "الجهاز العصبي",
    "الجهاز المناعي", "الجهاز الهضمي",
    "الجهاز التنفسي", "الجهاز العضلي",
    "الجهاز العظمي", "الأمراض المعدية",
    "مرض السكري", "الضغط الدموي",
    "السرطان", "الزهايمر",
    "أمراض القلب", "التهاب الكبد",
    "الإنفلونزا", "الملاريا",
    "السل", "الكوليرا",
    "الأمراض الجينية", "الأدوية المسكنة",
    "المضادات الحيوية", "التخدير",
    "زراعة الأعضاء", "الطب الوقائي",
    "علم الأدوية", "تشخيص الأمراض",
    "الطب النفسي", "جراحة المخ والأعصاب",
    "طب الأطفال", "طب النساء والولادة",
    "الأشعة الطبية", "الرنين المغناطيسي",
    "التصوير المقطعي", "المناظير الطبية",
    "طب الأسنان", "طب العيون",
    "جراحة العظام", "الأمراض الجلدية",
    "طب الطوارئ", "الإسعافات الأولية",
    "التغذية العلاجية", "العلاج الطبيعي",
    "الطب الرياضي", "الطب النووي",
    "العلاج الكيميائي", "العلاج الإشعاعي",
    "المناعة الذاتية", "الحساسية الموسمية",
    "الربو", "فقر الدم"
  ],
  "حيوانات": [
    "الحيتان الزرقاء", "الفيلة الأفريقية",
    "الأسود الآسيوية", "النمور",
    "الفهود", "الزرافات",
    "الكنغر", "الباندا العملاقة",
    "الدببة القطبية", "الثعالب",
    "الذئاب الرمادية", "القرود العليا",
    "الزواحف", "التماسيح",
    "الأفاعي السامة", "السلاحف البحرية",
    "الطيور الجارحة", "النسور الذهبية",
    "البطريق الإمبراطوري", "النحل",
    "النمل الأبيض", "الفراشات الملونة",
    "الأخطبوط", "قنديل البحر",
    "أسماك القرش", "الدلافين",
    "الخيول البرية", "الجمال",
    "الظباء", "الجاموس الأفريقي",
    "النعام", "البطريق الأفريقي",
    "الببغاوات", "الطيور المغردة",
    "البوم الليلي", "البجع",
    "الطيور الطنانة", "الطاووس",
    "الإوز الكندي", "النعام الإفريقي",
    "الفهد الصياد", "الراكون",
    "ابن عرس", "الغرير",
    "الدببة البنية", "الدببة السوداء",
    "القرود العنكبوتية", "قردة المكاك",
    "أسماك المهرج", "الأخطبوط العملاق"
  ],
  "نباتات": [
    "الأشجار الصحراوية", "النباتات الطبية",
    "الأزهار البرية", "الصبار",
    "نباتات المستنقعات", "الأشجار المتساقطة",
    "أشجار النخيل", "أشجار الأرز",
    "البلوط العملاق", "السرخس القديم",
    "الطحالب الخضراء", "الفطريات",
    "النباتات آكلة اللحوم", "الورد الجوري",
    "الياسمين", "الخزامى",
    "عباد الشمس", "الصنوبر الحلبي",
    "الزنبق", "نباتات الزينة",
    "النباتات الدهنية", "أشجار البونساي",
    "نباتات الأمازون المطيرة", "الأشجار المثمرة",
    "نباتات الزينة الداخلية", "الأعشاب العطرية",
    "نباتات التايغا", "نباتات التندرا",
    "الزهور الاستوائية", "نباتات الجبال",
    "نباتات السافانا", "نباتات الكهوف",
    "الأشجار الصنوبرية", "الأشجار البلوطية",
    "الزهور الزرقاء", "الزنابق المائية",
    "نباتات الخزامى الفرنسية", "أزهار الكرز",
    "أزهار اللوتس", "نباتات الخزامى",
    "النخيل الملكي", "الصبار العملاق",
    "النباتات الزاحفة", "النباتات المتسلقة",
    "الحشائش الطويلة", "السراخس البحرية",
    "أشجار السنط", "نباتات الزينة الخشبية",
    "الزهور العطرية", "النباتات البحرية"
  ],
  "طعام": [
    "المطبخ العربي", "المطبخ الإيطالي",
    "المطبخ الهندي", "المطبخ الصيني",
    "المطبخ الياباني", "المطبخ الفرنسي",
    "المطبخ المكسيكي", "المطبخ التركي",
    "المطبخ المغربي", "الحلويات الشرقية",
    "المعجنات التقليدية", "الأجبان العالمية",
    "التوابل والبهارات", "زيت الزيتون",
    "الشوكولاتة البلجيكية", "القهوة العربية",
    "الشاي الأخضر", "المأكولات البحرية",
    "الفواكه الاستوائية", "الخضروات الورقية",
    "الحبوب الكاملة", "المكسرات",
    "العسل الطبيعي", "الفطر الصالح للأكل",
    "المطبخ اللبناني", "المطبخ السوري",
    "المطبخ المصري", "المطبخ العراقي",
    "المطبخ اليوناني", "المطبخ التايلندي",
    "المطبخ الكوري", "المطبخ الفيتنامي",
    "المطبخ الإسباني", "المطبخ البرازيلي",
    "المطبخ الإثيوبي", "المطبخ الأرجنتيني",
    "المطبخ الباكستاني", "المطبخ الأفغاني",
    "المطبخ الفارسي", "المطبخ الإسكندنافي",
    "الحلويات الفرنسية", "المعجنات التركية",
    "المعجنات الفرنسية", "الخبز التقليدي",
    "المخللات", "الصلصات",
    "المشروبات الساخنة", "العصائر الطازجة",
    "الأيس كريم الإيطالي", "الحلويات اليابانية"
  ],
  "لغات": [
    "اللغة العربية", "اللغة الإنجليزية",
    "اللغة الفرنسية", "اللغة الإسبانية",
    "اللغة الصينية", "اللغة اليابانية",
    "اللغة الألمانية", "اللغة الروسية",
    "اللغة الإيطالية", "اللغة البرتغالية",
    "اللغة التركية", "اللغة الفارسية",
    "اللغة العبرية", "اللغة اليونانية",
    "اللغة اللاتينية", "اللغة السنسكريتية",
    "اللغة الهولندية", "اللغة السويدية",
    "اللغة الكورية", "اللغة الهندية",
    "اللغة الأمازيغية", "اللغة السواحلية",
    "اللغة الأردية", "اللغة الباشتو",
    "اللغة البولندية", "اللغة التشيكية",
    "اللغة المجرية", "اللغة الفنلندية",
    "اللغة الإندونيسية", "اللغة المالايوية",
    "اللغة التاغالوغية", "اللغة الفيتنامية",
    "اللغة التايلاندية", "اللغة الكردية",
    "اللغة الأرمنية", "اللغة الجورجية",
    "اللغة الرومانية", "اللغة البلغارية",
    "اللغة الصربية", "اللغة الكرواتية",
    "اللغة السلوفاكية", "اللغة السلوفينية",
    "اللغة الدنماركية", "اللغة النرويجية",
    "اللغة الأيسلندية", "اللغة الأيرلندية",
    "اللغة الويلزية", "اللغة الألبانية",
    "اللغة الإسبرانتو", "اللغة الإشارية"
  ],
  "اقتصاد": [
    "التضخم المالي", "الركود الاقتصادي",
    "البنوك المركزية", "الأسواق المالية",
    "سوق الفوركس", "أسواق الأسهم",
    "الناتج المحلي الإجمالي", "البطالة",
    "السياسة النقدية", "السياسة المالية",
    "التجارة الدولية", "العولمة",
    "الضرائب", "الاحتكار",
    "الخصخصة", "التنمية المستدامة",
    "الاقتصاد الرقمي", "الاقتصاد الأخضر",
    "العملات الرقمية", "التجارة الإلكترونية",
    "الفائدة البنكية", "صندوق النقد الدولي",
    "البنك الدولي", "منظمة أوبك",
    "الناتج القومي", "ميزان المدفوعات",
    "الاستثمار الأجنبي", "الأسواق الناشئة",
    "الدين السيادي", "الفقر والتفاوت",
    "النمو الاقتصادي", "التنمية الاقتصادية",
    "الاقتصاد الكلي", "الاقتصاد الجزئي",
    "اقتصاد السوق", "الاقتصاد الموجه",
    "الاقتصاد المختلط", "العرض والطلب",
    "الميزانية العامة", "العجز في الموازنة",
    "الفوائد البسيطة", "الفوائد المركبة",
    "التمويل الإسلامي", "الصكوك الإسلامية",
    "البورصة", "الأسهم الممتازة",
    "السندات الحكومية", "صناديق الاستثمار",
    "المقاصة البنكية", "الائتمان المصرفي"
  ],
  "سياسة": [
    "الديمقراطية", "الملكية الدستورية",
    "الجمهورية الرئاسية", "النظام البرلماني",
    "الفيدرالية", "الشيوعية",
    "الاشتراكية", "الرأسمالية",
    "الأحزاب السياسية", "الانتخابات",
    "الدستور", "الفصل بين السلطات",
    "حقوق الإنسان", "الأمم المتحدة",
    "مجلس الأمن", "الاتحاد الأوروبي",
    "جامعة الدول العربية", "منظمة المؤتمر الإسلامي",
    "حلف الناتو", "حركة عدم الانحياز",
    "الدبلوماسية", "المعاهدات الدولية",
    "الثورات السياسية", "الغرفة البرلمانية",
    "نظام الحكم", "السلطة التشريعية",
    "السلطة القضائية", "القانون الدولي",
    "السياسة الخارجية", "السياسة الداخلية",
    "الليبرالية", "المحافظة",
    "التقدمية", "الليبرتارية",
    "الشعبوية", "القومية",
    "الوطنية", "العلمانية",
    "الديمقراطية الاشتراكية", "الديمقراطية المسيحية",
    "الحكومة الإلكترونية", "اللامركزية",
    "المركزية الإدارية", "الحكم الرشيد",
    "الشفافية السياسية", "مكافحة الفساد",
    "حرية الصحافة",
    "العدالة الانتقالية"
  ],
  "كيمياء": [
    "الجدول الدوري", "الروابط الكيميائية",
    "الأحماض والقواعد", "التفاعلات الكيميائية",
    "الأكسدة والاختزال", "الكيمياء العضوية",
    "الكيمياء غير العضوية", "البوليمرات",
    "الكيمياء الحيوية", "الكيمياء الفيزيائية",
    "التحليل الكيميائي", "الغازات النبيلة",
    "السوائل", "المواد الصلبة",
    "المحاليل", "الكهروكيمياء",
    "الكيمياء النووية", "التفاعلات النووية",
    "النظائر المشعة", "العناصر الانتقالية",
    "الهيدروكربونات", "الكحولات",
    "الأحماض الأمينية", "البروتينات",
    "التفاعلات الحرارية", "التحفيز الكيميائي",
    "التركيب الجزيئي", "الكيمياء الضوئية",
    "الكيمياء البيئية", "الكيمياء الصناعية",
    "الفلزات", "اللافلزات",
    "أشباه الموصلات", "السبائك",
    "الزجاج", "السيراميك",
    "البلاستيك", "الألياف الصناعية",
    "الدهون والزيوت", "الكربوهيدرات",
    "الإنزيمات الكيميائية", "الهرمونات الكيميائية",
    "الفيتامينات", "الأملاح المعدنية",
    "الماء العسر", "الماء النقي",
    "الرقم الهيدروجيني", "المؤشرات الكيميائية",
    "الكيمياء الزراعية", "الكيمياء الدوائية"
  ],
  "فيزياء": [
    "قوانين نيوتن", "النسبية لأينشتاين",
    "ميكانيكا الكم", "الديناميكا الحرارية",
    "الكهرباء والمغناطيسية", "الموجات الصوتية",
    "الضوء والألوان", "الصوت",
    "الجاذبية الأرضية", "أشكال الطاقة",
    "الشغل والقدرة", "الفيزياء النووية",
    "فيزياء الجسيمات", "الفيزياء الفلكية",
    "فيزياء الحالة الصلبة", "الليزر",
    "الموصلات الفائقة", "البلازما",
    "الأشعة السينية", "الإشعاع الكهرومغناطيسي",
    "النظريات الموحدة", "القوة النووية الضعيفة",
    "القوة النووية القوية", "التأثير الكهروضوئي",
    "النسبية العامة", "نظرية الأوتار",
    "الموجات الثقالية", "الجسيمات دون الذرية",
    "الإلكترونات والفوتونات", "مبدأ عدم اليقين",
    "الحركة التوافقية", "البندول البسيط",
    "القصور الذاتي", "الزخم والاندفاع",
    "قانون هوك", "الضغط الموائع",
    "قانون أرخميدس", "قانون باسكال",
    "اللزوجة", "التوتر السطحي",
    "الانتقال الحراري",
    "الإشعاع الحراري", "الحث الكهرومغناطيسي",
    "الدارات الكهربائية", "المقاومة الكهربائية",
    "المكثفات", "الملفات الكهربائية",
    "التيار المتناوب", "التيار المستمر"
  ],
  "فلك": [
    "خسوف القمر", "كسوف الشمس",
    "المد والجزر", "فصول السنة",
    "البروج الاثنا عشر", "النجوم القطبية",
    "درب التبانة", "السنة الضوئية",
    "الأبراج الفلكية", "الخسوف الحلقي",
    "الكواكب السيارة", "الأقمار الطبيعية",
    "حركة الكواكب", "مدارات المذنبات",
    "دورة النجوم", "الفجر القطبي",
    "النيازك الحديدية", "الكون المرئي",
    "الانزياح الأحمر", "التوسع الكوني",
    "نشأة الكون", "النجوم الثنائية",
    "المجموعات النجمية", "التوقيت الفلكي",
    "الأرض حول الشمس", "محور الأرض",
    "الفصول الأربعة", "السدس والربع",
    "الرصد الفلكي", "السنة الكبيسة",
    "التقويم القمري", "التقويم الشمسي",
    "التقويم الهجري", "التقويم الميلادي",
    "الاعتدال الربيعي", "الاعتدال الخريفي",
    "الانقلاب الصيفي", "الانقلاب الشتوي",
    "دورة السودان", "برج الحمل",
    "برج الثور", "برج الجوزاء",
    "برج السرطان", "برج الأسد",
    "برج العذراء", "برج الميزان",
    "برج العقرب", "برج القوس",
    "برج الجدي", "برج الدلو"
  ],
  "بحار ومحيطات": [
    "المحيط الهادئ", "المحيط الأطلسي",
    "المحيط الهندي", "المحيط المتجمد الشمالي",
    "البحر الأبيض المتوسط", "البحر الأحمر",
    "البحر الكاريبي", "بحر الشمال",
    "بحر الصين الجنوبي", "خندق ماريانا",
    "تيار الخليج", "الشعاب المرجانية",
    "الحيتان العملاقة", "أسماك التونة",
    "الأعشاب البحرية", "البحر الميت",
    "بحر قزوين", "المد والجزر البحري",
    "الأمواج البحرية", "القراصنة القدماء",
    "السفن الشراعية", "الغواصات الحديثة",
    "الحياة في الأعماق", "الموانئ البحرية",
    "الجزر المرجانية", "البحيرات الشاطئية",
    "التيارات البحرية", "أسماك الأعماق",
    "اللؤلؤ الطبيعي", "الملاحة البحرية",
    "البحر الأسود", "بحر مرمرة",
    "بحر بيرنغ", "بحر أوخوتسك",
    "بحر اليابان", "بحر العرب",
    "خليج عدن", "خليج عمان",
    "خليج المكسيك", "خليج سان لورانس",
    "مضيق مالاكا", "مضيق باب المندب",
    "مضيق الدردنيل", "مضيق البوسفور",
    "الجزر البركانية", "الجزر الاستوائية",
    "الشلالات البحرية", "الحاجز المرجاني العظيم",
    "أسماك القرش البيضاء", "الحياة البحرية"
  ],
  "حضارات قديمة": [
    "الحضارة الفرعونية", "حضارة بلاد الرافدين",
    "الحضارة الإغريقية", "الحضارة الرومانية",
    "حضارة الفرس", "الحضارة الصينية القديمة",
    "حضارة الإنكا", "حضارة المايا",
    "حضارة الأزتك", "الحضارة القرطاجية",
    "الحضارة النوبية", "الحضارة الفينيقية",
    "الحضارة الهندوسية", "حضارة وادي السند",
    "الحضارة المينوية", "الحضارة المصرية القديمة",
    "بابل وآشور", "السومريون القدماء",
    "الأكاديون", "الحيثيون",
    "العرب قبل الإسلام", "الحضارة البيزنطية",
    "الحضارة الساسانية", "الأنباط في البتراء",
    "حضارة تدمر", "حضارة سبأ ومعين",
    "الحضارة الإترورية", "حضارة الكوشانيين",
    "حضارة الخمير", "حضارة زيمبابوي الكبرى",
    "حضارة سوريا القديمة", "حضارة فينيقيا",
    "حضارة أوغاريت", "حضارة إبلا",
    "حضارة ماري", "حضارة كنعان",
    "حضارة الفرس الأخمينيين", "حضارة السلوقيين",
    "حضارة البطالمة", "حضارة الإسكندر المقدوني",
    "حضارة سردينيا", "حضارة مالطا القديمة",
    "حضارة تراقيا", "حضارة الإغريق المينوسيين",
    "حضارة المايا الكلاسيكية", "حضارة تولتك",
    "حضارة أولمك", "حضارة تشيتشن إيتزا",
    "حضارة تيوتيهواكان", "حضارة موتشيه"
  ],
  "شخصيات تاريخية": [
    "الإسكندر الأكبر", "يوليوس قيصر",
    "نابليون بونابرت", "صلاح الدين الأيوبي",
    "خالد بن الوليد", "عمر بن الخطاب",
    "هارون الرشيد", "المتنبي",
    "ابن سينا", "ابن رشد",
    "الفارابي", "الخوارزمي",
    "أرسطو", "أفلاطون",
    "سقراط", "فيثاغورس",
    "أرخميدس", "غاليليو",
    "كوبرنيكوس", "كريستوفر كولومبوس",
    "ماجلان", "ماركو بولو",
    "جنكيز خان", "تيمورلنك",
    "الملكة إليزابيث الأولى", "غاندي",
    "نيلسون مانديلا", "وينستون تشرشل",
    "أحمد زويل", "نجيب محفوظ",
    "ابن خلدون", "البيروني",
    "ابن الهيثم", "الرازي",
    "جابر بن حيان", "ابن بطوطة",
    "ابن ماجد", "نور الدين زنكي",
    "بيبرس", "قلاوون",
    "محمد الفاتح", "عبد الرحمن الداخل",
    "عبد الرحمن الناصر", "الحسن بن الهيثم",
    "أبو حنيفة النعمان", "مالك بن أنس",
    "الشافعي", "أحمد بن حنبل",
    "الإمام البخاري", "الإمام مسلم"
  ],
  "عواصم ومدن": [
    "القاهرة", "الرياض",
    "بغداد", "دمشق",
    "عمّان", "بيروت",
    "الدوحة", "أبو ظبي",
    "الكويت", "المنامة",
    "مسقط", "صنعاء",
    "القدس", "تونس العاصمة",
    "الجزائر", "الرباط",
    "طرابلس", "الخرطوم",
    "أنقرة", "إسطنبول",
    "طهران", "إسلام آباد",
    "كابول", "الدار البيضاء",
    "دبي", "لندن",
    "باريس", "روما",
    "مدريد", "برلين",
    "موسكو", "واشنطن",
    "نيويورك", "طوكيو",
    "بكين", "نيودلهي",
    "سيول", "بانكوك",
    "جاكرتا", "مانيلا",
    "هانوي", "كوالالمبور",
    "سنغافورة", "أثينا",
    "لشبونة", "فيينا",
    "ستوكهولم", "أوسلو",
    "كوبنهاغن", "هلسنكي"
  ],
  "معالم سياحية": [
    "أهرامات الجيزة", "برج إيفل",
    "تمثال الحرية", "سور الصين العظيم",
    "تاج محل", "برج خليفة",
    "ماتشو بيتشو", "مدينة البتراء",
    "الكولوسيوم الروماني", "أكروبوليس أثينا",
    "تمثال المسيح الفادي", "برج بيزا المائل",
    "جزر المالديف", "شلالات نياغارا",
    "غابات الأمازون", "البحر الميت",
    "قصر الحمراء", "كاتدرائية القديس باسيل",
    "المسجد الأموي", "الجامع الأزهر",
    "مدينة البندقية", "سوق مراكش",
    "جزيرة بالي", "برج طوكيو",
    "كاتدرائية القديس بطرس", "قلعة الحصن الأردني",
    "حدائق بوتشان", "تلة فيزوف",
    "كهوف ألتاميرا", "البرلمان البريطاني",
    "تمثال رب الساعة", "قصر باكنغهام",
    "البيت الأبيض", "الكريملين",
    "الحرمان المكي", "المسجد النبوي",
    "كنيسة القيامة", "البرج المائل في بيزا",
    "مدينة أثينا الكلاسيكية", "هضبة الأهرامات",
    "أبو الهول", "وادي الملوك",
    "معبد الكرنك", "معبد الأقصر",
    "جزيرة فيلة", "معبد أبو سمبل",
    "هرم سقارة", "هرم ميدوم",
    "قلعة صلاح الدين", "الجامع الأقمر"
  ],
  "اختراعات": [
    "المصباح الكهربائي", "التلفاز",
    "الهاتف", "الطائرة",
    "السيارة", "الراديو",
    "الحاسوب الشخصي", "الإنترنت",
    "المضادات الحيوية", "المطبعة",
    "البارود", "البوصلة",
    "الورق", "البطاقة المصرفية",
    "الكاميرا الرقمية", "الآلة البخارية",
    "القاطرة البخارية", "الغواصة",
    "المروحة الكهربائية", "الثلاجة المنزلية",
    "فرن الميكروويف", "الليزر",
    "الروبوت الصناعي", "شريحة المعالج",
    "البطارية الكهربائية", "التلغراف",
    "الهاتف المحمول", "نظام تحديد المواقع GPS",
    "الماسح الضوئي", "الطابعة النافثة للحبر",
    "العجلة", "المحراث",
    "النول", "الساعة الميكانيكية",
    "الكاميرا الفوتوغرافية", "الفونوغراف",
    "الفيلم السينمائي", "التلفزيون الملون",
    "الفيديو", "أقراص CD",
    "أقراص DVD", "MP3",
    "البلوتوث", "الواي فاي",
    "اليو إس بي", "السيارة ذاتية القيادة",
    "الطائرة بدون طيار", "الواقع الافتراضي",
    "العملات الرقمية", "الحاسوب الكمي"
  ],
  "اكتشافات علمية": [
    "اكتشاف الجاذبية", "اكتشاف البنسلين",
    "اكتشاف الدورة الدموية", "اكتشاف الأشعة السينية",
    "اكتشاف الراديوم", "اكتشاف التمثيل الضوئي",
    "اكتشاف الحمض النووي", "اكتشاف الجدول الدوري",
    "اكتشاف الفيتامينات", "اكتشاف الأنسولين",
    "اكتشاف اللقاحات", "اكتشاف الإشعاع النووي",
    "اكتشاف البكتيريا", "اكتشاف الفيروسات",
    "اكتشاف الكهرباء", "اكتشاف الموجات الكهرومغناطيسية",
    "اكتشاف غاز النيون", "اكتشاف الإلكترون",
    "اكتشاف البروتون", "اكتشاف النيوترون",
    "اكتشاف الزلازل", "اكتشاف طاقة الرياح",
    "اكتشاف الذرة", "اكتشاف الكويزارات",
    "اكتشاف كوكب بلوتو", "اكتشاف التيفوس",
    "اكتشاف الدورة الدموية الصغرى", "اكتشاف قانون بويل",
    "اكتشاف ضغط الدم", "اكتشاف الموجات الصوتية",
    "اكتشاف طيف الضوء", "اكتشاف سرعة الضوء",
    "اكتشاف الأشعة تحت الحمراء", "اكتشاف الأشعة فوق البنفسجية",
    "اكتشاف الرنين المغناطيسي", "اكتشاف الجينات",
    "اكتشاف الكروموسومات", "اكتشاف نظرية التطور",
    "اكتشاف قوانين الوراثة", "اكتشاف البلاستيدات الخضراء",
    "اكتشاف الميتوكوندريا", "اكتشاف الريبوسومات",
    "اكتشاف الجزيئات النووية", "اكتشاف نظائر اليورانيوم",
    "اكتشاف أشعة جاما", "اكتشاف أشعة بيتا",
    "اكتشاف البوزيترون", "اكتشاف النيترينو",
    "اكتشاف البوزون هيغز", "اكتشاف الجينوم البشري"
  ],
};

/* اختيار عشوائي لـ (موضوع + كلمة مفتاحية) غير مستخدم من قبل */
function pickRandomTopicKeyword(usedSet) {
  const topicNames = Object.keys(TOPIC_KEYWORDS);
  // حاول العثور على تركيبة غير مستخدمة (حتى 50 محاولة)
  for (let attempt = 0; attempt < 50; attempt++) {
    const topic = topicNames[Math.floor(Math.random() * topicNames.length)];
    const keywords = TOPIC_KEYWORDS[topic];
    const keyword = keywords[Math.floor(Math.random() * keywords.length)];
    const key = topic + "::" + keyword;
    if (!usedSet || !usedSet.has(key)) {
      return { topic, keyword };
    }
  }
  // fallback: عشوائي مطلق
  const topic = topicNames[Math.floor(Math.random() * topicNames.length)];
  const keywords = TOPIC_KEYWORDS[topic];
  const keyword = keywords[Math.floor(Math.random() * keywords.length)];
  return { topic, keyword };
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

async function fetchQuestionFromAI(index, total) {
  if (!state.apiKey) return null;

  const difficulty = getDifficultyFromIndex(index, total);
  const diffLabel = { easy: "سهل", medium: "متوسط", hard: "صعب", expert: "خبير" }[difficulty];

  // اختيار عشوائي لـ (موضوع + كلمة مفتاحية) غير مستخدم من قبل لتفادي التكرار
  const { topic, keyword } = pickRandomTopicKeyword(state.usedTopicKeywords);

  // اختيار موضع عشوائي للإجابة الصحيحة (0=A، 1=B، 2=C، 3=D)
  // لتفادي ميل الذكاء الاصطناعي لوضع الإجابة دائماً في الخيار الأول
  const forcedAnswerIndex = Math.floor(Math.random() * 4);
  const forcedLetter = ["A", "B", "C", "D"][forcedAnswerIndex];

  const systemPrompt = "أنت مولّد أسئلة محترف للعبة 'من سيربح المليون' باللغة العربية. كل سؤال يجب أن يكون فريداً ومختلفاً عن أي سؤال سابق، ويدور تحديداً حول الكلمة المفتاحية المحددة. أعطِ الإجابة دائماً بصيغة JSON صارمة فقط بدون أي نص إضافي.";
  const userPrompt = `ولّد سؤالاً ثقافياً واحداً يدور تحديداً حول الكلمة المفتاحية: «${keyword}»\nضمن مجال: «${topic}»\nبمستوى صعوبة: ${diffLabel} (لعبة من سيربح المليون).\n\nالشروط:\n- السؤال يجب أن يرتبط مباشرة بالكلمة المفتاحية المذكورة.\n- سؤال أصلي ومختلف عن أي سؤال آخر.\n- 4 خيارات متقاربة ومنطقية، إجابة صحيحة واحدة فقط.\n- هام جداً: ضع الإجابة الصحيحة في الخيار ${forcedLetter} تحديداً (أي answerIndex = ${forcedAnswerIndex}). موضع الإجابة الصحيحة يجب أن يكون ${forcedLetter} وليس أي خيار آخر.\n- رتّب بقية الخيارات عشوائياً في الأماكن الأخرى.\n- أضف حقل "explanation" قصير (جملة واحدة) يشرح لماذا الإجابة صحيحة.\n- أضف حقل "topic" يعكس الموضوع.\n- أضف حقل "keyword" يعكس الكلمة المفتاحية.\n- قيمة "answerIndex" في الـ JSON يجب أن تكون ${forcedAnswerIndex} بالضبط.\n\nأعطِ النتيجة بصيغة JSON فقط بالشكل التالي:\n{"question":"نص السؤال","options":["الخيار1","الخيار2","الخيار3","الخيار4"],"answerIndex":${forcedAnswerIndex},"explanation":"شرح قصير","topic":"الموضوع","keyword":"الكلمة المفتاحية"}`;

  // لا نحتاج AbortController هنا — callOpenRouterWithFallback يُدارة المهلة داخلياً لكل مفتاح

  try {
    const { data } = await callOpenRouterWithFallback({
      body: {
        // النموذج يُحدد تلقائياً داخل callOpenRouterWithFallback (flash-lite → flash)
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 1.0,
        max_tokens: 600,
      },
      // لا signal — callOpenRouterWithFallback يُدارة المهلة بنفسه
      referer: "https://who-wants-to-be-a-millionaire.local",
      title: "Arabic Millionaire Game",
    });

    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) return null;

    // استخدام المحلّل المتين الذي يُصلح JSON المقتطع
    const obj = robustJSONParse(text);
    if (!obj) {
      console.warn("[AI] فشل تحليل JSON من استجابة الذكاء الاصطناعي:", text.slice(0, 100));
      return null;
    }

    if (
      typeof obj.question === "string" && obj.question.trim().length > 0 &&
      Array.isArray(obj.options) && obj.options.length === 4 &&
      obj.options.every(o => typeof o === "string" && o.trim().length > 0) &&
      Number.isInteger(obj.answerIndex) && obj.answerIndex >= 0 && obj.answerIndex < 4
    ) {
      // ضمان أن الإجابة الصحيحة في الموضع المختار عشوائياً (forcedAnswerIndex)
      // حتى لو لم يلتزم الذكاء الاصطناعي بالتعليمات
      let options = obj.options.map(x => x.trim());
      let answerIndex = obj.answerIndex;
      if (answerIndex !== forcedAnswerIndex) {
        // بدّل الخيار الصحيح مع الخيار الموجود في الموضع المطلوب
        const correctOpt = options[answerIndex];
        options[answerIndex] = options[forcedAnswerIndex];
        options[forcedAnswerIndex] = correctOpt;
        answerIndex = forcedAnswerIndex;
      }

      // سجّل تركيبة (موضوع::كلمة) كمستخدمة حتى لا تتكرر في الجولة نفسها
      state.usedTopicKeywords.add(topic + "::" + keyword);
      return {
        q: obj.question.trim(),
        o: options,
        a: answerIndex,
        explanation: typeof obj.explanation === "string" ? obj.explanation.trim() : undefined,
        topic: typeof obj.topic === "string" ? obj.topic.trim() : topic,
        keyword,
        difficulty,
      };
    }
    return null;
  } catch (err) {
    console.warn("فشل توليد السؤال بالذكاء الاصطناعي:", err.message);
    return null;
  }
}

/* ====== توليد سؤال إسلامي بالذكاء الاصطناعي ====== */
async function fetchIslamicQuestionFromAI(index, total) {
  if (!state.apiKey) return null;

  const difficulty = getDifficultyFromIndex(index, total);
  const diffLabel = { easy: "سهل", medium: "متوسط", hard: "صعب", expert: "خبير" }[difficulty];

  // اختيار فقرة إسلامية عشوائية مع كلمة مفتاحية واحدة
  const { para, keyword } = pickRandomIslamicParagraph(state.usedTopicKeywords);

  // اختيار موضع عشوائي للإجابة الصحيحة
  const forcedAnswerIndex = Math.floor(Math.random() * 4);
  const forcedLetter = ["A", "B", "C", "D"][forcedAnswerIndex];

  const systemPrompt = "أنت مولّد أسئلة محترف في العلوم الشرعية الإسلامية باللغة العربية. تولّد أسئلة دقيقة وموثوقة عن العقيدة وأصول الفقه والفقه. أعطِ الإجابة دائماً بصيغة JSON صارمة فقط بدون أي نص إضافي.";
  const userPrompt = `ولّد سؤالاً واحداً في العلوم الشرعية يدور تحديداً حول الكلمة المفتاحية: «${keyword}»
ضمن الموضوع: «${para.topic}»
بناءً على الفقرة التالية: «${para.content}»
بمستوى صعوبة: ${diffLabel} (لعبة من سيربح المليون).

الشروط:
- السؤال يجب أن يرتبط مباشرة بالكلمة المفتاحية والفقرة المذكورة.
- سؤال أصلي ودقيق من الناحية الشرعية.
- 4 خيارات متقاربة ومنطقية، إجابة صحيحة واحدة فقط.
- لا تشر إلى وجود الفقرة ولا تعرض الفقرة كاملة في السؤال، فقط سؤال مباشر دون افتراض معرفة المستخدم بالفقرة مسبقا.
- هام جداً: ضع الإجابة الصحيحة في الخيار ${forcedLetter} تحديداً (أي answerIndex = ${forcedAnswerIndex}).
- رتّب بقية الخيارات عشوائياً في الأماكن الأخرى.
- أضف حقل "explanation" قصير (جملة واحدة) يشرح لماذا الإجابة صحيحة مع الاستدلال الشرعي.
- أضف حقل "topic" يعكس الموضوع.
- أضف حقل "keyword" يعكس الكلمة المفتاحية.
- قيمة "answerIndex" في الـ JSON يجب أن تكون ${forcedAnswerIndex} بالضبط.

أعطِ النتيجة بصيغة JSON فقط بالشكل التالي:
{"question":"نص السؤال","options":["الخيار1","الخيار2","الخيار3","الخيار4"],"answerIndex":${forcedAnswerIndex},"explanation":"شرح قصير","topic":"الموضوع","keyword":"الكلمة المفتاحية"}`;

  try {
    const { data } = await callOpenRouterWithFallback({
      body: {
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 600,
      },
      referer: "https://who-wants-to-be-a-millionaire.local",
      title: "Arabic Islamic Millionaire Game",
    });

    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) return null;

    const obj = robustJSONParse(text);
    if (!obj) {
      console.warn("[AI-Islamic] فشل تحليل JSON:", text.slice(0, 100));
      return null;
    }

    if (
      typeof obj.question === "string" && obj.question.trim().length > 0 &&
      Array.isArray(obj.options) && obj.options.length === 4 &&
      obj.options.every(o => typeof o === "string" && o.trim().length > 0) &&
      Number.isInteger(obj.answerIndex) && obj.answerIndex >= 0 && obj.answerIndex < 4
    ) {
      let options = obj.options.map(x => x.trim());
      let answerIndex = obj.answerIndex;
      if (answerIndex !== forcedAnswerIndex) {
        const correctOpt = options[answerIndex];
        options[answerIndex] = options[forcedAnswerIndex];
        options[forcedAnswerIndex] = correctOpt;
        answerIndex = forcedAnswerIndex;
      }

      state.usedTopicKeywords.add(para.title + "::" + keyword);
      return {
        q: obj.question.trim(),
        o: options,
        a: answerIndex,
        explanation: typeof obj.explanation === "string" ? obj.explanation.trim() : undefined,
        topic: typeof obj.topic === "string" ? obj.topic.trim() : para.topic,
        keyword,
        difficulty,
      };
    }
    return null;
  } catch (err) {
    console.warn("فشل توليد السؤال الإسلامي بالذكاء الاصطناعي:", err.message);
    return null;
  }
}


/* ====== دالة مساعدة: الحصول على سؤال واحد (AI أو بنك) ====== */
async function getOneMillionaireQuestion(index) {
  const mode = MODES[state.selectedMode];
  const difficulty = getDifficultyFromIndex(index, mode.totalQuestions);

  // وضع مواضيع علم الأحياء
  if (state.biologyMode) {
    let q = null;
    let source = "biology-bank";

    // جرّب AI أولاً إن وُجد مفتاح
    if (state.apiKey) {
      q = await fetchBiologyQuestionFromAI(index, mode.totalQuestions);
      if (q) {
        const norm = normalizeQuestion(q.q);
        if (state.askedQuestions.has(norm)) q = null; // مكرر
        else source = "ai-biology";
      }
    }

    // fallback للبنك البيولوجي الاحتياطي
    if (!q) {
      q = getBiologyFallbackQuestion(difficulty, state.askedQuestions);
      source = "biology-bank";
    }

    return { q, source };
  }

  // وضع المواضيع الإسلامية
  if (state.islamicMode) {
    let q = null;
    let source = "islamic-bank";

    // جرّب AI أولاً إن وُجد مفتاح
    if (state.apiKey) {
      q = await fetchIslamicQuestionFromAI(index, mode.totalQuestions);
      if (q) {
        const norm = normalizeQuestion(q.q);
        if (state.askedQuestions.has(norm)) q = null; // مكرر
        else source = "ai-islamic";
      }
    }

    // fallback للبنك الإسلامي الاحتياطي
    if (!q) {
      q = getIslamicFallbackQuestion(difficulty, state.askedQuestions);
      source = "islamic-bank";
    }

    return { q, source };
  }

  // الوضع العادي — جرّب AI أولاً إن وُجد مفتاح
  let q = null;
  let source = "bank";
  if (state.apiKey) {
    q = await fetchQuestionFromAI(index, mode.totalQuestions);
    if (q) {
      const norm = normalizeQuestion(q.q);
      if (state.askedQuestions.has(norm)) q = null; // مكرر
      else source = "ai";
    }
  }

  // fallback للبنك المحلي
  if (!q) {
    q = getFallbackQuestion(difficulty, state.askedQuestions);
    source = "bank";
  }

  return { q, source };
}

/* ====== تجهيز السؤال التالي مسبقاً في الخلفية ====== */
function prefetchNextMillionaireQuestion() {
  const mode = MODES[state.selectedMode];
  const nextIndex = state.currentIndex + 1;
  // لا تُجهّز ما بعد السؤال الأخير
  if (mode.totalQuestions > 0 && nextIndex >= mode.totalQuestions) {
    state.nextQuestionPromise = null;
    return;
  }
  if (state.nextQuestionPromise) return; // تجهيز جارٍ بالفعل
  state.nextQuestionPromise = getOneMillionaireQuestion(nextIndex);
  console.log(`[Prefetch] 🚀 بدء تجهيز السؤال ${nextIndex + 1} في الخلفية`);
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

  // 🚀 Prefetch: إن كان هناك سؤال مُجهّز مسبقاً انتظره، وإلا اطلبه الآن
  let q, source;
  if (state.nextQuestionPromise) {
    console.log(`[Prefetch] ⚡ استخدام السؤال المُجهّز مسبقاً`);
    const result = await state.nextQuestionPromise;
    state.nextQuestionPromise = null;
    q = result.q;
    source = result.source;
  } else {
    const result = await getOneMillionaireQuestion(state.currentIndex);
    q = result.q;
    source = result.source;
  }

  state.question = q;
  state.questionSource = source;
  state.askedQuestions.add(normalizeQuestion(q.q));
  state.loading = false;

  renderQuestion();
  startTimer();

  // 🚀 ابدأ تجهيز السؤال التالي فوراً في الخلفية
  prefetchNextMillionaireQuestion();
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

  // تمييز صامت لمصدر السؤال (AI = خلفية خضراء، بنك = خلفية زرقاء)
  const card = document.getElementById("question-card") || document.querySelector(".question-card");
  if (card) {
    card.classList.remove("source-ai", "source-bank", "source-ai-islamic", "source-islamic-bank", "source-ai-biology", "source-biology-bank");
    if (state.questionSource === "ai") card.classList.add("source-ai");
    else if (state.questionSource === "ai-islamic") card.classList.add("source-ai-islamic");
    else if (state.questionSource === "islamic-bank") card.classList.add("source-islamic-bank");
    else if (state.questionSource === "ai-biology") card.classList.add("source-ai-biology");
    else if (state.questionSource === "biology-bank") card.classList.add("source-biology-bank");
    else card.classList.add("source-bank");
  }

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

  // 🚀 Prefetch: إذا وُجد سؤال مُجهّز مسبقاً، اعرضه مباشرة بدون شريط تحميل طويل
  if (state.nextQuestionPromise) {
    // السؤال جاهز أو شبه جاهز — اعرض شريطاً سريعاً
    showLoadingProgress();
    const loadPromise = loadQuestion();
    await loadPromise;
    await completeLoadingProgress();
    hideLoadingProgress();
  } else {
    // لا يوجد تجهيز مسبق — اعرض الشريط الكامل
    const loadPromise = loadQuestion();
    await loadPromise;
    await completeLoadingProgress();
    hideLoadingProgress();
  }
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
  let source = "bank";
  if (state.apiKey) {
    q = await fetchQuestionFromAI(state.currentIndex, mode.totalQuestions);
    if (q && state.askedQuestions.has(normalizeQuestion(q.q))) q = null;
    else if (q) source = "ai";
  }
  if (!q) {
    const difficulty = getDifficultyFromIndex(state.currentIndex, mode.totalQuestions);
    q = getFallbackQuestion(difficulty, state.askedQuestions);
    source = "bank";
  }
  state.question = q;
  state.questionSource = source;
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

/* =========================================================
   لعبة "لو خيروك" — Would You Rather
   ========================================================= */

/* ====== بنك أسئلة لو خيروك المدمج (100 سؤال متنوع) ======
   كل سؤال يحوي: options (خياران يُقرآن طبيعياً مع "لو خيروك [خيار1] أو [خيار2]")،
   percentages (نسب تقريبية لاختيار الناس لكل خيار)، topic، mood (مضحك/غريب/صعب/فلسفي)
   ملاحظة: النسب تقديرية وتُستخدم لعرض إحصائية افتراضية للجمهور.
*/
// بنك أسئلة لو خيروك — كل خيار عبارة تامة تُقرأ طبيعياً مع "لو خيروك [الخيار1] أو [الخيار2]"
// o = خياران، s = نسب مئوية (مجموع 100)، t = موضوع، m = مزاج
const LOY_BANK = [
  // ===== مضحكة (25) =====
  { o: ["أن تأكل بيتزا كل يوم لبقية حياتك", "ألا تأكل بيتزا أبداً"], s: [55, 45], t: "طعام", m: "مضحك", c: ["بيتزا إلى الأبد! 🍕 معدةٌ أسطورية تستحق التحية.", "حرمانٌ قاسٍ، لكن رئتك ستشكرك لاحقاً."] },
  { o: ["أن تنام بجانب دب", "أن تنام بجانب تمساح"], s: [62, 38], t: "حيوانات", m: "مضحك", c: ["دبٌّ ضخم لكنه ودود غالباً... غامرة جميلة!", "تمساحٌ لن يرحم، أتمنى لك سباحةً هادئة."] },
  { o: ["أن يكون لديك ذيل", "أن يكون لديك قرون"], s: [70, 30], t: "خيال", m: "مضحك", c: ["ذيلٌ يلوّح به للناس حين تفرح — لطيف!", "قرونٌ تجعل مظهرك مهيباً وخطيراً."] },
  { o: ["أن تعطس 100 مرة متتالية", "أن تتثاءب 100 مرة متتالية"], s: [48, 52], t: "جسد", m: "مضحك", c: ["يومٌ كامل من العطس — تحتاج علبة مناديل ضخمة.", "فكٌّ لا يتوقف — زملاؤك سيُجنّون."] },
  { o: ["أن تشم رائحة كريهة طوال اليوم", "أن تسمع صوتاً مزعجاً طوال اليوم"], s: [40, 60], t: "حواس", m: "مضحك", c: ["أنفك سيتعب، لكنك تعوّدت.", "أذناك ستشتكان من الإرهاق اليومي."] },
  { o: ["أن تنسى اسمك دائماً", "أن تنسى وجهك في المرآة"], s: [58, 42], t: "هوية", m: "مضحك", c: ["نسيان الاسم محرج، لكنه يُصنع له لقب جديد.", "نسيان الوجه في المرآة تجربةٌ سريالية!"] },
  { o: ["أن يتحدث كلبك", "أن يتحدث قطك"], s: [60, 40], t: "حيوانات", m: "مضحك", c: ["كلبٌ يفضح أسرارك أمام الضيوف — متعة!", "قطٌّ سيلاحظك بكبرياء ثم يتجاهلك."] },
  { o: ["أن تأكل طعامك المفضل بلا توقف ولا تشبع أبداً", "أن تشبع بمجرد رؤية الطعام"], s: [35, 65], t: "طعام", m: "مضحك", c: ["متعة الأكل بلا حدود، لكن ميزانيتك؟", "شفط بصري للطعام — ريجيمٌ مثالي!"] },
  { o: ["أن تستحم بماء بارد كل يوم", "ألا تستحم أبداً"], s: [78, 22], t: "نظافة", m: "مضحك", c: ["صحتك تشكرك، لكن إرادتك ستتعب.", "نعومةٌ فطرية، لكن أصدقاءك قد يهربون."] },
  { o: ["أن ترتدي ملابس مقلوبة طوال اليوم", "أن ترتدي حذاءً بمقاس أكبر بمرتين"], s: [67, 33], t: "مظهر", m: "مضحك", c: ["مظهرٌ غريب، لكنه أسلوب خاص بك.", "حذاءٌ ضخم — مشيةٌ بطيئة لكن مريحة."] },
  { o: ["أن تضحك في جنازة", "أن تبكي في حفل زفاف"], s: [44, 56], t: "مواقف", m: "مضحك", c: ["ضحكٌ في وقتٍ غير مناسب — صدمةٌ اجتماعية!", "بكاءٌ يفسد الفرح — مزاجٌ متقلّب."] },
  { o: ["أن تكون السلحفاة الأبطأ", "أن تكون الأرنب الأشطر"], s: [38, 62], t: "خيال", m: "مضحك", c: ["بطءٌ هادئ، لكنك تعيش اللحظة ببطء.", "ذكاءٌ وسرعة، لكن النهاية معروفة."] },
  { o: ["أن تأكل دجاجاً بكل وجبة", "أن تأكل سمكاً بكل وجبة"], s: [65, 35], t: "طعام", m: "مضحك", c: ["تنوّعٌ محدود، لكنه مريح ومألوف.", "صحةٌ جيدة من السمك، لكنه ممل."] },
  { o: ["أن تعيش بدون هاتف", "أن تعيش بدون مرآة"], s: [50, 50], t: "حياة", m: "مضحك", c: ["حياةٌ بلا قلق بطارية — تحرّر!", "حياةٌ بلا انعكاس ذاتي — هدوءٌ نفسي."] },
  { o: ["أن تتحدث بسرعة فائقة", "أن تتحدث ببطء شديد"], s: [55, 45], t: "تواصل", m: "مضحك", c: ["كلامٌ سريع كالرصاصة — تتعب من الشرح.", "كلامٌ بطيء — تنام قبل أن تنهي جملتك."] },
  { o: ["أن يكون بصرك حاداً كالصقر", "أن يكون سمعك دقيقاً كالخفاش"], s: [70, 30], t: "حواس", m: "مضحك", c: ["عينٌ كالصقر — ترى كل تفصيلة بعيدة.", "أذنٌ كالخفاش — تسمع كل همسة."] },
  { o: ["أن تذهب للعمل ببيجاما", "أن تذهب للعمل بحذاء رياضي فقط"], s: [60, 40], t: "مواقف", m: "مضحك", c: ["بيجاما مريحة في العمل — نعومةٌ مطلقة.", "حذاءٌ رياضي مع بدلة — مزيجٌ غريب."] },
  { o: ["أن تسمع نكتة سيئة 100 مرة", "أن تسمع قصة حزينة مرة واحدة"], s: [57, 43], t: "مشاعر", m: "مضحك", c: ["نكتةٌ سيئة 100 مرة — سخرية لا تنتهي.", "قصةٌ حزينة مرة — ثقلٌ على القلب."] },
  { o: ["أن تشرب عصير ليمون حامض بدون سكر", "أن تشرب كوب زيت زيتون"], s: [75, 25], t: "طعام", m: "مضحك", c: ["حموضةٌ قوية، لكنها تجربة منعشة.", "زيتٌ ثقيل، معدتك ستعاني."] },
  { o: ["أن يكون اسمك 'بيبة'", "أن يكون اسمك 'شحفوف'"], s: [42, 58], t: "هوية", m: "مضحك", c: ["اسمٌ لطيف، لكنه غريب بعض الشيء.", "اسمٌ فريد، لكنه يثير الضحك."] },
  { o: ["أن يكون لك شارب كث", "أن يكون لك لحية طويلة جداً"], s: [50, 50], t: "مظهر", m: "مضحك", c: ["شاربٌ كث يمنحك مظهراً وقوراً.", "لحيةٌ طويلة تمنحك هيبة الرجال."] },
  { o: ["أن تحلم كل ليلة بالعمل", "ألا تنام أبداً"], s: [33, 67], t: "نوم", m: "مضحك", c: ["أحلامٌ عن العمل — حتى اللاوعي يتعب!", "سهرٌ أبدي — نعاسٌ لا يأتي."] },
  { o: ["أن يكون رأسك كبيراً جداً", "أن يكون رأسك صغيراً جداً"], s: [55, 45], t: "مظهر", m: "مضحك", c: ["رأسٌ كبير يوحي بالحكمة.", "رأسٌ صغير يوحي بالذكاء الفائق."] },
  { o: ["أن تتحدث بلغة لا يفهمها أحد", "أن تفهم كل اللغات دون القدرة على التحدث"], s: [40, 60], t: "تواصل", m: "مضحك", c: ["لغةٌ لا يفهمها أحد — كلامٌ للريح.", "فهمٌ بلا قدرة على الكلام — إحباطٌ صامت."] },
  { o: ["أن تعيش بدون إنترنت", "أن تعيش بدون هاتف"], s: [50, 50], t: "حياة", m: "مضحك", c: ["عيشٌ بلا إنترنت — صفاء ذهن رائع.", "عيشٌ بلا هاتف — تحرّرٌ من الإدمان."] },

  // ===== غريبة (25) =====
  { o: ["أن تعيش في كهف تحت الأرض", "أن تعيش في منزل عائم على الماء"], s: [35, 65], t: "سكن", m: "غريب", c: ["عيشٌ تحت الأرض — هدوءٌ وظلام.", "عيشٌ على الماء — منظرٌ خلاب وحركة."] },
  { o: ["أن تمتلك أذناً ثالثة", "أن تمتلك عيناً ثالثة"], s: [30, 70], t: "جسد", m: "غريب", c: ["أذنٌ ثالثة — تسمع أكثر مما تتخيل.", "عينٌ ثالثة — ترى ما لا يُرى."] },
  { o: ["أن تسافر عبر الزمن للماضي", "أن تسافر عبر الزمن للمستقبل"], s: [55, 45], t: "خيال", m: "غريب", c: ["ماضٍ تعرف كيف تصحح أخطاءك.", "مستقبلٌ غامض يكشف لك التقنيات."] },
  { o: ["أن تعيش على كوكب أحمر بلا نباتات", "أن تعيش على كوكب أخضر بلا ماء"], s: [42, 58], t: "فضاء", m: "غريب", c: ["كوكبٌ أحمر — هدوءٌ صحراوي ساحر.", "كوكبٌ أخضر — نباتٌ بلا ماء، لغز."] },
  { o: ["أن تتحدث مع الحيوانات", "أن تقرأ الأفكار"], s: [60, 40], t: "قدرات", m: "غريب", c: ["حوارٌ مع الحيوانات — أسرارٌ تُكشف.", "قراءةُ أفكارٍ — معرفةٌ مزعجة أحياناً."] },
  { o: ["أن تنام لمدة سنة كاملة", "أن تبقى مستيقظاً شهراً كاملاً"], s: [38, 62], t: "نوم", m: "غريب", c: ["نومُ سنة كاملة — أحلامٌ لا تنتهي.", "سهرُ شهر — إنجازٌ لكن بإرهاق."] },
  { o: ["أن تمتلك أجنحة تحلّق بها", "أن تمتلك خياشيم تتنفس بها تحت الماء"], s: [68, 32], t: "قدرات", m: "غريب", c: ["أجنحةٌ تحلّق — حريةٌ في السماء.", "خياشيمُ تتنفس — عالمٌ مائي سحري."] },
  { o: ["أن تكون ذكياً جداً بلا مشاعر", "أن تكون عاطفياً جداً بلا منطق"], s: [50, 50], t: "شخصية", m: "غريب", c: ["ذكاءٌ جاف — قراراتٌ مثالية لكن باردة.", "عاطفةٌ غامرة — حياةٌ دافئة لكن فوضوية."] },
  { o: ["أن ترى الأشباح", "أن تسمع أصوات الموتى"], s: [45, 55], t: "خوارق", m: "غريب", c: ["رؤيةُ الأشباح — عالمٌ آخر يظهر.", "سماعُ الموتى — أصواتٌ من الظلام."] },
  { o: ["أن يكون جلدك أزرق", "أن تكون عيناك صفراوين"], s: [40, 60], t: "مظهر", m: "غريب", c: ["جلدٌ أزرق — مظهرٌ من عالم آخر.", "عينان صفراوان — سحرٌ في النظرات."] },
  { o: ["أن تعيش في عالم من الحلوى", "أن تعيش في عالم من الألعاب"], s: [45, 55], t: "خيال", m: "غريب", c: ["عالمٌ من الحلوى — طفولةٌ لا تنتهي.", "عالمٌ من الألعاب — متعةٌ لا تتوقف."] },
  { o: ["أن تمتلك قدرة التخفي", "أن تمتلك القدرة على الانتقال الفوري"], s: [40, 60], t: "قدرات", m: "غريب", c: ["تخفّي — تتلصص دون أن يراك أحد.", "انتقالٌ فوري — توفّر وقت التنقل."] },
  { o: ["أن تعيش حياتك مرة أخرى من البداية", "أن تبدأ حياة جديدة كلياً"], s: [50, 50], t: "حياة", m: "غريب", c: ["إعادةُ حياتك — تصحيحُ أخطاء قديمة.", "حياةٌ جديدة — بدايةٌ من الصفر."] },
  { o: ["أن تمتلك قوة العنكبوت", "أن تمتلك سرعة الفهد"], s: [48, 52], t: "قدرات", m: "غريب", c: ["قوةُ العنكبوت — تسلّقٌ وخيوط.", "سرعةُ الفهد — ركضٌ يفوق الريح."] },
  { o: ["أن تعيش في قلعة قديمة", "أن تعيش في منزل مستقبلي ذكي"], s: [38, 62], t: "سكن", m: "غريب", c: ["قلعةٌ قديمة — تاريخٌ وأسرار.", "منزلٌ ذكي — راحةٌ وتقنية."] },
  { o: ["أن تكون آخر إنسان على الأرض", "أن تكون أول إنسان على المريخ"], s: [35, 65], t: "فضاء", m: "غريب", c: ["آخر إنسان — وحدةٌ مطلقة.", "أول إنسان على المريخ — مجدٌ خالد."] },
  { o: ["أن تتحدث بلغة قديمة منقرضة", "أن تتحدث بلغة مستقبلية لم تُخترع بعد"], s: [55, 45], t: "لغات", m: "غريب", c: ["لغةٌ منقرضة — كنزٌ لغوي نادر.", "لغةٌ مستقبلية — سبّاقٌ للزمن."] },
  { o: ["أن تتحكم بالطقس", "أن تتحكم بالوقت"], s: [30, 70], t: "قدرات", m: "غريب", c: ["تحكّمٌ بالطقس — مطرٌ متى شئت.", "تحكّمٌ بالوقت — قوّةٌ خطيرة."] },
  { o: ["أن تمتلك يداً ثالثة", "أن تمتلك عيناً خلف رأسك"], s: [60, 40], t: "جسد", m: "غريب", c: ["يدٌ ثالثة — إنتاجيةٌ ثلاثية.", "عينٌ خلفية الرأس — لا مفاجآت."] },
  { o: ["أن تعيش في عالم بلا موسيقى", "أن تعيش في عالم بلا ألوان"], s: [55, 45], t: "فنون", m: "غريب", c: ["بلا موسيقى — صمتٌ مرعب.", "بلا ألوان — عالمٌ رمادي حزين."] },
  { o: ["أن تتنقل بآلة زمن", "أن تتنقل ببوابة انتقال فوري"], s: [50, 50], t: "خيال", m: "غريب", c: ["آلةُ زمن — رحلاتٌ تاريخية.", "بوابةُ انتقال — اختصارٌ للمسافات."] },
  { o: ["أن تمتلك شجرة تنبت نقوداً", "أن تمتلك نهراً يجري عسلاً"], s: [65, 35], t: "خيال", m: "غريب", c: ["شجرةُ نقود — غنىً لا ينضب.", "نهرُ عسل — حلاوةٌ دائمة."] },
  { o: ["أن تعيش بلا أحلام", "أن تحلم أحلاماً كابوسية كل ليلة"], s: [70, 30], t: "نوم", m: "غريب", c: ["بلا أحلام — نومٌ فارغ.", "كوابيسُ كل ليلة — رعبٌ مستمر."] },
  { o: ["أن تمتلك ذاكرة فوتوغرافية", "أن تنسى أي شيء تريد"], s: [60, 40], t: "عقل", m: "غريب", c: ["ذاكرةٌ فوتوغرافية — لا تنسى شيئاً.", "نسيانٌ انتقائي — تريحك من الألم."] },
  { o: ["أن يصبح ظلك شخصاً آخر", "أن تنعكس صورتك في المرآة بشكل مختلف"], s: [45, 55], t: "خوارق", m: "غريب", c: ["ظلٌّ مستقل — رفيقٌ غامض.", "انعكاسٌ متغيّر — مرآةٌ تكذب."] },

  // ===== صعبة (25) =====
  { o: ["أن تنقذ 5 غرباء", "أن تنقذ شخصاً تحبه"], s: [40, 60], t: "أخلاق", m: "صعب", c: ["فضيلةٌ نبيلة — تنقذ أرواحاً أكثر.", "قلبك قبل كل شيء — إنسانيةٌ صرفة."] },
  { o: ["أن تعرف الحقيقة المطلقة المؤلمة", "أن تعيش بكذبة مريحة"], s: [55, 45], t: "أخلاق", m: "صعب", c: ["حقيقةٌ موجعة لكنها شريفة.", "كذبةٌ مريحة — سلامٌ نفسي زائف."] },
  { o: ["أن تموت شاباً سعيداً", "أن تعيش كبيراً حزيناً"], s: [60, 40], t: "حياة", m: "صعب", c: ["موتٌ شبابي سعيد — نهايةٌ مشرقة.", "عمرٌ طويل بحزن — ثقلٌ مستمر."] },
  { o: ["أن تنقذ نفسك", "أن تنقذ غريباً بريئاً"], s: [50, 50], t: "أخلاق", m: "صعب", c: ["غريزةُ البقاء — فطرةٌ إنسانية.", "تضحيةٌ نبيلة — شجاعةٌ استثنائية."] },
  { o: ["أن تعرف موعد وفاتك", "أن تعرف سبب وفاتك"], s: [35, 65], t: "حياة", m: "صعب", c: ["معرفةُ الموعد — استعدادٌ مسبق.", "معرفةُ السبب — حذرٌ ذكي."] },
  { o: ["أن تنسى أسوأ ذكرياتك", "أن تنسى أفضل ذكرياتك"], s: [70, 30], t: "عقل", m: "صعب", c: ["نسيانُ الألم — سلامٌ نفسي.", "نسيانُ الفرح — فقدانٌ مؤلم."] },
  { o: ["أن تعيش بلا ألم جسدي", "أن تعيش بلا ألم نفسي"], s: [40, 60], t: "مشاعر", m: "صعب", c: ["بلا ألم جسدي — راحةٌ مطلقة.", "بلا ألم نفسي — صفاءٌ روحي."] },
  { o: ["أن تخسر كل أموالك", "أن تخسر كل أصدقائك"], s: [55, 45], t: "حياة", m: "صعب", c: ["مالٌ يرجع، لكن الوقت لا يعود.", "أصدقاءٌ لا يُعوّضون بثمن."] },
  { o: ["أن تكون مشهوراً يكرهك الناس", "أن تكون مجهولاً يحبك المقربون"], s: [25, 75], t: "شهرة", m: "صعب", c: ["شهرةٌ سلبية — ألمٌ علني.", "مجهوليةٌ هادئة — سلامٌ خاص."] },
  { o: ["أن تقتل شخصاً لإنقاذ ألف", "أن تترك الألف يموتون"], s: [60, 40], t: "أخلاق", m: "صعب", c: ["تضحيةٌ صعبة لكنها تنقذ أرواحاً.", "حيادٌ مريح لكنه قاسٍ."] },
  { o: ["أن تعيش بلا حب", "أن تعيش بلا صداقة"], s: [40, 60], t: "مشاعر", m: "صعب", c: ["بلا حب — حياةٌ باردة لكن هادئة.", "بلا صداقة — وحدةٌ في الزحام."] },
  { o: ["أن يكون لديك وقت كبير بلا مال", "أن يكون لديك مال كبير بلا وقت"], s: [55, 45], t: "حياة", m: "صعب", c: ["وقتٌ وفير بلا مال — حريةٌ فقيرة.", "مالٌ وفير بلا وقت — سجنٌ ذهبي."] },
  { o: ["أن تعرف كل شيء", "ألا تعرف شيئاً"], s: [70, 30], t: "عقل", m: "صعب", c: ["معرفةٌ مطلقة — ثقلٌ لا يُحتمل.", "جهلٌ تام — سلامٌ ساذج."] },
  { o: ["أن تكون قوياً بلا حكمة", "أن تكون حكيماً بلا قوة"], s: [35, 65], t: "شخصية", m: "صعب", c: ["قوةٌ بلا حكمة — فوضى خطيرة.", "حكمةٌ بلا قوة — تأملٌ عاجز."] },
  { o: ["أن تعيش حياة واحدة طويلة", "أن تعيش عدة حيوات قصيرة"], s: [60, 40], t: "حياة", m: "صعب", c: ["حياةٌ واحدة طويلة — عمقٌ مستمر.", "حيواتٌ قصيرة متعددة — تنوّعٌ غني."] },
  { o: ["أن تُحرم من النوم ليومين", "أن تُحرم من الطعام ليومين"], s: [40, 60], t: "جسد", m: "صعب", c: ["بلا نوم — إنهاكٌ جسدي قاتل.", "بلا طعام — جوعٌ لا يطاق."] },
  { o: ["أن تخسر بصرك", "أن تخسر سمعك"], s: [40, 60], t: "حواس", m: "صعب", c: ["بلا بصر — ظلامٌ دائم.", "بلا سمع — صمتٌ مطلق."] },
  { o: ["أن تعيش بلا ماضٍ", "أن تعيش بلا مستقبل"], s: [50, 50], t: "حياة", m: "صعب", c: ["بلا ماضٍ — بدايةٌ نظيفة.", "بلا مستقبل — يأسٌ قاتل."] },
  { o: ["أن تكون ثرياً وحيداً", "أن تكون فقيراً محاطاً بالعائلة"], s: [25, 75], t: "حياة", m: "صعب", c: ["ثراءٌ وحيد — راحةٌ مادية بلا روح.", "فقرٌ مع عائلة — غنىً عاطفي."] },
  { o: ["أن تُسجن بريئاً 10 سنوات", "أن تُعاقب علناً على ذنب لم ترتكبه"], s: [45, 55], t: "عدل", m: "صعب", c: ["سجنٌ عادل لكنه قاسٍ.", "عقابٌ علني — فضيحةٌ لا تُنسى."] },
  { o: ["أن تعرف سر الكون", "أن تعيش سعيداً بلا معرفة"], s: [50, 50], t: "فلسفي", m: "صعب", c: ["معرفةٌ خطيرة — عبءٌ فكري.", "سعادةٌ بلا معرفة — نعيم الجهل."] },
  { o: ["أن تخوض حرباً لا تؤمن بها", "أن تهرب من وطنك"], s: [40, 60], t: "أخلاق", m: "صعب", c: ["حربٌ لا تؤمن بها — واجبٌ مرير.", "هجرةٌ صعبة — بدايةٌ جديدة."] },
  { o: ["أن تُنسى بعد موتك", "أن تُذكر بأفعال سيئة"], s: [60, 40], t: "إرث", m: "صعب", c: ["نسيانٌ بعد الموت — راحةٌ أبديّة.", "ذكرى سيئة — إرثٌ ثقيل."] },
  { o: ["أن تختار لمن تعطي حياتك", "أن يختار الطبيب عشوائياً"], s: [70, 30], t: "أخلاق", m: "صعب", c: ["اختيارٌ ذاتي — مسؤوليةٌ نبيلة.", "اختيارٌ عشوائي — قدرٌ لا ذنب فيه."] },
  { o: ["أن تخون صديقاً", "أن تخون وطنك"], s: [55, 45], t: "أخلاق", m: "صعب", c: ["خيانةُ صديق — جرحٌ عميق.", "خيانةُ وطن — جرمٌ أكبر."] },

  // ===== فلسفية (25) =====
  { o: ["أن تكون حراً بلا هدف", "أن تكون مقيداً بهدف نبيل"], s: [45, 55], t: "فلسفي", m: "فلسفي", c: ["حريةٌ مطلقة لكن بلا معنى.", "تقيّدٌ لكن مع هدف سامٍ."] },
  { o: ["أن تمتلك المال", "أن تمتلك الشهرة"], s: [70, 30], t: "حياة", m: "فلسفي", c: ["مالٌ — أمانٌ مادي لكنه زائل.", "شهرةٌ — انتباهٌ علني لكنه متعب."] },
  { o: ["أن تعرف الحب", "أن تعرف الحكمة"], s: [60, 40], t: "فلسفي", m: "فلسفي", c: ["حبٌّ — دفءٌ يملأ القلب.", "حكمةٌ — نورٌ يضيء العقل."] },
  { o: ["أن تمتلك القوة", "أن تمتلك اللطف"], s: [35, 65], t: "فلسفي", m: "فلسفي", c: ["قوةٌ — سيطرةٌ لكن بلا تعاطف.", "لطفٌ — تأثيرٌ ناعم لكنه دائم."] },
  { o: ["أن تكون محقاً وحيداً", "أن تكون مخطئاً مع الجماعة"], s: [55, 45], t: "فلسفي", m: "فلسفي", c: ["حقٌّ وحيد — شرفٌ لكنه ثقيل.", "خطأٌ مع جماعة — انتماءٌ لكنه مريح."] },
  { o: ["أن تحقق السلام العالمي", "أن تنهي الفقر"], s: [50, 50], t: "أخلاق", m: "فلسفي", c: ["سلامٌ عالمي — حلمٌ إنساني.", "نهايةُ الفقر — عدالةٌ أرضية."] },
  { o: ["أن تعرف المعرفة المطلقة", "أن تعرف السعادة المطلقة"], s: [45, 55], t: "فلسفي", m: "فلسفي", c: ["معرفةٌ مطلقة — ثقلٌ فكري.", "سعادةٌ مطلقة — نعيمٌ روحي."] },
  { o: ["أن يخلد جسدك", "أن تخلد روحك"], s: [25, 75], t: "فلسفي", m: "فلسفي", c: ["خلودُ الجسد — بقاءٌ مادي.", "خلودُ الروح — امتدادٌ معنوي."] },
  { o: ["أن تعيش في الحاضر دائماً", "أن تتأمل الماضي والمستقبل"], s: [60, 40], t: "فلسفي", m: "فلسفي", c: ["حاضرٌ دائم — وعيٌ صافٍ.", "ماضٍ ومستقبل — عمقٌ تأملي."] },
  { o: ["أن يكون لك جمال داخلي", "أن يكون لك جمال خارجي"], s: [80, 20], t: "قيم", m: "فلسفي", c: ["جمالٌ داخلي — جوهرٌ خالد.", "جمالٌ خارجي — مظهرٌ زائل."] },
  { o: ["أن تنجح بصعوبة", "أن تفشل بسهولة"], s: [85, 15], t: "حياة", m: "فلسفي", c: ["نجاحٌ بصعوبة — قيمةٌ حقيقية.", "فشلٌ سهل — راحةٌ لكن بلا فخر."] },
  { o: ["أن تعيش كفرد", "أن تعيش كجزء من جماعة"], s: [40, 60], t: "مجتمع", m: "فلسفي", c: ["فردٌ حر — استقلاليةٌ مطلقة.", "جزءٌ من جماعة — انتماءٌ دافئ."] },
  { o: ["أن تتبع قلبك", "أن تتبع عقلك"], s: [55, 45], t: "فلسفي", m: "فلسفي", c: ["قلبٌ — مغامرةٌ عاطفية.", "عقلٌ — حسابٌ منطقي."] },
  { o: ["أن تعيش حياة بسيطة هادئة", "أن تعيش حياة مليئة بالمغامرات الخطيرة"], s: [50, 50], t: "حياة", m: "فلسفي", c: ["هدوءٌ ريفي — سلامٌ نفسي.", "مغامراتٌ خطيرة — إثارةٌ لا تنسى."] },
  { o: ["أن يكون لك أثر كبير بعد موتك", "أن تعيش طويلاً بلا أثر"], s: [60, 40], t: "إرث", m: "فلسفي", c: ["أثرٌ خالد — ذكرى تتجاوزك.", "عمرٌ طويل — كمٌّ لكن بلا أثر."] },
  { o: ["أن تختار العدالة", "أن تختار الرحمة"], s: [45, 55], t: "قيم", m: "فلسفي", c: ["عدالةٌ — نظامٌ صارم.", "رحمةٌ — إنسانيةٌ دافئة."] },
  { o: ["أن تصل للكمال", "أن تتطور باستمرار"], s: [30, 70], t: "فلسفي", m: "فلسفي", c: ["كمالٌ — نهايةٌ ساكنة.", "تطوّرٌ — رحلةٌ لا تنتهي."] },
  { o: ["أن تحب الفن", "أن تحب العلم"], s: [40, 60], t: "معرفة", m: "فلسفي", c: ["فنٌّ — روحٌ تعبّر عن نفسها.", "علمٌ — عقلٌ يكتشف الحقيقة."] },
  { o: ["أن تكون محبوباً", "أن تحب"], s: [50, 50], t: "مشاعر", m: "فلسفي", c: ["محبوبٌ — دفءٌ تستقبله.", "تحبُّ — دفءٌ تمنحه."] },
  { o: ["أن تعيش بحرية", "أن تعيش بأمان"], s: [55, 45], t: "مجتمع", m: "فلسفي", c: ["حريةٌ — مغامرةٌ بلا شبكة أمان.", "أمانٌ — استقرارٌ لكنه مقيّد."] },
  { o: ["أن تعرف الحقيقة", "أن تعرف السعادة"], s: [50, 50], t: "فلسفي", m: "فلسفي", c: ["حقيقةٌ — وضوحٌ قاسٍ.", "سعادةٌ — نعيمٌ قد يكون وهماً."] },
  { o: ["أن تكون عقلانياً", "أن تكون عاطفياً"], s: [50, 50], t: "فلسفي", m: "فلسفي", c: ["عقلانيةٌ — قراراتٌ مدروسة.", "عاطفةٌ — حياةٌ ملونة."] },
  { o: ["أن تكون منظماً", "أن تكون عفوياً"], s: [55, 45], t: "شخصية", m: "فلسفي", c: ["نظامٌ — إنتاجيةٌ مضمونة.", "عفويةٌ — مفاجآتٌ ممتعة."] },
  { o: ["أن تحلم بحياة أفضل", "أن تقبل بحياتك كما هي"], s: [65, 35], t: "فلسفي", m: "فلسفي", c: ["حلمٌ — أملٌ يشدّك للأمام.", "قَبولٌ — سلامٌ مع الواقع."] },
  { o: ["أن تكون منظّراً عظيماً", "أن تكون منفّذاً عادياً"], s: [40, 60], t: "حياة", m: "فلسفي", c: ["نظرياتٌ — أفكارٌ عظيمة.", "تنفيذٌ — أثرٌ ملموس."] },
];

/* ====== مواضيع وكلمات مفتاحية لتوليد أسئلة لو خيروك بالذكاء الاصطناعي ======
   كل موضوع يضم كلمات مفتاحية يدور حولها السؤال.
*/
const LOY_TOPIC_KEYWORDS = {
  "أخلاق": ["الأمانة", "الصدق", "الوفاء", "الإخلاص", "العدل", "الرحمة", "الإيثار", "التسامح", "الكرم", "الأمانة العلمية"],
  "حياة يومية": ["النوم", "الأكل", "العمل", "الاسترخاء", "التنزه", "التسوق", "السفر", "القراءة", "مشاركة الوقت", "الروتين"],
  "طعام": ["البيتزا", "البرجر", "الشوكولاتة", "الآيس كريم", "الشاي", "القهوة", "الحار", "الحلو", "الملح", "الفاكهة"],
  "حيوانات": ["الكلاب", "القطط", "الأسود", "النمور", "الخيول", "الطيور", "الأسماك", "الزواحف", "الحشرات", "الدلافين"],
  "خيال": ["السفر عبر الزمن", "الطيران", "التخفي", "قراءة الأفكار", "القوى الخارقة", "العوالم الموازية", "التنين", "الجن", "السحر", "الأبطال"],
  "مشاعر": ["الحب", "الكراهية", "الغضب", "الفرح", "الحزن", "الخوف", "الشجاعة", "الحسد", "الفخر", "الشفقة"],
  "هوية": ["الاسم", "الوجه", "العمر", "الجنسية", "المهنة", "الشخصية", "الماضي", "المستقبل", "الذكريات", "الأحلام"],
  "قدرات": ["الذكاء", "القوة", "السرعة", "الجمال", "الثروة", "الشهرة", "الحكمة", "الفن", "الموسيقى", "الرياضة"],
  "فضاء": ["القمر", "المريخ", "النجوم", "المجرات", "الثقوب السوداء", "المذنبات", "الكواكب", "الشمس", "رحلات الفضاء", "كائنات فضائية"],
  "مجتمع": ["العائلة", "الأصدقاء", "المدرسة", "العمل", "الجيران", "الحكومة", "القوانين", "التقاليد", "الثقافة", "الإعلام"],
  "تكنولوجيا": ["الإنترنت", "الهواتف", "الذكاء الاصطناعي", "الروبوتات", "السيارات الذكية", "الألعاب", "الواقع الافتراضي", "وسائل التواصل", "الحوسبة", "التشفير"],
  "طبيعة": ["الجبال", "الأنهار", "البحار", "الغابات", "الصحاري", "الشلالات", "الأمطار", "الثلوج", "الشمس", "القمر"],
  "فنون": ["الرسم", "الموسيقى", "الرقص", "التمثيل", "الكتابة", "النحت", "التصوير", "السينما", "المسرح", "الأدب"],
  "رياضة": ["كرة القدم", "كرة السلة", "السباحة", "الركض", "الملاكمة", "التنس", "الشطرنج", "اليوغا", "الدراجات", "تسلق الجبال"],
  "حياة كريمة": ["الصحة", "المال", "الوقت", "الحرية", "الأمان", "التعليم", "السكن", "العائلة", "الأصدقاء", "السلام"],
  "مواقف محرجة": ["التعرّف بشخص جديد", "خطاب أمام جمع", "مقابلة عمل", "حضور جنازة", "حفل زفاف", "خطأ في عام", "نسيان اسم", "الوقوع في مكان عام", "البكاء في مكان عام", "الضحك في وقت غير مناسب"],
  "خيارات صعبة": ["إنقاذ حياة", "اختيار مهنة", "اختيار شريك", "مكان السكن", "تغيير اسم", "الهجرة", "التخلي عن صديق", "تحمّل المسؤولية", "اتخاذ قرار مصيري", "الاعتراف بالخطأ"],
  "خيال علمي": ["استنساخ البشر", "ذكاء اصطناعي واعٍ", "سكن المريخ", "تعديل الجينات", "آلة الزمن", "السيبرغان", "العوالم الافتراضية", "تنزيل الوعي", "خلايا لا تشيخ", "السفر بين النجوم"],
  "علاقات": ["الصداقة", "الحب", "الزواج", "الطلاق", "الخيانة", "الوفاء", "الغيرة", "التسامح", "البعد", "المصالحة"],
  "أحلام": ["الحلم الذهبي", "الكابوس", "الحلم المتكرر", "الحلم الجماعي", "التحكم بالأحلام", "نسيان الأحلام", "تحقيق الحلم", "الأحلام المستقبلية", "الإلهام", "الخوف من المستقبل"],
};

const LOY_MOODS = ["مضحك", "غريب", "صعب", "فلسفي"];

/* ====== حالة لعبة لو خيروك ====== */
const loyState = {
  active: false,
  totalQuestions: 10,    // 0 = لا نهائي
  currentIndex: 0,
  currentQuestion: null,
  answered: false,
  selectedOption: null,
  usedBankIndices: new Set(),   // لتفادي تكرار أسئلة البنك
  usedTopicKeywords: new Set(), // لتفادي تكرار تركيبات AI
  nextQuestionPromise: null,  // 🚀 Prefetch: وعد السؤال التالي المُجهّز مسبقاً
  // منع تداخل طلبات تعليق الذكاء الاصطناعي عند الانتقال السريع بين الأسئلة
  commentToken: 0,
};

/* ====== تهيئة منتقي عدد الأسئلة ====== */
let loyCountSelectorInitialized = false;
function initLoyCountSelector() {
  const container = document.getElementById("loy-count-selector");
  if (!container) return;
  // تجنّب إضافة المستمعين أكثر من مرة
  if (loyCountSelectorInitialized) return;
  loyCountSelectorInitialized = true;
  container.querySelectorAll(".rp-option").forEach(btn => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".rp-option").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}

function getLoySelectedCount() {
  const container = document.getElementById("loy-count-selector");
  if (!container) return 10;
  const active = container.querySelector(".rp-option.active");
  if (!active) return 10;
  return parseInt(active.getAttribute("data-value")) || 0;
}

/* ====== بدء لعبة لو خيروك ====== */
function startLoyGame() {
  // تأكد من تهيئة منتقي عدد الأسئلة (في حال استدعيت من شاشة النهاية مباشرة)
  initLoyCountSelector();

  loyState.active = true;
  loyState.nextQuestionPromise = null;  // 🚀 إعادة ضبط Prefetch
  loyState.totalQuestions = getLoySelectedCount();
  loyState.currentIndex = 0;
  loyState.currentQuestion = null;
  loyState.answered = false;
  loyState.selectedOption = null;
  // احتفظ بـ usedBankIndices عبر الجلسة (نفس الجلسة = بنك غير متكرر)
  // أما usedTopicKeywords فأعد ضبطها لكل جولة جديدة

  showScreen("loy-playing");
  document.getElementById("loy-reveal-panel").style.display = "none";
  document.getElementById("loy-actions").style.display = "none";
  document.getElementById("loy-loading-next").style.display = "none";

  loadLoyQuestion();
}

/* ====== تحميل سؤال لو خيروك ====== */
/* ====== دالة مساعدة: الحصول على سؤال لو خيروك واحد (AI أو بنك) ====== */
async function getOneLoyQuestion() {
  // جرّب AI أولاً إن وُجد مفتاح
  let question = null;
  if (state.apiKey) {
    question = await fetchLoyQuestionFromAI();
  }
  // وإلا استخدم بنك الأسئلة (مع استبعاد المستخدم)
  if (!question) {
    question = pickLoyBankQuestion();
  }
  return question;
}

/* ====== تجهيز سؤال لو خيروك التالي مسبقاً ====== */
function prefetchNextLoyQuestion() {
  const nextIndex = loyState.currentIndex + 1;
  // لا تُجهّز ما بعد السؤال الأخير
  if (loyState.totalQuestions > 0 && nextIndex >= loyState.totalQuestions) {
    loyState.nextQuestionPromise = null;
    return;
  }
  if (loyState.nextQuestionPromise) return; // تجهيز جارٍ بالفعل
  loyState.nextQuestionPromise = getOneLoyQuestion();
  console.log(`[Prefetch-LOY] 🚀 بدء تجهيز سؤال لو خيروك التالي في الخلفية`);
}

async function loadLoyQuestion() {
  loyState.answered = false;
  loyState.selectedOption = null;
  // زيادة رمز الطلب لإلغاء أي تعليق AI سابق قيد التحميل
  loyState.commentToken++;
  document.getElementById("loy-reveal-panel").style.display = "none";
  document.getElementById("loy-actions").style.display = "none";
  document.getElementById("loy-loading-next").style.display = "";

  // أعد ضبط الخيارات
  const grid = document.getElementById("loy-options-grid");
  if (grid) { grid.innerHTML = ""; grid.style.display = ""; grid.classList.remove("opts-revealed"); }

  // أعد ضبط تلميح الموضوع
  const hint = document.getElementById("loy-topic-hint");
  if (hint) hint.textContent = "—";

  // تحقق من شرط النهاية (للوضع المحدود)
  if (loyState.totalQuestions > 0 && loyState.currentIndex >= loyState.totalQuestions) {
    endLoyGame();
    return;
  }

  // حدّث العدّاد
  if (loyState.totalQuestions > 0) {
    document.getElementById("loy-question-counter").textContent = `${loyState.currentIndex + 1}/${loyState.totalQuestions}`;
  } else {
    document.getElementById("loy-question-counter").textContent = `${loyState.currentIndex + 1}`;
  }

  // 🚀 Prefetch: إن كان هناك سؤال مُجهّز مسبقاً انتظره، وإلا اطلبه الآن
  let question;
  if (loyState.nextQuestionPromise) {
    console.log(`[Prefetch-LOY] ⚡ استخدام السؤال المُجهّز مسبقاً`);
    question = await loyState.nextQuestionPromise;
    loyState.nextQuestionPromise = null;
  } else {
    question = await getOneLoyQuestion();
  }

  loyState.currentQuestion = question;
  renderLoyQuestion(question);
  document.getElementById("loy-loading-next").style.display = "none";

  // 🚀 ابدأ تجهيز السؤال التالي فوراً في الخلفية
  prefetchNextLoyQuestion();
}

/* ====== اختيار سؤال من البنك غير مستخدم ====== */
function pickLoyBankQuestion() {
  // ابحث عن فهارس غير مستخدمة
  const availableIndices = [];
  for (let i = 0; i < LOY_BANK.length; i++) {
    if (!loyState.usedBankIndices.has(i)) availableIndices.push(i);
  }

  // إذا استُنفد البنك كله، أعد ضبط السجل لاستئناف التكرار
  if (availableIndices.length === 0) {
    loyState.usedBankIndices.clear();
    for (let i = 0; i < LOY_BANK.length; i++) availableIndices.push(i);
  }

  const idx = availableIndices[Math.floor(Math.random() * availableIndices.length)];
  loyState.usedBankIndices.add(idx);

  const item = LOY_BANK[idx];
  return {
    prompt: "", // السؤال مضمن في الخيارات (لا يوجد نص منفصل)
    options: item.o.slice(),
    percentages: item.s.slice(),
    topic: item.t,
    mood: item.m,
    // تعليقات احتياطيةّ لكل خيار (تُستخدم إذا لم يتوفر مفتاح AI أو فشل الطلب)
    comments: Array.isArray(item.c) && item.c.length === 2 ? item.c.slice() : null,
    source: "bank",
  };
}

/* ====== استدعاء AI لتوليد سؤال لو خيروك ====== */
async function fetchLoyQuestionFromAI() {
  if (!state.apiKey) return null;

  const topicNames = Object.keys(LOY_TOPIC_KEYWORDS);
  // حاول عدة مرات اختيار (موضوع، كلمة) غير مستخدمة
  let topic = topicNames[Math.floor(Math.random() * topicNames.length)];
  let keyword = "";
  for (let attempt = 0; attempt < 20; attempt++) {
    topic = topicNames[Math.floor(Math.random() * topicNames.length)];
    const kws = LOY_TOPIC_KEYWORDS[topic];
    keyword = kws[Math.floor(Math.random() * kws.length)];
    if (!loyState.usedTopicKeywords.has(topic + "::" + keyword)) break;
  }

  // اختر مزاجاً عشوائياً
  const mood = LOY_MOODS[Math.floor(Math.random() * LOY_MOODS.length)];

  const systemPrompt = "أنت مولّد أسئلة للعبة 'لو خيروك' العربية. كل سؤال عبارة عن اختيار بين خيارين فقط، يُقرآن طبيعياً بعد عبارة 'لو خيروك'. مثال: لو خيروك «أن تعيش بدون إنترنت» أو «أن تعيش بدون هاتف». لا تضع نصاً سابقاً للسؤال — فقط الخياران. أعطِ النتيجة بصيغة JSON صارمة فقط.";

  const userPrompt = `ولّد سؤالاً واحداً للعبة "لو خيروك" يدور تحديداً حول الكلمة المفتاحية: «${keyword}»
ضمن مجال: «${topic}»
بمزاج: ${mood}.

الشروط:
- الخياران فقط يُذكران، بدون نص سؤال سابق (لا تضع "لو خيروك بين..." داخل الإجابة).
- كل خيار عبارة تامة تبدأ بـ "أن..." (مثل: "أن تعيش بدون إنترنت"، "أن تطير كالطائر").
- الخياران متقاربان في الجاذبية، لا يوجد خيار "صحيح".
- أضف مصفوفة "percentages" تمثّل تقديراً لنسبة اختيار الناس لكل خيار، بحيث يكون مجموعها 100.
- النسب ينبغي أن تعكس رأياً عاماً معقولاً (لا تجعلها 50/50 دائماً).
- أضف حقل "topic" يعكس الموضوع وحقل "mood" يعكس المزاج.
- اللغة بسيطة ومفهومة مع لمسة من المرح.
- تجنّب المواضيع الدينية أو السياسية الحساسة.
- خياران فقط (2)، لا أكثر.

أعطِ النتيجة بصيغة JSON فقط بالشكل:
{"options":["أن...","أن..."],"percentages":[60,40],"topic":"الموضوع","mood":"${mood}"}`;

  // لا نحتاج AbortController هنا — callOpenRouterWithFallback يُدارة المهلة داخلياً لكل مفتاح

  try {
    const { data } = await callOpenRouterWithFallback({
      body: {
        // النموذج يُحدد تلقائياً داخل callOpenRouterWithFallback (flash-lite → flash)
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 1.0,
        max_tokens: 500,
      },
      // لا signal — callOpenRouterWithFallback يُدارة المهلة بنفسه
      referer: "https://who-wants-to-be-a-millionaire.local",
      title: "Arabic Would You Rather Game",
    });

    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) return null;

    // استخدام المحلّل المتين الذي يُصلح JSON المقتطع
    const obj = robustJSONParse(text);
    if (!obj) {
      console.warn("[AI-LOY] فشل تحليل JSON من استجابة الذكاء الاصطناعي:", text.slice(0, 100));
      return null;
    }

    // تحقق من صحة البيانات (خياران فقط)
    if (
      Array.isArray(obj.options) && obj.options.length === 2 &&
      obj.options.every(o => typeof o === "string" && o.trim().length > 0) &&
      Array.isArray(obj.percentages) && obj.percentages.length === 2
    ) {
      // تأكد أن مجموع percentages = 100 تقريباً
      let sum = obj.percentages.reduce((a, b) => a + Number(b), 0);
      if (sum <= 0) {
        obj.percentages = [50, 50];
      } else if (Math.abs(sum - 100) > 2) {
        obj.percentages = obj.percentages.map(p => Math.round((Number(p) / sum) * 100));
        sum = obj.percentages.reduce((a, b) => a + b, 0);
        if (sum !== 100) obj.percentages[0] += (100 - sum);
      }

      loyState.usedTopicKeywords.add(topic + "::" + keyword);

      return {
        prompt: "",
        options: obj.options.map(x => x.trim()),
        percentages: obj.percentages.map(Number),
        topic: typeof obj.topic === "string" ? obj.topic.trim() : topic,
        mood: typeof obj.mood === "string" ? obj.mood.trim() : mood,
        source: "ai",
      };
    }
    return null;
  } catch (err) {
    console.warn("فشل توليد سؤال لو خيروك بالذكاء الاصطناعي:", err.message);
    return null;
  }
}

/* ====== عرض سؤال لو خيروك ====== */
function renderLoyQuestion(q) {
  // عرض تلميح الموضوع والمزاج تحت العنوان
  const hint = document.getElementById("loy-topic-hint");
  if (hint) {
    const parts = [];
    if (q.topic) parts.push(q.topic);
    if (q.mood) parts.push(q.mood);
    if (q.source === "ai") parts.push("🤖 AI");
    else parts.push("📚 بنك");
    hint.textContent = parts.join(" • ");
  }

  // لوّن خلفية العنوان الضخم حسب المزاج
  const bigTitle = document.querySelector(".loy-big-title");
  if (bigTitle) {
    bigTitle.classList.remove("mood-mafhik", "mood-gharib", "mood-saab", "mood-falsafi");
    if (q.mood === "مضحك") bigTitle.classList.add("mood-mafhik");
    else if (q.mood === "غريب") bigTitle.classList.add("mood-gharib");
    else if (q.mood === "صعب") bigTitle.classList.add("mood-saab");
    else if (q.mood === "فلسفي") bigTitle.classList.add("mood-falsafi");
  }

  const grid = document.getElementById("loy-options-grid");
  grid.innerHTML = "";
  // أضف فئة عدد الخيارات للتحكم بالتنسيق
  grid.classList.remove("opts-2", "opts-3", "opts-many");
  if (q.options.length === 2) grid.classList.add("opts-2");
  else if (q.options.length === 3) grid.classList.add("opts-3");
  else grid.classList.add("opts-many");
  grid.classList.add("opts-revealed");

  const showOrDivider = q.options.length === 2; // "أو" فقط بين خيارين

  q.options.forEach((opt, i) => {
    const cardEl = document.createElement("button");
    cardEl.className = "loy-option-card";
    cardEl.type = "button";
    cardEl.style.setProperty("--anim-i", i);
    cardEl.innerHTML = `
      <span class="loy-option-card-icon">${["🅰", "🅱", "🅲", "🅳"][i] || (i + 1)}</span>
      <span class="loy-option-card-text">${escapeHtml(opt)}</span>
      <span class="loy-option-card-percent" style="display:none;">0%</span>
    `;
    cardEl.onclick = () => loyAnswer(i);
    grid.appendChild(cardEl);

    // أضف فاصل "أو" بين البطاقات (فقط في حالة خيارين)
    if (showOrDivider && i < q.options.length - 1) {
      const orDivider = document.createElement("div");
      orDivider.className = "loy-or-divider";
      orDivider.innerHTML = '<span class="loy-or-text">أو</span>';
      grid.appendChild(orDivider);
    }
  });
}

/* ====== الإجابة عن سؤال لو خيروك ====== */
function loyAnswer(index) {
  if (loyState.answered) return;
  loyState.answered = true;
  loyState.selectedOption = index;

  const q = loyState.currentQuestion;
  if (!q) return;

  // علّم البطاقات
  const cards = document.querySelectorAll("#loy-options-grid .loy-option-card");
  cards.forEach((btn, i) => {
    btn.disabled = true;
    if (i === index) btn.classList.add("selected");
    else btn.classList.add("not-selected");
  });

  // أخفِ كلمة "أو" بعد الإجابة لتنظيف العرض
  document.querySelectorAll("#loy-options-grid .loy-or-divider").forEach(el => el.classList.add("or-faded"));

  // عرض النسب المئوية بتحريك
  cards.forEach((btn, i) => {
    const percentEl = btn.querySelector(".loy-option-card-percent");
    percentEl.style.display = "";
    const target = q.percentages[i] || 0;
    btn.classList.add("reveal");

    // تحريك العدّاد
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 25));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      percentEl.textContent = current + "%";
    }, 30);

    // قوّى شريط النسبة داخل البطاقة
    btn.style.setProperty("--percent", target + "%");
  });

  // صوت
  sounds.select();

  // اعرض لوحة النتائج مع حالة تحميل التعليق
  const reveal = document.getElementById("loy-reveal-panel");
  reveal.style.display = "";
  const chosenText = q.options[index];
  const chosenPct = q.percentages[index] || 0;
  const otherText = q.options[1 - index];
  const otherPct = q.percentages[1 - index] || 0;
  reveal.innerHTML = `
    <div class="loy-reveal-card">
      <div class="loy-reveal-row">
        <span class="loy-reveal-label">🎯 اختيارك:</span>
        <span class="loy-reveal-value">${escapeHtml(chosenText)}</span>
      </div>
      <div class="loy-reveal-row">
        <span class="loy-reveal-label">📊 نسبة من وافقوك:</span>
        <span class="loy-reveal-value">${chosenPct}% من الناس</span>
      </div>
      <div class="loy-reveal-row loy-comment-row">
        <div class="loy-reveal-comment-wrap" id="loy-comment-wrap">
          <div class="loy-reveal-comment-loading">
            <span class="loy-comment-spinner"></span>
            <span>🤖 الذكاء الاصطناعي يحلّل اختيارك…</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // اعرض زر التالي
  document.getElementById("loy-actions").style.display = "";
  const nextBtn = document.getElementById("loy-next-btn");
  // في الوضع اللامتناهي: استمر دائماً
  if (loyState.totalQuestions === 0) {
    nextBtn.textContent = "السؤال التالي ←";
  } else if (loyState.currentIndex + 1 >= loyState.totalQuestions) {
    nextBtn.textContent = "إنهاء الجولة 🏁";
  } else {
    nextBtn.textContent = "السؤال التالي ←";
  }

  // اطلب تعليق الذكاء الاصطناعي (مع الاحتفاظ برمز الطلب لمنع التداخل)
  const myToken = loyState.commentToken;
  loadLoyAiComment(q, index, chosenText, otherText, chosenPct, myToken);
}

/* ====== تحميل تعليق الذكاء الاصطناعي للاختيار ====== */
async function loadLoyAiComment(q, selectedIndex, chosenText, otherText, chosenPct, token) {
  const wrap = document.getElementById("loy-comment-wrap");
  // تعليق احتياطي فوري من البنك (إن وُجد) — يُعرض ريثما يصل الردّ من AI
  let fallbackText = null;
  if (q.comments && q.comments[selectedIndex]) {
    fallbackText = q.comments[selectedIndex];
  } else {
    fallbackText = getLoyCommentFallback(chosenPct);
  }

  // إن لم يوجد مفتاح API، استخدم التعليق الاحتياطي مباشرة
  if (!state.apiKey) {
    renderLoyComment(fallbackText, "fallback");
    return;
  }

  // جرّب الذكاء الاصطناعي
  const aiComment = await fetchLoyCommentFromAI(chosenText, otherText, chosenPct, q.topic, q.mood);
  // تحقق من أن المستخدم لم ينتقل لسؤال آخر
  if (loyState.commentToken !== token) return;
  if (aiComment && aiComment.trim().length > 0) {
    renderLoyComment(aiComment.trim(), "ai");
  } else {
    renderLoyComment(fallbackText, "fallback");
  }
}

/* ====== رسم تعليق في لوحة النتائج ====== */
function renderLoyComment(text, source) {
  const wrap = document.getElementById("loy-comment-wrap");
  if (!wrap) return;
  const badge = source === "ai" ? "🤖 تعليق الذكاء الاصطناعي" : "💬 تعليق";
  wrap.innerHTML = `
    <div class="loy-reveal-comment ${source === "ai" ? "is-ai" : "is-fallback"}">
      <span class="loy-comment-badge">${badge}</span>
      <span class="loy-comment-text">${escapeHtml(text)}</span>
    </div>
  `;
}

/* ====== استدعاء AI لتوليد تعليق مخصّص للاختيار ====== */
async function fetchLoyCommentFromAI(chosenText, otherText, chosenPct, topic, mood) {
  if (!state.apiKey) return null;

  const systemPrompt =
    "أنت معلّق ذكي لطيف في لعبة 'لو خيروك' العربية. مهمتك كتابة تعليق قصير (جملة أو جملتان بحد أقصى 28 كلمة) عن خيار اختاره اللاعب لتوّه. التعليق بالعربية الفصحى المبسّطة، فيه لمسة من المرح والذكاء، ويتناول الخيار المُختار مباشرة. لا تذكر نسب التصويت ولا تقل إن الخيار صحيح أو خاطئ. لا تذكر 'لو خيروك' في النص. أعطِ التعليق فقط بدون مقدمات أو علامات اقتباس.";

  const userPrompt = `اللاعب اختار:
«${chosenText}»
بدلاً من:
«${otherText}»

معلومات إضافية:
- الموضوع: ${topic || "عام"}
- المزاج: ${mood || "عام"}
- نسبة من وافقوه: ${chosenPct}%

اكتب تعليقاً واحداً قصيراً (جملة أو جملتان) عن اختياره. اجعله لطيفاً، فيه لمسة مرح، ولا يتجاوز 28 كلمة.`;

  // لا نحتاج AbortController هنا — callOpenRouterWithFallback يُدارة المهلة داخلياً

  try {
    const { data } = await callOpenRouterWithFallback({
      body: {
        // النموذج يُحدد تلقائياً داخل callOpenRouterWithFallback (flash-lite → flash)
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 1.1,
        max_tokens: 180,
      },
      // لا signal — callOpenRouterWithFallback يُدارة المهلة بنفسه
      referer: "https://who-wants-to-be-a-millionaire.local",
      title: "Arabic Would You Rather Game",
    });

    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) return null;

    // تنظيف بسيط: إزالة علامات الاقتباس المحيطة، والأسطر الجديدة الزائدة
    let clean = text.replace(/^["'«»\s]+|["'«»\s]+$/g, "").replace(/\s+/g, " ").trim();
    // إزالة أي مقدمات شائعة
    clean = clean.replace(/^(تعليق|التعليق|الرد|الجواب)\s*[:：-]\s*/i, "");
    if (clean.length === 0) return null;
    return clean;
  } catch (err) {
    console.warn("فشل توليد تعليق لو خيروك بالذكاء الاصطناعي:", err.message);
    return null;
  }
}

/* ====== تعليق احتياطي حسب النسبة (يُستخدم عند غياب AI أو فشله) ====== */
function getLoyCommentFallback(percent) {
  if (percent >= 80) return "أنت من الأغلبية الساحقة! 🙌";
  if (percent >= 60) return "اختيار شائع جداً 👍";
  if (percent >= 45) return "اختيارك شائع نسبياً 🙂";
  if (percent >= 30) return "اختيار أقلية لا بأس بها 🤔";
  if (percent >= 15) return "اختيار نادر! أنت مختلف 🌟";
  return "اختيار فريد جداً! أنت استثنائي ✨";
}

/* ====== الانتقال للسؤال التالي ====== */
function loyNext() {
  loyState.currentIndex++;
  if (loyState.totalQuestions > 0 && loyState.currentIndex >= loyState.totalQuestions) {
    endLoyGame();
  } else {
    loadLoyQuestion();
  }
}

/* ====== إنهاء لعبة لو خيروك ====== */
function endLoyGame() {
  loyState.active = false;
  loyState.nextQuestionPromise = null;  // 🚀 إعادة ضبط Prefetch

  document.getElementById("loy-end-icon").textContent = "🎉";
  document.getElementById("loy-end-title").textContent = "انتهت الجولة!";

  // لا يوجد نظام نقاط — فقط إجمالي عدد الأسئلة التي أجاب عنها اللاعب
  const subtitle = `أجبت عن ${loyState.currentIndex} سؤالاً من أسئلة «لو خيروك». شكراً للعبك! 🌟`;
  document.getElementById("loy-end-subtitle").textContent = subtitle;

  sounds.win();
  showScreen("loy-end");
}

/* ====== الخروج من لعبة لو خيروك ====== */
function exitLoyGame() {
  if (!confirm("هل تريد الخروج من اللعبة؟ سيتم فقدان تقدمك في هذه الجولة.")) return;
  loyState.active = false;
  showScreen("menu");
}

/* ====== ربط showScreen بلعبة لو خيروك ====== */
const originalShowScreenLoy = showScreen;
showScreen = function(name) {
  originalShowScreenLoy(name);
  if (name === "loy-intro") {
    initLoyCountSelector();
    updateLoyApiKeyCard();
  }
};

/* ====== بطاقة توليد الأسئلة بالذكاء الاصطناعي (داخل شاشة لو خيروك) ======
   تظهر فقط عندما لا يكون هناك مفتاح API محفوظ، لتذكير المستخدم بحفظ مفتاح.
   بمجرد حفظ المفتاح، تختفي البطاقة تلقائياً ويظهر تلميح التأكيد. */
function updateLoyApiKeyCard() {
  const card = document.getElementById("loy-ai-key-card");
  const hint = document.getElementById("loy-intro-hint");
  if (!card) return;
  if (state.apiKey && state.apiKey.trim().length > 0) {
    // مفتاح محفوظ → أخفِ البطاقة وأظهر تلميح تأكيد
    card.style.display = "none";
    if (hint) {
      hint.textContent = "✓ مفتاح AI محفوظ — ستُولَّد الأسئلة بالذكاء الاصطناعي بشكل افتراضي مع بنك احتياطي.";
      hint.style.color = "#10b981";
    }
  } else {
    // لا يوجد مفتاح → أظهر البطاقة، والتلميح يبقى مختصراً كسياق
    card.style.display = "block";
    if (hint) {
      hint.textContent = "💡 ستُستخدم أسئلة البنك المدمج (100 سؤال متنوع). أدخل المفتاح بالأسفل لأسئلة لا نهائية بالذكاء الاصطناعي.";
      hint.style.color = "rgba(255,255,255,0.6)";
    }
  }
}

function handleSaveLoyApiKey() {
  const input = document.getElementById("loy-api-key-input");
  const status = document.getElementById("loy-api-status");
  if (!input || !status) return;
  const key = input.value.trim();
  if (!key) {
    status.textContent = "⚠ الرجاء إدخال مفتاح صحيح أولاً";
    status.style.color = "#ef4444";
    return;
  }
  // استخدم نفس دالة الحفظ الموحدة المستخدمة في الإعدادات
  saveApiKeyToStorage(key);
  input.value = "";
  status.textContent = "✓ تم حفظ المفتاح بنجاح! سيُستخدم الذكاء الاصطناعي في الأسئلة القادمة.";
  status.style.color = "#10b981";
  sounds.correct();
  // بعد فترة وجيزة، أخفِ البطاقة بالكامل لأن المفتاح أصبح محفوظاً
  setTimeout(() => {
    updateLoyApiKeyCard();
    status.textContent = "";
  }, 1800);
}

/* ====== تهيئة لعبة لو خيروك عند بدء التطبيق ======
   ملاحظة: لا نعيد تعريف init() لأن window.addEventListener("DOMContentLoaded", init)
   يحتفظ بالمرجع الأصلي. بدلاً من ذلك نُهيّئ منتقي عدد الأسئلة عند فتح شاشة الترحيب.
*/
// التهيئة تتم داخل showScreen("loy-intro") عبر initLoyCountSelector()



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

