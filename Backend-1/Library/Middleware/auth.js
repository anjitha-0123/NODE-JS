import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

//authenticate is a middleware function
const authenticate=(req,res,next)=>{
    const cookie=req.headers.cookie;
    console.log(cookie);
    const cookies=cookie.split(';');
    let count=0;
    for(let cooki of cookies){
        const [name,token]=cooki.trim().split('=');
        console.log(name);
        console.log(token);
        if(name=='Token'){
           const verified= jwt.verify(token,process.env.SECRET_KEY);
           console.log(verified);
           //after verification these varified data have to used in another function so using req  stored in another names
           req.UserName=verified.UserName;
           req.role=verified.UserRole;
           count=1;
           next ();
           break;
    }
     //after authentication it will go into addCourse
    }
    if(count==0)
        {
        res.status(401).send("Unautherised Access")
       }
}
export{authenticate}
