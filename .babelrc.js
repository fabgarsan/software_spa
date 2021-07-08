const plugins = [
  [
    "babel-plugin-import",
    {
      libraryName: "@material-ui/core",
      libraryDirectory: "esm",
      camel2DashComponentName: false,
    },
    "core",
  ],
  [
    "babel-plugin-import",
    {
      libraryName: "@material-ui/icons",
      libraryDirectory: "esm",
      camel2DashComponentName: false,
    },
    "icons",
  ],
  [
    "module-resolver",
    {
      moduleRoot: ["."],
      extensions: [".ts", ".tsx", ".js", ".ios.js", ".android.js"],
      alias: {
        "@api": "./src/api",
        "@components": "./src/components",
        "@containers": "./src/containers",
        "@dbTypes": "./src/dbTypes",
        "@hooks": "./src/hooks",
        "@stores": "./src/stores",
        "@theme": "./src/theme",
        "@utils": "./src/utils",
        "@clients": "./src/clients",
        "@hoc": "./src/hoc",
        "@modules": "./src/modules",
      },
    },
  ],
];

module.exports = { plugins };
