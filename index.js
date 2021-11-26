const express = require('express')
const connect  = require('./config/db');
const router = require('./routess/userRoutes');
const postRoutes = require('./routess/postRoutes')
const profileRoutes = require('./routess/profilesRoutes')
const app = express()
const dotenv = require('dotenv').config()
var bodyParser = require('body-parser')
const path = require('path')

//connect monfgodb db
connect();
app.use(bodyParser.json())
app.use("/", router)
app.use("/", postRoutes)
app.use("/", profileRoutes)




// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));
const PORT = process.env.PORT || 5000

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "/client/build/")))
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

app.listen(process.env.PORT, ()=>{
    console.log("You app is running")
})