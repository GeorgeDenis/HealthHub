// module.exports = {
//   tailwindConfig: "./tailwind.config.cjs",
//   plugins: [require("prettier-plugin-tailwindcss")],
// };
(async () => {
  const prettierPluginTailwindCSS = await import('prettier-plugin-tailwindcss');

  module.exports = {
    tailwindConfig: "./tailwind.config.cjs",
    plugins: [prettierPluginTailwindCSS.default],
  };
})();
