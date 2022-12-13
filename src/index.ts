import { Blog } from "./entities/Blog";
import { UsernameTypingError } from "./entities/errors/UsernameTypingError";
import { PasswordTypingError } from "./entities/errors/PasswordTypingError";
import { InvalidCredentialsError } from "./entities/errors/InvalidCredentialsError";
import { InvalidID } from "./entities/errors/InvalidID";

import promptSync = require("prompt-sync");

const prompt: promptSync.Prompt = promptSync();

let option: number;
let optionLogin: number;

let blog: Blog = new Blog();

try {
  do {
    console.log("1 - Create new account");
    console.log("2 - Enter the account");
    console.log("0 - Exit");

    option = Number(prompt("Enter a option: "));

    switch (option) {
      case 1:
        let usernameSignin: string = prompt("Enter a username: ");
        blog.checkUsername(usernameSignin);
        let passwordSignin: string = prompt("Enter a password: ");
        blog.checkPassword(passwordSignin);
        blog.createUser(usernameSignin, passwordSignin);
        console.log("Account created successfully!");
        break;
      case 2:
        console.log("-- Login --");
        let usernameLogin: string = prompt("Username: ");
        let passwordLogin: string = prompt("Password: ");
        blog.loginUser(usernameLogin, passwordLogin);
        console.log("-- Welcome to blog --");

        do {
          console.log("1 - Create a post");
          console.log("2 - Show your posts");
          console.log("3 - Update a post");
          console.log("4 - Delete a post");
          console.log("5 - Update your user");
          console.log("6 - Delete your user");
          console.log("0 - Exit");

          let user = blog.loginUser(usernameLogin, passwordLogin);
          optionLogin = Number(prompt("Actions: "));

          switch (optionLogin) {
            case 1:
              let title: string = prompt("Enter a title: ");
              let content: string = prompt("Enter a content: ");
              console.log(
                "Post created successfully!",
                blog.createPost(title, content, user)
              );
              break;
            case 2:
              console.log("Here are your posts: ");
              console.log(blog.showPost(user));
              break;
            case 3:
              console.log(blog.showPost(user));
              let updateId: number = Number(
                prompt("Type the ID from the post you want to update: ")
              );
              for (let i = 0; i < blog.posts.length; i++) {
                if (blog.posts[i].id === updateId) {
                  let newTitle: string = prompt("Type your new title: ");
                  let newContent: string = prompt("Type your new content: ");
                  blog.updatePost(updateId, newTitle, newContent);
                  console.log("Post updated successfully!");
                }
              }
              break;
            case 4:
              console.log(blog.showPost(user));
              let deleteId = Number(
                prompt("Type the ID from the post you want to delete: ")
              );
              for (let i = 0; i < blog.posts.length; i++) {
                if (blog.posts[i].id === deleteId) {
                  blog.deletePost(deleteId);
                  console.log("Post deleted successfully!");
                }
              }
              break;
            case 5:
              blog.updateUser(user);
              console.log("User updated!");
              optionLogin = 0;
              break;
            case 6:
              blog.deleteUser(user);
              console.log("Your account is deleted. We will miss you!");
              optionLogin = 0;
              break;
          }
        } while (optionLogin !== 0);
    }
  } while (option !== 0);
} catch (error: any) {
  if (error instanceof UsernameTypingError) {
    console.log(error.message);
  }
  if (error instanceof PasswordTypingError) {
    console.log(error.message);
  }
  if (error instanceof InvalidCredentialsError) {
    console.log(error.message);
  }
  if (error instanceof InvalidID) {
    console.log(error.message);
  }
}
