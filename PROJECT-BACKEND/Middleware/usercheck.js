const usercheck=(req,res,next)=>{
    if(req.userrole=="User")
    {
        next();
    }
    else{
        res.status(500).send("Unautherised Access")
    }  
}
export {usercheck}