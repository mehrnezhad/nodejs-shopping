import { Router } from "express";
import { permissionController } from "./permission.controller.js";

const router = Router()

router.post('/add',permissionController.createPermission)
router.get('/list',permissionController.getList)
router.delete('/remove/:id',permissionController.removePermission)
router.patch('/update/:id',permissionController.updatePermission)

export const permissionRouter = router


