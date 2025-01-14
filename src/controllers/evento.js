"use strict";
const { Evento } = require("../models");
const { EventoBuilder } = require("../classes/evento");
const {
  DefaultInputSizeStrategy,
} = require("../strategies/default-input-size.js");

const getEventos = async (req, res) => {
  try {
    return res
      .status(200)
      .json(await Evento.findAll({ order: [["createdAt", "DESC"]] }));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const evento = await Evento.findByPk(id);

    if (!evento) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    return res.status(200).json(evento);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createEvento = async (req, res) => {
  try {
    const {
      idLocal,
      idCategoria,
      idUsuario,
      nome,
      descricao,
      inicio,
      fim,
      endereco,
    } = req.body;

    new DefaultInputSizeStrategy().execute(nome, "Nome", false, 3, 64);
    new DefaultInputSizeStrategy().execute(
      descricao,
      "Descrição",
      false,
      3,
      64
    );
    new DefaultInputSizeStrategy().execute(endereco, "Endereço", false, 3, 64);

    await new EventoBuilder()
      .setLocal(idLocal)
      .setCategoria(idCategoria)
      .setUsuario(idUsuario)
      .setNome(nome)
      .setDescricao(descricao)
      .setInicio(inicio)
      .setFim(fim)
      .setEndereco(endereco)
      .build();

    return res.status(201).json({ message: "Evento criado com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateEvento = async (req, res) => {
  try {
    const {
      idLocal,
      idCategoria,
      idUsuario,
      nome,
      descricao,
      inicio,
      fim,
      endereco,
    } = req.body;
    const { id } = req.params;

    new DefaultInputSizeStrategy().execute(nome, "Nome", true, 3, 64);
    new DefaultInputSizeStrategy().execute(descricao, "Descrição", true, 3, 64);
    new DefaultInputSizeStrategy().execute(endereco, "Endereço", true, 3, 64);

    const evento = await Evento.findByPk(id);

    if (!evento) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    Evento.update(
      {
        idLocal: idLocal || evento.idLocal,
        idCategoria: idCategoria || evento.idCategoria,
        idUsuario: idUsuario || evento.idUsuario,
        nome: nome || evento.nome,
        descricao: descricao || evento.descricao,
        inicio: inicio || evento.inicio,
        fim: fim || evento.fim,
        endereco: endereco || evento.endereco,
      },
      { where: { id: evento.id } }
    );

    return res.status(200).json({ message: "Evento atualizado com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteEvento = async (req, res) => {
  try {
    const { id } = req.params;

    const evento = await Evento.findByPk(id);

    if (!evento) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    Evento.destroy({ where: { id: evento.id } });

    return res.status(200).json({ message: "Evento deletado com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getEventos,
  getEvento,
  createEvento,
  updateEvento,
  deleteEvento,
};