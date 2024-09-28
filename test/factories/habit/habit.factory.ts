import { Habit } from '@/src/habit/domain';
import { faker } from '@faker-js/faker';

export function habitFactory(
  overrides?: Partial<{
    id: string;
    name: string;
    description: string;
    frequency: number;
    goal: number;
  }>,
): Habit {
  const id = overrides?.id ?? faker.string.uuid();
  const name = overrides?.name ?? faker.word.sample();
  const description = overrides?.description ?? faker.lorem.words();
  const frequency = overrides?.frequency ?? faker.number.int();
  const goal = overrides?.goal ?? faker.number.int();

  return new Habit(name, description, frequency, goal, id);
}
