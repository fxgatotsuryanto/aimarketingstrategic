/* ===== AI Readiness Assessment - Scoring Engine ===== */

// 5 Functions × 3 Questions = 15 questions, scale 1-5
const FUNCTIONS = [
  { id: 'marketing',      label: 'Marketing & Pemasaran', icon: '📢' },
  { id: 'operations',     label: 'Operasional',           icon: '⚙️' },
  { id: 'cs',             label: 'Customer Service',      icon: '💬' },
  { id: 'finance',        label: 'Keuangan',              icon: '💰' },
  { id: 'hr',             label: 'SDM & HR',              icon: '👥' },
];

const QUESTIONS = [
  // Marketing (3)
  { id: 'm1', func: 'marketing', text: 'Seberapa rutin bisnis Anda menggunakan data pelanggan (histori pembelian, demografi) untuk menentukan strategi promosi?' },
  { id: 'm2', func: 'marketing', text: 'Seberapa otomatis proses pengiriman promosi/broadcast ke pelanggan Anda saat ini?' },
  { id: 'm3', func: 'marketing', text: 'Apakah bisnis Anda sudah menggunakan tools digital (Google Ads, FB/IG Ads, SEO) untuk menjangkau pelanggan baru?' },
  // Operations (3)
  { id: 'o1', func: 'operations', text: 'Seberapa besar operasional harian (pesanan, stok, jadwal) masih dicatat secara manual di buku/notes?' },
  { id: 'o2', func: 'operations', text: 'Apakah bisnis Anda memiliki sistem untuk melacak stok barang secara real-time atau terjadwal?' },
  { id: 'o3', func: 'operations', text: 'Seberapa sering proses bisnis berjalan tanpa pengawasan langsung Anda (owner/manajer)?' },
  // Customer Service (3)
  { id: 'c1', func: 'cs', text: 'Bagaimana cara Anda menangani pertanyaan berulang (FAQ) dari pelanggan saat ini?' },
  { id: 'c2', func: 'cs', text: 'Seberapa cepat (rata-rata) tim Anda membalas chat/pesan pelanggan di WhatsApp?' },
  { id: 'c3', func: 'cs', text: 'Apakah Anda memiliki sistem untuk follow-up pelanggan setelah pembelian (minta review, tanya kepuasan, rekomendasi)?' },
  // Finance (3)
  { id: 'f1', func: 'finance', text: 'Bagaimana proses pencatatan pemasukan dan pengeluaran harian bisnis Anda saat ini?' },
  { id: 'f2', func: 'finance', text: 'Seberapa sering Anda membuat laporan keuangan (laba/rugi, arus kas) untuk evaluasi bisnis?' },
  { id: 'f3', func: 'finance', text: 'Apakah Anda sudah menggunakan aplikasi/fitur untuk mengirim reminder pembayaran atau tagihan otomatis ke pelanggan?' },
  // HR (3)
  { id: 'h1', func: 'hr', text: 'Bagaimana proses rekrutmen dan onboarding karyawan baru dijalankan saat ini?' },
  { id: 'h2', func: 'hr', text: 'Apakah ada sistem pencatatan absensi/kehadiran dan jadwal shift karyawan?' },
  { id: 'h3', func: 'hr', text: 'Seberapa besar proses evaluasi kinerja dan feedback ke karyawan dilakukan secara terstruktur?' },
];

// Scale 1-5 labels
const SCALE_LABELS = [
  { value: 1, label: 'Sepenuhnya Manual' },
  { value: 2, label: 'Sebagian Manual' },
  { value: 3, label: 'Campuran Manual & Digital' },
  { value: 4, label: 'Sebagian Terotomatisasi' },
  { value: 5, label: 'Sepenuhnya Digital/Otomatis' },
];

