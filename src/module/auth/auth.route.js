import { Router } from "express";
import { authController } from "./auth.controller.js";
import Authorization from "../../common/middleware/authorization.js";
const router = Router()

router.post('/send-otp' , authController.sendOtp)
router.post('/check-otp' , authController.checkOtp)
router.post('/refresh-token',authController.refreshToken)
router.get('/check' ,Authorization, authController.check)

export const authRouter = router