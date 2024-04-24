import multer from "multer";
import fs from "fs"
import path from "path"
import createHttpError from "http-errors";
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
    
        if (file.originalname) {

            const date = new Date()
            const year = date.getFullYear().toString()
            const month = date.getMonth().toString()
            const day = date.getDate().toString()
            const directory = path.join(process.cwd(), 'public', 'uploads', 'videos', year, month, day)
            req.body.filePathUpload = path.join('uploads', 'videos', year, month, day)
            fs.mkdirSync(directory, { recursive: true })
            
            return cb(null, directory)
        }
        return cb(null, null)
    },

    filename: (req, file, cb) => {
        if (file.originalname) {

           const whiteList = ["video/mp4", "video/avi", "video/mpg", "video/mov", "video/mkv"]
            if (whiteList.includes(file.mimetype)) {
                const ext = path.extname(file.originalname)
                const filename = new Date().getTime().toString() + ext
                req.body.filename = filename
            
                return cb(null, filename)
            } else {
                return cb(new createHttpError.BadRequest('فرمت ویدیو نادرست می باشد'))
            }
        }
    }

})

export const uploadVideo = multer({
    storage,
    limits: {
        fileSize: 1000000 * 1000 * 1000
    }
})
