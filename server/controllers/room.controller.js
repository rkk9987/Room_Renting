const room = require("../models/room.model");

const getRoom = async (req, res) => {
  try {
    const data = await room.find();

    if (data.length === 0)
      return res.status(403).json({ msg: "No rooms found" });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong", error });
  }
};

const postRoom = async (req, res) => {
  try {
    const { name, address, rent, owner, available } = req.body;

    const data = await room.create({
      name: name,
      rent: rent,
      address: address,
      owner: owner,
      available: available,
    });

    if (data)
      return res.status(201).json({ msg: "Room added successfully", data });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong", error });
  }
};
const patchRoom = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, rent, owner } = req.body;
    let available = req.body;
    console.log("ptRoom");
    if (owner && owner.trim() !== "") {
      available = false;
    } else available = true;

    const data = await room.findById(id);
    if (!data) return res.status(400).json({ msg: "No Such room exists" });
    const prod = await room.findByIdAndUpdate(
      id,
      {
        name: name,
        rent: rent,
        available: available,
        owner: owner,
      },
      { new: true }
    );
    if (prod)
      return res
        .status(200)
        .json({ msg: "Room info updated successfully", prod });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong", error });
  }
};
const delRoom = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await room.findById(id);
    if (!data) return res.status(400).json({ msg: "No Such room exists" });
    const prod = await room.findByIdAndDelete(id);
    if (prod)
      return res.status(200).json({ msg: "Room deleted successfully", prod });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong", error });
  }
};
const patchRoomOwner = async (req, res) => {
  try {
    const id = req.params.id;
    const { owner } = req.body;
    let available = req.body;
    // console.log("ptRoom");
    if (owner && owner.trim() !== "") {
      available = false;
    } else available = true;

    const data = await room.findById(id);
    if (!data) return res.status(400).json({ msg: "No Such room exists" });
    const prod = await room.findByIdAndUpdate(
      id,
      {
        available: available,
        owner: owner,
      },
      { new: true }
    );
    if (prod)
      return res.status(200).json({ msg: "Owner updated successfully", prod });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong", error });
  }
};

const searchRoom = async (req, res) => {
  try {
    const { name } = req.body;
    const data = await room.find({ name: name });
    if (data.length === 0)
      return res.status(403).json({ msg: "No rooms found" });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong", error });
  }
};

module.exports = {
  getRoom,
  postRoom,
  patchRoom,
  delRoom,
  patchRoomOwner,
  searchRoom,
};
