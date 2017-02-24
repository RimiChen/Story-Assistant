// Revealing module pattern
var storyMainPageFunctions = (function () {
    
  // Keep this variable private inside this closure scope

  var createStory = function() {
/*
    var failingGrades = myGrades.filter(function(item) {
        return item < 70;
      });
*/
    //alert("Test");
  };


  return {
    createStory: createStory
  }
})();