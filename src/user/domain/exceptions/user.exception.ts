export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User already exists');
    this.name = 'UserAlreadyExistsError';
  }
}
export class UserUnauthorizedError extends Error {
  constructor() {
    super('User unauthorized');
    this.name = 'UserUnauthorizedError';
  }
}
