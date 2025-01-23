"use strict";
const {
  createCliente,
  deleteCliente,
  getCliente,
  getClientes,
  updateCliente,
  createClienteView,
  updateClienteView,
} = require("../controllers/cliente");
const { Router } = require("express");

const clienteRouter = Router();

clienteRouter.get("/", getClientes);
clienteRouter.post("/", createCliente);
clienteRouter.get("/cadastrar", createClienteView);
clienteRouter.get("/buscar", getClientes);
clienteRouter.get("/editar/:id", updateClienteView);
clienteRouter.get("/:id", getCliente);
clienteRouter.put("/:id", updateCliente);
clienteRouter.delete("/:id", deleteCliente);

module.exports = { clienteRouter };
