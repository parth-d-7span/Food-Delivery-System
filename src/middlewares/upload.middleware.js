import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import cloudinary from "../config/cloudinary.js";

// console.log("Cloudinary config:", cloudinary.config());

const storage = new CloudinaryStorage({

  cloudinary,

  params: {

    folder: "food-delivery/menu",

    allowed_formats: ["jpg", "png", "jpeg", "webp"],

  },

});

const upload = multer({ storage });

export default upload;