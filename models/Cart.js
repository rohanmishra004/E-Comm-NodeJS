const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
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
    },
    {timestamps:true}   //in mongoose we can use timeStamp to add createdDate time to 
);

module.exports = mongoose.model("Cart", CartSchema)