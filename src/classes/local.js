const { Local } = require("../models");

class LocalBuilder {
  constructor() {
    this.local = {};
  }

  setCidade(cidade) {
    this.local.cidade = cidade;
    return this;
  }

  setEstado(estado) {
    this.local.estado = estado;
    return this;
  }

  setPais(pais) {
    this.local.pais = pais;
    return this;
  }

  async build() {
    await Local.create({
      cidade: this.local.cidade,
      estado: this.local.estado,
      pais: this.local.pais,
    });

    return this.local;
  }
}

module.exports = { LocalBuilder };