// Tool recommendations per function
const RECOMMENDED_TOOLS = [
  // Marketing
  { func: 'marketing', name: 'Wablas', type: 'freemium', desc: 'Broadcast & auto-reply WhatsApp marketing', url: 'https://wablas.com', savings: '10-20 jam/bln', cost: 'Gratis - Rp150rb/bln' },
  { func: 'marketing', name: 'Qontak', type: 'paid', desc: 'CRM + WA blast + segmentation untuk UMKM', url: 'https://qontak.com', savings: '15-25 jam/bln', cost: 'Rp350rb/bln' },
  { func: 'marketing', name: 'Meta Business Suite', type: 'free', desc: 'Jadwalkan posting IG/FB otomatis + analytics', url: 'https://business.facebook.com', savings: '5-10 jam/bln', cost: 'Gratis' },
  { func: 'marketing', name: 'Google Business Profile', type: 'free', desc: 'Optimasi Google Maps + posting update + review', url: 'https://business.google.com', savings: '3-5 jam/bln', cost: 'Gratis' },
  // Operations
  { func: 'operations', name: 'Mekari (Jurnal)', type: 'paid', desc: 'Akuntansi & inventori terintegrasi UMKM', url: 'https://mekari.com/jurnal', savings: '15-30 jam/bln', cost: 'Rp99rb - Rp249rb/bln' },
  { func: 'operations', name: 'BukuWarung', type: 'free', desc: 'Catat stok & transaksi via HP gratis', url: 'https://bukawarung.com', savings: '10-20 jam/bln', cost: 'Gratis' },
  { func: 'operations', name: 'Paper.id', type: 'free', desc: 'Invoice otomatis + tracking pembayaran', url: 'https://paper.id', savings: '8-15 jam/bln', cost: 'Gratis - Rp99rb/bln' },
  { func: 'operations', name: 'n8n', type: 'free', desc: 'Otomatisasi workflow antar aplikasi (open source)', url: 'https://n8n.io', savings: '20-40 jam/bln', cost: 'Gratis (self-host)' },
  // Customer Service
  { func: 'cs', name: 'Wablas Auto-Reply', type: 'freemium', desc: 'Auto-balas FAQ & kata kunci otomatis di WA', url: 'https://wablas.com', savings: '15-30 jam/bln', cost: 'Gratis - Rp150rb/bln' },
  { func: 'cs', name: 'Teman UMKM', type: 'free', desc: 'Balas otomatis WA Basic (keyword trigger)', url: 'https://temanumkm.com', savings: '10-20 jam/bln', cost: 'Gratis' },
  { func: 'cs', name: 'Chatwoot', type: 'free', desc: 'Helpdesk multi-channel open source (WA, IG, web)', url: 'https://chatwoot.com', savings: '10-15 jam/bln', cost: 'Gratis (self-host)' },
  { func: 'cs', name: 'ManyChat', type: 'paid', desc: 'Chatbot WA dengan flow visual drag-drop', url: 'https://manychat.com', savings: '20-40 jam/bln', cost: 'Mulai Rp650rb/bln' },
  // Finance
  { func: 'finance', name: 'BukuKas', type: 'free', desc: 'Catat pemasukan/pengeluaran + laporan otomatis', url: 'https://bukukas.com', savings: '8-15 jam/bln', cost: 'Gratis' },
  { func: 'finance', name: 'Paper.id', type: 'free', desc: 'Invoice otomatis, tracking pembayaran, reminder tagihan', url: 'https://paper.id', savings: '10-20 jam/bln', cost: 'Gratis - Rp99rb/bln' },
  { func: 'finance', name: 'Mekari Jurnal', type: 'paid', desc: 'Laporan keuangan lengkap + auto-rekonsiliasi bank', url: 'https://mekari.com/jurnal', savings: '20-30 jam/bln', cost: 'Rp99rb - Rp249rb/bln' },
  { func: 'finance', name: 'Xero', type: 'paid', desc: 'Akuntansi cloud untuk UMKM (multi-currency)', url: 'https://xero.com', savings: '15-25 jam/bln', cost: 'Mulai Rp170rb/bln' },
  // HR
  { func: 'hr', name: 'Mekari Talenta', type: 'paid', desc: 'HRIS lengkap — absensi, payroll, rekrutmen', url: 'https://mekari.com/talenta', savings: '10-20 jam/bln', cost: 'Rp30rb - Rp100rb/karyawan/bln' },
  { func: 'hr', name: 'Gadjian', type: 'paid', desc: 'Payroll + BPJS otomatis untuk UMKM', url: 'https://gadjian.com', savings: '8-15 jam/bln', cost: 'Mulai Rp25rb/karyawan/bln' },
  { func: 'hr', name: 'Google Sheets + AI', type: 'free', desc: 'Template absensi & tracker kerja kolaboratif', url: 'https://sheets.google.com', savings: '3-5 jam/bln', cost: 'Gratis' },
  { func: 'hr', name: 'Notion', type: 'free', desc: 'Database SOP, onboarding, tracker kinerja tim', url: 'https://notion.so', savings: '5-10 jam/bln', cost: 'Gratis' },
];

