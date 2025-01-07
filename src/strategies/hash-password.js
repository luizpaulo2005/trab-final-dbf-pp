"use strict";
const bcrypt = require("bcrypt");

class HashPasswordStrategy {
  async execute(password) {
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }
}

module.exports = { HashPasswordStrategy };