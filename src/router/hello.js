const { Router } = require("express");
const { getHello } = require("../controllers/hello");

const helloRouter = Router();

helloRouter.get("/", getHello);

module.exports = { helloRouter };
