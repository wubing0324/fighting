function enumerable1(constructor) {
    constructor.type = '1111111111111111111'
    return constructor
}

@enumerable1(false)
class Greeter2 {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
}
