const joi = require("joi");
const jwt = require("jsonwebtoken");
const user = require("../models/user.model");

const userRegisterAuthentication = (req, res, next) => {
  console.log("in the middleware");

  const schema = joi.object({
    name: joi.string().min(4).max(20).required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).max(15).required(),
    role: joi.string().valid("user", "manager", "admin"),
    occupied: joi.string(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  next();
};

const userLoginAuthentication = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).max(15).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  next();
};

const getUserAuthenticate = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(403).json({
      msg: "JWT Token is required",
    });
  }
  try {
    console.log("try");

    const decoded = jwt.verify(auth, process.env.JWT_SECRET_KEY);
    // console.log("tried");

    req.user = decoded;
    console.log(req.user);

    next();
  } catch (err) {
    return res.status(500).json({ msg: "Wrong JWT Token" });
  }
};

const verifyRole = (...role) => {
  return (req, res, next) => {
    console.log(req.user);
    if (!req.user || !role.includes(req.user.role))
      return res
        .status(403)
        .json({ msg: "Access denied. You don't have permission" });

    next();
  };
};

module.exports = {
  userRegisterAuthentication,
  userLoginAuthentication,
  getUserAuthenticate,
  verifyRole,
};
