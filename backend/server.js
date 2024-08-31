const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const User = require('./models/user')
const userRouter = require('./routes/user')
const alertRouter = require('./routes/alert')

require('dotenv').config()
const app = express()
app.use(express.json())
app.use( cors({
    origin :[ "http://localhost:3000"],
    method : ["POST", "GET"],
    credentials : true,
}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use(cookieParser())
app.use(bodyParser.json())
app.use(session({
    secret : "secret",
    resave : false,
    saveUninitialized : false,
    cookie :{
        secure: false,
        maxAge : 1000 * 60 * 60 * 24
    }
}))



mongoose.connect(process.env.DB_URL)
.then( () =>{
    console.log("COnnected to database")
}).catch((err)=>{
    console.log("Error while connecting dattabase", err.message)
})


app.all('/',(req,res)=>{
    res.send("Server responding")
})

app.post('/login', userRouter)
app.post('/register',userRouter)
app.post('/refreshToken',userRouter)
app.all('/loadAlerts', alertRouter)
app.all('/user',userRouter);
app.all('/alert',alertRouter);
app.all('/logout',userRouter);
app.all('/verifyAlerts',alertRouter);

app.get('/userLocation', (req,res) =>{
    const lat = parseFloat(req.query.lat)
    const long = parseFloat(req.query.lng)
    console.log('In server ')
    return res.json({latitude : lat, longitude : long})

})
app.post('/userLocation', (req,res) =>{
    console.log("hello from server")
    // req.session.latitude = ;
    // req.session.longitude = 
    const {latitude, longitude} = req.body
    // console.log(latitude)
    res.status(200).json({latitude : req.body.latitude, longitude : req.body.longitude})
})

app.listen(5000, ()=>{
    console.log('server is running');
})
