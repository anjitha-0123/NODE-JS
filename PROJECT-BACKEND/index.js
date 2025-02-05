import express,{json} from 'express';
import dotenv from 'dotenv';
import { userauth } from './Routes/userauth.js';
dotenv.config();
const app=express();
app.use(json())
app.use('/',userauth)

app.listen(process.env.PORT,function(){
    console.log(`Server is listening at ${process.env.PORT}`);
    
})
