const Ad = require("../models/ad.model");
const { handleServerError, uploadToCloudinary } = require("../utils");

async function uploadAd(req, reply) {
  try {
    const { name, description, price, location, category, owner } = req.body;
    const imageUrls = await Promise.all(
      req.raw.files.images.map(async (image) => {
        const imageUrl = await uploadToCloudinary(image.tempFilePath);
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
async function getAllAds(req, reply) {
  try {
    const ads = await Ad.find().populate(
      "owner",
      "name phone location profilePicture"
    );
    return reply.send(ads);
  } catch (error) {
    handleServerError(reply, error);
  }
}

module.exports = { uploadAd, deleteAd, getAdById, getAllAds };