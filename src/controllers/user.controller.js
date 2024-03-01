const Ad = require("../models/ad.model");
const User = require("../models/auth.model");
const { handleServerError } = require("../utils");

async function getLastViewedAds(req, reply) {
  try {
    const { id } = req.query;
    const user = await User.findById(id);
    const adIds = user?.viewedAds;
    const viewedAds = await Ad.find({
      _id: { $in: adIds },
    });

    if (viewedAds.length > 0) {
      return reply.send(viewedAds);
    } else {
      return reply.send({ message: "Hech qanday ma'lumot topilmadi." });
    }
  } catch (error) {
    handleServerError(reply, error);
  }
}

async function getLikedAdsByUser(req, reply) {
  try {
    const { userId } = req.query;
    const user = await User.findById(userId).exec();
    const adIds = user?.likedAds;
    const likedAds = await Ad.find({
      _id: { $in: adIds },
    });

    if (likedAds.length > 0) {
      return reply.send(likedAds);
    } else {
      return reply.send({ message: "Hech qanday ma'lumot topilmadi." });
    }
  } catch (error) {
    handleServerError(reply, error);
  }
}
async function getAdsByUserId(req, reply) {
  try {
    const { id, adId } = req.query;
    if (!adId || adId == undefined) {
      const userAds = await Ad.find({ owner: id });
      return reply.send(userAds);
    } else {
      const userAds = await Ad.find({ owner: id, _id: { $ne: adId } });
      return reply.send(userAds);
    }
  } catch (error) {
    handleServerError(reply, error);
  }
}

module.exports = {
  getAdsByUserId,
  getLikedAdsByUser,
  getLastViewedAds,
};
