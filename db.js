const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    email: {type: String, unique: true},
    password: {type: String},
    firstName: {type : String},
    lastName: {type: String}
});

const adminSchema = new Schema({
    email: {type: String, unique: true},
    password: {type: String},
    firstName: {type : String},
    lastName: {type: String}
});

const courseSchema = new Schema({
    title: {type: String},
    description: {type: String},
    price: {type: Number},
    imageUrl: {type: String},
    creatorId: {type: ObjectId}
});

const purchaseSchema = new Schema({
    userId: {type: ObjectId},
    courseId: {type: ObjectId}
});

const userModel = mongoose.model('user', userSchema);
const adminModel = mongoose.model('admin', adminSchema);
const courseModel = mongoose.model('course', courseSchema);
const purchaseModel = mongoose.model('purchase', purchaseSchema );

module.exports = {
    userModel: userModel,
    adminModel: adminModel,
    courseModel: courseModel,
    purchaseModel: purchaseModel
}

// or we can also write it like this 
// module.exports = {userModel, adminModel, courseModel, purchaseModel};