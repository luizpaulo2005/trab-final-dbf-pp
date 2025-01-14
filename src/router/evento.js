"use strict";
const {
  createEvento,
  getEvento,
  getEventos,
  updateEvento,
  deleteEvento,
} = require("../controllers/evento");
const { Router } = require("express");

const eventoRouter = Router();

eventoRouter.get("/", getEventos);
eventoRouter.get("/:id", getEvento);
eventoRouter.post("/", createEvento);
eventoRouter.put("/:id", updateEvento);
eventoRouter.delete("/:id", deleteEvento);

module.exports = { eventoRouter };
