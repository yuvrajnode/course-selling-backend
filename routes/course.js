const {Router} = require('express');
const {purchaseModel} = require("../db");
const {userMiddleware} = require("../middleware/user")
const courseRouter = Router();

courseRouter.post('/purchase', userMiddleware, async function(req,res){
// You would expect the user to pay the money to you that we implement later 
    const {courseId} = req.body;
    await purchaseModel.create ({
        userId: req.userId,
        courseId
    });
    res.json({
        message: 'course purchased successfully'
    });
});

courseRouter.get('/preview', async function(req,res) {
    res.json({
        message: 'This is the preview of the course'
    });
});

module.exports = {
    courseRouter: courseRouter
}