import autoBind from 'auto-bind'
import { courseService } from './course.service.js'
import { StatusCodes } from 'http-status-codes'
import { courseValidationSchema, chapterValidationSchema, episodeValidationSchema } from './course.validation.js'
import path from 'path'
import { copyObject, deleteFile, getTime } from '../../common/utils/functions.js'
import { getVideoDurationInSeconds } from 'get-video-duration'
import {deleteInvalidPropertyInObject} from '../../common/utils/functions.js'
class CourseController {
    #service
    constructor() {
        autoBind(this)
        this.#service = courseService
    }
    async allList(req, res, next) {
        try {
            const { search } = req.params
            const cources = await this.#service.getAllList(search)
            return res.json({
                message: StatusCodes.OK,
                data: {
                    cources
                }
            })

        } catch (error) {

            next(error)
        }
    }

    async create(req, res, next) {
        try {
            await courseValidationSchema.validateAsync(req.body)
            const { filename, filePathUpload } = req.body

            const image = path.join(filePathUpload, filename).replace(/\\/g, '/')
            const result = await this.#service.create({ ...req.body, image })
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    result
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async updateCourse(req,res,next){
        try {
            const {id} = req.params
            //const course = this.getCourseByid(id)
            const data = copyObject(req.body)
            let blackList = ["time" , "likes" , "deslikes" , "bookmarks","chapter" , "episodes"]
            const {filename , filePathUpload} = req.body
            deleteInvalidPropertyInObject(data , blackList)
            if(req.file){

                data.image = path.join(filePathUpload,filename).replace(/\\/g,'/')
                //deleteFile(course.image)

            }
            const result = await this.#service.updateCourse(data , id)
            return res.status(StatusCodes.OK).json({
                statusCode : StatusCodes.OK,
                data : {
                    result
                }
            })
        } catch (error) {
           next(error)   
        }
    }

    async getCourseByid(req, res, next) {
        try {
            const { id } = req.params
            const course = await this.#service.getCourseByid(id)
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    course
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async addChapter(req, res, next) {
        try {
            const { id } = req.params
            const { title } = req.body.title
            await chapterValidationSchema.validateAsync({ title })
            const chapterResult = await this.#service.addChapter(id, req.body)
            res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    chapterResult
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getChapters(req, res, next) {
        try {
            const { id } = req.params
            const courses = await this.#service.getChapters(id)
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    courses
                }
            })

        } catch (error) {

            next(error)
        }

    }

    async getchapterByid(req, res, next) {
        try {
            const { id } = req.params
            const chapter = await this.#service.getchapterByid(id)
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    chapter
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteChapterById(req, res, next) {
        try {
            const { id } = req.params
            const chapter = await this.#service.deleteChapterById(id)
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    chapter
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateChapter(req, res, next) {
        try {
            const { id } = req.params
            const data = req.body
            const result = await this.#service.updateChapter(id, data)
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    result
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async addEpisode(req, res, next) {
        try {
            console.log(req.file)
           const {title , text , type , chapterID , courseID  } =  await episodeValidationSchema.validateAsync(req.body)
            const videoAddress = path.join(req.body.filePathUpload, req.body.filename).replace(/\\/g, '/')
            req.body.video=videoAddress
            const videoUrl = `${process.env.BASE_URL}:${process.env.PORT}/${videoAddress}`
        
             const seconde = await getVideoDurationInSeconds(videoUrl)
             const time = getTime(seconde)
             const result =await this.#service.addEpisode({title , text , type , chapterID , courseID , videoAddress , time})
             return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data : {
                    result
                }
            })
        } catch (error) {
            deleteFile(req.body.video)
            next(error)
        }
    }

    async deleteEpisode(req,res,next){
        try {
            const {id} = req.params
            const result = await this.#service.deleteEpisode(id)
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    result
                }

            })
        } catch (error) {
            next(error)
        }
    }

    async editEpisode(req,res,next){
        try {
            const {id} = req.params
            const {filePathUpload ,filename } = req.body
            let time 
            let videoAddr 
            if(filename){

            videoAddr = path.join(filePathUpload, filename).replace(/\\/g,'/') 
            const videoUrl = `${process.env.BASE_URL}:${process.env.PORT}/${videoAddr}`
            const second =await getVideoDurationInSeconds(videoUrl)
            time = getTime(second)
            
            }
            
            const result = await this.#service.editEpisode({...req.body , time , videoAddr} , id)
            return res.json({
                statusCode : StatusCodes.OK,
                data : {
                    result
                }
            })

        } catch (error) {
            next(error)
        }

    }
}

export const courseController = new CourseController()
