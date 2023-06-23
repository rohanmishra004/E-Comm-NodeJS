const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username:{type:String , required:true, unique:true},
        email:{type:String , required:true, unique:true},
        password: { type: String, required: true },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    {timestamps:true}   //in mongoose we can use timeStamp to add createdDate time to 
);

module.exports = mongoose.model("User", UserSchema)