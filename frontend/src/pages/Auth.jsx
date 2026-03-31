import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Logo from './Logo';

const Auth = ({ mode = 'login' }) => {
    const isLogin = mode === 'login';
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = isLogin ? 'Login | NADIBARITO' : 'Register | NADIBARITO';
    }, [isLogin]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/register';
            const { data } = await api.post(endpoint, formData);
            
            // Mengubah token localStorage sesuai rencana migrasi NADIBARITO
            localStorage.setItem('nadibarito_token', data.token);
            localStorage.setItem('nadibarito_user', JSON.stringify(data.user));
            
            // Redirect sesuai Role
            window.location.href = data.user.role === 'admin' ? '/admin/dashboard' : '/user/itinerary';
        } catch (err) {
            setError(err.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-[#050505] flex items-center justify-center px-6 selection:bg-[#f97316] selection:text-white relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f97316]/10 blur-[120px] rounded-full pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white/5 backdrop-blur-2xl rounded-[32px] shadow-2xl p-8 md:p-12 w-full max-w-md border border-white/10 overflow-hidden relative z-10"
            >
                {/* Decorative background logo fragment */}
                <div className="absolute -top-16 -right-16 opacity-[0.05] pointer-events-none text-[#f97316] w-64 h-64 rotate-12">
                    <Logo />
                </div>

                <div className="text-center mb-10 relative">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="w-20 h-20 text-[#f97316] drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]">
                            <Logo />
                        </div>
                    </motion.div>

                    <h1 className="text-3xl font-sans font-bold text-white tracking-wide">
                        {isLogin ? 'Selamat Datang Kembali' : 'Bergabung dengan Banua'}
                    </h1>
                    <p className="text-white/50 mt-2 font-medium">
                        {isLogin ? 'Pulse of the Thousand Rivers' : 'Mulai petualangan Anda di Banjarmasin.'}
                    </p>
                </div>

                {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/10 text-red-400 p-4 rounded-xl text-sm mb-6 border border-red-500/20 italic">
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {!isLogin && (
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-white/80">Nama Penjelajah</label>
                            <div className="relative">
                                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                                <input
                                    type="text"
                                    required
                                    placeholder="Nama Lengkap Penjelajah"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-[#f97316] outline-none transition-all focus:ring-1 focus:ring-[#f97316]/50"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-white/80">Email Penjelajah</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                            <input
                                type="email"
                                required
                                placeholder="Email Aktif"
                                className="w-full pl-12 pr-4 py-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-[#f97316] outline-none transition-all focus:ring-1 focus:ring-[#f97316]/50"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-semibold text-white/80">Sandi Akses</label>
                            {isLogin && <a href="#" className="text-xs text-[#f97316] font-bold hover:underline opacity-80 hover:opacity-100">Lupa sandi?</a>}
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full pl-12 pr-4 py-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-[#f97316] outline-none transition-all focus:ring-1 focus:ring-[#f97316]/50"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 mt-8 bg-[#f97316] hover:bg-orange-600 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] flex justify-center items-center gap-2 active:scale-95 disabled:opacity-50"
                    >
                        {loading ? 'Memproses Identitas...' : (
                            <>
                                {isLogin ? 'Masuk ke Banua' : 'Eksplorasi Sekarang'}
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-white/10 text-center">
                    <p className="text-white/50 text-sm">
                        {isLogin ? 'Belum bergabung sebagai penjelajah?' : 'Sudah menjadi bagian dari kami?'} {' '}
                        <Link
                            to={isLogin ? '/register' : '/login'}
                            className="text-[#f97316] font-bold hover:underline drop-shadow-md"
                        >
                            {isLogin ? 'Daftar di sini' : 'Masuk di sini'}
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Auth;
