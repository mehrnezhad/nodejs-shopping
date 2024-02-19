import { Router } from "express";
import { uploadFile } from "../../common/utils/multer.js";
import { blogController } from "./blog.controller.js";
import Authorization from '../../common/middleware/authorization.js'
import checkRole from "../../common/middleware/checkRole.js";
const router = Router()
router.post('/create', uploadFile.single("image"), Authorization,checkRole('ADMIN'), blogController.create)
router.get('/all',blogController.getAll)
router.patch('/update/:id' ,uploadFile.single("image"), Authorization,blogController.updateBlog)
router.get('/:id',blogController.getOneBlog)
router.delete('/:id',blogController.deleteBlog)


export const blogRouter = router