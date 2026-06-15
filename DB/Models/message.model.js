import mongoose, { Schema } from "mongoose";

 const messageSchema= new Schema({
    content:{type:String,required:true},
    sendTo:{type:Schema.Types.ObjectId,ref:"user",required:true},
 },{timestamps:true})

 export const messageModel= mongoose.model('message',messageSchema)