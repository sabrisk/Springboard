class Node {
	constructor(val, left = null, right = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}

class BinarySearchTree {
	constructor(root = null) {
		this.root = root;
	}

	/** insert(val): insert a new node into the BST with value val.
	 * Returns the tree. Uses iteration. */

	insert(val) {
		if (this.root === null) {
			this.root = new Node(val);
			return this;
		}
		let currentNode = this.root;
		while (currentNode) {
			if (currentNode.val > val) {
				if (currentNode.left === null) {
					currentNode.left = new Node(val);
					return this;
				}
				currentNode = currentNode.left;
			} else {
				if (currentNode.right === null) {
					currentNode.right = new Node(val);
					return this;
				}
				currentNode = currentNode.right;
			}
		}
	}

	/** insertRecursively(val): insert a new node into the BST with value val.
	 * Returns the tree. Uses recursion. */

	insertRecursively(val, current = this.root) {
		if (this.root === null) {
			this.root = new Node(val);
			return this;
		}

		if (val < current.val) {
			if (current.left === null) {
				current.left = new Node(val);
			} else {
				this.insertRecursively(val, current.left);
			}
		} else if (val > current.val) {
			if (current.right === null) {
				current.right = new Node(val);
			} else {
				this.insertRecursively(val, current.right);
			}
			// } else {
			// 	throw new Error("Error comparing node value to argument value.");
		}
		return this;
	}

	/** find(val): search the tree for a node with value val.
	 * return the node, if found; else undefined. Uses iteration. */

	find(val) {
		if (this.root === null) {
			return undefined;
		}

		let current = this.root;
		while (current) {
			if (current.val === val) return current;

			if (val < current.val) {
				if (current.left !== null) {
					current = current.left;
				} else {
					return undefined;
				}
			} else if (val > current.val) {
				if (current.left !== null) {
					current = current.right;
				} else {
					return undefined;
				}
			}
		}
	}

	/** findRecursively(val): search the tree for a node with value val.
	 * return the node, if found; else undefined. Uses recursion. */

	findRecursively(val, current = this.root) {
		if (this.root === null) {
			return undefined;
		}

		if (val === current.val) return current;

		if (val < current.val) {
			if (current.left !== null) {
				return this.findRecursively(val, current.left);
			} else {
				return undefined;
			}
		} else if (val > current.val) {
			if (current.right !== null) {
				return this.findRecursively(val, current.right);
			} else {
				return undefined;
			}
		}
	}

	/*
      15
 10       20
  12	17
*/

	/** dfsPreOrder(): Traverse the array using pre-order DFS.
	 * Return an array of visited nodes. */

	dfsPreOrder(arr = [], current = this.root) {
		if (current === null) {
			return [];
		}
		arr.push(current.val);
		if (current.left) {
			this.dfsPreOrder(arr, current.left);
		}
		if (current.right) {
			this.dfsPreOrder(arr, current.right);
		}
		return arr;
	}

	/*
          15
    10         20
  1   12          50
   5 
*/

	/** dfsInOrder(): Traverse the array using in-order DFS.
	 * Return an array of visited nodes. */

	dfsInOrder(arr = [], current = this.root) {
		if (current === null) {
			return [];
		}

		if (current.left) {
			this.dfsInOrder(arr, current.left);
		}
		arr.push(current.val);

		if (current.right) {
			this.dfsInOrder(arr, current.right);
		}
		return arr;
	}

	/** dfsPostOrder(): Traverse the array using post-order DFS.
	 * Return an array of visited nodes. */

	dfsPostOrder(arr = [], current = this.root) {
		if (current === null) {
			return [];
		}

		if (current.left) {
			this.dfsPostOrder(arr, current.left);
		}
		if (current.right) {
			this.dfsPostOrder(arr, current.right);
		}
		arr.push(current.val);
		return arr;
	}

	/** bfs(): Traverse the array using BFS.
	 * Return an array of visited nodes. */

	bfs() {
		const visited = [];
		const toVisitQueue = [this.root];
		while (toVisitQueue.length) {
			const current = toVisitQueue.shift();
			visited.push(current.val);
			console.log("VISITING", current.val);
			for (let child of [current.left, current.right]) {
				if (child) toVisitQueue.push(child);
			}
		}
		console.log(visited);
		return visited;
	}

	/** Further Study!
	 * remove(val): Removes a node in the BST with the value val.
	 * Returns the removed node. */

	remove(val) {}

	/** Further Study!
	 * isBalanced(): Returns true if the BST is balanced, false otherwise. */

	isBalanced() {}

	/** Further Study!
	 * findSecondHighest(): Find the second highest value in the BST, if it exists.
	 * Otherwise return undefined. */

	findSecondHighest() {}
}

module.exports = BinarySearchTree;
