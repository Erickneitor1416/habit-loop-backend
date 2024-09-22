export const authServiceMock = {
  register: jest.fn(),
  hashPassword: jest.fn(password => Promise.resolve(password)),
  login: jest.fn(() => Promise.resolve('token')),
  comparePasswords: jest.fn((password, hash) => password === hash),
};
