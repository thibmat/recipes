console.log('init');

const prototype = `
    <div class="row ing-container">
        <div class="form-group col-4">
            <label for="ing-name">Nom</label>
            <input type="text" class="form-control" id="ing-name" value="11">
        </div>
        <div class="form-group col-4">
            <label for="ing-quantity">Quantité</label>
            <input type="number" class="form-control" id="ing-quantity" value="11">
        </div>
        <div class="form-group col-4">
            <label for="ing-unit">Unité</label>
            <input type="text" class="form-control" id="ing-unit" value="11">
        </div>
    </div>
`;
const btn = $('<button>')
    .attr('type', 'button')
    .text('Ajouter un nouvel ingrédient')
    .addClass('btn btn-outline-success')
    .on('click', addNewPrototype)
;

const container = $('#ingredients');
container.append(prototype, btn);

$('form').on('submit', (e) => {
    e.preventDefault();

    const ingredients = [];

    $('.ing-container').each((key, elem) => {
        const inputs = $(elem).find('input');
        ingredients.push(
            {
                name: inputs.eq(0).val(),
                quantity: parseInt(inputs.eq(1).val()),
                unit: inputs.eq(2).val(),
            }
        )
    });
    console.log(ingredients);
    const jsonIngredients = JSON.stringify(ingredients);

    $('form').append(
        $('<input>')
            .attr('type', 'hidden')
            .attr('name', 'ingredients')
            .val(jsonIngredients)
    );

    e.target.submit();
});


function addNewPrototype() {
    btn.before(prototype);
}