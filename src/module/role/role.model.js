import { Schema, Types , model } from "mongoose";

const roleSchema = new Schema({
    title : {type : String , unique: true},
    permissions : {type : [Types.ObjectId] , ref: 'permission' ,default: []} 
},{
    timestamps : true,
    toJSON : {
        virtuals : true
    },
    id: false,
    versionKey : false
})

export const roleModel = model('role' , roleSchema)