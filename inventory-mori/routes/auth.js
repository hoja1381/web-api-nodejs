const router = require("express").Router();
const user = require("../models/user");
const cryptoJS = require("crypto-js");

//regester : create a new User
router.post("/regester", async (req, res) => {
	const newUser = new user({
		userName: req.body.userName,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: req.body.password,
		//cryptoJS.AES.encrypt(req.body.password, process.env.cryptoJS_key).toString(),
		isAdmin: req.body.isAdmin,
		phoneNumber: req.body.phoneNumber,
	});

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
			//   const hashedPassword = cryptoJS.AES.decrypt(
			//     userInfo.password,
			//     process.env.cryptoJS_key
			//   );

			//   console.log(userInfo.password);

			//   const originalPassword = hashedPassword.toString(cryptoJS.enc.Utf8);
			//   const inputPassword = req.body.password;
			//   const { password, ...others } = userInfo._doc;

			//   console.log(originalPassword);
			//   console.log(inputPassword);
			inputPassword = req.body.password;
			originalPassword = userInfo.password;

			if (inputPassword !== originalPassword) {
				res.status(401).json("Wrong UserName or password !!");
			} else {
				res.status(201).json(userInfo.id);
			}
		}
	} catch (err) {
		res.status(500).json(err);
		console.log(err);
	}
});

module.exports = router;
