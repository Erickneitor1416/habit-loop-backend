import { AuthService } from '@/user/domain';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../../../src/auth/auth.guard';

describe(AuthGuard, () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: {
            verify: jest.fn(),
          },
        },
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
    authService = module.get<AuthService>(AuthService);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true if the route is public', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValueOnce(true);

    const context = {
      switchToHttp: () => ({ getRequest: () => ({ headers: {} }) }),
      getHandler: () => {},
      getClass: () => {},
    } as ExecutionContext;

    expect(await guard.canActivate(context)).toBe(true);
  });

  it('should throw UnauthorizedException if no token is provided', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValueOnce(false);

    const context = {
      switchToHttp: () => ({ getRequest: () => ({ headers: {} }) }),
      getHandler: () => {},
      getClass: () => {},
    } as ExecutionContext;

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException if token is invalid', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValueOnce(false);
    jest.spyOn(authService, 'verify').mockRejectedValueOnce(new Error());

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: { authorization: 'Bearer invalidToken' },
        }),
      }),
      getHandler: () => {},
      getClass: () => {},
    } as ExecutionContext;

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should be true if the token is valid', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValueOnce(false);
    jest.spyOn(authService, 'verify').mockResolvedValueOnce({ userId: 1 });

    const context = {
      switchToHttp: () => ({
        getRequest: (): any => ({
          headers: { authorization: 'Bearer validToken' },
        }),
      }),
      getHandler: () => {},
      getClass: () => {},
    } as ExecutionContext;

    const response = await guard.canActivate(context);
    expect(response).toBe(true);
  });
});
