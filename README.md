File tree
-manifest.json
-content.js
-background.js
-icon
-jQuery

Technologies
-Javascript
-jQuery
-JSON

Description -
  A chrome extension for scaling recipes in browser. When the browserAction is clicked, the user will be prompted to enter the scaling amount for the recipe. The current page will then update with the scaled quantities in the ingredient list.

  v2 - Scaled quantities will be updated in the directions.
-----
Prompt - Enter the number of servings in the original recipe (enter 0 to scale by multiple)

if 0 - Enter the multiple you would like to scale the recipe by 
require - (0 < scalingFactor <= 20)

if > 0 - Enter the desired number of servings
require - (0 < newServings/origServings <= 20)
-----
Once we have our scaling factor, find the list of ingredients and scale the quantities accordingly. Find the number of servings and scale (this should be grabbed before the first prompt to default the correct amount in the text field)
-----
v2
Find any ingredient amounts in the directions, then scale them by the proportion of the amount of the ingredient in the recipe.

eval(fraction) - Convert fraction to decimal

.toFixed(2) - Round to 2 decimal places

var firstWord = codeLine.substr(0, codeLine.indexOf(" ")); - find first word of string (need to grab the second word as well if it's a number plus a fraction)

FoodNetwork.com
Ingredients Box .o-Ingredients
Ingredient elements .o-Ingredients__a-ListItem
Yield .o-Yield > dl > dt .o-RecipeInfo__a-Description


