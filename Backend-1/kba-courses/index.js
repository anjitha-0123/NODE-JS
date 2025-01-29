import express,{json} from "express"; //here the express already exported with default so we can import with any name otherthan express
import dotenv from "dotenv"; //importing dotenv
import { userauth } from "./Routes/userauth.js";
import { adminauth } from "./Routes/adminauth.js";
import { adminsignup } from "./Routes/adminsignup.js";


const app=express(); //we can choose any name instead of app becuz here in a variable named app we stored the express function .u can use name app insted of express in code
//app.listen(8000,function(){                  // there are predefined ports, some ports we can't use refer it -,listen is the function used to the lisnting to the  app by using the port 8000(listning at the port 8000). ,-to handle the error in case ,we use anounymus function 
   //console.log("Server is listening to 8000")
//});



dotenv.config(); //configuring dotenv




// app.use(bycrypt())
app.listen(process.env.PORT,function(){
   console.log(`Server is listening at ${process.env.PORT}`)
});

app.use(json())

app.use("/",userauth) //for using the userauth in index.js we have to use app.use
app.use("/",adminauth);
app.use("/admin",adminsignup);


app.get('/',function(req,res){
   res.send("Heloo EveryOne")
});

app.post('/',function(req,res){   
   res.send("Heloo EveryOne")
});


