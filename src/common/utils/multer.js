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
            const directory = path.join(process.cwd(), 'public', 'uploads', year, month, day)
            req.body.filePathUpload = path.join('uploads', year, month, day)
            fs.mkdirSync(directory, { recursive: true })
            return cb(null, directory)
        }
        cb(null, null)
    },

    filename: (req, file, cb) => {
        if (file.originalname) {
            const whiteList = ["image/png", "image/jpg", "image/jpeg", "image/webp"]
            if (whiteList.includes(file.mimetype)) {
                const ext = path.extname(file.originalname);
                const filename = new Date().getTime().toString() + ext
                req.body.filename = filename
                return cb(null, filename)

            } else {
                return cb(new createHttpError.BadRequest('فرمت تصویر نادرست می باشد'))
            }
        }
        cb(null, null)
    }

})

export const uploadFile = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})