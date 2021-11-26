const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    body:{
        type:String,
        required: true
    },
    img:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    slug:{
        type:String,
        required: true
    },
    userName:{
        type:String,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
})

module.exports = model("Post", PostSchema)