import { Blog } from "./Blog";
import promptSync from "prompt-sync";

const prompt: promptSync.Prompt = promptSync();
const option: number = Number(prompt("Enter option: "));

/*
 * 1 - criar usuário
 * 2 - logar com um usuário
 * 3 - criar postagem (com usuário)
 * 4 - ler todas as postagens
 * 5 - ler postagem de um usuário específico
 * 6 - atualizar conteúdo de uma postagem
 * 7 - apagar postagem de um usuário
 * 0 - sair do programa
 */

const blog: Blog = new Blog();

while (true) {
  switch (option) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 0:
      break;
  }
}
