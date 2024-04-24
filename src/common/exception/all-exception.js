import createHttpError from "http-errors"
const allExceptionHandler = (app) => {
    const serverError = createHttpError.InternalServerError
    app.use((err, req, res, next) => {
        res.json({
            data:{
                statusCode: err?.status ?? err?.statusCode ?? serverError.status ?? '500',
                message: err?.message ?? serverError?.message ?? 'Internal Server ERROR'
        
            }
     })
    })

}
export default allExceptionHandler