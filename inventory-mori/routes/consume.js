const router = require("express").Router();
const consume = require("../models/Consumption");
const {
  updateProductWhenAddConsume,
  updateProductWhenDeleteUse,
} = require("../utils/share");

router.post("/use", async (req, res) => {
  try {
    const newConsume = new consume(req.body);

    if (await updateProductWhenAddConsume(req.body)) {
      const savedConsume = await newConsume.save();
      res.status(200).json(savedConsume);
    } else {
      res.status(500).json("not Valid IDs for PUT/consume/ 3 ");
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.put("/updateUse/:id", async (req, res) => {
  try {
    const deletedConsume = await consume.findById(req.params.id);
    await updateProductWhenDeleteUse(deletedConsume);

    const updatedConsume = await consume.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    await updateProductWhenAddConsume(updatedConsume);

    res.status(200).json(updatedConsume);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.delete("/deleteUse/:id", async (req, res) => {
  try {
    const deletedConsume = await consume.findByIdAndDelete(req.params.id);

    await updateProductWhenDeleteUse(deletedConsume);

    res.status(200).json("deleted ...");
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get("/getUse/:userid", async (req, res) => {
  try {
    const result = await consume.find({ userid: req.params.userid });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get("/getUse/", async (req, res) => {
  try {
    const result = await consume.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
