module.exports = {
  "presets": [
    '@vue/app',
    "es2015",
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2"
  ],
  "plugins": ["transform-runtime"],
  "env": {
    "test": {
      "presets": ["env", "stage-2"]
    }
  }
}
