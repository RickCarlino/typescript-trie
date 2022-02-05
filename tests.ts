import { readFileSync } from "fs";
import { trie, insert, search, remove } from "./trie";

let root = trie();
readFileSync("dictionary.txt")
  .toString()
  .split("\n")
  .forEach(word => insert(root, word));

console.assert(!search(root, "anywhere"), "Doesnt contain `anywhere`");
console.assert(search(root, "s:left"), "Contains s:left");
remove(root, "s:left");
console.assert(!search(root, "s:left"), "s:left was removed");
console.log("ALL PASS");
