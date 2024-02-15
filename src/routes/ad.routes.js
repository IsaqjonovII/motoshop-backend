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
} = require("../controllers/ad.controller");

async function routes(fastify, options) {
  fastify.post("/", createAd);
  fastify.get("/", getAllAds);
  fastify.get("/:id", getAdById);
  fastify.delete("/:id", deleteAd);
  fastify.get("/ads-by-userId/:id", getAdsByUserId);
  fastify.get("/ads-by-type", getAdsByType);
  fastify.get("/random-ads", getRandomsAds);
  fastify.post("/update-view", updateAdView);
  fastify.post("/update-like", updateAdLike);
}
module.exports = routes;
