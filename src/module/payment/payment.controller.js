import autoBind from "auto-bind"
import { paymentService } from "./payment.service.js"
import { generateInvoiceNumber, getbasketsofUser } from "../../common/utils/functions.js"
import createHttpError from "http-errors"
import { paymentMessage } from "./payment.message.js"
import { paymentModel } from "./payment.model.js"
import { StatusCodes } from "http-status-codes"
import { userModel } from "../user/user.model.js"
import { paymentRouter } from "./payment.route.js"
class PaymentController {
    #service
    constructor() {
        autoBind(this)
        this.#service = paymentService
    }

    async payment(req, res, next) {
        try {

            const user = req.user
            if (user.basket.products.length == 0 && user.basket.courses.length == 0) throw new createHttpError.InternalServerError(paymentMessage.BASKET_EMPTY)
            const basket = await getbasketsofUser(user._id)
            const amount = basket?.[0].paymentDetail?.totalAmount
            const zarinpall_Gateway = ''
            const zarinpall_request_url = ""
            const zarinpall_options = {
                merchantID: '',
                amount,
                description: '',
                callback_url: 'http://localhost:3001/verify'
            }
            const res = await fetch(zarinpall_request_url, zarinpall_options)
            const requestResult = await res.json()
            const { code, authority } = requestResult.data

            await paymentModel.create({
                invoiceNumber: generateInvoiceNumber(),
                authority,
                amount,
                verify: false,
                user: user._id,
                basket
            })

            if (code == 100 && authority) {
                return res.json({
                    data: {
                        code,
                        gateway: `${zarinpall_Gateway}/${authority}`
                    }
                })
            }
            throw new createHttpError.InternalServerError(paymentMessage.BASKET_PARAMETERS_ERROR)
        } catch (error) {
            next(error)
        }
    }

    async verify(req, res, next) {
        try {
            const { Authority: authority } = req.query
            const payment = await paymentModel.findOne({ authority })
            if (!payment) throw new createHttpError.NotFound(paymentMessage.PAYMENT_NOTFOUND)
            if (payment?.verify) throw new createHttpError.InternalServerError(paymentMessage.PAYMENT_PAYED_BEFORE)
            const verifyBody = JSON.stringify({
                authority,
                amount: payment.amount,
                merchant_id: ''
            })
            const res = await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: verifyBody
            })
            const paymentVerify = await res.json()
            if (paymentVerify.data.code == 100) {
                await paymentModel.updateOne({ authority }, {
                    $set: {
                        refID: paymentVerify.data.ref_id,
                        cardHash: paymentVerify.data.card_hash
                    }
                })
                const user = await userModel.findById(payment.user)
                await userModel.updateOne({_id: payment.user},{
                    $set:{
                        courses: [...user.courses , ...payment?.basket?.paymentDetail?.courseIds || []],
                        products: [...user.products , ...payment?.basket?.paymentDetail?.productIds || []],
                        basket:{
                            courses: [],
                            products:[]
                        }
                    }
                })
                return res.status(StatusCodes.OK).json({
                    statusCode: StatusCodes.OK,
                    data:{
                        message: 'پرداخت با موفقیت انجام شد'
                    }
                })
            }
            throw new createHttpError.BadGateway('پرداخت انجام نشد')
        } catch (error) {
            next(error)
        }
    }
}

export const paymentController = new PaymentController()