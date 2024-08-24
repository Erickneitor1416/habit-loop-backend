export class User {
  constructor(
    private _name: string,
    private _email: string,
    private _password: string,
    private _id?: string,
  ) {
    this._id = _id;
    this.name = _name;
    this.email = _email;
    this.password = _password;
  }
  public get id(): string | undefined {
    return this._id;
  }

  public get password(): string {
    return this._password;
  }
  public set password(value: string) {
    this._password = value;
  }
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
}
