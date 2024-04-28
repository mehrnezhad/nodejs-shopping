import { model, Schema, Types } from "mongoose";

const paymentSchema = new Schema({
    invoiceNumber : {type: String},
    authority : {type: String},
    amount : {type : Number},
    description: {type: String},
    verify: {type:Boolean , default : false},
    user: {type: Types.ObjectId , ref: 'user'},
    basket : {type: Object , default : {}},
    refID: {type: String , default: undefined},
    cardHash:{type: String , default : undefined}
},{timestamps : true})

export const paymentModel = model('payment' , paymentSchema)