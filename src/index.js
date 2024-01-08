const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");
const cors = require("@fastify/cors");
require("dotenv").config();
const { v2 } = require("cloudinary");

v2.config({
  cloud_name: "doswy0zdn",
  api_key: "677983342875987",
  api_secret: "V-bvbb1NP77rP5gVg0-ypbAfSF0",
});

//! Importing routes
const authRoutes = require("./routes/auth.routes");
const adRoutes = require("./routes/ad.routes");
fastify.get("/", (req, reply) => {
  reply.send("This is the api of motoshop.uz  Welcome!!!");
});

//! Connecting to database
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.error(`This happened: ${error}`));

//! Starting server
fastify.register(cors);
fastify.register(authRoutes, { prefix: "/api/v0/auth" });
fastify.register(adRoutes, { prefix: "/api/v0/ad" });
(async () => {
  try {
    await fastify.listen(5000);
    fastify.log.info(
      "Server is running on port " + fastify.server.address().port
    );
  } catch (error) {
    fastify.log.error(error);
  }
})();
