// ===== TRANSLATIONS =====
const T = {
  az: {
    nav_home:"Ana Səhifə", nav_services:"Xidmətlər", nav_doctors:"Həkimlər",
    nav_schedule:"Qəbul", nav_gallery:"Qalereya", nav_reviews:"Rəylər",
    nav_book:"Randevu", nav_contact:"Əlaqə",
    hero_title:"Sağlam Gülüşlər,<br>Gözəl Həyat",
    hero_subtitle:"Bakıda peşəkar stomatoloji xidmətlər",
    hero_cta:"Randevu Al", hero_cta2:"Həkimlər",
    services_title:"Xidmətlərimiz", services_subtitle:"Hər bir xəstəyə fərdi yanaşma",
    service1_title:"Ümumi Stomatologiya",
    service1_desc:"Diş müalicəsi, dolgu, çıxarış, profilaktika və diş gigiyenası",
    service2_title:"Ortodontiya",
    service2_desc:"Qapaqdüzəltmə, breket sistemləri, ağız boşluğunun müalicəsi",
    service3_title:"Estetik Stomatologiya",
    service3_desc:"Ağardma, furnirlər, zirconyum taclar, gülüş dizaynı",
    doctors_title:"Həkimlərimiz",
    dr_aygun_name:"Dr. Aygün Rzayeva", dr_aygun_title:"Stomatoloq & Ortodont",
    dr_aygun_bio:"Azərbaycan Tibb Universitetinin məzunu olan Dr. Aygün Rzayeva stomatologiya və ortodontiya sahəsinin mütəxəssisidir. Ailə yanaşması və dəqiq planlamayla hər bir xəstəyə sağlam, estetik gülüş bəxş edir. ✨",
    dr_aygun_edu:"Azərbaycan Tibb Universiteti", dr_aygun_spec:"Stomatologiya & Ortodontiya",
    dr_elcan_name:"Dr. Elcan Həmidli", dr_elcan_title:"Estetik Stomatoloq",
    dr_elcan_bio:"Dr. Elcan Həmidli estetik stomatologiya sahəsinin mütəxəssisidir. \"Some more smile\" fəlsəfəsiylə hər gülüşü bir sənət əsərinə çevirir.",
    dr_elcan_spec:"Estetik Stomatologiya",
    schedule_title:"Qəbul Saatları",
    schedule_subtitle:"Hanifa Əlasgarov küç. 67, Bakı",
    schedule_day_col:"Gün", schedule_hours_col:"Qəbul vaxtı",
    schedule_morning:"Günortaya qədər", schedule_afternoon:"Günortadan sonra",
    schedule_closed:"İstirahət",
    mon:"Bazar ertəsi", tue:"Çərşənbə axşamı", wed:"Çərşənbə",
    thu:"Cümə axşamı", fri:"Cümə", sat:"Şənbə", sun:"Bazar",
    gallery_title:"Qalereya", gallery_subtitle:"Müalicə öncəsi & sonrası", gallery_load_more:"Daha çox göstər",
    reviews_title:"Xəstə Rəyləri", reviews_subtitle:"Xəstələrimizin həqiqi rəyləri", reviews_load_more:"Daha çox göstər",
    faq_title:"Tez-tez Soruşulan Suallar", faq_subtitle:"Cavabını axtardığınız sual burada ola bilər",
    nav_faq:"FAQ",
    faq1_q:"Breket müalicəsi nə qədər müddət davam edir?",
    faq1_a:"Hər xəstə üçün fərqli olur — orta hesabla 12-24 ay. Diş sıxlığının dərəcəsi, çənənin vəziyyəti və müalicəyə riayət bu müddəti müəyyənləşdirir.",
    faq2_q:"Breket taxmaq ağrılıdırmı?",
    faq2_a:"Qurulduqdan sonra ilk 3-5 gün yüngül həssaslıq olur — bu tamamilə normaldır. Sonrakı ziyarətlərdə bu hiss azalır. Əksər xəstələrimiz gündəlik həyatlarını heç bir problem olmadan davam etdirir.",
    faq3_q:"İmplant əməliyyatı nə qədər çəkir?",
    faq3_a:"Bir implantın yerləşdirilməsi 30-60 dəqiqə çəkir, lokal anesteziya altında aparılır. Sağalma müddəti 2-4 ay arasında dəyişir. Müalicə boyu sizi izləyirik.",
    faq4_q:"Diş ağartmanın nəticəsi nə qədər davam edir?",
    faq4_a:"Düzgün qulluqla 1-2 il. Qəhvə, çay, siqaret kimi maddələrdən qaçınmaq nəticənin ömrünü uzadır. Zəruri hallarda qısa seansla yeniləmə mümkündür.",
    faq5_q:"Vinir nədir, kimə uyğundur?",
    faq5_a:"Vinirlər diş üzərinə yapışdırılan ultranazik keramika lövhəciklərdir. Rəng, forma və ölçü narahatlıqlarını həll edir. 1-2 ziyarətdə hazırlanır, ağrısız prosedurdur.",
    faq6_q:"Uşaqlar üçün ortodontiyaya nə vaxt başlamaq lazımdır?",
    faq6_a:"İlk ortodontik müayinəni 6-7 yaşda keçirməyi tövsiyyə edirik. Erkən diaqnostika bir çox problemi vaxtında aşkarlamağa imkan verir. Aktiv müalicəyə isə adətən 10-13 yaşda başlanır.",
    faq7_q:"Zirkonium tac adi tacdan nə ilə fərqlənir?",
    faq7_a:"Zirkonium metaldan fərqli olaraq şəffafdır — natural diş görünüşü verir. Daha güclü, bioloji cəhətdən uyğun və allergen deyildir. Estetik üstünlüyü açıq-aşkardır.",
    faq8_q:"Randevu necə ala bilərəm?",
    faq8_a:"Saytdakı \"Randevu Al\" formasını doldurun — ya da +994 50 436 63 66 nömrəsinə zəng edin, yaxud WhatsApp vasitəsilə yazın. Ən qısa zamanda sizinlə əlaqə saxlayacağıq.",
    faq9_q:"Ortodontiya nədir?",
    faq9_a:"Ortodontiya diş və çənənin düzgün olmayan vəziyyətini müalicə edən diş həkimliyi sahəsidir. Sıxlıqlı, aralı dişlər, çarpaz dişləmə və düzgün olmayan qapanma ortodontik müalicə ilə həll edilir. Əsas müalicə üsulları: breket sistemləri, şəffaf alignerlər və çənə aparatlarıdır.",
    book_title:"Randevu Al", book_subtitle:"Bizimlə əlaqə saxlayın",
    book_name:"Ad Soyad", book_phone:"Telefon nömrəsi",
    book_doctor:"Həkim seçin", book_doctor_any:"Fərq etməz",
    book_doctor_aygun:"Dr. Aygün Rzayeva", book_doctor_elcan:"Dr. Elcan Həmidli",
    book_service:"Xidmət növü", book_service1:"Ümumi stomatologiya",
    book_service2:"Ortodontiya", book_service3:"Estetik stomatologiya",
    book_service4:"Konsultasiya",
    book_date:"Üstünlük verilən tarix", book_note:"Qeyd (ixtiyari)",
    book_submit:"Göndər",
    book_success:"Müraciətiniz qəbul edildi! Tezliklə sizinlə əlaqə saxlanılacaq.",
    contact_title:"Əlaqə", contact_address:"Ünvan", contact_phone:"Telefon",
    contact_email:"E-poçt", contact_hours:"İş saatları", contact_navigate:"Naviqasiya",
    contact_google:"Google Maps", contact_yandex:"Yandex Maps",
    contact_waze:"Waze", contact_gis:"2GIS",
    contact_hours_detail:"B.e / Çər / Cümə: günortadan sonra<br>Ç.ax / Cüm.ax / Şənbə: günortaya qədər<br>Bazar: İstirahət",
    footer_rights:"Bütün hüquqlar qorunur."
  },

  ru: {
    nav_home:"Главная", nav_services:"Услуги", nav_doctors:"Врачи",
    nav_schedule:"Часы", nav_gallery:"Галерея", nav_reviews:"Отзывы",
    nav_book:"Запись", nav_contact:"Контакты",
    hero_title:"Здоровые Улыбки,<br>Красивая Жизнь",
    hero_subtitle:"Профессиональные стоматологические услуги в Баку",
    hero_cta:"Записаться", hero_cta2:"Наши врачи",
    services_title:"Наши услуги", services_subtitle:"Индивидуальный подход к каждому пациенту",
    service1_title:"Общая стоматология",
    service1_desc:"Лечение зубов, пломбирование, удаление, профилактика и гигиена",
    service2_title:"Ортодонтия",
    service2_desc:"Исправление прикуса, брекет-системы, лечение полости рта",
    service3_title:"Эстетическая стоматология",
    service3_desc:"Отбеливание, виниры, циркониевые коронки, дизайн улыбки",
    doctors_title:"Наши врачи",
    dr_aygun_name:"Д-р Айгюн Рзаева", dr_aygun_title:"Стоматолог & Ортодонт",
    dr_aygun_bio:"Выпускница Азербайджанского медицинского университета. Специализируется в стоматологии и ортодонтии. Семейный подход, точное планирование и эстетический результат для каждого пациента. ✨",
    dr_aygun_edu:"Азербайджанский мед. университет", dr_aygun_spec:"Стоматология & Ортодонтия",
    dr_elcan_name:"Д-р Эльчан Гемидли", dr_elcan_title:"Эстетический стоматолог",
    dr_elcan_bio:"Специалист в области эстетической стоматологии. С философией «Some more smile» превращает каждую улыбку в произведение искусства.",
    dr_elcan_spec:"Эстетическая стоматология",
    schedule_title:"Часы приёма",
    schedule_subtitle:"ул. Ханифа Аласгарова, 67, Баку",
    schedule_day_col:"День", schedule_hours_col:"Время приёма",
    schedule_morning:"До полудня", schedule_afternoon:"После полудня",
    schedule_closed:"Выходной",
    mon:"Понедельник", tue:"Вторник", wed:"Среда",
    thu:"Четверг", fri:"Пятница", sat:"Суббота", sun:"Воскресенье",
    gallery_title:"Галерея", gallery_subtitle:"До и После", gallery_load_more:"Показать ещё",
    reviews_title:"Отзывы пациентов", reviews_subtitle:"Реальные отзывы наших пациентов", reviews_load_more:"Показать ещё",
    faq_title:"Часто задаваемые вопросы", faq_subtitle:"Здесь может быть ответ на ваш вопрос",
    nav_faq:"FAQ",
    faq1_q:"Сколько длится лечение брекетами?",
    faq1_a:"Для каждого пациента по-разному — в среднем 12–24 месяца. Степень скученности зубов, состояние челюсти и соблюдение рекомендаций определяют продолжительность.",
    faq2_q:"Больно ли носить брекеты?",
    faq2_a:"В первые 3–5 дней после установки возможна лёгкая чувствительность — это нормально. К последующим визитам ощущения значительно уменьшаются. Большинство пациентов ведут привычный образ жизни без затруднений.",
    faq3_q:"Сколько времени занимает операция по имплантации?",
    faq3_a:"Установка одного импланта занимает 30–60 минут под местной анестезией. Период заживления — 2–4 месяца. На протяжении всего лечения мы наблюдаем за вами.",
    faq4_q:"Как долго держится результат отбеливания?",
    faq4_a:"При правильном уходе — 1–2 года. Избегание кофе, чая и табака продлевает результат. При необходимости возможно обновление за одно короткое посещение.",
    faq5_q:"Что такое виниры и кому они подходят?",
    faq5_a:"Виниры — ультратонкие керамические пластинки, которые крепятся на поверхность зуба. Решают проблемы цвета, формы и размера. Изготавливаются за 1–2 визита, процедура безболезненна.",
    faq6_q:"Когда нужно начинать ортодонтическое лечение у детей?",
    faq6_a:"Рекомендуем первый ортодонтический осмотр в 6–7 лет. Ранняя диагностика позволяет вовремя выявить многие проблемы. Активное лечение обычно начинается в 10–13 лет.",
    faq7_q:"Чем циркониевые коронки отличаются от обычных?",
    faq7_a:"В отличие от металлических, цирконий прозрачен — обеспечивает естественный вид зуба. Более прочный, биологически совместимый и гипоаллергенный. Эстетическое преимущество очевидно.",
    faq8_q:"Как записаться на приём?",
    faq8_a:"Заполните форму «Записаться» на сайте — или позвоните по номеру +994 50 436 63 66, либо напишите через WhatsApp. Мы свяжемся с вами в ближайшее время.",
    faq9_q:"Что такое ортодонтия?",
    faq9_a:"Ортодонтия — раздел стоматологии, занимающийся исправлением неправильного положения зубов и челюстей. Скученность, промежутки между зубами, неправильный прикус — всё это решается ортодонтическим лечением. Основные методы: брекеты, элайнеры и ортодонтические аппараты.",
    book_title:"Записаться на приём", book_subtitle:"Свяжитесь с нами",
    book_name:"Имя Фамилия", book_phone:"Номер телефона",
    book_doctor:"Выберите врача", book_doctor_any:"Без разницы",
    book_doctor_aygun:"Д-р Айгюн Рзаева", book_doctor_elcan:"Д-р Эльчан Гемидли",
    book_service:"Вид услуги", book_service1:"Общая стоматология",
    book_service2:"Ортодонтия", book_service3:"Эстетическая стоматология",
    book_service4:"Консультация",
    book_date:"Предпочтительная дата", book_note:"Примечание (необязательно)",
    book_submit:"Отправить",
    book_success:"Ваша заявка принята! Мы свяжемся с вами в ближайшее время.",
    contact_title:"Контакты", contact_address:"Адрес", contact_phone:"Телефон",
    contact_email:"Эл. почта", contact_hours:"Часы работы", contact_navigate:"Навигация",
    contact_google:"Google Maps", contact_yandex:"Яндекс Карты",
    contact_waze:"Waze", contact_gis:"2GIS",
    contact_hours_detail:"Пн / Ср / Пт: после полудня<br>Вт / Чт / Сб: до полудня<br>Воскресенье: выходной",
    footer_rights:"Все права защищены."
  },

  en: {
    nav_home:"Home", nav_services:"Services", nav_doctors:"Doctors",
    nav_schedule:"Hours", nav_gallery:"Gallery", nav_reviews:"Reviews",
    nav_book:"Book", nav_contact:"Contact",
    hero_title:"Healthy Smiles,<br>Beautiful Life",
    hero_subtitle:"Professional dental services in Baku",
    hero_cta:"Book Appointment", hero_cta2:"Our Doctors",
    services_title:"Our Services", services_subtitle:"Personalized approach to every patient",
    service1_title:"General Dentistry",
    service1_desc:"Teeth treatment, fillings, extractions, prevention and oral hygiene",
    service2_title:"Orthodontics",
    service2_desc:"Bite correction, braces, comprehensive oral treatment",
    service3_title:"Aesthetic Dentistry",
    service3_desc:"Whitening, veneers, zirconia crowns, smile design",
    doctors_title:"Our Doctors",
    dr_aygun_name:"Dr. Aygün Rzayeva", dr_aygun_title:"Dentist & Orthodontist",
    dr_aygun_bio:"A graduate of Azerbaijan Medical University, Dr. Aygün Rzayeva specializes in dentistry and orthodontics. With a family-centered approach and precise planning, she gives every patient a healthy smile.",
    dr_aygun_edu:"Azerbaijan Medical University", dr_aygun_spec:"Dentistry & Orthodontics",
    dr_elcan_name:"Dr. Elcan Hamidli", dr_elcan_title:"Aesthetic Dentist",
    dr_elcan_bio:"Dr. Elcan Hamidli is a specialist in aesthetic dentistry. With his \"Some more smile\" philosophy, he transforms every smile into a work of art.",
    dr_elcan_spec:"Aesthetic Dentistry",
    schedule_title:"Appointment Hours",
    schedule_subtitle:"67 Hanifa Alasgarov St., Baku",
    schedule_day_col:"Day", schedule_hours_col:"Hours",
    schedule_morning:"Morning (until noon)", schedule_afternoon:"Afternoon (after noon)",
    schedule_closed:"Closed",
    mon:"Monday", tue:"Tuesday", wed:"Wednesday",
    thu:"Thursday", fri:"Friday", sat:"Saturday", sun:"Sunday",
    gallery_title:"Gallery", gallery_subtitle:"Before & After", gallery_load_more:"Load more",
    reviews_title:"Patient Reviews", reviews_subtitle:"Real reviews from our patients", reviews_load_more:"Load more",
    faq_title:"Frequently Asked Questions", faq_subtitle:"You may find the answer to your question here",
    nav_faq:"FAQ",
    faq1_q:"How long does braces treatment take?",
    faq1_a:"It varies for every patient — on average 12–24 months. The degree of crowding, jaw condition and treatment compliance determine the duration.",
    faq2_q:"Is wearing braces painful?",
    faq2_a:"Some mild sensitivity in the first 3–5 days after fitting is normal. Discomfort reduces significantly at follow-up visits. Most patients carry on with daily life without any difficulty.",
    faq3_q:"How long does an implant procedure take?",
    faq3_a:"Placing a single implant takes 30–60 minutes under local anaesthesia. Healing takes 2–4 months. We monitor you throughout the entire treatment.",
    faq4_q:"How long does teeth whitening last?",
    faq4_a:"With proper care, results last 1–2 years. Avoiding coffee, tea and tobacco extends the effect. A short top-up session is available if needed.",
    faq5_q:"What are veneers and who are they for?",
    faq5_a:"Veneers are ultra-thin ceramic shells bonded to the tooth surface. They correct colour, shape and size concerns. Prepared in 1–2 visits — the procedure is pain-free.",
    faq6_q:"When should children start orthodontic treatment?",
    faq6_a:"We recommend a first orthodontic check-up at age 6–7. Early diagnosis allows many issues to be caught in time. Active treatment usually begins between ages 10–13.",
    faq7_q:"How do zirconia crowns differ from regular crowns?",
    faq7_a:"Unlike metal-based crowns, zirconia is translucent — giving a natural tooth appearance. It is stronger, biologically compatible and hypoallergenic. The aesthetic advantage is clear.",
    faq8_q:"How can I book an appointment?",
    faq8_a:"Fill in the booking form on the site — or call +994 50 436 63 66, or send a WhatsApp message. We will get in touch with you as soon as possible.",
    faq9_q:"What is orthodontics?",
    faq9_a:"Orthodontics is the branch of dentistry that corrects misaligned teeth and jaws. Crowding, spacing, incorrect bites and crossbites are all resolved through orthodontic treatment. The main methods include braces, clear aligners and orthodontic appliances.",
    book_title:"Book Appointment", book_subtitle:"Get in touch with us",
    book_name:"Full Name", book_phone:"Phone Number",
    book_doctor:"Choose Doctor", book_doctor_any:"No preference",
    book_doctor_aygun:"Dr. Aygün Rzayeva", book_doctor_elcan:"Dr. Elcan Hamidli",
    book_service:"Service Type", book_service1:"General Dentistry",
    book_service2:"Orthodontics", book_service3:"Aesthetic Dentistry",
    book_service4:"Consultation",
    book_date:"Preferred Date", book_note:"Notes (optional)",
    book_submit:"Send Request",
    book_success:"Your request has been received! We will contact you shortly.",
    contact_title:"Contact", contact_address:"Address", contact_phone:"Phone",
    contact_email:"Email", contact_hours:"Working Hours", contact_navigate:"Navigate",
    contact_google:"Google Maps", contact_yandex:"Yandex Maps",
    contact_waze:"Waze", contact_gis:"2GIS",
    contact_hours_detail:"Mon / Wed / Fri: afternoon<br>Tue / Thu / Sat: morning<br>Sunday: Closed",
    footer_rights:"All rights reserved."
  }
};

