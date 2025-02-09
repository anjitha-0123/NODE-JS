import {Router} from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sample } from '../Model/signup.js';
import { sample1 } from '../Model/addlog.js';
import { sample2 } from '../Model/addprofile.js';
import {upload} from '../Middleware/upload.js';
import { authenticate } from '../Middleware/authenticate.js';
import {sample4} from '../Model/addComment.js'
import { sample3 } from '../Model/addinspiration.js';
import { usercheck } from '../Middleware/usercheck.js';


 const userauth=Router();

 const convertToBase64 = (buffer) => {
    return buffer.toString("base64");
};
 

 userauth.post('/signup',async(req,res)=>{
    try{
        const {Username,PhoneNumber,Email,password,userrole}=req.body;
        console.log(Username);

        const existingUser=await sample.findOne({username:Username});
        if(existingUser){
            res.status(400).send("Username Already Exist")
            console.log("Username Alredy EXist");
            
        }  
        else{
            
                const newPassword=await bcrypt.hash(password,10)
                console.log(newPassword);
                
                const newUser=new sample({
                    username:Username,
                    phonenumber:PhoneNumber,
                    email:Email,
                    password:newPassword,
                    userrole:userrole
                });
                await newUser.save();
                res.status(201).send('SignedUp Successfully') 
                console.log("signed Up")
        }
    }
    catch{
        
        res.status(500).send("Internal Server Error")
    }
 });

 userauth.post('/login',async(req,res)=>{
    try{
        const{Username,password}=req.body;
        const result=await sample.findOne({username:Username})
        console.log(result);
        if(!result){
            res.status(200).send("Enter Valid Username");
        }
        else{
            const valid=await bcrypt.compare(password,result.password);
            console.log(result.password);
            console.log(valid);
            if(valid){
                const token=jwt.sign({UserName:result.username,userrole:result.userrole},process.env.SECRET_KEY,{expiresIn:'1h'});
                console.log(token);
                res.cookie('TokeAu',token,{
                    httpOnly:true
                });
                res.status(201).json({message:"Loggedin Successfully"})
            }
            else{
                res.status(401).send("Unautherised Access")
            }
        }
    }
    catch(error)
    {
        console.log(error);
        
        res.status(500).send("Internal Server Error")
    }

 });

 userauth.post('/addLog',authenticate,usercheck,upload.single("LogImage"),async(req,res)=>{   
    try{
        const {Logs,Title,Description,Targetdate}= req.body;
        console.log(Title);
        const existingLog=await sample1.findOne({title:Title})
        if(existingLog)
            {
            res.status(400).send("Bad request");
            }
        else
        {   
            let imageBase64 = null;
        if (req.file) {
            // Convert the image buffer to Base64 string
            imageBase64 = convertToBase64(req.file.buffer);
        }
            
            const newLog=new sample1({
                      logs:Logs,
                      title:Title,
                      description:Description,
                      targetdate:Targetdate,
                      image:imageBase64
        });
        await newLog.save();

        res.status(201).send("Log added")
        console.log("Log added");

        }

        }  
    
    catch
    {
        res.status(500).send("Internal Server Error")

    }
});

userauth.get('/getLog',authenticate,usercheck,async(req,res)=>{
    
    
    const name=req.query.Title;
    console.log(name);
    
    const Details=await sample1.findOne({title:name})
    console.log(Details);
    try{
        if(Details){
            res.status(200).json({data:Details});
        }
        else
        {
            res.status(404).json({msg:'No such Log'})
        }
    
    }
    catch{
        res.status(500).send("Internal Server Error")
    }
   
});
// userauth.put('/updateLog',async(req,res)=>{
//     try{
//             const {Status,Logs,Title,Description,Targetdate}= req.body;
//             const result=await sample1.findOne({title:Title})
//             console.log(result);
            
//             if(result){
//                 const imagePath=req.file?req.file.path:"";
//                 result.status=Status;
//                 result.targetdate=Targetdate;
//                 result.image=imagePath;


//                 await result.save();
//             res.status(201).send("Log updated")
//             console.log("Log updated");
//         }
//         else{
//                 res.status(400).send("Bad request");
                
//         }
//     }
//     catch{
//         res.status(500).send("Internal Server Error")
//     }
// })
 
