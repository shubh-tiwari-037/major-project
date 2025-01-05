const Listing = require("../models/listing");

module.exports.index =async (req,res)=>{
    const allListings= await Listing.find({});
    res.render("listings/index.ejs",{allListings});
   };

   module.exports.renderNewForm = (req,res)=>{
    // console.log(req.user);
    res.render("listings/new.ejs");
   };

   module.exports.showListing =async (req,res)=>{
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
};

module.exports.createListing =async(req,res,next)=>{
   
    const newListing= new Listing(req.body.listing);
   //  console.log(req.user);
    newListing.owner = req.user._id;
    newListing.image = {url: req.body.listing.image, filename: "listingimage"};
 
   await newListing.save();
   req.flash("success","new listing created");
   res.redirect("/listings");
  
  };

  module.exports.renderEditForm =async (req,res)=>{
    let {id} =req.params;
    const listing= await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", {listing});
   };

   module.exports.updateListing =async (req,res)=>{
        
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
   };

   module.exports.destroyListing =async (req,res)=>{
           let {id} =req.params;
           let deleteListing=await Listing.findByIdAndDelete(id);
           console.log(deleteListing);
           req.flash("success","listing deleteded");
           res.redirect("/listings");
          };