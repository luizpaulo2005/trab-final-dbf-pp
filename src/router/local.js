"use strict";
const {
  getLocals,
  getLocal,
  createLocal,
  createLocalView,
  updateLocal,
  updateLocalView,
  deleteLocal,
} = require("../controllers/local.js");
const { Router } = require("express");

const localRouter = Router();

localRouter.get("/", getLocals);
localRouter.get("/cadastrar", createLocalView);
localRouter.post("/", createLocal);
localRouter.get("/editar/:id", updateLocalView);
localRouter.get("/:id", getLocal);
localRouter.put("/:id", updateLocal);
localRouter.delete("/:id", deleteLocal);

module.exports = { localRouter };
