const user = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const room = require("../models/room.model");
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email + " " + password);

    const data = await user.findOne({ email });

    if (!data) return res.status(404).json({ msg: "User doesn't exist" });

    const isMatch = await bcrypt.compare(password, data.password);
    console.log(isMatch);

    if (!isMatch) {
      return res.status(400).json({ msg: "wrong password" });
    }
    const token = jwt.sign(
      { email: email, role: data.role, id: data._id },
      process.env.JWT_SECRET_KEY
    );

    res.status(200).json({ msg: "Logged In Successfully", token, data });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong", error });
  }
};
const userRegister = async (req, res) => {
  try {
    const { name, email, password, role, occupied } = req.body;

    const data = await user.findOne({ email });
    if (data) return res.status(400).json({ msg: "Email already exists" });
    console.log("email");

    if (role === "manager" || role === "admin") {
      const userRole = await user.findOne({ role: role });
      if (userRole)
        return res.status(400).json({ msg: `${role} already exists !` });
    }
    console.log("pass");

    const hashPass = await bcrypt.hash(password, 10);
    // console.log(hashPass);
    const prod = await user.create({
      name: name,
      email: email,
      password: hashPass,

      role: role,
      occupied: occupied,
    });

    if (prod) {
      return res
        .status(201)
        .json({ msg: "User registered successfully ", prod });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const userProfile = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await user.findById(id);
    if (!data) return res.status(404).json({ msg: "no user found" });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const userDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const prod = await user.findById(id);
    if (!prod) return res.status(400).json({ msg: "User not found" });
    const data = await user.findByIdAndDelete(id);

    if (data)
      return res.status(200).json({ msg: "User deleted successfully", data });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
const userPatch = async (req, res) => {
  try {
    const id = req.params.id;
    const prod = await user.findById(id);

    if (!prod) return res.status(400).json({ msg: "User not found" });
    const { occupied, password, name } = req.body;
    let roomStatus = req.body;
    // console.log(roomStatus);

    if (occupied && occupied.trim() !== "") roomStatus = true;
    else roomStatus = false;

    let hashPass = password;
    if (password) hashPass = await bcrypt.hash(password, 10);
    // console.log("hashpass");
    const data = await user.findByIdAndUpdate(
      id,
      {
        name: name,
        password: hashPass,
        roomStatus: roomStatus,
        occupied: occupied,
      },
      { new: true }
    );

    if (data) return res.status(200).json({ msg: "Room Booked", data });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
const leaveRoom = async (req, res) => {
  try {
    const id = req.params.id;
    const prod = await user.findById(id);

    if (!prod) return res.status(400).json({ msg: "User not found" });

    if (prod.occupied === "")
      return res.status(200).json({ msg: "Room not booked yet" });

    const roomId = req.body.roomId;
    const data = await user.findByIdAndUpdate(
      id,
      {
        roomStatus: false,
        occupied: "",
      },
      { new: true }
    );
    const roomUp = await room.findByIdAndUpdate(roomId, {
      owner: "",
      available: true,
    });
    if (data && roomUp) return res.status(200).json({ msg: "Room left", data });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
const getAdmin = async (req, res) => {
  try {
    const data = await user.find();
    if (data.length === 0)
      return res.status(404).json({ msg: "No Users found" });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const getUser = async (req, res) => {
  try {
    const data = await user.find();
    if (data.length === 0)
      return res.status(404).json({ msg: "No Users found" });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = {
  userDelete,
  userLogin,
  userRegister,
  userProfile,
  getAdmin,
  getUser,
  userPatch,
  leaveRoom,
};
