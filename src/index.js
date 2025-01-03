const express = require("express");
const { env } = require("./lib/env.js");
const morgan = require("morgan");
const cors = require("cors");
const { helloRouter } = require("./router/hello.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.use("/hello", helloRouter);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
