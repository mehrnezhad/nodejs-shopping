import { Schema, Types, model } from "mongoose"
const otpSchema = new Schema({
    code: { type: String, default: '' },
    expiresIN: { type: Number, default: 0, required: false }
})

const productSchema = new Schema({
    productID: { type: Types.ObjectId, ref: "product" },
    count: { type: Number, default: 1 }
})

const courseSchema = new Schema({
    courseID: { type: Types.ObjectId, ref: "course" },
    count: { type: Number, default: 1 }
})

const basketSchema = new Schema({
    courses: { type: [courseSchema], default: [] },
    products: { type: [productSchema], default: [] },
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
    role: { type: String, default: 'USER' },
    discount: { type: Number, idefault: 0 },
    basket: { type: basketSchema },
    birthday: { type: String },
    courses: { type: [Types.ObjectId], ref: "course", default: [] },
    products: { type: [Types.ObjectId], ref: "product", default: [] },
    
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    versionKey: false,
    id: false
})

userSchema.index({ first_name: "text", last_name: "text", username: "text", mobile: "text" })
export const userModel = model('user', userSchema)