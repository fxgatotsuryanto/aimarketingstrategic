
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Workflow, 
  CheckCircle2, 
  TrendingUp, 
  MessageCircle, 
  LayoutDashboard, 
  ArrowRight,
  Menu,
  X,
  Linkedin,
  Cpu,
  AlertCircle,
  Database,
  Target,
  UserCheck,
  XCircle,
  Youtube,
  Check,
  MessageSquare,
  Lightbulb
} from 'lucide-react';

// Chat Modal Component
const ChatModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md h-[85vh] flex flex-col rounded-3xl relative shadow-2xl overflow-hidden">
        <div className="bg-primary text-white p-4 flex justify-between items-center shrink-0">
          <h3 className="font-bold font-robot uppercase tracking-wider text-sm">Konsultasi Gratis</h3>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        <iframe 
          src="https://ai.newton.co.id/webhook/f263072c-d9fd-47e0-82e5-a85af72df984/chat" 
          className="w-full flex-1 border-none"
          allow="microphone"
        ></iframe>
      </div>
    </div>
  );
};

// Privacy Policy Component
const PrivacyPolicy: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white text-gray-900 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl p-8 md:p-12 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold font-robot mb-6 text-primary uppercase">Kebijakan Privasi</h2>
        <div className="space-y-4 text-sm leading-relaxed text-gray-600">
          <p>Terakhir diperbarui: Maret 2026</p>
          <p>Kami di AI Marketing Strategic sangat menghargai privasi Anda. Halaman ini merinci kebijakan kami mengenai pengumpulan, penggunaan, dan pengungkapan informasi pribadi.</p>
          <h3 className="font-bold text-primary uppercase mt-6">1. Informasi yang Kami Kumpulkan</h3>
          <p>Kami mengumpulkan informasi dasar saat Anda menghubungi kami via Chat untuk keperluan konsultasi pembuatan website dan sistem bisnis.</p>
          <h3 className="font-bold text-primary uppercase mt-6">2. Penggunaan Data</h3>
          <p>Data digunakan untuk keperluan pengerjaan proyek website atau sistem yang Anda pesan.</p>
          <p className="pt-6">Jika ada pertanyaan, hubungi kami di hallo@aimarketingstrategic.com.</p>
        </div>
        <div className="mt-10">
          <button onClick={onClose} className="w-full bg-primary text-white py-4 rounded-xl font-bold font-robot uppercase tracking-widest hover:bg-blue-900 transition-colors">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

// Terms of Service Component
const TermsOfService: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white text-gray-900 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl p-8 md:p-12 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold font-robot mb-6 text-primary uppercase">Ketentuan Layanan</h2>
        <div className="space-y-4 text-sm leading-relaxed text-gray-600">
          <p>Terakhir diperbarui: Maret 2026</p>
          <p>Selamat datang di layanan AI Marketing Strategic.</p>
          <h3 className="font-bold text-primary uppercase mt-6">1. Layanan Jasa</h3>
          <p>Kami menyediakan jasa pembuatan website, setup WhatsApp auto respon, dan sistem kontrol bisnis sederhana untuk UMKM.</p>
          <h3 className="font-bold text-primary uppercase mt-6">2. Pembayaran</h3>
          <p>Detail pembayaran dan termin akan disepakati dalam invoice resmi sebelum pengerjaan dimulai.</p>
          <div className="mt-10">
          <button onClick={onClose} className="w-full bg-primary text-white py-4 rounded-xl font-bold font-robot uppercase tracking-widest hover:bg-blue-900 transition-colors">
            Tutup
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

