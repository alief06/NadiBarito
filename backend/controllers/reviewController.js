const Review = require('../models/Review');

exports.createReview = async (req, res) => {
    try {
        const newReview = new Review(req.body);
        await newReview.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getReviewsByPlaceId = async (req, res) => {
    try {
        const reviews = await Review.find({ placeId: req.params.placeId }).populate('userId', 'name');
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({})
            .populate('userId', 'name email')
            .populate('placeId', 'name')
            .sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.json({ message: 'Review deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getReviewsByUserId = async (req, res) => {
    try {
        const reviews = await Review.find({ userId: req.params.userId }).populate('placeId', 'name images');
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
