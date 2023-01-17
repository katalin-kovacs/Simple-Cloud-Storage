const express = require("express");
const router = express.Router();

const controller = require("../controller/file.controller");

let routes = (app) => {
  router.get("/list", controller.listFiles);
  router.get("/download/:name", controller.download);
  router.post("/upload", controller.upload);
  router.delete("/remove/:name", controller.remove);

  app.use(router);
};

module.exports = routes;
