import { Router } from "express";
import { authRouter } from "./module/auth/auth.route.js";
import { categoryRouter } from "./module/category/category.route.js";
import { blogRouter } from "./module/blog/blog.route.js";
const router = Router()

router.use('/auth',authRouter)
router.use('/category',categoryRouter)
router.use('/blog',blogRouter)


export const appRouter = router