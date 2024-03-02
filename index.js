const fastify = require("fastify")({
  logger: true,
  bodyLimit: 100 * 1024 * 1024,
});
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
const userRoutes = require("./src/routes/user.routes");

fastify.get("/", (_, reply) => {
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
fastify.register(userRoutes, { prefix: "/api/v0/user" });

(() => {
  try {
    //  
    fastify.listen(
      { port: process.env.PORT || 8000, host: "0.0.0.0"},
      function (err, address) {
        if (err) {
          fastify.log.error(err);
          process.exit(1);
        }
        fastify.log.info(`Server is now listening on ${address}`);
      }
    );
  } catch (error) {
    fastify.log.error(error);
  }
})();
