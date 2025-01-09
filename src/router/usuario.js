"use strict";
const {
  createUsuario,
  deleteUsuario,
  getUsuario,
  getUsuarios,
  updateUsuario,
} = require("../controllers/usuario.js");
const { Router } = require("express");

const usuarioRouter = Router();

usuarioRouter.get("/", getUsuarios);
usuarioRouter.get("/:id", getUsuario);
usuarioRouter.post("/", createUsuario);
usuarioRouter.put("/:id", updateUsuario);
usuarioRouter.delete("/:id", deleteUsuario);

module.exports = { usuarioRouter };
