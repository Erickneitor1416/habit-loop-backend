import { User } from '@/user/domain';
import { faker } from '@faker-js/faker';

export function userFactory(
  overrides?: Partial<{
    name: string;
    email: string;
    password: string;
    id: string;
  }>,
): User {
  const name = overrides?.name ?? faker.person.firstName();
  const email = overrides?.email ?? faker.internet.email();
  const password = overrides?.password ?? faker.internet.password();
  const id = overrides?.id ?? faker.string.uuid();

  return new User(name, email, password, id);
}
