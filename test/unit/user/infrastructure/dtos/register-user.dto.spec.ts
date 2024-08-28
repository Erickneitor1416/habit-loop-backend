import { RegisterUserDto } from '../../../../../src/user/infrastructure/dtos/register-user.dto';

describe('RegisterUserDto', () => {
  it('should be defined', () => {
    expect(new RegisterUserDto()).toBeDefined();
  });
});
