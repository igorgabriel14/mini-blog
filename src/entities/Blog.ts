import { User } from "./User";
import { Post } from "./Post";
import promptSync = require("prompt-sync");

const usersPath: string = "./db/users.json";
const postsPath: string = "./db/posts.json";

const prompt: promptSync.Prompt = promptSync();

class Blog {
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

  createUser(username: string, password: string): User {
    this.readUsers();
    const user: User = new User(username, password);
    this.users.push(user);
    this.writeUsers();
    return user;
  }

  loginUser(username: string, password: string): User {
    for (var i = 0; i < this.users.length; i++) {
      if (
        this.users[i].getUsername === username &&
        this.users[i].getPassword === password
      ) {
        const user: User = this.users[i];
        return user;
      }
    }
    return this.users[0];
  }

  updateUser(user: User): void {
    const username: string = prompt("Enter username: ");
    const password: string = prompt("Enter username: ");
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].getUsername === user.getUsername) {
        this.users[i].setUsername(username);
        this.users[i].setPassword(password);
      }
    }
  }

  deleteUser(user: User): void {
    for (let i = 0; i < this.posts.length; i++) {
      if (this.users[i].getUsername === user.getUsername) {
        this.users.splice(i, 1);
        this.writeUsers();
        console.log("Successfully deleted account.");
      }
    }
  }

  createPost(title: string, content: string, owner: User): Post {
    const id: number = Date.now() * Math.random();
    const post: Post = new Post(Math.floor(id), title, content, owner);
    this.posts.push(post);
    this.writePosts();
    return post;
  }

  showPost(user: User): Post[] {
    const userPosts: Post[] = [];
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].getOwner() === user.getUsername) {
        userPosts.push(this.posts[i]);
      }
    }
    return userPosts;
  }

  updatePost(id: number, title: string, content: string): void {
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].getId() === id) {
        this.posts[i].setTitle(title);
        this.posts[i].setContent(content);
      }
    }
  }

  deletePost(post: Post): void {
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].getId() === post.getId()) {
        this.posts.splice(i, 1);
        this.writePosts();
        console.log("Successfully deleted post");
      }
    }
  }
}

export { Blog };
