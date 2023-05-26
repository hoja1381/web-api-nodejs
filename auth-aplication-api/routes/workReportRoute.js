const router = require("express").Router();
const WR = require("../models/WorkReport");


//creat
router.post("/createReport" , async(req,res)=>{
try {
    const newWR = new WR (req.body);

    const savedWR = await newWR.save();
    res.status(200).json(savedWR);
    
} catch (err) {
    res.status.json(err);
}
});

//add
router.put("/addReport/:userid/:date" , async (req , res ) => {
         WR.findOneAndUpdate(
        {UserId : req.params.userid , date : req.params.date},
        {$push : req.body},
        {new : true} , (err , date)=>{
            if(err){
                res.status(500).json(err);
            }else{
                res.status(200).json(date);
            }
        });
});

//update
router.put("/updateReport/:userid/:date" , async (req , res ) => {
    WR.findOneAndUpdate(
   {UserId : req.params.userid , date : req.params.date},
   { $set : req.body},
   {new : true} , (err , date)=>{
       if(err){
           res.status(500).json(err);
       }else{
           res.status(200).json(date);
       }
   });
});

//remove 
router.put("/removeReport/:userid/:date" , async (req , res ) => {
    WR.findOneAndUpdate(
   {UserId : req.params.userid , date : req.params.date},
   {$pull : {workReports : req.body.workReports[0]}},
   {new : true} , (err , date)=>{
       if(err){
           res.status(500).json(err);
           console.log(err);
       }else{
           res.status(200).json(date);
       }
   });
});

//drop 
router.delete("/dropReport/:userid/:date", async(req , res)=>{
    try {
        await WR.findOneAndDelete({UserId : req.params.userid , date : req.params.date});
        res.status(200).json("deleted")
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
})


//get 

router.get("/:userid/:date" , async(req , res) => { 
    try {
        const reports = await WR.findOne(
            {
                UserId : req.params.userid , 
                date : req.params.date
             });
        res.status(200).json(reports);
    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router;