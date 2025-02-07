import {Router} from 'express';
import bcrypt from 'bcrypt';
import { sample3 } from '../Model/adminsignup.js';
import jwt from 'jsonwebtoken';

// import { adminauthenticate } from '../Middleware/adminauthenticate.js';
// import {admincheck} from '../Middleware/admincheck.js';


const adminauth=Router();
adminauth.post('/adminsignup',async(req,res)=>{
  try
    {
       const {username,email,password}=req.body;
       console.log(username);
       
     
       const existingAdmin=await sample3.findOne({username:username});
       if(existingAdmin){
           res.status(400).send("Username Already Exist")
           console.log("Username Alredy EXist");
           
       }  
       else{
           
               const newPassword=await bcrypt.hash(password,10)
               console.log(newPassword);
               const newAdmin=new sample3({
                   username:username,
                   email:email,
                   password:newPassword
               });
               await newAdmin.save();
               res.status(201).send('SignedUp Successfully') 
               console.log("signed Up")
       }
   }
   catch{
       
       res.status(500).send("Internal Server Error")
   }
});

adminauth.post('/adminlogin',async(req,res)=>{
    try{
        const{username,password}=req.body;
        const result=await sample3.findOne({username:username})
        console.log(result);
        if(!result){
            res.status(200).send("Enter Valid Username");
        }
        else{
            const valid=await bcrypt.compare(password,result.password);
            console.log(result.password);
            console.log(valid);
            if(valid){
                const token=jwt.sign({username:username},process.env.SECRET_KEY1,{expiresIn:'1h'});
                console.log(token);
                res.cookie('AdminTok',token,{
                    httpOnly:true
                });
                res.status(201).json({message:"Loggedin Successfully"})
            }
            else{
                res.status(401).send("Unautherised Access")
            }
        }
    }
    catch{
        res.status(500).send("Internal Server Error")
    }

 });

 adminauth.post('/addinspiration',(req,res)=>{
    
 })


export {adminauth}