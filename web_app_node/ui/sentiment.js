  function openSentimentNav() {
      addSentimentFrames(100, 0);
	  for(page = 1 ; page <= tabNumber; page ++){
		var divID = "story_tab"+page;
		var currentText = document.getElementById(divID);
		var target_text = currentText.innerHTML;
		//"sentiment_page_"+index_shift+"_"+i		
		var targetID = "sentiment_page_"+0+"_"+(page-1);
		analyzeSentitment(1, target_text, targetID);
	  }
	  addSentimentFrames(350, 1);
	  addSentimentFrames(600, 2);	  
	  document.getElementById("over_sentiment_frame").style.width = "100%";
  }

  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeSentimentNav() {
      //formLocationResult();
      document.getElementById("over_sentiment_frame").style.width = "0%";
	  cleanAll();
  }
  function analyzeSentitment(number_sentence, target_text, targetID){
	// split text with number of sentences
	sentence_array = target_text.match(/\(?[^\.\?\!]+[\.!\?]\)?/g);
	//console.log(sentence_array.length);
	test = combineSentence(sentence_array, number_sentence)
	console.log(test);
	
	sentence_number = sentence_array.length;
	//sentence_number = 5;
	for(sentence = 0; sentence < sentence_number; sentence ++){
		//"sentiment_page_"+index_shift+"_"+i
		sentiment_score = computeSentimentScore(sentence_array[sentence]);
		if(sentiment_score > 0){
			//positive
			addSentimentDot("rgba(0, 255, 0, 1)", sentence, targetID, sentence_number);
		}
		else if(sentiment_score < 0){
			//negtive
			addSentimentDot("rgba(255, 0, 0, 1)", sentence, targetID, sentence_number);
		}
		else{
			//netural
			addSentimentDot("rgba(0, 0, 255, 1)", sentence, targetID, sentence_number);

		}
		//console.log(sentence_array[sentece] +" : "+sentiment_score);
	}
  }
  function addSentimentFrames(x_shift, index_shift){
	//add divs for assigned page numbers
	var target = document.getElementById("over_sentiment_frame"); 
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

		addElement.addCanvas("over_sentiment_frame", "sentiment_page_"+index_shift+"_"+i,  "sentiment_page", "rgba(255, 255, 255, 0.5)", i+1, x_px, y_px, width, height, border_color);
	}
  }
  function computeSentimentScore(short_text){
	var sentiment_score = 0;


	$(document).ready(function() {
		//var result_text = JSON.stringify(sentiment(short_text), undefined, 2);
		var result_text = sentiment(short_text);
		//console.log(result_text);
		//console.log(result_text.verdict +" score: "+result_text.score);
		sentiment_score = result_text.score;
	});
	return sentiment_score;
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
  function combineSentence(sentence_array, number_sentence){
	new_sentence_array = [];
	for(i =0; i <sentence_array.length; i+number_sentence){
	if(sentence_array.length- i >1){
		var newString = "";
		for(j = 0; j < number_sentence; j++){
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
	return new_sentence_array;
  }	