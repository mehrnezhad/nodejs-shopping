import { model, Schema, Types } from "mongoose";

const commentSchema = new Schema({
    comment : {type: String},
    user: {type: Types.ObjectId, ref: "user"},
    parent :{type : Types.ObjectId , ref: "comment"},
    show : {type : Boolean , default : false},
    openToComment : {type: Boolean , default : true}
},{
    timestamps: {createdAt : true},
    toJSON : {
        virtuals : true
    },
    versionKey : false,
    id: false
})

export const commentModel = model('comment' , commentSchema)