const express = require('express');
const shortlinkController = require('./../controllers/shortlinkController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.post('/create', shortlinkController.createShortlink);
router.get('/', shortlinkController.getAllShortlinks);
router.delete('/:id', shortlinkController.deleteShortlink);
router.get('/search', shortlinkController.searchShortlink);

module.exports = router;
