/**
 * Class that inherits this class will be singleton
 */
class Singleton {
    constructor() {
        if (Object.getPrototypeOf(this).isInstantiated) {
            throw new Error(`Cannot create more than one instance of ${this.constructor.name}!`);
        }
        /**
         * Set isIstantiated property on service prototype so that the service won't be instantiated again.
         */
        Object.defineProperty(Object.getPrototypeOf(this), 'isInstantiated', {
            value: true,
            writable: false,
            enumerable: false,
            configurable: false
        });
    }
}

module.exports = Singleton;
