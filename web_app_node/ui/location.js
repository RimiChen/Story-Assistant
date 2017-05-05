  var locationColorList = {};
  
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
        //addEvent('onTagClicked: ' + eventTags.tagit('tagLabel', ui.tag));
        var currentTag = eventTags.tagit('tagLabel', ui.tag);
        //console.log(currentTag);
        
        //console.log("total page = "+tabNumber);
        //get text, highlight word
        var color = storyMainPageFunctions.randColor();

        console.log(locationColorList);
        var count =0;
        for(item in locationSelectList){
          count++;
          //console.log("***"+count);
          //storyMainPageFunctions.highLightColor(i+1, item, colorList[item], count);
          //nsole.log(item+"   "+ colorList[item]);
        }
        var locationChange;
        var lastLocation ="null";
        for(i =0; i<tabNumber; i++){
          //storyMainPageFunctions.highLightColor(i+1, item, locationColorList[item], count);
           //nsole.log(item+"   "+ colorList[item]);
          //locationSpan(i+1, item, locationColorList[item], count);
          locationChange = updateSpan(i+1);
          targetNode = "location_container"+(i+1);
          //generateBar(locationChange, "location_container"+(i+1));
          if(locationChange.length <=0){
            console.log("Page "+(i+1));
            //this is the location change in this page
            console.log(lastLocation);
            var temp = [lastLocation];
            generateBar(temp, targetNode);
            
          }
          else{
            console.log("Page "+(i+1));
            //this is the location change in this page
            console.log(locationChange);
            generateBar(locationChange, targetNode);

            lastLocation = locationChange[locationChange.length-1];
          }
        }

        //updateSpan();        
        
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
        $('#locationTags').tagit('createTag', tagArray[i])
		
		if(locationSelectList[tagArray[i]] ){
        }
        else{
          locationSelectList[tagArray[i]] = 1;
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

      // current node
      //var tempID = "canvas"+index;
      //var dotTarget = document.getElementById(tempID);

      
      currentNode.appendChild(newCanvas);


     //console.log(newCanvas.id);
      var currentDot = document.getElementById(newCanvas.id);
     // var ctx = currentDot.getContext("2d");
      //ctx.beginPath();
      //console.log(currentNode.style.height);
      var tempName = "#"+target;
      //console.log($(tempName).height());
      //ctx.rect(5, 10+locationCount*40, 100, 40);
      //ctx.fillStyle = locationColorList[place];
      //ctx.fill();
      //ctx.lineWidth = 0;

      newCanvas.style.backgroundColor = locationColorList[place];
      //newCanvas.style.marginLeft = '5%';
      newCanvas.style.display ="table-cell";
      newCanvas.style.marginTop = "1px";
      //newCanvas.style.height = '10%';
      

      //newCanvas.style.border = 'none';
      //newCanvas.style.border = 'none';
      //console.log("--->"+place+"  "+locationColorList[place]);
      //newCanvas.style.backgroundColor = locationColorList[place];
      //newCanvas.style.position = 'relative';
      //newCanvas.style.width = "50%";
      //newCanvas.style.height = "10px";
      //newCanvas.style.top = 10*locationCount;
      //newCanvas.style.border = 'none';
      //newCanvas.style.position = "absolute";
      //console.log(count);

      //newCanvas.style.top = currentNode.style.top;
      //newCanvas.style.left = dotTarget.style.left+100;  
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
   
    for(item in locationColorList){
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
      for(item in locationColorList){
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
 
