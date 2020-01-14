const iconComponents = require.context('./Generated/', false, /\.js$/);
const components = {};

iconComponents.keys().forEach(key => {
  const formattedKey = key.slice(2, -3);
  components[formattedKey] = iconComponents(key).default;
});

module.exports = {
  ...components,
};
