class Node {
	constructor(val, next = null) {
		this.val = val;
		this.next = next;
	}
}
// const firstPage = new Node(
// 	"google.com",
// 	new Node("reddit.com", new Node("amazon.com", new Node("youtube.com")))
// );

class LinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
	}
	traverse() {
		let currentNode = this.head;
		while (currentNode) {
			console.log(currentNode.val);
			currentNode = currentNode.next;
		}

		// do {
		//     if(this.head === null) {
		//         return null;
		//     }
		//     console.log(this.head.)

		// } while (this.next !== null)

		// console.log(this.head.val);
		// console.log(this.head.next.val);
		// console.log(this.head.next.next.val);
	}
	find(val) {
		let currentNode = this.head;

		while (currentNode) {
			if (val === currentNode.val) {
				return true;
			}
			currentNode = currentNode.next;
		}
		return false;
	}
	append(val) {
		// let currentNode = this.head;
		// while (currentNode.next) {
		// 	currentNode = currentNode.next;
		// }
		// currentNode.next = new Node(val);
		// console.log("AT THE LAST NODE", currentNode.val);
		const newNode = new Node(val);
		this.tail.next = newNode;
		this.tail = newNode;
	}
}

// const history = new LinkedList();
// history.head = firstPage;

// console.log(history.find("test"));
// history.append("test");
// console.log(history.find("test"));

const train = new LinkedList();
train.append("Engine");
