import nextConfig from "eslint-config-next";
import securityPlugin from "eslint-plugin-security";
import prettierConfig from "eslint-config-prettier";

export default [
  // Global ignores
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "db/migrations/**",
      "stories/**",
      ".storybook/**",
      "*.config.js",
      "*.config.mjs",
      "out/**",
      "build/**",
    ],
  },

  // Next.js config (includes TypeScript, React, React Hooks, JSX-A11y)
  ...nextConfig,

  // Security plugin
  {
    plugins: {
      security: securityPlugin,
    },
    rules: {
      ...securityPlugin.configs.recommended.rules,
      "security/detect-object-injection": "off",
    },
  },

  // TypeScript-specific rules
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
    },
  },

  // React rules customization
  {
    rules: {
      "react/jsx-filename-extension": [
        "warn",
        { extensions: [".ts", ".tsx", ".js", ".jsx"] },
      ],
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["Link"],
          specialLink: ["hrefLeft", "hrefRight"],
          aspects: ["invalidHref", "preferButton"],
        },
      ],
    },
  },

  // Prettier config (must be last to override other formatting rules)
  prettierConfig,
];
