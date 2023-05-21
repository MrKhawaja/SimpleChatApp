
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
function auth(req,res,next){
    const token = req.header('token')
    if(!token) return res.status(401).send("Access Denied, No Token Provided")
    if(jwt.verify(token,"PrivateKeyErrorHobeNaDile")){
        next()
    }
    else{
        res.status(401).send("Access Denied")
    }
}




module.exports = auth