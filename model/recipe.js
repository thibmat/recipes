const mongoose = require('mongoose');
const ingredientSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    unit: String
});
let recipeSchema = new mongoose.Schema({
    name: String,
    intro: String,
    nbIngredients: Number,
    publishedAt: Date,
    ingredients: [ingredientSchema]
});
module.exports.Recipe = mongoose.model('recipe', recipeSchema);
module.exports.ingredient = mongoose.model('ingredient', ingredientSchema);
