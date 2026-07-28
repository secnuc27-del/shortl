import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", ".output", ".vinxi"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // ─── Security Rules ─────────────────────────────────────────────────────────
      // Blocks XSS vector in React (use DOMPurify if HTML rendering is needed)
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXAttribute[name.name='dangerouslySetInnerHTML']",
          message: "[Security] dangerouslySetInnerHTML is an XSS risk. Sanitize with DOMPurify first.",
        },
      ],
      // Blocks code execution from strings (eval injection attack vector)
      "no-eval": "error",
      "no-implied-eval": "error",
      // Warn on console usage to avoid leaking sensitive data to browser console
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // Explicit any disables TypeScript's type safety (validation bypass risk)
      "@typescript-eslint/no-explicit-any": "warn",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "server-only",
              message:
                "TanStack Start does not use the Next.js `server-only` package. Rename the module to `*.server.ts` or mark it with `@tanstack/react-start/server-only`.",
            },
          ],
        },
      ],
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
);
