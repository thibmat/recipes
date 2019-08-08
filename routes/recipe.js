const Recipe = require('../model/recipe').Recipe;
const express = require('express');
const router = express.Router();
const createError = require('http-errors');


/* GET home page. */
router.get('/ajout', createRecipe);
router.post('/ajout', createRecipe);

function createRecipe(req, res, next) {
    if(req.method === "POST") {
        // Récupération des variables postées
        const recipe = req.body;
        recipe.publishedAt = new Date();
        // Création d'une recette
        Recipe.create(recipe)
            .then(
                recipe => console.log('Recette sauvegardée'),
                err => console.log(err)
            )
            .catch(err => createError(500))
        ;
    }
    res.render('recipe-create');
};

module.exports = router;