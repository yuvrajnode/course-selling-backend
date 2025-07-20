const { Router } = require("express");
const { adminModel, courseModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");

const adminRouter = Router();

const adminSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string(),
    lastName: z.string()
});

adminRouter.post("/signup", async (req, res) => {
    try {
        const validated = adminSchema.parse(req.body);
        const hashedPassword = await bcrypt.hash(validated.password, 10);
        await adminModel.create({ ...validated, password: hashedPassword });

        res.json({ message: "Admin signup succeeded" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

adminRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({ email });
    if (!admin) return res.status(403).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(403).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: admin._id }, JWT_ADMIN_PASSWORD);
    res.json({ token });
});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
    const { title, description, price, imageUrl } = req.body;
    const course = await courseModel.create({ title, description, price, imageUrl, creatorId: req.adminId });
    res.json({ message: "Course created", course });
});

adminRouter.put("/course/:id", adminMiddleware, async (req, res) => {
    const { id } = req.params;
    await courseModel.findByIdAndUpdate(id, req.body);
    res.json({ message: "Course updated" });
});

adminRouter.get("/course/bulk", async (req, res) => {
    const courses = await courseModel.find({});
    res.json({ courses });
});

module.exports = { adminRouter };