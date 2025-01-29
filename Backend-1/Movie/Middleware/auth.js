import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

const authenticate=(req,res,next)=>{
    const cookie=req.headers.cookie;
    console.log(cookie);
    const cookies=cookie.split(';');
    let count=0;
    for(let cookie of cookies)
        {
        const[name,token]=cookie.trim().split('=');
        console.log(name);
        console.log(token);
        if(name=='auToken'){
            const verified=jwt.verify(token,process.env.SECRET_KEY);
            console.log(verified);
            req.Username=verified.UserName;
            req.Userrole=verified.UserRole;
            count=1;
            next();
            break;
        }
    }
    
   if(count==0){
        res.status(401).send('Unautherised Access')
    }

}
export {authenticate}