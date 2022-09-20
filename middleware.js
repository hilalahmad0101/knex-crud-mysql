const jwt=require('jsonwebtoken')

const auth=async(req,res,next)=>{
    const token=req.headers.user_access_token;
    if(token){
        try{
            const {user_id}=jwt.verify(token,"hilalahmadkhanasafullstackdeveloper")
            req.users=user_id;
        }catch(e){
            return res.send({
                success: false,
                message:e.message
            })
        }
    }else{
        return res.send({
            success: false,
            message:'UnAuthorized'
        })
    }
    next();
}

module.exports=auth;