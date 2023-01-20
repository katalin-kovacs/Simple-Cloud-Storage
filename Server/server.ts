//common js style imports
// const cors = require("cors");
// const express = require("express");

//es6 imports
import cors, { CorsOptions } from "cors";
import express from "express";
import initRoutes from "./src/routes";

const app = express();
const PORT = 5500;

app.use(express.static("../Client/"));

const corsOptions: CorsOptions = {
  origin: `http://localhost:${PORT}`,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

app.listen(PORT, () => {
  console.log(`Running at localhost:${PORT}`);
});
