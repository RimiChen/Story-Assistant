// Revealing module pattern
var storyMenuFunctions = (function () {

  /*
  If the function is going to be used by others, cast it as a variable (and return it)
  otherwise
  */
  var initialDashboard = function() {
	//document.body.parentNode.removeChild(document.body);
	//$('body').not('#fileLoader').empty();
	//var oldcanv = document.getElementById('storyList');
	//document.removeChild(oldcanv)
	$( "#storyList" ).remove();
	$( "div" ).remove( "#storyList" );

	var canv = document.createElement('storyList');
	canv.id = 'storyList';
	document.body.appendChild(canv);

	// Keep this variable private inside this closure scope
	var storyNumber = g_settings.story_number;
	console.log(g_settings.story_number);
  	  
    console.log("Load stories to this dashboard");

	var story_icon_path = 'Img/Book.png';
	
    var new_story_icon_Path = "Img/icon_Create.png";
    
	//draw all opened stories
		for(var storyNumberIter = 0; storyNumberIter < storyNumber; storyNumberIter++){
		  drawCanvas(storyNumberIter, storyNumberIter * g_settings.dashboard_icon_margin, story_icon_path);
		  clickCanvas(storyNumberIter);
		}
		//draw new story icon
		drawCanvas(storyNumber, storyNumber * g_settings.dashboard_icon_margin, new_story_icon_Path);
		clickCanvas(storyNumber);

  };

  // Explicitly reveal public pointers to the private functions 
  // that we want to reveal publicly
  function drawCanvas( newIndex, shift, imgPath){
    var newBook = {
        canvas : document.createElement("canvas"),
        draw : function() {
            this.canvas.id = "canvas"+newIndex;
            this.canvas.width = 128;
            this.canvas.height = 128;
            this.context = this.canvas.getContext("2d");
			var target_div = document.getElementById("storyList"); 
			target_div.appendChild(this.canvas);				
            //document.body.appendChild(this.canvas);
			//document.body.insertBefore(this.canvas, document.body.childNodes[newIndex]);
        }
    }
    //var target_div = document.getElementById("storyList");    
    //arget_div.appendChild(newDiv);	
    
    newBook.draw();
    
    var ctx = document.getElementById("canvas"+newIndex).getContext('2d');
    var img = new Image();
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
    };
    img.src = imgPath;
  };
  
  function openFile() {
    //return the text file path
	var file_path = "";
	//open file browser, and return a file path, redirect to UI
	$("#fileLoader").click();
	
	$("#fileLoader").change(function(){
		console.log("story #"+g_settings.story_number+". "+g_settings.default_file_folder+this.files[0].name);
		file_path = g_settings.default_file_folder+this.files[0].name;

		// if the story already exist, do add new story; if not, add new story
		if(g_data.opened_story[this.files[0].name]){
			//if exist
			//alert("This story already exist.");
			
			//TO DO: find why duplicate operations
			console.log(this.files[0].name+", exist!");
		}
		else{
			//if not exist
   		    var next_story = new story("story #"+g_settings.story_number, file_path);
			g_data.story_list.push(next_story);
			console.log(g_data.story_list);
			g_data.opened_story[this.files[0].name] = next_story.name;
			console.log(g_data.opened_story)
			g_settings.story_number = g_settings.story_number + 1;
			initialDashboard();
			
		}
		//finish open the file, so story +1
	});
	
	return file_path;
  };
  
  function clickCanvas(index){
    var elementName = "#canvas"+index;
	console.log("Now: story #"+index);

	
    $(document).ready(function(){
        
      if(index < g_settings.story_number){
        $(elementName).click(function(){
          // open next page
		  console.log("Now: story #"+index);
		  //set story parameters
		  //story(name, path)
		  
		  if(index >= 0){
			  var next_story = g_data.story_list[index];
			  console.log("new story: "+next_story.name+", path: "+next_story.path);
			  g_current_variables.current_text_file_path = next_story.path;
			  alert("path:" + g_current_variables.current_text_file_path);
			  var file_path_to_storage = g_current_variables.current_text_file_path;
			  localStorage.setItem("text_path", file_path_to_storage);
			  //window.location.href='./ui/index.html';
			  //write temprary file
			  console.log(next_story.name)
			  console.log(g_data.opened_story)
			  console.log(g_data.story_list)
			$.post( "/postmethod", {
				javascript_data: file_path_to_storage 
			});

			///Rensa part
/*
            $.post( "/post_rensa", {
				javascript_data: file_path_to_storage 
			});
*/
			  window.location.href='/ui';
			  //call pyhton function here
			  
			  

		  }
		  else{
			console.log("ERROR: should choose a text file first.");
		  }

        });
      }
      else if(index == g_settings.story_number){
        $(elementName).click(function(){
          // open next page
          openFile();
        });
      }
    });
};

  return {
    initialDashboard: initialDashboard,
    openFile: openFile
  }
})();