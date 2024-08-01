var Greeter1 = /** @class */ (function () {
    function Greeter1(message) {
        this.greeting = message;
    }
    // @enumerable(false)
    Greeter1.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter1;
}());
var greeter1 = new Greeter1("world");
console.log(greeter1.greet()); // "Hello, world"
for (var key in greeter1) {
    console.log(key); // 仅输出 "greeting"
}
console.log(Object.keys(greeter1)); // ["greeting"]
