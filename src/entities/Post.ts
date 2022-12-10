import { User } from "./User";

class Post {
  private _id: number;
  private _title: string;
  private _content: string;
  private _owner: string;
  constructor(id: number, title: string, content: string, owner: User) {
    this._id = id;
    this._title = title;
    this._content = content;
    this._owner = owner.getUsername();
  }
  getId() {
    return this._id;
  }
  getTitle() {
    return this._title;
  }
  getContent() {
    return this._content;
  }
  getOwner() {
    return this._owner;
  }
  setTitle(title: string) {
    this._title = title;
  }
  setContent(content: string) {
    this._content = content;
  }
}

export { Post };
