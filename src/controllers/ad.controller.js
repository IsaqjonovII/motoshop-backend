const Ad = require("../models/ad.model");
const User = require("../models/auth.model");
const { handleServerError, uploadToCloudinary } = require("../utils");

async function createAd(req, reply) {
  try {
    const { images } = req.body;

    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const imageUrl = await uploadToCloudinary(image);
        return imageUrl;
      })
    );

    const newAd = new Ad({
      ...req.body,
      images: imageUrls,
    });

    const result = await newAd.save();

    return reply.send({ message: "E'lon joylandi.", ad: result });
  } catch (error) {
    handleServerError(reply, error);
  }
}
async function deleteAd(req, reply) {
  try {
    const deletedAd = await Ad.findByIdAndDelete(req.params.id);
    if (!deletedAd) {
      reply.status(404).send({ message: "Bunday e'lon topilmadi" });
    }
    reply.status(204).send({ message: "E'lon o'chirildi" });
  } catch (error) {
    handleServerError(reply, error);
  }
}
async function getAdById(req, reply) {
  try {
    const ad = await Ad.findById(req.params.id).populate(
      "owner",
      "name phone location"
    );
    if (!ad) {
      reply.status(404).send({ message: "Bunday e'lon topilmadi" });
    }
    reply.status(200).send(ad);
  } catch (error) {
    handleServerError(reply, error);
  }
}

async function getAdsByUserId(req, reply) {
  try {
    const userId = req.params.id;
    const userAds = await Ad.find({ owner: userId });
    return reply.send(userAds);
  } catch (error) {
    handleServerError(reply, error);
  }
}

async function getAllAds(_, reply) {
  try {
    const ads = await Ad.find().populate("owner", "name phone location");
    return reply.send(ads);
  } catch (error) {
    handleServerError(reply, error);
  }
}

async function getAdsByType(req, reply) {
  try {
    const ads = await Ad.find({ adType: req.query.type }).limit(20);
    return reply.send(ads);
  } catch (error) {
    handleServerError(reply, error);
  }
}
async function getRandomsAds(req, reply) {
  try {
    const { limit } = req.query;
    const randomAds = await Ad.aggregate([
      { $sample: { size: parseInt(limit) } },
    ]);
    return reply.send(randomAds);
  } catch (error) {
    handleServerError(reply, error);
  }
}
async function updateAdView(req, reply) {
  try {
    const { userId, adId } = req.query;
    const hasViewed = await User.findOne({
      _id: userId,
      viewedAds: adId,
    }).exec();

    if (!hasViewed) {
      await Ad.findByIdAndUpdate(adId, { $inc: { views: 1 } }, { new: true });
      await User.findByIdAndUpdate(
        userId,
        { $push: { viewedAds: adId } },
        { new: true }
      );
    }
  } catch (error) {
    handleServerError(reply, error);
  }
}
async function updateAdLike(req, reply) {
  try {
    const { userId, adId } = req.query;
    const hasLiked = await User.findOne({
      _id: userId,
      likedAds: adId,
    }).exec();

    if (!hasLiked) {
      await Ad.findByIdAndUpdate(adId, { $inc: { likes: 1 } }, { new: true });
      await User.findByIdAndUpdate(
        userId,
        { $push: { likedAds: adId } },
        { new: true }
      );
    }
  } catch (error) {
    handleServerError(reply, error);
  }
}

module.exports = {
  createAd,
  deleteAd,
  getAdById,
  getAllAds,
  getAdsByUserId,
  getAdsByType,
  getRandomsAds,
  updateAdView,
  updateAdLike
};
