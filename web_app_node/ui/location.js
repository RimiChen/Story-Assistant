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
      var color = storyMainPageFunctions.randColor();
      for(i = 0; i < tagArray.length; i++){
        $('#locationTags').tagit('createTag', tagArray[i])
      }
      return false;
    }
          
  }  