const express =require("express");
const router= express.Router();


// index users
router.get("/",(req,res)=>{
    res.send("Get for users");
});

// show users
router.get("/:id",(req,res)=>{
    res.send("Show for user id");
});

// post users
router.post("/",(req,res)=>{
    res.send("Post for users id");
});

// Delete users
router.delete("/:id",(req,res)=>{
    res.send("Delete for user id");
});

module.exports=router;
