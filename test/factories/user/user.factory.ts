import { User } from '@/user/domain';
import { faker } from '@faker-js/faker';

export function userFactory(
  overrides?: Partial<{
    name: string;
    email: string;
    password: string;
    verified: boolean;
    id?: string;
  }>,
): User {
  const name = overrides?.name ?? faker.person.firstName();
  const email = overrides?.email ?? faker.internet.email();
  const password = overrides?.password ?? faker.internet.password();
  const verified =
    overrides?.verified !== undefined
      ? overrides.verified
      : faker.datatype.boolean();
  const id = overrides?.id ?? faker.string.uuid();

  return new User(name, email, password, verified, id);
}
