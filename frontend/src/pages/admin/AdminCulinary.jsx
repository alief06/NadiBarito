import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Plus, Edit, Trash2, Loader2, X, Utensils, Star, MapPin } from 'lucide-react';

const AdminCulinary = () => {
    const [culinary, setCulinary] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        priceRange: 'Populer',
        description: '',
        location: { lat: -7.795, lng: 110.368, address: '' },
        images: [''],
        isHalal: true,
        rating: 4.5
    });

    useEffect(() => { fetchCulinary(); }, []);

    const fetchCulinary = async () => {
        setLoading(true);
        try {
            const res = await api.get('/culinary');
            setCulinary(res.data);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    const handleOpenModal = (item = null) => {
        if (item) {
            setCurrentItem(item);
            setFormData(item);
        } else {
            setCurrentItem(null);
            setFormData({ name: '', priceRange: 'Populer', description: '', location: { lat: -7.795, lng: 110.368, address: '' }, images: [''], isHalal: true, rating: 4.5 });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentItem) {
                await api.put(`/culinary/${currentItem._id}`, formData);
            } else {
                await api.post('/culinary', formData);
            }
            setShowModal(false);
            fetchCulinary();
        } catch (err) { alert('Error saving culinary item'); }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Hapus menu kuliner ini?')) {
            try {
                await api.delete(`/culinary/${id}`);
                fetchCulinary();
            } catch (err) { alert('Error deleting'); }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-heritage font-bold text-heritage-brown">Manajemen Kuliner</h2>
                    <p className="text-gray-500">Kelola daftar rekomendasi hidangan dan tempat makan di Yogyakarta.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={20} /> Tambah Menu
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-sm font-bold text-gray-500">HIDANGAN</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-500">HARGA</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-500">STATUS</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-500">RATING</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-500 text-right">AKSI</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? (
                            <tr><td colSpan="5" className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-heritage-gold" /></td></tr>
                        ) : culinary.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                                            <img src={item.images?.[0]} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-heritage-brown">{item.name}</p>
                                            <p className="text-xs text-gray-400 truncate max-w-[200px]">{item.location?.address || 'Yogyakarta'}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4"><span className="text-sm font-medium">{item.priceRange}</span></td>
                                <td className="px-6 py-4">
                                    {item.isHalal ? (
                                        <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs font-bold uppercase">Halal</span>
                                    ) : (
                                        <span className="px-2 py-1 bg-gray-50 text-gray-400 rounded text-xs font-bold uppercase">Non-Halal</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 font-bold text-yellow-600">{item.rating}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => handleOpenModal(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(item._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-heritage-brown">{currentItem ? 'Edit Menu' : 'Tambah Menu Baru'}</h3>
                            <button onClick={() => setShowModal(false)}><X /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="block text-sm font-bold text-gray-600 mb-2">Nama Hidangan</label>
                                    <input
                                        type="text" required
                                        className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-heritage-gold"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="block text-sm font-bold text-gray-600 mb-2">Range Harga</label>
                                    <select
                                        className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-heritage-gold"
                                        value={formData.priceRange}
                                        onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                                    >
                                        <option value="Murah">Murah</option>
                                        <option value="Populer">Populer</option>
                                        <option value="Premium">Premium</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-600 mb-2">Rating</label>
                                    <input
                                        type="number" step="0.1" max="5"
                                        className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-heritage-gold"
                                        value={formData.rating}
                                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                                    />
                                </div>
                                <div className="flex items-end pb-3">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 accent-heritage-gold"
                                            checked={formData.isHalal}
                                            onChange={(e) => setFormData({ ...formData, isHalal: e.target.checked })}
                                        />
                                        <span className="text-sm font-bold text-gray-600 uppercase">Halal</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-600 mb-2">Alamat / Lokasi</label>
                                <input
                                    type="text"
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-heritage-gold"
                                    value={formData.location.address}
                                    onChange={(e) => setFormData({ ...formData, location: { ...formData.location, address: e.target.value } })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-600 mb-2">URL Gambar</label>
                                <input
                                    type="text"
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-heritage-gold"
                                    value={formData.images[0]}
                                    onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-600 mb-2">Deskripsi Singkat</label>
                                <textarea
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-heritage-gold h-24"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="w-full btn-primary py-4 rounded-xl font-bold">Simpan Menu</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCulinary;
