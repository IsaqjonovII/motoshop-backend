const Ad = require("../models/ad.model");
const User = require("../models/auth.model");
const {
  handleServerError,
  uploadToCloudinary,
  deleteCloudinaryImages,
} = require("../utils");

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

    await User.findByIdAndUpdate(
      req.body.owner,
      { $push: { postedAds: result._id } },
      { new: true }
    );
    return reply.send({ message: "E'lon joylandi.", ad: result });
  } catch (error) {
    handleServerError(reply, error);
  }
}
async function deleteAd(req, reply) {
  try {
    const { images } = await Ad.findById({ _id: req.params.id });
    const deletedImagesRes = await deleteCloudinaryImages(images);
    if (deletedImagesRes === "deleted") {
      const deletedAd = await Ad.findByIdAndDelete(req.params.id);
      if (!deletedAd) {
        reply.status(404).send({ message: "Bunday e'lon topilmadi" });
      }
      reply.status(204).send({ message: "E'lon o'chirildi" });
    } else {
      return reply.send({
        message:
          "E'lon o'chirilishida xatolik bo'ldi. Birozdan so'ng qayta urinib ko'ring.",
      });
    }
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
    const ads = await Ad.find(
      { adType: req.query.type },
      "title images postedAt views location price likes"
    ).sort({ postedAt: -1 }).limit(20);
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
      {
        $project: {
          title: 1,
          description: 1,
          title: 1,
          images: 1,
          postedAt: 1,
          views: 1,
          location: 1,
          price: 1,
          likes: 1,
        },
      },
    ]);
    return reply.send(randomAds);
  } catch (error) {
    handleServerError(reply, error);
  }
}
async function updateAdView(req, reply) {
  try {
    const { userId, adId } = req.query;
    await Ad.findByIdAndUpdate(adId, { $inc: { views: 1 } }, { new: true });
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { viewedAds: adId } },
      { new: true }
    );
    return reply.send({
      message: "This ad is already in the list of viewed ads",
    });
  } catch (error) {
    handleServerError(reply, error);
  }
}
async function toggleLikeAd(req, reply) {
  try {
    const { userId, adId } = req.query;
    const { likedAds } = await User.findById(userId).exec();
    if (!likedAds.includes(adId)) {
      await Ad.findByIdAndUpdate(
        adId,
        {
          $inc: { "likes.count": 1 },
          $addToSet: { "likes.likedUsers": userId },
        },
        { new: true }
      );
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { likedAds: adId } },
        { new: true }
      );
      return reply.send({ message: "Yoqtirilgan e'lonlarga qo'shildi" });
    } else {
      await Ad.findByIdAndUpdate(adId, {
        $inc: { "likes.count": -1 },
        $pull: { "likes.likedUsers": userId },
      });
      await User.findByIdAndUpdate(userId, { $pull: { likedAds: adId } });
      return reply.send({ message: "Yoqtirilgan e'lonlardan olib tashlandi" });
    }
  } catch (error) {
    handleServerError(reply, error);
  }
}

async function getSimilarAdsByType(req, reply) {
  try {
    const { type, id } = req.query;
    const ads = await Ad.find({ adType: type, _id: { $ne: id } }).lean();
    return reply.send(ads);
  } catch (error) {
    handleServerError(reply, error);
  }
}

async function getSearchedAds(req, reply) {
  try {
    const { query } = req.query;
    const searchedAds = await Ad.find({
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { description: { $regex: new RegExp(query, "i") } },
        { location: { $regex: new RegExp(query, "i") } },
        { color: { $regex: new RegExp(query, "i") } },
      ],
    })
      .lean()
      .select("title images postedAt views location price likes");

    if (searchedAds.length) {
      return reply.send(searchedAds);
    } else {
      return reply.send({
        message: "Qidiruvingiz bo'yicha hech qanday ma'lumot topilmadi.",
      });
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
  getAdsByType,
  getRandomsAds,
  updateAdView,
  getSimilarAdsByType,
  toggleLikeAd,
  getSearchedAds,
};
