import {Router} from 'express';
import { authenticate } from '../Middleware/auth.js';
import { admincheck } from '../Middleware/admincheck.js';


const adminauth=Router();
const screen=new Map();
const movie=new Map();

adminauth.post('/Addscreen',authenticate,admincheck,(req,res)=>{
    try
    {
        const {Theater,Screennumber,NumberofSeats,Price}=req.body;
        if(screen.get(Theater))
        {
            res.status(400).send("Bad Request");
        }
        else
        {
         screen.set(Theater,{Screennumber,NumberofSeats,Price});
         res.status(201).send("Screen Added");
         console.log(screen.get(Theater));
        }
    }
    catch
    {
      res.status(500).send("Internal Server Error")
    }
});

adminauth.post('/Addmovie',authenticate,admincheck,(req,res)=>{
try
{
 const {Theater,Moviename,Numberofshows,Language,Startdate,Enddate}=req.body;
 if(movie.get(Theater))
    {
        res.status(400).send("Bad Request");
    }
    else
    {
        movie.set(Theater,{Moviename,Numberofshows,Language,Startdate,Enddate});
        res.status(201).send("Movie Added");
         console.log(movie.get(Theater));
    }

}
catch
{
    res.status(500).send("Internal Server Error")
}
});

adminauth.put('/updatescreen',authenticate,admincheck,(req,res)=>{
    try
    {
     const {Theater,Screennumber,NumberofSeats,Price}=req.body;
     if(screen.get(Theater)){
         screen.set(Theater,{Screennumber,NumberofSeats,Price});
         res.status(201).send("Screen Updated");
         console.log(screen.get(Theater));
     }
     else{
         res.status(404).send("Screen Not Found")
     }
 }
 catch{
     res.status(500).send("Internal Server Error")
 }
 });

 adminauth.put('/updatemovie',authenticate,admincheck,(req,res)=>{
    try
    {
        const {Theater,Moviename,Numberofshows,Language,Startdate,Enddate}=req.body;
        if(movie.get(Theater)){
            movie.set(Theater,{Moviename,Numberofshows,Language,Startdate,Enddate});
            res.status(201).send("Movie Updated");
            console.log(movie.get(Theater));
        }
        else
        {
            res.status(404).send("Screen Not Found")
        }
    }
    catch
    {
        res.status(500).send("Internal Server Error")
    }
 })


export {adminauth}