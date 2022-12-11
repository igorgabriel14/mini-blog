import { Blog } from "./entities/Blog";
import { User } from "./entities/User";
import { Post } from "./entities/Post";

import promptSync = require("prompt-sync");

const prompt: promptSync.Prompt = promptSync();

let option: number;
let optionLogin: number;

const blog: Blog = new Blog();

do {
  console.log("1 - Create new account");
  console.log("2 - Enter the account");
  console.log("0 - Exit");

  option = Number(prompt("Enter a option: "));
  if (option === 1) {
    let username: string = prompt("Enter a username: ");
    let password: string = prompt("Enter a password: ");
    blog.createUser(username, password);
  }
  if (option === 2) {
    console.log("-- Login --");

    let username: string = prompt("Username: ");
    let password: string = prompt("Passwrod: ");
    var user: User = blog.loginUser(username, password);
    console.log("-- Welcome to blog --");

    do {
      console.log("1 - Create a post");
      console.log("0 - Exit");

      optionLogin = Number(prompt("Actions: "));
      switch (optionLogin) {
        case 1:
          let title: string = prompt("Enter a title: ");
          let content: string = prompt("Enter a content: ");
          const post: Post = blog.createPost(title, content, user);
      }
    } while (optionLogin !== 0);
  }
} while (option !== 0);
