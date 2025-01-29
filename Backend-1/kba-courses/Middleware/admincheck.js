
const admincheck=(req,res,next)=>{
    
    
    if(req.role=="Admin")
    {
        next();
    }
    else{
        res.status(500).send("Unautherised Access")
    }
    
}
export {admincheck}