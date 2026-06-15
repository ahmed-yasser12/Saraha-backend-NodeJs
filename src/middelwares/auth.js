import jwt from "jsonwebtoken"
import { userModel } from "../../DB/Models/user.model.js"
import { verifyToken } from "../utils/tokensFunc.js"

export const isAuth = () => {
    return async (req, res, next) => {
        try {
            const { authorization } = req.headers
            if (!authorization) {
                return res.status(400).json({ message: "login first" })
            }
            if (!authorization.startsWith("Saraha")) {
                return res.status(400).json({ message: "invalid token perfix" })
            }
            let splitToken = authorization.split(" ")[1];
            try {
                let decodeData = jwt.verify(splitToken, process.env.SIGN_IN_TOKEN)
                // const decodeData= verifyToken({token:splitToken,singature:process.env.SIGN_IN_TOKEN})
                let user = await userModel.findById(decodeData._id)
                if (!user) {
                    return res.status(400).json({ message: "please sign Up" })
                }
                req.authUser = user
                next();
            } catch (error) {
                    if(error == "TokenExpiredError: jwt expired"){
                        const user =await userModel.findOne({Token:splitToken})
                        if(user){
                            const userToken= jwt.sign({email:user.email, id:user._id},process.env.SIGN_IN_TOKEN,{expiresIn:20});
                            user.Token=userToken;
                            await user.save()
                        }
                        next(new Error("wrong token ", { cause: 400 }))
                    }
            }
        } catch (error) {
            next(new Error("catch Error in auth", { cause: 400 }))
        }
    }
}

