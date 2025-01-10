import StyleDictionary from "style-dictionary";
import hooks from "./utils/index.js";

const platforms = {};

["dark", "light"].forEach((theme) => {
  StyleDictionary.registerTransform({
    type: "name",
    name: "rename-" + theme,
    transitive: true,
    filter: ({ name }) => name.startsWith(theme),
    transform: ({ name }) => name.replace(theme + "-", ""),
  });

  platforms[`${theme}-css`] = {
    transformGroup: "custom/css",
    buildPath: "build/css/" + theme + "/",
    transforms: ["rename-" + theme],
    files: [
      {
        destination: `_variables.css`,
        format: "custom/css",
        filter: {
          attributes: {
            category: "themes",
            type: theme,
          },
        },
        options: {
          showFileHeader: true,
          outputReferences: true,
        },
      },
    ],
  };
});

const sd = new StyleDictionary({
  ...hooks,
  log: {
    verbosity: "verbose",
    warnings: "disabled",
  },
  source: ["./src/tokens/**/*.json"],
  platforms: {
    css: {
      transformGroup: "css",
      prefix: "sd",
      buildPath: "build/css/",
      files: [
        {
          destination: "_variables.css",
          format: "css/variables",
          filter: "filterGlobalTokens",
        },
      ],
    },
    themesCSS: {
      buildPath: "build/css/",
      actions: ["indexCSSAll"],
      files: [
        {
          destination: "all.css",
          format: "css/variables",
        },
      ],
    },
    ...platforms,
  },
});
await sd.buildAllPlatforms();
