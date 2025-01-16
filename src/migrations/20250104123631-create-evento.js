"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Eventos", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      idLocal: {
        type: Sequelize.UUID,
        references: {
          model: "Locals",
          key: "id",
        },
      },
      idCategoria: {
        type: Sequelize.UUID,
        references: {
          model: "Categoria",
          key: "id",
        },
      },
      idUsuario: {
        type: Sequelize.UUID,
        references: {
          model: "Usuarios",
          key: "id",
        },
      },
      nome: {
        type: Sequelize.STRING,
      },
      descricao: {
        type: Sequelize.STRING,
      },
      inicio: {
        type: Sequelize.DATE,
      },
      fim: {
        type: Sequelize.DATE,
      },
      endereco: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Eventos");
  },
};
