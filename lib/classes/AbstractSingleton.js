/**
 * Class that inherits this class will enforce abstraction
 * And
 * Child class of that class will be singleton
 */
class AbstractSingletonClass {
    constructor(excludeSingleton) {
        if (
            this.constructor === AbstractSingletonClass ||
            Object.getPrototypeOf(this.constructor) === AbstractSingletonClass
        ) {
            throw new Error('Cannot instantiate Abstract Class!');
        }

        /**
         * Class corrresponding to excludeSingleton should not enforce singleton behaviour
         */
        if (!excludeSingleton || (excludeSingleton && this.constructor.name !== excludeSingleton)) {
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
}

module.exports = AbstractSingletonClass;
