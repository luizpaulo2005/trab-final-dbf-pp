"use strict";
const { Cliente } = require("../models");
const { ClienteBuilder } = require("../classes/cliente");
const {
  DefaultInputSizeStrategy,
} = require("../strategies/default-input-size.js");

const getClientes = async (req, res) => {
  try {
    const { nome } = req.query;

    const clientes = await Cliente.findAll({ order: [["createdAt", "DESC"]] });

    if (nome) {
      const filteredClientes = clientes.filter(
        (cliente) => cliente.nome.toLowerCase().includes(nome.toLowerCase())
      );

      return res.render("cliente", { clientes: filteredClientes });
    }

    return res.render("cliente", { clientes });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    return res.render("cliente/detalhes", { cliente });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createCliente = async (req, res) => {
  try {
    const { nome, email, telefone } = req.body;

    new DefaultInputSizeStrategy().execute(nome, "Nome", false, 3, 64);
    new DefaultInputSizeStrategy().execute(email, "Email", false, 3, 64);
    new DefaultInputSizeStrategy().execute(telefone, "Telefone", false, 3, 64);

    await new ClienteBuilder()
      .setNome(nome)
      .setEmail(email)
      .setTelefone(telefone)
      .build();

    // return res.status(201).json({ message: "Cliente criado com sucesso" });
    return res.redirect("/cliente");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createClienteView = async (req, res) => {
  try {
    return res.render("cliente/cadastrar");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;

    new DefaultInputSizeStrategy().execute(nome, "Nome", true, 3, 64);
    new DefaultInputSizeStrategy().execute(email, "Email", true, 3, 64);
    new DefaultInputSizeStrategy().execute(telefone, "Telefone", true, 3, 64);

    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    await cliente.update({ nome, email, telefone });

    return res.status(200).json({ message: "Cliente atualizado com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateClienteView = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    return res.render("cliente/editar", { cliente });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    await cliente.destroy();

    return res.status(200).json({ message: "Cliente deletado com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCliente,
  createClienteView,
  deleteCliente,
  getCliente,
  getClientes,
  updateCliente,
  updateClienteView,
};
