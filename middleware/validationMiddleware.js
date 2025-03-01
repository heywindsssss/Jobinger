import { body,validationResult,param } from "express-validator";
import { BadRequestError, UnauthorizedError } from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose, { mongo } from "mongoose";
import Job from "../models/jobModel.js";
import { NotFoundError } from "../errors/customErrors.js";
import User from "../models/userModel.js";

const withValidationErrors=(validateValues)=>{
    return [validateValues,(req,res,next)=>{
        const errors=validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages=errors.array().map((error)=>error.msg);
            throw new BadRequestError(errorMessages)
            if(errorMessages[0].startsWith('no job')){
                throw new NotFoundError(errorMessages);
            }
            if (errorMessages[0].startsWith('not authorized')) {
                throw new UnauthorizedError("You are not authorized to access this")
            }
        }
        next();
    }]
};

export const validateJobInput=withValidationErrors([
    body('company').notEmpty().withMessage("Company's name can not be empty"),
    body('position').notEmpty().withMessage("Position name can not be empty"),
    body('jobLocation').notEmpty().withMessage("Job location can not be empty"),
    body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage("invalid job status value"),
    body('jobType').isIn(Object.values(JOB_TYPE)).withMessage("invalid job type")
])

export const validateIdParam=withValidationErrors([
    param('id').custom(async(value,{req})=>{
        const isValidId=mongoose.Types.ObjectId.isValid(value)
        if (!isValidId) {
            throw new BadRequestError('Invalid MongoDB ID');
        }
        const job= await Job.findById(value)
            if(!job){
                throw new NotFoundError(`no job with such id ${value}`);
            }
            const isAdmin=req.user.role==='admin'
            // const isOwner=req.user.userId===job.createdBy.createFromHexString();
            const isOwner = new mongoose.Types.ObjectId(req.user.userId).equals(job.createdBy);
            if (!isAdmin && !isOwner) {
                throw new UnauthorizedError("not authorized to access this route");
                
            }
            
        })
])

export const validateRegisterInput=withValidationErrors([
    body('name').notEmpty().withMessage("Name can not be empty"),
    body('lastName').notEmpty().withMessage("Last Name can not be empty"),
    body('email')
    .notEmpty().withMessage("email can not be empty")
    .isEmail().withMessage("invalid email format")
    .custom(async(email)=>
        {const user=await User.findOne({email})
        if (user) {
            throw new BadRequestError('Email already in use')
        }
        }),
    body('password').notEmpty().withMessage("password can not be empty").isLength({min:8}).withMessage("password must be atleast 8 character long"),
    body('location').notEmpty().withMessage("location can not be empty"),
])


export const validateLoginInput=withValidationErrors([
    body('email')
    .notEmpty().withMessage("Please enter registered email")
    .isEmail().withMessage("Invalid email format"),
    body('password').notEmpty().withMessage("Password field can not be empty")

])

export const validateUpdateUser=withValidationErrors([
    body('email')
    .notEmpty().withMessage("Please enter registered email")
    .isEmail().withMessage("Invalid email format")
    .custom(async(email,{req})=>
        {const user=await User.findOne({email})
        if (user && user._id.toString()!==req.user.userId) {
            throw new BadRequestError('Email already in use')
        }
        }),
    body('location').notEmpty().withMessage("location can not be empty"),
    body('name').notEmpty().withMessage("Name can not be empty"),
    body('lastName').notEmpty().withMessage("Last Name can not be empty"),
])