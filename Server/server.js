const cors = require("cors");
const express = require("express");
const app = express();

global.__basedir = __dirname;
const PORT = 5500;

app.use(express.static("../Client"));

const corsOptions = {
  origin: `http://localhost:${PORT}`,
};

app.use(cors(corsOptions));

const initRoutes = require("./src/routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

app.listen(PORT, () => {
  console.log(`Running at localhost:${PORT}`);
});
