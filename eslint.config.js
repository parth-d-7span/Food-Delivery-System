import js from "@eslint/js";
import unicorn from "eslint-plugin-unicorn";
import importPlugin from "eslint-plugin-import";
import nodePlugin from "eslint-plugin-n";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,

  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        process: "readonly",
        console: "readonly",
      },
    },
    plugins: {
      unicorn,
      import: importPlugin,
      n: nodePlugin,
    },
    rules: {
      /* ----------------- Core Quality ----------------- */
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "eqeqeq": ["error", "always"],
      "no-var": "error",
      "prefer-const": "error",
      "curly": ["error", "all"],

      /* ----------------- Naming Conventions ----------------- */
      "camelcase": ["error", { properties: "always" }],
      "id-length": ["warn", { min: 2, exceptions: ["i", "j", "n"] }],
      "unicorn/filename-case": [
        "error",
        {
          cases: {
            camelCase: true,
            pascalCase: true,
          },
        },
      ],

      /* ----------------- Imports ----------------- */
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
        },
      ],

      // No duplicate imports from same module
      "import/no-duplicates": "error",

      // Catch unresolved import paths at lint time
      "import/no-unresolved": "error",

      /* ----------------- Node.js ----------------- */
      "n/no-process-exit": "error",
      "n/no-missing-import": "error",
      "prefer-template": "error",
      "prefer-arrow-callback": "error",
      "no-duplicate-imports": "error",
      "no-useless-constructor": "error",
      "no-return-await": "error",
    },
  },
  prettier,
];