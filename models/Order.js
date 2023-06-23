const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        userId:{type:String , required:true},
        products: [
            {
                productId: {
                    type:String
                },
                quantity: {
                    type: Number,
                    default:1
                }
            }
        ],
        amount: { type: Number, requierd: true },
        address: { type: Object, required: true },
        status:{type:String, default:"pending"}
    },
    {timestamps:true}   //in mongoose we can use timeStamp to add createdDate time to 
);

module.exports = mongoose.model("Order", OrderSchema)