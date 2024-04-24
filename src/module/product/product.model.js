
import { Schema, Types , model} from "mongoose";




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



const productSchema = new Schema({

  title: { type: String, required: true },
  slug:{type: String, required: true},
  short_text: { type: String, required: true },
  text: { type: String, required: true },
  images: { type: [String], required: true },
  tags: { type: [String], required: true },
  category: { type: Types.ObjectId, ref: "category", required: true },
  likes: { type: [Types.ObjectId], ref: "user", default: [] },
  deslikes: { type: [Types.ObjectId], ref: "user" , default: [] },
  bookmarks: { type: [Types.ObjectId], ref: "user" , default: [] },
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  count: { type: Number },
  type: { type: String, required: true },
  time: { type: String },
  format: { type: String },
  supplier: { type: Types.ObjectId , ref:"user" },
  comments: {type: [commentsSchema] , default: []},
  features: {
    type: Object,
    default: {
      length: "",
      height: "",
      width: "",
      weight: "",
      color: []
    }
  },
  meta_title:{type: String , required: true},
  meta_description: {type: String , required: true},
  canonical: {type: String , default: ""}
},{
  toJSON:{
    virtuals : true
  }
})
productSchema.index({title : "text" , short_text:"text" , text:"text" })

productSchema.virtual("imagesUrl").get(function(){
  return this.images.map(image=>`${process.env.BASE_URL}:${process.env.PORT}/${image}`)

})
export const productModel = model('product', productSchema)


