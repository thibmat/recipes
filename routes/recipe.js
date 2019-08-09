//IMPORTS
const Recipe = require('../model/recipe').Recipe;
const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const recipeController = require('../controller/recipe-controller');

//LES ROUTES
//Point de montage : '/recettes'

router.get('/', recipeController.list);
router.post('/search', recipeController.search);
router.route('/ajout')
    .get(recipeController.create)
    .post(recipeController.createCheck);
router.route('/:slug')
    .get(recipeController.detail)
    .delete(recipeController.delete);
router.route('/:slug/edit')
    .get(recipeController.update)
    .put(recipeController.updateCheck);

//EXPORT
module.exports = router;