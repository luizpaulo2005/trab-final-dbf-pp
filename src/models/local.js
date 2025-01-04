'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Local extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Evento)
    }
  }
  Local.init({
    id: DataTypes.UUID,
    cidade: DataTypes.STRING,
    estado: DataTypes.STRING,
    pais: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Local',
  });
  return Local;
};