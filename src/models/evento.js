"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Evento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Local, { as: "idLocal" });
      this.belongsTo(models.Categoria, { as: "idCategoria" });
      this.belongsTo(models.Usuario, {  as: "idUsuario" });
      this.hasMany(models.Participante);
    }
  }
  Evento.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      nome: DataTypes.STRING,
      descricao: DataTypes.STRING,
      inicio: DataTypes.DATE,
      fim: DataTypes.DATE,
      endereco: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Evento",
    }
  );
  return Evento;
};
