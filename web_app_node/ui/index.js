// Revealing module pattern
var storyMainPageFunctions = (function () {
    
  // Keep this variable private inside this closure scope

  var setAll = function() {

   readJson();
   
//   $('#character_tag_base').tagEditor({
//        initialTags: ['Arial'],
//        delimiter: ', ', /* space and comma */
//        placeholder: 'Enter characters ...'
//    });

    $('#character_tag_base').tagEditor({
        //initialTags: ['Hello', 'World'],
        delimiter: ',', /* space and comma */
        placeholder: 'Enter tags ...'
    });    
    draw("Character", 'character_tag_label');
    $('#location_tag_base').tagEditor({
        //initialTags: ['Woods', 'Ocean', 'Test'],
        //delimiter: ',', /* space and comma */
        placeholder: 'Enter locations ...'
    });
    draw("Location", 'location_tag_label');    
    
    draw("Get Tags", 'get_tag_from_text'); 
    
    draw_dark("Choose Character", 'character_category'); 
    draw_dark("Choose Location", 'location_category'); 
    // Now invoke the minimap method on the element you'd like to become the minimap,
    // passing a reference to the element you'd like the map to be based on.
    var $parent = $( "#main_frame" );
    
    clickCanvas();
    loadText("../text_sample/austen-sense.txt");
    
    drawCanvas("whole_book_view", '../img/book_view.png');
    drawCanvas("chapter_view", '../img/chapter_view.png');

    //postData('data to process');
    
    //$( "#minimap" ).minimap( $parent );
  };
  var clickCanvas = function(){
    var elementName = "#get_tag_from_text";
    
    $(document).ready(function(){
      $(elementName).click(function(){
        // open next page
        //alert("Test");
        openNav();
      });

    });
  }; 

  var loadText = function(filePath){
    $(document).ready(function(){
      $("#inside_text").load(filePath);
    });
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
  function draw_dark(content, elementID) {
    var currentCanvas = document.getElementById(elementID);
    var ctx = document.getElementById(elementID).getContext('2d');

    ctx.font = 'Bold 70px Arial';
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillText(content,10, 100, currentCanvas.width*0.8 );
  }  
  function callbackFunc(response) {
      // do something with the response
      console.log(response);
  }
  /* Open when someone clicks on the span element */
  var openNav = function() {
      document.getElementById("over_frame").style.width = "100%";
  }

  /* Close when someone clicks on the "x" symbol inside the overlay */
  var closeNav = function() {
      formResult();
      document.getElementById("over_frame").style.width = "0%";
  }  
  var readJson = function(){
    $(document).ready(function () {
      $.getJSON( "../file/sample.json", function( data ) {
        var items = [];
        $.each( data, function( key, val ) {
          // <input type="checkbox" name="vehicle" value="Bike"> I have a bike<br>
          //items.push( "<li id='" + key + "'>" + key + "</li>" );
          items.push( "<input type='checkbox' name='characterCheck' value='" + key + "'>" + key + "<br>" );
        });
       
        $( "<form/>", {
          "class": "my-new-list",
          html: items.join( "" )
        }).appendTo( "#noun_list_1" );
      });
    });    
  }
  var formResult = function(){
    //when close the window get result
   // var currentForm = document.getElementById("#characterCheck");
   // console.log(currentForm.value);
    var selected = [];
    var selected_String = "";
    
    $('#character_tag_base').tagEditor('destory');
    $('#character_tag_base').tagEditor();    
    
    $('input[name="characterCheck"]:checked').each(function() {
      //console.log(this.value);

      //selected.push(this.value);
      selected_String = selected_String + ","+this.value;

     // $('#character_tag_base').tagEditor('addTag', this.value);
      //$('#character_tag_base').tagEditor('addTag', this.value+',');      
      alert( $('#character_tag_base').tagEditor('getTags')[0].tags );
      //$('#character_tag_base').tagEditor('destroy');
      
    });
    $('#character_tag_base').tagEditor('addTag',  selected_String);
    console.log(selected);

  }
  return {
    setAll: setAll,
    clickCanvas: clickCanvas,
    drawCanvas: drawCanvas,
    loadText: loadText,
    openNav: openNav,
    closeNav: closeNav,
    readJson: readJson,
    formResult:formResult    
  }
})();