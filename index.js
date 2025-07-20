const express = require('express');
const app = express();
require('dotenv').config();
//.env file is used to store environment variables in seperate file .gitignore so it can't be pushed in repo 
app.use(express.json());
const mongoose = require('mongoose');
const cors = require('cors');
//cross origin resiurce sharing 
app.use(cors());

const {userRouter} = require('./routes/user');
const {courseRouter} = require('./routes/course');
const {adminRouter} = require('./routes/admin');

app.use('/api/v1/user',userRouter);
app.use('/api/v1/admin',adminRouter); 
app.use('/api/v1/course',courseRouter);

app.get('/', function(req, res){
    res.status(200).json({
        messsage: "Course selling app is running in the background"
    })
})

async function main(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to mongoDB');
        app.listen(3000, () => {
            console.log("Server is listening on the port http://localhost:3000");
        });
    } catch(error) {
        console.error('Error connecting to mnongoDB:', error);
        process.exit(1);
    }

}
main();