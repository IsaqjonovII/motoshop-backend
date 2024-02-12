const { Schema, model } = require("mongoose");

const AdSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  category: String,
  images: {
    type: Array,
    required: true,
    minLength: 1,
    maxLength: 10,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  engineSize: String,
  mileage: String,
  manufacturedAt: Schema.Types.Mixed,
  postedAt: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
    default: 0,
  },
  color: String,
  likes: {
    type: Number,
    default: 0,
  },
  condition: String,
  brand: String,
  size: String,
  adType: String
});
const Ad = model("Ad", AdSchema);
module.exports = Ad;
