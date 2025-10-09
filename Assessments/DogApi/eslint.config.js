import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs}"],
		plugins: { js: js, import: "eslint-plugin-import" },
		extends: ["js/recommended"],
		languageOptions: { globals: globals.browser },
		rules: {
			// enable import/no-cycle
			"import/no-cycle": ["error", { maxDepth: 3 }],
		},
	},
]);
