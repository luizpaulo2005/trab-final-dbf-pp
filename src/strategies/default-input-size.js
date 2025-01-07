"use strict";
const { z } = require("zod");

class DefaultInputSizeStrategy {
  execute(value, name) {
    return z
      .string()
      .nonempty(`${name} é obrigatório`)
      .min(3, `${name} deve ter no mínimo 3 caracteres`)
      .max(64, `${name} deve ter no máximo 64 caracteres`)
      .parse(value);
  }
}

module.exports = { DefaultInputSizeStrategy };