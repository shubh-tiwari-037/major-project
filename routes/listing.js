const express =require("express");
const router= express.Router();
const wrapAsync =require("../utils/wrapAsync.js");

const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");


   //index route
   router.get("/",wrapAsync(async (req,res)=>{
    const allListings= await Listing.find({});
    res.render("listings/index.ejs",{allListings});
   }));

   //new route
   router.get("/new",isLoggedIn,(req,res)=>{
    console.log(req.user);
//   if(!req.isAuthenticated()){
//     req.flash("error","you must have to logged in !");
//     return res.redirect("/login")
//   }

    res.render("listings/new.ejs");
   });

   //show route
   router.get("/:id",wrapAsync(async (req,res)=>{
    let {id}= req.params;
    const listing= await Listing.findById(id)
    .populate({
        path:"reviews",
        populate :{
            path : "author"},
        })
        .populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
}));

//    create route
router.post("/",isLoggedIn,validateListing,wrapAsync(async(req,res,next)=>{
   
     const newListing= new Listing(req.body.listing);
    //  console.log(req.user);
     newListing.owner = req.user._id;
     newListing.image = {url: req.body.listing.image, filename: "listingimage"};
  
    await newListing.save();
    req.flash("success","new listing created");
    res.redirect("/listings");
   
   }));

 //create route
// app.post("/listings",async(req,res)=>{
   
//     const newListing= new Listing(req.body.listing);
// await newListing.save();
// res.redirect("listings");

// });

     //Edit route
     router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(async (req,res)=>{
        let {id} =req.params;
        const listing= await Listing.findById(id);
        if(!listing){
            req.flash("error","Listing you requested for does not exist");
            res.redirect("/listings");
        }
        res.render("listings/edit.ejs", {listing});
       }));
    
       //Update Route
       router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(async (req,res)=>{
        
        if (req.body.listing.image) {
            req.body.listing.image = {
                url: req.body.listing.image, 
                filename: "listingimage" 
            };
        }
        let {id} =req.params;
        await Listing.findByIdAndUpdate(id,{...req.body.listing});
        req.flash("success","listing updated");
          res.redirect(`/listings/${id}`);
       }));
    
       // delete route
       router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async (req,res)=>{
        let {id} =req.params;
        let deleteListing=await Listing.findByIdAndDelete(id);
        console.log(deleteListing);
        req.flash("success","listing deleteded");
        res.redirect("/listings");
       }));
    
       module.exports = router;