import { motion } from "motion/react";
import {
  BookOpen,
  Gamepad2,
  GraduationCap,
  TrendingUp,
  Bell,
  User,
  UserPlus,
  Search,
  Home,
  PieChart,
  Wallet,
  Settings,
  BarChart2,
  Calendar,
  Newspaper,
  Download,
  Share,
  PlusSquare,
  X,
  Smartphone,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { SignalSection } from "./components/SignalSection";

const links = [
  {
    title: "Modul Basic",
    description: "Pelajari dasar",
    icon: <BookOpen className="w-6 h-6" />,
    url: "https://sites.google.com/view/ventamarketmateri/halaman-muka?authuser=0",
  },
  {
    title: "Academy",
    description: "Edukasi pro",
    icon: <GraduationCap className="w-6 h-6" />,
    url: "https://playful-daifuku-f0e306.netlify.app/",
  },
  {
    title: "Open Account",
    description: "Broker",
    icon: <UserPlus className="w-6 h-6" />,
    url: "https://openacount.carrd.co/",
  },
  {
    title: "Games",
    description: "Mini games",
    icon: <Gamepad2 className="w-6 h-6" />,
    url: "https://statuesque-cocada-41e2c6.netlify.app/",
  },
];

function MarketWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check if script already appended to prevent duplicate
    if (containerRef.current.querySelector("script")) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: "light",
      dateRange: "12M",
      locale: "en",
      largeChartUrl: "",
      isTransparent: false,
      showFloatingTooltip: false,
      plotLineColorGrowing: "rgba(41, 98, 255, 1)",
      plotLineColorFalling: "rgba(41, 98, 255, 1)",
      gridLineColor: "rgba(240, 243, 250, 0)",
      scaleFontColor: "#0F0F0F",
      belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
      belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
      belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
      belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
      symbolActiveColor: "rgba(41, 98, 255, 0.12)",
      tabs: [
        {
          title: "Indices",
          symbols: [
            { s: "FOREXCOM:SPXUSD", d: "S&P 500 Index" },
            { s: "FOREXCOM:NSXUSD", d: "US 100 Cash CFD" },
            { s: "FOREXCOM:DJI", d: "Dow Jones Industrial Average Index" },
            { s: "INDEX:NKY", d: "Japan 225" },
            { s: "INDEX:DEU40", d: "DAX Index" },
            { s: "FOREXCOM:UKXGBP", d: "FTSE 100 Index" },
          ],
          originalTitle: "Indices",
        },
        {
          title: "Futures",
          symbols: [
            { s: "BMFBOVESPA:ISP1!", d: "S&P 500" },
            { s: "BMFBOVESPA:EUR1!", d: "Euro" },
            { s: "CMCMARKETS:GOLD", d: "Gold" },
            { s: "PYTH:WTI3!", d: "WTI Crude Oil" },
            { s: "BMFBOVESPA:CCM1!", d: "Corn" },
          ],
          originalTitle: "Futures",
        },
        {
          title: "Bonds",
          symbols: [
            { s: "EUREX:FGBL1!", d: "Euro Bund" },
            { s: "EUREX:FBTP1!", d: "Euro BTP" },
            { s: "EUREX:FGBM1!", d: "Euro BOBL" },
          ],
          originalTitle: "Bonds",
        },
        {
          title: "Forex",
          symbols: [
            { s: "FX:EURUSD", d: "EUR to USD" },
            { s: "FX:GBPUSD", d: "GBP to USD" },
            { s: "FX:USDJPY", d: "USD to JPY" },
            { s: "FX:USDCHF", d: "USD to CHF" },
            { s: "FX:AUDUSD", d: "AUD to USD" },
            { s: "FX:USDCAD", d: "USD to CAD" },
          ],
          originalTitle: "Forex",
        },
      ],
      support_host: "https://www.tradingview.com",
      width: "100%",
      height: "100%",
      showSymbolLogo: true,
      showChart: true,
    });

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container h-full w-full flex flex-col relative">
      <div
        ref={containerRef}
        className="tradingview-widget-container__widget flex-1 w-full relative"
      ></div>
      <div className="tradingview-widget-copyright text-center text-xs pb-2 h-8 flex items-center justify-center shrink-0">
        <a
          href="https://www.tradingview.com/markets/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="text-blue-600 hover:text-blue-800">
            World markets
          </span>
        </a>
      </div>
    </div>
  );
}

function CalendarWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check if script already appended to prevent duplicate
    if (containerRef.current.querySelector("script")) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: "light",
      isTransparent: true,
      locale: "id",
      countryFilter: "us,eu,gb,jp,au,ca",
      importanceFilter: "0,1",
      width: "100%",
      height: "100%",
    });

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container h-full w-full flex flex-col relative">
      <div
        ref={containerRef}
        className="tradingview-widget-container__widget flex-1 w-full relative"
      ></div>
      <div className="tradingview-widget-copyright text-center text-xs pb-2 h-8 flex items-center justify-center shrink-0">
        <a
          href="https://id.tradingview.com/economic-calendar/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="text-blue-600 hover:text-blue-800">
            Track all markets on TradingView
          </span>
        </a>
      </div>
    </div>
  );
}

function NewsWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check if script already appended to prevent duplicate
    if (containerRef.current.querySelector("script")) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      displayMode: "regular",
      feedMode: "all_symbols",
      colorTheme: "light",
      isTransparent: false,
      locale: "en",
      width: "100%",
      height: "100%",
    });

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container h-full w-full flex flex-col relative">
      <div
        ref={containerRef}
        className="tradingview-widget-container__widget flex-1 w-full relative"
      ></div>
      <div className="tradingview-widget-copyright text-center text-xs pb-2 h-8 flex items-center justify-center shrink-0">
        <a
          href="https://www.tradingview.com/news/top-providers/tradingview/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="text-blue-600 hover:text-blue-800">
            Top stories by TradingView
          </span>
        </a>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showInstallBtn, setShowInstallBtn] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Check if running in standalone/installed mode
    const checkStandalone = () => {
      const isStandalonePWA = window.matchMedia('(display-mode: standalone)').matches ||
                   (window.navigator as any).standalone === true;
      setIsStandalone(isStandalonePWA);
      return isStandalonePWA;
    };

    const isInstalled = checkStandalone();
    
    // Default show button if not installed yet or if browser supports prompt
    if (!isInstalled) {
      setShowInstallBtn(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };

    const handleAppInstalled = () => {
      setIsStandalone(true);
      setShowInstallBtn(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    // If the browser provides a native PWA prompt trigger
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setIsStandalone(true);
          setShowInstallBtn(false);
          setDeferredPrompt(null);
        }
      } catch (err) {
        console.error("Installation prompt execution failed:", err);
        setShowIOSInstructions(true);
      }
    } else {
      // Fallback/iOS instructions when standard beforeinstallprompt is absent
      setShowIOSInstructions(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans flex items-center justify-center sm:p-6 lg:p-8">
      {/* 16:9 App Container constraints for Desktop, Full screen for Mobile */}
      <div className="w-full h-screen sm:h-auto sm:aspect-video sm:max-h-[800px] max-w-[800px] bg-white sm:rounded-[32px] sm:shadow-2xl overflow-hidden flex flex-col relative">
        {/* Main Application Area */}
        <div className="flex-1 flex flex-col h-full bg-[#fcfcfc] overflow-y-auto pb-6 md:pb-0">
          <main className="p-4 md:p-8 max-w-5xl mx-auto w-full pb-24 md:pb-24 flex-1 flex flex-col">
            {activeTab === "home" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col flex-1 pb-16"
              >
                {/* Replaced Portfolio Card with Logo Hero */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black text-white rounded-[24px] p-6 relative overflow-hidden shadow-xl min-h-[200px] flex items-center justify-center"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gray-800 to-transparent rounded-full opacity-50 -translate-y-1/2 translate-x-1/3"></div>
                  <div className="absolute bottom-0 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20"></div>

                  <div className="relative z-10 text-center flex flex-col items-center py-4">
                    <img
                      src="https://cdn.phototourl.com/free/2026-06-17-699c7b18-fd36-4ca3-b1f5-bb2cbee82422.png"
                      alt="Venta Markets Logo"
                      className="h-24 md:h-28 w-auto object-contain mb-4 drop-shadow-2xl hover:scale-105 transition-transform"
                    />
                    <h2 className="text-xl md:text-2xl font-bold tracking-widest text-[#E6E6E6]">
                      VENTA MARKETS
                    </h2>
                    <p className="text-sm text-gray-400 mt-2 font-medium">
                      Elevating your trading journey
                    </p>
                  </div>
                </motion.div>

                {/* Install App Banner (Only visible if not standalone) */}
                {showInstallBtn && !isStandalone && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-[24px] p-5 shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4 border border-blue-500/20"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <Download className="w-6 h-6 text-white animate-pulse" />
                      </div>
                      <div className="text-left w-full">
                        <h3 className="font-bold text-base md:text-lg leading-tight text-white flex items-center gap-2">
                          Instal Aplikasi Venta Markets
                        </h3>
                        <p className="text-xs text-blue-100 mt-1">
                          Pasang di layar utama untuk akses instan dan hemat kuota tanpa perlu membuka browser.
                        </p>
                      </div>
                    </div>
                    <div className="relative z-10 w-full sm:w-auto flex items-center gap-2 shrink-0">
                      <button
                        onClick={handleInstallClick}
                        className="w-full sm:w-auto bg-white text-blue-600 font-bold px-5 py-2.5 rounded-xl text-xs md:text-sm hover:bg-blue-50 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                      >
                        <Download className="w-4 h-4" />
                        Instal Sekarang
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Premium 3D Action Cards */}
                <div className="mt-8 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
                      Modul & Navigasi
                    </h2>
                  </div>
                  <div className="grid grid-cols-4 gap-2 md:gap-6">
                    {links.map((link, i) => (
                      <motion.a
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                          delay: i * 0.1,
                          type: "spring",
                          stiffness: 100,
                        }}
                        key={link.title}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative rounded-[20px] py-4 px-2 bg-white shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group cursor-pointer"
                      >
                        <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-800 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors mb-2 md:mb-3">
                          {link.icon}
                        </div>
                        <h3 className="text-[11px] md:text-sm font-bold text-gray-900 mb-0.5 leading-tight">
                          {link.title}
                        </h3>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Signal Section */}
                <SignalSection />
              </motion.div>
            )}

            {activeTab === "market" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col flex-1 pb-16 h-full"
              >
                <div className="mb-6 shrink-0">
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Market Overview
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Live world markets
                  </p>
                </div>
                <div className="w-full h-[500px] sm:h-[600px] rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm flex flex-col pt-2 px-1 pb-1 sm:pt-4 sm:px-2 sm:pb-2">
                  <MarketWidget />
                </div>
              </motion.div>
            )}

            {activeTab === "calendar" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col flex-1 pb-16"
              >
                <div className="mb-4 shrink-0">
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Calendar
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Economic Calendar
                  </p>
                </div>
                <div className="w-full h-[500px] sm:h-[600px] rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm flex flex-col pt-2 px-1 pb-1 sm:pt-4 sm:px-2 sm:pb-2">
                  <CalendarWidget />
                </div>
              </motion.div>
            )}

            {activeTab === "news" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col flex-1 pb-16 h-full"
              >
                <div className="mb-6 shrink-0">
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Top Stories
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Latest market news
                  </p>
                </div>
                <div className="w-full h-[500px] sm:h-[600px] rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm flex flex-col pt-2 px-1 pb-1 sm:pt-4 sm:px-2 sm:pb-2">
                  <NewsWidget />
                </div>
              </motion.div>
            )}
          </main>

          {/* Fixed Bottom Navigation */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-around items-center z-50">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex flex-col items-center gap-1 ${activeTab === "home" ? "text-black" : "text-gray-400 hover:text-gray-600"} transition-colors`}
            >
              <Home className="w-6 h-6" />
              <span className="text-[10px] font-medium">Beranda</span>
            </button>
            <button
              onClick={() => setActiveTab("market")}
              className={`flex flex-col items-center gap-1 ${activeTab === "market" ? "text-black" : "text-gray-400 hover:text-gray-600"} transition-colors`}
            >
              <BarChart2 className="w-6 h-6" />
              <span className="text-[10px] font-medium">Market</span>
            </button>
            <button
              onClick={() => setActiveTab("calendar")}
              className={`flex flex-col items-center gap-1 ${activeTab === "calendar" ? "text-black" : "text-gray-400 hover:text-gray-600"} transition-colors`}
            >
              <Calendar className="w-6 h-6" />
              <span className="text-[10px] font-medium">Calendar</span>
            </button>
            <button
              onClick={() => setActiveTab("news")}
              className={`flex flex-col items-center gap-1 ${activeTab === "news" ? "text-black" : "text-gray-400 hover:text-gray-600"} transition-colors`}
            >
              <Newspaper className="w-6 h-6" />
              <span className="text-[10px] font-medium">News</span>
            </button>
          </div>
        </div>
      </div>

      {/* iOS / Manual Installation Tutorial Sheet/Modal */}
      {showIOSInstructions && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-[32px] max-w-md w-full p-6 md:p-8 shadow-2xl border border-gray-100 relative overflow-hidden text-gray-900"
          >
            {/* Decorative elements */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-50 rounded-full blur-xl animate-pulse"></div>
            
            <button
              onClick={() => setShowIOSInstructions(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                <Smartphone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 leading-tight">
                Tambahkan ke Layar Utama
              </h3>
              <p className="text-xs text-gray-500 mt-2">
                Ikuti 3 langkah mudah berikut untuk memasang aplikasi Venta Markets di perangkat Anda:
              </p>
            </div>

            {/* Step list */}
            <div className="space-y-4 my-6 text-left">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
                <span className="w-6 h-6 shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mt-0.5 shadow-sm">
                  1
                </span>
                <div>
                  <p className="text-xs font-semibold text-gray-800">
                    Tekan tombol Bagi / Bagikan (Share)
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Ketuk ikon <Share className="w-3.5 h-3.5 text-blue-600 inline mx-0.5" /> di bilah menu browser Safari (biasanya ada di bagian bawah layar iPhone Anda).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
                <span className="w-6 h-6 shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mt-0.5 shadow-sm">
                  2
                </span>
                <div>
                  <p className="text-xs font-semibold text-gray-800">
                    Pilih "Tambahkan ke Layar Utama"
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Gulir daftar pilihan ke bawah dan ketuk <PlusSquare className="w-3.5 h-3.5 text-blue-600 inline mx-0.5" /> <span className="font-semibold text-gray-700">"Add to Home Screen"</span> atau <span className="font-semibold text-gray-700">"Tambahkan ke Layar Utama"</span>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
                <span className="w-6 h-6 shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mt-0.5 shadow-sm">
                  3
                </span>
                <div>
                  <p className="text-xs font-semibold text-gray-800">
                    Ketuk tombol "Tambah" / "Add"
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Ketuk tombol <span className="font-semibold text-blue-600">Tambah (Add)</span> di sudut kanan atas layar untuk memasang aplikasi.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-2 text-center">
              <button
                onClick={() => setShowIOSInstructions(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors shadow-md active:scale-95 cursor-pointer"
              >
                Selesai & Mengerti
              </button>
              <p className="text-[10px] text-gray-400 mt-3 font-mono">
                Sistem otomatis mendeteksi ketika aplikasi sudah dibuka langsung dari layar utama.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
