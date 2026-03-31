import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Plus, Edit, Trash2, Calendar, MapPin, Loader2, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        location: '',
        description: '',
        image: ''
    });

    useEffect(() => { fetchEvents(); }, []);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const res = await api.get('/events');
            setEvents(res.data);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    const handleOpenModal = (item = null) => {
        if (item) {
            setCurrentItem(item);
            setFormData({
                ...item,
                date: item.date ? new Date(item.date).toISOString().split('T')[0] : ''
            });
        } else {
            setCurrentItem(null);
            setFormData({ name: '', date: '', location: '', description: '', image: '' });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentItem) {
                await api.put(`/events/${currentItem._id}`, formData);
            } else {
                await api.post('/events', formData);
            }
            setShowModal(false);
            fetchEvents();
        } catch (err) { alert('Error saving event'); }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Hapus event ini?')) {
            try {
                await api.delete(`/events/${id}`);
                fetchEvents();
            } catch (err) { alert('Error deleting'); }
        }
    };

    return (
        <div className="space-y-32">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-heritage font-bold text-heritage-brown">Manajemen <span className="text-heritage-gold">Event</span></h1>
                    <p className="text-gray-500 mt-2 text-small">Kelola jadwal acara dan festival budaya di Kalimantan Selatan.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={20} /> Tambah Event
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
                {loading ? (
                    <div className="col-span-full py-20 text-center"><Loader2 className="animate-spin mx-auto text-heritage-gold" /></div>
                ) : events.map((event) => (
                    <motion.div
                        key={event._id}
                        layout
                        className="bg-white rounded-3xl shadow-xl overflow-hidden border border-heritage-gold/5 group"
                    >
                        <div className="h-48 relative">
                            <img src={event.image || 'https://via.placeholder.com/400x200'} alt={event.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button onClick={() => handleOpenModal(event)} className="p-8 bg-white/90 backdrop-blur-sm text-blue-600 rounded-xl shadow-lg hover:bg-blue-600 hover:text-white transition-all"><Edit size={16} /></button>
                                <button onClick={() => handleDelete(event._id)} className="p-8 bg-white/90 backdrop-blur-sm text-red-600 rounded-xl shadow-lg hover:bg-red-600 hover:text-white transition-all"><Trash2 size={16} /></button>
                            </div>
                        </div>
                        <div className="p-24 space-y-12">
                            <h3 className="text-xl font-bold text-heritage-brown line-clamp-1">{event.name}</h3>
                            <div className="flex items-center gap-8 text-xs text-gray-400 font-bold uppercase tracking-widest">
                                <Calendar size={14} className="text-heritage-gold" />
                                {new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-8 text-xs text-gray-500">
                                <MapPin size={14} className="text-heritage-gold" />
                                {event.location}
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-2 italic">"{event.description}"</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[150] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[40px] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-12 shadow-2xl relative"
                    >
                        <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 p-8 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></button>
                        <h2 className="text-3xl font-heritage font-bold text-heritage-brown mb-8">{currentItem ? 'Edit Event' : 'Event Baru'}</h2>

                        <form onSubmit={handleSubmit} className="space-y-24">
                            <div className="space-y-8">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Nama Event</label>
                                <input
                                    type="text" required
                                    className="w-full p-4 bg-gray-50 border border-transparent focus:border-heritage-gold rounded-2xl outline-none transition-all font-medium"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-24">
                                <div className="space-y-8">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Tanggal</label>
                                    <input
                                        type="date" required
                                        className="w-full p-4 bg-gray-50 border border-transparent focus:border-heritage-gold rounded-2xl outline-none transition-all font-medium"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-8">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Lokasi</label>
                                    <input
                                        type="text" required
                                        className="w-full p-4 bg-gray-50 border border-transparent focus:border-heritage-gold rounded-2xl outline-none transition-all font-medium"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-8">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">URL Gambar</label>
                                <div className="relative">
                                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                                    <input
                                        type="text"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent focus:border-heritage-gold rounded-2xl outline-none transition-all font-medium"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-8">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Deskripsi</label>
                                <textarea
                                    className="w-full p-4 bg-gray-50 border border-transparent focus:border-heritage-gold rounded-2xl outline-none transition-all font-medium h-32"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <button type="submit" className="w-full btn-primary py-4 rounded-2xl font-bold shadow-xl shadow-heritage-gold/20 text-lg">
                                {currentItem ? 'Simpan Perubahan' : 'Terbitkan Event'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default AdminEvents;
