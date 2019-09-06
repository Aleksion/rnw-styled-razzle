"use strict";
var nodeExternals = require("webpack-node-externals");

const TRANSPILE_MODULES = [/^/, /^react-spring/];

module.exports = {
  modify(config, { target, dev }, webpack) {
    /*******************************************
     *** Aliases
     ******************************************/
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      "react-native$": "react-native-web"
    };

    // Configure externals
    const externalsConfig = {
      whitelist: [
        dev ? "webpack/hot/poll?300" : null,
        /\.(eot|woff|woff2|ttf|otf)$/,
        /\.(svg|png|jpg|jpeg|gif|ico)$/,
        /\.(mp4|mp3|ogg|swf|webp)$/,
        /\.(css|scss|sass|sss|less)$/,
        ...TRANSPILE_MODULES
      ].filter(Boolean)
    };
    config.externals =
      target === "node" ? [nodeExternals(externalsConfig)] : [];

    return config;
  }
};
