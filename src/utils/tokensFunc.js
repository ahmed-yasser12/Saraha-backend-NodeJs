import Jwt from "jsonwebtoken"


export const generateToken = ({ payload = {}, singature = process.env.DEFAULT_SIGNTURE, expiresIn = '1d' } = {}) => {

    if(!Object.keys(payload)){
        return false
    }
    const token =Jwt.sign(payload,singature,{expiresIn})
    return token
}


export const verifyToken = ({ token = '', singature = process.env.DEFAULT_SIGNTURE} = {}) => {

    if(!token){
        return false
    }
    const tokens =Jwt.verify(token,singature)
    return tokens
}
