const bookSchema = {
	type: "object",
	properties: {
		isbn: { type: "string" },
		amazon_url: { type: "string", format: "uri" },
		author: { type: "string" },
		language: { type: "string" },
		pages: { type: "integer", minimum: 1 },
		publisher: { type: "string" },
		title: { type: "string" },
		year: { type: "integer", minimum: 0 },
	},
	required: [
		"isbn",
		"author",
		"language",
		"pages",
		"publisher",
		"title",
		"year",
	],
	additionalProperties: false,
};

module.exports = bookSchema;
