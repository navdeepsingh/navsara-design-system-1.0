const excludedCategories = new Set(["font", "effect", "themes"]);

export default ({ value, attributes: { category } }) =>
  value !== null && value !== undefined && !excludedCategories.has(category);
