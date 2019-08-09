const express = require('express');
const router = express.Router();
const recipeController = require('../controller/recipe-controller');

/* GET home page. */
router.get('/', recipeController.fiveLast);

module.exports = router;
