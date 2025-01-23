const { Router } = require("express");
const {
  createParticipante,
  createParticipanteView,
  deleteParticipante,
  getParticipante,
  getParticipantes,
  updateParticipante,
  updateParticipanteView,
} = require("../controllers/participante.js");

const participanteRouter = Router();

participanteRouter.get("/", getParticipantes);
participanteRouter.get("/cadastrar", createParticipanteView);
participanteRouter.post("/", createParticipante);
participanteRouter.get("/editar/:id", updateParticipanteView);
participanteRouter.get("/:id", getParticipante);
participanteRouter.put("/:id", updateParticipante);
participanteRouter.delete("/:id", deleteParticipante);

module.exports = { participanteRouter };
