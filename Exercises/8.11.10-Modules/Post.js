// title content publish

export default class Post {
	constructor(title, content) {
		this.title = title;
		this.content = content;
	}
}

Post.prototype.publish = function () {
	console.log(`Title: ${this.title} | Content: ${this.content}`);
};
