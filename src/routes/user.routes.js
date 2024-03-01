const {
  getAdsByUserId,
  getLikedAdsByUser,
  getLastViewedAds,
} = require("../controllers/user.controller");

async function routes(fastify, _) {
  fastify.get("/ads-by-user", getAdsByUserId);
  fastify.get("/liked-ads", getLikedAdsByUser);
  fastify.get("/viewed-ads", getLastViewedAds);
}

module.exports = routes;
