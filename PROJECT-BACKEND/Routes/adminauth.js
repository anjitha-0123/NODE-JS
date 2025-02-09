import {Router} from 'express';

import { sample3 } from '../Model/addinspiration.js';
import { authenticate } from '../Middleware/authenticate.js';
import {admincheck} from '../Middleware/admincheck.js';
import {upload} from '../Middleware/upload.js'


const adminauth=Router();


const convertToBase64 = (buffer) => {
    return buffer.toString("base64");
};


 adminauth.post('/addinspiration',authenticate,admincheck,upload.single("InspImage"),async(req,res)=>{
    try{
        const {Title,Description}= req.body;
        console.log(Title);
        const existingInspiration=await sample3.findOne({title:Title})
        if(existingInspiration)
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
            const newInspiration=new sample3({
                      title:Title,
                      description:Description,
                      image:imageBase64
        });
        await newInspiration.save();

        const Details=await sample3.findOne({title:Title})
        console.log(Details);
        res.status(200).json({id:Details._id})

        // res.status(201).send("Inspiration added")
        console.log("Inspiration added");
        }
        

        }  
    
    catch(error)
    {   
        console.log(error);
        res.status(500).send("Internal Server Error")
    }

 });

 adminauth.get('/getInspiration',authenticate,async(req,res)=>{
    
    
    const name=req.query.Inspiration;
    console.log(name);
    
    const Details=await sample3.findOne({title:name})
    console.log(Details);
    try{
        if(Details){
            res.status(200).json({data:Details});
        }
        else
        {
            res.status(404).json({msg:'No such Inspiration'})
        }
    
    }
    catch(error)
    {   
        console.log(error);
        
        res.status(500).send("Internal Server Error")
    }
   
});



adminauth.patch('/updateinspiration', authenticate,admincheck,upload.single("InspImage"),async (req, res) => {
    try{

        const {Title,Description } =req.body;
        const result = await sample3.findOne({title:Title})
        console.log(result);
        

        if (!result) {
            return res.status(400).send("Post not found");
        }
        else{
        let imageBase64 = null;
        if (req.file) {
            imageBase64 = convertToBase64(req.file.buffer);
        }
        
        // Updating fields
        result.title = Title;
        result.description = Description;
        result.image = imageBase64;

        // If Logs need to be appended to an array
        // if (Logs) {
        //     result.logs = result.logs || [];
        //     result.logs.push(Logs);
        // }

        await result.save();
        console.log("Post updated");
        res.status(200).send("Post updated");
    }
    } catch (error) {
        console.error("Error updating log:", error);
        res.status(500).send("Internal Server Error");
    }
});

adminauth.delete('/deleteinspiration',authenticate,admincheck,async(req,res)=>{
    const name=req.body.Title;
    console.log(name);

    const Detail=await sample3.findOne({title:name})
    console.log(Detail);
     try
     {
       if(Detail)
        {
            await sample3.findOneAndDelete(Detail)
        res.status(200).send("Post Removed")
       }
       else
       {
        res.status(404).json({msg:'No such Post'})
       }

     }
     catch
     {
        res.status(500).send("Internal Server Error")
     }
});

adminauth.get('/Logout',(req,res)=>{
    res.clearCookie('authTok');
    res.status(200).json({msg:"Successfully Logged Out"})
})


export {adminauth}