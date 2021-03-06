const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


//Register
router.post("/register",async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(JSON.stringify(req.body.password), process.env.PASS_SEC).toString(),
  });

try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
} catch (err) {
    res.status(500).json(err);
}

});

//Log in

router.post("/login",async (req,res)=> {
   try {
    const user =await User.findOne({email : req.body.email});
    !user && res.status(401).json("Wrong credential")

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
    originalPassword !== JSON.stringify(req.body.password) && res.status(401).json("Wrong credentialssssss")


    const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
            {expiresIn:"3d"}
        );



const {password, ...others} = user._doc;

res.status(200).json({...others,accessToken});
} catch (err) {
       res.status(500).json(err);
   }
})

module.exports = router;
