import path from "path"
import fs from "fs"
import { userModel } from "../../module/user/user.model.js"
import moment from "moment-jalaali"

export const deleteFile = (filename) => {

    if (filename) {
        const filepath = path.join(process.cwd(), "public", filename)
        fs.unlinkSync(filepath)
    } else {
        return null
    }

}

export const deleteInvalidPropertyInObject = (obj = {}, blackListFields = []) => {

    const nulishList = ["", " ", 0, "0", undefined, null]
    Object.keys(obj).forEach(key => {
        if (nulishList.includes(obj[key])) delete obj[key]
        if (blackListFields.includes(key)) delete obj[key]
        if (typeof obj[key] == 'string') obj[key] = obj[key].trim()
        if (Array.isArray(obj[key]) && obj[key].length == 0) delete obj[key]
        if (Array.isArray(obj[key]) && obj[key].length > 0) obj[key] = obj[key].map(item => item.trim())
    })


}
export const getTime = (time) => {
    let total = Math.round(time) / 60;
    let [min, percentage] = String(total).split(".");
    if (percentage == undefined) percentage = "0"
    let sec = Math.round(((percentage.substring(0, 2)) * 60) / 100);
    let hour = 0;
    if (min > 59) {
        total = min / 60;
        [hour, percentage] = String(total).split(".")
        if (percentage == undefined) percentage = "0"
        min = Math.round(((percentage.substring(0, 2)) * 60) / 100);
    }
    if (hour < 10) hour = `0${hour}`;
    if (min < 10) min = `0${min}`
    if (sec < 10) sec = `0${sec}`
    return hour + ":" + min + ":" + sec;
}

export const getTimeOfCourse = (chapter = []) => {
    let time, hour, minute, second = 0
    for (const episodes of chapter) {
        if (Array.isArray(episodes.episodes)) {

            for (const episode of episodes.episodes) {

                if (episode?.time) time = episode.time.split(":")
                else time = "00:00:00".split(":")
                if (time.length == 3) {
                    second += Number(time[0]) * 3600
                    second += Number(time[1]) * 60
                    second += Number(time[2])
                }
                else if (time.length == 2) {
                    second += Number(time[0]) * 60
                    second += Number(time[1])
                }
            }
        }
    }


    hour = Math.floor(second / 3600)
    minute = Math.floor(second / 60) % 60
    second = Math.floor(second % 60)

    if (hour < 10) hour = `0${hour}`;
    if (minute < 10) minute = `0${minute}`
    if (second < 10) second = `0${second}`
    return hour + ":" + minute + ":" + second;
}


export const copyObject = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}

export const generateInvoiceNumber = () => {

    return moment().format('YYYYMMDDHHmmssSSS') + String(process.hrtime()[1]).padStart(9, 0)
    
}

export const getbasketsofUser = async (userID) => {
    const basket = await userModel.aggregate([
        {
            $match: { _id: userID }
        },
        {
            $project: { "basket": 1 }
        },
        {
            $lookup: {
                from: "products",
                localField: "basket.products.productID",
                foreignField: '_id',
                as: "productDetail"
            }
        },
        {
            $lookup: {
                from: "courses",
                localField: "basket.courses.courseID",
                foreignField: '_id',
                as: 'courseDetail'
            }
        },
        {
            $addFields: {
                "productDetail": {
                    $function: {
                        body: function (productDetail, products) {
                            return productDetail.map(product => {
                                const count = products.find(item => item.productID.valueOf() == product._id.valueOf()).count
                                const totalPrice = count * product.price
                                return {
                                    ...product,
                                    basketCount: count,
                                    totalPrice,
                                    finalPrice: totalPrice - ((product.discount / 100) * product.price)
                                }
                            })
                        },
                        args: ["$productDetail", "$basket.products"],
                        lang: "js"
                    }
                }
            }
        },
        {
            $addFields: {
                "courseDetail": {
                    $function: {
                        body: function (courseDetail) {
                            return courseDetail.map(course => {
                                return {
                                    ...course,
                                    finalPrice: course.price - ((course.discount / 100) * course.price)
                                }
                            })
                        },
                        args: ["$courseDetail"],
                        lang: "js"
                    }
                }
            }
        }, {
            $addFields: {
                "paymentDetail": {
                    $function: {
                        body: function (courseDetail, productDetail, products) {

                            const courseAmount = courseDetail.reduce((total, course) => {
                                return total += (course.price - ((course.discount / 100) * course.price))
                            }, 0)

                            const productAmount = productDetail.reduce((total, product) => {
                                const count = products.find(item => item.productID.valueOf() == product._id.valueOf()).count
                                const totalPrice = count * product.price
                                return total += (totalPrice - ((product.discount / 100) * totalPrice))

                            }, 0)
                            const productIds = productDetail.map(item => item._id.valueOf())
                            const courseIds = courseDetail.map(item => item._id.valueOf())

                            return {
                                courseAmount,
                                productAmount,
                                totalAmount: courseAmount + productAmount,
                                productIds,
                                courseIds
                            }
                        },
                        args: ["$courseDetail", "$productDetail", "$basket.products"],
                        lang: "js"
                    }

                }
            }
        }
    ])
    return basket
}