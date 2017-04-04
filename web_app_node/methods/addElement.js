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

    console.log("create"+id);
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
      //openStoryTab(tabNumber, id_number);
	  //console.log(this.id);
	  if(this.class == "freqeucy_chara"){

		createMenu(this.id);
	  }
	  
    });

    target_div.appendChild(newDiv);
  }
  return {
    addDiv: addDiv,
	addCanvas: addCanvas
   
  }
})();