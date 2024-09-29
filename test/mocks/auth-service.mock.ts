export const authServiceMock = {
  register: jest.fn(),
  hashPassword: jest.fn((password: string) => Promise.resolve(password)),
  login: jest.fn(() => Promise.resolve('token')),
  comparePasswords: jest.fn(
    (password: string, hash: string) => password === hash,
  ),
};
