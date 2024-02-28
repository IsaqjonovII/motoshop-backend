const { v2 } = require("cloudinary");
const {
  createAd,
  deleteAd,
  getAdById,
  getAllAds,
  getAdsByUserId,
  getAdsByType,
  getRandomsAds,
  updateAdView,
  updateAdLike,
  removeAdLike,
  getSimilarAdsByType,
  getLikedAdsByUser,
  getLastViewedAds,
} = require("../controllers/ad.controller");
async function deleteAllImages(_, reply) {
  try {
    // const res = await v2.api.delete_resources_by_prefix("motocycles");
    const publicIds = [];
    const res = await v2.api.resources();
    await res.resources.forEach((img) => {
      publicIds.push(img.public_id);
    });
    const folders = await v2.api.resources({
      type: "upload",
    });
    await folders.resources.forEach((img) => {
      publicIds.push(img.public_id);
    });
    const deleted = await v2.api.delete_resources(publicIds);
    return reply.send(deleted);
  } catch (error) {
    return reply.send(error);
  }
}

async function routes(fastify, options) {
  fastify.post("/", createAd);
  fastify.get("/", getAllAds);
  fastify.get("/:id", getAdById);
  fastify.delete("/:id", deleteAd);
  fastify.get("/ads-by-user", getAdsByUserId);
  fastify.get("/ads-by-type", getAdsByType);
  fastify.get("/random-ads", getRandomsAds);
  fastify.post("/update-view", updateAdView);
  fastify.post("/add-like", updateAdLike);
  fastify.post("/remove-like", removeAdLike);
  fastify.get("/similar-ads", getSimilarAdsByType);
  fastify.get("/liked-ads", getLikedAdsByUser);
  fastify.get("/viewed-ads", getLastViewedAds);
  fastify.get("/delete-all", deleteAllImages);
}
module.exports = routes;
