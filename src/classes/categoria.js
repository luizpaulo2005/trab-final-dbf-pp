"use strict";
const { Categoria } = require("../models");

class CategoriaBuilder {
  constructor() {
    this.categoria = {};
  }

  setTipo(tipo) {
    this.categoria.tipo = tipo;
    return this;
  }

  async build() {
    await Categoria.create({ tipo: this.categoria.tipo });

    return this.categoria;
  }
}

module.exports = { CategoriaBuilder };
