const util = require("util");
const multer = require("multer");

//const maxSize = 2 * 1024 * 1024;

const fileFolder = "/resources/static/assets/uploads";

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__basedir}${fileFolder}`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  // storage: storage,
  storage,
  //limits: { fileSize: maxSize },
}).single("upload");

let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;
