const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  bookings: [{ booking_id: { type: mongoose.Types.ObjectId, ref: "Booking" } }],
  first_name: String,
  last_name: String,
  password: String,
  email: String,
  phone: Number,
  type: String,
});
// collection name
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
