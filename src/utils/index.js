const { v2 } = require("cloudinary");

const handleServerError = (reply, error) => {
  reply.status(500).send({
    message: "Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring",
    error,
  });
};
async function uploadToCloudinary(imagePath) {
  try {
    const result = await v2.uploader.upload(imagePath);
    return result.url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
}
module.exports = { handleServerError, uploadToCloudinary };
