const bcrypt= require("bcryptjs");
let result;
password="sadsad"
 bcrypt.hash(password,12,(err,hash)=>
{
    console.log(hash);
});