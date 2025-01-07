"use strict";
const { z } = require("zod");

class DefaultInputSizeStrategy {
  execute(value, name, optional, min, max) {
    if (optional) {
      return z
        .string()
        .optional()
        .or(
          z
            .string()
            .nonempty(`${name} é obrigatório`)
            .min(min, `${name} deve ter no mínimo ${min} caracteres`)
            .max(max, `${name} deve ter no máximo ${max} caracteres`)
        )
        .parse(value);
    }

    return z
      .string()
      .nonempty(`${name} é obrigatório`)
      .min(min, `${name} deve ter no mínimo ${min} caracteres`)
      .max(max, `${name} deve ter no máximo ${max} caracteres`)
      .parse(value);
  }
}

module.exports = { DefaultInputSizeStrategy };
