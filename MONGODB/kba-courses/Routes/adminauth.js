import { Router } from "express";

import { sample1 } from "../Model/addcourse.js";
import { authenticate } from "../Middleware/auth.js";
import { admincheck } from "../Middleware/admincheck.js";

const adminauth=Router();

adminauth.post('/addCourse',authenticate,admincheck,async(req,res)=>{   
    try{
        const {CourseName,CourseId,CourseType,Description,Price}= req.body;
        console.log(CourseName);
        const existingCourse=await sample1.findOne({coursename:CourseName})
        
        if(existingCourse)
            {
            res.status(400).send("Bad request");
            }
        else
        {       const newCourse=new sample1({
                      coursename:CourseName,
                      courseid:CourseId,
                      coursetype:CourseType,
                      description:Description,
                      price:Price
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
    
    const Details=await sample1.find()
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
//  //PUT METHOD TO UPDATE
// // adminauth.put('/updateCourse',authenticate,(req,res)=>{
// //     try{
// //         if(req.role=='Admin'){
// //             const {CourseName,CourseId,CourseType,Description,Price}= req.body;
// //             if(course.get(CourseName)){
// //             course.set(CourseName,{CourseId,CourseType,Description,Price});
// //             res.status(201).send("course updated")
// //             console.log(course.get(CourseName));
// //             }
// //             else{
// //                 res.status(404).send("Not Found")
// //             }
            
// //         }
// //         else{
// //                 res.status(400).send("Bad request");
                
// //         }
// //     }
// //     catch{
// //         res.status(500).send("Internal Server Error")
// //     }
// // })

// //PATCH METHOD TO UPDATE
// adminauth.patch('/editCourse',authenticate,admincheck,(req,res)=>{
//     try{
        
//             const {CourseName,CourseType,Price}=req.body;
//             console.log(CourseType,Price);
//             const result=course.get(CourseName);
//             console.log(result);
//             if(result){
//                 course.set(CourseName,{CourseId:result.CourseId,CourseType,Description:result.Description,Price})
//                 res.status(201).send("course successfuly updated")
//                 console.log(course.get(CourseName));
//                 }
//                 else{
//                     res.status(404).send("Course Not Found")
//                 }
//         }
//         catch{
//             res.status(500).send("Internal Server Error")
//         }
// });

// adminauth.delete('/deleteCourse',authenticate,admincheck,(req,res)=>{
//     const Name=req.body.CourseName;
//     console.log(Name);

//     const Detail=course.get(Name);
//     console.log(Detail);
//      try
//      {
//        if(Detail)
//         {
//         res.status(200).send("Course Removed")
//        }
//        else
//        {
//         res.status(404).json({msg:'No such Course'})
//        }

//      }
//      catch
//      {
//         res.status(500).send("Internal Server Error")
//      }
// });


export {adminauth}