"use strict";
const { z } = require("zod");
const { Categoria } = require("../models");
const { CategoriaBuilder } = require("../classes/categoria.js")

const getCategorias = async (req, res) => {
  try {
    return res
      .status(200)
      .json(await Categoria.findAll({ order: [["createdAt", "DESC"]] }));
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

const createCategoriaSchema = z.object({
  tipo: z
    .string()
    .nonempty("Tipo é obrigatório")
    .min(3, "O tipo deve ter no mínimo 3 caracteres")
    .max(64, "O tipo deve ter no máximo 64 caracteres"),
});

const createCategoria = async (req, res) => {
  try {
    const { tipo } = createCategoriaSchema.parse(req.body);

    await new CategoriaBuilder().setTipo(tipo).build();

    return res.status(201).json({ message: "Categoria criada com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateCategoriaSchema = z.object({
  tipo: z
    .string()
    .nonempty("Tipo é obrigatório")
    .min(3, "O tipo deve ter no mínimo 3 caracteres")
    .max(64, "O tipo deve ter no máximo 64 caracteres"),
});

const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo } = updateCategoriaSchema.parse(req.body);

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
  deleteCategoria,
  getCategoria,
  getCategorias,
  updateCategoria,
};
