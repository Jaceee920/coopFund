const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.resolverMainFields = ["browser", "module", "main"];
config.resolver.sourceExts.push("mjs", "cjs", "jsx", "js", "ts", "tsx");

module.exports = config;
