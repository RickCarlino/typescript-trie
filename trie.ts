interface Trie {
  isWord: boolean;
  child: Record<string, Trie | undefined>;
}

export const trie = (): Trie => ({ isWord: false, child: {} });

export const insert = (itr: Trie, str: string) => doInsert(itr, str, 0);

function doInsert(itr: Trie, str: string, i: number) {
  if (i < str.length) {
    const char = str[i];
    // Funny assignent syntax is to satisfy type checker.
    const node = (itr.child[char] ||= trie());
    doInsert(node, str, i + 1);
  } else {
    itr.isWord = true;
  }
}

export function search(root: Trie, str: string): boolean {
  return doSearch(root, str, 0, str.length);
}

function doSearch(tri: Trie | undefined, str: string, i: number, len: number): boolean {
  if (tri) {
    if (tri.isWord && (i == len)) {
      return true;
    }
    return doSearch(tri.child[str[i]], str, i + 1, len);
  }

  return false;
}

// Removes an element from search results.
// Does *NOT* perform garbage collection.
export function remove(tri: Trie, key: string | undefined): Trie | undefined {
  if (!key) {
    if (tri.isWord) { tri.isWord = false; }
    return;
  }

  const node = tri.child[key[0]];
  node && remove(node, key.substring(1));
}
