import createHttpError from "http-errors"
const notFoundHandler = (app) => {

    app.use((req, res, next) => {
        const error = createHttpError.NotFound
        res.json({
            status: error.status,
            message: error.message ?? 'صفحه یافت نشد'
        })

    })
}

export default notFoundHandler