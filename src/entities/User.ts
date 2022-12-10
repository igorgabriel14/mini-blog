class User {
  private _username: string;
  private _password: string;
  constructor(username: string, password: string) {
    this._username = username;
    this._password = password;
  }
  getUsername(): string {
    return this._username;
  }
  getPassword(): string {
    return this._password;
  }
  setUsername(username: string) {
    this._username = username;
  }
  setPassword(password: string) {
    this._password = password;
  }
}

export { User };
