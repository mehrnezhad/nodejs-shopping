import { Router } from "express";
import { productController } from "./product.controller.js";
import {uploadFile} from "../../common/utils/multer.js"
import Authorization from "../../common/middleware/authorization.js";
import checkRole from "../../common/middleware/checkRole.js";
const router = Router()

router.post('/add',uploadFile.array("images",10),Authorization,checkRole('USER'),productController.add)
router.patch('/edit/:id',uploadFile.array("images",10),productController.edit)
router.get('/getAll', productController.getAll)
router.get('/getProductById/:id',productController.getProductById)
router.get('/getProductBySlug/:slug',productController.getProductBySlug)
router.delete('/deleteProductById/:id',productController.deleteProduct)

export const productRouter = router