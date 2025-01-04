'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Local);
      this.hasOne(models.Categoria);
      this.hasOne(models.Usuario);
      this.hasMany(models.Participante);
    }
  }
  Evento.init({
    id: DataTypes.UUID,
    idLocal: DataTypes.UUID,
    idCategoria: DataTypes.UUID,
    idUsuario: DataTypes.UUID,
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    inicio: DataTypes.DATE,
    fim: DataTypes.DATE,
    endereco: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Evento',
  });
  return Evento;
};