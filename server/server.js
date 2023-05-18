var express = require("express")
var bodyParser = require('body-parser')
var app = express()
const cors = require('cors');
var auth = require("./auth/auth")
var jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

app.use(cors());


var users = [
    {username: "alvee", password: bcrypt.hashSync("Alvee123",10)}, 
    {username: "arshita", password: bcrypt.hashSync("Arshita123",10)},
    {username: "baba", password: bcrypt.hashSync("Baba123",10)},
] 

var messages = [
]

app.use(bodyParser.urlencoded({ extended: true }))

app.post('/login', (req, res)=>{
    var authenticated = false
    users.map((user)=>{
        if(user.username == req.body.username){
            if(bcrypt.compareSync(req.body.password, user.password)){
                var token = jwt.sign({username:user.username},"PrivateKeyErrorHobeNaDile")
                res.send(token)
                authenticated = true
                
            }
        }
    })
    if (!authenticated) res.status(400).send("Wrong username or password")
})
app.use(auth)

app.get('/messages', function(req, res){
    // res.send(messages.slice(-20))
    res.send(messages)
})



var server = app.listen(5000, function(){
    console.log("Server is running on port 5000")
})



var io = require("socket.io")(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

var g = require("socket.io")


io.use((socket, next) => {
    if(socket.handshake.auth && socket.handshake.auth.token){
        jwt.verify(socket.handshake.auth.token,"PrivateKeyErrorHobeNaDile",(err,decoded)=>{
            if(err) return next(new Error("Authentication Error"))
            socket.decoded = decoded
            next()
        })
    }
  });

io.on("connection", (socket) => {
    console.log("a user connected")
})


app.post('/messages', (req, res)=>{
    const token = req.header('token')
    var decoded = jwt.verify(token,"PrivateKeyErrorHobeNaDile")
    req.body.username = decoded.username
    messages.push(req.body)
    io.emit("message", req.body)
    res.sendStatus(200)
})
