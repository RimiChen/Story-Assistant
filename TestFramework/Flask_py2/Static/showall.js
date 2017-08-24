function openShowAllNav() {
	initial_showall_settings();
    display_text();
	display_sentiment_box();
	add_actor_list();
	add_location_list();
    
    if(actor_showup.location_shift_on == true){
        location_check = location_show_up();
        if(Object.keys(location_check).length == 0){
            actor_show_up();
        }
        else{
            actor_show_up_control_y(location_check);
        }        
    }
    else{
        actor_show_up();
    }

    //actor_show_up();


	document.getElementById("show_all_frame").style.width = "100%";
}
function closeShowAllNav() {
    document.getElementById("show_all_frame").style.width = "0%";
}
//set all variables
function initial_showall_settings(){
    var total_place_number = Object.keys(locationSelectList).length;
    if(total_place_number == 0){
        total_place_number = 1;
    }
    if(actor_showup.location_shift_on == true){    
	//$("#vertical_middle").css("margin-top", display_settings.margin_top+"px");
	$("#vertical_middle").css("margin-top", display_settings.margin_top*total_place_number+"px");
    }
    else{
        $("#vertical_middle").css("margin-top", display_settings.margin_top+"px");
    
    }
	$("#horizontal_left").css("margin-left", display_settings.menu_left_shift+"px");
	$("#horizontal_left").css("width", display_settings.menu_width+"px");
	$("#text_display").css("margin-left", display_settings.menu_width+"px");
}
function location_show_up(){
    var total_place_number = Object.keys(locationSelectList).length;
    var block_height = display_settings.margin_top;
    var block_width = actor_showup.margin_left;
    var total_page_number = text_original.length;
    var location_check = {};
    
    // draw location blocks
    for(page_iter = 0; page_iter <total_page_number; page_iter++ ){
       actor_iter = 1;

       //if there is a previous location, keep it.
       if(page_iter > 0){
            location_check[page_iter] = location_check[page_iter-1]; 
       }
       else{
        location_check[page_iter] = 0; 
       }
       for(actor_name in locationSelectList ){
            if(actor_name != ""){
            //create color bolck
                
  				regex = new RegExp('('+actor_name+')', 'ig');
                var str = text_original[page_iter]; 
                var res = str.match(regex);
                if(res != null){
                    console.log("^^"+actor_name+", "+page_iter);
                    location_check[page_iter] = actor_iter;                   
                }
                actor_iter++;
            }
        }   
    }
    
        actor_iter = 1;    
        for(actor_name in locationSelectList ){
            if(actor_name != ""){
            //create color bolck
                               
                var actor_w = block_width;
                var actor_w_px = actor_w+"px";
                var actor_h = block_height;
                var actor_h_px = actor_h+"px";
                var actor_y = block_height*actor_iter;
                var actor_y_px = actor_y+"px";
                //var x = width*i+target_offset_left;
                var actor_x = 0;
                var actor_x_px = actor_x+"px";
                    //console.log("^^X: "+actor_x+", "+"Y: "+actor_y+", W: "+actor_w+", H:"+actor_h);
                    //console.log(""+colorList[charaSelectList[actor_iter]]+", "+charaSelectList[actor_iter]);
                addElement.addCanvas("show_all_frame", "location_show_up_box_"+actor_iter,  "location_show_up_box", colorList[actor_name], "", actor_x_px, actor_y_px, actor_w_px, actor_h_px, "rgba(255, 255, 255, 0.5)");
                //}
             
                actor_iter++;


            }
        }     

    return location_check;
}
function actor_show_up_control_y(location_check){
    var total_width = actor_showup.total_width;
    var total_height = display_settings.margin_top - (actor_showup.margin_top+actor_showup.margin_bottom);
    
    var total_page_number = text_original.length;
    
    var block_width = total_width/total_page_number;
    var block_height = total_height/Object.keys(charaSelectList).length;
    //console.log("#Actor: "+Object.keys(charaSelectList).length);
    
    for(page_iter = 0; page_iter <total_page_number; page_iter++ ){
        actor_iter = 0;
        for(actor_name in charaSelectList ){
            if(actor_name != ""){
            //create color bolck
                
  				regex = new RegExp('('+actor_name+')', 'ig');
                var str = text_original[page_iter]; 
                var res = str.match(regex);
                if(res != null){
                        //console.log("^^"+actor_name+", "+page_iter);
                    
                    var actor_w = block_width;
                    var actor_w_px = actor_w+"px";
                    var actor_h = block_height;
                    var actor_h_px = actor_h+"px";
                    var actor_y = (location_check[page_iter]*display_settings.margin_top)+actor_showup.margin_top+block_height*actor_iter;
                    var actor_y_px = actor_y+"px";
                    //var x = width*i+target_offset_left;
                    var actor_x = actor_showup.margin_left+block_width*page_iter;
                    var actor_x_px = actor_x+"px";
                    //console.log("^^X: "+actor_x+", "+"Y: "+actor_y+", W: "+actor_w+", H:"+actor_h);
                    //console.log(""+colorList[charaSelectList[actor_iter]]+", "+charaSelectList[actor_iter]);
                    addElement.addCanvas("show_all_frame", "actor_show_up_box_"+page_iter+"_"+actor_iter,  "actor_show_up_box", colorList[actor_name], "", actor_x_px, actor_y_px, actor_w_px, actor_h_px, "rgba(255, 255, 255, 0.5)");
                }
             
                actor_iter++;


            }
        }
    }
    
}
function actor_show_up(){
    var total_width = actor_showup.total_width;
    var total_height = display_settings.margin_top - (actor_showup.margin_top+actor_showup.margin_bottom);
    
    var total_page_number = text_original.length;
    
    var block_width = total_width/total_page_number;
    var block_height = total_height/Object.keys(charaSelectList).length;
    //console.log("#Actor: "+Object.keys(charaSelectList).length);
    
    for(page_iter = 0; page_iter <total_page_number; page_iter++ ){
        actor_iter = 0;
        for(actor_name in charaSelectList ){
            if(actor_name != ""){
            //create color bolck
                
  				regex = new RegExp('('+actor_name+')', 'ig');
                var str = text_original[page_iter]; 
                var res = str.match(regex);
                if(res != null){
                        //console.log("^^"+actor_name+", "+page_iter);
                    
                    var actor_w = block_width;
                    var actor_w_px = actor_w+"px";
                    var actor_h = block_height;
                    var actor_h_px = actor_h+"px";
                    var actor_y = actor_showup.margin_top+block_height*actor_iter;
                    var actor_y_px = actor_y+"px";
                    //var x = width*i+target_offset_left;
                    var actor_x = actor_showup.margin_left+block_width*page_iter;
                    var actor_x_px = actor_x+"px";
                    //console.log("^^X: "+actor_x+", "+"Y: "+actor_y+", W: "+actor_w+", H:"+actor_h);
                    //console.log(""+colorList[charaSelectList[actor_iter]]+", "+charaSelectList[actor_iter]);
                    addElement.addCanvas("show_all_frame", "actor_show_up_box_"+page_iter+"_"+actor_iter,  "actor_show_up_box", colorList[actor_name], "", actor_x_px, actor_y_px, actor_w_px, actor_h_px, "rgba(255, 255, 255, 0.5)");
                }
             
                actor_iter++;


            }
        }
    }
    
}
function display_text(){
	//show all text
	//create several column, and put text, also control the font
	
	//clear old display
	parent_frame = "#"+"text_display";
	$(parent_frame).contents().not('.closebtn').remove();	

	$(document).ready(function(){
		//create columns
		//console.log(text_variables.height);
		target_frame = "text_display";

		width = text_variables.width;
		//window_width = $( window ).width();
		//x_shift = window_width*0.12;
		x_shift = text_variables.empty_space;
		//console.log("Number of pages "+text_original.length+ " Old pages: "+text_old.length);
		page_limit = Math.floor(text_original.length/text_variables.number_columns);
		for(i = 0; i < text_variables.number_columns; i++){
			var w = width;
			var w_px = w+"px";
			var h = text_variables.height;
			var h_px = h+"px";
			var y =  0;
			var y_px = y+"px";
			//var x = width*i+target_offset_left;
			var x = display_settings.menu_width+(x_shift+w)*i;
			var x_px = x+"px";
			//console.log("X: "+x+", "+"Y: "+y+", W: "+column_width+", H:"+h);		
			addElement.addCanvas(target_frame, "text_display_"+i,  "text_display_column", "rgba(255, 255, 255, 1)", i+1, x_px, y_px, w_px, h_px, "rgba(255, 255, 255, 0.5)");
			target_text = group_text(page_limit*i, page_limit);
			$("#"+"text_display_"+i).css("margin-bottom", text_variables.margin_bottom+"px");
			//console.log(target_text);
			divID = "text_display_"+i;
			var currentText = document.getElementById(divID);
			currentText.style.fontSize = text_variables.font_size+"px";
			currentText.innerHTML = target_text;			
		}

	})	
}
function display_sentiment_box(){
	//show all text
	//create several column, and put text, also control the font
	
	//clear old display
	parent_frame = "#"+"sentiment_box_display";
	$(parent_frame).contents().not('.closebtn').remove();	
	$(document).ready(function(){
		//create columns

		width = sentiment_variables.width;

		x_shift = display_settings.menu_width + (text_variables.empty_space+text_variables.width)*text_variables.number_columns;
		//console.log("Number of pages "+text_original.length+ " Old pages: "+text_old.length);
		page_limit = Math.floor(text_original.length/text_variables.number_columns);
		for(i = 0; i < sentiment_variables.number_columns; i++){
			var w = width;
			var w_px = w+"px";
			var h = sentiment_variables.height;
			var h_px = h+"px";
			var y =  0;
			var y_px = y+"px";
			//var x = width*i+target_offset_left;
			var x = x_shift+(sentiment_variables.empty_space+w)*i;
			var x_px = x+"px";
			//console.log("X: "+x+", "+"Y: "+y+", W: "+column_width+", H:"+h);		
			//addElement.addCanvas(target_frame, "sentiment_box_display_"+i,  "sentiment_box_display_column", "rgba(255, 255, 255, 1)", i+1, x_px, y_px, w_px, h_px, "rgba(255, 255, 255, 0.5)");
			//careate sentiment boxes
			parent_x = x;
			parent_w = w-2;
			parent_h = h-10;

			create_sentiment_boxes(page_limit*i, page_limit, parent_x, parent_w, parent_h);;
		}

	})	
}
function group_text(start_index, page_number){
	target_text = "";
	console.log("page range: "+start_index+","+(start_index+page_number-1));
	var sub_text_array = text_original.slice(start_index, start_index+page_number);
	//console.log(sub_text_array.length);
	target_text = sub_text_array.join(" ");
	return target_text;
}
function create_sentiment_boxes(start_index, page_limit, parent_x, parent_w, parent_h){
	//console.log("X:"+parent_x);
	
	for(j = 0; j< page_limit; j++){
		//carete boxes
		var w = parent_w;
		var w_px = w+"px";
		var h = parent_h/page_limit;
		var h_px = h+"px";

		var y =  (h+1)*j;
		var y_px = y+"px";
		//var x = width*i+target_offset_left;
		var x = parent_x;
		var x_px = x+"px";

		//console.log("X: "+x+", "+"Y: "+y);
		//console.log("W: "+w+", H:"+parent_h);		
		addElement.addCanvas(target_frame, "sentiment_box_display_"+(start_index+j),  "sentiment_box_display_column", "rgba(255, 255, 255, 1)", (start_index+j), x_px, y_px, w_px, h_px, "rgba(255, 255, 255, 0.5)");
		target_text = text_old[start_index+j];
		height = h;
		analyzeSentitment_dot_adjust(1, target_text, "sentiment_box_display_"+(start_index+j), height);
	}
}
function analyzeSentitment_dot_adjust(max_sentence, target_text, targetID, parent_h){
	// split text with number of sentences
	//console.log("show target: "+targetID)
	//[\\[\\]?*+|{}\\\\()@.\n\r]"
	sentence_array = target_text.match(/\(?[^\.\?\!]+[\.!\?]\)?/g);
	//sentence_array = combineSentence(sentence_array, max_sentence);	
	//console.log(sentence_number)
	
	full_text = target_text;
	//console.log(full_text)



	sentence_number = sentence_array.length;
	//console.log(sentence_number)



	for(sentence = 0; sentence < sentence_number; sentence ++){
		//"sentiment_page_"+index_shift+"_"+i
		sentiment_score = computeSentimentScore(sentence_array[sentence]);
		//console.log(sentence_array[sentence]+",  "+sentiment_score);
		if(sentiment_score > 0){
			//positive
			color = "rgba(0, 255, 0, 1)";
			//console.log("green: positive" + "    "+ sentence_array[sentence]);
			addSentimentDot_adjust(color, sentence, targetID, sentence_number, parent_h);
			full_text = highLightSentence(full_text, sentence_array[sentence],"green");
		}
		else if(sentiment_score < 0){
			//negtive
			color = "rgba(255, 0, 0, 1)";
			//console.log("red: negative" + "    "+ sentence_array[sentence]);
			addSentimentDot_adjust(color, sentence, targetID, sentence_number, parent_h);
			full_text = highLightSentence(full_text, sentence_array[sentence], "red");
		}
		else{
			//netural
			color = "rgba(0, 0, 255, 1)";
			//console.log("blue: netural" + "    "+ sentence_array[sentence]);
			addSentimentDot_adjust(color, sentence, targetID, sentence_number, parent_h);
			full_text = highLightSentence(full_text, sentence_array[sentence], "blue");

		}
	}

	
	return full_text;

	//also highlight chosen tags.
	
}
function addSentimentDot_adjust(color, count, targetID, sentence_number, parent_h){
	//console.log(index);
    var newCanvas = document.createElement("div");
    newCanvas.id = "dot_"+targetID+"_"+count;
    newCanvas.class = "box_dot";

    var tempID = targetID;
	//console.log(targetID)
    var dotTarget = document.getElementById(tempID);

    
    dotTarget.appendChild(newCanvas);
    
    var currentDot = document.getElementById(newCanvas.id);
	currentDot.style.position = "absolute";
	currentDot.style.align = "top";
	var w = (parseInt(dotTarget.style.width.replace("px",""), 10)/ sentence_number)-2;
	//console.log(dotTarget.style.width);
	var w_px = w+"px";
	currentDot.style.width = w_px;
	currentDot.style.height = parent_h+"px";
	//var h_px = currentDot.style.height+"px";
	var y =  dotTarget.style.top;
	var y_px = y+"px";
	//currentDot.style.top = y_px;
	currentDot.style.top = "0%";
	var x = count*(w+2);
	var x_px = x+"px";
	currentDot.style.left = x_px;
	currentDot.style.backgroundColor = color;	

	newCanvas.style.border = 'none';
    //newCanvas.style.top = dotTarget.style.top;
    //newCanvas.style.left = dotTarget.style.left+100;    
}
function add_actor_list(){
	//console.log(charaSelectList);
	window_width = $( window ).width();
	window_height = $( window ).height();
	target_frame = "horizontal_left";
	var target_base = $("#"+target_frame);
	var target_base_width = target_base.width();
	var target_base_height = target_base.height();
	var target_base_offset = target_base.offset();
	var target_offset_left = target_base_offset.left;
	var target_offset_top = target_base_offset.top;
	
	actor_iter = 0;
	for(actor_name in charaSelectList ){
		if(actor_name != ""){
		//create color bolck
			block_width = menu_settings.block_width;
			var actor_w = block_width;
			var actor_w_px = actor_w+"px";
			var actor_h = actor_w;
			var actor_h_px = actor_h+"px";
			var actor_y = 10+(actor_h+2)*actor_iter;
			var actor_y_px = actor_y+"px";
			//var x = width*i+target_offset_left;
			var actor_x = target_base_offset.left;
			var actor_x_px = actor_x+"px";
			//console.log("^^X: "+actor_x+", "+"Y: "+actor_y+", W: "+actor_w+", H:"+actor_h);
			//console.log(""+colorList[charaSelectList[actor_iter]]+", "+charaSelectList[actor_iter]);
			addElement.addCanvas("horizontal_left", "actor_menu_box_"+actor_iter,  "actor_menu_box", colorList[actor_name], "", actor_x_px, actor_y_px, actor_w_px, actor_h_px, "rgba(255, 255, 255, 0.5)");
			//create name block
			var w = target_base_width - actor_w-2;
			var w_px = w+"px";
			var h = actor_h;
			var h_px = h+"px";
			var y =  menu_settings.actor_menu_margin_top+(actor_h+2)*actor_iter;
			var y_px = y+"px";
			//var x = width*i+target_offset_left;
			var x = target_base_offset.left+actor_w+1;
			var x_px = x+"px";
			addElement.addCanvas("horizontal_left", "actor_menu_name_"+actor_iter,  "actor_menu_name",  "rgba(255, 255, 255, 0)", actor_name, x_px, y_px, w_px, h_px, "rgba(255, 255, 255, 0.5)");
			
			
			actor_iter++;


		}
	}
	
}
function add_location_list(){
	//console.log(locationSelectList);
	window_width = $( window ).width();
	window_height = $( window ).height();
	target_frame = "horizontal_left";
	var target_base = $("#"+target_frame);
	var target_base_width = target_base.width();
	var target_base_height = target_base.height();
	var target_base_offset = target_base.offset();
	var target_offset_left = target_base_offset.left;
	var target_offset_top = target_base_offset.top;
	
	actor_iter = 0;
	height_shift = target_base_height+20;
	for(actor_name in locationSelectList ){
		if(actor_name != ""){
		//create color bolck
			block_width = menu_settings.block_width;
			var actor_w = block_width;
			var actor_w_px = actor_w+"px";
			var actor_h = actor_w;
			var actor_h_px = actor_h+"px";
			var actor_y = menu_settings.location_menu_margin_top+(actor_h+2)*actor_iter;
			var actor_y_px = actor_y+"px";
			//var x = width*i+target_offset_left;
			var actor_x = target_base_offset.left;
			var actor_x_px = actor_x+"px";
			//console.log("^^X: "+actor_x+", "+"Y: "+actor_y+", W: "+actor_w+", H:"+actor_h);
			//console.log(""+colorList[charaSelectList[actor_iter]]+", "+charaSelectList[actor_iter]);
			addElement.addCanvas("horizontal_left", "location_menu_box_"+actor_iter,  "location_menu_box", colorList[actor_name], "", actor_x_px, actor_y_px, actor_w_px, actor_h_px, "rgba(255, 255, 255, 0.5)");
			//create name block
			var w = target_base_width - actor_w-2;
			var w_px = w+"px";
			var h = actor_h;
			var h_px = h+"px";
			var y = menu_settings.location_menu_margin_top+(actor_h+2)*actor_iter;
			var y_px = y+"px";
			//var x = width*i+target_offset_left;
			var x = target_base_offset.left+actor_w+1;
			var x_px = x+"px";
			addElement.addCanvas("horizontal_left", "location_menu_name_"+actor_iter,  "location_menu_name",  "rgba(255, 255, 255, 0)", actor_name, x_px, y_px, w_px, h_px, "rgba(255, 255, 255, 0.5)");
			
			
			actor_iter++;


		}
	}
	
}