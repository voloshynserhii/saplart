const express = require('express');

const isAuth = require('../middleware/is-auth');
const Logs = require('../controllers/Logs')
const router = express.Router();

router.get('/', Logs.Get);

module.exports = router;
