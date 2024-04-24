import autoBind from 'auto-bind'
import { courseModel } from './course.model.js'
import createHttpError from 'http-errors'
import { courseMessage } from './course.message.js'
import { copyObject } from '../../common/utils/functions.js'
class CourseService {
    #model
    constructor() {
        autoBind(this)
        this.#model = courseModel
    }

    async getAllList(search) {
        let list
        if (search) {
            list = await this.#model
                .find({
                    $text: {
                        $search: search
                    }
                })
                .populate([
                    { path: "category", select: { title: 1 } },
                    { path: "teacher", select: { first_name: 1, last_name: 1, mobile: 1, email: 1 } }
                ])
                .sort({ createdAt: -1 })

        } else {
            list = await this.#model
                .find({})
                .populate([
                    { path: "category", select: { title: 1 } },
                    { path: "teacher", select: { first_name: 1, last_name: 1, mobile: 1, email: 1 } }
                ])
                .sort({ createdAt: -1 })

        }
        return list
    }

    async create(data) {
        await this.chechExistsBySlug(data.slug)
        const result = await this.#model.create(data)
        return result
    }

    async updateCourse(data , id){
        const result = await this.#model.updateOne({_id : id} , {
            $set: data
        })
        if(result.modifiedCount == 0 ) throw new createHttpError.BadRequest(courseMessage.unSuccessfullyUpdated)
        return result
    }
    async chechExistsBySlug(slug) {
        const course = await this.#model.findOne({ slug })
        if (course) throw new createHttpError.Conflict(courseMessage.conflictSlug)
        return null
    }

    async getCourseByid(id) {
        const course = await this.#model.findOne({ _id: id })
        if (!course) { throw new createHttpError.NotFound(courseMessage.NotFound) }
        return course
    }
    async addChapter(id, data) {
        await this.getCourseByid(id)

        const chapterResult = await this.#model.updateOne(
            { _id: id },
            {
                $push: {
                    chapter: data
                }
            }

        )
        if (chapterResult.modifiedCount == 0) { throw new createHttpError.BadRequest(courseMessage.NotFound) }

        return chapterResult;

    }

    async getChapters(id) {
        const courses = await this.#model.findOne({ _id: id }, { chapter: 1, title: 1 })
        if (!courses) { throw new createHttpError.NotFound(courseMessage.NotFound) }
        return courses

    }

    async getchapterByid(id) {

        const chapter = await this.#model.findOne({ "chapter._id": id }, { "chapter.$": 1 })
        if (!chapter) throw new createHttpError.NotFound(courseMessage.NotFoundChapter)
        return chapter
    }

    async deleteChapterById(id) {
        await this.getchapterByid(id)
        const result = await this.#model.updateOne({ "chapter._id": id }, {
            $pull: {
                chapter: {
                    _id: id
                }
            }
        })

        if (result.modifiedCount == 0) throw new createHttpError.BadRequest(courseMessage.unSuccessfullyDeleted)
        return result
    }

    async updateChapter(id, data) {

        await this.getchapterByid(id)
        const updateChapter = await this.#model.updateOne({ "chapter._id": id }, {
            $set: {
                "chapter.$.title": data.title,
                "chapter.$.text": data.text
            }
        });

        if (updateChapter.modifiedCount == 0) throw new createHttpError.BadRequest(courseMessage.unSuccessfullyUpdated)
        return updateChapter;

    }

    async addEpisode(episodeDto) {
        const episode = {
            title: episodeDto.title,
            text: episodeDto.text,
            type: episodeDto.type,
            videoAddress: episodeDto.videoAddress,
            time: episodeDto.time
        }

        const episodeResult = await this.#model.updateOne({ _id: episodeDto.courseID, "chapter._id": episodeDto.chapterID }, {
            $push: {
                "chapter.$.episodes": episode
            }
        })
        if (episodeResult.modifiedCount == 0) throw new createHttpError.InternalServerError(courseMessage.episodeCreateUnsuccessfull)
        return episodeResult
    }
    async deleteEpisode(id) {
        const deletedResult = await this.#model.updateOne({ "chapter.episodes._id": id }, {
            $pull: {
                "chapter.$.episodes": {
                    _id: id
                }
            }
        })

        if (deletedResult.modifiedCount == 0) throw new createHttpError.InternalServerError(courseMessage.episodeUpdateFailed)
        return deletedResult
    }

    async editEpisode(episodeDto, id) {
        const episode = {
            title: episodeDto?.title,
            text: episodeDto?.text,
            time: episodeDto?.time,
            type: episodeDto?.type,
            videoAddress: episodeDto?.videoAddr
        }

        const lastEpisode = await this.getEpisode(id)

        const newEpisode = {
            ...lastEpisode,
            ...copyObject(episode)
        }


        const episodeResult = await this.#model.updateOne({ "chapter.episodes._id": id },
            {
                $set: {
                    "chapter.$[outer].episodes.$[inner]": newEpisode
                }
            },
            {
                arrayFilters: [
                    { "outer.episodes._id": id }, // Filter to match the chapter containing the episode
                    { "inner._id": id } // Filter to match the specific episode within the chapter
                ]
            }
        )
        if (episodeResult.modifiedCount == 0) { throw new createHttpError.BadGateway(courseMessage.episodeUpdateFailed) }

        return episodeResult
    }

    async getEpisode(episodeID) {
        const course = await this.#model.findOne({ "chapter.episodes._id": episodeID }, {
            "chapter.$": 1
        })
        const episode = course?.chapter?.[0]?.episodes?.find((e) => e._id == episodeID)
        return copyObject(episode);

    }

}

export const courseService = new CourseService()
