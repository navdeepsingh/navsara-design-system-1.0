import { writeFileSync } from "fs";
import { join } from "path";
import { format } from "prettier";

export default {
  name: "indexCSSAll",
  do: async function (dictionary, { buildPath }) {
    const themes = Object.keys(dictionary.tokens.themes).sort();

    const all = `

    ${themes.reduce((acc, theme) => {
      acc += `@import "./${theme}/_variables.css";\n`;
      return acc;
    }, "")}`;

    try {
      writeFileSync(
        join(buildPath, "all.css"),
        await format(all, { parser: "css" }),
        "utf-8"
      );
    } catch (err) {
      console.error(err);
    }
  },
  undo: function (err) {
    console.error("indexCSSAll ERROR", err);
  },
};
