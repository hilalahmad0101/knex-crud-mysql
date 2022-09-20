const express = require('express')
const router=express.Router();
const db = require('./db.js');
const auth = require('./middleware.js');

router.get('/',auth,async(req,res)=>{
    try {
        const products=await db('products').select('*');
        return res.send({
            success:true,
            products
        })
    } catch (error) {
        return res.send({
            success:false,
            message:error.message
        })
    }
})

router.post('/',auth,async(req,res)=>{
    try {
        const {title,price}=req.body;
        if(!title || !price){
            return res.send({
                success:false,
                message:"Please fill the field"
            })
        }else{
            const products=await db('products').insert({
                title,price
            });
            if(products){
                return res.send({
                    success:true,
                    message:"Product added"
                })
            }else{
                return res.send({
                    success:false,
                    message:"Some problem"
                })
            }
        }
    }catch (error) {
        return res.send({
            success:false,
            message:error.message
        })
    }
})

router.patch('/:id',auth,async(req,res)=>{
    try {
        const id=req.params.id;
        const products=await db('products').select('*').where('id',id).first();
        return res.send({
            success:true,
            products
        })
    } catch (error) {
        return res.send({
            success:false,
            message:error.message
        })
    }
})

router.put('/:id',auth,async(req,res)=>{
    try {
        const {title,price}=req.body;
        const id=req.params.id;
        if(!title || !price){
            return res.send({
                success:false,
                message:"Please fill the field"
            })
        }else{
            const products=await db('products').where('id',id).update({
                title,price
            });
            if(products){
                return res.send({
                    success:true,
                    message:"Product updated"
                })
            }else{
                return res.send({
                    success:false,
                    message:"Some problem"
                })
            }
        }
    }catch (error) {
        return res.send({
            success:false,
            message:error.message
        })
    }
})

router.delete('/:id',auth,async(req,res)=>{
    try {
        const id=req.params.id;
        const products=await db('products').select('*').where('id',id).delete();
        if(products){
            return res.send({
                success:true,
                message:"Product deleted"
            })
        }else{
            return res.send({
                success:false,
                message:"Some problem"
            })
        }
    } catch (error) {
        return res.send({
            success:false,
            message:error.message
        })
    }
})
module.exports=router;