/* ============================================================
   LATIHAN ASAS - AL-ISLAM & BAHASA ARAB KELAS 3 (Mazdany)
   Versi 2:
   - Menu "ASAS" (tombol navigasi + ubin dashboard + portal)
   - Tab baru: Rangkuman Materi
   - Latihan Bahasa Arab tanpa audio (semua berbasis tulisan)
   - Menghapus menu Murojaah dari tampilan
   Cara pasang: ganti seluruh isi file JS ASAS lama dengan kode ini.
============================================================ */
(function () {
  'use strict';
  if (document.getElementById('as-style')) return;

  var KEY = 'mazdany_asas_v1', best = {};
  try { best = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) {}
  function saveBest(k, v) {
    var up = !(k in best) || v > best[k];
    if (up) { best[k] = v; try { localStorage.setItem(KEY, JSON.stringify(best)); } catch (e) {} }
    return up;
  }
  function shuf(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function $(s, r) { return (r || document).querySelector(s); }
  function norm(s) { return String(s || '').toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, ' ').trim(); }

  /* ====================== DATA AL-ISLAM ====================== */
  var AI_PG = [
    ['Setiap manusia memiliki wajah dan sidik jari yang berbeda-beda. Hal ini menunjukkan keagungan Allah dengan nama …', ['Al-Khaliq', 'Al-Bari’', 'Al-Mushawwir', 'Al-Malik'], 2],
    ['Allah menciptakan langit dan bumi dari tidak ada menjadi ada. Nama Allah yang sesuai dengan hal ini adalah …', ['Al-Ghaffar', 'Al-Khaliq', 'Ar-Razzaq', 'As-Sami’'], 1],
    ['Al-Bari’ berarti Allah Maha …', ['Mengadakan ciptaan tanpa cela', 'Mengampuni', 'Mendengar', 'Memberi rezeki'], 0],
    ['Surah Az-Zalzalah terdiri atas … ayat.', ['6', '7', '8', '9'], 2],
    ['Pada hari kiamat, menurut Surah Az-Zalzalah, bumi akan mengeluarkan …', ['beban-beban beratnya', 'air dari langit', 'emas dan perak saja', 'pepohonan'], 0],
    ['Kata “dzarrah” dalam Surah Az-Zalzalah berarti …', ['gunung', 'bagian terkecil seperti atom', 'lautan', 'awan'], 1],
    ['Budi membuang paku di jalan agar tidak melukai orang. Menurut Surah Az-Zalzalah, perbuatan Budi …', ['akan dilihat balasan baiknya', 'tidak ada nilainya', 'pasti dilupakan', 'hanya berpahala jika dilihat guru'], 0],
    ['Melihat sampah di kelas saat tidak ada yang mengawasi, sikap yang benar adalah …', ['membiarkannya', 'membuangnya ke tempatnya karena Allah Maha Melihat', 'menunggu disuruh guru', 'menyalahkan teman'], 1],
    ['Lawan kata husnudzon adalah …', ['suuzan', 'syukur', 'sabar', 'ikhlas'], 0],
    ['Adikmu menumpahkan air di bukumu. Sikap husnudzon yang tepat adalah …', ['pasti dia sengaja, aku balas', 'mungkin tidak sengaja, aku memaafkannya', 'aku tidak mau bicara lagi', 'aku mengadu terus-menerus'], 1],
    ['Sebelum lomba, Dina yakin bahwa dengan bakat dari Allah ia mampu berusaha sebaik-baiknya. Dina berhusnudzon kepada …', ['Allah', 'diri sendiri', 'panitia', 'juri'], 1],
    ['Husnudzon kepada Allah artinya …', ['yakin segala ketetapan-Nya baik', 'takut pada takdir', 'menyalahkan takdir', 'menolak ujian'], 0],
    ['Orang yang membiasakan husnudzon hatinya menjadi …', ['gelisah', 'mudah curiga', 'tenang dan damai', 'mudah marah'], 2],
    ['Sifat dan perbuatan terpuji disebut akhlak …', ['madzmumah', 'mahmudah', 'sayyiah', 'qabihah'], 1],
    ['Berikut ini yang termasuk akhlak tercela adalah …', ['dengki', 'sabar', 'jujur', 'amanah'], 0],
    ['Puasa wajib yang dilaksanakan selama satu bulan penuh adalah puasa …', ['Daud', 'Syawal', 'Ramadan', 'Arafah'], 2],
    ['Puasa Senin dan Kamis termasuk puasa …', ['wajib', 'sunah', 'haram', 'makruh'], 1],
    ['Makan di waktu dini hari sebelum terbit fajar untuk berpuasa disebut …', ['iftar', 'sahur', 'tarawih', 'tadarus'], 1],
    ['Waktu berpuasa berakhir ketika …', ['matahari terbit', 'tengah hari', 'matahari terbenam (Maghrib)', 'waktu Isya'], 2],
    ['Selain menahan makan dan minum, orang yang berpuasa juga menjaga …', ['lisannya dari kata kotor dan bohong', 'waktu tidurnya', 'jalan-jalannya', 'waktu bermainnya'], 0],
    ['Puasa melatih kita peduli kepada orang miskin karena …', ['kita merasakan lapar seperti mereka', 'kita tidak punya makanan', 'kita malas bekerja', 'kita sedang sakit'], 0],
    ['Fajar ingin belajar berpuasa tetapi belum kuat penuh. Sikap yang sesuai tuntunan adalah …', ['berlatih puasa sesuai kemampuan dengan gembira', 'memaksa tidak makan seminggu', 'mengejek temannya', 'tidak pernah mencoba'], 0],
    ['Nabi Muhammad ﷺ dilahirkan di kota …', ['Madinah', 'Makkah', 'Thaif', 'Syam'], 1],
    ['Ayah Nabi Muhammad ﷺ bernama …', ['Abu Thalib', 'Abdullah', 'Abdul Muthalib', 'Abu Bakar'], 1],
    ['Setelah kakeknya wafat, Nabi Muhammad ﷺ diasuh oleh pamannya yang bernama …', ['Abu Lahab', 'Hamzah', 'Abu Thalib', 'Abbas'], 2],
    ['Pekerjaan Nabi Muhammad ﷺ pada masa kecil untuk membantu pamannya adalah …', ['menggembala kambing', 'menjadi hakim', 'menjadi tentara', 'berburu'], 0],
    ['Gelar “Al-Amin” bagi Nabi Muhammad ﷺ berarti …', ['yang sangat dapat dipercaya', 'yang paling kuat', 'yang paling kaya', 'yang pandai berpidato'], 0],
    ['Sifat rasul yang berarti menyampaikan wahyu kepada umat adalah …', ['shiddiq', 'amanah', 'tabligh', 'fathanah'], 2],
    ['Dititipi buku oleh temanmu, sikap yang meneladani Nabi ﷺ adalah …', ['menjaganya dan mengembalikannya', 'menyembunyikannya', 'merobeknya', 'menjualnya'], 0],
    ['Sifat rasul yang berarti jujur adalah …', ['shiddiq', 'amanah', 'tabligh', 'fathanah'], 0]
  ];

  var AI_ISIAN = [
    ['Semua yang diciptakan Allah disebut ____.', ['makhluk', 'makhluq'], 'makhluk'],
    ['Al-Mushawwir artinya Allah Maha ____.', ['rupa', 'bentuk', 'membentuk'], 'Membentuk Rupa'],
    ['Surah yang menceritakan goncangan bumi pada hari kiamat adalah Surah ____.', ['zalzalah', 'zilzal'], 'Az-Zalzalah'],
    ['Lawan kata husnudzon adalah ____.', ['suuzan', 'su udzon', 'suudzon', 'su udzan', 'buruk sangka', 'berburuk'], 'suuzan (berburuk sangka)'],
    ['Percaya pada kemampuan yang Allah berikan kepada kita adalah husnudzon kepada ____.', ['diri'], 'diri sendiri'],
    ['Makan di waktu dini hari sebelum Subuh untuk berpuasa disebut ____.', ['sahur'], 'sahur'],
    ['Puasa sunah pada tanggal 13, 14, dan 15 bulan Hijriah disebut puasa ____.', ['ayyamul bidh', 'ayyamul bid', 'bidh', 'putih'], 'Ayyamul Bidh'],
    ['Nabi Muhammad ﷺ lahir pada tahun ____.', ['gajah'], 'Gajah'],
    ['Sifat rasul yang berarti cerdas adalah ____.', ['fathanah', 'fatonah', 'fathonah', 'cerdas'], 'Fathanah'],
    ['Sifat rasul yang berarti dapat dipercaya adalah ____.', ['amanah'], 'Amanah']
  ];

  var AI_URAIAN = [
    ['Jelaskan apa yang dimaksud dzarrah, dan mengapa kita tidak boleh meremehkan perbuatan kecil!', 'Dzarrah adalah bagian terkecil (seperti atom/biji sangat kecil). Kebaikan atau keburukan sekecil dzarrah pun akan dilihat dan dibalas Allah, sehingga kita tidak boleh meremehkan perbuatan kecil.'],
    ['Sebutkan 3 (tiga) amalan atau sikap yang dianjurkan selama bulan Ramadan!', 'Contoh: salat tarawih, tadarus Al-Qur’an, memperbanyak sedekah, menjaga lisan, menyegerakan berbuka, makan sahur.'],
    ['Jelaskan perbedaan Al-Khaliq dan Al-Mushawwir, lalu beri 1 contoh bukti ciptaan Allah!', 'Al-Khaliq = Maha Pencipta (menciptakan dari tidak ada menjadi ada). Al-Mushawwir = Maha Membentuk Rupa (memberi bentuk berbeda pada tiap makhluk). Contoh: wajah/sidik jari tiap manusia berbeda; langit dan bumi.'],
    ['Ceritakan satu kejadian di rumah atau sekolah yang menunjukkan sikap husnudzon, dan apa manfaatnya!', 'Jawaban bebas, misalnya: temanku tidak menyapa lalu aku berpikir ia sedang lelah, bukan marah. Manfaatnya hati tenang dan pertemanan tetap baik.'],
    ['Ceritakan secara singkat masa kecil Nabi Muhammad ﷺ, lalu sebutkan satu sifatnya yang bisa kamu tiru!', 'Nabi lahir yatim di Makkah pada Tahun Gajah, disusui Halimah, diasuh kakek lalu Abu Thalib, menggembala kambing, dan dijuluki Al-Amin. Sifat yang ditiru: jujur / amanah / sabar / mandiri (pilih salah satu).']
  ];

  var AI_TERMS = [
    ['Al-Khaliq', 'Maha Pencipta'], ['Al-Bari’', 'Maha Mengadakan ciptaan tanpa cela'], ['Al-Mushawwir', 'Maha Membentuk Rupa'],
    ['Husnudzon', 'Berbaik sangka'], ['Suuzan', 'Berburuk sangka'], ['Dzarrah', 'Bagian terkecil / seberat atom'],
    ['Az-Zalzalah', 'Kegoncangan (peristiwa hari kiamat)'], ['Tahun Gajah', 'Tahun kelahiran Nabi Muhammad ﷺ'],
    ['Halimah As-Sa’diyah', 'Ibu susu Nabi Muhammad ﷺ'], ['Al-Amin', 'Gelar Nabi: sangat dapat dipercaya'],
    ['Shiddiq', 'Jujur (sifat wajib rasul)'], ['Amanah', 'Dapat dipercaya'], ['Tabligh', 'Menyampaikan wahyu'], ['Fathanah', 'Cerdas'],
    ['Puasa', 'Menahan makan, minum, dan pembatalnya dari fajar hingga Maghrib'], ['Tujuan puasa', 'Meningkatkan ketakwaan kepada Allah'],
    ['Sahur', 'Makan sebelum terbit fajar'], ['Berbuka', 'Disegerakan saat Maghrib, dengan kurma/air lalu berdoa'],
    ['Husnudzon kepada Allah', 'Yakin takdir-Nya pasti baik dan penuh hikmah'], ['Muroqobah', 'Merasa selalu diawasi Allah']
  ];

  /* ====================== DATA BAHASA ARAB (Bab 1-4) ====================== */
  /* [emoji, arab, indonesia]  (tanpa audio) */
  var V = {
    1: [['👦', 'رَأْسٌ', 'Kepala'], ['💇', 'شَعْرٌ', 'Rambut'], ['👁️', 'عَيْنٌ', 'Mata'], ['👃', 'أَنْفٌ', 'Hidung'], ['👄', 'فَمٌ', 'Mulut'], ['👂', 'أُذُنٌ', 'Telinga'], ['✋', 'يَدٌ', 'Tangan'], ['🦶', 'رِجْلٌ', 'Kaki']],
    2: [['👨', 'أَبٌ', 'Ayah'], ['🧕', 'أُمٌّ', 'Ibu'], ['👴', 'جَدٌّ', 'Kakek'], ['👵', 'جَدَّةٌ', 'Nenek'], ['🧔', 'عَمٌّ', 'Paman'], ['👩', 'عَمَّةٌ', 'Bibi'], ['👦', 'أَخٌ', 'Saudara Laki-laki'], ['👧', 'أُخْتٌ', 'Saudara Perempuan']],
    3: [['🛋️', 'غُرْفَةُ الضُّيُوْفِ', 'Ruang Tamu'], ['🛏️', 'غُرْفَةُ النَّوْمِ', 'Ruang Tidur'], ['🍽️', 'غُرْفَةُ الأَكْلِ', 'Ruang Makan'], ['📺', 'غُرْفَةُ الْجُلُوْسِ', 'Ruang Keluarga'], ['🚿', 'حَمَّامٌ', 'Kamar Mandi'], ['🚗', 'جرَاجٌ', 'Garasi'], ['🍳', 'مَطْبَخٌ', 'Dapur'], ['📦', 'مُسْتَوْدَعٌ', 'Gudang']],
    4: [['🚪', 'بَابٌ', 'Pintu'], ['🪟', 'نَافِذَةٌ', 'Jendela'], ['🧵', 'سِتَارَةٌ', 'Gorden'], ['🏠', 'سَقْفٌ', 'Atap'], ['⬜', 'بلاَطٌ', 'Lantai'], ['🧱', 'جِدَارٌ', 'Tembok'], ['🚧', 'سُورٌ', 'Pagar'], ['🪜', 'سُلَّمٌ', 'Tangga']]
  };
  var BAB = {1: 'Anggota Badan', 2: 'Anggota Keluarga', 3: 'Di Rumahku', 4: 'Bagian Rumah'};
  function arPool(b) { return b === 'all' ? V[1].concat(V[2], V[3], V[4]) : V[b]; }
  function ar(t) { return '<span class="as-ar">' + t + '</span>'; }

  /* ====================== PEMBUAT SOAL ====================== */
  function buildQs(src, n, mixQ) {
    var a = mixQ ? shuf(src) : src.slice();
    if (n) a = a.slice(0, n);
    return a.map(function (it) {
      var correct = it[1][it[2]], opts = it[1].slice();
      if (!opts.every(function (o) { return /^\d+$/.test(o); })) opts = shuf(opts);
      return {q: it[0], o: opts, a: opts.indexOf(correct)};
    });
  }
  /* Soal Bahasa Arab: hanya Arab->arti dan arti->Arab (tanpa suara) */
  function arQs(b, n) {
    var pool = arPool(b), items = shuf(pool);
    while (items.length < n && b === 'all') items = items.concat(shuf(pool));
    items = items.slice(0, Math.min(n, items.length));
    return items.map(function (w, i) {
      var others = shuf(pool.filter(function (x) { return x[2] !== w[2]; })).slice(0, 3),
          all = shuf([w].concat(others)), q;
      if (i % 2 === 0) {
        q = {q: 'Apa arti kata ' + ar(w[1]) + ' ?', o: all.map(function (x) { return x[2]; })};
      } else {
        q = {q: 'Bahasa Arab dari <b>' + w[2] + '</b> ' + w[0] + ' adalah …', o: all.map(function (x) { return ar(x[1]); })};
      }
      q.a = all.indexOf(w);
      q.exp = ar(w[1]) + ' = ' + w[2];
      return q;
    });
  }

  /* ====================== RANGKUMAN MATERI (HTML) ====================== */
  var RM_HTML = `
<section id="rangkuman-asas">
<style>
#rangkuman-asas {
  --rm-bg: #0b2e22; --rm-card: #11402f; --rm-card2: #0f3727; --rm-line: #2c6b50;
  --rm-text: #e8f5ee; --rm-muted: #a9cdb9; --rm-gold: #f2c14e; --rm-mint: #7fe0b0;
  font-family: "Segoe UI", system-ui, -apple-system, Roboto, Arial, sans-serif;
  color: var(--rm-text); background: var(--rm-bg); border: 1px solid var(--rm-line);
  border-radius: 14px; padding: 18px; line-height: 1.6; max-width: 980px; margin: 0 auto;
}
#rangkuman-asas *, #rangkuman-asas *::before, #rangkuman-asas *::after { box-sizing: border-box; }
#rangkuman-asas h2 { margin: 0 0 4px; font-size: 1.45rem; color: #fff; }
#rangkuman-asas .rm-sub { margin: 0 0 14px; color: var(--rm-muted); font-size: .95rem; }
#rangkuman-asas .rm-tabs { display: flex; gap: 8px; margin-bottom: 14px; flex-wrap: wrap; }
#rangkuman-asas .rm-tab { border: 1px solid var(--rm-line); background: var(--rm-card2); color: var(--rm-text); padding: 9px 16px; border-radius: 10px; cursor: pointer; font-size: .95rem; font-weight: 600; font-family: inherit; }
#rangkuman-asas .rm-tab:hover { border-color: var(--rm-mint); }
#rangkuman-asas .rm-tab:focus-visible, #rangkuman-asas summary:focus-visible { outline: 2px solid var(--rm-gold); outline-offset: 2px; }
#rangkuman-asas .rm-tab[aria-selected="true"] { background: var(--rm-gold); color: #2b2100; border-color: var(--rm-gold); }
#rangkuman-asas .rm-panel[hidden] { display: none; }
#rangkuman-asas details { background: var(--rm-card); border: 1px solid var(--rm-line); border-radius: 12px; margin-bottom: 10px; }
#rangkuman-asas summary { cursor: pointer; padding: 12px 14px; font-weight: 700; font-size: 1.02rem; list-style: none; display: flex; justify-content: space-between; align-items: center; gap: 10px; }
#rangkuman-asas summary::-webkit-details-marker { display: none; }
#rangkuman-asas summary::after { content: "+"; color: var(--rm-gold); font-size: 1.3rem; line-height: 1; }
#rangkuman-asas details[open] > summary::after { content: "−"; }
#rangkuman-asas details[open] > summary { border-bottom: 1px solid var(--rm-line); }
#rangkuman-asas .rm-body { padding: 12px 14px 14px; }
#rangkuman-asas .rm-body p { margin: 0 0 8px; }
#rangkuman-asas .rm-body ul { margin: 0 0 8px; padding-left: 20px; list-style: disc; }
#rangkuman-asas .rm-body li { margin-bottom: 3px; }
#rangkuman-asas b, #rangkuman-asas strong { color: var(--rm-gold); font-weight: 700; }
#rangkuman-asas .rm-kunci { background: var(--rm-card2); border-left: 4px solid var(--rm-mint); border-radius: 8px; padding: 9px 12px; margin: 10px 0 4px; }
#rangkuman-asas .rm-kunci > span { display: block; font-weight: 700; color: var(--rm-mint); margin-bottom: 3px; }
#rangkuman-asas .rm-kunci > span.rm-chip { display: inline-block; font-weight: 400; color: var(--rm-text); margin-bottom: 2px; }
#rangkuman-asas .rm-chip { display: inline-block; background: #174d3a; border: 1px solid var(--rm-line); border-radius: 999px; padding: 2px 11px; margin: 2px 4px 2px 0; font-size: .88rem; }
#rangkuman-asas .rm-scroll { overflow-x: auto; margin: 8px 0; }
#rangkuman-asas table { width: 100%; border-collapse: collapse; min-width: 420px; }
#rangkuman-asas th { text-align: left; background: #174d3a; color: var(--rm-mint); padding: 8px 10px; border: 1px solid var(--rm-line); font-size: .92rem; }
#rangkuman-asas td { padding: 8px 10px; border: 1px solid var(--rm-line); vertical-align: middle; }
#rangkuman-asas td.rm-no { width: 52px; text-align: center; font-weight: 700; color: var(--rm-gold); }
#rangkuman-asas .rm-ar { font-family: "Traditional Arabic", "Amiri", "Scheherazade New", "Noto Naskh Arabic", "Arial", serif; direction: rtl; unicode-bidi: embed; text-align: right; color: #fff; line-height: 2; }
#rangkuman-asas .rm-ayat { font-size: 1.6rem; }
#rangkuman-asas .rm-kata { font-size: 1.9rem; text-align: center; }
#rangkuman-asas .rm-inline-ar { font-family: "Traditional Arabic", "Amiri", "Noto Naskh Arabic", serif; font-size: 1.25em; }
#rangkuman-asas .rm-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 10px; }
#rangkuman-asas .rm-card { background: var(--rm-card2); border: 1px solid var(--rm-line); border-radius: 10px; padding: 10px 12px; }
#rangkuman-asas .rm-card h4 { margin: 0 0 6px; color: var(--rm-mint); font-size: 1rem; }
#rangkuman-asas .rm-card ul { margin: 0; padding-left: 18px; list-style: disc; }
#rangkuman-asas .rm-tip { margin-top: 12px; padding: 10px 12px; border: 1px dashed var(--rm-gold); border-radius: 10px; color: var(--rm-muted); font-size: .93rem; }
#rangkuman-asas .rm-foot { margin-top: 14px; font-size: .82rem; color: var(--rm-muted); text-align: center; }
@media (max-width: 560px) {
  #rangkuman-asas { padding: 12px; }
  #rangkuman-asas .rm-ayat { font-size: 1.35rem; }
  #rangkuman-asas .rm-kata { font-size: 1.6rem; }
}
@media print {
  #rangkuman-asas { background: #fff; color: #111; border: none; }
  #rangkuman-asas details { background: #fff; border-color: #999; }
  #rangkuman-asas .rm-tabs { display: none; }
  #rangkuman-asas .rm-panel[hidden] { display: block; }
  #rangkuman-asas b, #rangkuman-asas strong, #rangkuman-asas h2, #rangkuman-asas .rm-ar, #rangkuman-asas td.rm-no { color: #111; }
  #rangkuman-asas th { background: #e6f4ec; color: #111; }
}
</style>

<h2>Rangkuman Materi ASAS Kelas 3</h2>
<p class="rm-sub">Ringkasan Al-Islam dan Bahasa Arab (Bab 1 dan 2) untuk belajar sebelum Asesmen Sumatif Akhir Semester Ganjil. Klik judul untuk membuka materi.</p>

<div class="rm-tabs" role="tablist" aria-label="Pilih mata pelajaran">
  <button class="rm-tab" role="tab" id="rm-tab-islam" aria-selected="true" aria-controls="rm-panel-islam" data-rm="islam">Al-Islam</button>
  <button class="rm-tab" role="tab" id="rm-tab-arab" aria-selected="false" aria-controls="rm-panel-arab" data-rm="arab">Bahasa Arab</button>
</div>

<div class="rm-panel" id="rm-panel-islam" role="tabpanel" aria-labelledby="rm-tab-islam">

  <details open>
    <summary>1. Surat Az-Zalzalah (Bab 1)</summary>
    <div class="rm-body">
      <ul>
        <li>Surat Az-Zalzalah berisi <b>8 ayat</b> dan menjelaskan <b>peristiwa hari kiamat</b>.</li>
        <li>Pada hari kiamat bumi <b>berguncang dengan dahsyat</b> dan mengeluarkan isi perutnya.</li>
        <li>Manusia keluar dari kubur berkelompok-kelompok untuk melihat balasan amalnya.</li>
        <li>Setiap amal sekecil apa pun pasti dibalas karena Allah <b>Maha Adil</b>.</li>
      </ul>
      <div class="rm-scroll">
        <table>
          <tr><th>Ayat</th><th>Lafaz</th><th>Arti</th></tr>
          <tr><td class="rm-no">1</td><td class="rm-ar rm-ayat">إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا</td><td>Apabila bumi digoncangkan dengan goncangan yang dahsyat.</td></tr>
          <tr><td class="rm-no">2</td><td class="rm-ar rm-ayat">وَأَخْرَجَتِ الْأَرْضُ أَثْقَالَهَا</td><td>Dan bumi mengeluarkan beban-beban beratnya.</td></tr>
          <tr><td class="rm-no">3</td><td class="rm-ar rm-ayat">وَقَالَ الْإِنْسَانُ مَا لَهَا</td><td>Dan manusia bertanya: “Mengapa bumi (jadi begini)?”</td></tr>
          <tr><td class="rm-no">4</td><td class="rm-ar rm-ayat">يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا</td><td>Pada hari itu bumi menyampaikan beritanya.</td></tr>
          <tr><td class="rm-no">5</td><td class="rm-ar rm-ayat">بِأَنَّ رَبَّكَ أَوْحَى لَهَا</td><td>Karena Tuhanmu telah memerintahkan (yang demikian itu) kepadanya.</td></tr>
          <tr><td class="rm-no">6</td><td class="rm-ar rm-ayat">يَوْمَئِذٍ يَصْدُرُ النَّاسُ أَشْتَاتًا لِيُرَوْا أَعْمَالَهُمْ</td><td>Pada hari itu manusia keluar dari kubur berkelompok-kelompok untuk diperlihatkan balasan amal mereka.</td></tr>
          <tr><td class="rm-no">7</td><td class="rm-ar rm-ayat">فَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَه</td><td>Barangsiapa mengerjakan kebaikan seberat dzarrah, ia akan melihat (balasan)nya.</td></tr>
          <tr><td class="rm-no">8</td><td class="rm-ar rm-ayat">وَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَه</td><td>Barangsiapa mengerjakan kejahatan seberat dzarrah, ia akan melihat (balasan)nya pula.</td></tr>
        </table>
      </div>
      <p><b>Tiga pokok kandungan:</b> (1) kedahsyatan hari kiamat, bumi diguncangkan hebat dan mengeluarkan isi perutnya; (2) seluruh manusia dibangkitkan dari kubur untuk melihat balasan amalnya; (3) keadilan Allah: kebaikan sekecil dzarrah dibalas, keburukan sekecil dzarrah juga dibalas.</p>
      <p><b>Penerapan:</b> berbuat baik dengan <b>ikhlash</b>, selalu berbuat <b>baik dan benar</b>. Saat guru berhalangan hadir, tetap <b>berperilaku baik dan tertib</b>.</p>
      <div class="rm-kunci">
        <span>Kata kunci</span>
        <span class="rm-chip">Hari kiamat</span><span class="rm-chip">Bumi berguncang dahsyat</span><span class="rm-chip">Dzarrah = bagian terkecil / debu</span><span class="rm-chip">Allah Maha Adil</span><span class="rm-chip">Ikhlash</span><span class="rm-chip">Ayat 3: <span class="rm-inline-ar">وَقَالَ الْإِنْسَانُ مَا لَهَا</span></span>
      </div>
    </div>
  </details>

  <details>
    <summary>2. Asmaul Husna (Bab 2)</summary>
    <div class="rm-body">
      <div class="rm-scroll">
        <table>
          <tr><th>Asmaul Husna</th><th>Arti</th><th>Penjelasan</th></tr>
          <tr><td class="rm-ar rm-kata">الْخَالِقُ<br><span style="direction:ltr;display:block;font-size:.85rem;font-family:inherit;color:#a9cdb9;line-height:1.3">Al-Khaliq</span></td><td><b>Maha Pencipta</b></td><td>Allah menciptakan segala sesuatu dari tidak ada menjadi ada. Ciptaan Allah disebut <i>makhluq</i>.</td></tr>
          <tr><td class="rm-ar rm-kata">الْبَارِئُ<br><span style="direction:ltr;display:block;font-size:.85rem;font-family:inherit;color:#a9cdb9;line-height:1.3">Al-Bari</span></td><td><b>Maha Mengadakan / Menjadikan</b></td><td>Allah mewujudkan ciptaan-Nya dengan rancangan yang seimbang, teratur, dan sempurna tanpa cela.</td></tr>
          <tr><td class="rm-ar rm-kata">الْمُصَوِّرُ<br><span style="direction:ltr;display:block;font-size:.85rem;font-family:inherit;color:#a9cdb9;line-height:1.3">Al-Mushawwir</span></td><td><b>Maha Membentuk Rupa</b></td><td>Allah membentuk rupa setiap makhluk dengan bentuk beraneka ragam dan penuh hikmah. Tidak ada dua manusia yang benar-benar sama.</td></tr>
        </table>
      </div>
      <div class="rm-kunci">
        <span>Kata kunci</span>
        Allah menciptakan dan mengatur bentuk setiap makhluk <b>dengan penuh hikmah</b>, bukan kebetulan dan bukan berubah tanpa kehendak-Nya. Wujud syukur atas ciptaan Allah: menjaga kebersihan dan merawat lingkungan.
      </div>
    </div>
  </details>

  <details>
    <summary>3. Husnudzon dan Akhlak Terpuji (Bab 3)</summary>
    <div class="rm-body">
      <ul>
        <li><b>Husnudzon</b> = <b>berbaik sangka</b>. Lawannya: <b>suudzon</b> (berburuk sangka).</li>
        <li>Husnudzon kepada <b>Allah</b>: yakin semua takdir dan ketetapan Allah mengandung kebaikan serta hikmah.</li>
        <li>Husnudzon kepada <b>sesama manusia</b>: tidak cepat menuduh, memaafkan kekurangan teman, tidak mencurigai tanpa bukti.</li>
        <li>Husnudzon kepada <b>diri sendiri</b>: percaya pada kemampuan yang Allah berikan.</li>
      </ul>
      <div class="rm-grid">
        <div class="rm-card"><h4>Contoh di sekolah</h4>
          <ul>
            <li>Teman tidak membalas sapaan? Pikirkan bahwa ia mungkin <b>lelah atau lupa</b>.</li>
            <li>Pensil atau buku hilang? Jangan langsung menuduh, periksa tas dulu atau tanya dengan santun.</li>
          </ul></div>
        <div class="rm-card"><h4>Manfaat husnudzon</h4>
          <ul>
            <li>Menumbuhkan <b>ketenangan dan persahabatan</b>.</li>
            <li>Mencegah perselisihan dan permusuhan.</li>
            <li>Jiwa tenang dan mudah bersyukur.</li>
          </ul></div>
        <div class="rm-card"><h4>Pembagian akhlak</h4>
          <ul>
            <li><b>Mahmudah</b> (terpuji): jujur, sabar, bersyukur, ikhlas, husnudzon.</li>
            <li><b>Madzmumah</b> (tercela): suudzon, iri, sombong, dengki, riya’, adu domba.</li>
          </ul></div>
      </div>
    </div>
  </details>

  <details>
    <summary>4. Puasa (Bab 4)</summary>
    <div class="rm-body">
      <p><b>Pengertian:</b> menahan diri dari <b>makan, minum, dan hal-hal yang membatalkannya</b>, sejak <b>terbit fajar hingga terbenam matahari</b> (Maghrib).</p>
      <div class="rm-grid">
        <div class="rm-card"><h4>Tujuan puasa</h4>
          <ul>
            <li>Meningkatkan <b>ketakwaan</b> kepada Allah (tujuan utama).</li>
            <li>Melatih kesabaran, ketahanan mental, dan kedisiplinan, serta menjauhi maksiat.</li>
            <li>Mengasah kepedulian dan empati kepada sesama.</li>
          </ul></div>
        <div class="rm-card"><h4>Tata cara yang benar</h4>
          <ul>
            <li><b>Berniat</b> dan <b>sahur</b> sebelum terbit fajar.</li>
            <li>Menjaga lisan dari perkataan kotor agar mendapat <b>pahala</b>.</li>
            <li><b>Menyegerakan berbuka</b> saat azan Maghrib dengan kurma atau air, lalu <b>membaca doa</b>.</li>
          </ul></div>
      </div>
      <p style="margin-top:10px"><b>Hikmah puasa:</b> menjadi anak yang <b>peduli</b>, <b>kuat dan sabar</b>. Di bulan Ramadhan tetap tekun belajar dan membantu sesama.</p>
    </div>
  </details>

  <details>
    <summary>5. Meneladani Nabi Muhammad ﷺ (Bab 5)</summary>
    <div class="rm-body">
      <div class="rm-scroll">
        <table>
          <tr><th>Hal yang perlu diingat</th><th>Jawaban</th></tr>
          <tr><td>Tahun kelahiran Nabi disebut tahun</td><td><b>Gajah</b> (pasukan bergajah Abrahah yang hendak menyerbu Ka’bah digagalkan Allah)</td></tr>
          <tr><td>Ibu susuan Nabi di Bani Sa’ad</td><td><b>Halimah As-Sa’diyah</b></td></tr>
          <tr><td>Gelar Nabi sebelum menjadi Rasul</td><td><b>Al-Amin</b> (orang yang dapat dipercaya)</td></tr>
        </table>
      </div>
      <div class="rm-scroll">
        <table>
          <tr><th>Sifat Rasul</th><th>Arti</th><th>Contoh penerapan</th></tr>
          <tr><td><b>Siddiq</b></td><td>Jujur, selalu berkata benar</td><td>Jujur dalam ucapan dan perbuatan.</td></tr>
          <tr><td><b>Amanah</b></td><td>Dapat dipercaya</td><td>Menjaga barang milik kelas dan tidak merusaknya; tidak mengambil barang tanpa izin.</td></tr>
          <tr><td><b>Tabligh</b></td><td>Menyampaikan kebenaran</td><td>Menyampaikan ajaran yang benar tanpa menyembunyikannya.</td></tr>
          <tr><td><b>Fathanah</b></td><td>Cerdas dan bijaksana</td><td>Belajar sungguh-sungguh dan bertindak bijak.</td></tr>
        </table>
      </div>
      <p><b>Akhlak mulia lain:</b> gemar <b>menolong sesama</b>. Bila teman kesulitan, kita membantu.</p>
    </div>
  </details>
</div>

<div class="rm-panel" id="rm-panel-arab" role="tabpanel" aria-labelledby="rm-tab-arab" hidden>

  <details open>
    <summary>Bab 1: <span class="rm-inline-ar">أَعْضَاءُ الْجِسْمِ</span> (Anggota Badan)</summary>
    <div class="rm-body">
      <div class="rm-scroll">
        <table>
          <tr><th>No</th><th style="text-align:center">Arab</th><th>Cara baca</th><th>Arti</th></tr>
          <tr><td class="rm-no">1</td><td class="rm-ar rm-kata">رَأْسٌ</td><td>ra’sun</td><td><b>Kepala</b></td></tr>
          <tr><td class="rm-no">2</td><td class="rm-ar rm-kata">شَعْرٌ</td><td>sya’run</td><td><b>Rambut</b></td></tr>
          <tr><td class="rm-no">3</td><td class="rm-ar rm-kata">عَيْنٌ</td><td>‘ainun</td><td><b>Mata</b></td></tr>
          <tr><td class="rm-no">4</td><td class="rm-ar rm-kata">أَنْفٌ</td><td>‘anfun</td><td><b>Hidung</b></td></tr>
          <tr><td class="rm-no">5</td><td class="rm-ar rm-kata">فَمٌ</td><td>famun</td><td><b>Mulut</b></td></tr>
          <tr><td class="rm-no">6</td><td class="rm-ar rm-kata">أُذُنٌ</td><td>‘uzunun</td><td><b>Telinga</b></td></tr>
          <tr><td class="rm-no">7</td><td class="rm-ar rm-kata">يَدٌ</td><td>yadun</td><td><b>Tangan</b></td></tr>
          <tr><td class="rm-no">8</td><td class="rm-ar rm-kata">رِجْلٌ</td><td>rijlun</td><td><b>Kaki</b></td></tr>
        </table>
      </div>
    </div>
  </details>

  <details>
    <summary>Bab 2: <span class="rm-inline-ar">أَعْضَاءُ الْأَسْرَةِ</span> (Anggota Keluarga)</summary>
    <div class="rm-body">
      <div class="rm-scroll">
        <table>
          <tr><th>No</th><th style="text-align:center">Arab</th><th>Cara baca</th><th>Arti</th></tr>
          <tr><td class="rm-no">1</td><td class="rm-ar rm-kata">أَبٌ</td><td>Abun</td><td><b>Ayah</b></td></tr>
          <tr><td class="rm-no">2</td><td class="rm-ar rm-kata">أُمٌّ</td><td>Ummun</td><td><b>Ibu</b></td></tr>
          <tr><td class="rm-no">3</td><td class="rm-ar rm-kata">جَدٌّ</td><td>Jaddun</td><td><b>Kakek</b></td></tr>
          <tr><td class="rm-no">4</td><td class="rm-ar rm-kata">جَدَّةٌ</td><td>Jaddatun</td><td><b>Nenek</b></td></tr>
          <tr><td class="rm-no">5</td><td class="rm-ar rm-kata">عَمٌّ</td><td>‘Ammun</td><td><b>Paman</b></td></tr>
          <tr><td class="rm-no">6</td><td class="rm-ar rm-kata">عَمَّةٌ</td><td>‘Ammatun</td><td><b>Bibi</b></td></tr>
          <tr><td class="rm-no">7</td><td class="rm-ar rm-kata">أَخٌ</td><td>Akhun</td><td><b>Saudara laki-laki</b></td></tr>
          <tr><td class="rm-no">8</td><td class="rm-ar rm-kata">أُخْتٌ</td><td>Ukhtun</td><td><b>Saudari perempuan</b></td></tr>
        </table>
      </div>
    </div>
  </details>

  <div class="rm-tip">Tips menghafal: sebut kosakata sambil menunjuk anggota badan atau menyebut anggota keluargamu. Ulangi 3 kali sehari, lalu uji dengan permainan Kartu Jodoh di tab Bahasa Arab.</div>
</div>

<p class="rm-foot">Disusun dari soal dan kunci ASAS Al-Islam Kelas 3 (Majelis Dikdasmen PDM Gunungkidul) dan kosakata Bahasa Arab Bab 1 dan 2 Mazdany.</p>
</section>`;

  /* ====================== CSS PORTAL ====================== */
  var CSS = `
  #portal-asas .as-hero{display:flex;flex-wrap:wrap;gap:1rem;align-items:center;justify-content:space-between;padding:1.3rem 1.8rem;border-radius:2rem;border:1px solid rgba(20,184,166,.3);background:rgba(4,38,31,.6)}
  #portal-asas .as-hero h2{margin:.4rem 0 .2rem;font-size:1.6rem;font-weight:800;color:#67e8f9}
  #portal-asas .as-hero p{margin:0;font-size:.8rem;color:#cbd5e1;max-width:38rem}
  #portal-asas .as-badge{display:inline-block;font-size:.7rem;font-weight:700;padding:.3rem .8rem;border-radius:99px;background:#451a03;color:#fcd34d;border:1px solid rgba(245,158,11,.4)}
  #portal-asas .as-big{font-size:3rem;padding:.7rem 1.1rem;border-radius:1.5rem;background:rgba(15,118,110,.3)}
  #portal-asas .as-tabs{display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;padding:.6rem;border-radius:1rem;background:rgba(4,38,31,.8);border:1px solid rgba(20,184,166,.3)}
  #portal-asas .as-btn{cursor:pointer;border:1px solid #0f766e;background:rgba(15,118,110,.3);color:#e2e8f0;font-size:.78rem;font-weight:700;padding:.5rem .9rem;border-radius:.75rem;transition:.2s;font-family:inherit}
  #portal-asas .as-btn:hover{border-color:#22d3ee;color:#fff}
  #portal-asas .as-btn.on{background:#0d9488;border-color:#22d3ee;color:#fff;box-shadow:0 0 12px rgba(34,211,238,.4)}
  #portal-asas .as-btn.go{background:#0891b2;color:#fff;border-color:#22d3ee}
  #portal-asas .as-btn:disabled{opacity:.4;pointer-events:none}
  #portal-asas .as-card{padding:1.2rem;border-radius:1.5rem;border:2px solid rgba(20,184,166,.3);background:rgba(4,38,31,.6)}
  #portal-asas .as-menu{display:grid;gap:.8rem;grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
  #portal-asas .as-item{cursor:pointer;text-align:left;padding:1rem;border-radius:1rem;background:rgba(15,118,110,.2);border:1px solid rgba(20,184,166,.35);color:#e2e8f0;font-family:inherit;transition:.2s}
  #portal-asas .as-item:hover{border-color:#22d3ee;transform:translateY(-2px)}
  #portal-asas .as-item b{display:block;font-size:.9rem;color:#67e8f9;margin:.25rem 0}
  #portal-asas .as-item span.d{font-size:.72rem;color:#cbd5e1}
  #portal-asas .as-item .e{font-size:1.8rem}
  #portal-asas .as-sel{background:#042f2e;color:#cffafe;border:2px solid #0f766e;border-radius:.6rem;padding:.4rem .6rem;font-size:.8rem}
  #portal-asas .as-ar{font-family:'Amiri',serif;direction:rtl;display:inline-block;line-height:1.8}
  #portal-asas .as-q .as-ar{font-size:1.9rem;color:#fde68a}
  #portal-asas div.as-ar{display:block;text-align:center;font-size:2rem;color:#fde68a;margin:.5rem 0}
  #portal-asas .as-prog{height:8px;border-radius:99px;background:rgba(2,17,20,.8);overflow:hidden;margin-bottom:.6rem}
  #portal-asas .as-prog>div{height:100%;background:linear-gradient(90deg,#14b8a6,#22d3ee);transition:.3s}
  #portal-asas .as-meta{font-size:.72rem;font-weight:700;color:#5eead4;margin-bottom:.4rem}
  #portal-asas .as-q{font-size:.95rem;font-weight:700;color:#a5f3fc;line-height:1.6;margin-bottom:.8rem}
  #portal-asas .as-opts{display:grid;gap:.5rem}
  #portal-asas .as-opt{text-align:left;cursor:pointer;padding:.65rem .9rem;border-radius:.8rem;border:2px solid #0f766e;background:rgba(15,118,110,.2);color:#e2e8f0;font-size:.85rem;font-family:inherit;transition:.15s}
  #portal-asas .as-opt:hover{border-color:#22d3ee}
  #portal-asas .as-opt.ok{background:rgba(6,95,70,.85);border-color:#34d399}
  #portal-asas .as-opt.bad{background:rgba(127,29,29,.75);border-color:#f87171}
  #portal-asas .as-opt .as-ar{font-size:1.4rem}
  #portal-asas .as-fb{min-height:1.4rem;margin-top:.7rem;font-size:.82rem;font-weight:700;color:#fde68a}
  #portal-asas .as-foot{display:flex;flex-wrap:wrap;gap:.5rem;justify-content:space-between;align-items:center;margin-top:.8rem}
  #portal-asas .as-res{text-align:center}
  #portal-asas .as-score{font-size:3rem;font-weight:900;color:#fcd34d}
  #portal-asas .as-wrong{text-align:left;margin-top:1rem;font-size:.78rem;color:#e2e8f0}
  #portal-asas .as-wrong div{padding:.5rem .7rem;margin:.35rem 0;border-radius:.7rem;background:rgba(127,29,29,.3);border:1px solid rgba(248,113,113,.4)}
  #portal-asas .as-wrong b{color:#6ee7b7}
  #portal-asas .as-row{padding:.8rem;margin:.6rem 0;border-radius:1rem;background:rgba(2,17,20,.6);border:1px solid rgba(20,184,166,.25);font-size:.85rem;color:#e2e8f0;line-height:1.6}
  #portal-asas .as-row input[type=text],#portal-asas .as-row textarea{width:100%;margin-top:.4rem;background:#042f2e;color:#cffafe;border:2px solid #0f766e;border-radius:.6rem;padding:.45rem .6rem;font-size:.85rem;font-family:inherit}
  #portal-asas .as-row input.ok{border-color:#34d399}#portal-asas .as-row input.bad{border-color:#f87171}
  #portal-asas .as-key{margin-top:.4rem;font-size:.78rem;color:#fde68a}
  #portal-asas .as-flip{perspective:900px;max-width:420px;margin:0 auto}
  #portal-asas .as-fc{min-height:230px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:1.5rem;border-radius:1.5rem;border:2px solid #22d3ee;background:rgba(13,148,136,.25);cursor:pointer;color:#ecfeff;font-size:1.2rem;font-weight:700;user-select:none}
  #portal-asas .as-fc.back{background:rgba(180,83,9,.25);border-color:#f59e0b;color:#fef3c7}
  #portal-asas .as-fc .as-ar{font-size:2.6rem}
  #portal-asas .as-fc small{font-size:.68rem;color:#94a3b8;margin-top:.8rem;font-weight:600}
  #portal-asas .as-mem{display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem}
  @media(min-width:640px){#portal-asas .as-mem{grid-template-columns:repeat(4,1fr)}}
  #portal-asas .as-t{min-height:84px;display:flex;align-items:center;justify-content:center;text-align:center;padding:.4rem;border-radius:.9rem;border:2px solid #0f766e;background:rgba(15,118,110,.3);color:transparent;font-size:.78rem;font-weight:700;cursor:pointer;font-family:inherit;transition:.2s}
  #portal-asas .as-t:before{content:"❓";color:#5eead4;font-size:1.4rem;position:absolute}
  #portal-asas .as-t{position:relative}
  #portal-asas .as-t.on,#portal-asas .as-t.ok{color:#ecfeff;background:#0891b2;border-color:#fff}
  #portal-asas .as-t.on:before,#portal-asas .as-t.ok:before{content:""}
  #portal-asas .as-t.ok{background:rgba(6,95,70,.85);border-color:#34d399;pointer-events:none}
  #portal-asas .as-t .as-ar{font-size:1.4rem}
  `;
  var st = document.createElement('style'); st.id = 'as-style'; st.textContent = CSS; document.head.appendChild(st);

  /* ====================== MESIN KUIS ====================== */
  function runQuiz(box, qs, o) {
    var i = 0, sc = 0, wrong = [], answered = false;
    function show() {
      var q = qs[i]; answered = false;
      box.innerHTML = '<div class="as-prog"><div style="width:' + (i / qs.length * 100) + '%"></div></div>' +
        '<div class="as-meta">' + o.title + ' • Soal ' + (i + 1) + ' / ' + qs.length + '</div>' +
        '<div class="as-q">' + q.q + '</div>' +
        '<div class="as-opts" style="margin-top:.6rem">' + q.o.map(function (t, j) {
          return '<button class="as-opt" data-j="' + j + '"><b>' + String.fromCharCode(65 + j) + '.</b> ' + t + '</button>';
        }).join('') + '</div><div class="as-fb"></div><div class="as-foot"><span></span><button class="as-btn go" data-next="1" style="visibility:hidden">' + (i === qs.length - 1 ? 'Lihat Hasil ▶' : 'Lanjut ▶') + '</button></div>';
    }
    function finish() {
      var pct = Math.round(sc / qs.length * 100), isBest = saveBest(o.key, pct);
      box.innerHTML = '<div class="as-res"><div class="as-meta">' + o.title + '</div><div class="as-score">' + pct + '</div>' +
        '<div style="font-weight:700;color:#e2e8f0">Benar ' + sc + ' dari ' + qs.length + ' soal</div>' +
        '<div style="font-size:.8rem;color:#6ee7b7;margin-top:.3rem">' + (pct >= 80 ? 'MasyaAllah, luar biasa! 🎉' : pct >= 60 ? 'Bagus! Sedikit lagi ya 💪' : 'Ayo belajar lagi, pasti bisa! 📚') + '</div>' +
        '<div style="font-size:.72rem;color:#94a3b8;margin-top:.3rem">Skor terbaik: ' + best[o.key] + (isBest ? ' (rekor baru! ⭐)' : '') + '</div>' +
        '<div style="margin-top:.8rem"><button class="as-btn go" data-again="1">🔁 Ulangi (soal baru)</button></div></div>' +
        (wrong.length ? '<div class="as-wrong"><b style="color:#fca5a5">Soal yang perlu dipelajari lagi:</b>' + wrong.map(function (w) { return '<div>' + w.q + '<br>✅ <b>' + w.a + '</b></div>'; }).join('') + '</div>' : '');
    }
    box.onclick = function (e) {
      var t = e.target;
      var op = t.closest('.as-opt');
      if (op && !answered) {
        answered = true;
        var j = +op.getAttribute('data-j'), q = qs[i], fb = $('.as-fb', box);
        if (j === q.a) { sc++; op.classList.add('ok'); fb.textContent = '✅ Benar!'; }
        else {
          op.classList.add('bad'); box.querySelector('.as-opt[data-j="' + q.a + '"]').classList.add('ok');
          fb.innerHTML = '❌ Jawaban yang benar: ' + String.fromCharCode(65 + q.a); wrong.push({q: q.q, a: q.o[q.a]});
        }
        if (q.exp) fb.innerHTML += '<br><span style="color:#cbd5e1;font-weight:600">' + q.exp + '</span>';
        $('[data-next]', box).style.visibility = 'visible';
        return;
      }
      if (t.closest('[data-next]')) { i++; if (i < qs.length) show(); else finish(); return; }
      if (t.closest('[data-again]')) { o.again(); }
    };
    show();
  }

  /* ====================== ISIAN SINGKAT ====================== */
  function runIsian(box) {
    box.innerHTML = '<div class="as-meta">Isian Singkat • ketik jawaban singkatmu</div>' +
      AI_ISIAN.map(function (it, i) {
        return '<div class="as-row"><b>' + (i + 1) + '.</b> ' + it[0].replace('____', '<u>………………</u>') + '<input type="text" data-i="' + i + '" placeholder="Jawabanmu..." autocomplete="off"><div class="as-key" data-k="' + i + '"></div></div>';
      }).join('') + '<div class="as-foot"><div class="as-fb" id="as-isres"></div><div><button class="as-btn" data-do="reset">Ulangi</button> <button class="as-btn go" data-do="check">Periksa Jawaban</button></div></div>' +
      '<p style="font-size:.7rem;color:#94a3b8;margin-top:.5rem">Catatan: pemeriksaan otomatis mencari kata kunci. Jika jawabanmu benar tetapi memakai kata lain, cocokkan dengan kunci dan tanyakan pada gurumu.</p>';
    box.onclick = function (e) {
      var a = e.target.getAttribute('data-do'); if (!a) return;
      if (a === 'reset') { runIsian(box); return; }
      var ok = 0;
      AI_ISIAN.forEach(function (it, i) {
        var inp = $('input[data-i="' + i + '"]', box), v = norm(inp.value), good = v && it[1].some(function (k) { return v.indexOf(norm(k)) > -1; });
        inp.className = good ? 'ok' : 'bad'; if (good) ok++;
        $('[data-k="' + i + '"]', box).innerHTML = good ? '✅ Benar' : '❌ Kunci: <b>' + it[2] + '</b>';
      });
      var pct = ok * 10; saveBest('ai-isian', pct);
      $('#as-isres', box).textContent = 'Nilai isian: ' + pct + ' / 100 (terbaik ' + best['ai-isian'] + ')';
    };
  }

  /* ====================== URAIAN ====================== */
  function runUraian(box) {
    box.innerHTML = '<div class="as-meta">Uraian • tulis jawabanmu, lalu cocokkan dengan jawaban contoh</div>' +
      AI_URAIAN.map(function (it, i) {
        return '<div class="as-row"><b>' + (i + 1) + '.</b> ' + it[0] + '<textarea rows="3" placeholder="Tulis jawabanmu di sini..."></textarea>' +
          '<div style="margin-top:.4rem"><button class="as-btn" data-show="' + i + '">👁️ Lihat Jawaban Contoh</button></div><div class="as-key" data-a="' + i + '" style="display:none"><b>Jawaban contoh:</b><br>' + it[1] + '</div></div>';
      }).join('');
    box.onclick = function (e) {
      var s = e.target.getAttribute('data-show'); if (s === null) return;
      var k = $('[data-a="' + s + '"]', box); k.style.display = k.style.display === 'none' ? 'block' : 'none';
    };
  }

  /* ====================== KARTU KILAT (tanpa audio) ====================== */
  function runFlash(box, deck) {
    var d = shuf(deck), i = 0, back = false;
    function draw() {
      var c = d[i];
      box.innerHTML = '<div class="as-meta" style="text-align:center">Kartu ' + (i + 1) + ' / ' + d.length + ' • klik kartu untuk membalik</div>' +
        '<div class="as-flip"><div class="as-fc' + (back ? ' back' : '') + '" data-flip="1">' + (back ? c[1] : c[0]) + '<small>' + (back ? 'ARTI / JAWABAN' : 'KATA / PERTANYAAN') + '</small></div></div>' +
        '<div class="as-foot" style="justify-content:center"><button class="as-btn" data-n="-1">◀ Sebelumnya</button><button class="as-btn" data-sh="1">🔀 Acak</button><button class="as-btn go" data-n="1">Berikutnya ▶</button></div>';
    }
    box.onclick = function (e) {
      var t = e.target;
      if (t.closest('[data-flip]')) { back = !back; draw(); return; }
      if (t.closest('[data-sh]')) { d = shuf(d); i = 0; back = false; draw(); return; }
      var n = t.closest('[data-n]'); if (n) { i = (i + (+n.getAttribute('data-n')) + d.length) % d.length; back = false; draw(); }
    };
    draw();
  }

  /* ====================== KARTU JODOH (tanpa audio) ====================== */
  /* items: [teks A, teks B, -, 1 jika A berupa Arab] */
  function runMemory(box, items) {
    function start() {
      var pick = shuf(items).slice(0, 6), tiles = [];
      pick.forEach(function (it, k) {
        tiles.push({k: k, t: it[3] ? ar(it[0]) : it[0]});
        tiles.push({k: k, t: it[1]});
      });
      tiles = shuf(tiles);
      var open = [], matched = 0, moves = 0, lock = false;
      box.innerHTML = '<div class="as-meta">Kartu Jodoh • buka dua kartu, cocokkan kata dengan artinya</div><div class="as-mem">' +
        tiles.map(function (t, i) { return '<button class="as-t" data-i="' + i + '">' + t.t + '</button>'; }).join('') +
        '</div><div class="as-foot"><div class="as-fb" id="as-mm">Langkah: 0</div><button class="as-btn" data-new="1">🔁 Acak Baru</button></div>';
      box.onclick = function (e) {
        if (e.target.closest('[data-new]')) { start(); return; }
        var b = e.target.closest('.as-t'); if (!b || lock) return;
        var i = +b.getAttribute('data-i');
        if (open.indexOf(i) > -1 || b.classList.contains('ok')) return;
        b.classList.add('on'); open.push(i);
        if (open.length === 2) {
          moves++; $('#as-mm', box).textContent = 'Langkah: ' + moves;
          var A = open[0], B = open[1], bs = box.querySelectorAll('.as-t');
          if (tiles[A].k === tiles[B].k) {
            bs[A].classList.remove('on'); bs[B].classList.remove('on'); bs[A].classList.add('ok'); bs[B].classList.add('ok'); open = []; matched++;
            if (matched === pick.length) { $('#as-mm', box).innerHTML = '🎉 Selesai dalam ' + moves + ' langkah! أَحْسَنْتَ'; }
          } else {
            lock = true;
            setTimeout(function () { bs[A].classList.remove('on'); bs[B].classList.remove('on'); open = []; lock = false; }, 850);
          }
        }
      };
    }
    start();
  }

  /* ====================== PORTAL ====================== */
  var R, subj = 'ai', babSel = 'all';
  var HTML =
    '<button onclick="switchPortal(\'home\')" class="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-2 bg-teal-950 px-3 py-1.5 rounded-lg border border-teal-800 w-fit"><i class="fa-solid fa-arrow-left"></i> Kembali ke Dashboard</button>' +
    '<div class="as-hero"><div><span class="as-badge">ASAS • KELAS 3</span><h2>Asesmen Sumatif Akhir Semester</h2><p>Baca rangkuman materi, lalu berlatih soal Al-Islam dan kosakata Bahasa Arab Bab 1–4 lewat pilihan ganda, isian, kartu kilat, dan kartu jodoh.</p></div><div class="as-big">📝</div></div>' +
    '<div class="as-tabs"><button class="as-btn on" data-subj="ai">🕋 Al-Islam</button><button class="as-btn" data-subj="ar">🔤 Bahasa Arab</button><button class="as-btn" data-subj="rm">📚 Rangkuman Materi</button></div>' +
    '<div class="as-card" id="as-stage"></div>';

  function item(e, t, d, act) { return '<button class="as-item" data-act="' + act + '"><div class="e">' + e + '</div><b>' + t + '</b><span class="d">' + d + '</span></button>'; }

  function menu() {
    var s = $('#as-stage'), h;
    if (subj === 'rm') {
      s.innerHTML = RM_HTML;
      return;
    }
    if (subj === 'ai') {
      h = '<div class="as-meta">Pilih jenis latihan Al-Islam</div><div class="as-menu">' +
        item('📝', 'Simulasi PG (30 soal)', 'Soal berurutan, pilihan jawaban diacak. Skor terbaik: ' + (best['ai-pg30'] != null ? best['ai-pg30'] : '-'), 'ai-pg30') +
        item('🎲', 'Latihan Acak PG (10 soal)', 'Soal diacak dari 30 soal. Skor terbaik: ' + (best['ai-pg10'] != null ? best['ai-pg10'] : '-'), 'ai-pg10') +
        item('✏️', 'Isian Singkat (10 soal)', 'Ketik jawaban, diperiksa otomatis. Terbaik: ' + (best['ai-isian'] != null ? best['ai-isian'] : '-'), 'ai-isian') +
        item('📖', 'Uraian (5 soal)', 'Tulis jawaban lalu bandingkan dengan jawaban contoh', 'ai-uraian') +
        item('🃏', 'Kartu Kilat', 'Balik kartu: istilah, arti, dan tokoh', 'ai-flash') +
        item('🧩', 'Kartu Jodoh', 'Permainan memori: cocokkan istilah dengan artinya', 'ai-mem') + '</div>';
    } else {
      var opts = '<option value="all">Semua Bab (1–4)</option>' + [1, 2, 3, 4].map(function (b) { return '<option value="' + b + '"' + (String(babSel) === String(b) ? ' selected' : '') + '>Bab ' + b + ': ' + BAB[b] + '</option>'; }).join('');
      h = '<div style="display:flex;flex-wrap:wrap;gap:.6rem;align-items:center;margin-bottom:.8rem"><span class="as-meta" style="margin:0">Pilih materi:</span><select class="as-sel" id="as-bab">' + opts + '</select></div>' +
        '<div class="as-menu">' +
        item('📝', 'Latihan PG (10 soal)', 'Arab → arti dan arti → Arab', 'ar-pg10') +
        item('🎯', 'Simulasi PG (20 soal)', 'Lebih banyak soal (pilih Semua Bab untuk 20 soal penuh)', 'ar-pg20') +
        item('🃏', 'Kartu Kilat', 'Lihat kata Arab, tebak artinya', 'ar-flash') +
        item('🧩', 'Kartu Jodoh', 'Permainan memori: kata Arab ↔ artinya', 'ar-mem') + '</div>';
    }
    s.innerHTML = h;
    var sel = $('#as-bab', s); if (sel) sel.onchange = function () { babSel = sel.value; };
  }

  function open(act) {
    var s = $('#as-stage');
    s.innerHTML = '<button class="as-btn" data-back="1">◀ Kembali ke menu</button><div id="as-act" style="margin-top:.9rem"></div>';
    var b = $('#as-act', s);
    var p = String(babSel), bl = p === 'all' ? 'Semua Bab' : 'Bab ' + p;
    function pg(n, mix, key) { runQuiz(b, buildQs(AI_PG, n, mix), {title: 'Al-Islam', key: key, again: function () { open(act); }}); }
    function apg(n) { runQuiz(b, arQs(p, n), {title: 'Bahasa Arab • ' + bl, key: 'ar-' + p + '-' + n, again: function () { open(act); }}); }
    if (act === 'ai-pg30') pg(0, false, 'ai-pg30');
    else if (act === 'ai-pg10') pg(10, true, 'ai-pg10');
    else if (act === 'ai-isian') runIsian(b);
    else if (act === 'ai-uraian') runUraian(b);
    else if (act === 'ai-flash') runFlash(b, AI_TERMS.map(function (x) { return [x[0], x[1]]; }));
    else if (act === 'ai-mem') runMemory(b, AI_TERMS.map(function (x) { return [x[0], x[1]]; }));
    else if (act === 'ar-pg10') apg(10);
    else if (act === 'ar-pg20') apg(20);
    else if (act === 'ar-flash') runFlash(b, arPool(p).map(function (w) { return [w[0] + '<br>' + ar(w[1]), w[0] + ' ' + w[2]]; }));
    else if (act === 'ar-mem') runMemory(b, arPool(p).map(function (w) { return [w[1], w[2], null, 1]; }));
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  /* ====================== PEMASANGAN ====================== */
  function init() {
    var anchor = document.getElementById('portal-korektor') || document.getElementById('portal-home');
    if (!anchor || document.getElementById('portal-asas')) return;

    /* hapus menu Murojaah (tombol nav, ubin dashboard, portal) */
    document.querySelectorAll('[onclick="switchPortal(\'murojaah\')"]').forEach(function (n) { n.remove(); });
    var mj = document.getElementById('portal-murojaah'); if (mj) mj.remove();

    R = document.createElement('div');
    R.id = 'portal-asas'; R.className = 'w-full max-w-5xl hidden space-y-4'; R.innerHTML = HTML;
    anchor.parentNode.insertBefore(R, anchor.nextSibling);
    menu();

    R.addEventListener('click', function (e) {
      var t = e.target;

      /* tab di dalam Rangkuman Materi */
      var rt = t.closest('.rm-tab');
      if (rt) {
        var nama = rt.getAttribute('data-rm');
        R.querySelectorAll('.rm-tab').forEach(function (x) {
          var aktif = x.getAttribute('data-rm') === nama;
          x.setAttribute('aria-selected', aktif ? 'true' : 'false');
          var pn = R.querySelector('#rm-panel-' + x.getAttribute('data-rm'));
          if (pn) pn.hidden = !aktif;
        });
        return;
      }

      var sb = t.closest('[data-subj]');
      if (sb) { subj = sb.getAttribute('data-subj'); R.querySelectorAll('[data-subj]').forEach(function (x) { x.classList.toggle('on', x === sb); }); menu(); return; }
      var a = t.closest('[data-act]'); if (a && $('#as-stage').contains(a) && a.classList.contains('as-item')) { open(a.getAttribute('data-act')); return; }
      if (t.closest('[data-back]')) menu();
    });

    var nav = document.getElementById('btn-portal-korektor');
    if (nav && !document.getElementById('btn-portal-asas')) {
      var b = document.createElement('button');
      b.id = 'btn-portal-asas'; b.className = nav.className.replace(/\bactive\b/, '').trim();
      b.setAttribute('onclick', "switchPortal('asas')");
      b.innerHTML = '<i class="fa-solid fa-pen-ruler mr-1"></i> ASAS';
      nav.parentNode.appendChild(b);
    }
    var grid = document.querySelector('#portal-home > .grid');
    if (grid) {
      var tile = document.createElement('div');
      tile.setAttribute('onclick', "switchPortal('asas')");
      tile.className = 'metro-tile p-6 rounded-2xl cursor-pointer flex flex-col justify-between h-48 border-yellow-500/40';
      tile.innerHTML = '<div class="flex items-center justify-between"><span class="w-12 h-12 bg-yellow-950/80 rounded-xl flex items-center justify-center text-yellow-300 text-2xl border border-yellow-500/30"><i class="fa-solid fa-pen-ruler"></i></span><span class="text-[10px] font-bold text-yellow-300 bg-yellow-950 px-2.5 py-1 rounded-full uppercase border border-yellow-500/30">ASAS</span></div>' +
        '<div><h3 class="text-lg font-bold text-white tracking-wide">ASAS KELAS 3</h3><p class="text-xs text-gray-300 mt-1">Rangkuman materi serta latihan Al-Islam &amp; Bahasa Arab: pilihan ganda, isian, kartu kilat, dan kartu jodoh.</p></div>';
      grid.appendChild(tile);
    }

    var orig = window.switchPortal;
    if (typeof orig === 'function') {
      window.switchPortal = function (p) {
        var el = document.getElementById('portal-asas'), bt = document.getElementById('btn-portal-asas');
        if (el) el.classList.add('hidden');
        if (bt) bt.classList.remove('active');
        orig(p);
        if (p === 'asas') {
          if (el) el.classList.remove('hidden');
          if (bt) bt.classList.add('active');
          window.scrollTo({top: 0, behavior: 'smooth'});
        }
      };
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
