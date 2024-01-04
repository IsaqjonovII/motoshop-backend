const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
    unique: true,
  },
  postedAds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ad",
    },
  ],
  viewedAds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ad",
    },
  ],
  likedAds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ad",
    },
  ],
  location: String,
  profilePicture: String,
  bio: String,
  savedSearches: [String],
  chatHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  ],
  feedback: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
    },
  ],
  favoriteSellers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  socialMediaLinks: {
    facebook: String,
    telegram: String,
    instagram: String,
  },
  password: {
    type: String,
    minLength: 8,
    maxLength: 1024,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
