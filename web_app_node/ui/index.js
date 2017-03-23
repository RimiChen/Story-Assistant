

var tabNumber = 10;
var colorList = {};
var storyMainPageFunctions = (function () {
    
  // Keep this variable private inside this closure scope
  var setAll = function() {

   var test = 0;
   readJson();
   readJson_location();
   
    draw("Character", 'character_tag_label');

    draw("Location", 'location_tag_label');    
    
    draw("Get Tags", 'get_tag_from_text');
	
	draw("Get Places", 'get_location_from_text'); 
	
	
	console.log("Show place is displayed");
    
    draw_dark("Choose Character", 'character_category'); 
    draw_dark("Choose Location", 'location_category'); 
    // Now invoke the minimap method on the element you'd like to become the minimap,
    // passing a reference to the element you'd like the map to be based on.
    var $parent = $( "#main_frame" );
    
    clickCanvas();
	clickCanvasGetLocation();
	console.log("Why the browser won't clear data by it self!!")
    //loadText("../text_sample/austen-sense.txt");
    newLoadText("../text_sample/austen-sense.txt");

    divOnChange();
    //console.log("%%%"+textContent);
    //paging();
    
    drawCanvas("whole_book_view", '../img/book_view.png');
    drawCanvas("chapter_view", '../img/chapter_view.png');
    
    tagFunction();
	tagFunction_location();
    //postData('data to process');
    //$( "#minimap" ).minimap( $parent );

  };
  function changeValue(test){
    test = 2;
    //return 3;
  }
  var textOnChange = function(){
    $(document).ready(function(){
      $('story_page').bind('textchanged', function() {
        console.log(" changed");
      });      
    });   
  }
  var divOnChange = function(){
    $(document).ready(function(){
      $('#inside_text').bind('contentchanged', function() {
        // do something after the div content has changed
        //alert('woo');
        var currentDiv = document.getElementById('inside_text');
        //console.log("^^^^^"+currentDiv.innerHTML);
        //separate text in here
        //Without html length
        console.log( $.trim($('#inside_text').text()).length );
        
        //divide text in here
        var currentText = $('#inside_text').text();
        //console.log(currentText);
        //console.log(currentText[0]);

        //var text = " I am totally unappreciated in my time. You can run this whole park from this room with minimal staff for up to 3 days. You think that kind of automation is easy? Or cheap? You know anybody who can network 8 connection machines and debug 2 million lines of code for what I bid for this job? Because if he can I'd like to see him try.";

        var myRe = /\S[\s\S]{0,3000}\S(?=\s|$)/g;
        var m;
        var result = new Array();

        while ((m = myRe.exec(currentText)) !== null) {
           result.push(m[0]);
        }

        //console.log(result[0]);

        
        var text_area = document.getElementById('text_body');
        console.log($('#story_body').height());
        //add tab button in here
        //var tabNumber = 8;

        for(var tab_iter = 1 ; tab_iter < tabNumber+1; tab_iter++){
          addDiv(tab_iter, result[tab_iter-1]);
          addCanvas(tabNumber,tab_iter);
          addButton(tabNumber, tab_iter);

        }
        
        var first_page = document.getElementById("story_tab"+1);
        first_page.style.display = "block";
        
      });      
    });   

  }
  function addButton(tabNumber,id_number){
    var newButton = document.createElement("button");
    newButton.id = "button"+id_number;
    newButton.class = "tab_button";
    newButton.innerHTML = "Page_"+id_number;
    newButton.value = id_number;
    //newButton.setAttribute('onclick')
    var tab_menu = document.getElementById("tab_menu");    
    tab_menu.appendChild(newButton);
    newButton.onclick = function(){

      openStoryTab(tabNumber, id_number);
    };

  }
  function addDiv( id_number, content){
    var newDiv = document.createElement("div");
    newDiv.id = "story_tab"+id_number;
    newDiv.class = "story_page";
    newDiv.innerHTML = content;
    var story_body = document.getElementById("story_body");    
    story_body.appendChild(newDiv);
    var divName = "#"+newDiv.id;

  }
  function addCanvas( tabNumber,id_number){
    var newCanvas = document.createElement("div");
    newCanvas.id = "canvas"+id_number;
    newCanvas.class = "tab_Canvas";
    newCanvas.addEventListener('click', function(event){
      openStoryTab(tabNumber, id_number);
    });
    var tab_menu = document.getElementById("rightMap");    
    tab_menu.appendChild(newCanvas);

  }  
  function openStoryTab(tabNumber, id_number) {
    $(document).ready(function(){
  // Declare all variables
      // Show the current tab, and add an "active" class to the button that opened the tab
      //alert(id_number);
/*
      var tabcontent = document.getElementsByClassName("story_page");
      console.log("Get "+tabcontent.length+" pages");
      for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
      }
*/
      var tempID;

      for (i = 1; i < tabNumber+1; i++) {
        tempID = "story_tab"+i;
        document.getElementById(tempID).style.display = "none";
      }

      var tempID = "story_tab"+id_number;
      document.getElementById(tempID).style.display = "block";
    }); 

  }  
  
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

  var clickCanvasGetLocation = function(){
    var elementName = "#get_location_from_text";
    
    $(document).ready(function(){
      $(elementName).click(function(){
        // open next page
        //alert("Test");
        openLocationNav();
      });

    });
  };
  
  function clickPageCanvas(index){
    var elementName = "#canvas"+index;
    
    $(document).ready(function(){
  
      $(elementName).click(function(){
        // open next page
        alert(index);
      });

    });
  }; 
  

  var loadText = function(filePath){
    $(document).ready(function(){

      $.ajax({
        url : filePath,
        dataType: "text",
        success : function (data) {
          $("#inside_text").text(data);
          //alert(result);
          //this.text_content = result;
          //console.log(text_content);
          //return result;
          updateResult(data);
        }
      });
    });
    
  };
  function updateResult(data){
    text_content = data;
    console.log("???"+this.text_content);
    
    //process the content in here
  }

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
   var readJson_location = function(){
    $(document).ready(function () {
      $.getJSON( "../file/sample.json", function( data ) {
        var items = [];
        $.each( data, function( key, val ) {
          // <input type="checkbox" name="vehicle" value="Bike"> I have a bike<br>
          //items.push( "<li id='" + key + "'>" + key + "</li>" );
          items.push( "<input type='checkbox' name='locationCheck' value='" + key + "'>" + key + "<br>" );
        });
       
		$( "<form/>", {
          "class": "my-new-list",
          html: items.join( "" )
        }).appendTo( "#noun_list_location" );
      
	  });
    });    
  } 
  var tagFunction = function(){
    var sampleTags = ['c++', 'java', 'php', 'coldfusion', 'javascript', 'asp', 'ruby', 'python', 'c', 'scala', 'groovy', 'haskell', 'perl', 'erlang', 'apl', 'cobol', 'go', 'lua'];
    //-------------------------------
    // Tag events
    //-------------------------------
    var eventTags = $('#characterTags');

    var addEvent = function(text) {
      $('#events_container').append(text + '<br>');
    };
    eventTags.tagit({
      allowSpaces: true,
      onTagClicked: function(evt, ui) {
        //addEvent('onTagClicked: ' + eventTags.tagit('tagLabel', ui.tag));
        var currentTag = eventTags.tagit('tagLabel', ui.tag);
        //console.log(currentTag);
        
        //console.log("total page = "+tabNumber);
        //get text, highlight word
        var color = randColor();
        colorList[currentTag] = color;
        console.log(colorList);
        var count =0;
        for(item in colorList){
          count = count +1;
          for(i =0; i<tabNumber; i++){
            highLightColor(i+1, item, colorList[item], count);
            //nsole.log(item+"   "+ colorList[item]);
          }
        }
        
        
        //highLightColor(1, currentTag);
      },
      onTagExists: function(evt, ui) {
        //addEvent('onTagExists: ' + eventTags.tagit('tagLabel', ui.existingTag));
        //alert("Tag exists");
      },
    });
            
    this.addTagsOnCloseNav = function(input){
      
      var tagArray = input.split(',')
      var color = randColor();
      for(i = 0; i < tagArray.length; i++){
        $('#characterTags').tagit('createTag', tagArray[i])
      }
      return false;
    }
          
  }
  
  function highLightColor(index, word, color, count){
    var tempID = "#story_tab"+index;
    //var element = document.getElementById(tempID);
    //console.log($(tempID).text());
    var text = $(tempID).text();
    var regex = new RegExp('('+word+')', 'ig');

    text = text.replace(regex, '<span class="highlight" style="background-color: '+color+'">$1</span>')
    
    //console.log(text);
    var divID = "story_tab"+index;
    document.getElementById(divID).innerHTML = text;
    //currentDiv.innerHTML = text; 
    //$(tempID).html(text);
    //tempID).trigger('textchanged');
    //var element = document.getElementById(tempID);
    //element.innerHTML = text; 

    //add dot for character
    var needDraw = text.indexOf(color);
    //console.log(needDraw);
    if(needDraw >=0){
      addDot(index, color, count);
    }
    
  }
  function addDot(index, color, count){
    var newCanvas = document.createElement("canvas");
    newCanvas.id = "dot"+index;

    var tempID = "canvas"+index;
    var dotTarget = document.getElementById(tempID);
    
    dotTarget.appendChild(newCanvas);


    
    var currentDot = document.getElementById(newCanvas.id);
    var ctx = currentDot.getContext("2d");
    ctx.beginPath();
    ctx.rect(10+count*40, 20, 30, 30);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 0;
    //newCanvas.style.background-color = color;

  }
  var randColor = function(){
    var r =Math.floor(Math.random() * 255);
    var g =Math.floor(Math.random() * 255);
    var b =Math.floor(Math.random() * 255);
    var a =0.5;
    var resultColor = 'rgba('+r+', '+g+', '+b+', '+a+')';
    return resultColor;
  }
  
  var formResult = function(){
    //when close the window get result
   // var currentForm = document.getElementById("#characterCheck")
   // console.log(currentForm.value);
    var selected = [];
    var selected_String = "";
    
    $('input[name="characterCheck"]:checked').each(function() {
      //console.log(this.value);

      //selected.push(this.value);
      selected_String = selected_String + ","+this.value;

      
    });
    console.log(selected_String);
    (new tagFunction()).addTagsOnCloseNav(selected_String);
  }
  return {
    setAll: setAll,
    clickCanvas: clickCanvas,
	clickCanvasGetLocation: clickCanvasGetLocation,
    drawCanvas: drawCanvas,
    textOnChange: textOnChange,
    divOnChange: divOnChange,
    loadText: loadText,
	randColor: randColor,
    tagFunction:tagFunction,
    openNav: openNav,
    closeNav: closeNav,
    readJson: readJson,
    formResult:formResult
   
  }
})();