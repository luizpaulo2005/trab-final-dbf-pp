"use strict";
const { Usuario } = require("../models");
const { UsuarioBuilder } = require("../classes/usuario.js");
const {
  DefaultInputSizeStrategy,
} = require("../strategies/default-input-size");
const { EmailInputStrategy } = require("../strategies/email-input.js");

const getUsuarios = async (req, res) => {
  try {
    return res
      .status(200)
      .json(await Usuario.findAll({ order: [["createdAt", "DESC"]] }));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const getUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    new DefaultInputSizeStrategy().execute(nome, "Nome", false, 3, 64);
    new DefaultInputSizeStrategy().execute(email, "Email", false, 3, 64);
    new DefaultInputSizeStrategy().execute(senha, "Senha", false, 6, 64);

    new EmailInputStrategy().execute(email);

    const usuario = await new UsuarioBuilder().setSenha(senha)

    await usuario.setNome(nome).setEmail(email).build();

    return res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;

    new DefaultInputSizeStrategy().execute(nome, "Nome", true, 3, 64);
    new DefaultInputSizeStrategy().execute(email, "Email", true, 3, 64);

    if (email) {
      new EmailInputStrategy().execute(email);
    }

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    Usuario.update(
      {
        nome: nome || usuario.nome,
        email: email || usuario.email,
      },
      { where: { id: usuario.id } }
    );

    return res.status(200).json({ message: "Usuário atualizado com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    Usuario.destroy({ where: { id: usuario.id } });

    return res.status(200).json({ message: "Usuario deletado com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUsuario,
  deleteUsuario,
  getUsuario,
  getUsuarios,
  updateUsuario,
};
