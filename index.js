import express from "express"
import { config } from "dotenv"
import mongooseConfig from "./src/config/mongoose.config.js"
import swaggerCongif from "./src/config/swagger.config.js"
import notFoundHandler from "./src/common/exception/notfound-exception.js"
import allExceptionHandler from "./src/common/exception/all-exception.js"
import { appRouter } from "./src/app.route.js"
import path from "path"
const main = async()=>{
  const app = express()
  config()
  await mongooseConfig()
 

  //app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({extended : true}))
  app.use(express.static(path.join(process.cwd(),"/public")))



  swaggerCongif(app)
  app.use(appRouter)
  notFoundHandler(app)
  allExceptionHandler(app)
  app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
  })
}
main()