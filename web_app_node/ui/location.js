  var locationColorList = {};
  var locationChosenList = {};
  
  function openLocationNav() {
      document.getElementById("over_location_frame").style.width = "100%";
  }

  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeLocationNav() {
      formLocationResult();
      document.getElementById("over_location_frame").style.width = "0%";
  }
  function formLocationResult(){
    //when close the window get result
   // var currentForm = document.getElementById("#characterCheck")
   // console.log(currentForm.value);
    var selected = [];
    var selected_String = "";

    $('input[name="locationCheck"]:checked').each(function() {
      //console.log(this.value);

      //selected.push(this.value);
      selected_String = selected_String + ","+this.value;

      
    });
    console.log(selected_String);
	addLocationTags(selected_String);
    (new tagFunction_location()).addTagsOnCloseNav(selected_String);
  } 
  var tagFunction_location = function(){
    //-------------------------------
    // Tag events
    //-------------------------------
    var eventTags = $('#locationTags');

    var addEvent = function(text) {
      $('#events_container').append(text + '<br>');
    };
    eventTags.tagit({
      allowSpaces: true,
      onTagClicked: function(evt, ui) {
    
        
        //highLightColor(1, currentTag);
      },
      onTagExists: function(evt, ui) {
        //addEvent('onTagExists: ' + eventTags.tagit('tagLabel', ui.existingTag));
        //alert("Tag exists");
      },
    });
            
    this.addTagsOnCloseNav = function(input){
      
      var tagArray = input.split(',')
      for(i = 0; i < tagArray.length; i++){
        //$('#locationTags').tagit('createTag', tagArray[i])
		
		if(locationSelectList[tagArray[i]] ){
        }
        else{
          locationSelectList[tagArray[i]] = 1;
        }	
      }
      return false;
    }
          
  } 
  function generateBar(locationChange, target){
    //draw locations alternatively
    //console.log(locationChange.length);
    
    //remove old ones
    var currentNode = document.getElementById(target);
    while (currentNode.firstChild) {
      currentNode.removeChild(currentNode.firstChild);
    }
    //currentNode.style.backgroundColor = "#0000FF";
   //console.log(currentNode);
    
    //add new ones
    var locationCount = 0;
    //var indexCount =1;
    var top =0;
    for(k=0; k< locationChange.length; k++){
      var place = locationChange[k];
      locationCount = locationCount+1;
      var newCanvas = document.createElement("div");
      newCanvas.id = target+"_location_"+locationCount;
      //indexCount++;
      newCanvas.class = "location_mark";
      
      currentNode.appendChild(newCanvas);


    // console.log(newCanvas.id);
      var currentDot = document.getElementById(newCanvas.id);
      var tempName = "#"+target;

      newCanvas.style.backgroundColor = locationColorList[place];
      //newCanvas.style.marginLeft = '5%';
      newCanvas.style.display ="table-cell";
      newCanvas.style.marginTop = "1px";

    }
    
  }
  //highlight location
  function locationSpan(index, word, color, count){
   
     var tempID = "#story_tab"+index;
    //var element = document.getElementById(tempID);
    //console.log($(tempID).text());
    var text = $(tempID).text();
    var regex = new RegExp('('+word+')', 'ig');

    text = text.replace(regex, '<span class="highlight" style="background-color: '+color+'">$1</span>')
    
    //console.log(text);
    var divID = "story_tab"+index;
    var currentText = document.getElementById(divID);
    currentText.innerHTML = text;

  }
  function updateSpan(index){

    var tempID = "#story_tab"+index;
    var text = $(tempID).text();
  
    //record location: index in this page
    var testIndex = {};
   
    for(item in locationChosenList){
      //find index
      testIndex[item] = getIndicesOf(item, text, false); 
      //testIndex[item].shift();
      //console.log("%%%"+testIndex);
    }
    //console.log(testIndex);
    //while()
    
    var locationChange = [];
  
    while(!checkStop(testIndex)){
      var compareIndex = [];
      for(item in locationChosenList){
        //find index
        if(testIndex[item].length >0){
          compareIndex[item] = testIndex[item][0]; 
        }
        //console.log(compareIndex);
        //testIndex[item].shift();
        //console.log("%%%"+testIndex);
      }

      var minKey = _.min(Object.keys(compareIndex), function (o) { return compareIndex[o]; });
      //console.log(minKey);

      var targetArray = testIndex[minKey];
      targetArray.shift();
      testIndex[minKey] = targetArray;
      
      locationChange.push(minKey);
      //console.log(minKey);
      //remove one index from the target array
    }
    
    return locationChange;
    
    //console.log(indexLocation);
    
  }
  function getIndicesOf(searchStr, str, caseSensitive) {
      var searchStrLen = searchStr.length;
      if (searchStrLen == 0) {
          return [];
      }
      var startIndex = 0, index, indices = [];
      if (!caseSensitive) {
          str = str.toLowerCase();
          searchStr = searchStr.toLowerCase();
      }
      while ((index = str.indexOf(searchStr, startIndex)) > -1) {
          indices.push(index);
          startIndex = index + searchStrLen;
      }
      return indices;
  }
  function checkStop(testIndex){
    var isStop = false;
    //check if all index array become empty
    const bound = Object.keys(testIndex).length;
    var count = 0;
    for(item in testIndex){
      if(testIndex[item].length <= 0){
        count++;
      }
    }
    if(count == bound){
      isStop = true;
    }
    return isStop;
  }
  function addLocationTags(selected_String){
	console.log(selected_String);
	tag_list_base = selected_String.split(",");
	//add to list
    var items = [];
    $.each( tag_list_base, function(key, val ) {
        // <input type="checkbox" name="vehicle" value="Bike"> I have a bike<br>
        //items.push( "<li id='" + key + "'>" + key + "</li>" );
		if(val != ""){
			if(locationColorList[val]){
				
			}
			else{
				locationColorList[val] = colorList[val];
				items.push( "<input type='checkbox' name='locationTagCheck' value='" + val + "' ><label style='background:"+colorList[val]+"; color: black'>" + val + "</label><br>" );
			}
			//
		}
	});
       
	$( "<form/>", {
        "class": "my-new-list",
		html: items.join( "" )
    }).appendTo( "#location_tag_list" );	
  }
  function listenLocationTagOnChange(){
	$(function() {

		$('#location_tag_list').change(function() {
			var selected_String = "";		
			$('input[name="locationTagCheck"]:checked').each(function() {
			  selected_String = selected_String + ","+this.value;

			});

			tag_list_base = selected_String.split(",");
			//add to list
			var items = [];
			$.each( tag_list_base, function(key, val ) {
				// <input type="checkbox" name="vehicle" value="Bike"> I have a bike<br>
				//items.push( "<li id='" + key + "'>" + key + "</li>" );
				if(locationChosenList[val]){
				}
				else{
					locationChosenList[val] = 1;
				}
				
				if(val != ""){
					if(locationSelectList[val] ==1){
						//if never highlight, then highlight

						for(i =0; i<g_settings.tabNumber; i++){
							//for each page
						  count =0;
						  highLightLocationColor(i+1, val, colorList[val], count);
						
						//console.log("total page = "+g_settings.tabNumber);
						//get text, highlight word

							//console.log(locationColorList);
							var count =0;
							var locationChange;
							var lastLocation ="null";
							locationChange = updateSpan(i+1);
							targetNode = "location_container"+(i+1);
							//generateBar(locationChange, "location_container"+(i+1));
							if(locationChange.length <=0){
								//console.log("Page "+(i+1));
								//this is the location change in this page
								//console.log(lastLocation);
								var temp = [lastLocation];
								generateBar(temp, targetNode);
								
							}
							else{
								//console.log("Page "+(i+1));
								//this is the location change in this page
								//console.log(locationChange);
								generateBar(locationChange, targetNode);
								lastLocation = locationChange[locationChange.length-1];
							}

						//updateSpan();    						  

						}		
						locationSelectList[val] = 2;
						//locationColorList[val] = colorList[val];
					}
					else{
						// colored
						//locationColorList[val] = colorList[val];
						
					}
				}
			});
		
			//console.log(selected_String);
		}); 
		
	});	
  } 
    var highLightLocationColor = function(index, word, color, count){
    $(document).ready(function () {
		var tempID = "#story_tab"+index;
		var story_text = $(tempID).text();
		//console.log(story_text);
		var regex = new RegExp('('+word+')', 'ig');

		story_text = story_text.replace(regex, '<span class="highlight" style="background-color: '+color+'">$1</span>')
		//also color previously selected words
		for(item in locationSelectList){
			if(locationSelectList[item]==2){
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
//		  addDot(index, color,character_index[word]);
		}
    });

    
  }
