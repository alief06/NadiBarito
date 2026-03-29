import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import {
    MapPin, Utensils, Star, Users,
    TrendingUp, Activity, ArrowUpRight,
    Calendar, Bell, Search, Filter
} from 'lucide-react';
import { motion } from 'framer-motion';
import Badge from '../../components/Badge';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        places: 0,
        culinary: 0,
        users: 0,
        reviews: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [placesRes, culinaryRes, usersRes, reviewsRes] = await Promise.all([
                    api.get('/places'),
                    api.get('/culinary'),
                    api.get('/users'),
                    api.get('/reviews/admin/all')
                ]);
                setStats({
                    places: placesRes.data.length,
                    culinary: culinaryRes.data.length,
                    users: usersRes.data.length,
                    reviews: reviewsRes.data.length
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        {
            title: 'Total Wisata',
            count: stats.places,
            icon: <MapPin />,
            color: 'text-heritage-gold',
            bg: 'bg-heritage-gold/10',
            trend: '+12% dari bulan lalu'
        },
        {
            title: 'Menu Kuliner',
            count: stats.culinary,
            icon: <Utensils />,
            color: 'text-heritage-brown',
            bg: 'bg-heritage-brown/10',
            trend: '+5% baru ditambahkan'
        },
        {
            title: 'Total Ulasan',
            count: stats.reviews,
            icon: <Star />,
            color: 'text-heritage-gold',
            bg: 'bg-heritage-gold/10',
            trend: 'Moderasi aktif'
        },
        {
            title: 'User Terdaftar',
            count: stats.users,
            icon: <Users />,
            color: 'text-heritage-brown',
            bg: 'bg-heritage-brown/10',
            trend: 'Pertumbuhan organic'
        },
    ];

    // Simulated Activity Data for Chart
    const chartData = [40, 60, 45, 90, 65, 80, 70];

    return (
        <div className="space-y-48">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-24">
                <div>
                    <h2 className="text-h2 font-heritage font-bold text-heritage-brown">Ringkasan Sistem</h2>
                    <p className="text-body opacity-60">Visualisasi data dan manajemen konten NirantaJogja.</p>
                </div>
                <div className="flex gap-12">
                    <button className="flex items-center gap-8 px-16 py-8 bg-white rounded-xl border border-black/5 shadow-sm text-small font-bold hover:bg-gray-50 transition-colors">
                        <Calendar size={18} />
                        7 Hari Terakhir
                    </button>
                    <button className="flex items-center gap-8 px-16 py-8 bg-heritage-brown text-white rounded-xl shadow-lg text-small font-bold hover:opacity-90 transition-opacity">
                        <Filter size={18} />
                        Filter Data
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24">
                {cards.map((card, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-24 rounded-3xl border border-black/5 shadow-sm hover:shadow-xl transition-all group"
                    >
                        <div className="flex justify-between items-start mb-16">
                            <div className={`p-12 ${card.bg} ${card.color} rounded-2xl`}>
                                {card.icon}
                            </div>
                            <span className="text-green-500 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                                <TrendingUp size={12} />
                                {card.trend}
                            </span>
                        </div>
                        <div>
                            <p className="text-small font-bold text-gray-400 mb-4">{card.title}</p>
                            <h4 className="text-h1 font-bold text-heritage-brown">{card.count}</h4>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Dashboard Section */}
            <div className="grid lg:grid-cols-3 gap-32">
                {/* Traffic Chart Card */}
                <div className="lg:col-span-2 bg-white p-32 rounded-[32px] border border-black/5 shadow-sm h-fit">
                    <div className="flex justify-between items-center mb-32">
                        <div>
                            <h3 className="text-h3 font-heritage font-bold text-heritage-brown">Aktivitas Pengguna</h3>
                            <p className="text-small opacity-50">Trend kunjungan website per hari.</p>
                        </div>
                        <div className="p-12 bg-heritage-gold/10 text-heritage-gold rounded-full">
                            <Activity size={24} />
                        </div>
                    </div>

                    {/* SVG Chart Placeholder */}
                    <div className="relative h-64 flex items-end justify-between px-24 border-b border-gray-100">
                        {chartData.map((val, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${val}%` }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                className="w-16 bg-gradient-to-t from-heritage-gold via-heritage-gold/50 to-transparent rounded-t-full relative group"
                            >
                                <div className="absolute -top-32 left-1/2 -translate-x-1/2 bg-heritage-brown text-white text-[10px] px-8 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                                    {val}%
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-16 px-16 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-white p-32 rounded-[32px] border border-black/5 shadow-sm">
                    <div className="flex items-center justify-between mb-24">
                        <h3 className="text-h3 font-heritage font-bold">Aktivitas Terbaru</h3>
                        <Badge variant="gold" size="sm">LIVE</Badge>
                    </div>
                    <div className="space-y-4 pt-16">
                        {[
                            { user: 'Budi Santoso', action: 'menyimpan rencana trip', time: '5m' },
                            { user: 'Maya Putri', action: 'memberi rating 5★ Gudeg', time: '12m' },
                            { user: 'Admin_Super', action: 'update data Malioboro', time: '1j' }
                        ].map((item, idx) => (
                            <div key={idx} className="flex gap-16 py-16 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors rounded-xl px-4 cursor-default">
                                <div className="w-40 h-40 rounded-full bg-heritage-cream flex items-center justify-center text-heritage-brown font-bold text-xs ring-2 ring-white">
                                    {item.user[0]}
                                </div>
                                <div className="flex-1">
                                    <p className="text-small font-bold text-heritage-brown">{item.user}</p>
                                    <p className="text-[12px] text-gray-500">{item.action}</p>
                                </div>
                                <span className="text-[10px] font-bold text-gray-300">{item.time}</span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-24 py-12 text-small font-bold text-heritage-gold hover:underline flex items-center justify-center gap-8 group">
                        Lihat Semua Aktivitas
                        <ArrowUpRight size={16} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
