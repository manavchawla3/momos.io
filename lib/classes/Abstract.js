/**
 * Class that inherits this class will enforce abstraction
 */
class AbstractClass {
    constructor() {
        if (this.constructor === AbstractClass || Object.getPrototypeOf(this.constructor) === AbstractClass) {
            throw new Error('Cannot instantiate Abstract Class!');
        }
    }
}

module.exports = AbstractClass;
