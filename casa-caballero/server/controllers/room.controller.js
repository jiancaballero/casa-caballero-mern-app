const app = require("express");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://jiancaballero:Kasmot.1@cluster0.ikwmk4d.mongodb.net/hotel_dbs"
);

const Room = require("../model/room.model");
const RoomCategory= require("../model/room_category.model")
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().then({});
    return res.status(200).send(rooms)
  } catch (error) {
    return res.status(400).send({ message:error})
  }
};
const getRoomCategory = async (req,res)=>{
  try {
    const params = await req.params.categoryID;
    
    const room = await RoomCategory.find().populate("rooms").then({})
    console.log("OK desu")
    return res.status(200).send(room);
  } catch (error) {
    return res.status(400).send({ message:error})
  }
}

// insert controller functions
module.exports = {
  getRooms,
  getRoomCategory
};
