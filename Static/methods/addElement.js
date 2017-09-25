var addElement = (function () {
  var addDiv = function(appendTarget, id, divClass, content ){
    var newDiv = document.createElement("div");
    newDiv.id = id;
    newDiv.class = divClass;
    newDiv.innerHTML = content;
    var target_div = document.getElementById(appendTarget);    
    target_div.appendChild(newDiv);

  }
  //moveable canvas
  var addCanvas = function(appendTarget, id,  divClass, color, content, x, y, width, height, border_color ){

	var target_div = document.getElementById(appendTarget);    
	var newDiv = document.createElement("div");

    newDiv.id = id;
    newDiv.class = divClass;
    newDiv.innerHTML = content;
	newDiv.style.position = "absolute";
	newDiv.style.width = width;
	newDiv.style.height = height;
	newDiv.style.top = y;
	newDiv.style.left = x;
	newDiv.style.backgroundColor = color;
	newDiv.style.color = "#FFFFFF";
	newDiv.style.borderColor = border_color;
	newDiv.addEventListener('click', function(event){
      //openStoryTab(g_settings.tabNumber, id_number);
	  //console.log(this.id);
	  if(this.class == "freqeucy_chara"){

		createMenu(this.id);
	  }
	  if(this.class == "chara_menu"){
		var tempString = this.id;
		tempString = tempString.replace("menu_frequency_chara_", "");
		var lastIndex = tempString.lastIndexOf("_");
		var res = tempString.substring(0, lastIndex);
		console.log(res+": "+this.innerHTML);
		//to get a list of related pages
		var pageList = findPages(res, this.innerHTML);
		console.log(pageList);
		
		if(pageList.length >0){
			closeFrequencyNav();
			storyMainPageFunctions.openStoryTab(g_settings.tabNumber, pageList[0]);
		}
		
	  }
	  
    });

    target_div.appendChild(newDiv);
  }
  function findPages(chara_name, action_name){
	var pages = [];
	for(i =1 ; i <= g_settings.tabNumber; i++){
		var tempID = "#story_tab"+i;
		var text = $(tempID).text();		
		//find all occurence of character
		var charaIndex = getIndicesOf(chara_name, text, false);
		//find all occurence of action
		var actionIndex = getIndicesOf(action_name, text, false);
		if(charaIndex.length >0 && actionIndex.length > 0){
			
			for(chara_i = 0 ; chara_i < charaIndex.length; chara_i++){
				for(action_i = 0 ; action_i < actionIndex.length; action_i++){
					if(charaIndex[chara_i] < actionIndex[action_i] && (actionIndex[action_i] - charaIndex[chara_i])<50){
						console.log("Page "+i +"  "+charaIndex +"; "+actionIndex);
						pages.push(i);
					}
				}
			}
		}
	}
	return pages;
  }

  return {
    addDiv: addDiv,
	addCanvas: addCanvas
   
  }
})();