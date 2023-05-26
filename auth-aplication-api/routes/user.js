const router = require("express").Router();
const user = require("../models/Users");
const CryptoJS = require("crypto-js");



//UPDATE
router.put("/:id", async (req, res) => {
    if (req.body.password){
      req.body.password =  CryptoJS.AES.encrypt(req.body.password,process.env.PASS_CRJS_KEY).toString()
    }

    try {
      const updatedUser = await user.findByIdAndUpdate(
        {_id : req.params.id},
        {$set: req.body,},
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  });

module.exports = router;

//DELETE
router.delete("/:id", async (req, res) => {
    try {
      await user.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //GET USER
router.get("/find/:id", async (req, res) => {
    try {
      const User = await user.findById(req.params.id);
      const { password, ...others } = User._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  });

  //GET ALL USER
router.get("/", async (req, res) => {
    const query = req.query.new;
    try {
      const users = query
        ? await user.find().sort({ _id: -1 }).limit(5)
        : await user.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });