document.addEventListener('DOMContentLoaded', () => {
    const recipeList = document.getElementById('recipe-list');
    const form = document.getElementById('form');
    const searchInput = document.getElementById('search');

    window.toggleDrawer = () => {
        const drawer = document.getElementById('drawer');
        drawer.classList.toggle('open');
    };

    let storedRecipe = JSON.parse(localStorage.getItem('storedRecipe')) || [];

    const displayRecipe = (filteredRecipe = storedRecipe) => {
        recipeList.innerHTML = '';
        filteredRecipe.forEach((recipes, index) => {
            const recipe = document.createElement('div');
            recipe.className = 'recipe';
            recipe.innerHTML = `
            <div class="recipe-content">
                <a href="recipe.html?id=${index}">
                ${recipes.image ? `<img src="${recipes.image}" alt="${recipes.name}">` : ''}
                <div class="recipe-text">
                    <h2>${recipes.name}</h2>
                </div>
                </a>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
            `;

            recipeList.appendChild(recipe)
        });

        //add event listener for delete button
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                deleteRecipe(index);
            });
        });
    };

    const deleteRecipe = (index) => {
        //remove recipe from array
        storedRecipe.splice(index, 1);

        //update local storage
        localStorage.setItem('storedRecipe', JSON.stringify(storedRecipe));
        displayRecipe();
    };

    const searchRecipe = () => {
        const query = searchInput.value.trim().toLowerCase();

        const filteredRecipe = storedRecipe.filter(recipe => {
            //check if the query matches the recipe name or ingredients
            return (
                recipe.name.toLowerCase().includes(query) ||
                recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query))
            );
        });

        displayRecipe(filteredRecipe);
    };

    function handleSubmit (event) {
        //prevent default form submission
        event.preventDefault();

        const nameInput = document.getElementById('name');
        const ingredientsInput = document.getElementById('ingredients');
        const directionsInput = document.getElementById('directions');
        const imageFile = document.getElementById('img').files[0];

        const name = nameInput.value.trim();
        const ingredients = ingredientsInput.value.trim().split('\n').map(i => i.trim()).filter(i => i !=="");
        const directions = directionsInput.value.trim().split('\n').map(step => step.trim()).filter(step => step !== "");

        if(name && ingredients.length > 0 && directions.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                const newRecipe = {name, ingredients, directions, image:reader.result};
                storedRecipe.push(newRecipe);
                localStorage.setItem('storedRecipe', JSON.stringify(storedRecipe));
                displayRecipe();
            };

            if(imageFile) {
                reader.readAsDataURL(imageFile);
            }else{
                const newRecipe = {name, ingredients, directions};
                storedRecipe.push(newRecipe);
                localStorage.setItem('storedRecipe', JSON.stringify(storedRecipe));
                displayRecipe();
            }
        }

        nameInput.value = '';
        ingredientsInput.value = '';
        directionsInput.value = '';
        document.getElementById('img').value = '';
    }

    form.addEventListener('submit', handleSubmit);

    //update the displayed recipe as the user types
    searchInput.addEventListener('input', searchRecipe);

    displayRecipe();

});