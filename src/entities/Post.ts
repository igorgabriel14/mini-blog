import { User } from "./User";

export class Post {
  owner: string;
  constructor(
    public id: number,
    public title: string,
    public content: string,
    owner: User
  ) {
    this.owner = owner.username;
  }
}
