const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");
const cors = require("@fastify/cors");
const { v2 } = require("cloudinary");
require("dotenv").config();

v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//! Importing routes
const authRoutes = require("./src/routes/auth.routes");
const adRoutes = require("./src/routes/ad.routes");
fastify.get("/", (req, reply) => {
  reply.send(
    "This is the api of motoshop.uz. You better to go somewhere nice!!!"
  );
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