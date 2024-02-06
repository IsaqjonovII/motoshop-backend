const {
  createAd,
  deleteAd,
  getAdById,
  getAllAds,
  getAdsByUserId,
  getAdsByCategory,
} = require("../controllers/ad.controller");

async function routes(fastify, options) {
  fastify.post("/", createAd);
  fastify.get("/", getAllAds);
  fastify.get("/:id", getAdById);
  fastify.delete("/:id", deleteAd);
  fastify.get("/ads-by-userId/:id", getAdsByUserId);
  fastify.get("/ads-by-category", getAdsByCategory);
}
module.exports = routes;
