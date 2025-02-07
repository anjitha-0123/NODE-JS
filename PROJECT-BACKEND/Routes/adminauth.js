import {Router} from 'express';

import { sample3 } from '../Model/addinspiration.js';
import { authenticate } from '../Middleware/authenticate.js';
import {admincheck} from '../Middleware/admincheck.js';
import {upload1} from '../Middleware/upload1.js'


const adminauth=Router();


const convertToBase64 = (buffer) => {
    return buffer.toString("base64");
};


 adminauth.post('/addinspiration',authenticate,admincheck,upload1.single("InspImage"),async(req,res)=>{
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




export {adminauth}