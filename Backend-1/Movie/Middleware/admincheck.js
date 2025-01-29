const admincheck=(req,res,next)=>{
    if(req.Userrole=='Admin')
        {
           next();
        }
    else
    {
        res.status(403).send("You are not allowed to do this");
    }
}
export {admincheck}