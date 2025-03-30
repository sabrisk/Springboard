/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
	constructor(val, left = null, right = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}

class BinaryTree {
	constructor(root = null) {
		this.root = root;
	}

	/** minDepth(): return the minimum depth of the tree -- that is,
	 * the length of the shortest path from the root to a leaf. */

	minDepth() {
		if (!this.root) return 0;
		const toVisitQueue = [{ node: this.root, depth: 1 }];
		while (toVisitQueue.length) {
			const current = toVisitQueue.shift();
			if (!current.node.left && !current.node.right) {
				return current.depth;
			}

			// Only push non-null children
			if (current.node.left) {
				toVisitQueue.push({
					node: current.node.left,
					depth: current.depth + 1,
				});
			}
			if (current.node.right) {
				toVisitQueue.push({
					node: current.node.right,
					depth: current.depth + 1,
				});
			}
		}
	}
	//  toVisitQueue = [b]
	//  current = c
	//  minDepth = 1
	//         a
	//     c        b
	//           e    g

	/** maxDepth(): return the maximum depth of the tree -- that is,
	 * the length of the longest path from the root to a leaf. */

	maxDepth() {
		if (!this.root) return 0;
		let maxDepth = 1;
		const toVisitQueue = [{ node: this.root, depth: 1 }];
		while (toVisitQueue.length) {
			const current = toVisitQueue.shift();

			if (current.node.left) {
				toVisitQueue.push({
					node: current.node.left,
					depth: current.depth + 1,
				});
			}
			if (current.node.right) {
				toVisitQueue.push({
					node: current.node.right,
					depth: current.depth + 1,
				});
			}
			if (current.node.left || current.node.right) {
				maxDepth =
					current.depth + 1 > maxDepth ? current.depth + 1 : maxDepth;
			}
		}
		return maxDepth;
	}

	/** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
	 * The path doesn't need to start at the root, but you can't visit a node more than once. */

	maxSum() {
		let result = 0;

		function maxSumHelper(node) {
			if (node === null) return 0;
			const leftSum = maxSumHelper(node.left);
			const rightSum = maxSumHelper(node.right);
			result = Math.max(result, node.val + leftSum + rightSum);
			return Math.max(0, leftSum + node.val, rightSum + node.val);
		}

		maxSumHelper(this.root);
		return result;
	}
	// maxSum() {
	// 	if (!this.root) return 0;
	// 	const toVisitStack = [this.root];
	// 	while (toVisitStack.length) {
	// 		// console.log("tovisitstack: ", toVisitStack);
	// 		const current = toVisitStack.pop();
	// 		console.log(current.val);

	// 		if (current.left) toVisitStack.push(current.left);
	// 		if (current.right) toVisitStack.push(current.right);
	// 	}
	// }
	// 6r>5n2>1n5,3n3,1n6<2n4<5n1
	// toVisitStack = [5n1 ]
	// current =2n4

	/*
	       6r
	5n1            5n2
	           3n3         1n5
	          2n4  1n6

	
        //     6r
        // 5a        5b

	*/

	/** nextLarger(lowerBound): return the smallest value in the tree
	 * which is larger than lowerBound. Return null if no such value exists. */

	nextLarger(lowerBound) {
		let nextLargest = null;
		if (!this.root) return null;
		const toVisitStack = [this.root];
		while (toVisitStack.length) {
			// console.log("tovisitstack: ", toVisitStack);
			const current = toVisitStack.pop();
			if (nextLargest === null && current.val > lowerBound) {
				nextLargest = current.val;
			} else if (nextLargest !== null && current.val > lowerBound) {
				nextLargest =
					current.val > lowerBound && current.val < nextLargest
						? current.val
						: nextLargest;
			}

			if (current.left) toVisitStack.push(current.left);
			if (current.right) toVisitStack.push(current.right);
		}
		return nextLargest;
	}

	/** Further study!
	 * areCousins(node1, node2): determine whether two nodes are cousins
	 * (i.e. are at the same level but have different parents. ) */

	areCousins(node1, node2) {}

	/** Further study!
	 * serialize(tree): serialize the BinaryTree object tree into a string. */

	static serialize() {}

	/** Further study!
	 * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

	static deserialize() {}

	/** Further study!
	 * lowestCommonAncestor(node1, node2): find the lowest common ancestor
	 * of two nodes in a binary tree. */

	lowestCommonAncestor(node1, node2) {}
}

module.exports = { BinaryTree, BinaryTreeNode };
