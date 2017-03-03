// Revealing module pattern
var storyMainPageFunctions = (function () {
    
  // Keep this variable private inside this closure scope

  var setAll = function() {


   $('#character_tag_base').tagEditor({
        initialTags: ['Arial'],
        delimiter: ', ', /* space and comma */
        placeholder: 'Enter characters ...'
    });
    draw("Character", 'character_tag_label');
    $('#location_tag_base').tagEditor({
        initialTags: ['Woods', 'Ocean', 'Test'],
        delimiter: ', ', /* space and comma */
        placeholder: 'Enter locations ...'
    });
    draw("Location", 'location_tag_label');    
    
    draw("Get Tags", 'get_tag_from_text'); 
    // Now invoke the minimap method on the element you'd like to become the minimap,
    // passing a reference to the element you'd like the map to be based on.
    var $parent = $( "#main_frame" );
    
    clickCanvas();
    loadText("./test.txt");
    
    drawCanvas("whole_book_view", '../img/book_view.png');
    drawCanvas("chapter_view", '../img/chapter_view.png');
    
    //$( "#minimap" ).minimap( $parent );
  };
  var clickCanvas = function(){
    var elementName = "#get_tag_from_text";
    
    $(document).ready(function(){
      $(elementName).click(function(){
        // open next page
        alert("Test");
      });

    });
  }; 
  var loadText = function(filePath){
    $("#inside_text").load(filePath);
  };
  var drawCanvas = function( elementName, imgPath){
   
    //newBook.draw();
    
    var currentCanvas =  document.getElementById(elementName);
    var ctx = document.getElementById(elementName).getContext('2d');
    var img = new Image();
    img.onload = function() {
      ctx.drawImage(img, 0,  0, currentCanvas.width, currentCanvas.height);
    };
    img.src = imgPath;
  };
  
  function draw(content, elementID) {
    var ctx = document.getElementById(elementID).getContext('2d');

    ctx.font = 'Bold 15px Arial';
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillText(content, 0, 15);
  }

  return {
    setAll: setAll,
    clickCanvas: clickCanvas,
    drawCanvas: drawCanvas,
    loadText: loadText
  }
})();