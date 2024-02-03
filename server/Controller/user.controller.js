const express = require("express");
const mongoose = require("mongoose");
const { compareSync } = require("bcryptjs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator");
// const { customAlphabet } = require("nanoid");

const User = require("../model/user.model");

const validateData = (method) => {
  switch (method) {
    case "signupUser": {
      return [
        body("name", "name is required ").exists(),
        body("email", "Please include a valid email").isEmail(),
        body(
          "password",
          "Please enter password with 6 or more character"
        ).isLength({ min: 6 }),
        body("phone", "Please enter a valid phone").isLength({ min: 11 }),
        body("address", "Please enter a valid phone").isLength({ min: 11 }),
      ];
    }

    case "loginUser": {
      return [
        body("email", "Invalid email").isEmail(),
        body("password", "Password is required").exists(),
      ];
    }
  }
};

//route GET api/auth
//@desc Test route

const getAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log(user);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
};

//route POST api/userLogin
//@desc Login user

const loginUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
    console.log(errors);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;
    let user = await User.findOne({ email });
    console.log("user", user);
    if (!user) {
      res.status(422).json({ errors: [{ msg: "Invalid credentials" }] });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      config.get("jwtsecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
};

//route POST api/user
//@desc Register user

const signupUser = async (req, res) => {
  console.log(req.body);
  try {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    // if user exist
    const { name, email, password, phone, address } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "email is already register" }] });
    }

    const otp = "000776";

    user = new User({
      name,
      email,
      password,
      phone,
      address,
      status: "UNVERIFIED",
      otp,
      role: "USER",
      otpExpires: Date.now() + 3600000,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      config.get("jwtsecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
};

const confirmOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid email" }] });
    }
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ errors: [{ msg: "OTP has expired" }] });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ errors: [{ msg: "Invalid OTP" }] });
    }
    user.status = "VERIFIED";
    await user.save();
    res.json({ msg: "User Verified", user });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid email" }] });
    }
    const otp = "000776";
    user.otp = otp;
    user.otpExpires = Date.now() + 3600000;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.status = "UNVERIFIED";
    await user.save();
    res.json({ msg: "OTP sent to your email", user });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
};

module.exports = {
  validateData,
  getAuth,
  loginUser,
  signupUser,
  confirmOtp,
  forgotPassword: resetPassword,
};
