function fetchMargaritaCocktails() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
        .then(response => response.json())
        .then(data => displayCocktails(data.drinks))
        .catch(error => console.error('Error:', error));
}

function displayCocktails(cocktails) {
    const results = document.getElementById('results');
    results.innerHTML = ''; 
    if (cocktails) {
        cocktails.forEach(cocktail => {
            const div = document.createElement('div');
            div.innerHTML = `
                <h3>${cocktail.strDrink}</h3>
                <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}" height="100">
                <p>${cocktail.strInstructions}</p>
            `;
            results.appendChild(div);
        });
    } else {
        results.innerHTML = '<p>No Margarita cocktails found.</p>';
    }
}


window.onload = fetchMargaritaCocktails;

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', handleSearch);
});

function handleSearch() {
    const searchBar = document.getElementById('search-bar');
    const searchTerm = searchBar.value.trim();

    if (searchTerm !== '') {
        
        fetchCocktailResults(searchTerm);
    } else {
        alert('Please enter a search term.');
    }
}

async function fetchCocktailResults(searchTerm) {
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        const data = await response.json();

        
        displayResults(data.drinks);
    } catch (error) {
        console.error('Error fetching cocktail results:', error);
    }
}

function displayResults(cocktails) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (cocktails) {
        cocktails.forEach(cocktail => {
            const cocktailElement = document.createElement('div');
            cocktailElement.classList.add('cocktail-item');
            cocktailElement.innerHTML = `
                <h3>${cocktail.strDrink}</h3>
                <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
                <p>${cocktail.strInstructions}</p>
            `;
            resultsContainer.appendChild(cocktailElement);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    }
}
