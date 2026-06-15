// import { string } from "joi";
import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowerCase: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['female', "male"],
    },
    profile_Pic: {type: String},
    coverPics:[String],
    isConfirm: { type: Boolean, default: false },
    // profile_Pic:{ secure_url:String ,public_id:String},
    // coverPicture:[{ secure_url:String ,public_id:String}],
    // Token:{type:String}
}, {
    timestamps: true
})
export const userModel = mongoose.model('user', userSchema);

