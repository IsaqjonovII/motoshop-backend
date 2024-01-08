const {
  uploadAd,
  deleteAd,
  getAdById,
  getAllAds,
} = require("../controllers/ad.controller");

async function routes(fastify, options) {
  fastify.post("/", uploadAd);
  fastify.get("/", getAllAds);
  fastify.get("/:id", getAdById);
  fastify.delete("/:id", deleteAd);
}
module.exports = routes;
