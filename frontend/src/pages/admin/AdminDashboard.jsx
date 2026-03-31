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
    useEffect(() => {
        document.title = 'Admin Panel | NADIBARITO';
    }, []);

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
            title: 'Total Destinasi',
            count: stats.places,
            icon: <MapPin />,
            color: 'text-[#f97316]',
            bg: 'bg-[#f97316]/10',
            trend: '+12% dari bulan lalu'
        },
        {
            title: 'Resep Kuliner',
            count: stats.culinary,
            icon: <Utensils />,
            color: 'text-[#f97316]',
            bg: 'bg-[#f97316]/10',
            trend: '+5% baru ditambahkan'
        },
        {
            title: 'Total Ulasan',
            count: stats.reviews,
            icon: <Star />,
            color: 'text-[#f97316]',
            bg: 'bg-[#f97316]/10',
            trend: 'Moderasi aktif'
        },
        {
            title: 'Total Penjelajah',
            count: stats.users,
            icon: <Users />,
            color: 'text-[#f97316]',
            bg: 'bg-[#f97316]/10',
            trend: 'Pertumbuhan organic'
        },
    ];

    // Simulated Activity Data for Chart
    const chartData = [40, 60, 45, 90, 65, 80, 70];

    return (
        <div className="space-y-12 bg-[#050505] min-h-screen text-white rounded-[32px] p-6 md:p-12 mb-12">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10 w-full mb-12">
                <div>
                    <h2 className="text-3xl font-sans font-bold text-white tracking-wide">NADIBARITO Command Center</h2>
                    <p className="text-white/50 mt-2 font-medium">Visualisasi data dan manajemen konten Banjarmasin.</p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-4 bg-white/5 rounded-xl border border-white/10 shadow-sm text-sm font-bold hover:bg-white/10 hover:text-[#f97316] transition-colors">
                        <Calendar size={18} />
                        7 Hari Terakhir
                    </button>
                    <button className="flex items-center gap-2 px-6 py-4 bg-[#f97316] text-white rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.3)] text-sm font-bold hover:bg-orange-600 transition-colors">
                        <Filter size={18} />
                        Filter Data
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white/5 p-8 rounded-3xl border border-white/10 shadow-sm hover:shadow-[0_0_20px_rgba(249,115,22,0.1)] hover:border-[#f97316]/30 transition-all group"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-4 ${card.bg} ${card.color} rounded-2xl`}>
                                {card.icon}
                            </div>
                            <span className="text-green-400 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-green-400/10 px-2 py-1 rounded">
                                <TrendingUp size={12} />
                                {card.trend}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white/50 mb-2">{card.title}</p>
                            <h4 className="text-4xl font-bold text-white">{card.count}</h4>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Dashboard Section */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Traffic Chart Card */}
                <div className="lg:col-span-2 bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-sm h-fit">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-xl font-sans font-bold text-white">Aktivitas Penjelajah</h3>
                            <p className="text-sm text-white/50 mt-1">Trend kunjungan website per hari.</p>
                        </div>
                        <div className="p-3 bg-[#f97316]/10 text-[#f97316] rounded-xl border border-[#f97316]/20">
                            <Activity size={24} />
                        </div>
                    </div>

                    {/* SVG Chart Placeholder */}
                    <div className="relative h-64 flex items-end justify-between px-6 border-b border-white/10">
                        {chartData.map((val, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${val}%` }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                className="w-12 bg-gradient-to-t from-[#f97316] via-[#f97316]/50 to-transparent rounded-t-xl relative group hover:opacity-80 transition-opacity"
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#112F36] border border-[#f97316]/30 text-[#f97316] text-xs px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                                    {val}%
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 px-4 text-xs font-bold text-white/40 uppercase tracking-widest">
                        <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-sm h-fit">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-sans font-bold text-white">Aktivitas Terbaru</h3>
                        <Badge variant="gold" size="sm">LIVE</Badge>
                    </div>
                    <div className="space-y-3 pt-4">
                        {[
                            { user: 'Budi Santoso', action: 'menyimpan rencana ekspedisi', time: '5m' },
                            { user: 'Maya Putri', action: 'memberi rating 5★ Soto Banjar', time: '12m' },
                            { user: 'Admin_Super', action: 'update data Pasar Terapung', time: '1j' }
                        ].map((item, idx) => (
                            <div key={idx} className="flex gap-4 py-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors rounded-xl px-3 cursor-default group">
                                <div className="w-10 h-10 rounded-full bg-[#112F36] flex items-center justify-center text-[#f97316] font-bold text-xs ring-1 ring-[#f97316]/30">
                                    {item.user[0]}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-white group-hover:text-[#f97316] transition-colors">{item.user}</p>
                                    <p className="text-xs text-white/50">{item.action}</p>
                                </div>
                                <span className="text-[10px] font-bold text-white/30 uppercase">{item.time}</span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-3 text-sm font-bold text-[#f97316] hover:bg-[#f97316]/10 rounded-xl transition-colors flex items-center justify-center gap-2 group">
                        Jejak Aktivitas Penuh
                        <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
