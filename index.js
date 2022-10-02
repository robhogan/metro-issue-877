const { transformSync } = require("@babel/core");

const SRC = `
class BaseClass {
  constructor() {
    this.customProp = "foo";
  }
}
class ChildClass extends BaseClass {
  customProp: ?string;
}
const child = new ChildClass();
console.log(child.customProp);
`

const preset = {
  plugins: [
    "@babel/plugin-transform-flow-strip-types",
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ],
};

const withPlugin = transformSync(SRC, {
  presets: [preset],
  plugins: ["@babel/plugin-proposal-class-properties"],
}).code;

const withoutPlugin = transformSync(SRC, {
  presets: [preset],
  plugins: [],
}).code;

eval(withPlugin); // undefined
eval(withoutPlugin); // "foo"
