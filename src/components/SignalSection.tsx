import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off, get } from 'firebase/database';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Lock, Calculator, TrendingUp, AlertCircle, ExternalLink, Bell, CheckCircle2 } from 'lucide-react';

const firebaseConfig = {
  apiKey: "AIzaSyD9q4V2ZgzXBb6WGWWHjUyLWOXvNwTf2-Q",
  authDomain: "flutter-ai-playground-1de05.firebaseapp.com",
  databaseURL: "https://flutter-ai-playground-1de05-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "flutter-ai-playground-1de05",
  storageBucket: "flutter-ai-playground-1de05.firebasestorage.app",
  messagingSenderId: "103027477575",
  appId: "1:103027477575:android:7e29273f20d24685e67562"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export function SignalSection() {
  const [view, setView] = useState<'menu' | 'room'>('menu');
  const [activeRoom, setActiveRoom] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [targetRoom, setTargetRoom] = useState('');
  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState(false);

  // Stats & Signals State
  const [signals, setSignals] = useState<any[]>([]);
  const [journals, setJournals] = useState<any[]>([]);
  const [stats, setStats] = useState({ winrate: 0, tp: 0, sl: 0 });

  // Lot Calculator State
  const [lotBal, setLotBal] = useState(1000);
  const [lotRisk, setLotRisk] = useState(1);
  const [lotSl, setLotSl] = useState(30);
  const [lotType, setLotType] = useState(10);
  const [lotResult, setLotResult] = useState('0.00');

  // Notifications State
  const [notifState, setNotifState] = useState<'default' | 'granted' | 'denied'>('default');

  useEffect(() => {
    if ('Notification' in window) {
      // @ts-ignore - Handle possible permission states
      setNotifState(Notification.permission);
    }
  }, []);

  const handleEnableNotifications = () => {
    if (!('Notification' in window)) {
      alert('Browser Anda tidak mendukung Web Notifications.');
      return;
    }
    Notification.requestPermission().then((permission) => {
      // @ts-ignore
      setNotifState(permission);
      if (permission === 'granted') {
        new Notification('Update Signal VM', {
          body: 'Notifikasi untuk update signal VM sudah aktif!',
          icon: 'https://cdn.phototourl.com/free/2026-06-17-699c7b18-fd36-4ca3-b1f5-bb2cbee82422.png',
        });
      }
    });
  };

  useEffect(() => {
    if (lotBal > 0 && lotRisk > 0 && lotSl > 0) {
      const res = (lotBal * (lotRisk / 100)) / (lotSl * lotType);
      setLotResult(res.toFixed(2));
    } else {
      setLotResult('0.00');
    }
  }, [lotBal, lotRisk, lotSl, lotType]);

  const handleAskPass = (room: string) => {
    setTargetRoom(room);
    setPassError(false);
    setPassword('');
    setShowModal(true);
  };

  const handleCheckPass = async () => {
    try {
      const passRef = ref(database, 'passwords/' + targetRoom);
      const snapshot = await get(passRef);
      if (snapshot.val() === password) {
        setShowModal(false);
        enterRoom(targetRoom);
      } else {
        setPassError(true);
      }
    } catch (e) {
      console.error(e);
      setPassError(true);
    }
  };

  const enterRoom = (room: string) => {
    setView('room');
    setActiveRoom(room);

    const sPath = room === 'umum' ? 'active_signals' : 'active_' + room;
    const jPath = room === 'umum' ? 'journal' : 'journal_' + room;

    const signalsRef = ref(database, sPath);
    const journalRef = ref(database, jPath);

    onValue(signalsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSignals(Object.keys(data).map(key => ({ id: key, ...data[key] })));
      } else {
        setSignals([]);
      }
    });

    onValue(journalRef, (snapshot) => {
      const data = snapshot.val();
      let tpCount = 0;
      let slCount = 0;
      let journalList: any[] = [];

      if (data) {
        Object.keys(data).forEach(key => {
          if (data[key].result === 'TP') tpCount++;
          if (data[key].result === 'SL') slCount++;
        });

        journalList = Object.keys(data).reverse().slice(0, 10).map(key => ({ id: key, ...data[key] }));
      }

      let total = tpCount + slCount;
      let winrate = total > 0 ? Math.round((tpCount / total) * 100) : 0;

      setJournals(journalList);
      setStats({ winrate, tp: tpCount, sl: slCount });
    });
  };

  const leaveRoom = () => {
    const sPath = activeRoom === 'umum' ? 'active_signals' : 'active_' + activeRoom;
    const jPath = activeRoom === 'umum' ? 'journal' : 'journal_' + activeRoom;
    off(ref(database, sPath));
    off(ref(database, jPath));
    setView('menu');
    setActiveRoom('');
  };

  return (
    <div className="mt-8 bg-white rounded-[24px] border border-gray-100 shadow-sm p-4 md:p-6">
      {view === 'menu' ? (
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Live Outlook Signal</h2>
            <p className="text-sm text-gray-500 mb-4">
              Pilih ruang analisa untuk melihat peta arah market secara real-time.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4">
              <p className="text-[11px] leading-relaxed text-yellow-800">
                <span className="font-bold">⚠️ DISCLAIMER:</span> Setup trading hanyalah referensi pandangan teknikal pribadi, BUKAN ajakan/jaminan mutlak. Segala keputusan perdagangan sepenuhnya tanggung jawab trader.
              </p>
            </div>

            {/* Daily Signal Notification Toggle */}
            <div className="mb-6 bg-[#f8fafc] border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notifState === 'granted' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                  {notifState === 'granted' ? <CheckCircle2 className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm">Notifikasi Update Harian</h3>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Dapatkan notifikasi jika ada sinyal trading terbaru</p>
                </div>
              </div>
              <button
                onClick={handleEnableNotifications}
                disabled={notifState === 'granted' || notifState === 'denied'}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0 ${
                  notifState === 'granted' ? 'bg-green-50 text-green-600 border border-green-200 cursor-default' : 
                  notifState === 'denied' ? 'bg-red-50 text-red-600 border border-red-200 cursor-not-allowed' :
                  'bg-blue-600 shrink-0 text-white hover:bg-blue-700 shadow-md active:scale-95'
                }`}
              >
                {notifState === 'granted' ? 'Aktif' : notifState === 'denied' ? 'Ditolak' : 'Aktifkan'}
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              <button onClick={() => enterRoom('umum')} className="relative p-5 rounded-[20px] bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] hover:border-gray-200 transition-all duration-300 group text-center flex flex-col items-center overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-gray-900" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm">Signal Umum</h3>
                <p className="text-[10px] text-gray-500 mt-1 font-medium tracking-wide">Gratis & Edukasi</p>
              </button>
              
              <button onClick={() => handleAskPass('class1')} className="relative p-5 rounded-[20px] bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] hover:border-blue-200 transition-all duration-300 group text-center flex flex-col items-center overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Lock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-blue-900 text-sm">Signal Class 1</h3>
                <p className="text-[10px] text-blue-600/70 mt-1 font-medium tracking-wide leading-snug">Masukkan password untuk membuka akses</p>
              </button>

              <button onClick={() => handleAskPass('class2')} className="relative p-5 rounded-[20px] bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] hover:border-amber-200 transition-all duration-300 group text-center flex flex-col items-center overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Lock className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm">Signal Class 2 </h3>
                <p className="text-[10px] text-gray-500 mt-1 font-medium tracking-wide leading-snug">Masukkan password untuk membuka akses</p>
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h3 className="font-bold flex items-center gap-2 text-gray-900 mb-4 uppercase text-sm tracking-wider">
              <Calculator className="w-4 h-4" /> Position Size Calculator
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 md:p-6 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Balance ($)</label>
                  <input type="number" value={lotBal} onChange={e => setLotBal(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black outline-none text-sm bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Risk (%)</label>
                  <input type="number" value={lotRisk} onChange={e => setLotRisk(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black outline-none text-sm bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Stop Loss (Pips/Pts)</label>
                  <input type="number" value={lotSl} onChange={e => setLotSl(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black outline-none text-sm bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Jenis Market</label>
                  <select value={lotType} onChange={e => setLotType(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black outline-none text-sm bg-white">
                    <option value="10">Forex / Gold / Oil</option>
                    <option value="1">Index / Stock</option>
                  </select>
                </div>
              </div>
              <div className="bg-black text-white p-3 rounded-lg text-center font-bold text-sm">
                Rekomendasi Size: {lotResult} Lot
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button onClick={leaveRoom} className="flex items-center text-sm font-medium text-gray-600 hover:text-black transition-colors">
              <ChevronLeft className="w-4 h-4 mr-1" /> Kembali
            </button>
            <span className="font-bold text-sm bg-gray-100 px-3 py-1 rounded-full text-black uppercase tracking-wider text-[10px]">
              ROOM: {activeRoom}
            </span>
          </div>

          <div className="overflow-hidden bg-blue-50 border border-blue-100 rounded-lg py-2 flex items-center">
            <div className="whitespace-nowrap animate-[scroll_20s_linear_infinite] text-xs font-medium text-blue-700 w-full pl-full">
              INFO: Sinyal harian ini hanya valid sampai pasar tutup pagi ini. Setup baru akan dirilis secara berkala.
            </div>
          </div>
          
          <style>{`
            @keyframes scroll {
              from { transform: translateX(100%); }
              to { transform: translateX(-100%); }
            }
          `}</style>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center border-b-2 border-b-black">
              <p className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase mb-1">Winrate</p>
              <h4 className="text-lg sm:text-2xl font-bold text-black">{stats.winrate}%</h4>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-xl p-3 text-center border-b-2 border-b-green-500">
              <p className="text-[10px] sm:text-xs text-green-700 font-bold uppercase mb-1">Total TP</p>
              <h4 className="text-lg sm:text-2xl font-bold text-green-600">{stats.tp}</h4>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-center border-b-2 border-b-red-500">
              <p className="text-[10px] sm:text-xs text-red-700 font-bold uppercase mb-1">Total SL</p>
              <h4 className="text-lg sm:text-2xl font-bold text-red-600">{stats.sl}</h4>
            </div>
          </div>

          <div>
             <h3 className="font-bold text-gray-900 mb-3 text-sm">Active Signals</h3>
             {signals.length === 0 ? (
               <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
                 <p className="text-gray-400 text-sm">Menunggu setup baru rilis...</p>
               </div>
             ) : (
               <div className="space-y-3">
                 {signals.map(s => {
                    const isBuy = s.type?.toUpperCase().includes('BUY');
                    return (
                        <div key={s.id} className={`border rounded-xl p-4 ${isBuy ? 'border-t-4 border-t-green-500' : 'border-t-4 border-t-red-500'} bg-white shadow-sm`}>
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-bold text-gray-900">{s.pair}</span>
                                <span className={`text-xs font-bold px-2 py-1 rounded-md ${isBuy ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {s.type}
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-center bg-gray-50 p-2 rounded-lg mb-3">
                                <div>
                                    <span className="block text-[10px] text-gray-500 mb-0.5">Entry Area</span>
                                    <b className="text-xs text-gray-900">{s.entry}</b>
                                </div>
                                <div>
                                    <span className="block text-[10px] text-gray-500 mb-0.5">Target TP</span>
                                    <b className="text-xs text-green-600">{s.tp}</b>
                                </div>
                                <div>
                                    <span className="block text-[10px] text-gray-500 mb-0.5">Stop Loss</span>
                                    <b className="text-xs text-red-600">{s.sl}</b>
                                </div>
                            </div>
                            {s.link && (
                              <a href={s.link} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-lg transition-colors">
                                Open Analysis Layout <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            )}
                        </div>
                    );
                 })}
               </div>
             )}
          </div>

          <div className="pt-4 border-t border-gray-100">
             <h3 className="font-bold text-gray-900 mb-3 text-sm">Trading Journal</h3>
             <div className="overflow-x-auto">
               <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                      <th className="px-4 py-2 rounded-tl-lg">Pair</th>
                      <th className="px-4 py-2">Tipe Order</th>
                      <th className="px-4 py-2 text-right rounded-tr-lg">Hasil</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {journals.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="text-center py-4 text-gray-400 text-sm">Belum ada riwayat.</td>
                      </tr>
                    ) : (
                      journals.map(j => (
                        <tr key={j.id} className="hover:bg-gray-50/50">
                          <td className="px-4 py-3 font-medium text-gray-900">{j.pair}</td>
                          <td className="px-4 py-3 text-gray-600">{j.type}</td>
                          <td className={`px-4 py-3 text-right font-bold ${j.result === 'TP' ? 'text-green-600' : 'text-red-600'}`}>
                            HIT {j.result}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
               </table>
             </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)}></motion.div>
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl w-full max-w-sm p-6 relative z-10 shadow-2xl">
                <h3 className="text-xl font-bold text-gray-900 text-center mb-1">Room Terkunci</h3>
                <p className="text-center text-sm text-gray-500 mb-6">Masukkan kode akses premium</p>

                {passError && (
                  <div className="bg-red-50 border border-red-100 p-3 rounded-xl mb-4 text-center">
                    <p className="text-red-700 font-bold text-sm flex items-center justify-center gap-1"><AlertCircle className="w-4 h-4"/> Password Salah</p>
                    <p className="text-[10px] text-red-500 mt-1">Coba hubungi admin untuk meminta password atau masuk class academy.</p>
                  </div>
                )}

                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password" 
                  className="w-full text-center px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl mb-4 focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-lg tracking-widest"
                />
                
                <button onClick={handleCheckPass} className="w-full py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors mb-3">
                  Buka Akses
                </button>
                <button onClick={() => setShowModal(false)} className="w-full py-2 text-gray-500 text-sm font-medium hover:text-black transition-colors">
                  Batal
                </button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
