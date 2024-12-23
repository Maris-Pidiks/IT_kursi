// Function to fetch recipes from the MealDB API based on the search term
function fetchRecipes(query) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

  // Fetch data from the API
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Check if meals are found
      if (data.meals) {
        displayRecipes(data.meals);
      } else {
        document.getElementById(
          "recipes-list"
        ).innerHTML = `<div class="col-12"><p class="text-center">No recipes found for "${query}".</p></div>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.getElementById(
        "recipes-list"
      ).innerHTML = `<div class="col-12"><p class="text-center">Error fetching recipes. Please try again later.</p></div>`;
    });
}

// Function to fetch recipes from the MealDB API based on the first letter
function fetchRecipesByFirstLetter(letter) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;

  // Fetch data from the API
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.meals) {
        displayRecipes(data.meals);
      } else {
        document.getElementById(
          "recipes-list"
        ).innerHTML = `<div class="col-12"><p class="text-center">No meals found starting with "${letter}".</p></div>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.getElementById(
        "recipes-list"
      ).innerHTML = `<div class="col-12"><p class="text-center">Error fetching meals. Please try again later.</p></div>`;
    });
}

// Function to display the list of recipes in the HTML
function displayRecipes(recipes) {
  const recipesList = document.getElementById("recipes-list");
  recipesList.innerHTML = ""; // Clear previous results

  // Loop through the recipes and create a card for each one
  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("col-md-4");
    recipeCard.innerHTML = `
      <div class="card">
        <img src="${recipe.strMealThumb}" class="card-img-top" alt="${recipe.strMeal}">
        <div class="card-body">
          <h5 class="card-title">${recipe.strMeal}</h5>
          <p class="card-text">Category: ${recipe.strCategory}</p>
          <p class="card-text">Area: ${recipe.strArea}</p>
          <a href="${recipe.strSource}" target="_blank" class="btn btn-success">View Recipe</a>
        </div>
      </div>
    `;
    recipesList.appendChild(recipeCard);
  });
}

// Event listener for search button
document.getElementById("search-button").addEventListener("click", () => {
  const query = document.getElementById("search-input").value.trim();
  if (query) {
    fetchRecipes(query);
  } else {
    alert("Please enter a recipe name.");
  }
});

// Optional: Add keypress event to trigger search on Enter key
document.getElementById("search-input").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    document.getElementById("search-button").click();
  }
});

// Event listener for List Meals Starting with A
document.getElementById("list-a").addEventListener("click", () => {
  fetchRecipesByFirstLetter("A");
});

// Event listener for List Meals Starting with B
document.getElementById("list-b").addEventListener("click", () => {
  fetchRecipesByFirstLetter("B");
});
