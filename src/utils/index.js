import StyleDictionary from "style-dictionary";

import actionsIndexCSSAll from "./actions/indexCSSAll.js";

import filterGlobalTokens from "./filters/filterTokens.js";

import nameRemoveTheme from "./transformers/removeNameTheme.js";

import formatCSS from "./formatters/formatCss.js";

export default {
  hooks: {
    actions: {
      ...StyleDictionary.hooks.actions,
      indexCSSAll: actionsIndexCSSAll,
    },
    transforms: {
      "name/removeTheme": nameRemoveTheme,
    },
    transformGroups: {
      "custom/css": StyleDictionary.hooks.transformGroups.css.concat([
        "name/removeTheme",
      ]),
    },
    formats: {
      "custom/css": formatCSS,
    },
    filters: {
      filterGlobalTokens,
    },
  },
};
