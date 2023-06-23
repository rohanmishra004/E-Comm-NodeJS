const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        title:{type:String , required:true},
        description:{type:String , required:true},
        img: { type: String, required: true},
        categories: { type: Array },
        size: { type: String},
        color: { type: String },
        price: { type: String, required:true }
    },
    {timestamps:true}   //in mongoose we can use timeStamp to add createdDate time to 
);

module.exports = mongoose.model("Product", ProductSchema)