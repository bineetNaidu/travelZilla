const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String,
    avatar: String,
    firstName: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
