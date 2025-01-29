const admincheck=(req,res,next)=>{
    if(req.role=='Admin'){
        next();
    }
    else
    {
        res.status(404).send("Not found")
    }
}
export {admincheck}