import createHttpError from "http-errors"

const checkRole = (role) => {
    return function (req, res, next) {
        try {
            const user = req?.user
            if (user.roles.includes(role)) {
                next()
            } else {
                throw new createHttpError.Forbidden('شما مجاز به دیدن این صفحه نیستید')
            }
        } catch (error) {
            next(error)
        }
    }

}
export default checkRole