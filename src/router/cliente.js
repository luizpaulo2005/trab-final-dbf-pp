"use strict";
const {
  createCliente,
  deleteCliente,
  getCliente,
  getClientes,
  updateCliente,
} = require("../controllers/cliente");
const { Router } = require("express");

const clienteRouter = Router();

clienteRouter.get("/", getClientes);
clienteRouter.get("/:id", getCliente);
clienteRouter.post("/", createCliente);
clienteRouter.put("/:id", updateCliente);
clienteRouter.delete("/:id", deleteCliente);

module.exports = { clienteRouter };
