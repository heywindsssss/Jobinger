import 'express-async-errors'
import User from '../models/userModel.js'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcryptjs'
import { comparePassword, hashedPassword } from '../utils/passwordUtils.js'
import { UnauthenticatedError } from '../errors/customErrors.js'
import { createJWT } from '../utils/tokenUtils.js'

export const register=async (req,res)=>{
    const isFirstAccount=await User.countDocuments()==0
    req.body.role=isFirstAccount?'admin':'user'
    const hashPassword=await hashedPassword(req.body.password);
    req.body.password=hashPassword;
    const user=await User.create(req.body)
    res.status(StatusCodes.CREATED).json({message:"User created successfully"})
}

export const login = async (req,res)=>{
    const user =await User.findOne({email:req.body.email})
    const isValidUser=user && await comparePassword(req.body.password,user.password)
    if (!isValidUser)throw new UnauthenticatedError('invalid credentials')
    const token=createJWT({userId:user._id,role:user.role})
    const oneDay=1000*60*60*24;
    res.cookie('token',token,{
        httpOnly:true,
        expires:new Date(Date.now()+oneDay),
        secure:process.env.NODE_ENV==='production',
    })
    res.status(StatusCodes.CREATED).json({message:"user logged in"}) 
}

export const logout=async(req,res)=>{
    res.cookie('token','logout',{
        httpOnly:true,
        expires:new Date(Date(Date.now()))
    });
    res.status(StatusCodes.OK).json({message:"user logged out"});
}