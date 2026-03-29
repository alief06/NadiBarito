const Culture = require('../models/Culture');

exports.getCulture = async (req, res) => {
    try {
        const cultures = await Culture.find({});
        res.json(cultures);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createCulture = async (req, res) => {
    try {
        const culture = new Culture(req.body);
        await culture.save();
        res.status(201).json(culture);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCulture = async (req, res) => {
    try {
        const culture = await Culture.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(culture);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteCulture = async (req, res) => {
    try {
        await Culture.findByIdAndDelete(req.params.id);
        res.json({ message: 'Culture deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
