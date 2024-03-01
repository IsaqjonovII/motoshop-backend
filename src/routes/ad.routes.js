const {
  createAd,
  deleteAd,
  getAdById,
  getAllAds,
  getAdsByType,
  getRandomsAds,
  updateAdView,
  updateAdLike,
  removeAdLike,
  getSimilarAdsByType,
} = require("../controllers/ad.controller");

async function routes(fastify, _) {
  fastify.post("/", createAd);
  fastify.get("/", getAllAds);
  fastify.get("/:id", getAdById);
  fastify.delete("/:id", deleteAd);
  fastify.get("/ads-by-type", getAdsByType);
  fastify.get("/random-ads", getRandomsAds);
  fastify.post("/update-view", updateAdView);
  fastify.post("/add-like", updateAdLike);
  fastify.post("/remove-like", removeAdLike);
  fastify.get("/similar-ads", getSimilarAdsByType);
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
