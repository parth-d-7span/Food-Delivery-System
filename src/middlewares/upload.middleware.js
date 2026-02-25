const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");

// console.log("Cloudinary config:", cloudinary.config());

const storage = new CloudinaryStorage({

  cloudinary,

  params: {

    folder: "food-delivery/menu",

    allowed_formats: ["jpg", "png", "jpeg", "webp"],

  },

});

const upload = multer({ storage });

module.exports = upload;