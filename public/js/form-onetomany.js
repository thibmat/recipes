console.log('init');

const prototype =`
<div class="row">
    <div class="form-group">
        <label for="ing-name"> Nom</label>
        <input type="text" class= "form-control" id="ing-name">
    </div>
    <div class="form-group">
        <label for="ing-quantity"> Quantité</label>
        <input type="number" class= "form-control" id="ing-quantity">
    </div>
    <div class="form-group">
        <label for="ing-unite">Unité</label>
        <input type="text" class= "form-control" id="ing-unite">
    </div>
</div>`;
const btn = $('<button>')
    .attr('type', 'button')
    .text('Ajouter un ingredient')
    .addClass()
    .on('click', addNewPrototype);



$('form').on('submit', (e) => {
    e.preventDefault();
    const ingredients = [];
    $('.ing-container').each(elem => {
        const inputs = $(elem).find('input');
        ingredients.push(
            {
                name: inputs.eq(0).val(),
                quantity: inputs.eq(1).val(),
                unit: inputs.eq(2).val()
            }
        )
    });
    const jsonIngredients = JSON.stringify(ingredients);
   form.submit();
});
function addNewPrototype(){
    btn.before(prototype);
}