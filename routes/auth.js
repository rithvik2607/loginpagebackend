const router = require('express').Router();
const User = require('../model/User');  
const bcrypt = require('bcryptjs');
const {signupValidation, loginValidation} = require('../validation');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req,res) => {
  //Validate the data before making a new user
  const {error} = signupValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the user already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Account already exists');

  //Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  
  //Create a new user
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    regNo: req.body.regNo,
    email: req.body.email,
    password: hashPassword,
    blockDet: req.body.blockDet,
    address: req.body.address
  });
  try{
    const savedUser = await user.save();
    res.send({user: user._id});
  }
  catch(err){
    res.status(400).send(err);
  }
});

//Login
router.post('/login', async (req,res) => {
  //Validate the data before making a new user
  const {error} = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the user already exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Account does not exist.Please sign up.');

  //Validating password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send('Email or password does not exist');


  //Create and assign a token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res-Headers('auth-token', token).send(token);
});


module.exports = router;