import { Frequency } from './frequency.enum';

export class Habit {
  constructor(
    private _name: string,
    private _description: string,
    private _frequency: Frequency,
    private _goal: number,
    private _id?: string,
  ) {
    this._id = _id;
    this._name = _name;
    this._description = _description;
    this._frequency = _frequency;
    this._goal = _goal;
  }

  public get id(): string | undefined {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
  }
  public get frequency(): Frequency {
    return this._frequency;
  }
  public set frequency(value: Frequency) {
    this._frequency = value;
  }
  public get goal(): number {
    return this._goal;
  }
  public set goal(value: number) {
    this._goal = value;
  }
}
