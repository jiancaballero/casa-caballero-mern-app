const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema ({
    room: {type:mongoose.Types.ObjectId,ref:"Room"},
    check_in:Date,
    check_out:Date,
    status:String
})

const booking = mongoose.model("Booking",bookingSchema);
module.exports = booking;