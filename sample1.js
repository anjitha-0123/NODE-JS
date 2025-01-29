let lod=require("lodash") //lodash is an package
const add1=require('./addition.js') // function require in anaother variable

console.log("hello world");
let a="Node JS";
console.log("Hello",`${a}`)
if(a==="Node JS")      //if
{
    console.log("JS running on Node JS Environment")
}
for(i=0;i<5;i++){            //for loop
    b=i+1;
    console.log(b);
}
c=["a","b",2,8]       //array decleration
console.log(c)
console.log(c[1])
let array=[11,22,33,44,55];
console.log(lod.reverse(array))  //to reverse the array
console.log(lod.capitalize("hello world")) //capitalize first letter
console.log(lod.upperCase("hello world")) //capitalize all letters
console.log(add1.add(5,6)); //addition operation

