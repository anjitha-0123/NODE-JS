import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userauth1=Router();
const user=new Map();

userauth1.post('/signup',async(req,res)=>{
    try{
        const {Name,Email,Password,UserRole}=req.body;
        if(user.get(Email)){
            res.status(400).send("Username Already Exist")
        }
        else{
           const newPassword=await bcrypt.hash(Password,10);
           user.set(Email,{Name,Password:newPassword,UserRole}) ;
           res.status(201).send("Signup Succeesfully")
        }
    }
    catch{
        res.status(500).send("Internal Server Error")
    }

})

userauth1.post('/login',async(req,res)=>{
    try{
        const{Email,Password}=req.body;
        const result=user.get(Email);
        if(!result){
            res.status(200).send("Username Invalid");
        }
        else{
            console.log(result.Password);
            const valid=await bcrypt.compare(Password,result.Password);
            console.log(valid);
            if(valid){
                console.log(Email);
                
                const token=jwt.sign({Email:Email,UserRole:result.UserRole},process.env.SECRET_KEY,{expiresIn:'1h'});
                console.log(token);

                res.cookie('TokenAuth',token,{
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

export {userauth1}