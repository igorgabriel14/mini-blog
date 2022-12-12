import { User } from "./User";
import { Post } from "./Post";
import { UsernameTypingError } from "./errors/UsernameTypingError";
import { PasswordTypingError } from "./errors/PasswrodTypingError";
import { InvalidCredentialsError } from "./errors/InvalidCredentialsError";

import promptSync = require("prompt-sync");

const usersPath: string = "./db/users.json";
const postsPath: string = "./db/posts.json";

const prompt: promptSync.Prompt = promptSync();

export class Blog {
  public users: User[] = [];
  public posts: Post[] = [];
  public fs: any = require("fs");

  writeUsers(): void {
    this.fs.writeFileSync(usersPath, JSON.stringify(this.users), {
      encondig: "utf-8",
    });
  }

  readUsers(): any {
    this.users = JSON.parse(
      this.fs.readFileSync(usersPath, { enconding: "utf-8" })
    );
    return this.users;
  }

  writePosts(): void {
    this.fs.writeFileSync(postsPath, JSON.stringify(this.posts), {
      encondig: "utf-8",
    });
  }

  readPosts(): any {
    this.posts = JSON.parse(
      this.fs.readFileSync(postsPath, { enconding: "utf-8" })
    );
    return this.posts;
  }

  checkUsername(username: string): void {
    this.readUsers();
    for (let i = 0; i < this.users.length; i++) {
      if (username === "" || username === this.users[i].username) {
        throw new UsernameTypingError("Username is null or already exists.");
      }
    }
  }

  checkPassword(password: string): void {
    for (let i = 0; i < this.users.length; i++) {
      if (password === "") {
        throw new PasswordTypingError("Password can't be null.");
      }
    }
  }

  createUser(username: string, password: string): User {
    this.readUsers();
    this.checkUsername(username);
    this.checkPassword(password);
    const user: User = new User(username, password);
    this.users.push(user);
    this.writeUsers();
    return user;
  }

  loginUser(username: string, password: string): User {
    this.readUsers();
    for (var i = 0; i < this.users.length; i++) {
      if (
        this.users[i].username === username &&
        this.users[i].password === password
      ) {
        const user: User = this.users[i];
        return user;
      }
    }
    throw new InvalidCredentialsError(
      "You typed your credentials incorrectly."
    );
  }

  updateUser(user: User): void {
    this.readUsers();
    const oldUsername: string = user.username;
    const username: string = prompt("Enter username: ");
    const password: string = prompt("Enter username: ");
    this.checkUsername(username);
    this.checkPassword(password);
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === user.username) {
        this.users[i].username = username;
        this.users[i].password = password;
        this.writeUsers();
        this.readPosts();
        for (let i = 0; i < this.posts.length; i++) {
          if (this.posts[i].owner === oldUsername) {
            this.posts[i].owner = username;
            this.writePosts();
            break;
          }
        }
      }
    }
  }

  deleteUser(user: User): void {
    this.readUsers();
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === user.username) {
        this.users.splice(i, 1);
        this.writeUsers();
      }
    }
  }

  createPost(title: string, content: string, owner: User): Post {
    this.readPosts();
    const post: Post = new Post(
      Math.floor(Math.random() * 100),
      title,
      content,
      owner
    );
    this.posts.push(post);
    this.writePosts();
    return post;
  }

  showPost(user: User): Post[] {
    this.readPosts();
    const userPosts: Post[] = [];
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].owner === user.username) {
        userPosts.push(this.posts[i]);
      }
    }
    return userPosts;
  }

  updatePost(id: number, title: string, content: string): void {
    this.readPosts();
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id === id) {
        this.posts[i].title = title;
        this.posts[i].content = content;
        this.writePosts();
      }
    }
  }

  deletePost(id: number): void {
    this.readPosts();
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id === id) {
        this.posts.splice(i, 1);
        this.writePosts();
      }
    }
  }
}
