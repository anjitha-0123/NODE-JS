import {Router} from "express";
import { authenticate } from "../Middleware/auth.js";
import { admincheck } from "../Middleware/admincheck.js";

const adminauth=Router();
const Book=new Map();

// adminauth.post('/issuebook',authenticate,admincheck,(req,res)=>{
//     try
//     {
//         const {BookName,BookId,Username,Phonenumber,Quantity,Issuedate}=req.body;
//         if(course.get(BookName))
//         {
//          res.status(400).send("Bad request");
//         }
//         else
//         {
//           course.set(BookName,{BookId,Username,Phonenumber,Quantity,Issuedate});
//           res.status(201).send("Book Issued")
//           console.log(course.get(BookName));
//         }
//     }
//     catch
//     {
//         res.status(500).send("Internal Server Error")
//     }
// })

adminauth.post('/addBook',authenticate,admincheck,(req,res)=>{
    try
    {
        const {Bookname,Author,Genre,Publishdate,Noofcopy}=req.body;
        if(Book.get(Bookname))
        {
            res.status(400).send("Bad Request")
        }
        else
        {
            Book.set(Bookname,{Author,Genre,Publishdate,Noofcopy});
            res.status(201).send("book added")
            console.log(Book.get(Bookname));
        }

    }
    catch
    {
        res.status(500).send("Internal Server Error")

    }
});

adminauth.get('/viewbook',(req,res)=>{
    const name=req.query.Bookname;
    console.log(name);
    const Details=Book.get(name);
    console.log(Details);
    try{
        if(Details){
            res.status(200).json({data:Details});
        }
        else
        {
            res.status(404).json({msg:'No such Book'})
        }
    
    }
    catch{
        res.status(500).send("Internal Server Error")
    }

});

adminauth.patch('/Updatebook',authenticate,admincheck,(req,res)=>{
    try
    {
        const {Bookname,Noofcopy}=req.body;
        console.log(Noofcopy);
        const result=Book.get(Bookname);
        console.log(result);
        if(result){
            Book.set(Bookname,{Author:result.Author,Genre:result.Genre,Publishdate:result.Publishdate,Noofcopy})
            res.status(201).send("Book successfuly updated")
            console.log(Book.get(Bookname));
            }
            else{
                res.status(404).send("Book Not Found")
            }
    }
    catch{
        res.status(500).send("Internal Server Error")
    }
});

adminauth.delete('/Deletebook',authenticate,admincheck,(req,res)=>{
    const Name=req.body.Bookname;
    console.log(Name);

    const Detail=Book.get(Name);
    console.log(Detail);
     try
     {
       if(Detail)
        {
        res.status(200).send("Book Removed")
       }
       else
       {
        res.status(404).json({msg:'No such Book'})
       }

     }
     catch
     {
        res.status(500).send("Internal Server Error")
     }
});

export {adminauth}