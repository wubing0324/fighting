var counter = 3;
var obj = {a: 1}
function incCounter() {
  counter++;
  obj.a++
}
function getCounter() {
  return counter;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
  getCounter: getCounter,
  obj
};