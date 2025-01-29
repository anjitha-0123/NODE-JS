import {Router} from 'express';
const adminsignup=Router();

adminsignup.post('/signup',(req,res)=>{
    console.log(" Admin Signup")
})

export {adminsignup}