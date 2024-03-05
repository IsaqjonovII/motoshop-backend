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
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: String,
    canBargain: Boolean,
  },
  location: {
    type: String,
    required: true,
  },
  category: String,
  images: {
    type: [String],
    required: true,
    validate: {
      validator: (array) => array.length >= 1 && array.length <= 10,
      message: "1 tadan 10taga rasm qo'yishingiz mumkin."
    }
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  engineSize: String,
  mileage: {
    type: Number,
  },
  manufacturedAt: String,
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
    likedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    count: {
      type: Number,
      default: 0,
    },
  },
  condition: String,
  brand: String,
  size: String,
  adType: String,
  status: {
    type: String,
    enum: ["active", "sold", "pending"],
    default: "active",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
AdSchema.index({
  title: "text",
  description: "text",
  mileage: "text",
  category: "text",
  color: "text",
  engineSize: 'text',
  location: 'text'
});

AdSchema.index({ "$**": 'text' })
const Ad = model("Ad", AdSchema);
module.exports = Ad;
