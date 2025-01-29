import { Router } from "express";
import { authenticate } from "../Middleware/auth1.js";
import { admincheck } from "../../kba-courses/Middleware/admincheck.js";



const adminauth=Router();

const admin=new Map();

adminauth.post('/issueCertificate',authenticate,admincheck,(req,res)=>{
    console.log(req.Username);
    console.log(req.Userrole);
   
        const {CourseName,CertificateId,CandidateName,Grade,Date}=req.body;
        const result=admin.get(CertificateId);
        console.log(result);
        if(result){
            res.status(400).send("Bad request");
        }
        else{ 
        admin.set(CertificateId,{CourseName,CandidateName,Grade,Date});
        console.log(admin.get(CertificateId));
        res.status(201).send("Certificate Issued");
       
        }
    
})

export {adminauth}