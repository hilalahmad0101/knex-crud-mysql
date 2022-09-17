const express = require('express');
const db = require('./db.js');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
const router = express.Router();
router.post('/create', async (req, res) => {
    try {
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.send({
                success:false,
                message:'Please fill the field'
            })
        }else{
            const is_email=await db('users').select('*').where('email', email).first();
            if(is_email){
                return res.send({
                    success:false,
                    message:'Email already Exists'
                })
            }else{
                const hash_password=await bcryptjs.hash(password,12);
                const users=await db('users').insert({
                    name,email,password:hash_password
                })
                const user_id={user_id:users};
                const token=jwt.sign(user_id,"hilalahmadkhanasafullstackdeveloper");
                if(users){
                    return res.send({
                        success:true,
                        token:token,
                        message:'Account create successfully'
                    })
                }else{
                    return res.send({
                        success:false,
                        message:'Some problem'
                    })
                }
            }
        }
    } catch (err) {
        return res.send({
            success: false,
            message: err.message
        })
    }
})

module.exports = router;