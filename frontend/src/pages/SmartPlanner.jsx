import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, DollarSign, Heart, Sparkles, MapPin, Clock, ArrowRight, Loader2, Trash2, Save, Coffee, Utensils, Camera, Map, Compass, Navigation } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { Container, Section } from '../components/Layout';
import { useTourismStore } from '../store/useTourismStore';
import SEO from '../components/SEO';

const SmartPlanner = () => {
    const { places, culinary } = useTourismStore();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        duration: 3,
        budget: 'medium',
        preferences: []
    });
    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePreference = (pref) => {
        setFormData(prev => ({
            ...prev,
            preferences: prev.preferences.includes(pref)
                ? prev.preferences.filter(p => p !== pref)
                : [...prev.preferences, pref]
        }));
    };

    const generateItinerary = () => {
        setLoading(true);
        // Artificial delay for "computation" feel
        setTimeout(() => {
            const mockPlan = Array.from({ length: formData.duration }, (_, i) => {
                if (i === 0) {
                    return {
                        day: 1,
                        title: 'The Riverine Soul (Golden Route)',
                        activities: [
                            { time: '05:30', activity: 'Pasar Terapung Lok Baintan', category: 'River', icon: <MapPin size={14} />, transport: 'via Klotok' },
                            { time: '08:00', activity: 'Sarapan Soto Banjar Bang Amat', category: 'Kuliner', icon: <Utensils size={14} />, transport: 'Tepi Sungai' },
                            { time: '13:00', activity: 'Belanja Sasirangan di Kampung Sasirangan', category: 'Budaya', icon: <Sparkles size={14} />, transport: 'By Land' },
                            { time: '16:30', activity: 'Foto di Patung Bekantan & Menara Pandang', category: 'Landmark', icon: <Camera size={14} />, transport: 'By Land' }
                        ]
                    };
                }

                const dayPlaces = places.filter(p => 
                    formData.preferences.length === 0 || formData.preferences.includes(p.category)
                ).slice(i * 2, (i * 2) + 2);

                const finalDayPlaces = dayPlaces.length >= 2 ? dayPlaces : places.slice(i * 2, (i * 2) + 2);
                const dayCulinary = culinary[i % culinary.length] || culinary[0];

                return {
                    day: i + 1,
                    title: i === 1 ? 'Eksplorasi Jejak Religi' : 'Ekspedisi Urban & Sejarah',
                    activities: [
                        { time: '08:30', activity: `Eksplorasi di ${finalDayPlaces[0]?.name || 'Tepi Barito'}`, category: finalDayPlaces[0]?.category || 'Budaya', icon: <MapPin size={14} /> },
                        { time: '12:00', activity: `Makan Siang: ${dayCulinary?.name || 'Kuliner Lokal'}`, category: 'Kuliner', icon: <Utensils size={14} /> },
                        { time: '15:00', activity: `Kunjungan ke ${finalDayPlaces[1]?.name || 'Pusat Kota'}`, category: finalDayPlaces[1]?.category || 'Landmark', icon: <Sparkles size={14} /> },
                    ]
                };
            });

            setItinerary(mockPlan);
            setStep(4);
            setLoading(false);
        }, 1500);
    };

    const progress = (step / 4) * 100;

    return (
        <PageTransition>
            <SEO 
                title="Smart Planner" 
                description="Rencanakan perjalanan impian Anda di Banjarmasin dengan algoritma cerdas yang menyesuaikan budget dan minat." 
                category="Travel Tools"
            />
            <div className="bg-[#050505] min-h-screen pb-32 selection:bg-[#f97316]/30">
                <Container>
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-24 pt-20"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#f97316]/10 rounded-full border border-[#f97316]/20 text-[#f97316] mb-8">
                            <Sparkles size={14} className="animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">AI-Powered Travel Logic</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 tracking-tighter">
                            Rencanakan <span className="text-[#f97316]">Karsa</span>
                        </h1>
                        <p className="max-w-xl mx-auto text-lg text-white/40 leading-relaxed font-serif italic border-l-2 border-white/5 pl-8">
                            Biarkan algoritma cerdas kami menyusun narasi perjalanan paling optimal sesuai minat dan anggaran Anda.
                        </p>
                    </motion.div>

                    {/* Progress Track */}
                    <div className="max-w-xl mx-auto mb-32 px-6">
                        <div className="flex justify-between items-center mb-6 px-4">
                            {['Durasi', 'Anggaran', 'Minat', 'Hasil'].map((s, i) => (
                                <div key={i} className={`text-[8px] font-bold uppercase tracking-[0.4em] ${step > i ? 'text-[#f97316]' : 'text-white/10'}`}>
                                    {s}
                                </div>
                            ))}
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-[#f97316] shadow-[0_0_20px_rgba(249,115,22,0.5)]"
                            />
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    className="bg-white/5 border border-white/5 rounded-[3rem] p-12 md:p-20 text-center shadow-3xl"
                                >
                                    <div className="p-8 bg-[#f97316]/10 rounded-[2rem] w-fit mx-auto mb-10 text-[#f97316] border border-[#f97316]/20">
                                        <Calendar size={48} strokeWidth={1} />
                                    </div>
                                    <h2 className="text-4xl font-serif font-bold text-white mb-4 italic">Berapa lama kunjungan Anda?</h2>
                                    <p className="text-white/40 mb-12 font-serif italic">Maksimal 7 hari untuk optimasi rencana paling akurat.</p>

                                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                                        {[1, 2, 3, 4, 5, 6, 7].map(d => (
                                            <button
                                                key={d}
                                                onClick={() => setFormData({ ...formData, duration: d })}
                                                className={`w-20 h-28 rounded-[1.5rem] border-2 flex flex-col items-center justify-center transition-all ${formData.duration === d
                                                    ? 'border-[#f97316] bg-[#f97316] text-white shadow-2xl scale-110'
                                                    : 'border-white/5 bg-white/5 text-white/40 hover:border-white/20'
                                                    }`}
                                            >
                                                <span className="text-3xl font-serif font-bold">{d}</span>
                                                <span className="text-[8px] font-bold uppercase tracking-widest mt-1">Hari</span>
                                            </button>
                                        ))}
                                    </div>
                                    <button 
                                        className="w-full bg-white text-black font-bold py-6 rounded-[2rem] flex items-center justify-center gap-4 uppercase text-[10px] tracking-widest hover:bg-[#f97316] hover:text-white transition-all shadow-2xl active:scale-95" 
                                        onClick={() => setStep(2)}
                                    >
                                        Lanjut Strategi <ArrowRight size={18} />
                                    </button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    className="bg-white/5 border border-white/10 rounded-[3rem] p-12 md:p-20 shadow-3xl"
                                >
                                    <div className="text-center mb-16">
                                        <div className="p-8 bg-[#f97316]/10 rounded-[2rem] w-fit mx-auto mb-10 text-[#f97316] border border-[#f97316]/20 text-4xl">
                                            💸
                                        </div>
                                        <h2 className="text-4xl font-serif font-bold text-white mb-4 italic">Gaya Perjalanan</h2>
                                        <p className="text-white/40 font-serif italic">Logistik akan menyesuaikan dengan ambisi anggaran Anda.</p>
                                    </div>

                                    <div className="grid sm:grid-cols-3 gap-6 mb-16">
                                        {[
                                            { id: 'low', label: 'Efisien', desc: 'Ransel & Warung Lokal', icon: '🎒' },
                                            { id: 'medium', label: 'Standar', desc: 'Keseimbangan & Kenyamanan', icon: '☕' },
                                            { id: 'high', label: 'Eksklusif', desc: 'Fine Dining & Private Guide', icon: '✨' }
                                        ].map(b => ( b.id === formData.budget ? (
                                            <button
                                                key={b.id}
                                                onClick={() => setFormData({ ...formData, budget: b.id })}
                                                className="p-10 rounded-[2.5rem] border-2 text-left transition-all border-[#f97316] bg-[#f97316]/5 shadow-2xl"
                                            >
                                                <div className="text-4xl mb-6">{b.icon}</div>
                                                <h3 className="text-lg font-serif font-bold text-white mb-2">{b.label}</h3>
                                                <p className="text-[10px] text-white/40 leading-relaxed font-serif italic">{b.desc}</p>
                                            </button>
                                        ) : (
                                            <button
                                                key={b.id}
                                                onClick={() => setFormData({ ...formData, budget: b.id })}
                                                className="p-10 rounded-[2.5rem] border border-white/5 text-left transition-all hover:bg-white/5"
                                            >
                                                <div className="text-4xl mb-6 opacity-30">{b.icon}</div>
                                                <h3 className="text-lg font-serif font-bold text-white/40 mb-2">{b.label}</h3>
                                                <p className="text-[10px] text-white/20 leading-relaxed font-serif italic">{b.desc}</p>
                                            </button>
                                        )))}
                                    </div>

                                    <div className="flex gap-4">
                                        <button className="flex-1 border border-white/10 text-white/40 font-bold py-6 rounded-[2rem] uppercase text-[10px] tracking-widest hover:bg-white/5 transition-all" onClick={() => setStep(1)}>Kembali</button>
                                        <button className="flex-[2] bg-white text-black font-bold py-6 rounded-[2rem] uppercase text-[10px] tracking-widest hover:bg-[#f97316] hover:text-white transition-all shadow-2xl" onClick={() => setStep(3)}>Lanjutkan</button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white/5 border border-white/10 rounded-[3rem] p-12 md:p-20 shadow-3xl"
                                >
                                    <div className="text-center mb-16">
                                        <div className="p-8 bg-[#f97316]/10 rounded-[2rem] w-fit mx-auto mb-10 text-[#f97316] border border-[#f97316]/20">
                                            <Heart size={48} strokeWidth={1} />
                                        </div>
                                        <h2 className="text-4xl font-serif font-bold text-white mb-4 italic">Apa Fokus Anda?</h2>
                                        <p className="text-white/40 font-serif italic">Pilih kategori yang paling resonan dengan jiwa Anda.</p>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16">
                                        {['Budaya', 'Alam', 'Kuliner', 'Sejarah', 'Belanja', 'Edukasi'].map(p => (
                                            <button
                                                key={p}
                                                onClick={() => handlePreference(p)}
                                                className={`p-8 rounded-[1.5rem] border-2 font-serif italic text-sm transition-all ${formData.preferences.includes(p)
                                                    ? 'border-[#f97316] bg-[#f97316] text-white shadow-xl'
                                                    : 'border-white/5 bg-white/5 text-white/30 hover:border-white/10'
                                                    }`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex gap-4">
                                        <button className="flex-1 border border-white/10 text-white/40 font-bold py-6 rounded-[2rem] uppercase text-[10px] tracking-widest hover:bg-white/5 transition-all" onClick={() => setStep(2)}>Kembali</button>
                                        <button
                                            className="flex-[2] bg-white text-black font-bold py-6 rounded-[2rem] uppercase text-[10px] tracking-widest hover:bg-[#f97316] hover:text-white transition-all shadow-2xl relative overflow-hidden"
                                            onClick={generateItinerary}
                                            disabled={loading}
                                        >
                                            {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : <><Sparkles size={16} className="inline mr-3" /> Rekonstruksi Rencana</>}
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && itinerary && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-16"
                                >
                                    {/* Summary Banner */}
                                    <div className="bg-[#f97316] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
                                        <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
                                            <Navigation size={200} />
                                        </div>
                                        <div className="relative z-10 space-y-4">
                                            <div className="px-4 py-1.5 bg-black text-white text-[8px] font-bold uppercase tracking-[0.5em] w-fit rounded-full">
                                                Strategic Itinerary {formData.duration} Hari
                                            </div>
                                            <h2 className="text-6xl font-serif font-bold tracking-tight italic">Hasil Karsa AI</h2>
                                            <p className="text-lg opacity-80 font-serif italic leading-relaxed">
                                                Rencana unik yang dikurasi untuk {formData.budget === 'low' ? 'petualangan hemat' : formData.budget === 'medium' ? 'kenyamanan moderat' : 'kemewahan eksklusif'}.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Itinerary Timeline */}
                                    <div className="space-y-24 pt-10">
                                        {itinerary.map((day) => (
                                            <div key={day.day} className="relative group">
                                                <div className="absolute left-10 top-24 bottom-0 w-px bg-white/5 hidden md:block group-last:hidden" />
                                                <div className="flex items-center gap-10 mb-12">
                                                    <div className="w-20 h-20 rounded-[2rem] bg-white text-black flex items-center justify-center text-2xl font-serif font-bold shadow-2xl z-10 transition-transform group-hover:scale-110">
                                                        {day.day}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-3xl font-serif font-bold text-white tracking-tight">{day.title}</h3>
                                                        <span className="text-[10px] font-bold text-[#f97316] uppercase tracking-[0.4em]">Fase {day.day}</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-6 md:ml-20">
                                                    {day.activities.map((act, idx) => (
                                                        <motion.div
                                                            key={idx}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            whileInView={{ opacity: 1, x: 0 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: idx * 0.1 }}
                                                            className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] flex items-center gap-8 group/item hover:border-[#f97316]/30 transition-all shadow-xl"
                                                        >
                                                            <div className="bg-[#f97316]/10 p-5 rounded-2xl text-[#f97316] border border-[#f97316]/10 shadow-inner">
                                                                <span className="text-[10px] font-bold font-mono">{act.time}</span>
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-4 mb-1">
                                                                    <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#f97316]">{act.category}</span>
                                                                    {act.transport && (
                                                                        <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/50 bg-white/5 px-2 py-0.5 rounded">
                                                                            {act.transport === 'via Klotok' ? '⛴️ ' : '🚗 '}{act.transport}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <h4 className="text-xl font-serif font-bold text-white group-hover/item:text-[#f97316] transition-colors">{act.activity}</h4>
                                                            </div>
                                                            <div className="p-4 bg-white/5 rounded-full text-white/20 group-hover/item:bg-[#f97316] group-hover/item:text-white transition-all">
                                                                <ArrowRight size={18} />
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Bottom Actions */}
                                    <div className="flex flex-col sm:flex-row gap-4 pt-20">
                                        <button 
                                            className="flex-1 bg-white text-black font-bold py-6 rounded-[2rem] flex items-center justify-center gap-4 uppercase text-[10px] tracking-widest hover:bg-[#f97316] hover:text-white transition-all shadow-2xl"
                                            onClick={() => window.print()}
                                        >
                                            <Compass size={18} /> Simpan Digital (PDF)
                                        </button>
                                        <button 
                                            className="flex-1 border border-white/10 text-white/40 font-bold py-6 rounded-[2rem] flex items-center justify-center gap-4 uppercase text-[10px] tracking-widest hover:bg-white/5 transition-all"
                                            onClick={() => setStep(1)}
                                        >
                                            <Trash2 size={18} /> Reset Strategi
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </Container>
            </div>
        </PageTransition>
    );
};

export default SmartPlanner;
