const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://jiancaballero:Kasmot.1@cluster0.ikwmk4d.mongodb.net/hotel_dbs"
);
const Booking = require("../model/booking.model");
const Room = require("../model/room.model");
const addBooking = (req, res) => {
  const newBooking = new Booking({
    "room":req.body.room_id,
    "check_in":req.body.booking_start,
    "check_out":req.body.booking_end,
    "bk_code":req.body.bk_code,
    "guest_flag":req.body.isGuest,
    "guest_details":req.body.guest_details,
    "adult":req.body.adult,
    "child":req.body.child,
    "number_of_rooms":req.body.number_of_rooms,
    "isGuest":req.body.isGuest,
    "bk_code":req.body.bk_code
  });

  try {
    // all rooms based on given room type
    Room.find({ room_type: { $eq: req.body.room_type } }).then((room_type) => {
      const rooms = room_type.map((room) => {
        return room._id;
      });
      // active bookings based on given room type
      Booking.find({
        $and: [
          { status: { $eq: "paid" } },
          { room: { $in: rooms } },
          {
            check_in: {
              $gte: new Date(req.body.booking_start).toDateString(),
            },
          },
          {
            check_in: { $lte: new Date(req.body.booking_end).toDateString() },
          },
        ],
      }).then((active_bookings) => {
        const bookedRooms = active_bookings.map((booking) => {
          return booking.room;
        });
        // available rooms based on room type
        Room.find({
          $and: [
            { _id: { $nin: bookedRooms } },
            { room_type: req.body.room_type },
          ],
        }).then((available_rooms) => {
          if (available_rooms.length - active_bookings.length >= 0) {
            newBooking.status = 'paid';
            newBooking.save().then((data) => {
              
              
              res
                .status(201)
                .send({ message: "Your booking has been created." , data: data });
            });
          } else {
            res
              .status(404)
              .send({ message: "May nauna na magbook bagal mo kasi e" });
          }
        });
      });
    });

    //TODO:
    // for GUESTS:
    // challenge: check if available parin ang room na yun (check the room type)
    // 1. after click the continue button,
    // //1. get room type from frontend through body
    //2. get all rooms na may ganon room type
    //3. kunin sa bookings collection ang lahat ng booking na active na may ganung book type
    //4. room available based on given room type - active booking given room type >=0
    // if greater than 0,  booking data will be saved in the db, else room not available please select another room.

    // 2. details of the user coming from the data in the url (second parameter) will be saved in the guest_detail field
  } catch (error) {
    return res.status(400).send({ message: error });
  }
};
module.exports = {
  addBooking,
};
