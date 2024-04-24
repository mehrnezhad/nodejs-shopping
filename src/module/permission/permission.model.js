import { Schema, Types , model } from "mongoose";

const permissionSchema = new Schema({
    title : {type : String , unique: true},
    description : {type : String } 
},{
    timestamps : true,
    toJSON : {
        virtuals : true
    },
    id: false , 
    versionKey : false
    
})
permissionSchema.index({title : "text"})
export const permissionModel = model('permission' , permissionSchema)