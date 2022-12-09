import { User } from "./User";
import { Post } from "./Post";
import promptSync from "prompt-sync";

const usersPath: string = "./db/users.json";
const postsPath: string = "./db/posts.json";

const prompt: promptSync.Prompt = promptSync();

class Blog {
  public users: User[] = [];
  public posts: Post[] = [];
  public fs: any = require("fs");

  // métodos para arquivos
  /*
   * - escrever no banco de usuários
   * - ler todo o banco de usuários
   * - escrever no banco de postagens
   * - ler todo o banco de postagens
   */

  writeUsers(): void {
    this.fs.writeFileSync(usersPath, JSON.stringify(this.users), {
      encondig: "utf-8",
    });
  }

  readUsers(): any {
    return JSON.parse(this.fs.readFileSync(usersPath, { enconding: "utf-8" }));
  }

  writePosts(): void {
    this.fs.writeFileSync(postsPath, JSON.stringify(this.posts), {
      encondig: "utf-8",
    });
  }

  readPosts(): any {
    return JSON.parse(this.fs.readFileSync(postsPath, { enconding: "utf-8" }));
  }

  // métodos para usuários
  /*
   * - criar um usuário
   * - logar com um usuário
   * - atualizar dados de usuário
   * - excluir conta de usuário
   */

  createUser(username: string, password: string): User {
    const user: User = new User(username, password);
    this.users.push(user);
    this.writeUsers();
    return user;
  }

  loginUser(): void{
    const username: string = prompt("Enter username: ");
    const password: string = prompt("Enter username: ");
    for (let i = 0; i < this.users.length; i++) {
      if (
        this.users[i].getUsername() === username &&
        this.users[i].getPassword() === password
      ) {
        console.log("Allowed access.");
        return;
      }
    }
    console.log("Access denied.");
  }

  updateUser(user: User): void {}

  deleteUser(user: User): void {
    for (let i = 0; i < this.posts.length; i++) {
      if (this.users[i].getUsername() === user.getUsername()) {
        this.users.splice(i, 1);
        this.writeUsers();
        console.log("Successfully deleted account.");
      }
    }
  }

  // métodos para postagens
  /*
   * - criar uma postagem
   * - mostrar postagens somente de um usuário específico
   * - atualizar uma postagem *
   * - deletar uma postagem
   */

  createPost(content: string, owner: User): Post {
    const id: number = Date.now() * Math.random();
    const post: Post = new Post(Math.floor(id), content, owner);
    this.posts.push(post);
    this.writePosts();
    return post;
  }

  showPost(user: User): Post[] {
    const userPosts: Post[] = [];
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].getOwner() === user.getUsername()) {
        userPosts.push(this.posts[i]);
      }
    }
    return userPosts;
  }

  updatePost(): void {}

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
