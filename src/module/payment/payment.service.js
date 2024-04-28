import autoBind from "auto-bind";

class PaymentService {
    constructor() {
        autoBind(this)
    }
}

export const paymentService = new PaymentService()
