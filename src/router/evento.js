"use strict";
const {
  createEvento,
  getEvento,
  getEventos,
  updateEvento,
  deleteEvento,
  createEventoView,
  updateEventoView,
} = require("../controllers/evento");
const { Router } = require("express");

const eventoRouter = Router();

eventoRouter.get("/", getEventos);
eventoRouter.get("/cadastrar", createEventoView);
eventoRouter.post("/", createEvento);
eventoRouter.get("/editar/:id", updateEventoView);
eventoRouter.get("/:id", getEvento);
eventoRouter.put("/:id", updateEvento);
eventoRouter.delete("/:id", deleteEvento);

module.exports = { eventoRouter };
