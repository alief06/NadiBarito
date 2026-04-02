require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for admin seeding...");

        const adminEmail = 'admin@nadibarito.com';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log("Admin user already exists.");
            process.exit();
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        const adminUser = new User({
            name: 'Panglima Barito',
            email: adminEmail,
            password: hashedPassword,
            role: 'admin'
        });

        await adminUser.save();
        console.log("Admin User Created Successfully!");
        console.log("Email: admin@nadibarito.com");
        console.log("Pass: admin123");
        process.exit();
    } catch (err) {
        console.error("Admin Seeding Error:", err);
        process.exit(1);
    }
};

seedAdmin();
