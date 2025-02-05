import { Router } from "express";  //function named Router imported from express
import { sample } from "../Model/signup.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';



const userauth=Router(); //created instance of Router in variable named userauth


userauth.post('/signup',async(req,res)=>{
   try{
         const {FirstName,LastName,UserName,Password,Role}=req.body;
         console.log(UserName);
         
         const existingUser=await sample.findOne({username:UserName})
        if(existingUser){
            res.status(400).send("UserName Alredy Exist")    //sending the response back to the client by using res and send is a method
            console.log("Username Alredy EXist");
        }
        else{
             // if we only want to set this after checking the username
            const newPassword= await bcrypt.hash(Password,10);
            console.log(newPassword);
            
            //user.set(UserName,{FirstName,LastName,Password:newPassword,Role});
            const newUser=new sample({
                firstname:FirstName,
                lastname:LastName,
                username:UserName,
                password:newPassword,
                userrole:Role

            });
            await newUser.save();
            res.status(201).send("Signup Successfull")
            console.log("signed Up")
 }
}
catch{
    res.status(500).send("Internal Server Error")
    
}

})


userauth.post('/login',async (req,res)=>{
        try{
         
            const {UserName,Password}=req.body;
            
            const result=await sample.findOne({username:UserName})
            if(!result){
                res.status(200).send("Enter a valid UserName")
            }
            else{

                //password is comparing
                console.log(result.password);
                const valid= await bcrypt.compare(Password,result.password);
                console.log(valid);
                //setting a token
                if(valid){
                   const token= jwt.sign({UserName:UserName,Role:result.userrole},process.env.SECRET_KEY,{expiresIn:'1h'}) //to create token sign function used  here the payload contain the data with some uniqe keys and is this the same secret key 
                   console.log(token);
                   //setting the cookie
                   res.cookie('authTo',token,
                    {
                    httpOnly:true //Flags the cookie to be accessible only by the web server.
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

userauth.get('/Logout',(req,res)=>{
    res.clearCookie('authTok');
    res.status(200).json({msg:"Successfully Logged Out"})
})




export {userauth} //to use this router named userauth in index.js we have to export it