import { sequelize } from "../config/db.js";
import User from "../models/User.js";

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Resets the DB before tests
});

afterAll(async () => {
  await sequelize.close(); // Closes DB connection after tests
});
