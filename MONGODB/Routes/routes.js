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
router.get('/read',async(req,res)=>{
    try
    {
    const result=await sample.findById('67a1cd6a42aeacbf2434863d');//findById()
    res.status(200).send(result);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json();
    }
})
export {router}