import { Router } from "express";
import { userController } from "./user.controller.js";
import Authorization from "../../common/middleware/authorization.js";
import checkpermissions from "../../common/middleware/permissions.guard.js";

const router = Router()

router.get('/getAllUsers', Authorization ,checkpermissions(['SEO']),userController.getAllList)
router.patch('/updateUser', Authorization , userController.updateUser)
router.get('/profile',Authorization,userController.getProfile)

export const userRouter = router