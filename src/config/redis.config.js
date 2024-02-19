
import redisDB from "redis"

    const redisClient = redisDB.createClient()
    await redisClient.connect()
    redisClient.on('connect' , ()=>{
        console.log("Redis Server Connected")
    })



    redisClient.on('ready',()=>{
        console.log('Redis Server is ready')
    })
    redisClient.on('error',(err)=>{
        console.log(`Error : ${err.message}`)
    })
    redisClient.on('end',()=>{
        console.log('Connection with Redis server ended')
    })

    export default redisClient