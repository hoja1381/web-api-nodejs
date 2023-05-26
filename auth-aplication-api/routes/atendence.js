const router = require("express").Router();
const atendence = require("../models/Atendnce");

//create
router.post("/" , async (req , res)=>{
 const newAtendence = new atendence(req.body);
 try {
    if(newAtendence.entranceTime && newAtendence.leavingTime){
        const enterHoure = newAtendence.entranceTime.split(":")[0];
        const enterMinute = newAtendence.entranceTime.split(":")[1];

        const leaveHoure = newAtendence.leavingTime.split(":")[0];
        const leavMinute = newAtendence.leavingTime.split(":")[1];

        const workingHoures = (leaveHoure - enterHoure) % 24;
        const workiningMinute = (leavMinute - enterMinute) % 60;

        newAtendence.WorkingTime = `${workingHoures}:${workiningMinute}`;
    }
    const savedAtendence = await newAtendence.save();
    res.status(200).json(savedAtendence);
 } catch (err) {
    res.status(500).json(err);
    console.log(err);
 }
});

//update
router.put("/:userid/:day/:month/:year" , async (req , res)=>{
 try {
    const updatedAtend = await atendence.findOneAndUpdate(
        {userid : req.params.userid ,
        day : req.params.day , 
        month : req.params.month ,
        year : req.params.year},
        {$set : req.body},
        {new :true}
    );
    if(updatedAtend.entranceTime && updatedAtend.leavingTime){
        const enterHoure = updatedAtend.entranceTime.split(":")[0];
        const enterMinute = updatedAtend.entranceTime.split(":")[1];

        const leaveHoure = updatedAtend.leavingTime.split(":")[0];
        const leavMinute = updatedAtend.leavingTime.split(":")[1];

        const workingHoures = (leaveHoure - enterHoure) % 24;
        const workiningMinute = (leavMinute - enterMinute) % 60;

        updatedAtend.WorkingTime = `${workingHoures}:${workiningMinute}`;
        updatedAtend.update();  
    }

    res.status(200).json(updatedAtend);
} catch (err) {
    res.status(500).json(err);
    console.log(err);
}
});


//delete
router.delete("/:userid/:day/:month/:year" , async (req , res)=>{
    atendence.findOneAndDelete({
        userid : req.params.userid ,
        day : req.params.day , 
        month : req.params.month ,
        year : req.params.year
    },
     (data , err ) =>{
        if(!err){
            res.status(200).json(data);
        }
        else{
            res.status(500).json(err);
        }
     });

   });

//getbyDate
router.get("/:userid/:day/:month/:yaer", async (req , res)=>{
    try {
    const data = await atendence.findOne({
            userid : req.params.userid , 
            day : req.params.day,
            month : req.params.month,
            year : req.params.yaer
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

//getLastMonth
router.get("/:userid", async (req , res)=>{
    try {
        const data = await atendence.find({userid : req.params.userid}).sort({ createdAt: -1 }).limit(30);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});




module.exports = router;