"use strict";
const { Categoria } = require("../models");
const { CategoriaBuilder } = require("../classes/categoria.js");
const {
  DefaultInputSizeStrategy,
} = require("../strategies/default-input-size.js");

const getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.render("categoria", { categorias });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    return res.status(200).json(categoria);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createCategoria = async (req, res) => {
  try {
    const { tipo } = req.body;

    new DefaultInputSizeStrategy().execute(tipo, "Tipo", false, 3, 64);

    await new CategoriaBuilder().setTipo(tipo).build();

    // return res.status(201).json({ message: "Categoria criada com sucesso" });
    return res.redirect("/categoria");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createCategoriaView = async (req, res) => {
  try {
    return res.render("categoria/cadastrar");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo } = req.body;

    new DefaultInputSizeStrategy().execute(tipo, "Tipo", false, 3, 64);

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    Categoria.update({ tipo }, { where: { id: categoria.id } });

    return res
      .status(200)
      .json({ message: "Categoria atualizada com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    Categoria.destroy({ where: { id: categoria.id } });

    return res.status(200).json({ message: "Categoria deletada com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCategoria,
  createCategoriaView,
  deleteCategoria,
  getCategoria,
  getCategorias,
  updateCategoria,
};
