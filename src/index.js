const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");
const cors = require("@fastify/cors");
require("dotenv").config();

//! Importing routes
const authRoutes = require("./routes/auth.routes");
fastify.get("/", (req, reply) => {
  reply.send("This is the api of motoshop.uz. Welcome!!!");
});

//! Connecting to database
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.error(`This happened: ${error}`));

//! Starting server
fastify.register(cors);
fastify.register(authRoutes, { prefix: "/api/v0/auth" });
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