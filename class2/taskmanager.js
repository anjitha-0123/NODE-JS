const readline = require('readline');

const rl= readline.createInterface({
    input: process.stdin,
    output:process.stdout
});

const task_array=[];
 function ShowMenu(){
    console.log( ` ===Bucket List Manager===
        1.Add Bucketlist
        2.List Bucketlist
        3.Exit `);

 rl.question(`Choose an option(1,2 or 3):`,handleOption);
  

 }
 function handleOption(option){
    switch(option){
        case '1':
            rl.question(`Enter a bcuketlis to add`,(item)=>{
                if(item!=='')
                    {
                    task_array.push(item);
                    console.log(`Task added :${item}`)
                }
                else{
                    console.log("Enter a valid wish");
                }
                ShowMenu();
            });
            break;
            case '2':{
                const item_list=task_array.length?task_array.join(','):"No task specified";
                console.log(`wish : ${item_list}`)
                ShowMenu();
                break;
            }
            case '3':{
                console.log(`List Exit`);
                rl.close();
                break;
            } 
            default : console.log(`Enter valid Wish`)   
    }
 }
 ShowMenu();