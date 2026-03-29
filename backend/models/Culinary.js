const mongoose = require('mongoose');

const CulinarySchema = new mongoose.Schema({
    name: { type: String, required: true },
    priceRange: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        address: { type: String }
    },
    description: { type: String },
    images: [String],
    isHalal: { type: Boolean, default: true },
    rating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Culinary', CulinarySchema);
