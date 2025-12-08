const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("reading_lists", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "blogs", key: "id" },
        onDelete: "CASCADE",
      },
      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint("reading_lists", {
      fields: ["user_id", "blog_id"],
      type: "unique",
      name: "unique_user_blog",
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("reading_lists");
  },
};
