let scalingFactor = 1;
let origServings = 1;
let newServings = 1;
const numWords = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'ten': 10,
    'eleven': 11,
    'twelve': 12,
    'thirteen': 13,
    'fourteen': 14,
    'fifteen': 15,
    'sixteen': 16,
    'seventeen': 17,
    'eighteen': 18,
    'nineteen': 19,
    'twenty': 20,
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      getRecipeScale();
    }
  }
);

function getRecipeScale() {
  let defaultYield = $(".o-Yield").find(".o-RecipeInfo__a-Description").text();
  defaultServings = parseInt(defaultYield);

    // Prompts for scaling, defaults to yield amount on page
  origServings = prompt('Enter the number of servings in the original recipe. Enter 0 to scale by multiplication.', defaultServings);

  if (origServings > 0) {
    newServings = prompt('Enter the desired number of servings');
    if (newServings > 0) {
      scalingFactor = newServings/origServings;  
    } else {
      invalidInput();
    }
    
  } else if (origServings == 0) {
    scalingFactor = prompt('Enter the multiple you would like to scale the recipe by');
    if (scalingFactor <= 0 || isNaN(scalingFactor)) {
      invalidInput();
    } 

  } else {
    invalidInput();
  }

    // Scale recipe and replace yield number on page
  if (scalingFactor != 1) {
    $(".o-Yield").find(".o-RecipeInfo__a-Description").text(newServings + " servings");
    scaleRecipe();
  }
}

function invalidInput() {
  alert('Invalid input');
  scalingFactor = 1;
}

function scaleRecipe() {
      // Grabs the quantity of each ingredient
  $(".o-Ingredients").find(".o-Ingredients__a-ListItem").each(function(index) {
    let origIngredient = $(this).text().trim();
    let ingredientName = origIngredient.substr(origIngredient.indexOf(" "), origIngredient.length);
    let origQuantity = convertWords(origIngredient.substr(0, origIngredient.indexOf(" ")));
    ingredientName = ingredientName.trim();
    let ingredientArray = ingredientName.split(" ");

      // Handles range of values inputs
    if (ingredientArray[0] === "to") {
      let secondQuantity = convertWords(ingredientArray[1]);
      ingredientArray = ingredientArray.splice(2, ingredientArray.length);
      let newQuantity = scaleQuantity(origQuantity);
      
      let newSecond = scaleQuantity(secondQuantity);
      $(this).text(newQuantity + " to " + newSecond + " " + ingredientArray.join(" "));

      // Handles compound fractional inputs
    } else if (ingredientArray[0].substr(1,1) === "/") {
      origQuantity = eval(origQuantity) + eval(ingredientArray[0]);
      console.log(origQuantity);
      let newQuantity = scaleQuantity(origQuantity);
      ingredientArray.shift();
      $(this).text(newQuantity + " " + ingredientArray.join(" "));

      // Handles whole number and fractional inputs
    } else {
      let isNumber = eval('typeof ' + origQuantity);
      if (isNumber !== "undefined") {
        origQuantity = eval(origQuantity);
        let newQuantity = scaleQuantity(origQuantity);
        $(this).text(newQuantity + " " + ingredientName);
      }
    } 
  })
}
// Converts number words in to integers
function convertWords(input) {
  if (numWords.hasOwnProperty(input.toLowerCase())) {
    return numWords[input.toLowerCase()];
  } else {
    return input;
  }
}
// Scales inputs by given scaling factor, limits to 2 decimal places
function scaleQuantity(input) {
  return Math.round((input * scalingFactor) * 100)/100;
}