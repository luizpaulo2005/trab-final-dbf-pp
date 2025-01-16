"use strict";
const {
  createCategoria,
  createCategoriaView,
  getCategoria,
  getCategorias,
  updateCategoria,
  deleteCategoria,
} = require("../controllers/categoria");
const { Router } = require("express");

const categoriaRouter = Router();

categoriaRouter.get("/", getCategorias);
categoriaRouter.get("/cadastrar", createCategoriaView);
categoriaRouter.get("/:id", getCategoria);
categoriaRouter.post("/", createCategoria);
categoriaRouter.put("/:id", updateCategoria);
categoriaRouter.delete("/:id", deleteCategoria);

module.exports = { categoriaRouter };
