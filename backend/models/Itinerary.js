const mongoose = require('mongoose');

const ItinerarySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    duration: { type: Number, min: 1, max: 5, required: true },
    budget: { type: String, enum: ['low', 'medium', 'high'], required: true },
    preferences: [String],
    plan: [{
        day: Number,
        activities: [{
            time: String,
            activity: String,
            locationId: { type: mongoose.Schema.Types.ObjectId }
        }]
    }]
}, { timestamps: true });

module.exports = mongoose.model('Itinerary', ItinerarySchema);
