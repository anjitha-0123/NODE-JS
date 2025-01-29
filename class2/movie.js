const readline=require("readline");

const rl=readline.createInterface({
    input :process.stdin,
    output: process.stdout
})

let movies=[];
let priority=[];

function Showmenu(){
    console.log(`===Movie Playlist Manager
        1.Add Movie
        2.View Movie
        3.Exit`)

      rl.question(`Choose an option (1-3) :`,handleoption)  
}
 function handleoption(option){
    switch(option){
        case '1':
            addmovie();
            break;
        case '2':
            viewmovie();
            break;
        case '3':
            rl.close();
            break;
        default :
        console.log(`Enter a valid option`);
        Showmenu();
        break;
    }
}

function addmovie()
{
  rl.question(`Enter a movie name`,(moviename)=>{
       rl.question(`Enter a priority (1 for low ,2 for medium  and 3 for high)`,(moviepriority)=>{
           if(moviename.trim()==="" || (moviepriority!=1 && moviepriority!=2 && moviepriority!=3))
           {
             console.log(`Enter a valid input`)
           }
           else
           {
            movies.push(moviename.trim());
            priority.push(moviepriority);
            console.log(`Movie Added :`,moviename);
           }
           Showmenu();
       })  
  }) ;
}

function viewmovie(){
     let list=movies.length?movies.join(","):"Invalid";
     console.log(`Movie list is :`,list);
     Showmenu();
     
}
 
  


Showmenu();
