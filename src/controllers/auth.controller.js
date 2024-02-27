const bcrypt = require("bcrypt");
const User = require("../models/auth.model");
const { handleServerError } = require("../utils");

async function createUser(req, reply) {
  try {
    const { name, phone, password } = req.body;
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      reply.status(401).send({ message: "Bu raqam allaqachon tizimda mavjud" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, phone, password: hashedPassword });
      const result = await newUser.save();
      const userWithoutPassword = { ...result.toObject() };
      delete userWithoutPassword.password;
      reply.send({ message: "Hisob yaratildi", user: userWithoutPassword });
    }
  } catch (error) {
    reply.status(500).send({ message: "Serverda Xatolik", error });
  }
}
async function loginUser(req, reply) {
  try {
    const user = await User.findOne({
      phone: req.body.phone,
    });

    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      reply.status(404).send({
        message: "Bu telefon raqam yoki parol bilan foydalanuvchi topilmadi",
      });
    }
    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;
    reply.send({ message: "Tizimga kirildi", user: userWithoutPassword });
  } catch (error) {
    reply.send({ message: "Serverda xatolik", error });
  }
}
async function getUserById(req, reply) {
  try {
    const { userId } = req.query;
    const user = await User.findById(userId);
    return reply.send(user);
  } catch (error) {
    reply.status(500).send(error);
  }
}
async function updateUser(req, reply) {
  try {
    const { id, name, phone } = req.body;
    const user = await User.findByIdAndUpdate(id, { name, phone }, { new: true });
    reply.send(user);
  } catch (error) {
    reply.status(500).send(error);
  }
}
async function getAllUsers(req, reply) {
  try {
    const users = await User.find();
    reply.send(users);
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function deleteUser(req, reply) {
  try {
    const userId = req.params.id;
    if (!userId) {
      reply.status(404).send({ message: "Bunday foydalanuvchi topilmadi" });
    }
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return reply
        .status(404)
        .send({ message: "Bunday foydalanuvchi topilmadi" });
    }
    reply.send({ message: "Hisob o'chirildi" });
  } catch (error) {
    handleServerError(reply, error);
  }
}
module.exports = {
  createUser,
  loginUser,
  getUserById,
  updateUser,
  getAllUsers,
  deleteUser,
};
