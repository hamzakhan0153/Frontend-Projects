const search = document.getElementById('search');
const submit = document.getElementById('submit');
const generate = document.getElementById('generate');
const resultsHeading = document.getElementById('results-heading');
const meals = document.getElementById('meals');
const selectedMeal = document.getElementById('selected-meal');

searchMeal = async (e) => {

    e.preventDefault();
    const searchText = search.value;
    if (searchText.trim()) {
        //console.log(searchText);
        let res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
        let response = res.data
        console.log(response);
        resultsHeading.innerHTML = `<h2>Search results for ${searchText}</h2>`
        if (response.meals === null) {
        resultsHeading.innerHTML = `<h2>No results found for ${searchText}</h2>`
        } else {
            meals.innerHTML = response.meals.map( meal => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
              <div class="meal-info" data-mealID="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>
              </div> 
            </div>
            ` )
            .join('')
        }
        search.value = '';
    } else {
        alert('Please add search Keyword');
    }
    //remove previous meal info
    selectedMeal.innerHTML = '';

};
// function getMeal(mealId) {
//     // Fetch details of meal using the mealId
//     fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
//         .then(res => res.json())
//         .then(data => {
//             const meal = data.meals[0];
//             // Render in the UI
//             displayMealDetails(meal);
//         });
// }
getMeal = async (mealId) => {
    let res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    let response = res.data
    const meal = response.meals[0]
    console.log(meal);
    displayMealDetails(meal);
}

displayMealDetails = (meal) => {
    meals.innerHTML = '';
    resultsHeading.innerHTML = '';
    const ingredients = [];
    for (let i = 1; i<= 20; i++) {
        if(meal[`strIngredient${i}`] ) {
        ingredients.push(`${meal[`strIngredient${i}`]}: ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    };
    selectedMeal.innerHTML = `
        <div class="selected-meal-details">
           <h1>${meal.strMeal}</h1>
           <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
           <div class="slected-meal-info">
           ${meal.strCategory ? `<p>${meal.strCategory}</p>`: ''}
           ${meal.strArea ? `<p>${meal.strArea}</p>`: ''}
           </div>
           <div class="selected-meal-instructions">
           <p>${meal.strInstructions}</p>
           <h3>Ingredients</h3>
           <ul>
             ${ingredients.map( ingredient => `<li>${ingredient}</li>`).join('')}
           </ul>
           </div>
        </div>
    `
}

submit.addEventListener('submit', searchMeal);

// meals.addEventListener('click', e => {
//     const mealInfo = e.path.find(item => {
//         if (item.classlist) {
//             return item.classlist.contains('meal-info');
//         } else {
//             return false;   
//         }
//     });
//     if (mealInfo) {
//         const mealId = mealInfo.getAttribute('data-mealid');
//         //console.log(mealId);
//         getMeal(mealId);
//     }
// })

meals.addEventListener('click', e => {
    // Find and return only if clicked on a meal-info div
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    });
    // Check if mealInfo exists
    if (mealInfo) {
        // Get the data-mealid attribute
        const mealId = mealInfo.getAttribute('data-mealid');
        // Fetch details of meal
        getMeal(mealId);
    }
});

