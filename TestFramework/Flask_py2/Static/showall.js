function openShowAllNav() {
    display_text();
	display_sentiment_box();
	document.getElementById("show_all_frame").style.width = "100%";
}
function closeShowAllNav() {
    document.getElementById("show_all_frame").style.width = "0%";
}
function display_text(){
	//show all text
	//create several column, and put text, also control the font
	
	//clear old display
	parent_frame = "#"+"text_display";
	$(parent_frame).contents().not('.closebtn').remove();	
	$(document).ready(function(){
		//create columns
		target_frame = "text_display";
		var target_base = $("#"+target_frame);
		var target_base_width = target_base.width();
		var target_base_height = target_base.height();
		var target_base_offset = target_base.offset();
		var target_offset_left = target_base_offset.left;
		//width = 100/text_variables.number_columns -5;
		width = 44/text_variables.number_columns -1;
		window_width = $( window ).width();
		x_shift = window_width*0.12;
		//console.log("Number of pages "+text_original.length+ " Old pages: "+text_old.length);
		page_limit = Math.floor(text_original.length/text_variables.number_columns);
		for(i = 0; i < text_variables.number_columns; i++){
			var w = width;
			var w_px = w+"%";
			var column_width =window_width*w/100; 
			var h = target_base_height-5;
			var h_px = h+"px";
			var y =  0;
			var y_px = y+"px";
			//var x = width*i+target_offset_left;
			var x = x_shift+column_width*i;
			var x_px = x+"px";
			//console.log("X: "+x+", "+"Y: "+y+", W: "+column_width+", H:"+h);		
			addElement.addCanvas(target_frame, "text_display_"+i,  "text_display_column", "rgba(255, 255, 255, 1)", i+1, x_px, y_px, w_px, h_px, "rgba(255, 255, 255, 0.5)");
			target_text = group_text(page_limit*i, page_limit);
			//console.log(target_text);
			divID = "text_display_"+i;
			var currentText = document.getElementById(divID);
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
		window_width = $( window ).width();
		window_height = $( window ).height();
		target_frame = "sentiment_box_display";
		var target_base = $("#"+target_frame);
		var target_base_width = target_base.width();
		var target_base_height = window_height*0.7;
		var target_base_offset = target_base.offset();
		var target_offset_left = target_base_offset.left;
		//width = 100/text_variables.number_columns -5;
		width = 44/text_variables.number_columns -1;

		x_shift = window_width*0.56;
		//console.log("Number of pages "+text_original.length+ " Old pages: "+text_old.length);
		page_limit = Math.floor(text_original.length/text_variables.number_columns);
		for(i = 0; i < text_variables.number_columns; i++){
			var w = width;
			var w_px = w+"%";
			var column_width =window_width*w/100; 
			var h = target_base_height-5;
			var h_px = h+"px";
			var y =  0;
			var y_px = y+"px";
			//var x = width*i+target_offset_left;
			var x = x_shift+column_width*i;
			var x_px = x+"px";
			console.log("X: "+x+", "+"Y: "+y+", W: "+column_width+", H:"+h);		
			//addElement.addCanvas(target_frame, "sentiment_box_display_"+i,  "sentiment_box_display_column", "rgba(255, 255, 255, 1)", i+1, x_px, y_px, w_px, h_px, "rgba(255, 255, 255, 0.5)");
			//careate sentiment boxes
			parent_x = x;
			parent_w = column_width-2;
			parent_h = target_base_height-10;

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
	console.log("X:"+parent_x);
	
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