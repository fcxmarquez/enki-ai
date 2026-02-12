# Biome Migration Evaluation

Evaluation of migrating from **ESLint + Prettier** to **Biome** for the circle-ai Next.js project.

---

## Current Setup

### ESLint (`eslint.config.mjs` — flat config, ESLint v9)

| Layer | What it provides |
|---|---|
| `eslint-config-next` | React, React Hooks, JSX-a11y, TypeScript, import, Next.js core web vitals rules |
| `eslint-plugin-security` (recommended) | Security-focused rules (`detect-object-injection` turned off) |
| `@typescript-eslint/no-explicit-any` → error | Bans explicit `any` type annotations |
| `@typescript-eslint/no-unused-vars` → error | Flags unused variables/imports |
| `react/jsx-filename-extension` → warn | Restricts JSX to `.ts`, `.tsx`, `.js`, `.jsx` |
| `jsx-a11y/anchor-is-valid` → error | Validates anchors — custom config: `components: ["Link"]`, `specialLink: ["hrefLeft", "hrefRight"]` |
| `eslint-config-prettier` | Disables formatting rules that conflict with Prettier |

### Prettier (`.prettierrc`)

```json
{
  "semi": true,
  "tabWidth": 2,
  "printWidth": 90,
  "singleQuote": false,
  "trailingComma": "es5",
  "useTabs": false,
  "bracketSpacing": true
}
```

### Related Dependencies

- `eslint` v9.17.0
- `eslint-config-next` v16.0.10
- `eslint-config-prettier` v10.0.1
- `eslint-plugin-prettier` v5.2.3
- `eslint-plugin-security` v3.0.1
- `eslint-plugin-storybook` v0.12.0
- `prettier` v3.0.3

### Scripts & Hooks

- `bun lint` → `eslint .`
- `bun format` → `prettier --write .`
- `lint-staged` runs ESLint `--fix` + Prettier on staged files pre-commit

---

## Rule-by-Rule Mapping

### TypeScript Rules

| ESLint Rule | Biome Equivalent | Match Quality | Notes |
|---|---|---|---|
| `@typescript-eslint/no-explicit-any` (error) | `suspicious/noExplicitAny` | **Full** | Same behavior. Biome has no `ignoreRestArgs` option, but the project doesn't use it. |
| `@typescript-eslint/no-unused-vars` (error) | `correctness/noUnusedVariables` | **Partial** | Biome splits this into 3 rules: `noUnusedVariables`, `noUnusedImports`, and `noUnusedFunctionParameters`. All three should be enabled for equivalent coverage. Biome has no `argsIgnorePattern`/`varsIgnorePattern` options. Supports `_` prefix convention. |

### React & React Hooks Rules (from `eslint-config-next`)

| ESLint Rule | Biome Equivalent | Match Quality | Notes |
|---|---|---|---|
| `react-hooks/rules-of-hooks` | `correctness/useHookAtTopLevel` | **Full** | Same behavior. |
| `react-hooks/exhaustive-deps` | `correctness/useExhaustiveDependencies` | **Behavioral difference** | Biome also flags **unnecessary** dependencies by default. Set `reportUnnecessaryDependencies: false` if you want ESLint-equivalent behavior. Supports configuring stable returns for custom hooks (Zustand, TanStack Query). |
| `react/jsx-filename-extension` (warn) | **None** | **Gap** | Biome has no equivalent. Minor concern — TypeScript's compiler already enforces this. |
| `react/no-children-prop` | `correctness/noChildrenProp` | Full | |
| `react/no-danger` | `security/noDangerouslySetInnerHtml` | Full | |
| Other React rules from `eslint-config-next` | ~90% covered | Mostly full | Most common React rules have Biome equivalents. |

### Accessibility (JSX-a11y) Rules

Biome provides **33 of ~35** `jsx-a11y` rules. Key mappings:

| ESLint Rule | Biome Equivalent | Match Quality |
|---|---|---|
| `jsx-a11y/anchor-is-valid` | `a11y/useValidAnchor` | **Partial** |
| `jsx-a11y/alt-text` | `a11y/useAltText` | Full |
| `jsx-a11y/aria-props` | `a11y/useValidAriaProps` | Full |
| `jsx-a11y/aria-role` | `a11y/useValidAriaRole` | Full |
| `jsx-a11y/click-events-have-key-events` | `a11y/useKeyWithClickEvents` | Full |
| `jsx-a11y/heading-has-content` | `a11y/useHeadingContent` | Full |
| `jsx-a11y/no-autofocus` | `a11y/noAutofocus` | Full |
| ... (28 more rules) | All have mappings | Full |

