import bodyParser from 'body-parser';
import * as dotenv from 'dotenv'
dotenv.config();
import express from "express";
const app=express()
import morgan from "morgan";
import mongoose from 'mongoose';
import jobRouter from './routes/jobRouter.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'
import { authenticateUser } from './middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import cloudinary from 'cloudinary'

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
});

const __dirname=dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname,'./public')))

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}

const port = process.env.PORT || 5100

try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port,()=>{
        console.log(`server running on PORT ${port}...`);
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieParser());
app.use(express.json());


app.use('/api/v1/jobs',authenticateUser,jobRouter);
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',authenticateUser,userRouter)

app.get('*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, './public', 'index.html'));
});

app.use('*',(req,res)=>{
    res.status(404).json({message:"not found"})
})



app.use(errorHandlerMiddleware)
