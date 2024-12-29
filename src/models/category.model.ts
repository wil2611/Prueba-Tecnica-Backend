import { DataTypes, Model } from "sequelize";
import db from "../database/connection";


const Category= db.define("Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "desactive"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    tableName: "categories",
    timestamps: true
  }
);

export default Category;
