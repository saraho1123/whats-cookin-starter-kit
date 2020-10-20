// const chai = require("chai");
// const expect = chai.expect;

// const sampleData = require('../data/test-data');
const prototypeRecipes = sampleRecipes;
// const prototypeIngredients = recipeCards.sampleIngredients;
const prototypeUsers = sampleUsers;
const prototypeIngredients = sampleIngredients;
// const prototypeUser1 = sampleData.sampleUsers[0];
// const prototypeUser2 = sampleData.sampleUsers[1];

// const Basket = require('./Basket');
// const Ingredient = require('./Ingredient');
// const Recipe = require('./Recipe');
// const User = require('./User');
// const Pantry = require('./Pantry')

let userName = document.querySelector('#user-name');
let allRecipesView = document.querySelector('.all-recipes');
let pantryView = document.querySelector('.pantry');
let singleRecipeView = document.querySelector('.single-recipe');
let buttonPantry = document.querySelector('.pantry-button');
let buttonAllRecipes = document.querySelector('.all-recipes-button');
let allPantry = document.querySelector('.ingredients');
let pantryIngredient = document.querySelector('.pantry-ingredients');
let pantryUserName = document.querySelector('#pantry-user-name');
let userChoiceBtnGroup = document.querySelector('.icon-box');

var recipes = [];
var currentUser;

//EVENT LISTENERS
window.addEventListener('load', displayTheUser);
buttonPantry.addEventListener('click', displayPantryView);
buttonAllRecipes.addEventListener('click', displayPantryView);

function getRandomUser(users) {
  let randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex]
}

function displayTheUser() {
  const randomUser = getRandomUser(prototypeUsers);
  currentUser = new User(randomUser.name, randomUser.id, randomUser.pantry);
  userName.innerText = currentUser.name;
  createRecipeBox();
  displayAllRecipes();
}

function createRecipeBox() {
  prototypeRecipes.forEach(recipe => {
    recipes.push(new Recipe(
      recipe.id,
      recipe.image,
      recipe.ingredients,
      recipe.instructions,
      recipe.name,
      recipe.tags))
  })
}

function displayAllRecipes() {
  allRecipesView.innerHTML = ''
  recipes.forEach(recipe => {
    let miniRecipe =
    `
    <section class = "recipe-card">
          <div class="icon-box">
            <label>
              <input type="radio" name="recipe-buttons" id="chef-radio-button" class="chef-radio-button">
              <img id="chef-icon-disabled" class="chef-icon" src="../images/chef.png" alt="chef icon unchosen">
              <img id="chef-icon-enabled" class="chef-icon hidden" src="../images/chef-solid.png" alt="chef icon chosen">
            </label>
            <label>
              <input type="radio" name="recipe-buttons" id="heart-radio-button" class="chef-radio-button">
              <img id="heart-icon-enabled" class="heart-icon hidden" src="../images/favorite.svg" alt="heart icon chosen">
              <img id="heart-icon-disabled" class="heart-icon" src="../images/favorite_border.svg" alt="heart icon unchosen">              </label>
          </div>
          <img class="recipe-card-img" src="${recipe.image}" alt="recipe image">
          <h2>${recipe.name}</h2>
        </section>
    `
    allRecipesView.innerHTML += miniRecipe;
  });
  addSwitchIconToRecipe();
}

function addSwitchIconToRecipe() {
  let userChoiceBtnGroup = document.querySelectorAll('div.icon-box');
  allRecipesView.addEventListener('click', switchRadioBtnImg);
}

function switchRadioBtnImg() {
  let radioButtonCook = document.querySelectorAll('#chef-radio-button');
  let radioButtonLike = document.querySelectorAll('#heart-radio-button');
  let favoriteImgDisabled = document.querySelectorAll('#heart-icon-disabled');
  let favoriteImgEnabled = document.querySelectorAll('#heart-icon-enabled');
  let chefImgEnabled = document.querySelectorAll('#chef-icon-enabled');
  let chefImgDisabled = document.querySelectorAll('#chef-icon-disabled');

  radioButtonCook.forEach((cookIcon, i) => {
    (cookIcon.checked) ? (chefImgEnabled[i].classList.remove("hidden"), chefImgDisabled[i].classList.add("hidden"))
    :(chefImgEnabled[i].classList.add("hidden"),chefImgDisabled[i].classList.remove("hidden"));
  });

  radioButtonLike.forEach((likeIcon, i) => {
    (likeIcon.checked) ? (favoriteImgEnabled[i].classList.remove("hidden"), favoriteImgDisabled[i].classList.add("hidden"))
    :(favoriteImgEnabled[i].classList.add("hidden"),favoriteImgDisabled[i].classList.remove("hidden"));
  });
};

function displayPantryView() { //refactor if time!
  pantryView.classList.toggle('hidden');
  allRecipesView.classList.toggle('hidden');
  buttonPantry.classList.toggle('hidden');
  buttonAllRecipes.classList.toggle('hidden');
  pantryUserName.innerText = currentUser.name;
  diplayUserPantryIngredients();
}

function diplayUserPantryIngredients() {
  let ingredientNames = currentUser.pantry.getIngredientName(sampleIngredients);
  allPantry.innerHTML = '';
  ingredientNames.forEach(ingredientName => {
    let miniIndgredientBox =
    `
    <li class="pantry-ingredients">${ingredientName.name}<br>quantity: ${ingredientName.amount}</li>
    `
    allPantry.innerHTML += miniIndgredientBox;
  });
}
