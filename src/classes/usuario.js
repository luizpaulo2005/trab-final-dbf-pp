"use strict";
const { Usuario } = require("../models");
const { HashPasswordStrategy } = require("../strategies/hash-password");

class UsuarioBuilder {
  constructor() {
    this.usuario = {};
  }

  setNome(nome) {
    this.usuario.nome = nome;
    return this;
  }

  setEmail(email) {
    this.usuario.email = email;
    return this;
  }

  async setSenha(senha) {
    this.usuario.senha = await new HashPasswordStrategy().execute(senha);
    return this;
  }

  async build() {
    await Usuario.create({
      nome: this.usuario.nome,
      email: this.usuario.email,
      senha: this.usuario.senha,
    });

    return this.usuario;
  }
}

module.exports = { UsuarioBuilder };
