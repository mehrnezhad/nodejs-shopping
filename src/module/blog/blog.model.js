import { Schema, model, Types} from "mongoose";

const commentsSchema = new Schema({
 user : {type : Types.ObjectId , required : true},
 comment : { type: String , required : true},
 createdAt : {type : Date , default : Date.now() },
 parent : {type: Types.ObjectId }
})

const blogSchema = new Schema({
    title : {type : String , required: true},
    slug : {type : String , required:true},
    short_desc : {type : String , required: true},
    description: {type : String , required : true},
    image : {type : String },
    tags : {type : [String] , default: []},
    author : {type : Types.ObjectId , ref: "user", required : true},
    category : {type: [Types.ObjectId] ,ref: "category", required : true},
    likes : {type: [Types.ObjectId] , ref:"user", default : []},
    dislikes : {type: [Types.ObjectId] , ref:"user", default : []},
    bookmarks : {type: [Types.ObjectId] , ref:"user", default : []},
    comments : {type : [commentsSchema] , default : []}
},{
    timestamps : true,
    versionKey : false,
    toJSON:{
        virtuals : true
    }
})

blogSchema.virtual('author_detail',{
  ref: "user",
  localField: "author",
  foreignField : "_id",

})

blogSchema.virtual('category_detail',{
    ref: "category",
    localField: "category",
    foreignField : "_id",
  
})
  

export const BlogModel = model('blog' , blogSchema)