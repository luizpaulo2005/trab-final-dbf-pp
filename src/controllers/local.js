"use strict";
const { Local } = require("../models");
const { LocalBuilder } = require("../classes/local.js");
const {
  DefaultInputSizeStrategy,
} = require("../strategies/default-input-size.js");

const getLocals = async (req, res) => {
  try {
    const locais = await Local.findAll({ order: [["createdAt", "DESC"]] });

    return res.render("local", { locais });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getLocal = async (req, res) => {
  try {
    const { id } = req.params;
    const local = await Local.findByPk(id);

    if (!local) {
      return res.status(404).json({ error: "Local não encontrado" });
    }

    return res.status(200).json(local);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createLocal = async (req, res) => {
  try {
    const { cidade, estado, pais } = req.body;

    new DefaultInputSizeStrategy().execute(cidade, "Cidade", false, 3, 64);
    new DefaultInputSizeStrategy().execute(estado, "Estado", false, 2, 2);
    new DefaultInputSizeStrategy().execute(pais, "País", false, 3, 64);

    await new LocalBuilder()
      .setCidade(cidade)
      .setEstado(estado)
      .setPais(pais)
      .build();

    // return res.status(201).json({ message: "Local criado com sucesso" });
    return res.redirect("/local");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createLocalView = async (req, res) => {
  try {
    return res.render("local/cadastrar");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateLocal = async (req, res) => {
  try {
    const { id } = req.params;
    const { cidade, estado, pais } = req.body;

    new DefaultInputSizeStrategy().execute(cidade, "Cidade", true, 3, 64);
    new DefaultInputSizeStrategy().execute(estado, "Estado", true, 2, 2);
    new DefaultInputSizeStrategy().execute(pais, "País", true, 3, 64);

    const local = await Local.findByPk(id);

    if (!local) {
      return res.status(404).json({ error: "Local não encontrado" });
    }

    await Local.update(
      {
        cidade: cidade || local.cidade,
        estado: estado || local.estado,
        pais: pais || local.pais,
      },
      { where: { id: local.id } }
    );

    return res.status(200).json({ message: "Local atualizado com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteLocal = async (req, res) => {
  try {
    const { id } = req.params;
    const local = await Local.findByPk(id);

    if (!local) {
      return res.status(404).json({ error: "Local não encontrado" });
    }

    await Local.destroy({ where: { id: local.id } });

    return res.status(200).json({ message: "Local deletado com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createLocal,
  createLocalView,
  deleteLocal,
  getLocal,
  getLocals,
  updateLocal,
};
