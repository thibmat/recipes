const Recipe = require('../model/recipe');
const slug = require('slug');
const nl2br = require('nl2br');
/**
 * Creation d'une recette (GET)
 * @param req
 * @param res
 * @returns {void|undefined|String}
 */
module.exports.create = (req, res) => res.render('recipe-create');
/**
 * Enregistrement d'une recette (POST)
 * @param req
 * @param res
 */
module.exports.createCheck = (req, res) => {
    // Récupération des variables postées
    const recipe = req.body;
    recipe['ingredients'] = JSON.parse(recipe['ingredients']);
    recipe.publishedAt = new Date();
    recipe.slug = slug(recipe.name, {lower: true});
    // Création d'une recette
    Recipe.create(recipe)
        .then(
            recipe => console.log('Recette sauvegardée : ' + recipe),
            err => console.log(err)
        )
        .catch(err => createError(500))
    ;
    res.render('recipe-create');
};
/**
 * Affichage de la liste des recettes (GET)
 * @param req
 * @param res
 * @param next
 */
module.exports.list = (req, res, next) => {
    Recipe.find((err, recipes) => {
        if (err)
            next(err);
        else
            recipes.intro = nl2br(recipes.intro);
        res.render('recipe-list', {recipes: recipes});
    });
};
/**
 * affichage du detail d'une recette (en fonction du slug)
 * @param req
 * @param res
 * @param next
 */
module.exports.detail = (req, res, next) => {
    const params = req.params;
    Recipe.findOne({slug: params.slug}, (err, recipe) => {
        if (err)
            next(err);
        else
            console.log(recipe);
        res.render('recipe-detail', {recipe: recipe});
    })
};
/**
 * Recherche d'une recette contenant 1 ingredient
 * @param req
 * @param res
 * @param next
 */
module.exports.search = (req, res, next) => {
    const ing = req.body.ingredient;
    const pattern = new RegExp(ing, 'i');
    Recipe.find(
        {
            "ingredients.name": pattern
        },
        (err, recipes) => {
            if (err)
                next(err);
            else
                recipes.intro = nl2br(recipes.intro);
            res.render('recipe-list', {recipes: recipes});
        });
};
/**
 * Récupération des 5 dernieres recettes
 * @param req
 * @param res
 * @param next
 */
module.exports.fiveLast = (req, res, next) => {
    Recipe.find()
        .select('name intro')
        .sort({'publishedAt': 'desc'})
        .limit(5)
        .exec((err, recipes) => {
            if (err) {
                next(err);
            } else {
                res.render('index', {title: 'Mon petit site de recettes', recipes: recipes});
            }
        });
};
module.exports.update = (req, res, next) => {
    // Récupération du slug
    const slug = req.params.slug;

    Recipe.findOne(
        {slug: slug},
        (err, recipe) => {
            if (err) next(err);
            else res.render('recipes-update', {recipe: recipe});
        }
    );
};
module.exports.updateCheck = (req, res, next) => {
    // Récupération du slug
    const slug = req.params.slug;
    let recipeBDD;

    Recipe.findOne(
        {slug: slug},
        (err, recipeBDD) => {
            if (err) next(err);
            else {
                recipe = recipeBDD;
                // fix temporaire
                req.body.ingredients = recipe.ingredients;
                Recipe.update(
                    {slug: slug},
                    req.body,
                    (err, nbLines) => {
                        if (err) next(err);
                        else {
                            if (nbLines === 1) {
                                console.log("Produit bien modifié")
                            } else {
                                console.log("Produit non-trouvé ou identique")
                            }
                        }
                    }
                );
                res.redirect('/recettes/' + recipe.slug + '/edit');
            }
        }
    );
};
module.exports.delete = (req, res, next) => {
    Recipe.remove(
        {
            slug:req.params.slug
        },
        (err, nbLines) => {
            if (err) next(err);
            else res.redirect('/recettes');
        }
    )
}