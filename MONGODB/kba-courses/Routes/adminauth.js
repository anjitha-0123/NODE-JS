import { Router } from "express";

import { sample1 } from "../Model/addcourse.js";
import { authenticate } from "../Middleware/auth.js";
import { admincheck } from "../Middleware/admincheck.js";
import upload from "../Middleware/upload.js"; //import multer configuration

const adminauth=Router();

adminauth.post('/addCourse',authenticate,admincheck,upload.single("courseImage"),async(req,res)=>{   
    try{
        const {CourseName,CourseId,CourseType,Description,Price}= req.body;
        console.log(CourseName);
        const existingCourse=await sample1.findOne({coursename:CourseName})
        
        if(existingCourse)
            {
            res.status(400).send("Bad request");
            }
        else
        {   
            const imagePath=req.file?req.file.path:"";
            
            const newCourse=new sample1({
                      coursename:CourseName,
                      courseid:CourseId,
                      coursetype:CourseType,
                      description:Description,
                      price:Number(Price),
                      image:imagePath
        });
        await newCourse.save();

        res.status(201).send("course added")
        console.log("course added");

        }

        }  
    
    catch
    {
        res.status(500).send("Internal Server Error")

    }
});


adminauth.get('/getCourse',async(req,res)=>{
    
    
    const name=req.query.courseName;
    console.log(name);
    
    const Details=await sample1.findOne({coursename:name})
    console.log(Details);
    try{
        if(Details){
            res.status(200).json({data:Details});
        }
        else
        {
            res.status(404).json({msg:'No such Course'})
        }
    
    }
    catch{
        res.status(500).send("Internal Server Error")
    }
   
})
//  PUT METHOD TO UPDATE
adminauth.put('/updateCourse',authenticate,admincheck,async(req,res)=>{
    try{
            const {CourseName,CourseId,CourseType,Description,Price}= req.body;
            const result=await sample1.findOne({coursename:CourseName})
            console.log(result);
            
            if(result){
            
                result.courseid=CourseId;
                result.coursetype=CourseType;
                result.description=Description;
                result.price=Price;

                await result.save();
            res.status(201).send("course updated")
            console.log("course updated");
        }
        else{
                res.status(400).send("Bad request");
                
        }
    }
    catch{
        res.status(500).send("Internal Server Error")
    }
})

//PATCH METHOD TO UPDATE
adminauth.patch('/editCourse',authenticate,admincheck,async(req,res)=>{
    try{
        
            const {CourseName,CourseType,Price}=req.body;
            console.log(CourseType,Price);
        
            const result=await sample1.findOne({coursename:CourseName});
            console.log(result);
            if(result){
                result.coursetype=CourseType;
                result.price=Price;

                await result.save();
                res.status(201).send("course successfuly edited")
                console.log("course successfuly edited");
                }
                else{
                    res.status(404).send("Course Not Found")
                }
        }
        catch{
            res.status(500).send("Internal Server Error")
        }
});

adminauth.delete('/deleteCourse',authenticate,admincheck,async(req,res)=>{
    const Name=req.body.CourseName;
    console.log(Name);

    const Detail=await sample1.findOne({coursename:Name});
    console.log(Detail);
     try
     {
       if(Detail)
        {
            await sample1.findOneAndDelete(Detail)
        res.status(200).send("Course Removed")
       }
       else
       {
        res.status(404).json({msg:'No such Course'})
       }

     }
     catch
     {
        res.status(500).send("Internal Server Error")
     }
});


export {adminauth}