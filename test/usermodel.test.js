import { sequelize } from "../src/config/db.js"; // Adjust path if needed
import User from "../src/models/User.js"; // Adjust path if needed

// Optional: Mock the database connection in case you don’t want to use a real database
jest.mock('../src/config/db.js', () => ({
  sequelize: {
    authenticate: jest.fn().mockResolvedValue('Connection successful'),
  },
}));

beforeAll(async () => {
  await sequelize.authenticate(); // Ensures the connection works
});

afterAll(async () => {
  await sequelize.close(); // Closes the connection after tests are done
});

describe('User Model', () => {
  it('should create a new user', async () => {
    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });
    expect(user).toHaveProperty('id');
    expect(user.username).toBe('testuser');
    expect(user.email).toBe('test@example.com');
  });

  it('should find a user by email', async () => {
    const user = await User.create({
      username: 'findUser',
      email: 'find@example.com',
      password: 'password123',
    });
    const foundUser = await User.findOne({
      where: { email: 'find@example.com' },
    });
    expect(foundUser).not.toBeNull();
    expect(foundUser.email).toBe('find@example.com');
  });

  it('should update a user\'s username', async () => {
    const user = await User.create({
      username: 'oldUsername',
      email: 'update@example.com',
      password: 'password123',
    });
    await user.update({ username: 'newUsername' });
    expect(user.username).toBe('newUsername');
  });

  it('should delete a user', async () => {
    const user = await User.create({
      username: 'deleteUser',
      email: 'delete@example.com',
      password: 'password123',
    });
    const userId = user.id;
    await user.destroy();
    const deletedUser = await User.findOne({
      where: { id: userId },
    });
    expect(deletedUser).toBeNull();
  });

  it('should validate username length and email format', async () => {
    // Test invalid username length
    await expect(
      User.create({
        username: 'ab',
        email: 'test@invalid.com',
        password: 'password123',
      })
    ).rejects.toThrowError('Validation error: Validation len on username failed');

    // Test invalid email format
    await expect(
      User.create({
        username: 'validuser',
        email: 'invalidemail',
        password: 'password123',
      })
    ).rejects.toThrowError('Validation error: Validation isEmail on email failed');
  });
});
