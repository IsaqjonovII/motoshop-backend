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
} = require("../controllers/ad.controller");
const { getUserAds } = require("../controllers/userAd.controller");

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
  fastify.get("/user-ads", getUserAds);
}
module.exports = routes;
