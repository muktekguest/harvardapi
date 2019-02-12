require("dotenv").config();

const express = require("express");
const cors = require("cors");
const ODM = require("mongoose");
const logger = require("morgan");

const api = require("./src/routes/api");

const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

ODM.connect(MONGODB_URI, {
  useNewUrlParser: true
});

ODM.connection.on("connected", () => {
  const msg = {
    success: true,
    host: "mLab"
  };

  console.log(JSON.stringify(msg, null, 2));
});

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

app.use("/api/v1", api);

app.listen(PORT, () => {
  console.log(`Harvard API running on PORT: ${ PORT }`);
});
