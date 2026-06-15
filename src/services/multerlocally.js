
import multer from "multer";
import { nanoid } from "nanoid";
import path from 'path'
import fs from 'fs'
export const allowedExtensions={
    images:['image/png','image/jpeg','image/gif'],
    files:['application/pdf'],
    videos:['video/mp4']
}
export const multerFunc=(allowedextensionsArr,customPath)=>{
    // distination fileName
    if (!allowedextensionsArr) {
    allowedextensionsArr = allowedExtensions.images;
}
    if(!customPath){
        customPath ='General'
    }
    const destpath = path.resolve(`uploadsPic${customPath}`);
    if(!fs.existsSync(destpath)){
        fs.mkdirSync(destpath,{recursive:true})
    }
    const storage =multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,destpath)
        },
        filename:(req,file,cb)=>{
            cb(null,nanoid() + "-" + file.originalname)
        }
    })
     const fileFilter= (req,file,cb)=>{
        if(allowedextensionsArr.includes(file.mimetype)){
            return cb(null,true)
        }
        cb(new Error('invalid Extensions',{cause:"400"}),false)
    }
    const fileUploads= multer({storage , fileFilter});
    return fileUploads ;
}

// export const multerFunc=(allowedextensionsArr,customPath)=>{
//     // destination 
//     // fileName
//     if(!customPath){  
//         customPath ='general'
//     }
//     const destpath=path.resolve(`uploads/${customPath}`)
//     if(!fs.existsSync(destpath)){
//         fs.mkdirSync(destpath,{ recursive: true})
//     }
//     const storage=multer.diskStorage({
//         destination:function (req,file,cb) {
           
//             cb(null,destpath)
//         },
//         filename:function (req,file,cb){
//             // console.log({original : file.originalname });
//             const prefixName=nanoid() + file.originalname
//             cb(null,prefixName)
//         }
//     })

//     const fileFilter=function(req,file,cb){
//         // console.log(file);
//         if(allowedextensionsArr.includes(file.mimetype)){
//            return cb(null ,true)
//         }
//         cb(new Error('invalid extension',{cause:500}) ,false)
//     }

//     const fileUploads=multer({fileFilter,storage,limits:{
//         files:2
//     }});
//     return fileUploads
// }


// single  none => file
// feilds array any => files