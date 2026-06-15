
import multer from "multer";


export const multerCloudFunc = (allowedextensionsArr) => {
    // destination 
    // fileName

    const storage = multer.diskStorage({})

    const fileFilter = function (req, file, cb) {
        // console.log(file);
        if (allowedextensionsArr.includes(file.mimetype)) {
            return cb(null, true)
        }
        cb(new Error('invalid extension', { cause: 500 }), false)
    }

    const fileUploads = multer({
        fileFilter, storage, limits: {
            files: 2
        }
    });
    return fileUploads
}
