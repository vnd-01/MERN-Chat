const mongoose = require("mongoose");
const UserModel = require("./User");

const MessageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    text: String,
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model('Message',MessageSchema);

module.exports = MessageModel;