userauth.put('/updateLog', authenticate,usercheck,upload.single("LogImage"),async (req, res) => {
    try {
        const { Status, Logs, Title, Description, Targetdate } = req.body;
        const result = await sample1.findOne({ title: Title });
        console.log(result);
        

        if (!result) {
            return res.status(400).send("Log not found");
        }
        let imageBase64 = null;
        if (req.file) {
            // Convert the image buffer to Base64 string
            imageBase64 = convertToBase64(req.file.buffer);
        }
        
        // Updating fields
        result.status = Status;
        result.targetdate = Targetdate;
        result.image = imageBase64;

        // If Logs need to be appended to an array
        // if (Logs) {
        //     result.logs = result.logs || [];
        //     result.logs.push(Logs);
        // }

        await result.save();
        console.log("Log updated");
        res.status(200).send("Log updated");
    } catch (error) {
        console.error("Error updating log:", error);
        res.status(500).send("Internal Server Error");
    }
});

userauth.delete('/deleteLog',authenticate,usercheck,async(req,res)=>{
    const name=req.body.Title;
    console.log(name);

    const Detail=await sample1.findOne({title:name})
    console.log(Detail);
     try
     {
       if(Detail)
        {
            await sample1.findOneAndDelete(Detail)
        res.status(200).send("Log Removed")
       }
       else
       {
        res.status(404).json({msg:'No such Log'})
       }

     }
     catch
     {
        res.status(500).send("Internal Server Error")
     }
});

userauth.post('/addProfile',authenticate,usercheck,upload.single("ProfileImage"),async(req,res)=>{   
    try{
        const {UserName,Email,Bio}= req.body;
        console.log(UserName);
        const existingProfile=await sample2.findOne({username:UserName})
        if(existingProfile)
            {
            res.status(400).send("Bad request");
            }
        else
        {   
            let imageBase64 = null;
        if (req.file) {
            // Convert the image buffer to Base64 string
            imageBase64 = convertToBase64(req.file.buffer);
        }
            
            const newProfile=new sample2({
                      username:UserName,
                      email:Email,
                      bio:Bio,
                      image:imageBase64
        });
        await newProfile.save();

        res.status(201).send("Profile added")
        console.log("Profile added");

        }

        }  
    
    catch
    {
        res.status(500).send("Internal Server Error")

    }
});

userauth.get('/getProfile',authenticate,usercheck,async(req,res)=>{
    const name=req.query.UserName;
    console.log(name);
    
    const Details=await sample2.findOne({username:name})
    console.log(Details);
    try{
        if(Details){
            res.status(200).json({data:Details});
        }
        else
        {
            res.status(404).json({msg:'No such Profile'})
        }
    
    }
    catch{
        res.status(500).send("Internal Server Error")
    }
   
});

userauth.put('/updateProfile', authenticate,usercheck,upload.single("ProfileImage"),async (req, res) => {
    try {
        const { UserName,Email,Bio } = req.body;
        const result = await sample2.findOne({username:UserName})
        console.log(result);

        let imageBase64 = null;
        if (req.file) {
           
            imageBase64 = convertToBase64(req.file.buffer);
        }
        
        // Updating fields
        result.username = UserName;
        result.email = Email;
        result.bio = Bio;
        result.image=imageBase64

        // If Logs need to be appended to an array
        // if (Logs) {
        //     result.logs = result.logs || [];
        //     result.logs.push(Logs);
        // }

        await result.save();
        console.log("Profile updated");
        res.status(200).send("Profile updated");
    } catch (error) {
        console.error("Error updating log:", error);
        res.status(500).send("Internal Server Error");
    }
});


userauth.post('/addComment',authenticate,usercheck,async(req,res)=>{

    try{
        const User=await sample.findOne({username:req.UserName})
        console.log(User);
        
        
        
        const Post=await sample3.findOne({_id:req.body.Title_id})
       
        console.log(Post._id);
        const {content}= req.body;
        
            
            const newComment=new sample4({
                      content:content,
                      user:User._id,
                      post:Post._id
                     
        });
        await newComment.save();

        res.status(201).send("Comment posted")
        console.log("Comment posted");
        }  
    
    catch(error)
    {
        console.log(error);
        
        res.status(500).send("Internal Server Error")

    }
});

userauth.get('/ViewInspiration',authenticate,usercheck,async(req,res)=>{
    const name=req.query.Inspiration;
    console.log(name);
    
    const Details=await sample4.find()
    console.log(Details);
    try{
        if(Details){
            res.status(200).json({data:Details});
        }
        else
        {
            res.status(404).json({msg:'No such Profile'})
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


 export {userauth}