**Critical caveat on `anchor-is-valid`:** The project configures `components: ["Link"]` and `specialLink: ["hrefLeft", "hrefRight"]`. Biome's `useValidAnchor` does **not** support custom component or specialLink options — it only checks native `<a>` elements. This means Next.js `<Link>` components will **not** be linted for valid anchors.

### Security Rules (`eslint-plugin-security`)

| ESLint Rule | Biome Equivalent | Status |
|---|---|---|
| `detect-eval-with-expression` | `security/noGlobalEval` | **Covered** |
| `detect-unsafe-regex` | None | **Gap** |
| `detect-buffer-noassert` | None | **Gap** |
| `detect-child-process` | None | **Gap** |
| `detect-disable-mustache-escape` | None | **Gap** |
| `detect-no-csrf-before-method-override` | None | **Gap** |
| `detect-non-literal-fs-filename` | None | **Gap** |
| `detect-non-literal-regexp` | None | **Gap** |
| `detect-non-literal-require` | None | **Gap** |
| `detect-object-injection` | None | Gap (already off) |
| `detect-possible-timing-attacks` | None | **Gap** |
| `detect-pseudoRandomBytes` | None | **Gap** |
| `detect-new-buffer` | None | **Gap** |

**Only 1 of 13** security rules has a Biome equivalent. This is the largest gap.

Additional Biome security rules (not from eslint-plugin-security):
- `security/noDangerouslySetInnerHtml` — enabled by default
- `security/noDangerouslySetInnerHtmlWithChildren` — enabled by default
- `security/noSecrets` — opt-in, detects hardcoded secrets/API keys

### Next.js-Specific Rules (`@next/next/*`)

| ESLint Rule | Biome Equivalent |
|---|---|
| `@next/next/no-html-link-for-pages` | **None** |
| `@next/next/no-img-element` | **None** |
| `@next/next/no-head-element` | **None** |
| `@next/next/no-sync-scripts` | **None** |
| `@next/next/google-font-*` rules | **None** |
| `@next/next/no-page-custom-font` | **None** |

**No Next.js-specific rules are supported in Biome.** However, Next.js 15.5+ officially supports Biome as a linter option, and many of these rules are only relevant during development (the framework itself handles most at build time).

### Storybook Rules (`eslint-plugin-storybook`)

**No Biome equivalent.** The plugin has been archived. Low impact since these rules are best-practice guidance, not correctness checks.

---

## Formatter: Prettier → Biome

All Prettier settings have **direct** Biome equivalents:

| Prettier Setting | Value | Biome Setting | Value |
|---|---|---|---|
| `semi` | `true` | `javascript.formatter.semicolons` | `"always"` |
| `tabWidth` | `2` | `formatter.indentWidth` | `2` |
| `printWidth` | `90` | `formatter.lineWidth` | `90` |
| `singleQuote` | `false` | `javascript.formatter.quoteStyle` | `"double"` |
| `trailingComma` | `"es5"` | `javascript.formatter.trailingCommas` | `"es5"` |
| `useTabs` | `false` | `formatter.indentStyle` | `"space"` |
| `bracketSpacing` | `true` | `javascript.formatter.bracketSpacing` | `true` |

Biome scores **97% compatibility** with Prettier output. The 3% difference covers edge cases around object property unquoting, arrow function type parameters, and stricter parser behavior.

**Verdict: Full replacement.** `prettier`, `eslint-config-prettier`, and `eslint-plugin-prettier` can all be removed.

---

## Migration Tooling

Biome provides automated migration commands:

```bash
# Migrate ESLint rules to biome.json (reads eslint.config.mjs)
npx @biomejs/biome migrate eslint --write

# Migrate Prettier settings to biome.json (reads .prettierrc)
npx @biomejs/biome migrate prettier --write
```

- The ESLint migrator converts recognized rules and ignore patterns automatically.
- Use `--include-inspired` to also convert "inspired" rules (not just direct ports).
- Unrecognized plugins (security, storybook) are skipped silently.
- Run the Prettier migration second so formatter settings layer correctly.

