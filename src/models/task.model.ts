import { DataTypes } from "sequelize";
import db from "../database/connection";
import User from "./user.model";
import Category from "./category.model";

const Task = db.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM(
      "pending",
      "in progress",
      "review",
      "completed",
      "deleted"
    ),
    allowNull: false,
    defaultValue: "pending",
  },
  assignedUserId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Cambia esto según tu lógica de negocio
    references: {
      model: User,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Cambia esto según tu lógica de negocio
    references: {
      model: Category,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
}, {
  tableName: "tasks",
  timestamps: true,
});

// Relaciones
Task.belongsTo(User, { foreignKey: "assignedUserId", as: "assignedUser" });
Task.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

export default Task;
