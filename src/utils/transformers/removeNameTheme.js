export default {
  type: "name",
  transitive: true,
  filter: ({ attributes }) => attributes.category === "themes",
  transform: ({ name, attributes }) =>
    name.replace(`${attributes.category}-`, ""),
};
