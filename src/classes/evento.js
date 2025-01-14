"use strict";
const { Evento } = require("../models");

class EventoBuilder {
  constructor() {
    this.evento = {};
  }

  setLocal(idLocal) {
    this.evento.idLocal = idLocal;
    return this;
  }

  setCategoria(idCategoria) {
    this.evento.idCategoria = idCategoria;
    return this;
  }

  setUsuario(idUsuario) {
    this.evento.idUsuario = idUsuario;
    return this;
  }

  setNome(nome) {
    this.evento.nome = nome;
    return this;
  }

  setDescricao(descricao) {
    this.evento.descricao = descricao;
    return this;
  }

  setInicio(inicio) {
    this.evento.inicio = inicio;
    return this;
  }

  setFim(fim) {
    this.evento.fim = fim;
    return this;
  }

  setEndereco(endereco) {
    this.evento.endereco = endereco;
    return this;
  }

  async build() {
    await Evento.create({
      idLocal: this.evento.idLocal,
      idCategoria: this.evento.idCategoria,
      idUsuario: this.evento.idUsuario,
      nome: this.evento.nome,
      descricao: this.evento.descricao,
      inicio: this.evento.inicio,
      fim: this.evento.fim,
      endereco: this.evento.endereco,
    });

    return this.evento;
  }
}

module.exports = { EventoBuilder };
