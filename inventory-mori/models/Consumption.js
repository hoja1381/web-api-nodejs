const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const consumptionSchema = new mongoose.Schema(
  {
    userid: { type: ObjectId, required: true },
    username: { type: String, required: true },
    productsUsed: [
      {
        productid: { type: ObjectId, required: true },
        productName: { type: String, required: true },
        amount: { type: Number, required: true },
        purchase: { type: Boolean, default: false },
      },
    ],
    adminId: { type: ObjectId, requiered: true },
    adminUserName: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("consume", consumptionSchema);
