import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Movie = sequelize.define('Movie', {
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
  },
  release_date: {
    type: DataTypes.DATE,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

export default Movie;
