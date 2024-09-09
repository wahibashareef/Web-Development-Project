document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    if (recipeId !== null) {
        const storedRecipe = JSON.parse(localStorage.getItem('storedRecipe')) || [];
        const recipe = storedRecipe[recipeId];

        if (recipe) {
            document.getElementById('recipe-name').textContent = recipe.name;
            document.getElementById('recipe-image').src = recipe.image || '';
            document.getElementById('recipe-ingredients').innerHTML = recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
            document.getElementById('recipe-directions').textContent = recipe.directions;

            //display directions stepwise
            document.getElementById('recipe-directions').innerHTML = recipe.directions.map(
                (step, index) => `<li>${index + 1}. ${step}</li><br>`).join('');
        }
    }
});
