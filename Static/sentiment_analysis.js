  function openSentimentNav() {

	parent_frame = "#"+"over_sentiment_frame";
	$(parent_frame).contents().not('.closebtn').remove();
	target_frame = "over_sentiment_frame";
    target_name = "#"+target_frame;
	target_base = $(target_name);
	target_base_position = target_base.offset();
	left_offset = target_base_position.left;
	top_offset = target_base_position.top+50;	
	for(i = 0; i< g_settings.tabNumber; i++){
			//show all pages sentiment
			//console.log("##create page "+i)

			//show_sentiment_bar(g_data.current_page_number, 200, 30, target_frame);
			
			show_sentiment_bar_v2((i+1), left_offset,(top_offset+40*i), target_frame, 1, 0)
			show_sentiment_bar_v2((i+1), left_offset+250,(top_offset+40*i), target_frame, 1, g_settings.tabNumber);
			show_sentiment_bar_v2((i+1), left_offset+500,(top_offset+40*i), target_frame, 1, g_settings.tabNumber*2);

			//add canvas
			//addElement.addCanvas("over_sentiment_frame", "sentiment_page_"+index_shift+"_"+i,  "sentiment_page", "rgba(255, 255, 255, 0.5)", i+1, x_px, y_px, width, height, border_color);

	}
	
	  document.getElementById("over_sentiment_frame").style.width = "100%";

  }
  function show_sentiment_bar_v2(page_number, pos_x, pos_y, target_frame, max_sentence, page_base){
	  target_name = "#"+target_frame;
	  var target_base = $(target_name);
	  var target_base_position = target_base.offset();
	  var left_offset = target_base_position.left;
	  var top_offset = target_base_position.top;

	   //add frame
	     current_page = page_number+page_base;
		targetID = addSentimentFrames_v2( pos_x, pos_y, 0, current_page, target_frame);
		//console.log("Created_v2: "+targetID);
		//add dots
		target_text = text_old[current_page-1];
		//console.log("page: "+(current_page)+", "+target_text.length);
		analyzeSentitment_dot_v2(max_sentence, target_text, targetID);
  }
  
   function analyzeSentitment_dot_v2(max_sentence, target_text, targetID){
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
			addSentimentDot(color, sentence, targetID, sentence_number);
			full_text = highLightSentence(full_text, sentence_array[sentence],"green");
		}
		else if(sentiment_score < 0){
			//negtive
			color = "rgba(255, 0, 0, 1)";
			//console.log("red: negative" + "    "+ sentence_array[sentence]);
			addSentimentDot(color, sentence, targetID, sentence_number);
			full_text = highLightSentence(full_text, sentence_array[sentence], "red");
		}
		else{
			//netural
			color = "rgba(0, 0, 255, 1)";
			//console.log("blue: netural" + "    "+ sentence_array[sentence]);
			addSentimentDot(color, sentence, targetID, sentence_number);
			full_text = highLightSentence(full_text, sentence_array[sentence], "blue");

		}
	}

	
	return full_text;

	//also highlight chosen tags.
	
  }   
  function show_sentiment_bar(page_number, pos_x, pos_y, target_frame){
	  target_name = "#"+target_frame;
	  var target_base = $(target_name);
	  //console.log(target_base);
	  var target_base_position = target_base.offset();
	  //console.log(target_base_position);
	  var left_offset = target_base_position.left;
	  var top_offset = target_base_position.top;
	//add frame  
	targetID = addSentimentFrames_v2( pos_x, pos_y, page_number, page_number, target_frame);
	console.log("Created: "+targetID);
	//add dots
	target_text = text_old[page_number-1]
	analyzeSentitment_dot(1, target_text, targetID);
  }
  function readSentimentNav() {
	  $('#sentiment_body').contents().remove();

		//console.log("Test Sentiment")
	  var target_base = $("#sentiment_body");
	  //console.log(target_base);
	  var target_base_position = target_base.offset();
	  //console.log(target_base_position);
	  var left_offset = target_base_position.left;
	  var top_offset = target_base_position.top;
	  //console.log(target_base.position().left+", "+target_base.position().top);
	  
	  
      addSentimentFrames_v2(left_offset,top_offset, 0, current_page_number);
	  //for(page = 1 ; page <= tabNumber; page ++){
		var page = current_page_number;
		var divID = "story_tab"+page;
		//console.log($("#"+divID));
		var currentText = document.getElementById(divID);
		var target_text = currentText.innerHTML;
		//"sentiment_page_"+index_shift+"_"+i		
		var targetID = "sentiment_page_"+0+"_"+(page-1);
		//console.log(targetID +". "+target_text);
		analyzeSentitment(1, target_text, targetID);
	  //}
  }
  function readSentimentNav_original(target_text, targetID) {
	  changed_text = analyzeSentitment_modify(1, target_text, targetID);
	  //addSentimentFrames_v2(left_offset,top_offset, 0, current_page_number);
	  //console.log("page: "+targetID);
	  //console.log(changed_text);
	  return changed_text;
  }  
  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeSentimentNav() {
      //formLocationResult();
      document.getElementById("over_sentiment_frame").style.width = "0%";
	  cleanAll();
  }
  function analyzeSentitment_modify(max_sentence, target_text, targetID){
	// split text with number of sentences
	sentence_array = target_text.match(/\(?[^\.\?\!]+[\.!\?]\)?/g);
	//console.log(sentence_array.length);
	sentence_array = combineSentence(sentence_array, max_sentence);
	//console.log("before: " +sentence_array.length);
	//console.log("after: " +test.length);
	
	sentence_number = sentence_array.length;
	//sentence_number = 5;
	//console.log("============================");
	var full_text = target_text;
	//console.log("    "+current_page_number);
	//console.log(full_text);
	for(sentence = 0; sentence < sentence_number; sentence ++){
		//"sentiment_page_"+index_shift+"_"+i
		sentiment_score = computeSentimentScore(sentence_array[sentence]);
		//console.log(sentence_array[sentence]+",  "+sentiment_score);
		if(sentiment_score > 0){
			//positive
			color = "rgba(0, 255, 0, 1)";
			//console.log("green: positive" + "    "+ sentence_array[sentence]);
			//addSentimentDot(color, sentence, targetID, sentence_number);
			full_text = highLightSentence(full_text, sentence_array[sentence],"green");
		}
		else if(sentiment_score < 0){
			//negtive
			color = "rgba(255, 0, 0, 1)";
			//console.log("red: negative" + "    "+ sentence_array[sentence]);
			//addSentimentDot(color, sentence, targetID, sentence_number);
			full_text = highLightSentence(full_text, sentence_array[sentence], "red");
		}
		else{
			//netural
			color = "rgba(0, 0, 255, 1)";
			//console.log("blue: netural" + "    "+ sentence_array[sentence]);
			//addSentimentDot(color, sentence, targetID, sentence_number);
			full_text = highLightSentence(full_text, sentence_array[sentence], "blue");

		}

		//console.log(sentence_array[sentence] +" : "+sentiment_score);
	}
	var divID = "story_tab"+current_page_number;
	var currentText = document.getElementById(divID);
	//text_separate_result[index] = story_text;
	//text_original[current_page_number-1] = full_text;
	
	return full_text;
	//var needDraw = story_text.indexOf(color);
	//console.log(text_original[current_page_number-1]);	
	
	//also highlight chosen tags.
	
	
  }
   function analyzeSentitment_dot(max_sentence, target_text, targetID){
	// split text with number of sentences
	sentence_array = target_text.match(/\(?[^\.\?\!]+[\.!\?]\)?/g);
	//console.log(sentence_array.length);
	sentence_array = combineSentence(sentence_array, max_sentence);
	//console.log("before: " +sentence_array.length);
	//console.log("after: " +test.length);
	
	sentence_number = sentence_array.length;
	//sentence_number = 5;
	//console.log("============================");
	var full_text = target_text;
	//console.log("    "+current_page_number);
	//console.log("\n\n\n");
	//console.log(full_text);
	if(current_page_number == 2){
		//console.log("&&&&&&&&&&&&&&"+ full_text);
	}
	for(sentence = 0; sentence < sentence_number; sentence ++){
		//"sentiment_page_"+index_shift+"_"+i
		sentiment_score = computeSentimentScore(sentence_array[sentence]);
		//console.log(sentence_array[sentence]+",  "+sentiment_score);
		if(sentiment_score > 0){
			//positive
			color = "rgba(0, 255, 0, 1)";
			//console.log("green: positive" + "    "+ sentence_array[sentence]);
			addSentimentDot(color, sentence, targetID, sentence_number);
			full_text = highLightSentence(full_text, sentence_array[sentence],"green");
		}
		else if(sentiment_score < 0){
			//negtive
			color = "rgba(255, 0, 0, 1)";
			//console.log("red: negative" + "    "+ sentence_array[sentence]);
			addSentimentDot(color, sentence, targetID, sentence_number);
			full_text = highLightSentence(full_text, sentence_array[sentence], "red");
		}
		else{
			//netural
			color = "rgba(0, 0, 255, 1)";
			//console.log("blue: netural" + "    "+ sentence_array[sentence]);
			addSentimentDot(color, sentence, targetID, sentence_number);
			full_text = highLightSentence(full_text, sentence_array[sentence], "blue");

		}
		if(current_page_number == 2){
			//console.log("&&&&&&&&&&&&&&"+ full_text);
		}

		//console.log(sentence_array[sentence] +" : "+sentiment_score);
	}
	var divID = "story_tab"+current_page_number;
	var currentText = document.getElementById(divID);
	//text_separate_result[index] = story_text;
	//text_original[current_page_number-1] = full_text;
	
	return full_text;
	//var needDraw = story_text.indexOf(color);
	//console.log(text_original[current_page_number-1]);	
	
	//also highlight chosen tags.
	
	
  } 
  function analyzeSentitment(max_sentence, target_text, targetID){
	// split text with number of sentences
	sentence_array = target_text.match(/\(?[^\.\?\!]+[\.!\?]\)?/g);
	//console.log(sentence_array.length);
	sentence_array = combineSentence(sentence_array, max_sentence);
	//console.log("before: " +sentence_array.length);
	//console.log("after: " +test.length);
	
	sentence_number = sentence_array.length;
	//sentence_number = 5;
	//console.log("============================");
	var full_text = target_text;
	//console.log("    "+current_page_number);
	//console.log(full_text);
	if(current_page_number == 2){
		//console.log("&&&&&&&&&&&&&&"+ full_text);
	}
	for(sentence = 0; sentence < sentence_number; sentence ++){
		//"sentiment_page_"+index_shift+"_"+i
		sentiment_score = computeSentimentScore(sentence_array[sentence]);
		//console.log(sentence_array[sentence]+",  "+sentiment_score);
		if(sentiment_score > 0){
			//positive
			color = "rgba(0, 255, 0, 1)";
			//console.log("green: positive" + "    "+ sentence_array[sentence]);
			addSentimentDot(color, sentence, targetID, sentence_number);
			full_text = highLightSentence(full_text, sentence_array[sentence],"green");
		}
		else if(sentiment_score < 0){
			//negtive
			color = "rgba(255, 0, 0, 1)";
			//console.log("red: negative" + "    "+ sentence_array[sentence]);
			addSentimentDot(color, sentence, targetID, sentence_number);
			full_text = highLightSentence(full_text, sentence_array[sentence], "red");
		}
		else{
			//netural
			color = "rgba(0, 0, 255, 1)";
			//console.log("blue: netural" + "    "+ sentence_array[sentence]);
			addSentimentDot(color, sentence, targetID, sentence_number);
			full_text = highLightSentence(full_text, sentence_array[sentence], "blue");

		}
		if(current_page_number == 2){
			//console.log("&&&&&&&&&&&&&&"+ full_text);
		}

		//console.log(sentence_array[sentence] +" : "+sentiment_score);
	}
	var divID = "story_tab"+current_page_number;
	var currentText = document.getElementById(divID);
	//text_separate_result[index] = story_text;
	//text_original[current_page_number-1] = full_text;
	
	return full_text;
	//var needDraw = story_text.indexOf(color);
	//console.log(text_original[current_page_number-1]);	
	
	//also highlight chosen tags.
	
	
  }
  function highLightSentence(full_text, target_sentence, color){
    result_text = "";
	//$(document).ready(function () {
		//console.log(full_text+"  ====  "+target_sentence);
		var index = current_page_number;
		//console.log("***"+current_page_number+"   "+target_sentence);
		var tempID = "#story_tab"+index;
		//var story_text = $(tempID).text();
		var story_text = full_text;
		//console.log("^^^"+story_text);
		var regex = new RegExp('('+target_sentence+')', 'ig');

		story_text = story_text.replace(regex, '<font style="opacity:.6" color="'+color+'">$1</font>')


		result_text = story_text;
    //});  
	
	if(current_page_number == 2){
		//console.log("&&&&&&&&&&&&&&"+ result_text);
	}
	return result_text;
  }
  function addSentimentFrames(x_shift, index_shift){
	//add divs for assigned page numbers
	var target = document.getElementById("sentiment_body"); 
	var target_w = 200;
	var target_h = 30;

	for(i = 0; i < tabNumber; i++){
		var w = 200;
		var h = 30;
		var width = w+"px";
		var height = h+"px";
		var border_color = "#FFFF00";

		var x = x_shift;
		var x_px = x+"px";
		var y = i*(h+10)+80;
		var y_px = y+"px";

		addElement.addCanvas("sentiment_body", "sentiment_page_"+index_shift+"_"+i,  "sentiment_page", "rgba(255, 255, 255, 0.5)", i+1, x_px, y_px, width, height, border_color);
	}
  }
  function addSentimentFrames_v2(x_shift, y_shift, index_shift, page_number, target_frame){

	//add divs for assigned page numbers
	var target = document.getElementById(target_frame); 
	var target_w = 400;
	var target_h = 50;

	//for(i = 0; i < tabNumber; i++){
		var i = page_number-1;
		var w = 200;
		var h = 30;
		var width = w+"px";
		var height = h+"px";
		var border_color = "#FFFF00";

		var x = x_shift-30;
		var x_px = x+"px";
		//var y = i*(h+10)+y_shift-50;
		var y = (h+10)+y_shift-70;
		var y_px = y+"px";

		addElement.addCanvas(target_frame, "sentiment_page_"+index_shift+"_"+i,  "sentiment_page", "rgba(255, 255, 255, 0.5)", i+1, x_px, y_px, width, height, border_color);

	frame_name = "sentiment_page_"+index_shift+"_"+i;
	return frame_name;
		//}
  }  
  function computeSentimentScore(short_text){
	var sentiment_score = 0;

	var result_text = sentiment(short_text);
	$(document).ready(function() {
		//var result_text = JSON.stringify(sentiment(short_text), undefined, 2);

		//console.log(result_text);
		//console.log(result_text.verdict +" score: "+result_text.score);
		sentiment_score = result_text.score;
	});
	//console.log(result_text.verdict +" score: "+result_text.score);
	return result_text.score;
  }
  function addSentimentDot(color, count, targetID, sentence_number){
	//console.log(index);
    var newCanvas = document.createElement("div");
    newCanvas.id = "dot_"+targetID+"_"+count;
    newCanvas.class = "dot";

    var tempID = targetID;
	//console.log(targetID)
    var dotTarget = document.getElementById(tempID);

    
    dotTarget.appendChild(newCanvas);
    
    var currentDot = document.getElementById(newCanvas.id);
	currentDot.style.position = "absolute";
	var w = (parseInt(dotTarget.style.width.replace("px",""), 10)/ sentence_number)-2;
	//console.log(dotTarget.style.width);
	var w_px = w+"px";
	currentDot.style.width = w_px;
	currentDot.style.height = "10px";
	var y =  dotTarget.style.top;
	var y_px = y+"px";
	currentDot.style.top = y_px;
	var x = count*(w+2);
	var x_px = x+"px";
	currentDot.style.left = x_px;
	currentDot.style.backgroundColor = color;	

	newCanvas.style.border = 'none';
    //newCanvas.style.top = dotTarget.style.top;
    //newCanvas.style.left = dotTarget.style.left+100;    
  }
  function cleanAll(){
	$('#over_sentiment_frame').contents().not('.closebtn').remove();
  }
  function combineSentence(sentence_array, max_sentence){
	new_sentence_array = [];
	for(i =0; i <sentence_array.length; i+=max_sentence){

	if(sentence_array.length- i >max_sentence){
			//console.log("test 1: "+i);
			var newString = "";
			for(j = 0; j < max_sentence; j++){
				if(j == 0){
					newString = sentence_array[i+j];
				}
				else{
					newString = newString+" "+sentence_array[i+j];
				}
				
			}
			new_sentence_array.push(newString);
		}
		else{
			var newString = "";
			//console.log("test 2: "+i);
			for(j = i; j < sentence_array.length; j++){
				if(j == i){
					newString = sentence_array[j];
				}
				else{
					newString = newString+" "+sentence_array[j];
				}
				
			}
			new_sentence_array.push(newString);		
		}

		//console.log(i);
	}
	return new_sentence_array;
  }	