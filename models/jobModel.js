import mongoose from "mongoose";
import { JOB_STATUS } from "../utils/constants.js";
import { JOB_TYPE } from "../utils/constants.js";

const jobSchema=new mongoose.Schema({
    company:String,
    position:String,
    jobStatus:{
        type:String,
        enum:Object.values(JOB_STATUS),
        default:JOB_STATUS.PENDING
    },
    jobType:{
        type:String,
        enum:Object.values(JOB_TYPE),
        default:JOB_TYPE.FULL_TIME
    },
    jobLocation:{
        type:String,
        default:"my city"
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

jobSchema.statics.createJob = async function (data) {
    try {
        const job = await this.create(data); // 'this' refers to the Job model
        return job;
    } catch (error) {
        throw error; // Re-throw the error for handling in the controller
    }
};

const Job = mongoose.model('Job', jobSchema); 

export default Job;
// export default mongoose.model('Job',jobSchema)

