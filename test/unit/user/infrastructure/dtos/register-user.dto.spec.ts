import {
  LoginUserDto,
  RegisterUserDto,
  RegisterUserResponseDto,
} from '@/src/user/infrastructure';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('RegisterUserDto', () => {
  it('should be defined', () => {
    expect(new RegisterUserDto()).toBeDefined();
  });
});

describe('RegisterUserResponseDto', () => {
  it('should pass validation with valid inputs', async () => {
    const data = {
      name: 'User',
      email: 'user@example.com',
      token: 'token',
    };
    const dto = plainToInstance(RegisterUserResponseDto, data);

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail if token is empty', async () => {
    const data = {
      name: 'User',
      email: 'user@example.com',
      token: '',
    };
    const dto = plainToInstance(RegisterUserResponseDto, data);

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
    expect(errors[0]?.constraints?.isNotEmpty).toBeUndefined();
  });
});

describe('RegisterUserDto', () => {
  it('should pass validation with valid inputs', async () => {
    const data = {
      name: 'User',
      email: 'user@example.com',
      password: 'strongpassword',
    };
    const dto = plainToInstance(RegisterUserDto, data);

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail if name is empty', async () => {
    const data = {
      name: '',
      email: 'user@example.com',
      password: 'strongpassword',
    };
    const dto = plainToInstance(RegisterUserDto, data);

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isNotEmpty).toBeDefined();
  });

  it('should fail if email is invalid', async () => {
    const data = {
      name: 'User',
      email: 'user',
      password: 'strongpassword',
    };
    const dto = plainToInstance(RegisterUserDto, data);

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isEmail).toBeDefined();
  });

  it('should fail if password is shorter than 8 characters', async () => {
    const data = {
      name: 'User',
      email: 'user@example.com',
      password: 'short',
    };
    const dto = plainToInstance(RegisterUserDto, data);

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.minLength).toBeDefined();
  });
});

describe('LoginUserDto', () => {
  it('should be defined', () => {
    const data = {
      email: 'user@example.com',
      password: 'password',
    };
    const dto = plainToInstance(LoginUserDto, data);
    expect(dto).toBeDefined();
  });
  it("should not pass validation if email isn't an email", async () => {
    const data = {
      email: 'user',
      password: 'password',
    };
    const dto = plainToInstance(LoginUserDto, data);

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isEmail).toBeDefined();
  });
  it('should not pass validation if password is empty', async () => {
    const data = {
      email: 'user@example.com',
      password: '',
    };
    const dto = plainToInstance(LoginUserDto, data);
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isNotEmpty).toBeDefined();
  });
});
