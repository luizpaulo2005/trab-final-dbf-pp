"use strict";
const {
  createCategoria,
  createCategoriaView,
  getCategoria,
  getCategorias,
  updateCategoria,
  updateCategoriaView,
  deleteCategoria,
} = require("../controllers/categoria");
const { Router } = require("express");

const categoriaRouter = Router();

categoriaRouter.get("/", getCategorias);
categoriaRouter.post("/", createCategoria);
categoriaRouter.get("/cadastrar", createCategoriaView);
categoriaRouter.get("/buscar", getCategorias);
categoriaRouter.get("/editar/:id", updateCategoriaView);
categoriaRouter.get("/:id", getCategoria);
categoriaRouter.put("/:id", updateCategoria);
categoriaRouter.delete("/:id", deleteCategoria);

module.exports = { categoriaRouter };
