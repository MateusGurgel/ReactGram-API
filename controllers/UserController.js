const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

const register = async (req, res) => {

    const {name, email, password} = req.body


    const user = await User.findOne({email})

    if(user){
      res.status(422).json({errors: ["ReactGram account already exists"]})
      return
    }


    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = await User.create({
      name,
      email,
      password: passwordHash
    })

    if(!newUser) {    
      res.status(422).json({errors: ["An error occurred, please try again later"]})
      return;
    }


    res.status(201).json({
      _id: newUser._id,
      token: generateToken(newUser._id)
    })
};

const login = async(req, res) => {
  const {email, password} = req.body

  const user = await User.findOne({email})

  if(!user){
    res.status(422).json({errors: ["ReactGram account do not exists"]})
    return
  }

  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["Invalid password!"] });
    return;
  }

  res.status(200).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
}

const getCurrentUser = async (req, res) => {
  const user = req.user;

  res.status(200).json(user);
};

const update = async(req, res) => {
  res.send("Brabo")
}

module.exports = {
  register,
  login,
  getCurrentUser,
  update
};
