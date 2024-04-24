
import { Schema, model, Types} from "mongoose";

const answerSchema = new Schema({
    comment : {type: String , required: true},
    user: {type: Types.ObjectId, ref: "user"},
    show : {type : Boolean , default : false}
},{
    timestamps : true
})

const commentsSchema = new Schema({
comment : {type: String},
user: {type: Types.ObjectId, ref: "user"},
answers :{type : [answerSchema] , default:[]},
show : {type : Boolean , default : false},
openToComment : {type: Boolean , default : true}
},{
    timestamps : {
        createdAt : true
    }
})


const blogSchema = new Schema({

    title : {type : String , required: true},
    slug : {type : String , required:true},
    short_desc : {type : String , required: true},
    description: {type : String , required : true},
    image : {type : String },
    tags : {type : [String] , default: []},
    author : {type : Types.ObjectId , ref: "user", required : true},
    category : {type: Types.ObjectId ,ref: "category", required : true},
    likes : {type: [Types.ObjectId] , ref:"user", default : []},
    dislikes : {type: [Types.ObjectId] , ref:"user", default : []},
    bookmarks : {type: [Types.ObjectId] , ref:"user", default : []},
    comments : {type : [commentsSchema] , default : []},
    meta_title: {type:String , required: true},
    meta_description:{type:String , required: true},
    canonical:{type: String}
},{
    timestamps : true,
    versionKey : false,
    toJSON:{
        virtuals : true
    }
})

blogSchema.virtual('authorField',{
  ref: "user",
  localField: "author",
  foreignField : "_id",

})

blogSchema.virtual('categoryField',{
    ref: "category",
    localField: "category",
    foreignField : "_id",
  
})
  

export const BlogModel = model('blog' , blogSchema)