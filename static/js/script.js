// NAV
function scrollTop(e){e&&e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})}
function navTo(e,id){e&&e.preventDefault();var el=document.querySelector(id);if(el)el.scrollIntoView({behavior:'smooth'})}
function toggleMenu(){document.getElementById('mobile-menu').classList.toggle('open');document.getElementById('overlay').classList.toggle('open')}
function closeMenu(){document.getElementById('mobile-menu').classList.remove('open');document.getElementById('overlay').classList.remove('open')}

// MODALS
function openChat(){openModal('chat-modal')}
function trackLead(){try{if(typeof fbq==='function')fbq('track','Lead');if(typeof gtag==='function')gtag('event','generate_lead',{event_category:'CTA'});}catch(e){}}

function submitLeadForm(e){
  e.preventDefault();
  var btn=document.getElementById('formBtn');
  btn.disabled=true;btn.textContent='Mengirim…';
  var nama=document.getElementById('lf-nama').value.trim();
  var wa=document.getElementById('lf-wa').value.trim();
  var kebutuhan=document.getElementById('lf-kebutuhan').value;
  var bisnis=document.getElementById('lf-bisnis').value.trim();
  // Fire tracking
  trackLead();
  try{if(typeof fbq==='function')fbq('track','Contact');}catch(e){}
  // Send via WhatsApp deep-link to owner as fallback (works always, no server needed)
  var pesan=encodeURIComponent('Halo, saya '+nama+' ingin info sistem AI.\nKebutuhan: '+kebutuhan+(bisnis?'\nBisnis: '+bisnis:'')+'\nNo WA: '+wa);
  // Show success state immediately, open WA in bg
  document.getElementById('form-wrap').style.display='none';
  document.getElementById('form-success').style.display='block';
  setTimeout(function(){window.open('https://wa.me/6281907552758?text='+pesan,'_blank');},600);
}
function openModal(id){document.getElementById(id).classList.add('open');document.body.style.overflow='hidden'}
function closeModal(id){document.getElementById(id).classList.remove('open');document.body.style.overflow=''}
document.querySelectorAll('.modal-overlay').forEach(function(m){m.addEventListener('click',function(e){if(e.target===m){m.classList.remove('open');document.body.style.overflow=''}})})

// SCROLL TO TOP
window.addEventListener('scroll',function(){
  var btn=document.getElementById('scroll-top');
  btn.classList.toggle('show',window.scrollY>300);
},{ passive:true });

// DEMO SIMULATOR
var SCENARIOS = {
  properti:{
    botName:'AI Frontliner — Properti',
    messages:[
      {type:'user',text:'Halo, saya lihat iklan rumah di Antapani. Harganya berapa?'},
      {type:'typing',delay:800},
      {type:'bot',text:'👋 Halo! Selamat datang.\n\nUntuk info harga terkini, boleh saya tanya dulu:\n1️⃣ Budget yang disiapkan?\n2️⃣ Untuk keluarga berapa orang?\n\nSaya carikan unit yang paling sesuai!'},
      {type:'user',text:'Budget 500 juta, untuk 4 orang',delay:1200},
      {type:'typing',delay:1000},
      {type:'bot',text:'✅ Ada 2 unit cocok untuk Anda:\n\n🏡 Tipe 36/72 — Rp 485 juta\n• 2 kamar tidur, KPR BTN ready\n\n🏡 Tipe 45/90 — Rp 520 juta\n• 3 kamar tidur, cocok 2 anak\n\nMau saya kirim brosur lengkapnya?'},
      {type:'user',text:'Mau dong!',delay:1000},
      {type:'typing',delay:600},
      {type:'bot',text:'📄 Brosur terkirim!\n\nAgen kami akan hubungi Anda dalam 10 menit untuk jadwal survey gratis 🏠'}
    ]
  },
  klinik:{
    botName:'AI Frontliner — Klinik',
    messages:[
      {type:'user',text:'Dok, bisa konsultasi gigi hari ini?'},
      {type:'typing',delay:700},
      {type:'bot',text:'👋 Halo! Selamat datang di Klinik.\n\nUntuk jadwal konsultasi gigi, ada slot tersedia:\n\n⏰ Hari ini: 14.00 & 16.30 WIB\n⏰ Besok: 09.00, 11.00, 15.00 WIB\n\nJam berapa yang paling nyaman?'},
      {type:'user',text:'Jam 14.00 bisa',delay:1000},
      {type:'typing',delay:800},
      {type:'bot',text:'✅ Slot 14.00 hari ini dikonfirmasi!\n\nBoleh saya catat:\n1️⃣ Nama lengkap?\n2️⃣ Keluhan utama?\n\nReminder otomatis akan dikirim 1 jam sebelumnya 🦷'},
      {type:'user',text:'Andi, sakit gigi geraham kiri',delay:1200},
      {type:'typing',delay:600},
      {type:'bot',text:'📋 Tercatat!\n\nAndi — Konsultasi gigi 14.00 hari ini.\nDokter: drg. Sarah\n\nSampai jumpa! 😊'}
    ]
  },
  toko:{
    botName:'AI Frontliner — Toko Online',
    messages:[
      {type:'user',text:'Kak, sepatu size 42 masih ada stok?'},
      {type:'typing',delay:600},
      {type:'bot',text:'👟 Halo! Terima kasih udah mampir!\n\nUntuk size 42, masih tersedia:\n✅ Putih — 3 pcs\n✅ Hitam — 1 pcs (hampir habis!)\n❌ Navy — habis\n\nMau yang warna apa?'},
      {type:'user',text:'Yang hitam masih ada? Berapa harganya?',delay:1000},
      {type:'typing',delay:700},
      {type:'bot',text:'🔥 Hitam size 42 masih 1 pcs!\n\nHarga: Rp 285.000\n(Sudah termasuk ongkir Jabodetabek)\n\nMau langsung order? Nanti saya buatkan link pembayaran 🛒'},
      {type:'user',text:'Iya mau order sekarang',delay:900},
      {type:'typing',delay:500},
      {type:'bot',text:'✅ Siap! Stok sudah dicadangkan.\n\n📦 Kirim link order ke WhatsApp ini ya.\nEstimasi pengiriman: 1-2 hari kerja 🚀'}
    ]
  },
  b2b:{
    botName:'AI Frontliner — B2B',
    messages:[
      {type:'user',text:'Halo, kami butuh jasa cleaning kantor. Bisa survey dulu?'},
      {type:'typing',delay:800},
      {type:'bot',text:'👋 Halo! Terima kasih telah menghubungi kami.\n\nUntuk layanan cleaning kantor, boleh info:\n1️⃣ Luas area (m²)?\n2️⃣ Kota/lokasi kantor?\n3️⃣ Frekuensi: harian/mingguan/bulanan?'},
      {type:'user',text:'Sekitar 500m2, di Bandung, mingguan',delay:1200},
      {type:'typing',delay:900},
      {type:'bot',text:'📊 Estimasi untuk kebutuhan Anda:\n\n✅ Area 500m² — Bandung\n✅ Cleaning mingguan (4x/bulan)\n💰 Estimasi: Rp 1,8 – 2,2 juta/bulan\n\nMau jadwalkan survey gratis untuk penawaran pasti?'},
      {type:'user',text:'Bisa, kapan bisa survey?',delay:1000},
      {type:'typing',delay:600},
      {type:'bot',text:'📅 Tim survey tersedia:\n• Besok: 10.00 atau 14.00 WIB\n• Lusa: 09.00 atau 13.00 WIB\n\nSlot mana yang cocok? Konfirmasi sekarang sebelum penuh ✅'}
    ]
  }
};

