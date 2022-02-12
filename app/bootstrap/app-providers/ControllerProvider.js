module.exports = services => {
    if (services) {
        require('@controllers/AbstractBaseController').injectServices(services);
    } else {
        throw new Error('Services should be loaded in app before providing controller');
    }
};
