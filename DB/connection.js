import mongoose from "mongoose";
export const conntionDb=async ()=>{
    return await mongoose.connect(process.env.API_CONECCTION)
    .then((res)=>{console.log("Db connection sucess")})
    .catch((err)=>{console.log("Db connection fail ")})
}


