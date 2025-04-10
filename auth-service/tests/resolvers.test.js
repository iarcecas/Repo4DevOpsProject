import resolvers from '/graphql/resolvers.js';
import User from '/models/User.js';
import jwt from 'jsonwebtoken';

jest.mock('../models/User.js', () => ({
  findOne: jest.fn(),
  save: jest.fn().mockResolvedValue(true)
}));
User.prototype.save = jest.fn().mockResolvedValue(true);
User.prototype.matchPassword = jest.fn();

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mock_jwt_token'),
}));

describe('Auth Resolvers', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Mutation: signup', () => {
    it('should signup a new user successfully', async () => {
      User.findOne.mockResolvedValueOnce(null).mockResolvedValueOnce(null);
      const mockUserInstance = { id: '123', email: 'test@example.com', role: 'resident', save: User.prototype.save };

      const args = { username: 'testuser', email: 'test@example.com', password: 'password123', role: 'resident' };
      const result = await resolvers.Mutation.signup(null, args);

      expect(User.findOne).toHaveBeenCalledTimes(2);
      expect(jwt.sign).toHaveBeenCalled();
      expect(result).toHaveProperty('token', 'mock_jwt_token');
      expect(result).toHaveProperty('user');
    });

    it('should throw error if email exists', async () => {
      User.findOne.mockResolvedValueOnce({ email: 'test@example.com' });

      const args = { username: 'testuser', email: 'test@example.com', password: 'password123', role: 'resident' };

      await expect(resolvers.Mutation.signup(null, args)).rejects.toThrow('User already exists with that email.');
    });

     it('should throw error if username exists', async () => {
      User.findOne.mockResolvedValueOnce(null).mockResolvedValueOnce({ username: 'testuser' });

      const args = { username: 'testuser', email: 'test@example.com', password: 'password123', role: 'resident' };

      await expect(resolvers.Mutation.signup(null, args)).rejects.toThrow('Username is already taken.');
    });

    it('should throw error if role is invalid', async () => {
      User.findOne.mockResolvedValueOnce(null).mockResolvedValueOnce(null);

      const args = { username: 'testuser', email: 'test@example.com', password: 'password123', role: 'invalid_role' };

      await expect(resolvers.Mutation.signup(null, args)).rejects.toThrow('Invalid role specified.');
    });

  });

  describe('Mutation: login', () => {
     it('should login a user successfully', async () => {
        const mockUser = {
           id: '123',
           email: 'test@example.com',
           role: 'resident',
           matchPassword: jest.fn().mockResolvedValue(true) 
        };
        User.findOne.mockResolvedValue(mockUser);

        const args = { email: 'test@example.com', password: 'password123' };
        const result = await resolvers.Mutation.login(null, args);

        expect(User.findOne).toHaveBeenCalledWith({ email: args.email });
        expect(mockUser.matchPassword).toHaveBeenCalledWith(args.password);
        expect(jwt.sign).toHaveBeenCalled();
        expect(result).toHaveProperty('token', 'mock_jwt_token');
        expect(result).toHaveProperty('user', mockUser);
     });

     it('should throw error if user not found', async () => {
        User.findOne.mockResolvedValue(null);

        const args = { email: 'test@example.com', password: 'password123' };

        await expect(resolvers.Mutation.login(null, args)).rejects.toThrow('Invalid credentials.');
     });

     it('should throw error if password does not match', async () => {
        const mockUser = {
           id: '123',
           email: 'test@example.com',
           role: 'resident',
           matchPassword: jest.fn().mockResolvedValue(false)
        };
        User.findOne.mockResolvedValue(mockUser);

        const args = { email: 'test@example.com', password: 'wrongpassword' };

        await expect(resolvers.Mutation.login(null, args)).rejects.toThrow('Invalid credentials.');
        expect(mockUser.matchPassword).toHaveBeenCalledWith(args.password);
     });
  });

});
