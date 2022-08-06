const express = require("express")
const router = express.Router();
const controller = require('./controller');

router.get('/randomUserData', controller.getData)

router.get('/wordCount', controller.occurrences)

module.exports = router
