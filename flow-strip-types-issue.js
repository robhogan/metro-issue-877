const { transformSync } = require("@babel/core");

const SRC = `
class BaseClass {
  constructor() {
    this.customProp = "foo";
  }
}
class ChildClass extends BaseClass {
  customProp;
}
const child = new ChildClass();
console.log(child.customProp);
`

const typesStripped = transformSync(SRC, {
  plugins: ["@babel/plugin-transform-flow-strip-types"],
}).code;

console.log(typesStripped);

console.log('SRC:');
eval(SRC);
console.log('typesStripped:');
eval(typesStripped);
