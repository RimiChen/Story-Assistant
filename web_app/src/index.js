// Revealing module pattern
var storyMenuFunctions = (function () {
    
  // Keep this variable private inside this closure scope
  var storyNumber = 3;
  
  var importStory = function() {
    console.log("import Story");
    var bookIconPath = './img/Book.png';
    for(var storyNumberIter = 0; storyNumberIter < storyNumber; storyNumberIter++){
      drawCanvas(storyNumberIter, storyNumberIter * 200, bookIconPath);
      clickCanvas(storyNumberIter);
    }
    var writeIconPath = './img/icon_Create.png';
    drawCanvas(storyNumber, storyNumber * 200, writeIconPath);
    clickCanvas(storyNumber);

  };

  var createStory = function() {
/*
    var failingGrades = myGrades.filter(function(item) {
        return item < 70;
      });
*/

    return 'Create a new story ' + '.';
  };

  // Explicitly reveal public pointers to the private functions 
  // that we want to reveal publicly
  var drawCanvas = function( newIndex, shift, imgPath){
    var newBook = {
        canvas : document.createElement("canvas"),
        draw : function() {
            this.canvas.id = "canvas"+newIndex;
            this.canvas.width = 128;
            this.canvas.height = 128;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[newIndex]);
            
        }
    }
    
    newBook.draw();
    
    var ctx = document.getElementById("canvas"+newIndex).getContext('2d');
    var img = new Image();
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
    };
    img.src = imgPath;
  };
  
  var clickCanvas = function(index){
    var elementName = "#canvas"+index;
    
    $(document).ready(function(){
      $(elementName).click(function(){
          // open next page
          window.location.href='./ui/index.html';
      });
    });
  };

  return {
    importStory: importStory,
    createStory: createStory,
    drawCanvas: drawCanvas,
    clickCanvas: clickCanvas
  }
})();