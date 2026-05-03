// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
// import react from "eslint-plugin-react";
// import reactHooks from "eslint-plugin-react-hooks";
// import reactRefresh from "eslint-plugin-react-refresh";
// import jsxA11y from "eslint-plugin-jsx-a11y";
// import importPlugin from "eslint-plugin-import";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: ["dist", "build", "coverage", "node_modules"],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2024,
      },
    },

    // plugins: {
    //   react,
    //   "react-hooks": reactHooks,
    //   "react-refresh": reactRefresh,
    //   "jsx-a11y": jsxA11y,
    //   import: importPlugin,
    // },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      // ...react.configs.recommended.rules,
      // ...react.configs["jsx-runtime"].rules,
      // ...reactHooks.configs.recommended.rules,

      // "react-refresh/only-export-components": [
      //   "warn",
      //   { allowConstantExport: true },
      // ],

      "react/prop-types": "off",

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/no-explicit-any": "warn",

      // "import/order": [
      //   "warn",
      //   {
      //     groups: [
      //       "builtin",
      //       "external",
      //       "internal",
      //       "parent",
      //       "sibling",
      //       "index",
      //       "type",
      //     ],
      //     "newlines-between": "always",
      //     alphabetize: {
      //       order: "asc",
      //       caseInsensitive: true,
      //     },
      //   },
      // ],
    },
  },

  prettier
);