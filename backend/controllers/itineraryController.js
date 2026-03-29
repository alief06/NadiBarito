const Itinerary = require('../models/Itinerary');

exports.createItinerary = async (req, res) => {
    try {
        const newItinerary = new Itinerary(req.body);
        await newItinerary.save();
        res.status(201).json(newItinerary);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getItineraryByUserId = async (req, res) => {
    try {
        const itineraries = await Itinerary.find({ userId: req.params.userId });
        res.json(itineraries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