// ===== LANGUAGE =====
let lang = 'az';
let _galleryItems = null;
let _reviewItems  = null;

function applyLang(l) {
  lang = l;
  const t = T[l];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n;
    if (t[k] !== undefined) el.textContent = t[k];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const k = el.dataset.i18nHtml;
    if (t[k] !== undefined) el.innerHTML = t[k];
  });

  document.documentElement.lang = l;

  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === l);
  });

  if (_galleryItems) renderGallery();
  if (_reviewItems)  renderReviews();
}

document.querySelectorAll('.lang-btn').forEach(b => {
  b.addEventListener('click', () => applyLang(b.dataset.lang));
});

// Apply default language on load
applyLang('az');

// ===== MOBILE NAV =====
const hamburger = document.getElementById('hamburger');
const navList   = document.getElementById('navList');

hamburger.addEventListener('click', () => {
  const open = navList.classList.toggle('open');
  const [s1, s2, s3] = hamburger.querySelectorAll('span');
  if (open) {
    s1.style.transform = 'rotate(45deg) translate(5px,5px)';
    s2.style.opacity   = '0';
    s3.style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    [s1,s2,s3].forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

navList.querySelectorAll('.nav__link').forEach(a => {
  a.addEventListener('click', () => {
    navList.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ===== SCROLL SHADOW =====
window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ===== ACTIVE NAV LINK =====
const navLinks = document.querySelectorAll('.nav__link');
const navIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const a = document.querySelector(`.nav__link[href="#${e.target.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}, { threshold: 0.35 });

document.querySelectorAll('section[id]').forEach(sec => navIO.observe(sec));

// ===== BOOKING FORM =====
const bookForm   = document.getElementById('bookForm');
const formSuccess = document.getElementById('formSuccess');

bookForm.addEventListener('submit', e => {
  e.preventDefault();

  const nameEl  = document.getElementById('formName');
  const phoneEl = document.getElementById('formPhone');
  let ok = true;

  [nameEl, phoneEl].forEach(f => {
    if (!f.value.trim()) { f.classList.add('error'); ok = false; }
    else f.classList.remove('error');
  });

  if (!ok) return;

  // Disable form and show success
  bookForm.querySelectorAll('input, select, button').forEach(el => el.setAttribute('disabled', true));
  formSuccess.style.display = 'flex';
  formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  /*
   * TO CONNECT AFTER LAUNCH:
   * 1. Sign up at formspree.io (free)
   * 2. Create a form — get endpoint URL
   * 3. Add action="YOUR_URL" method="POST" to the <form> tag
   * 4. Remove the e.preventDefault() line above
   * 5. Remove the lines below this comment
   */
});

bookForm.querySelectorAll('input').forEach(i => {
  i.addEventListener('input', () => i.classList.remove('error'));
});

// ===== SCROLL REVEAL =====
const revealIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      revealIO.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

function observeReveal(el) { el.classList.add('reveal'); revealIO.observe(el); }
document.querySelectorAll('.reveal').forEach(el => revealIO.observe(el));

// ===== FOOTER YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== DYNAMIC DATA =====

function starsHtml(n) { return '★'.repeat(n) + '☆'.repeat(5 - n); }

// ── Gallery ──
function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid || !_galleryItems) return;
  grid.innerHTML = '';
  _galleryItems.forEach(g => {
    const card = document.createElement('div');
    card.className = 'gallery__card';
    if (g.before && g.before.trim()) {
      card.innerHTML = `
        <div class="gallery__pair">
          <div class="gallery__item">
            <img src="images/gallery/${g.before}" alt="Before" loading="lazy">
            <span class="gallery__label">Öncə</span>
          </div>
          <div class="gallery__item">
            <img src="images/gallery/${g.after}" alt="After" loading="lazy">
            <span class="gallery__label">Sonra</span>
          </div>
        </div>`;
    } else {
      card.innerHTML = `
        <div class="gallery__single">
          <img src="images/gallery/${g.after}" alt="After" loading="lazy">
        </div>`;
    }
    const caption = g['caption_' + lang] || g.caption_az || g.caption || '';
    if (caption) card.innerHTML += `<p class="gallery__caption">${caption}</p>`;
    grid.appendChild(card);
    observeReveal(card);
  });
  initGalleryMore();
}

function initGalleryMore() {
  const SHOW = 6;
  const wrap  = document.getElementById('galleryMoreWrap');
  const btn   = document.getElementById('galleryMoreBtn');
  if (!wrap || !btn) return;
  const cards = document.querySelectorAll('#galleryGrid .gallery__card');
  wrap.style.display = '';
  if (cards.length <= SHOW) { wrap.style.display = 'none'; return; }
  cards.forEach((c, i) => { if (i >= SHOW) c.classList.add('gallery__card--hidden'); });
  btn.onclick = () => {
    document.querySelectorAll('#galleryGrid .gallery__card--hidden').forEach(c => {
      c.classList.remove('gallery__card--hidden');
      observeReveal(c);
    });
    wrap.style.display = 'none';
  };
}

fetch('data/gallery.json')
  .then(r => r.json())
  .then(items => { _galleryItems = items; renderGallery(); })
  .catch(() => {});

// ── Reviews ──
function renderReviews() {
  const grid = document.getElementById('reviewsGrid');
  if (!grid || !_reviewItems) return;
  grid.innerHTML = '';
  _reviewItems.forEach(r => {
    const card = document.createElement('div');
    card.className = 'review-card';
    const text = r['text_' + lang] || r.text_az || r.text || '';
    card.innerHTML = `
      <div class="review-card__stars">${starsHtml(r.stars)}</div>
      <p class="review-card__text">"${text}"</p>
      <div class="review-card__author">— ${r.author}</div>`;
    grid.appendChild(card);
    observeReveal(card);
  });
  initReviewsMore();
}

function initReviewsMore() {
  const SHOW = 3;
  const wrap  = document.getElementById('reviewsMoreWrap');
  const btn   = document.getElementById('reviewsMoreBtn');
  if (!wrap || !btn) return;
  const cards = document.querySelectorAll('#reviewsGrid .review-card');
  wrap.style.display = '';
  if (cards.length <= SHOW) { wrap.style.display = 'none'; return; }
  cards.forEach((c, i) => { if (i >= SHOW) c.classList.add('review-card--hidden'); });
  btn.onclick = () => {
    document.querySelectorAll('#reviewsGrid .review-card--hidden').forEach(c => {
      c.classList.remove('review-card--hidden');
      observeReveal(c);
    });
    wrap.style.display = 'none';
  };
}

fetch('data/reviews.json')
  .then(r => r.json())
  .then(items => { _reviewItems = items; renderReviews(); })
  .catch(() => {});

// Hero slider — max 7s per video, or ends naturally if shorter
(function () {
  const MAX = 7000;
  const slides = document.querySelectorAll('.hero__slide');
  if (!slides.length) return;
  let cur = 0;
  let timer;

  function activate(i) {
    clearTimeout(timer);
    slides[cur].classList.remove('active');
    cur = i % slides.length;
    slides[cur].classList.add('active');
    const v = slides[cur].querySelector('video');
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
      timer = setTimeout(() => activate(cur + 1), MAX);
    }
  }

  slides.forEach((slide, i) => {
    const v = slide.querySelector('video');
    if (v) v.addEventListener('ended', () => { if (cur === i) activate(i + 1); });
  });

  const first = slides[0].querySelector('video');
  if (first) {
    first.play().catch(() => {});
    timer = setTimeout(() => activate(cur + 1), MAX);
  }
})();

// Contact info
fetch('data/content.json')
  .then(r => r.json())
  .then(c => {
    const phoneLinks = document.querySelectorAll('[data-contact="phone"]');
    const emailLinks = document.querySelectorAll('[data-contact="email"]');
    const hoursEls   = document.querySelectorAll('[data-i18n-html="contact_hours_detail"]');

    phoneLinks.forEach(el => { el.textContent = c.phone; el.href = 'tel:' + c.phone.replace(/\s/g,''); });
    emailLinks.forEach(el => { el.textContent = c.email; el.href = 'mailto:' + c.email; });

    // Also update translations so language switching reflects saved hours
    if (c.hours_az) T.az.contact_hours_detail = c.hours_az;
    if (c.hours_ru) T.ru.contact_hours_detail = c.hours_ru;
    if (c.hours_en) T.en.contact_hours_detail = c.hours_en;
    hoursEls.forEach(el => { el.innerHTML = T[lang].contact_hours_detail; });

    // Update fab call button
    const fab = document.querySelector('.fab-call');
    if (fab && c.phone) fab.href = 'tel:' + c.phone.replace(/\s/g,'');
  })
  .catch(() => {});

// Run load-more on static HTML before fetch completes
initGalleryMore();
initReviewsMore();

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq__q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq__item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq__item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});
