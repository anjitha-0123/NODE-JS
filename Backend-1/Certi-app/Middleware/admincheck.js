// const admincheck=(req,res,next)=>{
//     if(req.Userrole=='Admin')
//         {
//            next();
//         }
//     else
//     {
//         res.status(403).send("You are not allowed to do this");
//     }
// }
// export {admincheck}
const admincheck = (req, res, next) => {
    if (!req.Userrole) {
      return res.status(401).json({ error: "Unauthorized: No user role found" });
    }
  
    if (req.Userrole !== "Admin") {
      return res.status(403).json({ error: "Forbidden: You are not allowed to perform this action" });
    }
  
    next();
  };
  
  export { admincheck };
  