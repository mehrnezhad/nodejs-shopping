import { Router } from "express";
import { courseController } from "./course.controller.js";
import { uploadFile , uploadVideo} from "../../common/utils/multer.js";

const router = Router()


router.get('/allList', courseController.allList)
router.post('/addCourse', uploadFile.single('image'), courseController.create)
router.patch('/update/:id',uploadFile.single('image'),courseController.updateCourse)
router.get('/getCourseById/:id', courseController.getCourseByid)
router.get('/getOneChapter/:id', courseController.getchapterByid)
router.patch('/updateChapter/:id', courseController.updateChapter)

router.patch('/:id/addChapter', courseController.addChapter)
router.get('/:id/getChapters', courseController.getChapters)
router.delete('/deleteChapter/:id', courseController.deleteChapterById)
router.post('/episode/addEpisode', uploadVideo.single('video'), courseController.addEpisode)
router.delete('/episode/removeEpisode/:id', courseController.deleteEpisode)
router.patch('/episode/editEpisode/:id' ,uploadVideo.single('video'), courseController.editEpisode)
export const courseRouter = router