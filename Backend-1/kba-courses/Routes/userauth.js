import { Router } from "express";  //function named Router imported from express
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';


const userauth=Router(); //created instance of Router in variable named userauth

const user=new Map();

userauth.get('/',async (req,res)=>{
    res.send("Heloo World");
});

userauth.post('/signup',async(req,res)=>{
    //const data=req.body;
    //console.log(data);
   // console.log(data.FirstName);
    
   // const {FirstName,LastName,UserName,Password,Role}=req.body; //destructring
   // const newPassword= await bcrypt.hash(Password,10)
   
   
    
   /* if(UserName==="anjitha01") 
    {   
       
        console.log("username is already Exist")
    }
    else{
         
         user.set(UserName,{FirstName,LastName,Password:newPassword,Role});
         console.log("It is",user.get(UserName))
         console.log("Details stored")
    }*/try{
         const {FirstName,LastName,UserName,Password,Role}=req.body;

        if(user.get(UserName)){
            res.status(400).send("UserName Alredy Exist")    //sending the response back to the client by using res and send is a method
        }
        else{
             // if we only want to set this after checking the username
            const newPassword= await bcrypt.hash(Password,10);
            user.set(UserName,{FirstName,LastName,Password:newPassword,Role});
            res.status(201).send("Signup Successfull")
    
   
 }
}
catch{
    res.status(500).send("Internal Server Error")
    
}

})


userauth.post('/login',async (req,res)=>{
        try{
         
            const {UserName,Password}=req.body;
            
            const result=user.get(UserName)
            if(!result){
                res.status(200).send("Enter a valid UserName")
            }
            else{

                //password is comparing
                console.log(result.Password);
                const valid= await bcrypt.compare(Password,result.Password);
                console.log(valid);
                //setting a token
                if(valid){
                   const token= jwt.sign({UserName:UserName,Role:result.Role},process.env.SECRET_KEY,{expiresIn:'1h'}) //to create token sign function used  here the payload contain the data with some uniqe keys and is this the same secret key 
                   console.log(token);
                   //setting the cookie
                   res.cookie('authTok',token,
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