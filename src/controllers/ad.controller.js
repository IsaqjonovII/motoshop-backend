const Ad = require("../models/ad.model");
const { handleServerError, uploadToCloudinary } = require("../utils");

async function createAd(req, reply) {
  try {
    const {
      name,
      description,
      price,
      location,
      category,
      owner,
      images,
    } = req.body;

    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const imageUrl = await uploadToCloudinary(image);
        return imageUrl;
      })
    );

    const newAd = new Ad({
      name,
      description,
      price,
      location,
      category,
      images: imageUrls,
      owner,
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
      "name phone location profilePicture"
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
    console.log(userAds);
  } catch (error) {
    handleServerError(reply, error);
  }
}

async function getAllAds(req, reply) {
  try {
    const ads = await Ad.find().populate("owner", "name phone location");
    return reply.send(ads);
  } catch (error) {
    handleServerError(reply, error);
  }
}

async function getAdsByCategory(req, reply) {
  try {
    const selectedCategory = req.body;
    const ads = await Ad.find();
    const filteredAds = ads.filter(
      ({ category }) => category === selectedCategory
    );
    return reply.send(filteredAds.slice(0, 16));
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
  getAdsByCategory,
};
