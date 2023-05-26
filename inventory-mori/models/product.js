const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true, unique: true },
    QTY: { type: Number, required: true },
    price: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
