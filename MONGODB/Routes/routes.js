import Router from 'express';
import {sample} from '../Model/sample.js'
const router=Router();
router.post('/create',async(req,res)=>{
    try{
        const data=req.body;
        const result=await sample.create(data)
        res.status(201).json(result);
    }
    catch(error){
        console.log(error);
        res.status(500).json();
    }

});
export {router}