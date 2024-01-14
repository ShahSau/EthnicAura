const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");

// create user
const createUser = asyncHandler(async (req, res) => {
  //check if user already exists
  const email = req.body.email;
  const findUser = await User.findOne({ email });
  if (findUser) {
    throw new Error("User already exists");
  }

  //create user if not exists
  try {
      const newUser = await User.create(req.body);
      res.status(201).json({
      status: "success",
      newUser,
      });
  } catch (error) {
      throw new Error(error.message);
  }
  }
)

// Login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});



module.exports = {
    createUser,
    loginUserCtrl
}