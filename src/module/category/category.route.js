import { Router } from "express";
import { categoryController } from "./category.controller.js";

const router = Router()

router.post('/create',categoryController.create)
router.get('/all',categoryController.getAll)
router.get('/children/:id',categoryController.getChildrenCategory)
router.delete('/delete/:id',categoryController.deleteCategory)
router.patch('/:id/update',categoryController.updateCategory)
router.get('/:slug',categoryController.getCategoryWithSlug)


export const categoryRouter = router   
