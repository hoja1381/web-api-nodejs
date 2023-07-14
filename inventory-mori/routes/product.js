const router = require("express").Router();
const productSchema = require("../models/product");

router.post("/newProduct", async (req, res) => {
  const product = new productSchema(req.body);
  try {
    const savedProduct = await product.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.put("/updateProduct/:id", async (req, res) => {
  try {
    const updatedProduct = await productSchema.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.delete("/deleteProduct/:id", async (req, res) => {
  try {
    await productSchema.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted ...");
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.get("/getProduct/:id", async (req, res) => {
  try {
    const product = await productSchema.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.get("/getProduct/", async (req, res) => {
  try {
    const products = await productSchema.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
