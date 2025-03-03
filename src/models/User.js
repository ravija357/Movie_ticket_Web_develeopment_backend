import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { len: [3, 30] }, // ✅ Keep if username length is enforced
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }, // ✅ Validates email format
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, // ❌ Remove the "len" validation here
  },
  resetToken: { 
    type: DataTypes.STRING,
  },
  resetTokenExpiry: { 
    type: DataTypes.BIGINT, // ✅ Use BIGINT for numeric timestamps
    // OR: type: DataTypes.DATE (if you use Date objects in the controller)
  },
}, {
  timestamps: true, // ✅ Adds createdAt/updatedAt automatically
  tableName: 'users', // ✅ Explicit table name
});

export default User;
