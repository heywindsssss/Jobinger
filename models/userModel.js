import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    firstName:String,
    email:String,
    password:String,
    lastName:{
        type:String,
        default:'Last Name'
    },
    location:{
        type:String,
        default:'India'
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    avatar:String,
    avatarPublicId:String


})
userSchema.methods.toJSON=function(){
    let obj=this.toObject()
    delete obj.password;
    return obj;
}

export default mongoose.model('User',userSchema)