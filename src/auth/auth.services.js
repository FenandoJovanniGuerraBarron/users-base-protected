const jwt = require('jsonwebtoken')
const jwtSecret = require('../../config').api.jwtSecret

const checkUserCredential = require('./auth.controller')

const postLogin = (req,res)=>{
    const {email,password} = req.body
    if(email,password){
        checkUserCredential(email,password)
        .then(data=>{
            if(data){
                const token =jwt.sign({
                    id:data.id,
                    email:data.email,
                    rol:data.rol
                },jwtSecret)
                res.status(200).json({
                    message:'Correct Credential',
                    token:token
                })
            }else{
                res.status(401).json({ message: 'Invalid Credentials' })
            }
        })
        .catch(err=>res.status(400).json({message:err.message}))
    }else{
        res.status(400).json({
            message: 'Missind Data',
            fields: {
                email: 'example@example.com',
                password: 'string'
            }
        })
    }
}

module.exports= postLogin