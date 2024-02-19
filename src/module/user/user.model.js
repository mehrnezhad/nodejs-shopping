import { Schema, model } from "mongoose"
const otpSchema = new Schema({
    code: { type: String, default: '' },
    expiresIN: { type: Number, default: 0 , required: false }
})
const userSchema = new Schema({

    first_name: { type: String, required: false },
    last_name: { type: String, required: false },
    username: { type: String, lowercase: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: false, lowercase: true },
    password: { type: String, required: false },
    verifiedMobile: { type: Boolean, required: true, default: false },
    otp: { type: otpSchema },
    roles: { type: [String], default: ['USER'] },
    discount: { type: Number, idefault: 0 },
    birthday: { type: String }
}, { timestamps: true })

export const userModel = model('user', userSchema)