const showResult = () => {
    const searchInput = document.getElementById("search-input").value[0];

    if (document.getElementById("search-input").value === "") {
        alert("Please enter your favorite menu");
    }
    else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`)
            .then(response => response.json())
            .then(data => menuList(data));
    }
};

const menuList = data => {
    document.getElementById("div").innerHTML = "";

    for (let i = 0; i < data.meals.length; i++) {
        const element = data.meals[i];

        const innerDiv = document.createElement('div');
        innerDiv.className = "inner-div";
        innerDiv.innerHTML = `
    <img src="${element.strMealThumb}" class="meal-img"></img>
    <h5>${element.strMeal}</h5>
    <h6>${element.strCategory}</h6>
    <button onclick="showDetails('${element.strMeal}')" class="btn btn-danger">Details</button>
    `;

        document.getElementById('div').appendChild(innerDiv);
        document.getElementById("search-input").value = "";
    }
};

const showDetails = mealName => {
    document.getElementById("div").innerHTML = "";
    document.getElementById('div-2').style.display = 'block';

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then(response => response.json())
        .then(data => showIngredients(data));
};

const showIngredients = data => {
    console.log(data.meals[0]);
    console.log(data.meals[0].strMealThumb);

    const innerDiv2 = document.createElement('div');
    innerDiv2.className = 'inner-div-2';
    innerDiv2.innerHTML = `
        <h2>${data.meals[0].strMeal}</h2>
        <h4>${data.meals[0].strCategory}</h4>
        <ul class="ingredients-list">
        <li>${data.meals[0].strIngredient1}</li>
        <li>${data.meals[0].strIngredient2}</li>
        <li>${data.meals[0].strIngredient3}</li>
        <li>${data.meals[0].strIngredient4}</li>
        <li>${data.meals[0].strIngredient5}</li>
        </ul>
        <button class="btn btn-danger">Add To Cart</button>
        `;

    document.getElementById('div-2').appendChild(innerDiv2);

    const innerDiv3 = document.createElement('div');
    innerDiv3.className = 'inner-div-3';
    innerDiv3.innerHTML = `
        <img src="${data.meals[0].strMealThumb}"></img>
        `;

    document.getElementById('div-3').appendChild(innerDiv3);
};