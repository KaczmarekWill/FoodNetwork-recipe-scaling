let scalingFactor = 1;
let origServings = 1;
let newServings = 1;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      getRecipeScale();
    }
  }
);

function getRecipeScale() {
  origServings = prompt('Enter the number of servings in the original recipe. Enter 0 to scale by multiplication.');

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
  
  if (scalingFactor != 1) {
    scaleRecipe();
  }
}

function invalidInput() {
  alert('Invalid input');
  scalingFactor = 1;
}

function scaleRecipe() {
  alert('Recipe Scaled');
}