const express =require("express");
const app=express();
const users= require("./routes/user.js");
const posts= require("./routes/post.js");
const cookieParser=require("cookie-parser");

app.use(cookieParser("secretcode"));


app.get("/getsignedcookie",(req,res)=>{
    res.cookie("made-in","india",{signed: true});
    res.send(`signed cookies send`);
});

app.get("/verify",(req,res)=>{
    console.log(req.signedCookies);
    res.send("verified");
})

app.get("/getcookies",(req,res)=>{
    res.cookie("greet","namste");
    res.cookie("made-in","india");
    res.send("send you some cookies");
});

app.get("/greet",(req,res)=>{
    let {name="anonymous"}=req.cookies;
    res.send(`hi ${name}`);
});

app.get("/",(req,res)=>{
    console.dir(req.cookies);
    res.send("hi i am root");
});

app.use("/users" , users);
app.use("/posts" , posts);



app.listen(3000,()=>{
    console.log("server is listening to port 3000");
});