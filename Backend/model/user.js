const mongoose = require("mongoose");

const {Schema} = mongoose

const UserSchema = new Schema({
    userName: String,
    password: String,
    rank: String
});
module.exports = mongoose.model("user", UserSchema);