// Score thresholds and interpretations
const SCORE_CATEGORIES = [
  { min: 0,   max: 20,  label: 'AI Beginner',       color: '#ef4444', category: 'Pemula Digital',      desc: 'Bisnis Anda masih sangat manual. Ada peluang besar untuk efisiensi dengan digitalisasi dasar.' },
  { min: 21,  max: 40,  label: 'AI Explorer',        color: '#f59e0b', category: 'Penjelajah Awal',    desc: 'Anda sudah mulai menggunakan tools digital tapi belum tersistem. Saatnya merapikan fondasi.' },
  { min: 41,  max: 60,  label: 'AI Practitioner',    color: '#06b6d4', category: 'Praktisi AI',         desc: 'Digitalisasi sudah berjalan di beberapa fungsi. Sekarang saatnya mengintegrasikan dan otomatisasi.' },
  { min: 61,  max: 80,  label: 'AI Adapter',         color: '#8b5cf6', category: 'Pengadopsi AI',       desc: 'Anda sudah memiliki sistem digital yang baik. Fokus pada otomatisasi lanjutan dan AI.' },
  { min: 81,  max: 100, label: 'AI Ready',           color: '#10b981', category: 'Siap AI',             desc: 'Bisnis Anda sangat siap mengadopsi AI. Saatnya ke tingkat otomatisasi cerdas.' },
];

// Generate recommendations based on scores
function generateRecommendations(scores) {
  const recs = [];
  const sorted = [...Object.entries(scores)].sort((a, b) => a[1] - b[1]);

  // Priority 1: Lowest scoring function
  const lowest = sorted[0];
  recs.push({
    priority: 1,
    func: lowest[0],
    funcLabel: FUNCTIONS.find(f => f.id === lowest[0])?.label || lowest[0],
    title: 'Prioritas Utama: ' + (FUNCTIONS.find(f => f.id === lowest[0])?.label || lowest[0]),
    detail: getFunctionAdvice(lowest[0], lowest[1]),
    icon: '🔴',
  });

  // Priority 2: Second lowest
  const second = sorted[1];
  recs.push({
    priority: 2,
    func: second[0],
    funcLabel: FUNCTIONS.find(f => f.id === second[0])?.label || second[0],
    title: 'Langkah Kedua: ' + (FUNCTIONS.find(f => f.id === second[0])?.label || second[0]),
    detail: getFunctionAdvice(second[0], second[1]),
    icon: '🟡',
  });

  // Priority 3: Function with most impact potential
  const third = sorted[2] || { 0: 'marketing', 1: 50 };
  recs.push({
    priority: 3,
    func: third[0],
    funcLabel: FUNCTIONS.find(f => f.id === third[0])?.label || third[0],
    title: 'Langkah Ketiga: ' + (FUNCTIONS.find(f => f.id === third[0])?.label || third[0]),
    detail: 'Setelah fondasi ' + (FUNCTIONS.find(f => f.id === lowest[0])?.label || lowest[0]) + ' dan ' + (FUNCTIONS.find(f => f.id === second[0])?.label || second[0]) + ' diperkuat, fokus pada fungsi ini untuk mendapatkan dampak sinergis.',
    icon: '🟢',
  });

  return recs;
}

