
const admincheck=(req,res,next)=>{
    
    
    if(req.Role=="Admin")
    {
        next();
    }
    else{
        res.status(500).send("Unautherised Access")
    }
    
}
export {admincheck}