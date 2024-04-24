import { model, Schema, Types } from "mongoose"
import { getTimeOfCourse } from "../../common/utils/functions.js"


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


const episodeSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    time: { type: String, required: true },
    type: { type: String, default: "unlock" },
    videoAddress: { type: String, default: "" }
}, {
    toJSON: {
        virtuals: true
    }
})
episodeSchema.virtual("videoUrl").get(function(){
    return `${process.env.BASE_URL}:${process.env.PORT}/${this.videoAddress}`

})
const chapterSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, default: "" },
    episodes: { type: [episodeSchema], default: [] }
})


const courseSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], required: true },
    category: { type: Types.ObjectId, ref: "category", required: true },
    likes: { type: [Types.ObjectId], ref: "user", default: [] },
    deslikes: { type: [Types.ObjectId], ref: "user" , default: [] },
    bookmarks: { type: [Types.ObjectId], ref: "user", default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    type: { type: String, required: true, default: "free" },
    time: { type: String, default: "00:00:00" },
    teacher: { type: Types.ObjectId, ref: "user" },
    studentsCount: { type: Number },
    chapter: { type: [chapterSchema], default: [] },
    comments: { type: [commentsSchema], default: [] },
    meta_title: { type: String, required: true },
    meta_description: { type: String, required: true },
    canonical: { type: String }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    id: false,
    versionKey: false
})

courseSchema.index({ title: "text", short_text: "text", text: "text" })
courseSchema.virtual("imageUrl").get(function () {
    return `${process.env.BASE_URL}:${process.env.PORT}/${this.image}`
})
courseSchema.virtual("totalTime").get(function(){
    return getTimeOfCourse(this.chapter || [])
})
export const courseModel = model("course", courseSchema)