import { Router } from "express";
import { uploadFile } from "../../common/utils/multer.js";
import { blogController } from "./blog.controller.js";
import Authorization from '../../common/middleware/authorization.js'
import checkRole from "../../common/middleware/checkRole.js";
const router = Router()
router.post('/create', uploadFile.single("image"), Authorization,checkRole('USER'), blogController.create)
router.get('/all',blogController.getAll)
router.get('/category/:slug',blogController.getBlogWithCategory)
router.patch('/update/:id' ,uploadFile.single("image"), Authorization,blogController.updateBlog)
router.patch('/:id/comment/create',Authorization,blogController.createComment)
router.patch('/:id/comment/:commentID/createreply',Authorization,blogController.createAnswer)

router.get('/:id',blogController.getOneBlog)
router.get('/:slug',blogController.getblogWithSlug)
router.delete('/:id',blogController.deleteBlog)


export const blogRouter = router