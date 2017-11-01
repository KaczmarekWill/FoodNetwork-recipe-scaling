chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      getRecipeScale();
    }
  }
);

function getRecipeScale() {
  var origServings = prompt('Enter the number of servings in the original recipee. Enter 0 to scale by multiplication.');
}