function getFunctionAdvice(funcId, score) {
  const advice = {
    marketing: [
      'Skor rendah: Mulai dengan Google Business Profile gratis untuk mengoptimalkan visibilitas lokal. Buat jadwal konten rutin di Meta Business Suite.',
      'Skor menengah: Integrasikan Wablas untuk broadcast tersegmentasi berdasarkan data pelanggan. Manfaatkan fitur analytics untuk ukur efektivitas promosi.',
      'Skor tinggi: Gunakan AI tools seperti ManyChat untuk personalisasi broadcast otomatis. Implementasikan retargeting ads dengan data pelanggan existing.',
    ],
    operations: [
      'Skor rendah: Mulai dengan BukuWarung atau Paper.id untuk digitalisasi catatan stok dan transaksi. Ganti buku catatan dengan spreadsheet sederhana.',
      'Skor menengah: Implementasikan n8n untuk workflow otomatis sederhana (notifikasi stok, order reminder). Gunakan template otomasi siap pakai.',
      'Skor tinggi: Integrasikan seluruh operasional (stok, penjualan, pembelian) dalam satu platform seperti Mekari Jurnal. Buat dashboard real-time.',
    ],
    cs: [
      'Skor rendah: Aktifkan fitur Auto-Reply dasar di Wablas untuk pertanyaan yang sering muncul (jam buka, harga, alamat). Susun daftar FAQ bisnis Anda.',
      'Skor menengah: Buat flow chatbot untuk 5-10 skenario paling sering menggunakan Chatwoot atau Wablas advanced. Tambahkan sistem follow-up otomatis.',
      'Skor tinggi: Implementasikan chatbot AI dengan natural language untuk handle 80% pertanyaan. Integrasikan dengan CRM untuk personalisasi layanan.',
    ],
    finance: [
      'Skor rendah: Download BukuKas atau Paper.id gratis — mulai catat semua transaksi harian di aplikasi. Buat kebiasaan mencatat setiap malam.',
      'Skor menengah: Gunakan Paper.id untuk invoice otomatis + reminder pembayaran. Buat laporan laba/rugi bulanan sederhana dari data yang sudah tercatat.',
      'Skor tinggi: Migrasi ke Mekari Jurnal untuk laporan keuangan komprehensif. Otomatiskan rekonsiliasi bank dan laporan pajak.',
    ],
    hr: [
      'Skor rendah: Buat SOP sederhana di Google Docs/Notion untuk proses rekrutmen & onboarding. Gunakan Google Sheets untuk tracker absensi.',
      'Skor menengah: Implementasikan Gadjian atau Mekari Talenta untuk payroll dan absensi. Buat sistem evaluasi kinerja bulanan via Google Form.',
      'Skor tinggi: Gunakan HRIS penuh untuk manajemen SDM terintegrasi. Otomatiskan pengumuman jadwal shift dan reminder tugas via WA.',
    ],
  };
  const funcAdvice = advice[funcId] || ['Mulai dengan tools digital dasar untuk fungsi ini.'];
  if (score <= 30) return funcAdvice[0];
  if (score <= 65) return funcAdvice[1];
  return funcAdvice[2];
}

// Calculate savings estimate
function calculateSavings(scores) {
  let totalHours = 0;
  let totalMoney = 0;

  Object.entries(scores).forEach(([funcId, score]) => {
    const hoursPerFunc = (100 - score) / 100 * 40; // up to 40 hours/month savings per function
    totalHours += hoursPerFunc;
  });

  // Assume Rp25,000/hour value (UMKM staff wage approximation)
  totalMoney = Math.round(totalHours * 25000);
  totalHours = Math.round(totalHours);

  return { hours: totalHours, money: totalMoney };
}

// Calculate all scores from raw answers
function calculateScores(answers) {
  const funcScores = {};
  let totalScore = 0;
  let totalQuestions = 0;

  FUNCTIONS.forEach(f => {
    const funcQs = QUESTIONS.filter(q => q.func === f.id);
    let sum = 0;
    funcQs.forEach(q => {
      sum += answers[q.id] || 0;
    });
    const avg = sum / funcQs.length;
    const scaledScore = Math.round((avg - 1) / 4 * 100); // Scale 1-5 → 0-100
    funcScores[f.id] = scaledScore;
    totalScore += scaledScore;
    totalQuestions++;
  });

  const overallScore = Math.round(totalScore / totalQuestions);

  return {
    overall: overallScore,
    functions: funcScores,
    answers: answers,
    category: getCategory(overallScore),
    timestamp: new Date().toISOString(),
  };
}

function getCategory(score) {
  return SCORE_CATEGORIES.find(c => score >= c.min && score <= c.max) || SCORE_CATEGORIES[0];
}

// Format date
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}

// Score circle colors
function getScoreColor(score) {
  if (score <= 20) return '#ef4444';
  if (score <= 40) return '#f59e0b';
  if (score <= 60) return '#06b6d4';
  if (score <= 80) return '#8b5cf6';
  return '#10b981';
}