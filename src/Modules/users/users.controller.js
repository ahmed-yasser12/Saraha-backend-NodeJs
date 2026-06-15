import { userModel } from "../../../DB/Models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { sendEmail } from "../../services/sendEmail.js";
//  sign up
export const signUp = async (req, res, next) => {

    const { username, password, email, gender } = req.body;
    const useCheck = await userModel.findOne({ email });
    if (useCheck) {
        //    return  res.status(400).json({ message: "email already exist" })
        return next(new Error("email already exist", { cause: "400" }))
    }
    const token = jwt.sign({ email }, process.env.CONFIRM_TOKEN, { expiresIn: "1h" });
    const confirmEmail = `http://localhost:1500/user/confirmEmail/${token}`;
    const message = `<a href='${confirmEmail}'>Click Here</a>`
    const IsEmailSend = await sendEmail({
        to: email, subject: "user is signUp", html: message
    });
    if (!IsEmailSend) {
        // return res.status(500).json({message:"please Try Again"})
        return next(new Error("please Try Again", { cause: "500" }))

    }
    const hasdedPasswoed = bcrypt.hashSync(password, +process.env.SALT_ROUNDS)
    const userInstace = new userModel({ username, password: hasdedPasswoed, email, gender });
    await userInstace.save()
    res.status(201).json({ message: "Done", user: userInstace })

}
// confirm Email
export const confirmEmail = async (req, res) => {
    const { token } = req.params;
    const decodeToken = jwt.verify(token, process.env.CONFIRM_TOKEN);
    const userConfirmed = await userModel.findOneAndUpdate({ email: decodeToken.email }, { isConfirm: true }, { new: true })
    res.status(200).json({ message: "confirmed Done please try to login ", userConfirmed: userConfirmed })
}
// sign in
export const signIn = async (req, res) => {

    const { password, email } = req.body;
    const useCheck = await userModel.findOne({ email });
    if (!useCheck) {
        // res.status(400).json({ message: "Invalid email or password" })
        return next(new Error("Invalid email or password", { cause: "400" }))

    }
    const isMatch = bcrypt.compareSync(password, useCheck.password);
    if (!isMatch) {
        return next(new Error("Invalid email or password", { cause: "400" }))
    }
    const userToken = jwt.sign({ userEmail: email, _id: useCheck.id }, process.env.SIGN_IN_TOKEN, { expiresIn: '1h' })
    res.status(201).json({ message: "Sign in successful", user: userToken })

}
//  update profile
export const updateProfile = async (req, res) => {
    const { _id } = req.authUser
    const { username, email } = req.body;
    const user = await userModel.findOne({ email })
    // console.log(_id.toString() ,user._id.toString());
    if (user._id.toString() !== _id.toString()) {
        // res.status(400).json({ message: "You are not the owner of this profile" })
        return next(new Error("You are not the owner of this profile", { cause: "400" }))

    }
    const updatedUser = await userModel.findByIdAndUpdate(
        _id,
        { username, email },
        { new: true }
    )

    res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser
    })

}
//  get user profile
export const getUserProfile = async (req, res) => {
    const { _id } = req.authUser;

    const user = await userModel.findById(_id);
    if (!user) {
        // res.status(404).json({ message: "User not found" })
        return next(new Error("User not found", { cause: "404" }))

    }
    res.status(200).json({ message: "User profile retrieved successfully", user })

}
export const profilePicture = async (req, res, next) => {
    const { _id } = authUser;
    if (!req.file) {
        return next(new Error("please Uploads your profile Picture", { cause: "404" }))
    }
    const user = await userModel.findById(_id);
    if (!user) {
        return next(new Error("please Login ", { cause: "404" }))
    }
    const userNew = await userModel.findByIdAndUpdate(_id, { profile_Pic: req.file.path }, { new: true })
    res.status(200).json({ message: "Done", userNew })
}
export const CoverPictures = async (req, res, next) => {
    const { _id } = authUser;
    if (!req.files) {
        return next(new Error("please Uploads pictures", { cause: "404" }))
    }
    const user = await userModel.findById(_id);
    if (!user) {
        return next(new Error("please Login ", { cause: "404" }))
    }
    const coverImages = [];
    for (const file of req.files) {
        coverImages.push(file.path);
    }
    user.coverPics.length > 0 ?
        coverImages.push(user.coverPics) : coverImages

    const userNew = await userModel.findByIdAndUpdate(_id, { coverPics: coverImages }, { new: true })
    res.status(200).json({ message: "Done", userNew })
}

