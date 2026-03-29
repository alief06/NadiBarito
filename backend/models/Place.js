const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        address: { type: String }
    },
    description: { type: String, required: true },
    images: [String],
    rating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Place', PlaceSchema);
