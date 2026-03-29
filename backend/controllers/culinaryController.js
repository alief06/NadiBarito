const Culinary = require('../models/Culinary');

exports.getCulinary = async (req, res) => {
    try {
        const { priceRange, search } = req.query;
        let query = {};
        if (priceRange) query.priceRange = priceRange;
        if (search) query.name = { $regex: search, $options: 'i' };

        const culinaryList = await Culinary.find(query);
        res.json(culinaryList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createCulinary = async (req, res) => {
    try {
        const newCulinary = new Culinary(req.body);
        await newCulinary.save();
        res.status(201).json(newCulinary);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCulinaryById = async (req, res) => {
    try {
        const culinary = await Culinary.findById(req.params.id);
        if (!culinary) return res.status(404).json({ message: 'Culinary item not found' });
        res.json(culinary);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCulinary = async (req, res) => {
    try {
        const updatedCulinary = await Culinary.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCulinary) return res.status(404).json({ message: 'Culinary item not found' });
        res.json(updatedCulinary);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteCulinary = async (req, res) => {
    try {
        const culinary = await Culinary.findByIdAndDelete(req.params.id);
        if (!culinary) return res.status(404).json({ message: 'Culinary item not found' });
        res.json({ message: 'Culinary item deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
