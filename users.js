const express = require('express');
const db = require('./db.js');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
const auth = require('./middleware.js');
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

router.post('/login', async (req, res) => {
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.send({
                success:false,
                message:'Please fill the field'
            })
        }else{
            const users=await db('users').select('*').where('email', email).first();
            if(users){
                const compare_password=await bcryptjs.compare(password,users.password);
                if(compare_password){
                    const user_id={user_id:users.id};
                    const token=jwt.sign(user_id,"hilalahmadkhanasafullstackdeveloper");
                    return res.send({
                        success: true,
                        token,
                        message:'Account login successfully'
                    })
                }else{
                    return res.send({
                        success:false,
                        message:'Invalid Email and password'
                    })
                }
            }else{
                return res.send({
                    success:false,
                    message:'Invalid Email and password'
                })
            }
        }
    } catch (errors) {
        return res.send({
            success: false,
            message: errors.message
        })
    }
})

router.get('/me',auth, async (req, res)=>{
    try {

        console.log(req)
        const user_id=req.users;
        const users=await db('users').select('*').where('id',user_id).first();
        return res.send({
            success:true,
            users
        })
    } catch (error) {
        return res.send({
            success:false,
            message:error.message
        })
    }
})
module.exports = router;