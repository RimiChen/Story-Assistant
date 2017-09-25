


var colorList = {};
var informList = {};
var charaSelectList = {};
var charaAddedList = {};
var locationSelectList = {};
var frequencyList = {};
var characterActionList = {};
var storyMainPageFunctions = (function () {
    
  // Keep this variable private inside this closure scope
  var setAll = function() {
	text_path = localStorage.getItem("text_path");
	g_current_variables.current_text_file_path = text_path;
	g_current_variables.current_json_path = text_path.replace(".txt", ".json");
	console.log("LOAD TEXT PATH: "+g_current_variables.current_text_file_path);
	console.log("LOAD NOUN PATH: "+g_current_variables.current_json_path);

    var test = 0;
    readJsonColor();
	//printActions();
	readJson();
    readJson_location();
	read_story_points();
	read_actor_assertions('Elinor');

	//console.log(frequencyList);

    draw("Dashboard", 'back_to_dashboard');
	
    draw("Character", 'character_tag_label');

    draw("Location", 'location_tag_label');    
    
    draw("Get Tags", 'get_tag_from_text');
	
	draw("Get Places", 'get_location_from_text'); 
	draw("Frequency", 'show_frequency'); 
	draw("Sentiment", 'show_sentiment'); 
	draw("Graph", 'show_graph');
	draw("StoryPoint", 'story_points');	
    draw("ShowAll", 'show_all');	

	
	console.log("Show place is displayed");
    
    draw_dark("Choose Character", 'character_category'); 
    draw_dark("Choose Location", 'location_category'); 
    // Now invoke the minimap method on the element you'd like to become the minimap,
    // passing a reference to the element you'd like the map to be based on.
    var $parent = $( "#main_frame" );
    
    clickFrequency();
	clickAllCanvas("#back_to_dashboard");
	clickAllCanvas("#show_sentiment");
	clickAllCanvas("#show_graph");
	clickAllCanvas("#story_points");
    clickAllCanvas("#show_all");
	clickCanvas();
	clickCanvasGetLocation();
	//clickChara();
	console.log("Why the browser won't clear data by it self!!")
    //loadText("../text_sample/austen-sense.txt");
    newLoadText(g_current_variables.current_text_file_path);

    divOnChange();
	//console.log(text_separate_result);
    //console.log("%%%"+textContent);
    //paging();
    
    drawCanvas("whole_book_view", 'Img/book_view.png');
    drawCanvas("chapter_view", 'Img/chapter_view.png');
    
    //tagFunction();
	//tagFunction_location();
    //postData('data to process');
    //$( "#minimap" ).minimap( $parent );
	//printActions();
	listenCharaTagOnChange();
	listenLocationTagOnChange();

  };

  function clickAllCanvas(elementName){
	//TODO: move all button check in here
    //var elementName = "#get_tag_from_text";
    
    $(document).ready(function(){
		switch(elementName) {
			case "#back_to_dashboard":
				$(elementName).click(function(){
					console.log("back_to_dashboard");
					//back to dashboard
					window.location.href='/';
				});
				break;
			case "#show_sentiment":
				$(elementName).click(function(){
					console.log("Show_sentiment");
					openSentimentNav();
				});
				break;
			case "#show_graph":
				$(elementName).click(function(){
					console.log("Show_graph");
					page_name_list = editNodes_v2();
					drawGraph_v3(page_name_list);
					openGraphNav();
				});
				break;
			case "#story_points":
				$(elementName).click(function(){
					console.log("story_points");
					openStoryNav();
				});
				break;
			case "#show_all":
				$(elementName).click(function(){
					console.log("show_all");
					openShowAllNav();
				});
				break;	                
			default:
				console.log("no element name");
		}	
    }); 	
  }
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
  /*
   * load all text and create text buffer.
   */
  var divOnChange = function(){
    $(document).ready(function(){
      $('#inside_text').bind('contentchanged', function() {
        // do something after the div content has changed
        var currentDiv = document.getElementById('inside_text');

        //separate text in here
	    //Without html length
        //divide text in here
        var currentText = $('#inside_text').text();

        var match_paragraph = new RegExp('\\S[\\s\\S]{0,'+g_settings.paragraph_word_limit+'}\\S(?=\\s|$)', "g");
        //console.log(myRe);
		var m;
        //var result = new Array();

		var page_count = 0;
        //while ((m = match_paragraph.exec(currentText)) !== null && page_count < g_settings.tabNumber*3) {
		while ((m = match_paragraph.exec(currentText)) !== null) {
			//console.log(m[0].trim().split(/\s+/).length+", "+m[0].length);
			paragraph_length = m[0].length;
			if(Math.abs(paragraph_length - g_settings.paragraph_word_limit)> 20){
				console.log("End of story, should break");
				break;
			}			
			text_separate_result.push(m[0]);
		   // from the beginning, analyze the sentiment to text.
		   text_old.push(m[0])
		   changed_text = readSentimentNav_original(m[0], page_count);	
		   text_original.push(changed_text);
		   page_count = page_count+1;
		   

		}

        //how many pages are needed, create divs
		total_page_number = text_separate_result.length;
		console.log("###Total: "+total_page_number+" pages.")
        
        var text_area = document.getElementById('text_body');
		
		//only create tab numbers of div to fit webpage
        for(var tab_iter = 1 ; tab_iter < g_settings.tabNumber+1; tab_iter++){
          //initial 1
		  addDiv(tab_iter, text_original[tab_iter-1]);
		  //initial 2
		  addButton(tab_iter);
		  // initial 3
          addCanvas(tab_iter);
          addElement.addDiv("rightLocation", "location_container"+tab_iter, "location_container", "");
        }
		//show the first page
        var first_page = document.getElementById("story_tab"+1);
        first_page.style.display = "block";
		target_frame = "sentiment_body"
		parent_frame = "#"+target_frame;
		$(parent_frame).contents().remove();
		  var target_base = $(parent_frame);
		  //console.log(target_base);
		  var target_base_position = target_base.offset();
		  //console.log(target_base_position);
		  var left_offset = target_base_position.left;
		  var top_offset = target_base_position.top;		
		show_sentiment_bar(g_data.current_page_number, left_offset, top_offset, target_frame);
        
      });      
	  });   
  }
  //initial 1
  function addButton(id_number){
    var newButton = document.createElement("button");
    newButton.id = "button"+id_number;
    newButton.class = "tab_button";
    newButton.innerHTML = id_number;
    newButton.value = id_number;
    //newButton.setAttribute('onclick')
    var tab_menu = document.getElementById("tab_menu");    
    tab_menu.appendChild(newButton);
    newButton.onclick = function(){
      openStoryTab(id_number);
    };

  }
  //initial 2
  function addDiv( id_number, content){
    var newDiv = document.createElement("div");
    newDiv.id = "story_tab"+id_number;
    newDiv.class = "story_page";
    newDiv.innerHTML = content;
    var story_body = document.getElementById("story_body");    
    story_body.appendChild(newDiv);
    var divName = "#"+newDiv.id;

  }
  //initial 3
  function addCanvas( id_number){
    var newCanvas = document.createElement("div");
    newCanvas.id = "canvas"+id_number;
    newCanvas.class = "tab_Canvas";
    newCanvas.addEventListener('click', function(event){
      openStoryTab(id_number);
    });
    var tab_menu = document.getElementById("rightMap");    
    tab_menu.appendChild(newCanvas);

  }  
  /*
  * when page tab clicked, open the corresponding story page.
  */
  var openStoryTab = function(id_number) {
    $(document).ready(function(){
  // Declare all variables
      // Show the current tab, and add an "active" class to the button that opened the tab
      var tempID;

      for (i = 1; i < g_settings.tabNumber+1; i++) {
        tempID = "story_tab"+i;
        document.getElementById(tempID).style.display = "none";
      }

      var tempID = "story_tab"+id_number;
	  //console.log(id_number);
      g_data.current_page_number = id_number;
	  //reset full text
	  document.getElementById(tempID).innerHTML = text_original[g_data.current_page_number-1];
	  //highlight character on tabs
	  highlight_on_tabs();
	  //show sentiment bar
	  //show_sentiment_bar(page_number, pos_x, pos_y);
	  target_frame = "sentiment_body"
		parent_frame = "#"+target_frame;
		$(parent_frame).contents().remove();

	  var target_base = $(parent_frame);
	  //console.log(target_base);
	  var target_base_position = target_base.offset();
	  //console.log(target_base_position);
	  var left_offset = target_base_position.left;
	  var top_offset = target_base_position.top;
	  
	  show_sentiment_bar(g_data.current_page_number, left_offset, top_offset, target_frame);
	  //show_sentiment_bar(g_data.current_page_number, left_offset, top_offset+100, target_frame);
	  //readSentimentNav();
	  document.getElementById(tempID).style.display = "block";

	  console.log("###"+g_data.current_page_number)
	 // highLightColor(index, word, color, count)
	 //highlight according to selected list
	 
	}); 
  }  
  // get character tags, open the selecting menu.
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
  // get location tags, open the selecting menu.
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
  //action after click frequency button
  function clickFrequency(){
    var elementName = "#show_frequency";
    
    $(document).ready(function(){
      $(elementName).click(function(){
        // open next page
        //alert("Test");
		//editNodes();
		//drawGraph();
		
		
		//editNodes_v2();
		//drawGraph_v2();
		
		
		//(new drawGraph_v2()).draw();
        openFrequencyNav();
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

	  console.log("Test");
      $.getJSON( g_current_variables.current_json_path, function( data ) {

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

      $.getJSON(g_current_variables.current_json_path, function( data ) {
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
  var read_actor_assertions = function(actor_name){
    $(document).ready(function () {
		string_index = g_current_variables.current_json_path.lastIndexOf("/");
		story_json_path = g_current_variables.current_json_path.substring(0,string_index)+"/"+actor_name+".json";
		//console.log(story_json_path);
		$.getJSON( story_json_path, function( data ) {
			
			$.each( data, function( key) {

				console.log(data[key]['at']);
				console.log(data[key]['realize']);
				if(used_assertion[data[key]['at']]){
				}
				else{
					used_assertion[data[key]['at']] = 1;
				}

			});
		});
    });    
  }   
  var read_story_points = function(){
    $(document).ready(function () {
		string_index = g_current_variables.current_json_path.lastIndexOf("/");
		story_json_path = g_current_variables.current_json_path.substring(0,string_index)+"/story_point.json";
		//console.log(story_json_path);
      $.getJSON( story_json_path, function( data ) {
        var items = [];
        $.each( data, function( key, val ) {
		  story_points[key] = val.replace(/(\r\n|\n|\r|\\|\\n)/gm," ");;
        });
		//console.log(story_points);
		});
    });    
  }  
  var readJson = function(){
    $(document).ready(function () {
      $.getJSON( g_current_variables.current_json_path, function( data ) {
        var items = [];
        $.each( data, function( key, val ) {
		  frequencyList[key] = val[0];
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
      $.getJSON( g_current_variables.current_json_path, function( data ) {
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

			for(i =0; i<g_settings.tabNumber; i++){
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
        //$('#characterTags').tagit('createTag', tagArray[i]);
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
  
  function highLightColor(index, word, color, count){
    $(document).ready(function () {
		var tempID = "#story_tab"+index;
		//var story_text = $(tempID).text();
		var story_text = text_original[index-1];
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
    //console.log(selected_String);
	addCharaTags(selected_String);
    (new tagFunction()).addTagsOnCloseNav(selected_String);
  }
  function addCharaTags(selected_String){
	console.log(selected_String);
	tag_list_base = selected_String.split(",");
	//add to list
    var items = [];
    $.each( tag_list_base, function(key, val ) {
        // <input type="checkbox" name="vehicle" value="Bike"> I have a bike<br>
        //items.push( "<li id='" + key + "'>" + key + "</li>" );
		
		if(charaAddedList[val]){
		}
		else{
			if(val != ""){
				items.push( "<input type='checkbox' name='characterTagCheck' value='" + val + "' ><label style='background:"+colorList[val]+"; color: black'>" + val + "</label><br>" );
			}
			charaAddedList[val] = 1;
		}
	});
       
	$( "<form/>", {
        "class": "my-new-list",
		html: items.join( "" )
    }).appendTo( "#character_tag_list" );	
  }
  function highlight_on_tabs(){
			var selected_String = "";		
			$('input[name="characterTagCheck"]:checked').each(function() {
			  selected_String = selected_String + ","+this.value;

			});

			tag_list_base = selected_String.split(",");
			console.log(tag_list_base);
			console.log(tag_list_base);
			//add to list
			var items = [];
			
			//clean charaSelectList
			$.each(charaSelectList, function(key, val){
				console.log(key+", "+val);
				if(val == 2){
					charaSelectList[key] = 1;
				}
			});

			$.each( tag_list_base, function(key, val ) {
				// <input type="checkbox" name="vehicle" value="Bike"> I have a bike<br>
				//items.push( "<li id='" + key + "'>" + key + "</li>" );
				if(val != ""){
					if(charaSelectList[val] ==1){
						//if never highlight, then highlight

						for(i =0; i<g_settings.tabNumber; i++){
							//for each page
						  count =0;
						  highLightColor(i+1, val, colorList[val], count);

						}		
						charaSelectList[val] = 2;
					}
					else{
						// colored
						
					}
				}
			});  
  }	  
  function listenCharaTagOnChange(){
	$(function() {

		$('#character_tag_list').change(function() {
			//charaSelectList = {};
			var selected_String = "";		
			$('input[name="characterTagCheck"]:checked').each(function() {
			  selected_String = selected_String + ","+this.value;

			});

			tag_list_base = selected_String.split(",");
			console.log(tag_list_base);
			//add to list
			var items = [];
			
			//clean charaSelectList
			$.each(charaSelectList, function(key, val){
				console.log(key+", "+val);
				if(val == 2){
					charaSelectList[key] = 1;
				}
			});

			$.each( tag_list_base, function(key, val ) {
				// <input type="checkbox" name="vehicle" value="Bike"> I have a bike<br>
				//items.push( "<li id='" + key + "'>" + key + "</li>" );
				if(val != ""){
					if(charaSelectList[val] ==1){
						//if never highlight, then highlight

						for(i =0; i<g_settings.tabNumber; i++){
							//for each page
						  count =0;
						  highLightColor(i+1, val, colorList[val], count);

						}		
						charaSelectList[val] = 2;
					}
					else{
						// colored
						
					}
				}
			});
		
			//console.log(selected_String);
		}); 
		
	});	
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
    tagFunction:tagFunction,
    openNav: openNav,
    closeNav: closeNav,
    readJson: readJson,
    formResult:formResult
   
  }
})();