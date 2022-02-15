const router = require('express').Router();

const scrapController = new (require('@controllers/Scrapcontroller'))();

router.use('/scrap', scrapController.router);

module.exports = router;
