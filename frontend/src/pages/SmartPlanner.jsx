import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';
import { Calendar, DollarSign, Heart, Sparkles, MapPin, Clock, ArrowRight, Loader2, ChevronLeft, Trash2, Save, Download, Coffee, Mountain, Camera } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { Container, Section } from '../components/Layout';
import Button from '../components/Button';
import Badge from '../components/Badge';

const SmartPlanner = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        duration: 3,
        budget: 'medium',
        preferences: []
    });
    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const handlePreference = (pref) => {
        setFormData(prev => ({
            ...prev,
            preferences: prev.preferences.includes(pref)
                ? prev.preferences.filter(p => p !== pref)
                : [...prev.preferences, pref]
        }));
    };

    const generateItinerary = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2500));

        const mockPlan = Array.from({ length: formData.duration }, (_, i) => ({
            day: i + 1,
            title: i === 0 ? 'Wisata Klasik & Kuliner' : i === 1 ? 'Eksplorasi Alam & Modernitas' : 'Relaksasi & Budaya',
            activities: [
                { time: '08:00', activity: 'Sarapan Gudeg Yu Djum', location: 'Wijilan', category: 'Kuliner', icon: <Coffee size={14} /> },
                { time: '10:00', activity: formData.preferences.includes('Budaya') ? 'Keraton Yogyakarta & Tamansari' : 'HeHa Sky View', location: 'Pusat Kota', category: 'Wisata', icon: <Camera size={14} /> },
                { time: '13:00', activity: 'Makan Siang Nasi Pecel Solo', location: 'Sleman', category: 'Kuliner', icon: <Coffee size={14} /> },
                { time: '15:00', activity: formData.preferences.includes('Alam') ? 'Sunset di Pantai Parangtritis' : 'Jalan-jalan Malioboro', location: 'Bantul / Kota', category: 'Wisata', icon: <Mountain size={14} /> },
                { time: '19:00', activity: 'Makan Malam Bakmi Jowo Mbah Gito', location: 'Kotagede', category: 'Kuliner', icon: <Coffee size={14} /> }
            ]
        }));

        setItinerary(mockPlan);
        setLoading(false);
        setStep(4);
    };

    const saveItinerary = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('Silakan login untuk menyimpan rencana perjalanan.');
            return;
        }

        try {
            setSaving(true);
            await api.post('/itinerary', {
                userId: user.id,
                duration: formData.duration,
                budget: formData.budget,
                preferences: formData.preferences,
                plan: itinerary
            });
            alert('Rencana perjalanan berhasil disimpan!');
        } catch (err) {
            console.error(err);
            alert('Gagal menyimpan.');
        } finally {
            setSaving(false);
        }
    };

    const progress = (step / 4) * 100;

    return (
        <PageTransition>
            <div className="bg-heritage-cream dark:bg-heritage-dark min-h-screen pb-64">
                <Container>
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center mb-48"
                    >
                        <Badge variant="gold" className="mb-16 uppercase tracking-widest px-16 py-4">Smart Planner AI</Badge>
                        <h1 className="text-h1 font-heritage">Rencanakan <span className="text-heritage-gold">Keajaiban</span></h1>
                        <p className="text-body opacity-70 max-w-xl mx-auto mt-16 font-light">
                            Algoritma cerdas kami akan menyusun jadwal perjalanan paling optimal sesuai minat dan budget Anda.
                        </p>
                    </motion.div>

                    {/* Progress */}
                    <div className="max-w-2xl mx-auto mb-64 px-24">
                        <div className="flex justify-between items-center mb-16 px-8">
                            {['Durasi', 'Budget', 'Minat', 'Hasil'].map((s, i) => (
                                <div key={i} className={`text-[10px] font-bold uppercase tracking-widest ${step > i ? 'text-heritage-gold' : 'text-gray-400'}`}>
                                    {s}
                                </div>
                            ))}
                        </div>
                        <div className="h-4 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden p-2">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-heritage-gold rounded-full shadow-[0_0_15px_rgba(197,160,89,0.5)]"
                            />
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="premium-card p-48 text-center"
                                >
                                    <div className="p-24 bg-heritage-gold/10 rounded-full w-fit mx-auto mb-24 text-heritage-gold">
                                        <Calendar size={48} />
                                    </div>
                                    <h2 className="text-h2 font-heritage mb-8">Berapa lama kunjungan Anda?</h2>
                                    <p className="text-body opacity-60 mb-48">Maksimal 7 hari untuk optimasi rencana terbaik.</p>

                                    <div className="flex flex-wrap justify-center gap-16 mb-64">
                                        {[1, 2, 3, 4, 5, 6, 7].map(d => (
                                            <button
                                                key={d}
                                                onClick={() => setFormData({ ...formData, duration: d })}
                                                className={`w-64 h-80 rounded-3xl border-2 flex flex-col items-center justify-center transition-all ${formData.duration === d
                                                    ? 'border-heritage-gold bg-heritage-gold text-white shadow-xl'
                                                    : 'border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/20 hover:border-heritage-gold/30'
                                                    }`}
                                            >
                                                <span className="text-h2 font-bold">{d}</span>
                                                <span className="text-[10px] font-bold uppercase">Hari</span>
                                            </button>
                                        ))}
                                    </div>
                                    <Button variant="primary" size="lg" className="w-full sm:w-80" onClick={() => setStep(2)}>
                                        Lanjut <ArrowRight size={20} className="ml-8" />
                                    </Button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="premium-card p-48"
                                >
                                    <div className="text-center mb-48">
                                        <div className="p-24 bg-heritage-gold/10 rounded-full w-fit mx-auto mb-24 text-heritage-gold">
                                            <DollarSign size={48} />
                                        </div>
                                        <h2 className="text-h2 font-heritage mb-8">Tentukan Gaya Perjalanan</h2>
                                        <p className="text-body opacity-60">Rekomendasi tempat akan menyesuaikan dengan budget Anda.</p>
                                    </div>

                                    <div className="grid sm:grid-cols-3 gap-24 mb-64">
                                        {[
                                            { id: 'low', label: 'Efisien', desc: 'Warung Lokal & Transportasi Publik', icon: '🚲' },
                                            { id: 'medium', label: 'Standar', desc: 'Cafe Modern & Destinasi Populer', icon: '☕' },
                                            { id: 'high', label: 'Eksklusif', desc: 'Fine Dining & Private Guide', icon: '✨' }
                                        ].map(b => (
                                            <button
                                                key={b.id}
                                                onClick={() => setFormData({ ...formData, budget: b.id })}
                                                className={`p-32 rounded-[40px] border-2 text-left transition-all ${formData.budget === b.id
                                                    ? 'border-heritage-gold bg-heritage-gold/5 shadow-xl'
                                                    : 'border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/20 hover:border-heritage-gold/30'
                                                    }`}
                                            >
                                                <div className="text-4xl mb-16">{b.icon}</div>
                                                <h3 className="text-body font-bold mb-8">{b.label}</h3>
                                                <p className="text-small opacity-60 leading-tight">{b.desc}</p>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex gap-16">
                                        <Button variant="outline" size="lg" className="flex-1" onClick={() => setStep(1)}>Kembali</Button>
                                        <Button variant="primary" size="lg" className="flex-[2]" onClick={() => setStep(3)}>Lanjut</Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="premium-card p-48"
                                >
                                    <div className="text-center mb-48">
                                        <div className="p-24 bg-heritage-gold/10 rounded-full w-fit mx-auto mb-24 text-heritage-gold">
                                            <Heart size={48} />
                                        </div>
                                        <h2 className="text-h2 font-heritage mb-8">Apa Minat Utama Anda?</h2>
                                        <p className="text-body opacity-60">Pilih kategori yang paling ingin Anda jelajahi.</p>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-16 mb-64">
                                        {['Budaya', 'Alam', 'Kuliner', 'Sejarah', 'Belanja', 'Edukasi'].map(p => (
                                            <button
                                                key={p}
                                                onClick={() => handlePreference(p)}
                                                className={`p-24 rounded-3xl border-2 font-bold transition-all ${formData.preferences.includes(p)
                                                    ? 'border-heritage-gold bg-heritage-gold text-white'
                                                    : 'border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/20'
                                                    }`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex gap-16">
                                        <Button variant="outline" size="lg" className="flex-1" onClick={() => setStep(2)}>Kembali</Button>
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            className="flex-[2] relative overflow-hidden"
                                            onClick={generateItinerary}
                                            disabled={loading}
                                        >
                                            {loading ? <Loader2 className="animate-spin" /> : <><Sparkles className="mr-8" /> Generate Plan</>}
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && itinerary && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-32"
                                >
                                    {/* Summary Header */}
                                    <div className="premium-card bg-heritage-brown p-48 text-white relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-48 opacity-10">
                                            <Sparkles size={120} />
                                        </div>
                                        <div className="relative z-10">
                                            <Badge variant="gold" className="mb-16 uppercase tracking-[0.2em]">{formData.duration} Days Plan</Badge>
                                            <h2 className="text-h2 font-heritage">Itinerary Khusus Anda</h2>
                                            <p className="text-body opacity-70 mt-8 italic">Dipersonalisasi untuk budget {formData.budget} & minat {formData.preferences.join(', ')}</p>
                                        </div>
                                    </div>

                                    {/* Daily Plan */}
                                    <div className="space-y-48">
                                        {itinerary.map((day) => (
                                            <div key={day.day} className="relative">
                                                <div className="absolute left-32 top-64 bottom-0 w-2 bg-heritage-gold/20 hidden md:block"></div>
                                                <div className="flex items-center gap-24 mb-32">
                                                    <div className="w-64 h-64 rounded-2xl bg-heritage-gold text-white flex items-center justify-center text-h3 font-bold shadow-xl z-10">
                                                        {day.day}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-h3 font-heritage font-bold">{day.title}</h3>
                                                        <p className="text-small opacity-50 uppercase tracking-widest font-bold">Hari ke-{day.day}</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-24 md:ml-48">
                                                    {day.activities.map((act, idx) => (
                                                        <motion.div
                                                            key={idx}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            whileInView={{ opacity: 1, x: 0 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: idx * 0.1 }}
                                                            className="premium-card p-24 flex items-center gap-24 group hover:border-heritage-gold transition-colors"
                                                        >
                                                            <div className="bg-heritage-gold/10 p-16 rounded-2xl text-heritage-gold">
                                                                <span className="text-small font-bold">{act.time}</span>
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-8 mb-4">
                                                                    <Badge variant="outline" size="sm" className="px-8 py-0">{act.category}</Badge>
                                                                    <span className="text-[10px] opacity-40 uppercase tracking-tighter">● {act.location}</span>
                                                                </div>
                                                                <h4 className="text-body font-bold group-hover:text-heritage-gold transition-colors">{act.activity}</h4>
                                                            </div>
                                                            <div className="p-12 bg-black/5 rounded-full text-heritage-gold group-hover:bg-heritage-gold group-hover:text-white transition-all">
                                                                <ArrowRight size={16} />
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-16 pt-32">
                                        <Button variant="primary" size="lg" className="flex-1" onClick={saveItinerary} disabled={saving}>
                                            {saving ? <Loader2 className="animate-spin mr-8" /> : <Save className="mr-8" />}
                                            Simpan Rencana
                                        </Button>
                                        <Button variant="outline" size="lg" className="flex-1" onClick={() => setStep(1)}>
                                            <Trash2 className="mr-8" /> Reset
                                        </Button>
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
