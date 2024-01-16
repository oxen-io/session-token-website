export default (name, title, description = null) => ({
  name,
  title,
  type: "array",
  of: [{ type: "block" }, { type: "image" }],
  description,
});
