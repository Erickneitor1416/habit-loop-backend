export class HabitNotFoundError extends Error {
  constructor() {
    super('Habit not found');
    this.name = 'HabitNotFoundError';
  }
}
export class HabitAlreadyExistsError extends Error {
  constructor() {
    super('Habit already exists');
    this.name = 'HabitAlreadyExistsError';
  }
}

export class HabitNotCreatedError extends Error {
  constructor() {
    super('Habit not created');
    this.name = 'HabitNotCreatedError';
  }
}
