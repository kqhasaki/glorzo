import { DataTypes, Model } from "sequelize";
import { sequelize } from "./connection";

export class Song extends Model {}

Song.init(
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
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pictureUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    audioUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uploader: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sha256: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Song",
  }
);
