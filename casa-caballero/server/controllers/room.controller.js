const app = require("express");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://jiancaballero:Kasmot.1@cluster0.ikwmk4d.mongodb.net/hotel_dbs"
);

const Room = require("../model/room.model");

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().then({});
    return res.status(200).send(rooms)
  } catch (error) {
    return res.status(400).send({ message:error})
  }
};

// insert controller functions
module.exports = {
  getRooms,
};