---

## Gap Summary

### Fully Covered
- TypeScript core rules (`no-explicit-any`, `no-unused-vars`)
- React Hooks (`rules-of-hooks`, `exhaustive-deps`)
- ~33 JSX-a11y rules
- All Prettier formatting settings (100%)
- `eslint-config-prettier` / `eslint-plugin-prettier` (not needed — built-in formatter)

### Partially Covered (differences exist)
- `jsx-a11y/anchor-is-valid` — rule exists, but `components: ["Link"]` and `specialLink` options are **not supported**
- `@typescript-eslint/no-unused-vars` — needs 3 separate Biome rules for full coverage
- `useExhaustiveDependencies` — flags unnecessary deps by default (can be configured)

### Not Covered (gaps)
- `react/jsx-filename-extension` — no equivalent (low impact)
- `eslint-plugin-security` — 12 of 13 rules have no equivalent (**high impact**)
- `eslint-plugin-storybook` — no equivalent (low impact, plugin archived)
- `@next/next/*` rules — no equivalents (**medium impact**)
- Custom component mapping in a11y rules — not supported

---

## Recommendations

### Option A: Full Migration to Biome (accept gaps)

**Remove:** `eslint`, `prettier`, and all their plugins/configs.
**Accept:** Loss of security linting and Next.js-specific rules.
**Best for:** Teams that prioritize speed and simplicity, and can supplement security linting with other tools (Snyk, SonarQube, GitHub Advanced Security).

**Packages to remove (7):**
- `eslint`, `eslint-config-next`, `eslint-config-prettier`, `eslint-plugin-prettier`, `eslint-plugin-security`, `eslint-plugin-storybook`, `prettier`

**Packages to add (1):**
- `@biomejs/biome`

### Option B: Hybrid — Biome + Minimal ESLint (recommended)

**Use Biome for:** Formatting (replace Prettier) + core linting (TypeScript, React, a11y).
**Keep ESLint for:** `eslint-plugin-security` rules only, using `eslint-config-biome` to disable rules already handled by Biome.

```bash
bun add -d @biomejs/biome eslint-config-biome
bun remove prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-storybook
```

**Packages to remove (4):**
- `prettier`, `eslint-config-prettier`, `eslint-plugin-prettier`, `eslint-plugin-storybook`

**Packages to add (2):**
- `@biomejs/biome`, `eslint-config-biome`

**Packages to keep (3):**
- `eslint`, `eslint-config-next` (for `@next/next/*` rules), `eslint-plugin-security`

### Option C: Stay with ESLint + Prettier

No migration. The current setup works and covers all rules. The primary tradeoff is speed — Biome is significantly faster (10-20x for linting, 25x for formatting) which matters for large codebases and CI pipelines but may not be a bottleneck for this project's current size.

---

## Equivalent `biome.json` Configuration

If migrating, the resulting config would look like:

```json
{
  "$schema": "https://biomejs.dev/schemas/2.0.0/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 90
  },
  "javascript": {
    "formatter": {
      "semicolons": "always",
      "quoteStyle": "double",
      "trailingCommas": "es5",
      "bracketSpacing": true
    }
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "suspicious": {
        "noExplicitAny": "error"
      },
      "correctness": {
        "noUnusedVariables": "error",
        "noUnusedImports": "error",
        "noUnusedFunctionParameters": "error",
        "useHookAtTopLevel": "error",
        "useExhaustiveDependencies": "error"
      },
      "security": {
        "noGlobalEval": "error",
        "noSecrets": "warn"
      },
      "a11y": {
        "useValidAnchor": "error"
      }
    }
  },
  "files": {
    "ignore": [
      "node_modules/**",
      ".next/**",
      "db/migrations/**",
      "stories/**",
      ".storybook/**",
      "*.config.js",
      "*.config.mjs",
      "out/**",
      "build/**"
    ]
  }
}
```

---

## Script Changes

| Current | After Migration |
|---|---|
| `"lint": "eslint ."` | `"lint": "biome check ."` (or `"biome lint ."` for lint only) |
| `"format": "prettier --write ."` | `"format": "biome format --write ."` |
| — | `"check": "biome check --write ."` (lint + format in one pass) |

`lint-staged` config would change from `npx eslint --fix` + `npx prettier --write` to a single `npx biome check --write --staged`.
