import { Blog } from "./entities/Blog";
import { ApplicationError } from "./entities/errors/ApplicationError";
import { UsernameTypingError } from "./entities/errors/UsernameTypingError";
import { PasswordTypingError } from "./entities/errors/PasswrodTypingError";
import { InvalidCredentialsError } from "./entities/errors/InvalidCredentialsError";

import promptSync = require("prompt-sync");

const prompt: promptSync.Prompt = promptSync();

let option: number;
let optionLogin: number;

try {
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
      blog.loginUser(username, password);
      console.log("-- Welcome to blog --");

      do {
        console.log("1 - Create a post");
        console.log("2 - Show your posts");
        console.log("3 - Update a post");
        console.log("4 - Delete a post");
        console.log("5 - Update your user");
        console.log("6 - Delete your user");
        console.log("0 - Exit");

        let user = blog.loginUser(username, password);
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
            const updateId: number = Number(
              prompt("Type the ID from the post you want to update: ")
            );
            for (let i = 0; i < blog.posts.length; i++) {
              if (blog.posts[i].id === updateId) {
                const newTitle: string = prompt("Type your new title: ");
                const newContent: string = prompt("Type your new content: ");
                blog.updatePost(updateId, newTitle, newContent);
                console.log("Post updated successfully!");
              }
            }
            break;
          case 4:
            console.log(blog.showPost(user));
            const deleteId = Number(
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
  if (error instanceof ApplicationError) {
  }
  if (error instanceof UsernameTypingError) {
  }
  if (error instanceof PasswordTypingError) {
  }
  if (error instanceof InvalidCredentialsError) {
  }
}
