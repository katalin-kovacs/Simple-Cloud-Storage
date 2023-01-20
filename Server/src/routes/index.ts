import express from "express";
import { Express } from "express-serve-static-core";
import controller from "../controller/file.controller";

const routes = (app: Express): void => {
  const router = express.Router();

  router.get("/list", controller.listFiles);
  router.get("/download/:name", controller.download);
  router.post("/upload", controller.upload);
  router.delete("/remove/:name", controller.remove);

  app.use(router);
};

export default routes;
