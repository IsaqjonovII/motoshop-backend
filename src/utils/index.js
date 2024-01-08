const handleServerError = (reply, error) => {
  reply.status(500).send({
    message: "Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring",
    error,
  });
};
async function uploadToCloudinary(imagePath) {
  try {
    const result = await cloudinary.uploader.upload(imagePath);
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
}
module.exports = { handleServerError, uploadToCloudinary };
