const { Router } = require('express');
const { userModel, purchaseModel, courseModel } = require("../db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { z } = require('zod');
const { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware } = require('../middleware/user');

const userRouter = Router();

// Zod schema for validation
const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(20),
    firstName: z.string(),
    lastName: z.string()
});

// Signup route
userRouter.post('/signup', async function (req, res) {
    try {
        const validated = userSchema.parse(req.body);
        const hashedPassword = await bcrypt.hash(validated.password, 10);

        await userModel.create({
            ...validated,
            password: hashedPassword
        });

        res.json({
            message: 'User successfully created'
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Signin route
userRouter.post('/signin', async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email });

        if (!user) {
            return res.status(403).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD);
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

// Get purchases route
userRouter.get("/purchases", userMiddleware, async function (req, res) {
    try {
        const userId = req.userId;

        const purchases = await purchaseModel.find({ userId });
        const purchasedCourseIds = purchases.map(p => p.courseId);

        const coursesData = await courseModel.find({
            _id: { $in: purchasedCourseIds }
        });

        res.json({
            purchases,
            coursesData
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch purchases', error: error.message });
    }
});

module.exports = {
    userRouter
};