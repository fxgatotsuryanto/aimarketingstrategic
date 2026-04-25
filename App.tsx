
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { 
  BarChart3, 
  Users, 
  Workflow, 
  Settings2, 
  ChevronRight, 
  Boxes, 
  Zap, 
  CheckCircle2, 
  Search, 
  PenTool, 
  TrendingUp, 
  MessageCircle, 
  Mail, 
  Clock, 
  LayoutDashboard, 
  ArrowRight,
  Menu,
  X,
  Linkedin,
  Cpu,
  Layers,
  Rocket,
  AlertCircle,
  BarChart4,
  Briefcase,
  Database,
  PieChart,
  ShieldAlert,
  Maximize2,
  Stethoscope,
  ClipboardCheck,
  FileText,
  Target,
  UserCheck,
  XCircle,
  HelpCircle,
  Youtube,
  Check,
  Send,
  Smartphone,
  Globe,
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
    <section id={id} className={`py-16 md:py-24 px-6 md:px-12 lg:px-24 ${bgClasses[bgType]} ${className}`}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <div className={`flex flex-col ${titleCentered ? 'items-center text-center' : 'items-start text-left'} mb-16`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`h-[1px] w-12 hidden md:block ${isDark ? 'bg-white/20' : 'bg-primary/20'}`}></div>
              <h2 className={`text-xl md:text-3xl font-black font-robot uppercase tracking-widest ${isDark ? 'text-white' : 'text-primary'}`}>
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

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);

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
    { label: 'Masalah', href: '#tantangan' },
    { label: 'Modul', href: '#modul' },
    { label: 'Cara Adopsi', href: '#cara-adopsi' }
  ];

  // Image Paths
  const heroBgUrl = "https://aimarketingstrategic.com/images/backgroundrobot.png";
  const ctaSystemUrl = "https://aimarketingstrategic.com/images/neuraflowsystem.png";

  return (
    <div className={`flex flex-col min-h-screen bg-white font-sans selection:bg-orange-500 selection:text-white ${isImageZoomed ? 'overflow-hidden' : ''}`}>
      
      {/* 0. FIXED HEADER / NAVBAR */}
      <header className="fixed top-0 left-0 right-0 bg-[#0B2A4A]/95 backdrop-blur-md z-[100] border-b border-white/10 no-print">
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
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                onClick={(e) => handleNavigation(e, item.href)}
                className="text-white/80 hover:text-orange-500 font-bold font-robot text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            ))}
            
            <button 
              onClick={() => setIsChatOpen(true)}
              className="bg-[#F57C00] text-white px-5 py-2 rounded-lg font-bold font-robot text-[10px] hover:bg-orange-600 transition-all shadow-lg shadow-orange-900/40 uppercase tracking-widest active:scale-95 flex items-center gap-2"
            >
              <MessageCircle size={14} /> Konsultasi Gratis
            </button>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`lg:hidden absolute top-16 md:top-20 left-0 w-full bg-[#0B2A4A] border-b border-white/10 overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100 py-6' : 'max-h-0 opacity-0 py-0'}`}>
          <nav className="flex flex-col items-center gap-6 px-6">
            {menuItems.map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                onClick={(e) => handleNavigation(e, item.href)}
                className="text-white/90 hover:text-orange-500 font-bold font-robot text-sm uppercase tracking-widest transition-colors py-2 block w-full text-center"
              >
                {item.label}
              </a>
            ))}
            <button 
              onClick={() => { setIsChatOpen(true); closeMenu(); }}
              className="w-full bg-[#F57C00] text-white py-4 rounded-xl font-bold font-robot text-xs hover:bg-orange-600 transition-all shadow-xl uppercase tracking-widest mt-2 active:scale-95 text-center flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} /> Konsultasi Gratis
            </button>
          </nav>
        </div>
      </header>

      <div className="animate-fade-in w-full">
            {/* 1. HERO SECTION */}
            <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[850px] flex items-center pt-24 pb-12 md:pt-32 md:pb-16 px-6 md:px-12 lg:px-24 bg-[#061626] text-white overflow-hidden">
                
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
                    <div className="lg:col-span-10 xl:col-span-8 animate-fade-in flex flex-col items-start text-left lg:-translate-y-12">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full mb-8 backdrop-blur-sm">
                        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        <p className="text-orange-500 font-robot text-[10px] md:text-xs lg:text-sm uppercase tracking-[0.3em] font-black">AI Marketing Strategic</p>
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-black font-robot leading-[1.1] mb-6 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] uppercase tracking-tight">
                        WEBSITE, CHAT, DAN FOLLOW-UP <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">MASIH BERJALAN SENDIRI-SENDIRI?</span>
                    </h1>
                    
                    <p className="text-base md:text-lg text-blue-50/90 mb-6 max-w-2xl leading-relaxed font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                        Bangun AI Frontliner yang menangkap leads, membalas chat, mengkualifikasi calon customer, dan menjalankan follow-up otomatis — tanpa menambah beban admin.
                    </p>
                    
                    <p className="text-sm md:text-base text-orange-400 font-bold tracking-widest uppercase mb-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                        AI operational modules untuk bisnis berkembang.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-5 max-w-lg w-full items-start sm:items-center">
                        <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
                            <div className="flex flex-col sm:flex-row gap-4 w-full">
                                <button 
                                onClick={(e) => handleNavigation(e, '#demo-video')}
                                className="bg-[#F57C00] text-white px-8 py-4 rounded-xl font-bold font-robot text-xs md:text-sm hover:bg-orange-600 transition-all shadow-[0_15px_30px_rgba(245,124,0,0.5)] uppercase tracking-widest active:scale-95 flex items-center justify-center text-center w-full sm:w-auto gap-2"
                                >
                                Lihat Demo Langsung →
                                </button>
                                <button 
                                onClick={() => setIsChatOpen(true)}
                                className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-bold font-robot text-xs md:text-sm hover:bg-white/20 transition-all uppercase tracking-widest active:scale-95 flex items-center justify-center text-center w-full sm:w-auto gap-2 backdrop-blur-sm"
                                >
                                Tanya via Webchat — Gratis
                                </button>
                            </div>
                            <span className="text-[10px] text-blue-200/70 uppercase tracking-widest font-bold mt-2">1 Modul AI Frontliner mulai Rp 1,5 juta · Setup 3 hari · Termasuk support 2 minggu</span>
                        </div>
                    </div>

                    <div className="mt-16 flex flex-wrap gap-12 opacity-80">
                        <div className="flex flex-col">
                        <span className="font-robot text-2xl font-black text-white">Systemic</span>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-blue-300">Routing</span>
                        </div>
                        <div className="flex flex-col">
                        <span className="font-robot text-2xl font-black text-white">Pipeline</span>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-blue-300">Automation</span>
                        </div>
                        <div className="flex flex-col">
                        <span className="font-robot text-2xl font-black text-white">Seamless</span>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-blue-300">Integration</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>

            {/* 1.5 SECTION: VIDEO DEMO */}
            <Section id="demo-video" title="Saksikan Bagaimana AI Menyelamatkan 40% Leads Anda Secara Real-Time" subtitle="Berhenti membiarkan calon klien Anda berpaling ke kompetitor hanya karena respon yang lambat" bgType="light" className="border-t border-gray-100">
                <div className="max-w-4xl mx-auto bg-white rounded-[40px] border border-gray-100 p-4 md:p-8 shadow-xl flex flex-col items-center justify-center">
                    <div className="w-full rounded-3xl overflow-hidden bg-[#061626] shadow-inner relative">
                        <video 
                            controls 
                            className="w-full h-auto aspect-video object-cover"
                            preload="metadata"
                        >
                            <source src="https://aimarketingstrategic.com/images/Pemasaran_Berkonversi_Tinggi_Otomatis.mp4" type="video/mp4" />
                            Browser Anda tidak mendukung pemutaran video.
                        </video>
                    </div>
                </div>
            </Section>

            {/* 2. SECTION: TANTANGAN BISNIS (Masalah UMKM) */}
            <Section 
                id="tantangan" 
                title="Kerapuhan Model Bisnis Padat Karya" 
                subtitle="Pertumbuhan tertahan karena operasional masih bergantung pada intervensi manusia secara konstan."
                bgType="white" 
                className="relative -mt-10 z-20 rounded-t-[50px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]"
            >
                <div className="flex flex-wrap justify-center gap-8 mb-16">
                {[
                    { 
                    icon: <Users className="text-orange-500" size={32} />, 
                    title: "Kebocoran Garis Depan", 
                    desc: "Kehilangan prospek karena respons bergantung pada ketersediaan dan jam kerja admin."
                    },
                    { 
                    icon: <Database className="text-orange-500" size={32} />, 
                    title: "Beban Administratif", 
                    desc: "Waktu dan biaya terbuang untuk memindahkan data antar Excel dan aplikasi chat."
                    },
                    { 
                    icon: <AlertCircle className="text-orange-500" size={32} />, 
                    title: "Limitasi Output Eksekusi", 
                    desc: "Pertumbuhan tertahan karena setiap keputusan dan validasi data harus melewati campur tangan owner atau manajer."
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
            <Section id="modul" title="Modul Bisnis Autopilot" subtitle="Infrastruktur digital plug-and-play untuk mengotomatisasi siklus bisnis Anda dari akuisisi hingga analitik." bgType="white" className="border-y border-gray-100">
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 items-start">
                    {/* Paket 1 */}
                    <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-lg hover:shadow-xl transition-all flex flex-col h-full relative">
                        <div className="mb-6 border-b border-gray-100 pb-6">
                            <h3 className="text-xl font-black font-robot text-primary uppercase mb-2">FRONTLINER</h3>
                            <p className="text-orange-500 text-xs font-bold uppercase tracking-wider">AI Website + Smart Chat Sales</p>
                            <p className="text-sm text-gray-500 mt-4 leading-relaxed">
                                Untuk bisnis yang ingin memiliki digital frontliner yang mampu menangkap leads, membalas chat otomatis, dan mengarahkan calon customer tanpa admin tambahan.
                            </p>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex flex-col gap-1 mb-4">
                                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">SETUP SYSTEM</span>
                                <div className="text-2xl font-black text-gray-900">Rp 1.500.000 <span className="text-sm text-gray-500 font-medium">/ tahun</span></div>
                            </div>
                            <div className="flex flex-col gap-1 bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                                <span className="text-xs text-primary font-bold uppercase tracking-widest flex items-center gap-2"><Cpu size={14} /> AI INFRASTRUCTURE</span>
                                <div className="text-xl font-black text-primary">Rp 350.000 <span className="text-xs text-gray-500 font-medium tracking-normal">/ bulan</span></div>
                                <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">AI Infrastructure mencakup engine automation, workflow orchestration, monitoring, dan maintenance ringan.</p>
                            </div>
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-start gap-3 text-sm text-gray-600"><CheckCircle2 className="text-green-500 shrink-0" size={18} /> <span className="pt-0.5">Website AI-ready</span></li>
                            <li className="flex items-start gap-3 text-sm text-gray-600"><CheckCircle2 className="text-green-500 shrink-0" size={18} /> <span className="pt-0.5">Smart sales webchat</span></li>
                            <li className="flex items-start gap-3 text-sm text-gray-600"><CheckCircle2 className="text-green-500 shrink-0" size={18} /> <span className="pt-0.5">Auto lead capture</span></li>
                            <li className="flex items-start gap-3 text-sm text-gray-600"><CheckCircle2 className="text-green-500 shrink-0" size={18} /> <span className="pt-0.5">WhatsApp integration</span></li>
                            <li className="flex items-start gap-3 text-sm text-gray-600"><CheckCircle2 className="text-green-500 shrink-0" size={18} /> <span className="pt-0.5">Basic AI workflow</span></li>
                            <li className="flex items-start gap-3 text-sm text-gray-600"><CheckCircle2 className="text-green-500 shrink-0" size={18} /> <span className="pt-0.5">Setup & konfigurasi</span></li>
                        </ul>
                        
                        <button onClick={() => setIsChatOpen(true)} className="w-full bg-white text-primary border-2 border-primary py-4 rounded-xl font-bold font-robot text-xs hover:bg-primary hover:text-white transition-all uppercase tracking-widest flex justify-center items-center gap-2">
                            Mulai Dengan Frontliner
                        </button>
                    </div>

                    {/* Paket 2 */}
                    <div className="bg-[#0B2A4A] text-white rounded-[40px] border border-orange-500 p-8 shadow-2xl relative flex flex-col h-full transform lg:-translate-y-4">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-6 py-2 rounded-full text-[10px] sm:text-xs font-bold font-robot uppercase tracking-widest whitespace-nowrap shadow-lg">
                            Most Recommended
                        </div>
                        
                        <div className="mb-6 border-b border-blue-800 pb-6 mt-2">
                            <h3 className="text-xl font-black font-robot text-white uppercase mb-2">AUTOPILOT SALES</h3>
                            <p className="text-orange-400 text-xs font-bold uppercase tracking-wider">Frontliner + Pipeline + Dashboard</p>
                            <p className="text-sm text-blue-100/80 mt-4 leading-relaxed">
                                Untuk bisnis yang ingin proses penjualan berjalan lebih otomatis, pipeline lebih rapi, dan owner memiliki visibilitas real-time terhadap aktivitas sales.
                            </p>
                        </div>

                        <div className="mb-6">
                            <div className="flex flex-col gap-1 mb-4">
                                <span className="text-xs text-blue-300 font-bold uppercase tracking-widest">SETUP SYSTEM</span>
                                <div className="text-2xl font-black text-white">Rp 4.500.000</div>
                            </div>
                            <div className="flex flex-col gap-1 bg-white/5 p-4 rounded-2xl border border-white/10">
                                <span className="text-xs text-orange-400 font-bold uppercase tracking-widest flex items-center gap-2"><Cpu size={14} /> AI INFRASTRUCTURE</span>
                                <div className="text-xl font-black text-white">Rp 500.000 <span className="text-xs text-blue-200 font-medium tracking-normal">/ bulan</span></div>
                                <p className="text-[10px] text-blue-200/70 mt-2 leading-relaxed">Dirancang untuk bisnis yang mulai membutuhkan kontrol operasional dan follow-up yang lebih konsisten.</p>
                            </div>
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-start gap-3 text-sm text-blue-50"><CheckCircle2 className="text-orange-500 shrink-0" size={18} /> <span className="pt-0.5">Semua fitur Frontliner</span></li>
                            <li className="flex items-start gap-3 text-sm text-blue-50"><CheckCircle2 className="text-orange-500 shrink-0" size={18} /> <span className="pt-0.5">Smart pipeline management</span></li>
                            <li className="flex items-start gap-3 text-sm text-blue-50"><CheckCircle2 className="text-orange-500 shrink-0" size={18} /> <span className="pt-0.5">AI follow-up automation</span></li>
                            <li className="flex items-start gap-3 text-sm text-blue-50"><CheckCircle2 className="text-orange-500 shrink-0" size={18} /> <span className="pt-0.5">Dashboard monitoring</span></li>
                            <li className="flex items-start gap-3 text-sm text-blue-50"><CheckCircle2 className="text-orange-500 shrink-0" size={18} /> <span className="pt-0.5">CRM intake workflow</span></li>
                            <li className="flex items-start gap-3 text-sm text-blue-50"><CheckCircle2 className="text-orange-500 shrink-0" size={18} /> <span className="pt-0.5">Reporting sederhana</span></li>
                        </ul>
                        
                        <button onClick={() => setIsChatOpen(true)} className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold font-robot text-xs hover:bg-orange-600 transition-all shadow-[0_10px_20px_rgba(245,124,0,0.3)] uppercase tracking-widest flex justify-center items-center gap-2">
                            Mulai Dengan Autopilot
                        </button>
                    </div>

                    {/* Paket 3 */}
                    <div className="bg-[#031020] rounded-[40px] border border-blue-900/50 p-8 shadow-xl hover:shadow-2xl transition-all flex flex-col h-full relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Workflow size={100} className="text-blue-400" />
                        </div>
                        
                        <div className="mb-6 border-b border-blue-900/50 pb-6 relative z-10">
                            <h3 className="text-xl font-black font-robot text-blue-100 uppercase mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-blue-400">CUSTOM AI OPERATIONS</h3>
                            <p className="text-blue-400 text-xs font-bold uppercase tracking-wider">AI Operational Modules sesuai workflow bisnis Anda</p>
                            <p className="text-sm text-blue-200/70 mt-4 leading-relaxed">
                                Sistem custom untuk bisnis yang membutuhkan workflow, dashboard, monitoring, dan automasi operasional yang lebih spesifik.
                            </p>
                        </div>

                        <div className="mb-6 relative z-10">
                            <div className="flex flex-col gap-1 mb-4">
                                <span className="text-xs text-blue-400/80 font-bold uppercase tracking-widest">SETUP SYSTEM</span>
                                <div className="text-2xl font-black text-white">Mulai Rp 5.000.000 <span className="text-sm text-blue-200/50 font-medium">/ modul</span></div>
                            </div>
                            <div className="flex flex-col gap-1 bg-blue-900/20 p-4 rounded-2xl border border-blue-800/50 backdrop-blur-sm">
                                <span className="text-xs text-blue-300 font-bold uppercase tracking-widest flex items-center gap-2"><Cpu size={14} /> AI INFRASTRUCTURE</span>
                                <div className="text-xl font-black text-blue-100">Mulai Rp 500.000 <span className="text-xs text-blue-200/50 font-medium tracking-normal">/ bulan</span></div>
                                <p className="text-[10px] text-blue-200/60 mt-2 leading-relaxed">Setiap modul dirancang sesuai kebutuhan workflow dan operasional bisnis Anda.</p>
                            </div>
                        </div>

                        <div className="mb-8 flex-1 relative z-10">
                            <div className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-4">Pilihan Modul Operasional:</div>
                            <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                                <div className="flex items-center gap-2 text-xs text-blue-200/80"><LayoutDashboard size={14} className="text-blue-400/70 shrink-0" /> <span className="truncate">CRM System</span></div>
                                <div className="flex items-center gap-2 text-xs text-blue-200/80"><LayoutDashboard size={14} className="text-blue-400/70 shrink-0" /> <span className="truncate">RAB Monitoring</span></div>
                                <div className="flex items-center gap-2 text-xs text-blue-200/80"><LayoutDashboard size={14} className="text-blue-400/70 shrink-0" /> <span className="truncate">MPS Dashboard</span></div>
                                <div className="flex items-center gap-2 text-xs text-blue-200/80"><LayoutDashboard size={14} className="text-blue-400/70 shrink-0" /> <span className="truncate">Inventory Monitor</span></div>
                                <div className="flex items-center gap-2 text-xs text-blue-200/80"><Workflow size={14} className="text-blue-400/70 shrink-0" /> <span className="truncate">Approval Flow</span></div>
                                <div className="flex items-center gap-2 text-xs text-blue-200/80"><LayoutDashboard size={14} className="text-blue-400/70 shrink-0" /> <span className="truncate">Finance Dash</span></div>
                                <div className="flex items-center gap-2 text-xs text-blue-200/80"><Workflow size={14} className="text-blue-400/70 shrink-0" /> <span className="truncate">Service Ticket</span></div>
                                <div className="flex items-center gap-2 text-xs text-blue-200/80"><Workflow size={14} className="text-blue-400/70 shrink-0" /> <span className="truncate">Project Tracker</span></div>
                                <div className="flex items-center gap-2 text-xs text-blue-200/80"><Workflow size={14} className="text-blue-400/70 shrink-0" /> <span className="truncate">Purchase Flow</span></div>
                                <div className="flex items-center gap-2 text-xs text-blue-200/80"><Workflow size={14} className="text-blue-400/70 shrink-0" /> <span className="truncate">WA Order Intake</span></div>
                                <div className="flex items-center gap-2 text-xs text-blue-200/80"><Workflow size={14} className="text-blue-400/70 shrink-0" /> <span className="truncate">Lead Routing</span></div>
                                <div className="flex items-center gap-2 text-xs text-blue-200/80"><LayoutDashboard size={14} className="text-blue-400/70 shrink-0" /> <span className="truncate">Custom Report</span></div>
                            </div>
                        </div>
                        
                        <button onClick={() => setIsChatOpen(true)} className="w-full relative z-10 bg-transparent text-blue-300 border-2 border-blue-800/60 py-4 rounded-xl font-bold font-robot text-xs hover:bg-blue-900/40 hover:text-white transition-all uppercase tracking-widest flex justify-center items-center gap-2">
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

            {/* 3.2 SECTION: SOCIAL PROOF */}
            <Section id="hasil" title="Apa yang Terjadi Setelah Sistem Berjalan" subtitle="Simulasi berdasarkan implementasi AI agent pada operasional bisnis nyata." bgType="light" className="border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    {/* Card 1 */}
                    <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-lg hover:shadow-xl transition-all">
                        <div className="inline-block bg-blue-50 text-primary px-4 py-2 rounded-full text-xs font-bold font-robot uppercase tracking-wider mb-6">
                            Proof of Concept — Bisnis Distribusi
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
                            Proof of Concept — Jasa B2B
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
                <div className="mt-12 text-center max-w-3xl mx-auto">
                    <p className="text-sm text-gray-500 italic">
                        "Ini adalah simulasi proof of concept berdasarkan workflow nyata yang telah dibangun dan diuji. Jadilah klien pertama kami — dapatkan harga early adopter dan studi kasus Anda kami dokumentasikan bersama."
                    </p>
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
            <div className="py-24 px-6 bg-[#0B2A4A] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://aimarketingstrategic.com/images/background.png')] opacity-10 bg-cover bg-center"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-black font-robot text-white mb-8 leading-[1.2] uppercase">
                        AI Business <span className="text-orange-500">Screening</span>
                    </h2>
                    <p className="text-blue-100 text-lg mb-12 font-medium max-w-2xl mx-auto">
                        Ceritakan operasional bisnis Anda. Kami bantu identifikasi modul AI mana yang paling cepat memberi dampak.
                    </p>
                    <div className="flex flex-col justify-center items-center">
                        <button 
                            onClick={() => setIsChatOpen(true)}
                            className="inline-flex bg-[#F57C00] text-white px-12 py-5 rounded-xl font-bold font-robot text-sm md:text-base shadow-[0_20px_40px_rgba(245,124,0,0.3)] hover:bg-orange-600 transition-all uppercase tracking-widest active:scale-95 items-center justify-center gap-3 w-full sm:w-auto"
                        >
                            <MessageCircle size={24} /> Chat Sekarang →
                        </button>
                    </div>
                    <p className="text-blue-200/60 text-xs mt-8 uppercase tracking-widest font-bold">
                        Respon dalam 1 x 24 jam · Senin–Sabtu 09.00–17.00 WIB
                    </p>
                </div>
            </div>

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
      <footer className="bg-[#061626] text-white pt-24 pb-12 px-6 md:px-12 lg:px-24 border-t border-white/5 relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 relative z-10">
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
               <button onClick={() => setIsChatOpen(true)} className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-orange-500 transition-all flex items-center justify-center border border-white/10 group active:scale-90">
                 <MessageCircle size={20} />
               </button>
               <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-orange-500 transition-all flex items-center justify-center border border-white/10 group active:scale-90">
                 <Linkedin size={20} />
               </a>
               <a href={youtubeLink} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-orange-500 transition-all flex items-center justify-center border border-white/10 group active:scale-90">
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
              <li className="flex items-center gap-3">
                <span className="text-orange-500">📞</span> 
                <button onClick={() => setIsChatOpen(true)} className="hover:text-white transition-colors">0819-0755-2758</button>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500">🕒</span> 
                <span>Senin - Sabtu (09.00 - 17.00)</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[10px] text-blue-200/30 gap-8 font-robot uppercase tracking-[0.3em] relative z-10">
          <p>© 2026 aimarketingstrategis.com</p>
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
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-10 right-10 w-16 h-16 bg-[#F57C00] text-white rounded-[20px] shadow-2xl flex items-center justify-center hover:bg-orange-600 transition-all z-[110] no-print border border-white/20 active:scale-90 group"
      >
        <ArrowRight className="-rotate-90 group-hover:-translate-y-1 transition-transform" size={28} />
      </button>
    </div>
  );
};

export default App;