// Reusable Section Components
const Section: React.FC<{ 
  id?: string;
  className?: string; 
  title?: string; 
  subtitle?: string;
  children: React.ReactNode;
  bgType?: 'white' | 'light' | 'dark' | 'gradient';
  titleCentered?: boolean;
}> = ({ id, className = "", title, subtitle, children, bgType = 'white', titleCentered = true }) => {
  const bgClasses = {
    white: 'bg-white',
    light: 'bg-[#F8FAFC]',
    dark: 'bg-[#0B2A4A] text-white',
    gradient: 'bg-gradient-to-b from-[#0B2A4A] to-[#081F36] text-white'
  };

  const isDark = bgType === 'dark' || bgType === 'gradient';

  return (
    <section id={id} className={`py-12 md:py-20 px-6 md:px-12 lg:px-24 ${bgClasses[bgType]} ${className}`}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <div className={`flex flex-col ${titleCentered ? 'items-center text-center' : 'items-start text-left'} mb-12`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`h-[1px] w-12 hidden md:block ${isDark ? 'bg-white/20' : 'bg-primary/20'}`}></div>
              <h2 className={`text-xl md:text-2xl lg:text-3xl font-black font-robot uppercase tracking-widest ${isDark ? 'text-white' : 'text-primary'}`}>
                {title}
              </h2>
              <div className={`h-[1px] w-12 hidden md:block ${isDark ? 'bg-white/20' : 'bg-primary/20'}`}></div>
            </div>
            {subtitle && (
              <p className={`${isDark ? 'text-blue-100/60' : 'text-gray-500'} font-medium text-sm md:text-lg max-w-2xl leading-relaxed`}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};


// INTERACTIVE DEMO SIMULATOR TYPES
interface ChatMessage {
    type: 'user' | 'bot' | 'typing';
    text?: string;
    delay?: number;
}

interface IndustryScenario {
    botName: string;
    messages: ChatMessage[];
}

const SCENARIOS: Record<string, IndustryScenario> = {
    properti: {
        botName: "AI Frontliner — Properti",
        messages: [
            { type: 'user', text: 'Halo, saya lihat iklan rumah di Antapani. Harganya berapa?', delay: 0 },
            { type: 'typing', delay: 800 },
            { type: 'bot', text: '👋 Halo! Selamat datang.\n\nUntuk info harga terkini, boleh saya tanya dulu:\n1️⃣ Budget yang disiapkan?\n2️⃣ Untuk keluarga berapa orang?\n\nSaya carikan unit yang paling sesuai!', delay: 0 },
            { type: 'user', text: 'Budget 500 juta, untuk 4 orang', delay: 1200 },
            { type: 'typing', delay: 1000 },
            { type: 'bot', text: '✅ Ada 2 unit cocok untuk Anda:\n\n🏡 Tipe 36/72 — Rp 485 juta\n• 2 kamar tidur, KPR BTN ready\n\n🏡 Tipe 45/90 — Rp 520 juta\n• 3 kamar tidur, cocok 2 anak\n\nMau saya kirim brosur lengkapnya?', delay: 0 },
            { type: 'user', text: 'Mau dong!', delay: 1000 },
            { type: 'typing', delay: 600 },
            { type: 'bot', text: '📄 Brosur terkirim!\n\nAgen kami akan hubungi Anda dalam 10 menit untuk jadwal survey gratis 🏠', delay: 0 }
        ]
    },
    klinik: {
        botName: "AI Frontliner — Klinik",
        messages: [
            { type: 'user', text: 'Dok, bisa konsultasi gigi hari ini?', delay: 0 },
            { type: 'typing', delay: 700 },
            { type: 'bot', text: '👋 Halo! Selamat datang di Klinik.\n\nUntuk jadwal konsultasi gigi, ada slot tersedia:\n\n⏰ Hari ini: 14.00 & 16.30 WIB\n⏰ Besok: 09.00, 11.00, 15.00 WIB\n\nJam berapa yang paling nyaman?', delay: 0 },
            { type: 'user', text: 'Jam 14.00 bisa', delay: 1000 },
            { type: 'typing', delay: 800 },
            { type: 'bot', text: '✅ Slot 14.00 hari ini dikonfirmasi!\n\nBoleh saya catat:\n1️⃣ Nama lengkap?\n2️⃣ Keluhan utama?\n\nReminder otomatis akan dikirim 1 jam sebelumnya 🦷', delay: 0 },
            { type: 'user', text: 'Andi, sakit gigi geraham kiri', delay: 1200 },
            { type: 'typing', delay: 600 },
            { type: 'bot', text: '📋 Tercatat!\n\nAndi — Konsultasi gigi 14.00 hari ini.\nDokter: drg. Sarah\n\nSampai jumpa! 😊', delay: 0 }
        ]
    },
    toko: {
        botName: "AI Frontliner — Toko Online",
        messages: [
            { type: 'user', text: 'Kak, sepatu size 42 masih ada stok?', delay: 0 },
            { type: 'typing', delay: 600 },
            { type: 'bot', text: '👟 Halo! Terima kasih udah mampir!\n\nUntuk size 42, masih tersedia:\n✅ Putih — 3 pcs\n✅ Hitam — 1 pcs (hampir habis!)\n❌ Navy — habis\n\nMau yang warna apa?', delay: 0 },
            { type: 'user', text: 'Yang hitam masih ada? Berapa harganya?', delay: 1000 },
            { type: 'typing', delay: 700 },
            { type: 'bot', text: '🔥 Hitam size 42 masih 1 pcs!\n\nHarga: Rp 285.000\n(Sudah termasuk ongkir Jabodetabek)\n\nMau langsung order? Nanti saya buatkan link pembayaran 🛒', delay: 0 },
            { type: 'user', text: 'Iya mau order sekarang', delay: 900 },
            { type: 'typing', delay: 500 },
            { type: 'bot', text: '✅ Siap! Stok sudah dicadangkan.\n\n📦 Kirim link order ke WhatsApp ini ya.\nEstimasi pengiriman: 1-2 hari kerja 🚀', delay: 0 }
        ]
    },
    b2b: {
        botName: "AI Frontliner — B2B",
        messages: [
            { type: 'user', text: 'Halo, kami butuh jasa cleaning kantor. Bisa survey dulu?', delay: 0 },
            { type: 'typing', delay: 800 },
            { type: 'bot', text: '👋 Halo! Terima kasih telah menghubungi kami.\n\nUntuk layanan cleaning kantor, boleh info:\n1️⃣ Luas area (m²)?\n2️⃣ Kota/lokasi kantor?\n3️⃣ Frekuensi: harian/mingguan/bulanan?', delay: 0 },
            { type: 'user', text: 'Sekitar 500m2, di Bandung, mingguan', delay: 1200 },
            { type: 'typing', delay: 900 },
            { type: 'bot', text: '📊 Estimasi untuk kebutuhan Anda:\n\n✅ Area 500m² — Bandung\n✅ Cleaning mingguan (4x/bulan)\n💰 Estimasi: Rp 1,8 – 2,2 juta/bulan\n\nMau jadwalkan survey gratis untuk penawaran pasti?', delay: 0 },
            { type: 'user', text: 'Bisa, kapan bisa survey?', delay: 1000 },
            { type: 'typing', delay: 600 },
            { type: 'bot', text: '📅 Tim survey tersedia:\n• Besok: 10.00 atau 14.00 WIB\n• Lusa: 09.00 atau 13.00 WIB\n\nSlot mana yang cocok? Konfirmasi sekarang sebelum penuh ✅', delay: 0 }
        ]
    }
};

// INTERACTIVE DEMO SIMULATOR COMPONENT
const DemoSimulator: React.FC<{ onInstall: () => void }> = ({ onInstall }) => {
    const [activeIndustry, setActiveIndustry] = useState('properti');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const mainTimeoutsRef = useRef<NodeJS.Timeout[]>([]);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const phoneRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback((instant = false) => {
        if (chatContainerRef.current) {
            const container = chatContainerRef.current;
            container.scrollTo({
                top: container.scrollHeight,
                behavior: instant ? 'auto' : 'smooth'
            });
        }
    }, []);

    useEffect(() => {
        // Re-calculate scroll after items are rendered
        const timeoutId = setTimeout(() => scrollToBottom(), 100);
        return () => clearTimeout(timeoutId);
    }, [messages, isTyping, scrollToBottom]);

    const cleanupTimeouts = () => {
        mainTimeoutsRef.current.forEach(clearTimeout);
        mainTimeoutsRef.current = [];
    };

    const resetDemo = useCallback(() => {
        cleanupTimeouts();
        setMessages([]);
        setIsTyping(false);
        setIsPlaying(false);
    }, []);

    const runStep = useCallback((stepIndex: number, scenarioMessages: ChatMessage[]) => {
        if (stepIndex >= scenarioMessages.length) {
            setIsPlaying(false);
            return;
        }

        const msg = scenarioMessages[stepIndex];
        
        const timeout = setTimeout(() => {
            if (msg.type === 'typing') {
                setIsTyping(true);
                const typingTimeout = setTimeout(() => {
                    setIsTyping(false);
                    runStep(stepIndex + 1, scenarioMessages);
                }, msg.delay);
                mainTimeoutsRef.current.push(typingTimeout);
            } else {
                setMessages(prev => [...prev, msg]);
                runStep(stepIndex + 1, scenarioMessages);
            }
        }, stepIndex === 0 ? 0 : 1200);
        
        mainTimeoutsRef.current.push(timeout);
    }, []);

    const startDemo = useCallback(() => {
        if (isPlaying) return;
        resetDemo();
        setIsPlaying(true);
        runStep(0, SCENARIOS[activeIndustry].messages);
        
        // Scroll to phone mockup so user can see the simulation
        if (phoneRef.current) {
            const yOffset = -100; // Account for fixed header
            const y = phoneRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }, [activeIndustry, isPlaying, resetDemo, runStep]);

    const changeIndustry = (ind: string) => {
        setActiveIndustry(ind);
        resetDemo();
    };

    return (
        <Section id="demo-simulator" bgType="dark" className="border-t border-white/5 py-16 relative overflow-hidden">
            {/* Background enhancement */}
            <div className="absolute inset-0 bg-[#0B1929] pointer-events-none"></div>
            
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header Sub-Section */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full mb-6">
                        <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                        <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em]">● LIVE DEMO SIMULATION</span>
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-black font-robot text-white mb-6 uppercase tracking-tight">
                        Lihat AI Frontliner Bekerja
                    </h2>
                    <p className="text-blue-100/60 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Simulasi percakapan nyata — persis seperti yang akan terjadi di bisnis Anda
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Columns 1: Phone Mockup */}
                    <div ref={phoneRef} className="flex justify-center order-2 lg:order-1">
                        <div className="relative">
                            {/* Phone Frame */}
                            <div className="w-[300px] md:w-[320px] h-[600px] md:h-[640px] bg-[#1a1a2e] rounded-[50px] border-[10px] md:border-[12px] border-[#0F172A] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5),0_0_40px_rgba(245,124,0,0.15)] relative overflow-hidden">
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-[#0F172A] rounded-b-3xl z-30"></div>
                                
                                {/* WA UI Header */}
                                <div className="bg-[#1f2c34] p-4 pt-10 flex items-center gap-4 relative z-20">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-blue-900 flex items-center justify-center font-bold text-white text-xs border border-white/20">
                                        AI
                                    </div>
                                    <div className="overflow-hidden">
                                        <div className="text-white font-bold text-sm leading-none mb-1 truncate">{SCENARIOS[activeIndustry].botName}</div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 bg-[#25d366] rounded-full"></div>
                                            <div className="text-[10px] text-[#25d366] font-medium uppercase tracking-[0.2em]">online</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Chat Area */}
                                <div 
                                    ref={chatContainerRef}
                                    className="h-[calc(100%-100px)] bg-[#0b141a] p-4 overflow-y-auto no-scrollbar scroll-smooth flex flex-col gap-3 relative pb-20 pt-10"
                                >
                                    {/* WA Wallpaper Texture Placeholder */}
                                    <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
                                    
                                    <AnimatePresence mode="popLayout">
                                        {messages.map((msg, i) => (
                                            <motion.div 
                                                key={`msg-${i}`}
                                                layout
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                className={`max-w-[85%] p-4 text-xs md:text-sm leading-relaxed relative shadow-lg ${
                                                    msg.type === 'bot' 
                                                    ? 'self-start bg-[#2a3942] text-white rounded-2xl rounded-tl-none border border-white/5' 
                                                    : 'self-end bg-[#005c4b] text-white rounded-2xl rounded-tr-none border border-white/5'
                                                }`}
                                            >
                                                <div className="whitespace-pre-line font-medium">{msg.text}</div>
                                                <div className="text-[9px] opacity-40 text-right mt-2 font-mono uppercase tracking-[0.2em]">Selesai</div>
                                            </motion.div>
                                        ))}

                                        {isTyping && (
                                            <motion.div 
                                                key="typing"
                                                layout
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                                                className="self-start bg-[#1f2c34] px-4 py-3 rounded-2xl rounded-tr-[30px] flex gap-1 z-10"
                                            >
                                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Placeholder Input */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#0b141a] border-t border-white/5 flex items-center gap-2 z-20">
                                    <div className="flex-1 h-10 bg-[#1f2c34] rounded-full border border-white/5 opacity-50"></div>
                                    <div className="w-10 h-10 bg-[#25d366] rounded-full flex items-center justify-center text-white">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columns 2: Controls */}
                    <div className="order-1 lg:order-2">
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-[30px] md:rounded-[40px] shadow-2xl relative overflow-hidden">
                            <h3 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-8">Pilih industri untuk simulasi:</h3>
                            
                            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-10">
                                {[
                                    { id: 'properti', name: 'Properti', icon: '🏠' },
                                    { id: 'klinik', name: 'Klinik', icon: '🏥' },
                                    { id: 'toko', name: 'Toko Online', icon: '🛒' },
                                    { id: 'b2b', name: 'B2B Jasa', icon: '🏢' }
                                ].map((ind) => (
                                    <button 
                                        key={ind.id}
                                        onClick={() => changeIndustry(ind.id)}
                                        className={`px-3 py-4 rounded-xl md:rounded-2xl font-bold font-robot text-[10px] md:text-xs uppercase tracking-widest transition-all text-center border-2 flex items-center justify-center gap-2 md:gap-3 active:scale-95 ${
                                            activeIndustry === ind.id 
                                            ? 'bg-orange-500 border-orange-500 text-white shadow-[0_10px_20px_rgba(245,124,0,0.3)]' 
                                            : 'bg-transparent border-orange-500/30 text-orange-500 hover:border-orange-500/60'
                                        }`}
                                    >
                                        <span className="text-base md:text-lg">{ind.icon}</span> {ind.name}
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-col gap-4 mb-12">
                                <button 
                                    onClick={startDemo}
                                    disabled={isPlaying}
                                    className={`w-full py-5 rounded-2xl font-black font-robot text-xs md:text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 active:scale-95 ${
                                        isPlaying 
                                        ? 'bg-white/10 text-white/50 cursor-not-allowed border border-white/5' 
                                        : 'bg-orange-500 text-white shadow-[0_20px_40px_rgba(245,124,0,0.4)] hover:bg-orange-600'
                                    }`}
                                >
                                    {isPlaying ? (
                                        <>⏸ Sedang Berjalan...</>
                                    ) : (
                                        <>{messages.length > 0 ? '↺ Putar Ulang' : '▶ Mulai Simulasi'}</>
                                    )}
                                </button>
                                
                                <button 
                                    onClick={resetDemo}
                                    className="w-full py-2 rounded-xl font-bold font-robot text-[9px] text-white/30 hover:text-white uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                                >
                                    ↺ Reset Simulasi
                                </button>
                            </div>

                            <div className="space-y-4 border-t border-white/5 pt-8 mb-8">
                                <div className="flex items-center gap-3 text-white/80 text-xs md:text-sm font-medium">
                                    <Check className="text-orange-500" size={16} /> AI merespons dalam hitungan detik
                                </div>
                                <div className="flex items-center gap-3 text-white/80 text-xs md:text-sm font-medium">
                                    <Check className="text-orange-500" size={16} /> Kualifikasi leads otomatis 24/7
                                </div>
                                <div className="flex items-center gap-3 text-white/80 text-xs md:text-sm font-medium">
                                    <Check className="text-orange-500" size={16} /> Tidak perlu admin tambahan
                                </div>
                            </div>

                            <p className="text-[9px] md:text-[10px] text-white/30 italic mb-10 leading-relaxed text-center">
                                "Ini bukan rekaman — sistem yang sama akan bekerja di bisnis Anda"
                            </p>

                            <button 
                                onClick={onInstall} 
                                className="w-full bg-transparent border-2 border-orange-500 text-orange-500 py-4 rounded-xl font-black font-robot text-[10px] uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all active:scale-95"
                            >
                                Pasang di Bisnis Saya →
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </Section>
    );
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Initial load top scroll
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Parallax listener
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Links
  const linkedinLink = "https://www.linkedin.com/company/aimarketingstrategic";
  const youtubeLink = "https://www.youtube.com/@AIMarketingStrategic";

  // Modified scroll/nav handler
  const handleNavigation = useCallback((e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, target: string) => {
    e.preventDefault();
    closeMenu();

    if (target === 'home' || target === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target.startsWith('#')) {
      const element = document.getElementById(target.replace('#', ''));
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const menuItems = [
    { label: 'Solusi', href: '#ai-frontliner' },
    { label: 'Simulasi', href: '#demo-simulator' },
    { label: 'Modules', href: '#modul' },
    { label: 'Harga', href: '#harga' },
    { label: 'Hasil', href: '#hasil' }
  ];

  // Image Paths
  const heroBgUrl = "https://aimarketingstrategic.com/images/backgroundrobot.png";
  const ctaSystemUrl = "https://aimarketingstrategic.com/images/neuraflowsystem.png";

  return (
    <div className={`flex flex-col min-h-screen bg-white font-sans selection:bg-orange-500 selection:text-white ${isImageZoomed ? 'overflow-hidden' : ''}`}>
      {/* 0. HEADER / NAVBAR (Non-sticky for more space) */}
      <header className="absolute top-0 left-0 right-0 bg-[#0B2A4A]/80 backdrop-blur-xl z-[100] border-b border-white/5 no-print">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={(e) => handleNavigation(e, 'home')}
              className="focus:outline-none hover:opacity-80 transition-opacity"
            >
              <img 
                src="https://aimarketingstrategic.com/images/logo%20aims.png" 
                alt="AI Marketing Strategic Logo" 
                className="h-8 md:h-12 w-auto"
              />
            </button>
          </div>
          
          {/* Desktop Navigation - Priority sections for closing */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                onClick={(e) => handleNavigation(e, item.href)}
                className="text-white/60 hover:text-orange-500 font-bold font-robot text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsChatOpen(true)}
              className="hidden sm:flex bg-[#F57C00] text-white px-6 py-2.5 rounded-xl font-bold font-robot text-[10px] hover:bg-orange-600 transition-all shadow-lg shadow-orange-900/20 uppercase tracking-widest active:scale-95 items-center gap-2"
            >
              Demo Gratis
            </button>
            
            {/* Hamburger for mobile and extra menu access */}
            <button 
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Floating Menu Button - Only visible when header is scrolled away */}
      <AnimatePresence>
        {scrollY > 100 && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="fixed top-6 right-6 md:right-12 z-[110] text-white p-3 bg-[#0B2A4A] hover:bg-orange-600 rounded-2xl tracking-widest transition-all border border-white/20 shadow-2xl active:scale-95"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Menu Popup (Integrated with Floating Logic) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop for closing */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[115]"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20, x: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20, x: 20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed top-20 right-6 md:right-12 w-64 bg-[#0B2A4A] border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-[120] p-6"
            >
              <nav className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <a 
                    key={item.label}
                    href={item.href} 
                    onClick={(e) => handleNavigation(e, item.href)}
                    className="text-white/70 hover:text-orange-500 font-bold font-robot text-xs uppercase tracking-widest transition-colors py-3 px-4 rounded-xl hover:bg-white/5 block border-b border-white/5 last:border-0"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-4 mt-2 border-t border-white/10">
                  <button 
                    onClick={() => { setIsChatOpen(true); closeMenu(); }}
                    className="w-full bg-[#F57C00] text-white py-3.5 rounded-xl font-bold font-robot text-[10px] hover:bg-orange-600 transition-all shadow-xl uppercase tracking-widest active:scale-95 text-center flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={14} /> Konsultasi Gratis
                  </button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="animate-fade-in w-full">
            {/* 1. HERO SECTION */}
            <section className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[750px] flex items-center pt-24 pb-12 md:pt-36 md:pb-20 px-6 md:px-12 lg:px-24 bg-[#061626] text-white overflow-hidden">
                
                {/* Layer 0: Background */}
                <div 
                className="absolute inset-0 bg-no-repeat bg-center bg-cover z-0 transition-transform duration-100 ease-out opacity-30 pointer-events-none" 
                style={{ 
                    backgroundImage: `url('${heroBgUrl}')`,
                    transform: `translateY(${scrollY * 0.1}px)`
                }}
                />
                
                {/* Layer 1: Gradients */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#061626] via-[#061626]/60 to-transparent z-[1]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061626] via-transparent to-transparent z-[1]" />

                {/* Layer 3: Content */}
                <div className="max-w-7xl mx-auto relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-10 xl:col-span-8 animate-fade-in flex flex-col items-start text-left">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full mb-8 backdrop-blur-sm">
                        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        <p className="text-orange-500 font-robot text-[10px] md:text-xs lg:text-sm uppercase tracking-[0.3em] font-black">AI Marketing Strategic</p>
                    </div>
                    
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-black font-robot leading-[1.1] mb-6 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] uppercase tracking-tight">
                        WEBSITE, CHAT, DAN FOLLOW-UP <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">MASIH BERJALAN SENDIRI-SENDIRI?</span>
                    </h1>
                    
                    <p className="text-base md:text-lg text-blue-50/90 mb-6 max-w-2xl leading-relaxed font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                        Bangun AI Frontliner yang menangkap leads, membalas chat, mengkualifikasi calon customer, dan menjalankan follow-up otomatis — tanpa menambah beban admin.
                    </p>
                    
                    <p className="text-sm md:text-base text-orange-400 font-bold tracking-widest uppercase mb-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                        Sistem AI siap pakai untuk bisnis yang ingin berkembang.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-5 max-w-lg w-full items-start sm:items-center">
                        <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
                            <div className="flex flex-col sm:flex-row gap-4 w-full">
                                <button 
                                  onClick={() => setIsChatOpen(true)}
                                  className="bg-[#F57C00] text-white px-8 py-4 rounded-xl font-bold font-robot text-xs md:text-sm hover:bg-orange-600 transition-all shadow-[0_15px_30px_rgba(245,124,0,0.5)] uppercase tracking-widest active:scale-95 flex items-center justify-center text-center w-full sm:w-auto gap-2"
                                >
                                  Jadwalkan Demo Gratis
                                </button>
                                <a 
                                  href="#harga"
                                  onClick={(e) => handleNavigation(e, '#harga')}
                                  className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-bold font-robot text-xs md:text-sm hover:bg-white/20 transition-all uppercase tracking-widest active:scale-95 flex items-center justify-center text-center w-full sm:w-auto gap-2 backdrop-blur-sm"
                                >
                                  Lihat Paket & Harga
                                </a>
                            </div>
                            <span className="text-[10px] text-blue-200/70 uppercase tracking-widest font-bold mt-2">1 Modul AI Frontliner mulai Rp 1,5 juta · Setup 3 hari · Termasuk support 2 minggu</span>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 opacity-50">
                        <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-blue-100">
                            <Check size={14} className="text-orange-500" /> Setup dalam 3 hari
                        </div>
                        <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-blue-100">
                            <Check size={14} className="text-orange-500" /> Support 2 minggu
                        </div>
                        <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-blue-100">
                            <Check size={14} className="text-orange-500" /> Tanpa kontrak jangka panjang
                        </div>
                    </div>

                    <div className="mt-16 flex flex-wrap gap-12 opacity-80">
                        <div className="flex flex-col">
                        <span className="font-robot text-2xl font-black text-white">Balas Chat</span>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-blue-300">Otomatis 24 Jam</span>
                        </div>
                        <div className="flex flex-col">
                        <span className="font-robot text-2xl font-black text-white">Tangkap Leads</span>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-blue-300">Tanpa Kelewat</span>
                        </div>
                        <div className="flex flex-col">
                        <span className="font-robot text-2xl font-black text-white">Follow-Up</span>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-blue-300">Jalan Sendiri</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>

            {/* 1.5 SECTION: VIDEO DEMO */}
            <Section id="demo-video" title="Saksikan Bagaimana AI Menyelamatkan 40% Leads Anda Secara Real-Time" subtitle="Berhenti membiarkan calon klien Anda berpaling ke kompetitor hanya karena respon yang lambat" bgType="light" className="border-t border-gray-100">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-white rounded-[40px] border border-gray-100 p-4 md:p-8 shadow-xl flex flex-col items-center justify-center"
                >
                    <div className="w-full rounded-3xl overflow-hidden bg-[#061626] shadow-inner relative">
                        <video 
                            controls 
                            className="w-full h-auto aspect-video object-cover"
                            preload="metadata"
                            poster="https://aimarketingstrategic.com/images/background.png"
                        >
                            <source src="https://aimarketingstrategic.com/images/Pemasaran_Berkonversi_Tinggi_Otomatis.mp4" type="video/mp4" />
                            Browser Anda tidak mendukung pemutaran video.
                        </video>
                    </div>
                </motion.div>
            </Section>

            {/* 1.6 SECTION: INTERACTIVE DEMO SIMULATOR */}
            <DemoSimulator onInstall={() => setIsChatOpen(true)} />

            {/* 2. SECTION: TANTANGAN BISNIS (Masalah UMKM) */}
            <Section 
                id="tantangan"
                title="Kenapa Bisnis Susah Naik Kelas?"
                subtitle="Pertumbuhan sering tertahan karena hampir semua hal masih harus dikerjakan manual oleh tim."
                bgType="white" 
                className="relative -mt-6 z-20 rounded-t-[50px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]"
            >
                <div className="flex flex-wrap justify-center gap-8 mb-10">
                {[
                    { 
                    icon: <Users className="text-orange-500" size={32} />, 
                    title: "Calon Pembeli Kabur",
                    desc: "Prospek hilang karena chat baru dibalas saat admin sempat — sering sudah terlambat."
                    },
                    { 
                    icon: <Database className="text-orange-500" size={32} />, 
                    title: "Sibuk Urus Data Manual",
                    desc: "Waktu dan biaya habis untuk pindah-pindah data antara Excel dan WhatsApp."
                    },
                    { 
                    icon: <AlertCircle className="text-orange-500" size={32} />, 
                    title: "Semua Numpuk ke Owner",
                    desc: "Bisnis sulit berkembang karena hampir setiap keputusan harus menunggu owner atau manajer turun tangan."
                    },
                ].map((item, idx) => (
                    <div key={idx} className="flex flex-col bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm hover:shadow-2xl hover:border-orange-200 transition-all duration-500 group text-center items-center w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.33%-2rem)]">
                    <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 mb-6">
                        {item.icon}
                    </div>
                    <h3 className="text-lg font-black font-robot text-primary uppercase leading-tight mb-4">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                ))}
                </div>
            </Section>

            {/* 2.5 SECTION: AI WEBSITE FRONTLINER */}
            <Section id="ai-frontliner" title="WEBSITE BIASA HANYA DILIHAT. AI WEBSITE FRONTLINER BEKERJA." subtitle="Website modern bukan lagi brosur digital. Ia harus mampu menangkap leads, menjawab otomatis, mengarahkan calon customer, dan bekerja 24/7." bgType="light" className="border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    {/* Card 1 */}
                    <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full items-start">
                        <div className="w-14 h-14 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <MessageSquare size={28} />
                        </div>
                        <h3 className="text-xl font-black font-robot text-primary uppercase mb-6 leading-tight">AI Webchat Frontliner</h3>
                        
                        <div className="w-full space-y-4">
                            <div className="border-l-2 border-red-200 pl-4">
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Masalah</h4>
                                <p className="text-sm font-medium text-gray-700">Visitor datang, bertanya, lalu hilang.</p>
                            </div>
                            <div className="border-l-2 border-orange-300 pl-4">
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Sistem</h4>
                                <p className="text-sm font-medium text-gray-700">AI menjawab, mengkualifikasi, dan mengarahkan leads otomatis.</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-2xl border border-green-100 mt-4">
                                <h4 className="text-[10px] font-bold text-green-700 uppercase tracking-widest mb-1">Dampak</h4>
                                <p className="text-sm font-medium text-green-800">Prospek masuk ke pipeline, bukan berhenti di chat.</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#0B2A4A] text-white rounded-[40px] border border-blue-900 p-8 shadow-2xl relative flex flex-col h-full items-start group">
                        <div className="w-14 h-14 bg-white/10 text-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Database size={28} />
                        </div>
                        <h3 className="text-xl font-black font-robot text-white uppercase mb-6 leading-tight">Website + CRM Intake</h3>
                        
                        <div className="w-full space-y-4">
                            <div className="border-l-2 border-red-500/50 pl-4">
                                <h4 className="text-[10px] font-bold text-blue-200/50 uppercase tracking-widest mb-1">Masalah</h4>
                                <p className="text-sm font-medium text-blue-50">Data customer tercecer di WhatsApp dan spreadsheet.</p>
                            </div>
                            <div className="border-l-2 border-orange-500 pl-4">
                                <h4 className="text-[10px] font-bold text-blue-200/50 uppercase tracking-widest mb-1">Sistem</h4>
                                <p className="text-sm font-medium text-blue-50">Form website langsung sinkron ke database dan workflow follow-up.</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 mt-4">
                                <h4 className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-1">Dampak</h4>
                                <p className="text-sm font-medium text-green-100">Tidak ada lagi copy-paste data manual.</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full items-start">
                        <div className="w-14 h-14 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Target size={28} />
                        </div>
                        <h3 className="text-xl font-black font-robot text-primary uppercase mb-6 leading-tight">AI Landing Page Conversion</h3>
                        
                        <div className="w-full space-y-4">
                            <div className="border-l-2 border-red-200 pl-4">
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Masalah</h4>
                                <p className="text-sm font-medium text-gray-700">Traffic masuk tapi tidak menjadi prospek.</p>
                            </div>
                            <div className="border-l-2 border-orange-300 pl-4">
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Sistem</h4>
                                <p className="text-sm font-medium text-gray-700">Landing page dengan AI interaction flow dan CTA tracking.</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-2xl border border-green-100 mt-4">
                                <h4 className="text-[10px] font-bold text-green-700 uppercase tracking-widest mb-1">Dampak</h4>
                                <p className="text-sm font-medium text-green-800">Website berubah menjadi mesin akuisisi.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* 3. SECTION: MODUL BISNIS AUTOPILOT */}
            <Section id="modul" title="Modul Bisnis Autopilot" subtitle="Sistem siap pakai yang mengotomatiskan bisnis Anda — mulai dari menjaring pembeli sampai memantau hasilnya." bgType="white" className="border-y border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    {/* Modul 1 */}
                    <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gray-200 group-hover:bg-primary transition-colors"></div>
                        <div className="w-14 h-14 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Workflow size={28} />
                        </div>
                        <h3 className="text-xl font-black font-robot text-primary uppercase mb-2">AI Penjaga Garis Depan</h3>
                        <p className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-6">Balas & Kualifikasi Leads 24/7 — Otomatis</p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Tidak ada lagi leads yang hilang karena admin sedang tidur atau sibuk. Virtual assistant tingkat lanjut yang mengambil alih 100% interaksi awal. Diprogram murni dalam Bahasa Indonesia tanpa sapaan robotik yang kaku. Dilengkapi kemampuan 'silent handoff' untuk merutekan komplain secara senyap ke antrean teknis, dan mengunci prospek panas langsung ke CRM.
                        </p>
                    </div>

                    {/* Modul 2 */}
                    <div className="bg-[#0B2A4A] text-white rounded-[40px] border border-blue-900 p-8 shadow-2xl hover:scale-105 transition-all relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-orange-500"></div>
                        <div className="w-14 h-14 bg-white/10 text-orange-500 rounded-2xl flex items-center justify-center mb-6">
                            <Cpu size={28} />
                        </div>
                        <h3 className="text-xl font-black font-robot text-white uppercase mb-2">Mesin Follow-Up Otomatis</h3>
                        <p className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-6">Data Masuk Sendiri, Follow-Up Jalan Sendiri</p>
                        <p className="text-blue-100/80 text-sm leading-relaxed">
                            Tidak ada lagi copy-paste data dari WhatsApp ke spreadsheet. Mesin integrasi webhook yang berjalan di latar belakang. Mengeliminasi entri data manual secara absolut dengan mengekstraksi data pelanggan secara instan dan memicu alur follow-up cerdas tanpa intervensi manusia.
                        </p>
                    </div>

                    {/* Modul 3 */}
                    <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gray-200 group-hover:bg-primary transition-colors"></div>
                        <div className="w-14 h-14 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <LayoutDashboard size={28} />
                        </div>
                        <h3 className="text-xl font-black font-robot text-primary uppercase mb-2">Dashboard Kendali Owner</h3>
                        <p className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-6">Semua Angka Bisnis Anda, Satu Layar</p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Tidak perlu tanya ke tim — semua data bisnis tersedia real-time di genggaman Anda. Papan kendali terpusat yang membaca aliran data dari modul front-line dan orkestrasi. Menampilkan indikator kinerja utama, aliran kas, dan peringatan penyimpangan operasional secara real-time.
                        </p>
                    </div>
                </div>
            </Section>

            {/* 3.1 SECTION: HARGA & PAKET */}
            <Section id="harga" title="PILIH AI SYSTEM SESUAI TAHAP BISNIS ANDA" subtitle="Mulai dari AI Frontliner sederhana hingga sistem operasional terintegrasi yang bekerja 24/7." bgType="white">
                <div className="flex justify-center mb-16">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-50 border border-green-100 rounded-2xl">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <p className="text-green-700 font-bold font-robot text-xs uppercase tracking-widest">Tanpa kontrak jangka panjang · Setup selesai 3 hari · Support 2 minggu</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 items-start">
                    {/* Paket 1 */}
                    <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-lg hover:shadow-xl transition-all flex flex-col h-full relative">
                        <div className="mb-6 border-b border-gray-100 pb-6">
                            <h3 className="text-xl font-black font-robot text-primary uppercase mb-2">FRONTLINER</h3>
                            <p className="text-orange-500 text-xs font-bold uppercase tracking-wider">AI Website + Smart Chat Sales</p>
                        </div>
                        
                        <div className="mb-6">
                            <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100">
                                <div className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mb-2">Investasi Bulan Pertama</div>
                                <div className="text-3xl font-black text-primary mb-1">Rp 1.850.000</div>
                                <div className="text-xs text-gray-500 font-medium tracking-normal italic">Selanjutnya Rp 350.000 / bulan</div>
                            </div>
                            <div className="mt-4 px-4 space-y-1">
                                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-relaxed">Breakdown: Rp 1,5jt (Setup) + Rp 350rb (Infra)</p>
                            </div>
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-start gap-3 text-sm text-gray-600"><Check className="text-green-500 shrink-0" size={18} /> <span className="pt-0.5">Website AI-ready & Responsive</span></li>
                            <li className="flex items-start gap-3 text-sm text-gray-600"><Check className="text-green-500 shrink-0" size={18} /> <span className="pt-0.5">Smart Sales Webchat Frontliner</span></li>
                            <li className="flex items-start gap-3 text-sm text-gray-600"><Check className="text-green-500 shrink-0" size={18} /> <span className="pt-0.5">Auto Lead Capture 24/7</span></li>
                            <li className="flex items-start gap-3 text-sm text-gray-600"><Check className="text-green-500 shrink-0" size={18} /> <span className="pt-0.5">Basic AI Workflow Orchestration</span></li>
                            <li className="flex items-start gap-3 text-sm text-gray-600"><Check className="text-green-500 shrink-0" size={18} /> <span className="pt-0.5">Setup & Konfigurasi Selesai 3 Hari</span></li>
                        </ul>
                        
                        <button 
                            onClick={() => setIsChatOpen(true)}
                            className="w-full bg-white text-primary border-2 border-primary py-4 rounded-xl font-bold font-robot text-xs hover:bg-primary hover:text-white transition-all uppercase tracking-widest flex justify-center items-center gap-2"
                        >
                            Mulai dengan Paket Ini
                        </button>
                    </div>

                    {/* Paket 2 */}
                    <div className="bg-[#0B2A4A] text-white rounded-[40px] border-2 border-orange-500 p-8 shadow-[0_30px_60px_rgba(245,124,0,0.2)] relative flex flex-col h-full transform lg:-translate-y-4 scale-105 z-10">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-600 to-orange-400 text-white px-8 py-3 rounded-full text-xs font-black font-robot uppercase tracking-[0.2em] whitespace-nowrap shadow-xl border-2 border-white/20">
                            ★ RECOMMENDED ★
                        </div>
                        
                        <div className="mb-6 border-b border-blue-800 pb-6 mt-4">
                            <h3 className="text-xl font-black font-robot text-white uppercase mb-2">AUTOPILOT SALES</h3>
                            <p className="text-orange-400 text-xs font-bold uppercase tracking-wider">Frontliner + Pipeline + Dashboard</p>
                        </div>

                        <div className="mb-6">
                            <div className="bg-white/10 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
                                <div className="text-[10px] text-orange-400 font-bold uppercase tracking-[0.2em] mb-2">Investasi Bulan Pertama</div>
                                <div className="text-3xl font-black text-white mb-1">Rp 5.000.000</div>
                                <div className="text-xs text-blue-200 font-medium tracking-normal italic">Selanjutnya Rp 500.000 / bulan</div>
                            </div>
                            <div className="mt-4 px-4 space-y-1">
                                <p className="text-[10px] text-blue-300/50 uppercase font-bold tracking-widest leading-relaxed">Breakdown: Rp 4,5jt (Setup) + Rp 500rb (Infra)</p>
                            </div>
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-start gap-3 text-sm text-blue-50"><Check className="text-orange-500 shrink-0" size={18} /> <span className="pt-0.5">Semua fitur Paket Frontliner</span></li>
                            <li className="flex items-start gap-3 text-sm text-blue-50"><Check className="text-orange-500 shrink-0" size={18} /> <span className="pt-0.5">Smart Pipeline Management (CRM)</span></li>
                            <li className="flex items-start gap-3 text-sm text-blue-50"><Check className="text-orange-500 shrink-0" size={18} /> <span className="pt-0.5">AI Follow-Up Automation System</span></li>
                            <li className="flex items-start gap-3 text-sm text-blue-50"><Check className="text-orange-500 shrink-0" size={18} /> <span className="pt-0.5">Custom Dashboard Monitoring Owner</span></li>
                            <li className="flex items-start gap-3 text-sm text-blue-50"><Check className="text-orange-500 shrink-0" size={18} /> <span className="pt-0.5">WhatsApp CRM Intake Integration</span></li>
                        </ul>
                        
                        <button 
                            onClick={() => setIsChatOpen(true)}
                            className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold font-robot text-xs hover:bg-orange-600 transition-all shadow-[0_15px_30px_rgba(245,124,0,0.4)] uppercase tracking-widest flex justify-center items-center gap-2"
                        >
                            Mulai dengan Paket Ini
                        </button>
                    </div>

                    {/* Paket 3 */}
                    <div className="bg-[#031020] rounded-[40px] border border-blue-900/50 p-8 shadow-xl hover:shadow-2xl transition-all flex flex-col h-full relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                            <Workflow size={100} className="text-blue-400" />
                        </div>
                        
                        <div className="mb-6 border-b border-blue-900/50 pb-6 relative z-10">
                            <h3 className="text-xl font-black font-robot text-blue-100 uppercase mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-blue-400">CUSTOM AI OPERATIONS</h3>
                            <p className="text-blue-400 text-xs font-bold uppercase tracking-wider">Solusi Spesifik Workflow Bisnis Anda</p>
                        </div>

                        <div className="mb-6 relative z-10">
                            <div className="bg-blue-900/20 p-6 rounded-3xl border border-blue-800/50 backdrop-blur-sm">
                                <div className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.2em] mb-2">Mulai Dari</div>
                                <div className="text-3xl font-black text-white mb-1">Rp 5.500.000</div>
                                <div className="text-xs text-blue-200/50 font-medium tracking-normal italic">Investasi disesuaikan per modul</div>
                            </div>
                        </div>

                        <div className="mb-8 flex-1 relative z-10">
                            <div className="text-[10px] font-bold text-blue-300 uppercase tracking-[0.2em] mb-4 opacity-70 italic">Pilihan Modul Operasional:</div>
                            <div className="grid grid-cols-1 gap-y-2">
                                <div className="flex items-center gap-3 text-xs text-blue-200/80"><CheckCircle2 size={14} className="text-blue-400/70 shrink-0" /> <span>RAB & Finance Monitoring Dashboard</span></div>
                                <div className="flex items-center gap-3 text-xs text-blue-200/80"><CheckCircle2 size={14} className="text-blue-400/70 shrink-0" /> <span>Automated Approval Flow System</span></div>
                                <div className="flex items-center gap-3 text-xs text-blue-200/80"><CheckCircle2 size={14} className="text-blue-400/70 shrink-0" /> <span>Project & Inventory Tracking AI</span></div>
                                <div className="flex items-center gap-3 text-xs text-blue-200/80"><CheckCircle2 size={14} className="text-blue-400/70 shrink-0" /> <span>Custom WhatsApp Order Intake</span></div>
                            </div>
                        </div>
                        
                        <button 
                            onClick={() => setIsChatOpen(true)}
                            className="w-full relative z-10 bg-transparent text-blue-300 border-2 border-blue-800/60 py-4 rounded-xl font-bold font-robot text-xs hover:bg-blue-900/40 hover:text-white transition-all uppercase tracking-widest flex justify-center items-center gap-2"
                        >
                            Diskusikan Workflow Anda
                        </button>
                    </div>
                </div>
                
                <div className="mt-12 text-center max-w-4xl mx-auto flex flex-col gap-4">
                    <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex flex-col md:flex-row items-center gap-6 text-left">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                            <Cpu className="text-primary" size={24} />
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed m-0">
                            <strong>AI Infrastructure</strong> adalah biaya operasional sistem yang mencakup automation engine, workflow orchestration, monitoring, dan maintenance ringan agar sistem tetap berjalan stabil.
                        </p>
                    </div>
                    <p className="text-xs text-gray-400 italic">
                        * Tool pihak ketiga seperti WhatsApp API atau layanan cloud dapat menyesuaikan kebutuhan masing-masing bisnis.
                    </p>
                </div>
            </Section>

            {/* 3.2 SECTION: CASE STUDIES */}
            <Section id="hasil" title="Apa yang Terjadi Setelah Sistem Berjalan" subtitle="Contoh dampak nyata penerapan AI agent pada operasional bisnis sehari-hari." bgType="light" className="border-t border-gray-100 pb-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    {/* Card 1 */}
                    <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-lg hover:shadow-xl transition-all">
                        <div className="inline-block bg-blue-50 text-primary px-4 py-2 rounded-full text-xs font-bold font-robot uppercase tracking-wider mb-6">
                            Studi Kasus — Bisnis Distribusi
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-2"><XCircle className="text-red-500" size={16} /> Masalah</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">Tim sales membutuhkan rata-rata 4 jam untuk follow-up leads yang masuk via WhatsApp. Banyak prospek dingin sebelum sempat dihubungi.</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-2"><Lightbulb className="text-orange-500" size={16} /> Solusi</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">Pasang AI Front-Line Router — auto-reply, kualifikasi, dan simpan ke CRM dalam hitungan detik.</p>
                            </div>
                            <div className="bg-green-50 p-5 rounded-2xl border border-green-100 flex flex-col gap-3">
                                <h4 className="text-sm font-bold text-green-800 uppercase tracking-wider flex items-center gap-2"><TrendingUp className="text-green-600" size={16} /> Dampak Sistemik</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white p-3 rounded-xl border border-green-200 border-dashed">
                                        <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Waktu Respons</div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-red-400 line-through">4 Jam</span>
                                            <ArrowRight size={12} className="text-gray-400" />
                                            <span className="text-sm font-black text-green-600">&lt; 2 Menit</span>
                                        </div>
                                    </div>
                                    <div className="bg-white p-3 rounded-xl border border-green-200 border-dashed">
                                        <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Lead Leakage</div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-red-400 line-through">40%</span>
                                            <ArrowRight size={12} className="text-gray-400" />
                                            <span className="text-sm font-black text-green-600">0%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-xs text-gray-400 font-medium mt-4">Modul: AI Penjaga Garis Depan</div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-lg hover:shadow-xl transition-all">
                        <div className="inline-block bg-blue-50 text-primary px-4 py-2 rounded-full text-xs font-bold font-robot uppercase tracking-wider mb-6">
                            Studi Kasus — Jasa B2B
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-2"><XCircle className="text-red-500" size={16} /> Masalah</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">Owner menghabiskan 2–3 jam/hari untuk input data order dari WhatsApp ke spreadsheet dan kirim reminder pembayaran manual.</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-2"><Lightbulb className="text-orange-500" size={16} /> Solusi</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">Pasang Mesin Follow-Up Otomatis — ekstrak data WhatsApp otomatis, sync ke sheet, trigger reminder H-3 dan H-1 jatuh tempo.</p>
                            </div>
                            <div className="bg-green-50 p-5 rounded-2xl border border-green-100 flex flex-col gap-3">
                                <h4 className="text-sm font-bold text-green-800 uppercase tracking-wider flex items-center gap-2"><TrendingUp className="text-green-600" size={16} /> Dampak Sistemik</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white p-3 rounded-xl border border-green-200 border-dashed">
                                        <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Waktu Input/Hari</div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-red-400 line-through">120 Menit</span>
                                            <ArrowRight size={12} className="text-gray-400" />
                                            <span className="text-sm font-black text-green-600">0 Menit</span>
                                        </div>
                                    </div>
                                    <div className="bg-white p-3 rounded-xl border border-green-200 border-dashed">
                                        <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Telat Tagihan</div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-red-400 line-through">15%</span>
                                            <ArrowRight size={12} className="text-gray-400" />
                                            <span className="text-sm font-black text-green-600">0%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-xs text-gray-400 font-medium mt-4">Modul: Mesin Follow-Up Otomatis</div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* 3.3 SECTION: SOCIAL PROOF */}
            <Section id="testimoni" title="Apa Kata Mereka yang Sudah Memakai" subtitle="Bisnis yang sudah menjalankan sistem kami merasakan dampaknya langsung di operasional harian." bgType="light" className="border-b border-gray-100 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            name: "Rangga Wijaya",
                            role: "Pemilik, Wijaya Property Bandung",
                            initials: "RW",
                            quote: "Dulu banyak chat masuk jam 9–10 malam tidak terbalas dan besoknya prospeknya sudah dingin. Sekarang AI-nya yang menyambut duluan, baru tim saya lanjut closing. Beda banget.",
                            result: "Konversi Leads +25%"
                        },
                        {
                            name: "Linda Hartono",
                            role: "Direktur, CV Sinar Medika Surabaya",
                            initials: "LH",
                            quote: "Yang paling kerasa, admin saya nggak lagi habis waktu copy-paste data dari WhatsApp ke Excel. Semua otomatis masuk, mereka jadi fokus melayani dan closing.",
                            result: "Efisiensi Admin 60%"
                        },
                        {
                            name: "Bayu Pratama",
                            role: "Owner, Pratama Certification Jakarta",
                            initials: "BP",
                            quote: "Sebagai owner yang sering di luar, dashboard-nya bikin saya tenang. Dari HP saja saya bisa lihat berapa leads masuk dan progres tim hari ini.",
                            result: "Hemat 15 jam kerja/minggu"
                        }
                    ].map((t, i) => (
                        <div key={i} className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-50 flex flex-col items-center text-center">
                            <div className="w-14 h-14 bg-gradient-to-tr from-orange-500 to-blue-900 rounded-full flex items-center justify-center mb-5 text-white font-black font-robot text-sm border border-white/20 shadow-md">
                                {t.initials}
                            </div>
                            <h4 className="text-sm font-black text-primary leading-tight">{t.name}</h4>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 mt-1">{t.role}</p>
                            <div className="flex gap-0.5 mb-4 text-orange-500">
                                {[...Array(5)].map((_, s) => <span key={s}>★</span>)}
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed italic mb-6">"{t.quote}"</p>
                            <div className="mt-auto pt-6 border-t border-gray-50 w-full">
                                <span className="text-xs font-black text-primary uppercase tracking-wider">{t.result}</span>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-16 bg-gradient-to-r from-primary to-blue-900 rounded-[40px] p-8 md:p-12 text-white text-center shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://aimarketingstrategic.com/images/background.png')] opacity-5 bg-cover bg-center"></div>
                    <div className="relative z-10">
                        <div className="inline-block px-4 py-1 bg-orange-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg">
                            Konsultasi Gratis
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black font-robot uppercase mb-6 leading-tight">
                            Cari Tahu Modul AI Mana yang Paling Cepat Berdampak untuk Bisnis Anda
                        </h3>
                        <p className="text-blue-100/80 text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
                            Ceritakan kondisi operasional Anda lewat chat. Tim kami bantu petakan titik kebocoran leads dan beri rekomendasi sistem yang paling sesuai — tanpa biaya, tanpa komitmen.
                        </p>
                        <button
                            onClick={() => setIsChatOpen(true)}
                            className="inline-flex bg-orange-500 text-white px-10 py-4 rounded-xl font-bold font-robot text-sm hover:bg-orange-600 transition-all shadow-xl uppercase tracking-widest active:scale-95 items-center gap-3"
                        >
                            Mulai Konsultasi Gratis →
                        </button>
                    </div>
                </div>
            </Section>

            {/* 4. CARA ADOPSI */}
            <Section id="cara-adopsi" title="Cara Membangun Ekosistem Otonom Anda" subtitle="Transisi mulus menuju operasional tanpa hambatan." bgType="white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 text-center px-4 md:px-20">
                    {[
                        { num: "1", title: "AI Business Diagnostic", desc: "Mengidentifikasi modul mana yang paling krusial untuk menutup kebocoran." },
                        { num: "2", title: "Integrasi & Pengujian", desc: "Pemasangan logika sistem dan penyesuaian parameter tanpa mengganggu operasional berjalan." },
                        { num: "3", title: "Otonomi Penuh", desc: "Sistem mengeksekusi beban kerja harian, menggantikan biaya overhead staf." }
                    ].map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-[#0B2A4A] text-white rounded-full flex items-center justify-center font-bold font-robot text-xl shadow-lg mb-6">
                                {step.num}
                            </div>
                            <h3 className="text-lg font-black font-robot text-primary uppercase mb-3">{step.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>
            
            {/* 5. CTA FINAL */}
            <Section id="screening" bgType="dark" className="border-t border-white/5 py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://aimarketingstrategic.com/images/background.png')] opacity-10 bg-cover bg-center"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-black font-robot text-white mb-8 leading-[1.2] uppercase">
                        AI Business <span className="text-orange-500">Screening</span>
                    </h2>
                    <p className="text-blue-100 text-lg mb-12 font-medium max-w-2xl mx-auto">
                        Ceritakan operasional bisnis Anda. Kami bantu identifikasi modul AI mana yang paling cepat memberi dampak.
                    </p>
                    <div className="flex flex-col justify-center items-center gap-6">
                        <button 
                            onClick={() => setIsChatOpen(true)}
                            className="inline-flex bg-[#F57C00] text-white px-12 py-5 rounded-xl font-bold font-robot text-sm md:text-lg shadow-[0_20px_40px_rgba(245,124,0,0.3)] hover:bg-orange-600 transition-all uppercase tracking-widest active:scale-95 items-center justify-center gap-3 w-full sm:w-auto"
                        >
                            <MessageCircle size={24} /> 💬 Konsultasi Sekarang
                        </button>
                        <div className="text-white font-robot font-black text-2xl md:text-3xl tracking-widest">
                            0819-0755-2758
                        </div>
                    </div>
                    <p className="text-blue-200/60 text-xs md:text-sm mt-8 uppercase tracking-widest font-bold">
                        Respon dalam 1x24 jam · Konsultasi gratis
                    </p>
                </div>
            </Section>

            {/* 8. IMAGE ZOOM MODAL */}
            {isImageZoomed && (
                <div 
                className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-fade-in"
                onClick={() => setIsImageZoomed(false)}
                >
                <button 
                    className="absolute top-6 right-6 md:top-10 md:right-10 text-white hover:text-orange-500 transition-colors z-[310] p-4 bg-white/10 rounded-full backdrop-blur-md border border-white/20 active:scale-90"
                    onClick={(e) => { e.stopPropagation(); setIsImageZoomed(false); }}
                >
                    <X size={32} />
                </button>
                
                <div className="relative w-full h-full flex items-center justify-center animate-scale-up" onClick={(e) => e.stopPropagation()}>
                    <img 
                    src={ctaSystemUrl} 
                    alt="NeuraFlow System Visual Fullscreen" 
                    className="max-w-full max-h-full object-contain drop-shadow-2xl"
                    />
                </div>
                </div>
            )}
        </div>

      {/* 9. FOOTER */}
      <footer className="bg-[#061626] text-white pt-16 pb-10 px-6 md:px-12 lg:px-24 border-t border-white/5 relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-12 relative z-10">
          <div className="col-span-1 lg:col-span-2">
            <div className="max-w-sm mb-12 space-y-4">
              <h4 className="text-white font-robot text-lg font-bold uppercase tracking-wider">
                AI Marketing Strategic
              </h4>
              <p className="text-blue-100/60 text-sm leading-relaxed">
                Solusi Digital Praktis untuk UMKM Indonesia. Membantu bisnis kecil naik kelas dengan teknologi sederhana yang berdampak nyata.
              </p>
            </div>
            <div className="flex gap-4 no-print">
               <button onClick={() => setIsChatOpen(true)} className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-orange-500 transition-all flex items-center justify-center border border-white/10 group active:scale-90" aria-label="WhatsApp">
                 <MessageCircle size={20} />
               </button>
               <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-orange-500 transition-all flex items-center justify-center border border-white/10 group active:scale-90" aria-label="LinkedIn">
                 <Linkedin size={20} />
               </a>
               <a href={youtubeLink} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-orange-500 transition-all flex items-center justify-center border border-white/10 group active:scale-90" aria-label="YouTube">
                 <Youtube size={20} />
               </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold font-robot text-white mb-8 uppercase tracking-[0.3em] text-[10px] opacity-40">Menu</h4>
            <ul className="space-y-5 text-[12px] text-blue-100/70">
              <li><button onClick={(e) => handleNavigation(e, 'home')} className="hover:text-orange-400 uppercase tracking-widest block text-left">Beranda</button></li>
              <li><button onClick={(e) => handleNavigation(e, '#tantangan')} className="hover:text-orange-400 uppercase tracking-widest block text-left">Kerapuhan Bisnis</button></li>
              <li><button onClick={(e) => handleNavigation(e, '#modul')} className="hover:text-orange-400 uppercase tracking-widest block text-left">Modul Autopilot</button></li>
              <li><button onClick={(e) => handleNavigation(e, '#cara-adopsi')} className="hover:text-orange-400 uppercase tracking-widest block text-left">Cara Adopsi</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold font-robot text-white mb-8 uppercase tracking-[0.3em] text-[10px] opacity-40">Kontak</h4>
            <ul className="space-y-6 text-[12px] text-blue-100/70">
              <li className="flex flex-col gap-2">
                <span className="text-orange-500 text-[10px] font-bold uppercase tracking-widest opacity-60">WhatsApp Business</span>
                <div className="flex items-center gap-3">
                  <span className="text-orange-500">📞</span> 
                  <a href="https://wa.me/6281907552758" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-orange-400 transition-colors text-lg font-bold">0819-0755-2758</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500">🕒</span> 
                <span>Senin - Sabtu (09.00 - 17.00)</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[10px] text-blue-200/30 gap-8 font-robot uppercase tracking-[0.3em] relative z-10">
          <p>© 2026 aimarketingstrategic.com</p>
          <div className="flex gap-12">
            <button onClick={() => setShowPrivacy(true)} className="hover:text-white transition-colors cursor-pointer">Privacy</button>
            <button onClick={() => setShowTerms(true)} className="hover:text-white transition-colors cursor-pointer">Terms</button>
          </div>
        </div>
      </footer>

      <PrivacyPolicy isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <TermsOfService isOpen={showTerms} onClose={() => setShowTerms(false)} />
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Floating Scroll To Top */}
      <AnimatePresence>
        {scrollY > 300 && (
          <motion.button 
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-10 right-10 w-16 h-16 bg-[#F57C00] text-white rounded-[20px] shadow-2xl flex items-center justify-center hover:bg-orange-600 transition-all z-[110] no-print border border-white/20 active:scale-95 group"
            aria-label="Scroll to top"
          >
            <ArrowRight className="-rotate-90 group-hover:-translate-y-1 transition-transform" size={28} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
