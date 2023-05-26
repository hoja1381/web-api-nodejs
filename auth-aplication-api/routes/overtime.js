const router = require("express").Router();
const overtime = require("../models/Overtime");


//create
router.post("/requestOV", async (req , res)=> {
    try {
        const newOvertime = new overtime(req.body);
        if(newOvertime.beginTime && newOvertime.finishTime){
            const enterHoure = newOvertime.beginTime.split(":")[0];
            const enterMinute = newOvertime.beginTime.split(":")[1];
    
            const leaveHoure = newOvertime.finishTime.split(":")[0];
            const leavMinute = newOvertime.finishTime.split(":")[1];
    
            const workingHoures = (leaveHoure - enterHoure) % 24;
            const workiningMinute = (leavMinute - enterMinute) % 60;
    
            newOvertime.WorkingTime = `${workingHoures}:${workiningMinute}`;
        }
        const savedOvertime = await newOvertime.save();
        res.status(200).json(savedOvertime);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
})

//update
router.put("/updateOV/:userid/:date" , async (req , res ) => {
    try {
        const updatedOV = await overtime.findOneAndUpdate(
            {userid: req.params.userid ,
             date : req.params.date},
            {$set : req.body},
            {new :true}
        );
        if( updatedOV.beginTime && updatedOV.finishTime){
            const enterHoure = updatedOV.beginTime.split(":")[0];
            const enterMinute = updatedOV.beginTime.split(":")[1];
    
            const leaveHoure = updatedOV.finishTime.split(":")[0];
            const leavMinute = updatedOV.finishTime.split(":")[1];
    
            const workingHoures = (leaveHoure - enterHoure) % 24;
            const workiningMinute = (leavMinute - enterMinute) % 60;
    
            updatedOV.WorkingTime = `${workingHoures}:${workiningMinute}`;
            updatedOV.update();  
        }
    
        res.status(200).json(updatedOV);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

//remove 
router.delete("/removeOV/:userid/:date" , async (req , res ) => {
    overtime.findOneAndRemove(
   {userid : req.params.userid , date : req.params.date},
   {new : true} , (err , date)=>{
       if(err){
           res.status(500).json(err);
           console.log(err);
       }else{
           res.status(200).json(date);
       }
   });
});

//get
router.get("/:userid/:date" , async (req , res) => {
   try{
    const data = await overtime.findOne(
        {userid  : req.params.userid , 
        date : req.params.date});
    res.status(200).json(data);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

module.exports = router;