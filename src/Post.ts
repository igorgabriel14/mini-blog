import { User } from "./User";

class Post {
  private _id: number;
  private _content: string;
  private _owner: string;
  constructor(id: number, content: string, owner: User) {
    this._id = id;
    this._content = content;
    this._owner = owner.getUsername();
  }
  getId() {
    return this._id;
  }
  getOwner() {
    return this._owner;
  }
}

export { Post };
