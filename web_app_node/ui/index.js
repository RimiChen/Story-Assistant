


var colorList = {};
var informList = {};
var charaSelectList = {};
var locationSelectList = {};
var frequencyList = {};
var characterActionList = {};
var storyMainPageFunctions = (function () {
    
  // Keep this variable private inside this closure scope
  var setAll = function() {

    var test = 0;
    readJsonColor();
	//printActions();
	readJson();
    readJson_location();

	//console.log(frequencyList);

   
    draw("Character", 'character_tag_label');

    draw("Location", 'location_tag_label');    
    
    draw("Get Tags", 'get_tag_from_text');
	
	draw("Get Places", 'get_location_from_text'); 
	draw("Frequency", 'show_frequency'); 
	draw("Sentiment", 'show_sentiment'); 
	
	
	console.log("Show place is displayed");
    
    draw_dark("Choose Character", 'character_category'); 
    draw_dark("Choose Location", 'location_category'); 
    // Now invoke the minimap method on the element you'd like to become the minimap,
    // passing a reference to the element you'd like the map to be based on.
    var $parent = $( "#main_frame" );
    
    clickFrequency();
	clickSentiment();
	clickCanvas();
	clickCanvasGetLocation();
	//clickChara();
	console.log("Why the browser won't clear data by it self!!")
    //loadText("../text_sample/austen-sense.txt");
    newLoadText("../text_sample/austen-sense.txt");

    divOnChange();
	//console.log(text_separate_result);
    //console.log("%%%"+textContent);
    //paging();
    
    drawCanvas("whole_book_view", '../img/book_view.png');
    drawCanvas("chapter_view", '../img/chapter_view.png');
    
    tagFunction();
	tagFunction_location();
    //postData('data to process');
    //$( "#minimap" ).minimap( $parent );
	//printActions();
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
        var currentDiv = document.getElementById('inside_text');

        //separate text in here
       
	   //Without html length
        
        //divide text in here
        var currentText = $('#inside_text').text();

        var match_paragraph = new RegExp('\\S[\\s\\S]{0,'+paragraph_limit+'}\\S(?=\\s|$)', "g");
        //console.log(myRe);
		var m;
        //var result = new Array();

        while ((m = match_paragraph.exec(currentText)) !== null) {
           text_separate_result.push(m[0]);
        }

        //how many pages are needed
		total_page_number = text_separate_result.length;

        
        var text_area = document.getElementById('text_body');

        for(var tab_iter = 1 ; tab_iter < tabNumber+1; tab_iter++){
          addDiv(tab_iter, text_separate_result[tab_iter-1]);
          addCanvas(tabNumber,tab_iter);
          addButton(tabNumber, tab_iter);
          addElement.addDiv("rightLocation", "location_container"+tab_iter, "location_container", "location_container"+tab_iter);
          
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
    newButton.innerHTML = id_number;
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
  var openStoryTab = function(tabNumber, id_number) {
    $(document).ready(function(){
  // Declare all variables
      // Show the current tab, and add an "active" class to the button that opened the tab
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
  function clickFrequency(){
    var elementName = "#show_frequency";
    
    $(document).ready(function(){
      $(elementName).click(function(){
        // open next page
        //alert("Test");
		editNodes();
		drawGraph();
        openFrequencyNav();
      });

    });
  };
  function clickSentiment(){
    var elementName = "#show_sentiment";
    
    $(document).ready(function(){
      $(elementName).click(function(){
        // open next page
        //alert("Test");
        openSentimentNav();
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

  function readJsonColor(){
    $(document).ready(function () {
<<<<<<< HEAD
	  console.log("Test");
      $.getJSON( "../file/sample2.json", function( data ) {
=======
	  //var jsonData = $.parseJSON("../file/sample3.json");
	  //console.log(jsonData);
	  //console.log("Test");
      $.getJSON( "../file/sample3.json", function( data ) {
>>>>>>> origin/master
        $.each( data, function( key, val ) {
			//console.log(val);
			//put into character action list
			if(characterActionList[key]){
			}
			else{
				characterActionList[key] = val;
				//console.log("Test "+key);
			}
        });

	  });

      $.getJSON( "../file/sample3.json", function( data ) {
        $.each( data, function( key, val ) {
			
			var color = randColor();
			colorList[key] = color;
			if(informList[key]){
			}
			else{
				informList[key] = val;
			}
        });

	  });
    });
	//printActions();  
  } 
  function printActions(){
	//console.log(characterActionList);
	//console.log(frequencyList);
	//console.log(frequencyList["Dashwood"])
	for(var tempKey in frequencyList){
	//	console.log("000");
		console.log(tempKey+": "+frequencyList[tempKey]);
	}
  } 
  var readJson = function(){
    $(document).ready(function () {
      $.getJSON( "../file/sample3.json", function( data ) {
        var items = [];
        $.each( data, function( key, val ) {
<<<<<<< HEAD
		  frequencyList[key] = val[1];
=======
          // <input type="checkbox" name="vehicle" value="Bike"> I have a bike<br>
          //items.push( "<li id='" + key + "'>" + key + "</li>" );
          //console.log(key+":" + val[0]);
		  frequencyList[key] = val[0];
>>>>>>> origin/master
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
      $.getJSON( "../file/sample3.json", function( data ) {
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

        if(charaSelectList[currentTag] ==1){
			//if never highlight, then highlight

			for(i =0; i<tabNumber; i++){
				//for each page
			  count =0;
   			  highLightColor(i+1, currentTag, colorList[currentTag], count);
/*
			  for(item in charaSelectList){
				count++;
				if(charaSelectList[item]==2){
					highLightColor(i+1, item, colorList[item], count);
				}
			  }
*/
			}		
			charaSelectList[currentTag] = 2;
		}
		else{
			// colored
			
		}
		//var currentDot = document.getElementByClassName("dot");
      },
      onTagExists: function(evt, ui) {
      },
    });
            
    this.addTagsOnCloseNav = function(input){
      
      var tagArray = input.split(',')
      var color = randColor();
      for(i = 0; i < tagArray.length; i++){
        $('#characterTags').tagit('createTag', tagArray[i])
        if(charaSelectList[tagArray[i]] ){
        
		}
        else{
          charaSelectList[tagArray[i]] = 1;
		  character_index[tagArray[i]] = Object.keys(charaSelectList).length;
			//console.log(Object.keys(charaSelectList).length);
          //charaSelectList[tagArray[i]] = 1;
        }		
      }
      return false;
    }
          
  }
  
  var highLightColor = function(index, word, color, count){
    $(document).ready(function () {
		var tempID = "#story_tab"+index;
		var story_text = $(tempID).text();
		//console.log(story_text);
		var regex = new RegExp('('+word+')', 'ig');

		story_text = story_text.replace(regex, '<span class="highlight" style="background-color: '+color+'">$1</span>')
		//also color previously selected words
		for(item in charaSelectList){
			if(charaSelectList[item]==2){
				regex = new RegExp('('+item+')', 'ig');
				story_text = story_text.replace(regex, '<span class="highlight" style="background-color: '+colorList[item]+'">$1</span>')
			}
		}
		var divID = "story_tab"+index;
		var currentText = document.getElementById(divID);
		text_separate_result[index] = story_text;
		currentText.innerHTML = text_separate_result[index];
		var needDraw = story_text.indexOf(color);

		if(needDraw >=0){
		  addDot(index, color,character_index[word]);
		}
    });

    
  }
  function addDot(index, color, count){
	//console.log(index);
    var newCanvas = document.createElement("canvas");
    newCanvas.id = "dot"+index;
    newCanvas.class = "dot";

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
    newCanvas.style.border = 'none';

    newCanvas.style.top = dotTarget.style.top;
    newCanvas.style.left = dotTarget.style.left+100;    
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
    var selected = [];
    var selected_String = "";
    
    $('input[name="characterCheck"]:checked').each(function() {
      selected_String = selected_String + ","+this.value;

      
    });
    console.log(selected_String);
    (new tagFunction()).addTagsOnCloseNav(selected_String);
  }
  return {
    setAll: setAll,
	openStoryTab, openStoryTab,
    clickCanvas: clickCanvas,
	clickCanvasGetLocation: clickCanvasGetLocation,
    drawCanvas: drawCanvas,
    textOnChange: textOnChange,
    divOnChange: divOnChange,
	randColor: randColor,
	highLightColor: highLightColor,
    tagFunction:tagFunction,
    openNav: openNav,
    closeNav: closeNav,
    readJson: readJson,
    formResult:formResult
   
  }
})();