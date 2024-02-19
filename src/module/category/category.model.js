import { Schema, model, Types } from "mongoose";

const schemaCategory = new Schema({
    title: { type: String, required: true },
    slug: { type: String},
    icon: { type: String, required: false },
    parent: { type: Types.ObjectId, ref: "category", required: false , default: undefined},
    parents: { type: [Types.ObjectId], ref: "category", required: false, default: [] }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    id: false,
    versionKey: false
})

schemaCategory.virtual("children", {
    ref: "category",
    localField: "_id",
    foreignField: "parent"
})


function autoPopulate(next) {
    this.populate([{ path: "children" , select : {__v : 0 , id: 0}}])
    next()
}

schemaCategory.pre('find', autoPopulate).pre('findOne', autoPopulate)

export const CategoryModel = model('category', schemaCategory)