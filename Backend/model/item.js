const mongoose = require("mongoose");

const {Schema} = mongoose

const ItemSchema = new Schema({
    name: String,
    type: String,
    rarity: String,
    price: Number,
    stat_modifier: String,
    requirement: String,
    description: String,
    picture: String
});
module.exports = mongoose.model("item", ItemSchema);