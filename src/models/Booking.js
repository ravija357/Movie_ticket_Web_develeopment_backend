import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';
import Movie from './Movie.js';

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  movie_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Movie,
      key: 'id',
    },
    allowNull: false,
  },
  seats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

export default Booking;
