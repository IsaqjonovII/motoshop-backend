const Ad = require("../models/ad.model");
const User = require("../models/auth.model");
const { handleServerError } = require("../utils");

async function getUserAds(req, reply) {
  try {
    const { ids } = req.query;
    const idsArr = ids.split(",");
    const userAds = await Ad.find({ _id: { $in: idsArr } });
    if (!userAds) {
      return reply.code(404).send({ message: "Sizda e'lonlar mavjud emas" });
    }

    return reply.send(userAds);
  } catch (error) {
    handleServerError(reply, error);
  }
}

module.exports = {
  getUserAds,
};
