class Application {
  fs: any;
  posts: any[] = [];
  constructor() {
    this.fs = require("fs");
  }

  create(path: string, id: number, content: string) {
    const data = { id, content };
    this.posts.push(data);
    return this.fs.writeFileSync(path, JSON.stringify(this.posts), {
      encoding: "utf-8",
    });
  }

  read(path: string) {
    this.posts = JSON.parse(this.fs.readFileSync(path, { encoding: "utf-8" }));
    return this.posts;
  }

  update(path: string, id: number, content: string) {
    this.posts = JSON.parse(this.fs.readFileSync(path, { encoding: "utf-8" }));
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id == id) {
        this.posts[i].content = content;
        this.fs.writeFileSync(path, JSON.stringify(this.posts), {
          encoding: "utf-8",
        });
      }
    }
  }

  delete(path: string, index: number) {
    this.posts = JSON.parse(this.fs.readFileSync(path, { encoding: "utf-8" }));
    this.posts.splice(index, 1);
    this.fs.writeFileSync(path, JSON.stringify(this.posts), {
      encoding: "utf-8",
    });
  }
}

const app = new Application();
app.create("./db/posts.json", 1, "Postagem número 1");
app.create("./db/posts.json", 2, "Postagem número 2");
app.create("./db/posts.json", 3, "Postagem número 2");
console.log(app.read("./db/posts.json"));
app.update("./db/posts.json", 3, "Postagem atualizada");
console.log(app.read("./db/posts.json"));
app.delete("./db/posts.json", 1); // remove referente ao índice do array
console.log(app.read("./db/posts.json"));
