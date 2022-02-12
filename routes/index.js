const router = require('express').Router();
const config = require('config');

const RequestLogger = require('@middlewares/requestLogger');
const IndexController = require('@controllers/indexController');

/*
|--------------------------------------------------------------------------
| Middlewares
|--------------------------------------------------------------------------
|
| requestLogger => Logs request
*/
router.use(RequestLogger);

/*
|--------------------------------------------------------------------------
| PINGING
|--------------------------------------------------------------------------
|
| Base route to ping and check app status
*/
router.get('/health', [], IndexController.index);

/*
|--------------------------------------------------------------------------
| AUTHENTICATED
|--------------------------------------------------------------------------
|
| Load all routes that require authentication
*/
router.use(`/api/${config.get('api.version')}`, require('./authenticated'));

/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
|
| Load all publically accessible routes
*/
router.use(`/public/${config.get('api.version')}`, require('./public'));

module.exports = router;
