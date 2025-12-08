const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blogs", "year", {
      type: DataTypes.INTEGER,
      allowNull: true, // allow null so old blogs still work
      validate: {}, // note: DB does NOT enforce Sequelize validations
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("blogs", "year");
  },
};
