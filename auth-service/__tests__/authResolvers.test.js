// __tests__/authResolvers.test.js
import { jest } from '@jest/globals';

// ✅ Use unstable_mockModule for ES module mocking
await jest.unstable_mockModule('../models/User.js', () => ({
  default: {
    findOne: jest.fn()
  }
}));

await jest.unstable_mockModule('jsonwebtoken', () => ({
  default: {
    sign: jest.fn()
  }
}));

// ✅ Now dynamically import everything
const { default: resolvers } = await import('../graphql/resolvers.js');
const { default: User } = await import('../models/User.js');
const { default: jwt } = await import('jsonwebtoken');

describe('Auth Resolvers - login', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return token and user if credentials are valid', async () => {
    const fakeUser = {
      id: '123',
      email: 'test@example.com',
      role: 'resident',
      matchPassword: jest.fn().mockResolvedValue(true),
    };

    User.findOne.mockResolvedValue(fakeUser);
    jwt.sign.mockReturnValue('mocked-token');

    const result = await resolvers.Mutation.login(null, {
      email: 'test@example.com',
      password: 'password123',
    });

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(fakeUser.matchPassword).toHaveBeenCalledWith('password123');
    expect(jwt.sign).toHaveBeenCalled();
    expect(result).toEqual({ token: 'mocked-token', user: fakeUser });
  });

  it('should throw error if user is not found', async () => {
    User.findOne.mockResolvedValue(null);

    await expect(
      resolvers.Mutation.login(null, {
        email: 'wrong@example.com',
        password: 'whatever',
      })
    ).rejects.toThrow('Invalid credentials.');
  });

  it('should throw error if password does not match', async () => {
    const fakeUser = {
      matchPassword: jest.fn().mockResolvedValue(false),
    };

    User.findOne.mockResolvedValue(fakeUser);

    await expect(
      resolvers.Mutation.login(null, {
        email: 'test@example.com',
        password: 'wrongpassword',
      })
    ).rejects.toThrow('Invalid credentials.');
  });
});
