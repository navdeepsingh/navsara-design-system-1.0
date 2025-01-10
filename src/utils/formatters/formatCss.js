/** @type {import('style-dictionary/types').Format} */
import { format } from "prettier";
import { formattedVariables } from "style-dictionary/utils";

export default ({ dictionary, options }) => {
  const themes = (Object.keys(dictionary.tokens["themes"] || []) || [])?.sort();

  const formatTheme = ({ theme, dictionary, outputReferences }) => {
    return `
    [data-theme="${theme}"] {
        ${formattedVariables({
          format: "css",
          dictionary,
          outputReferences,
          formatting: {
            indentation: "  ",
            header: true,
          },
        })}
    }`;
  };

  return format(
    `
    ${themes
      .map((theme) => formatTheme({ theme, dictionary }))
      .join("")
      .trim()}    
`,
    {
      parser: "css",
      printWidth: 80,
      tabWidth: 2,
      singleQuote: false,
      trailingComma: "none",
      bracketSpacing: true,
      semi: true,
      useTabs: false,
      insertPragma: false,
      requirePragma: false,
      proseWrap: "preserve",
      arrowParens: "avoid",
      rangeStart: 0,
      rangeEnd: Infinity,
      filepath: undefined,
      jsxSingleQuote: false,
      jsxBracketSameLine: false,
      noSemi: false,
      parser: "css",
    }
  );
};
