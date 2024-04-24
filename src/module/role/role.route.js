import { Router } from "express";
import { roleController } from "./role.controller.js";

const router =  Router();
router.get('/list',roleController.getRoles)
router.post('/createRole',roleController.createRole)
router.delete('/remove/:field',roleController.removeRole)
router.patch('/update/:id',roleController.updateRole)
export const roleRouter = router