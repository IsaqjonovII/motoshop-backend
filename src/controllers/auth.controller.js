const bcrypt = require("bcrypt");
const User = require("../models/auth.model");

async function createUser(req, reply) {
  try {
    const { name, phone, password } = req.body;
    const existingUser = await User.findOne({ phone });
    console.log("Creating user" + req.body.phone);
    console.log("Request Payload:", req.body);

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
        message: "Bu telefon raqam/parol bilan foydalanuvchi topilmadi",
      });
    }
    reply.send({ message: "Tizimga kirildi", user });
  } catch (error) {
    reply.send({ message: "Serverda xatolik", error });
  }
}
async function getUserById(req, reply) {
  try {
    const user = await User.findById(req.params.id);
    reply.send(user);
  } catch (error) {
    reply.status(500).send(error);
  }
}
async function updateUser(req, reply) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
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
module.exports = {
  createUser,
  loginUser,
  getUserById,
  updateUser,
  getAllUsers,
};