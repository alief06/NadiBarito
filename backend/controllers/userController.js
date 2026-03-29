const User = require('../models/User');

exports.getFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('favorites');
        res.json(user.favorites);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.toggleFavorite = async (req, res) => {
    try {
        const { userId, placeId } = req.body;
        const user = await User.findById(userId);

        const index = user.favorites.indexOf(placeId);
        if (index === -1) {
            user.favorites.push(placeId);
        } else {
            user.favorites.splice(index, 1);
        }

        await user.save();
        res.json(user.favorites);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
