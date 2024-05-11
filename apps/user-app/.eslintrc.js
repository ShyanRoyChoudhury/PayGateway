/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  ignorePatterns:['postcss.config.js', 'tailwind.config.js'],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
