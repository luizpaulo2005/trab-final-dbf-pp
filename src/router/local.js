"use strict";
const {
  getLocals,
  getLocal,
  createLocal,
  updateLocal,
  deleteLocal,
} = require("../controllers/local.js");
const { Router } = require("express");

const localRouter = Router();

localRouter.get("/", getLocals);
localRouter.get("/:id", getLocal);
localRouter.post("/", createLocal);
localRouter.put("/:id", updateLocal);
localRouter.delete("/:id", deleteLocal);

module.exports = { localRouter };
