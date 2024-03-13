const {
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
} = require("../controllers/ad.controller");

async function routes(fastify, _) {
  fastify.post("/", createAd);
  fastify.get("/", getAllAds);
  fastify.get("/:id", getAdById);
  fastify.delete("/:id", deleteAd);
  fastify.get("/ads-by-type", getAdsByType);
  fastify.get("/random-ads", getRandomsAds);
  fastify.post("/update-view", updateAdView);
  fastify.get("/similar-ads", getSimilarAdsByType);
  fastify.put("/update-like", toggleLikeAd);
  fastify.get("/search", getSearchedAds);
}
module.exports = routes;
