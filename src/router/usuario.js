'use strict';
const {
  createUsuario,
  deleteUsuario,
  getUsuario,
  getUsuarios,
  updateUsuario,
  createUsuarioView,
  updateUsuarioView,
} = require('../controllers/usuario.js');
const { Router } = require('express');

const usuarioRouter = Router();

usuarioRouter.get('/', getUsuarios);
usuarioRouter.post('/', createUsuario);
usuarioRouter.get('/cadastrar', createUsuarioView);
usuarioRouter.get('/buscar', getUsuarios);
usuarioRouter.get('/editar/:id', updateUsuarioView);
usuarioRouter.get('/:id', getUsuario);
usuarioRouter.put('/:id', updateUsuario);
usuarioRouter.delete('/:id', deleteUsuario);

module.exports = { usuarioRouter };
