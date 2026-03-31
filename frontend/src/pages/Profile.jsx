import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import { User as UserIcon, Calendar, Heart, LogOut, ChevronRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser) {
            navigate('/login');
            return;
        }
        setUser(storedUser);
        setFormData({ name: storedUser.name, email: storedUser.email });

        const fetchItineraries = async () => {
            try {
                const response = await api.get(`/itinerary?userId=${storedUser.id}`);
                setItineraries(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchItineraries();
    }, [navigate]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            // Placeholder API call - assuming there's a profile update route
            // For now, we'll just update localStorage to simulate success
            const updatedUser = { ...user, ...formData };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            setIsEditing(false);
            alert('Profil berhasil diperbarui!');
        } catch (err) {
            alert('Gagal memperbarui profil');
        } finally {
            setSubmitting(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-heritage-cream pb-20">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar / Info Card */}
                    <div className="w-full md:w-1/3">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-[32px] p-8 shadow-xl border border-heritage-gold/5"
                        >
                            <div className="flex flex-col items-center text-center mb-8">
                                <div className="w-24 h-24 bg-heritage-gold rounded-full flex items-center justify-center text-heritage-brown mb-4 text-3xl font-bold shadow-lg shadow-heritage-gold/20">
                                    {user.name?.[0] || 'U'}
                                </div>
                                <h2 className="text-2xl font-heritage font-bold text-heritage-brown">{user.name}</h2>
                                <p className="text-gray-500 text-sm">{user.email}</p>
                                <span className="mt-4 px-4 py-1 bg-heritage-brown text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
                                    {user.role || 'User'}
                                </span>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className={`w-full flex items-center justify-center gap-3 p-4 rounded-xl font-bold transition-all ${isEditing ? 'bg-gray-100 text-gray-500' : 'bg-heritage-gold text-white shadow-lg shadow-heritage-gold/20'
                                        }`}
                                >
                                    {isEditing ? 'Batal Edit' : 'Edit Profil'}
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center gap-3 p-4 rounded-xl border border-red-100 text-red-500 hover:bg-red-50 transition-colors font-bold"
                                >
                                    <LogOut size={18} />
                                    <span>Keluar Sesi</span>
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Main Content */}
                    <div className="w-full md:w-2/3">
                        <AnimatePresence mode="wait">
                            {isEditing ? (
                                <motion.div
                                    key="edit"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white rounded-[32px] p-10 shadow-xl border border-heritage-gold/5"
                                >
                                    <h3 className="text-2xl font-heritage font-bold text-heritage-brown mb-8">Informasi <span className="text-heritage-gold">Akun</span></h3>
                                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Nama Lengkap</label>
                                            <input
                                                type="text" required
                                                className="w-full p-4 bg-gray-50 border border-transparent focus:border-heritage-gold rounded-2xl outline-none transition-all font-medium"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Alamat Email</label>
                                            <input
                                                type="email" required
                                                className="w-full p-4 bg-gray-50 border border-transparent focus:border-heritage-gold rounded-2xl outline-none transition-all font-medium"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full btn-primary py-4 rounded-2xl font-bold shadow-xl shadow-heritage-gold/20 text-lg flex items-center justify-center gap-3"
                                        >
                                            {submitting ? <Loader2 className="animate-spin" /> : 'Simpan Perubahan'}
                                        </button>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="plans"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-3xl font-heritage font-bold text-heritage-brown">
                                            Rencana <span className="text-heritage-gold">Perjalanan</span>
                                        </h2>
                                        <span className="bg-white text-heritage-brown px-4 py-2 rounded-2xl text-xs font-bold shadow-sm border border-heritage-gold/10">
                                            {itineraries.length} Rencana
                                        </span>
                                    </div>

                                    {loading ? (
                                        <div className="flex justify-center py-20">
                                            <Loader2 className="animate-spin text-heritage-gold" size={40} />
                                        </div>
                                    ) : itineraries.length === 0 ? (
                                        <div className="bg-white rounded-[40px] p-16 text-center shadow-lg border border-dashed border-heritage-gold/20">
                                            <Calendar className="mx-auto text-gray-200 mb-6" size={64} />
                                            <h3 className="text-2xl font-heritage font-bold text-heritage-brown mb-2">Belum Ada Rencana</h3>
                                            <p className="text-gray-500 mb-8 max-w-xs mx-auto">Ayo rancang perjalanan impianmu ke berbagai sudut estetik Kalimantan Selatan.</p>
                                            <button
                                                onClick={() => navigate('/planner')}
                                                className="btn-primary px-8"
                                            >
                                                Mulai Perencana Cerdas
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="grid gap-6">
                                            {itineraries.map((plan) => (
                                                <div key={plan._id} className="bg-white rounded-[24px] p-8 shadow-lg border border-heritage-gold/5 hover:shadow-xl transition-all group">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div>
                                                            <h4 className="text-xl font-bold text-heritage-brown group-hover:text-heritage-gold transition-colors">Trip Kalsel {plan.duration} Hari</h4>
                                                            <p className="text-xs text-gray-400 mt-1 font-medium">Dibuat pada {new Date(plan.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                                        </div>
                                                        <span className="bg-heritage-gold/10 text-heritage-gold px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em]">{plan.budget}</span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 mb-8">
                                                        {plan.preferences.map((pref, i) => (
                                                            <span key={i} className="text-[10px] bg-heritage-cream/50 text-heritage-brown px-3 py-1 rounded-full font-bold uppercase tracking-tighter border border-heritage-gold/10">
                                                                {pref}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <button
                                                        onClick={() => navigate('/planner')}
                                                        className="text-heritage-brown font-bold text-sm flex items-center gap-1 hover:text-heritage-gold transition-colors"
                                                    >
                                                        Lihat Rincian <ChevronRight size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
