const router = require("express").Router();
const user = require("../models/user");
const cryptoJS = require("crypto-js");

//regester : create a new User
router.post("/regester", async (req, res) => {
  let newUser;
  if (req.body.isAdmin) {
    newUser = new user({
      userName: req.body.userName,
      password: req.body.password,
      //cryptoJS.AES.encrypt(req.body.password, process.env.cryptoJS_key).toString(),
      isAdmin: req.body.isAdmin,
    });
  } else {
    newUser = new user({
      userName: req.body.userName,
      isAdmin: req.body.isAdmin,
    });
  }

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//log In
router.post("/logIn", async (req, res) => {
  try {
    const userInfo = await user.findOne({
      userName: req.body.userName,
    });
    if (userInfo == null) {
      res.status(401).json(" Wrong UserName or password !!");
    } else {
      inputPassword = req.body.password;
      originalPassword = userInfo.password;

      if (inputPassword !== originalPassword) {
        res.status(401).json("Wrong UserName or password !!");
      } else {
        res.status(201).json({
          _id: userInfo.id,
          isAdmin: userInfo.isAdmin,
        });
      }
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
