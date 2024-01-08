const {
  createUser,
  loginUser,
  getUserById,
  updateUser,
  getAllUsers,
} = require("../controllers/auth.controller");

async function routes(fastify, options) {
  fastify.post("/", createUser);
  fastify.post("/login", loginUser);
  fastify.get("/:id", getUserById);
  fastify.put("/:id", updateUser);
  fastify.get("/", getAllUsers);

  // fastify.delete("/:id", deleteUser);
}
module.exports = routes;
