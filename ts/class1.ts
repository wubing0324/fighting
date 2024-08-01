class Greeter1 {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    // @enumerable(false)
    greet() {
        return "Hello, " + this.greeting;
    }
}

const greeter1 = new Greeter1("world");

console.log(greeter1.greet()); // "Hello, world"

for (let key in greeter1) {
    console.log(key); // 仅输出 "greeting"
}

console.log(Object.keys(greeter1)); // ["greeting"]
