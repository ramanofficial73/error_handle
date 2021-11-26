const mongoose = require('mongoose')
const dotenv = require('dotenv').config()


module.exports= connect = async()=>{
    try{
        // console.log(process.env.URL)
        const response = await mongoose.connect(process.env.URL)
        console.log("Database has been connect")
    }catch(error){
        console.log(error)
    }
}