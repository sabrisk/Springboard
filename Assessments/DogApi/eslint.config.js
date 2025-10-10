import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs}"],
		plugins: ["js", "import"],
		extends: ["js/recommended", "plugin:import/recommended"],
		languageOptions: { globals: globals.browser },
		rules: {
			"import/no-cycle": ["error", { maxDepth: 3 }],
		},
	},
]);
