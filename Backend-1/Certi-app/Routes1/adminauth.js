import { Router } from "express";
import { authenticate } from "../Middleware/auth1.js";
import { admincheck } from "../../Certi-app/Middleware/admincheck.js";



const adminauth=Router();

const admin=new Map();

adminauth.post('/issueCertificate',authenticate,admincheck,(req,res)=>{
    try{
        const {CourseName,CertificateId,CandidateName,Grade,Date}=req.body;
        const result=admin.get(CertificateId);
        console.log(result);
        if(result){
            res.status(400).send("Bad Request");
        }
        else{
            admin.set(CertificateId,{CourseName,CandidateName,Grade,Date});
            console.log(admin.get(CertificateId));
            res.status(201).send("Certificate Issued")
            
        }
        
    }
    catch
    {
        res.status(500).send("Internal Server Error")
    }
});

adminauth.get('/viewCertificate',authenticate,(req,res)=>{
    const name=req.query.CertificateId;
    console.log(name);

    const Details=admin.get(name);
    try{
        if(Details){
            res.status(200).json({data:Details});
        }
        else
        {
            res.status(404).json({msg:'No such Certificate'})
        }
    
    }
    catch{
        res.status(500).send("Internal Server Error")
    }
   
});


export {adminauth}