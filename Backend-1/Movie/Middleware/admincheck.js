const admincheck=(req,res,next)=>{
    if(req.Userrole=='Admin')
        {
            console.log("hi")
           next();
        }
    else
    {    
        console.log("helo")
        res.status(403).send("You are not allowed to do this");
    }
}
export {admincheck}