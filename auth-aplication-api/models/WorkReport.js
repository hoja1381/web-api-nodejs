const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
   date : {type: String , required: true , unique : true},
   UserId : {type : String , required: true},
   workReports : 
   [{
        issue : {type : String , required: true , default : "work-report"},
        workTime : {type : String , required : true},
        workReport : {type : String , required: true},
        confirmed : {type: Boolean  , default : false , required: true}
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkReports", UserSchema);