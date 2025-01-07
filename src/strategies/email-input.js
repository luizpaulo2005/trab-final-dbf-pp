"use strict";
const { z } = require("zod");

class EmailInputStrategy {
  execute(value) {
    return z.string().email().parse(value);
  }
}

module.exports = { EmailInputStrategy };
