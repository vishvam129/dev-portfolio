import { createRequire } from "module";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

const require = createRequire(import.meta.url);
const nextPlugin = require("@next/eslint-plugin-next");

export default [
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": tsPlugin,
      "@next/next": nextPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    ignores: [".next/", "node_modules/", "public/"],
  },
];
