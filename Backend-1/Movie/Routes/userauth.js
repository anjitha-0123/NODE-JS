import { Router } from "express";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
  
dotenv.config();



const userauth=Router();
const user=new Map();

userauth.post('/signup',async(req,res)=>{
    try{
        const {FirstName,LastName,UserName,Password,UserRole}=req.body;
        if(user.get(UserName)){
            res.status(400).send("Username Already Exist")
        }
        else{
           const newPassword=await bcrypt.hash(Password,10);
           user.set(UserName,{FirstName,LastName,newPassword,UserRole}) ;
           res.status(201).send("Signup Succeesfully")
        }
    }
    catch{
        res.status(500).send("Internal Server Error")
    }

})

userauth.post('/login',async(req,res)=>{
    try{
        const{UserName,Password}=req.body;
        
        const result=user.get(UserName);
        console.log(result);
        if(!result){
            res.status(404).send("Enter Valid Username");
        }
        else{
            
            console.log(Password);
            console.log(result.newPassword);
            
            const valid=await bcrypt.compare(Password,result.newPassword);
            console.log(valid);
            if(valid){
                const token=jwt.sign({Username:UserName,UserRole:result.UserRole},process.env.SECRET_KEY,{expiresIn:'1h'});
                console.log(token);

                res.cookie('auToken',token,{
                    httpOnly:true
                });
                res.status(200).json({message:"Loggedin Successfully"})
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

export {userauth}