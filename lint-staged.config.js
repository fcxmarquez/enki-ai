module.exports = {
  // this will check Typescript files (excluding storybook and test files)
  "**/*.(ts|tsx)": (filenames) => {
    const filteredFiles = filenames.filter(
      (file) => !file.includes("stories/") && !file.includes(".storybook/")
    );
    return filteredFiles.length > 0 ? "npx tsc --noEmit" : [];
  },

  // This will lint and format TypeScript and JavaScript files (excluding storybook)
  "**/*.(ts|tsx|js)": (filenames) => {
    const filteredFiles = filenames.filter(
      (file) => !file.includes("stories/") && !file.includes(".storybook/")
    );
    return filteredFiles.length > 0
      ? [
          `npx eslint --fix ${filteredFiles.join(" ")}`,
          `npx prettier --write ${filteredFiles.join(" ")}`,
        ]
      : [];
  },

  // this will Format MarkDown and JSON
  "**/*.(md|json)": (filenames) => `npx prettier --write ${filenames.join(" ")}`,
};
