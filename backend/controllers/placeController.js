const Place = require('../models/Place');

exports.getPlaces = async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};
        if (category) query.category = category;
        if (search) query.name = { $regex: search, $options: 'i' };

        const places = await Place.find(query);
        res.json(places);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createPlace = async (req, res) => {
    try {
        const newPlace = new Place(req.body);
        await newPlace.save();
        res.status(201).json(newPlace);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPlaceById = async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if (!place) return res.status(404).json({ message: 'Place not found' });
        res.json(place);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updatePlace = async (req, res) => {
    try {
        const updatedPlace = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPlace) return res.status(404).json({ message: 'Place not found' });
        res.json(updatedPlace);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deletePlace = async (req, res) => {
    try {
        const place = await Place.findByIdAndDelete(req.params.id);
        if (!place) return res.status(404).json({ message: 'Place not found' });
        res.json({ message: 'Place deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
