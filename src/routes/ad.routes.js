const {
  uploadAd,
  deleteAd,
  getAdById,
  getAllAds,
  getAdsByUserId,
} = require("../controllers/ad.controller");

async function routes(fastify, options) {
  fastify.post("/", uploadAd);
  fastify.get("/", getAllAds);
  fastify.get("/:id", getAdById);
  fastify.delete("/:id", deleteAd);
  fastify.get("/user/:id", getAdsByUserId);
}
module.exports = routes;
