const { Participante } = require("../models");

class ParticipanteBuilder {
  constructor() {
    this.participante = {};
  }

  setIdCliente(idCliente) {
    this.participante.idCliente = idCliente;
    return this;
  }

  setIdEvento(idEvento) {
    this.participante.idEvento = idEvento;
    return this;
  }

  async build() {
    await Participante.create({
      idCliente: this.participante.idCliente,
      idEvento: this.participante.idEvento,
    });

    return this.participante;
  }
}

module.exports = { ParticipanteBuilder };