const {
  createAd,
  deleteAd,
  getAdById,
  getAllAds,
  getAdsByType,
  getRandomsAds,
  updateAdView,
  getSimilarAdsByType,
  toggleLikeAd
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
}
module.exports = routes;



// fastify.get("/delete-all", deleteAllImages);
// const { v2 } = require("cloudinary");
// async function deleteAllImages(_, reply) {
//   try {
    // const res = await v2.api.delete_resources_by_prefix("motocycles");
//     const publicIds = [];
//     const res = await v2.api.resources();
//     await res.resources.forEach((img) => {
//       publicIds.push(img.public_id);
//     });
//     const folders = await v2.api.resources({
//       type: "upload",
//     });
//     await folders.resources.forEach((img) => {
//       publicIds.push(img.public_id);
//     });
//     const deleted = await v2.api.delete_resources(publicIds);
//     return reply.send(deleted);
//   } catch (error) {
//     return reply.send(error);
//   }
// }
