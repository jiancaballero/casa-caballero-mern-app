const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://jiancaballero:Kasmot.1@cluster0.ikwmk4d.mongodb.net/hotel_dbs"
);

const Room = require("../model/room.model");
const Booking = require("../model/booking.model");

// {check_in:{$gte:new Date(req.body.startDate)}},{check_in:{$lte:new Date(req.body.endDate)}}]}
const getAvailableRooms = (req, res) => {
  console.log(req.body);
  try {
    Booking.find({
      $and: [
        { status: { $eq: "paid" } },
        { check_in: { $gte: new Date(req.body.booking_start) } },
        { check_in: { $lte: new Date(req.body.booking_end) } },
      ],
    }).then((data) => {
      const bookedRooms = data.map((booking) => {
        return booking.room;
      });
      Room.find({ _id: { $nin: bookedRooms } }).then((data) => {
        res.status(200).send(data);
      });
    });
  } catch (error) {
    return res.status(400).send({ message: error });
  }

  // try {

  //   Booking.find({
  //     $and: [{ status: { $eq: "paid" } },{check_in:{$gte:new Date(arrival.startDate)}},{check_in:{$lte:new Date(arrival.endDate)}}],
  //   }).then((data) => {
  //     const bookedRooms = data.map((booking) =>{
  //       return booking.room
  //     })
  //     Room.find({_id:{$nin:bookedRooms}}).then((data)=>{
  //       res.send(data);
  //     })

  //   });
  //   // return res.status(200).send(rooms);
  // } catch (error) {
  //   return res.status(400).send({ message: error });
  // }
};

// insert controller functions
module.exports = {
  getAvailableRooms,
};
