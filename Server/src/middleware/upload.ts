import util from "util";
import multer from "multer";

//const maxSize = 2 * 1024 * 1024;

const fileFolder = "/resources/static/assets/uploads";

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${process.cwd()}${fileFolder}`);
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

export default uploadFileMiddleware;
