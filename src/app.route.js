import { Router } from "express";
import { authRouter } from "./module/auth/auth.route.js";
import { categoryRouter } from "./module/category/category.route.js";
import { blogRouter } from "./module/blog/blog.route.js";
import { productRouter } from "./module/product/product.route.js";
import { courseRouter } from "./module/course/course.route.js";
import { userRouter } from "./module/user/user.route.js";
import { roleRouter } from "./module/role/role.route.js";
import { permissionRouter } from "./module/permission/permission.route.js";
import { graphqlHTTP } from "express-graphql";
import graphqlConfig from "./config/graphql.config.js";

const router = Router()

router.use('/auth',authRouter)
router.use('/category',categoryRouter)
router.use('/blog',blogRouter)
router.use('/product',productRouter)
router.use('/course', courseRouter)
router.use('/user',userRouter)
router.use('/role',roleRouter)
router.use('/permission' , permissionRouter)

//router.use('/graphql',graphqlHTTP(graphqlConfig))

router.use('/graphql', graphqlHTTP((req, res) => graphqlConfig(req, res))); 




export const appRouter = router