var currentIndustry='properti';
var isPlaying=false;
var demoTimeouts=[];

function selectIndustry(btn){
  document.querySelectorAll('.ind-btn').forEach(function(b){b.classList.remove('active')});
  btn.classList.add('active');
  currentIndustry=btn.dataset.ind;
  document.getElementById('bot-name').textContent=SCENARIOS[currentIndustry].botName;
  resetDemo();
}

function resetDemo(){
  demoTimeouts.forEach(clearTimeout);
  demoTimeouts=[];
  isPlaying=false;
  var chat=document.getElementById('phone-chat');
  chat.innerHTML='<div class="typing-bubble" id="typing-bubble"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';
  var btn=document.getElementById('demo-run-btn');
  btn.disabled=false;
  btn.textContent='▶ Mulai Simulasi';
}

function runDemo(){
  if(isPlaying)return;
  resetDemo();
  isPlaying=true;
  var btn=document.getElementById('demo-run-btn');
  btn.disabled=true;
  btn.textContent='⏸ Sedang Berjalan...';
  var msgs=SCENARIOS[currentIndustry].messages;
  var delay=0;
  msgs.forEach(function(msg,i){
    if(msg.type==='typing'){
      var d=delay;
      demoTimeouts.push(setTimeout(function(){
        document.getElementById('typing-bubble').classList.add('show');
        scrollChat();
      },d));
      delay+=msg.delay||800;
      demoTimeouts.push(setTimeout(function(){
        document.getElementById('typing-bubble').classList.remove('show');
      },delay));
    } else {
      var d2=delay+(i===0?0:1200);
      delay=d2;
      (function(m,d){
        demoTimeouts.push(setTimeout(function(){
          addMessage(m.type,m.text);
        },d));
      })(msg,d2);
    }
  });
  demoTimeouts.push(setTimeout(function(){
    isPlaying=false;
    btn.disabled=false;
    btn.textContent='↺ Putar Ulang';
  },delay+1500));
}

function addMessage(type,text){
  var chat=document.getElementById('phone-chat');
  var typing=document.getElementById('typing-bubble');
  var div=document.createElement('div');
  div.className='chat-msg '+(type==='bot'?'bot':'user');
  div.innerHTML='<div>'+text.replace(/\n/g,'<br>')+'</div><div class="chat-time">Selesai</div>';
  chat.insertBefore(div,typing);
  scrollChat();
}

function scrollChat(){
  var c=document.getElementById('phone-chat');
  setTimeout(function(){c.scrollTop=c.scrollHeight},50);
}