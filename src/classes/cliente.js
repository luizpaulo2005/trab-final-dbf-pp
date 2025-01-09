"use strict";
const { Cliente } = require("../models");

class ClienteBuilder {
  constructor() {
    this.cliente = {};
  }

  setNome(nome) {
    this.cliente.nome = nome;
    return this;
  }

  setEmail(email) {
    this.cliente.email = email;
    return this;
  }

  setTelefone(telefone) {
    this.cliente.telefone = telefone;
    return this;
  }

  async build() {
    await Cliente.create({
        nome: this.cliente.nome,
        email: this.cliente.email,
        telefone: this.cliente.telefone,
    })

    return this.cliente;
  }
}

module.exports = { ClienteBuilder };
