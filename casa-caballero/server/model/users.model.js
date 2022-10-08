const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
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
