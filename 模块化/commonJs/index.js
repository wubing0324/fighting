let { getCount, increment } = require("./moduleA");

console.log(getCount());

setInterval(() => {
  console.log(getCount());
}, 1000);
