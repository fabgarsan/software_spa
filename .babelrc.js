const plugins = [
  [
    "babel-plugin-import",
    {
      libraryName: "@mui/material",
      libraryDirectory: "",
      camel2DashComponentName: false,
    },
    "core",
  ],
  [
    "babel-plugin-import",
    {
      libraryName: "@mui/icons-material",
      libraryDirectory: "",
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
        "@dto": "./src/dto",
        "@hooks": "./src/hooks",
        "@stores": "./src/stores",
        "@theme": "./src/theme",
        "@utils": "./src/utils",
        "@clients": "./src/clients",
        "@hoc": "./src/hoc",
        "@printer": "./src/printer",
      },
    },
  ],
];

module.exports = { plugins };
