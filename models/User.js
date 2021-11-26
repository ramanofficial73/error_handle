const { Schema, model } = require("mongoose");
const validator = require('validator')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,

        // required: [true, "Please Enter Your Name"],
        // maxlength: [30, "Name cannot exced 30 charcter"],
        // minlength: [4, "Name should have more than 4 charcter"]

    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email id"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email id "],
    },
    password: {
        type: String,
        // required: true,
        required: [true, "Please enter your password"],
        minlength: [6, "Password should be grather than 8 Charcter"],
    }
}, {
    timestamps: true
}
)

module.exports = model('User',userSchema)