  var created = {};
  
  function openFrequencyNav() {
      //console.log("Open frequency nav");
	  showFrequency();
	  document.getElementById("over_frequency_frame").style.width = "100%";
  }

  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeFrequencyNav() {
      document.getElementById("over_frequency_frame").style.width = "0%";
  }
  function showFrequency(){
	//console.log(colorList);
	//console.log(charaSelectList);

	for(var key in colorList){
		//console.log(colorList[key]);
		//console.log(charaSelectList);
		var target = document.getElementById("over_frequency_frame");
		//var target_w = target.offsetWidth;
		var target_w = 900;
		var target_h = target.offsetHeight-100;
		
		console.log(target_w +","+target_h);
		if(key in charaSelectList && key != "" && !(key in created)){
			console.log("character: "+key);
			var x =Math.floor(Math.random() * target_w);
			x_px = x+"px";
			var y =Math.floor(Math.random() * target_h);
			y_px = y+"px";
			
			var f2w = Math.floor(Math.log(frequencyList[key]+1)*10);
			var w = f2w;
			var width = w+"px";
			var height = w+"px";
			var border_color = "#FF0000";
			addElement.addCanvas("over_frequency_frame", "frequency_chara_"+key,  "freqeucy_chara", colorList[key], key+":"+frequencyList[key], x_px, y_px, width, height, border_color);
			created[key] = 1;
			//addElement.addCanvas("over_frequency_frame", "frequency_"+key,  "freqeucy_chara", key);
		}
		if(key in locationSelectList && key != "" && !(key in created)){
			console.log("location: "+key);
			//console.log("character: "+key);
			var x =Math.floor(Math.random() * target_w);
			x_px = x+"px";
			var y =Math.floor(Math.random() * target_h);
			y_px = y+"px";
			
			var f2w = Math.floor(Math.log(frequencyList[key]+1)*20);
			var w = f2w;
			var width = w+"px";
			var height = w+"px";
			var border_color = "#FFFF00";
			addElement.addCanvas("over_frequency_frame", "frequency_location_"+key,  "freqeucy_location", colorList[key], key+":"+frequencyList[key], x_px, y_px, width, height, border_color);
			created[key] = 1;
		}

	}
  }
  function createMenu(id){
	var target = document.getElementById(id);
  	console.log(id+": "+target.style.left+", "+target.style.top);
	//clear all and create
	var left = parseInt((target.style.left).replace(/px/,""));
	var shift = parseInt((target.style.width).replace(/px/,""));
	var x_position_px = (left+shift)+"px";
	
	var target_chara = id.replace(/frequency_chara_/,"");
	//console.log(target_chara);
	if(target_chara in informList){
		for(i = 0; i < informList[target_chara].length; i++){
			var top = parseInt((target.style.top).replace(/px/,""))+22*i;
			var top_px = top+"px";
		addElement.addCanvas("over_frequency_frame", "menu_"+id+"_"+i,  "chara_menu", "#000000", informList[target_chara][i], x_position_px, top_px, "100px", "20px", "#FFFFFF");
		}
	}
  }
  
