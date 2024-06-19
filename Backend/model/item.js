const mongoose = require("mongoose");

const {Schema} = mongoose

const ItemSchema = new Schema({
    name: String,
    rarity: String,
    price: Number,
    description: String,
    picture: String
});
module.exports = mongoose.model("item", ItemSchema);