const mongoose = require("mongoose");

const overtimeSchema = new mongoose.Schema(
    {
     userid : {type : String , required : true },
     date : {type : String , required : true },
     beginTime : {type : String },
     finishTime : {type : String },
     WorkingTime : {type : String },
     adminConfirmation : {type : Boolean , required : true , default : false}
    },
    { timestamps: true }
  );

module.exports = mongoose.model("overtime", overtimeSchema );