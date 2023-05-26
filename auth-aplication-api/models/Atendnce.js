const mongoose = require("mongoose");

const atendenceSchema = new mongoose.Schema(
    {
     userid : {type : String , required : true , unique : false },
     day : {type : String , required : true},
     month : {type : String , required : true},
     year : {type : String , required : true},
     present : {type : Boolean , required : true , default: false},
     orkLeave : {type : Boolean , required : true , default : false},
     entranceTime : {type : String },
     leavingTime : {type : String },
     WorkingTime : {type : String }
    },
    { timestamps: true }
  );

module.exports = mongoose.model("atendence",atendenceSchema );