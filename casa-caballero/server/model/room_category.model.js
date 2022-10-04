const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const roomCategorySchema = new Schema ({
    rooms:[{type:mongoose.Types.ObjectId,ref:"Room"}],
    name:String,
    description:String
})

const roomCategory = mongoose.model("RoomCategories",roomCategorySchema);
module.exports = roomCategory;