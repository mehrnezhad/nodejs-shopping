import createHttpError from "http-errors"
const notFoundHandler = (app) => {

    app.use((req, res, next) => {
        const error = createHttpError.NotFound
        res.json({
            data:{
                statusCode: error.status,
                message: error.message ?? 'آدرس در سمت سرور یافت نشد'
            }
        
        })

    })
}

export default notFoundHandler