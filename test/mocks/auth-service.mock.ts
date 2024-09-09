export const authServiceMock = {
  register: jest.fn(),
  hashPassword: jest.fn(password => Promise.resolve(password)),
  login: jest.fn(user => Promise.resolve({ token: 'token', user })),
};
