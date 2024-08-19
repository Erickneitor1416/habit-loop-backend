import { userFactory } from 'test/factories/user/user.factory';

describe('User', () => {
  it('should be defined', () => {
    expect(userFactory()).toBeDefined();
  });
});
