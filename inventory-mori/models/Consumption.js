const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const consumptionSchema = new mongoose.Schema(
  {
    userid: { type: ObjectId, required: true },
    productsUsed: [
      {
        productid: { type: ObjectId, required: true },
        amount: { type: Number, required: true },
        purchase: { type: Boolean, default: false },
      },
    ],
    adminId: { type: ObjectId, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("consume", consumptionSchema);
