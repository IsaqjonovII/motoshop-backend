const { v2 } = require("cloudinary");

const handleServerError = (reply, error) => {
  console.log(error);
  reply.status(500).send({
    message: "Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring",
    error,
  });
};
async function uploadToCloudinary(imagePath) {
  try {
    const result = await v2.uploader.upload(imagePath, {
      folder: "motoshop",
    });
    return result.url;
  } catch (error) {
    console.error("Rasm yuklanishida xatolik bo'ldi:", error);
    throw error;
  }
}
async function deleteCloudinaryImages(imgs) {
  try {
    const res = await v2.api.delete_resources(imgs);
    return res;
  } catch (error) {
    console.log("Rasmlar o'chirilishida xatolik bo'ldi", error);
    throw error;
  }
}
module.exports = {
  handleServerError,
  uploadToCloudinary,
  deleteCloudinaryImages,
};
