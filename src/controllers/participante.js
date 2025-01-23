"use strict";
const { Participante, Cliente, Evento } = require("../models");
const { ParticipanteBuilder } = require("../classes/participante.js");

const getParticipantes = async (req, res) => {
  try {
    const participantes = await Participante.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.render("participante", { participantes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getParticipante = async (req, res) => {
  try {
    const { id } = req.params;
    const participante = await Participante.findByPk(id);

    if (!participante) {
      return res.status(404).json({ error: "Participante não encontrado" });
    }

    return res.render("participante/detalhes", { participante });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createParticipante = async (req, res) => {
  try {
    const { idCliente, idEvento } = req.body;

    await new ParticipanteBuilder()
      .setIdCliente(idCliente)
      .setIdEvento(idEvento)
      .build();

    return res.redirect("/participante");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createParticipanteView = async (req, res) => {
  try {
    const eventos = await Evento.findAll();
    const clientes = await Cliente.findAll();

    return res.render("participante/cadastrar", { eventos, clientes });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateParticipante = async (req, res) => {
  try {
    const { id } = req.params;
    const { idCliente, idEvento } = req.body;

    const participantee = await Participante.findByPk(id);

    if (!participantee) {
      return res.status(404).json({ error: "Participante não encontrado" });
    }

    await Participante.update(
      { idCliente, idEvento },
      { where: { id: participantee.id } }
    );

    return res
      .status(200)
      .json({ message: "Participante atualizado com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateParticipanteView = async (req, res) => {
  try {
    const { id } = req.params;
    const participante = await Participante.findByPk(id);
    const eventos = await Evento.findAll();
    const clientes = await Cliente.findAll();

    if (!participante) {
      return res.status(404).json({ error: "Participante não encontrado" });
    }

    return res.render("participante/editar", {
      participante,
      eventos,
      clientes,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteParticipante = async (req, res) => {
  try {
    const { id } = req.params;

    const participante = await Participante.findByPk(id);

    if (!participante) {
      return res.status(404).json({ error: "Participante não encontrado" });
    }

    Participante.destroy({ where: { id: participante.id } });

    return res
      .status(200)
      .json({ message: "Participante deletado com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getParticipantes,
  getParticipante,
  createParticipante,
  createParticipanteView,
  updateParticipante,
  updateParticipanteView,
  deleteParticipante,
};
