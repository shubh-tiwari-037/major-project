const express =require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate= require("ejs-mate");
const ExpressError= require("./utils/ExpressError.js");
// const {listingSchema,reviewSchema}=require("./schema.js");


const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended :true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

// app.use("/listings",listings);
// app.use("/listing/:id/reviews",reviews);

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}


app.get("/",(req,res)=>{
res.send("hi i am root ")
});


app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);

// const validateListing= (req,res,next)=>{
//     let {error} =listingSchema.validate(req.body);
//     if(error){
//         let errMsg=error.detailes.map((el)=>el.message).join(",");
//         throw new ExpressError(404,errMsg);
//     }else{
//         next();
//     }
// };



// app.get("/testListing",async (req,res)=>{
//     let sampleListing= new Listing({
//         title: "my new vila",
//         description :"by the beach",
//         price:1200,
//         location :"colanture Goa",
//         country:"india",
//     });
//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("succcessful testing");
// });

app.all("*",(req,res,next)=> {
    next(new ExpressError(404,"page not found"));
});

app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong"} =err;
    res.status(statusCode).render("error.ejs",{err});
//   res.status(statusCode).send(message);
});

app.listen(8080,()=>{
    console.log("server is listening on port 8080");
});