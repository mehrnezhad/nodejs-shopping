import { Router } from "express";
import { paymentController } from "./payment.controller.js";
import Authorization from "../../common/middleware/authorization.js";

const router = Router()
router.post('/send',Authorization,paymentController.payment)
router.get('/verify',Authorization,paymentController.verify)
export const paymentRouter = router