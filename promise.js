/*const getData=()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            const num=3+2;
            if(num==6){
                resolve(num)
            }
            else{
                reject("not equal");
            }
        },20)
    })
}
async function start() {
    const result=await getData();
    console.log(result)
    
}start();*/

const fetchData=()=>{
    return new Promise((resolve,reject)=>{
        //  setTimeout(()=>{
        //      const add = 3+3;
        //      if(add==5){
        //          resolve(add);
        //      }
        //      else{
        //          reject("The output is not correct");
        //      }
        //  },2000)
         const add = 3+3;
             if(add==5){
                 resolve(add);
             }
             else{
                 reject("The output is not correct");
             }
 
     })
 }
  function printK(){
 const k =  fetchData();
 console.log(k);
 }
 printK();