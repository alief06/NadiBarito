import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User as UserIcon, LogIn, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import logo from '../assets/logo.png';

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/register';
            const { data } = await api.post(endpoint, formData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = data.user.role === 'admin' ? '/admin' : '/';
        } catch (err) {
            setError(err.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-heritage-cream flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[32px] shadow-2xl p-8 md:p-12 w-full max-w-md border border-heritage-gold/10 overflow-hidden relative"
            >
                {/* Decorative background logo */}
                <div className="absolute -top-20 -right-20 opacity-[0.03] pointer-events-none">
                    <img src={logo} alt="" className="w-64 h-64 rotate-12" />
                </div>

                <div className="text-center mb-10 relative">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center mb-8"
                    >
                        <img src={logo} alt="NirantaJogja" className="h-24 object-contain brightness-105" />
                    </motion.div>

                    <h1 className="text-3xl font-heritage font-bold text-heritage-brown">
                        {isLogin ? 'Selamat Datang Kembali' : 'Bergabung dengan Kami'}
                    </h1>
                    <p className="text-gray-500 mt-2">
                        {isLogin ? 'Masuk untuk mengakses fitur favorit Anda.' : 'Buat akun untuk mulai merencanakan perjalanan.'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100 italic">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {!isLogin && (
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-heritage-brown">Nama Lengkap</label>
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    required
                                    placeholder="Nama Anda"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-100 focus:border-heritage-gold outline-none transition-all"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-heritage-brown">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
                                required
                                placeholder="email@contoh.com"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-100 focus:border-heritage-gold outline-none transition-all"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-sm font-semibold text-heritage-brown">Kata Sandi</label>
                            {isLogin && <a href="#" className="text-xs text-heritage-gold hover:underline">Lupa sandi?</a>}
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-100 focus:border-heritage-gold outline-none transition-all"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary py-4 flex justify-center items-center gap-2 mt-4"
                    >
                        {loading ? 'Memproses...' : (
                            <>
                                {isLogin ? 'Masuk Sekarang' : 'Daftar Akun'}
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                    <p className="text-gray-500 text-sm">
                        {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'} {' '}
                        <Link
                            to={isLogin ? '/register' : '/login'}
                            className="text-heritage-gold font-bold hover:underline"
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
