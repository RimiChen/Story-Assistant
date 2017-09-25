  function openStoryNav() {
	  //read story_points.json
	  find_story_points();
	  //console.log("number of story points: #"+story_points.length);
	  // create page frames
		parent_frame = "#"+"over_story_frame";
		$(parent_frame).contents().not('.closebtn').remove();
		target_frame = "over_story_frame";
		target_name = "#"+target_frame;
		target_base = $(target_name);
		target_base_position = target_base.offset();
		left_offset = target_base_position.left;
		top_offset = target_base_position.top+50;	  
		for(i = 1; i<= g_settings.tabNumber; i++){
				targetID = addPageFrames( left_offset, (top_offset+40*i), 0, i, target_frame);
				//console.log(targetID);
				//show_sentiment_bar_v2((i+1), left_offset,(top_offset+40*i), target_frame, 1, 0)
				//addElement.addCanvas("over_sentiment_frame", "sentiment_page_"+index_shift+"_"+i,  "sentiment_page", "rgba(255, 255, 255, 0.5)", i+1, x_px, y_px, width, height, border_color);

		}
		previous_page = 0;
		last_page = 0;
		//use it to control the x position
		story_point_count = 0;
		for(item in match_story){
			if(used_assertion[item.toString()]){
				console.log(item+" exist!");
				color = "rgba(0, 255, 255, 1)";
			}
			else{
				color = "rgba(0, 0, 255, 1)";
			
			}
			if(match_story[item]<0){
				//didn't find, use previous page number
				console.log("story point #"+item+", in page"+previous_page);
				//darw a block
				target_sub = "story_point_page_"+0+"_"+previous_page;
				//console.log("target: "+target_frame);
				add_story_point(target_sub, story_point_count, item, color);
				story_point_count ++;
			}
			else{
				console.log("story point #"+item+", in page"+match_story[item]);
				previous_page = match_story[item];
				if(last_page !=previous_page){
					//move to a new page
					last_page = previous_page;
					story_point_count = 0;
					//darw a block
					target_sub = "story_point_page_"+0+"_"+previous_page;
					add_story_point(target_sub, story_point_count, item, color);
				}
				else{
					//darw a block
					target_sub = "story_point_page_"+0+"_"+previous_page;

					add_story_point(target_sub, story_point_count, item, color);					
					story_point_count ++;
				}
			}
		}
	  //assign story points number
	  // show assertions
	  
	  document.getElementById("over_story_frame").style.width = "100%";
	  
  }
function closeStoryNav() {
    document.getElementById("over_story_frame").style.width = "0%";

}
function add_story_point(target_frame, shift, story_text, color){
	var target = document.getElementById(target_frame); 
				//for(i = 0; i < tabNumber; i++){

	var i = story_point_count;
	var w = 15;
	var h = 15;
	var width = w+"px";
	var height = h+"px";
	var border_color = "#00FFFF";
	target_base = $("#"+target_frame);
	target_base_position = target_base.offset();
	//console.log(target_base_position);
	left_offset = target_base_position.left;
	top_offset = target_base_position.top;
	var x = left_offset+ shift*20-50;
	var x_px = x+"px";
	//var y = i*(h+10)+y_shift-50;
	var y = top_offset;
	var y_px = y+"px";
	//console.log("x_shift: "+x  +", y_shift: "+y+", shift:"+shift);	
	//"over_story_frame"
    //addElement.addCanvas(target_frame,target_frame+"_"+item,"story_point_block", color, story_text, x_px, y_px, width, height, border_color);
    addElement.addCanvas("over_story_frame",target_frame+"_"+item,"story_point_block", color, story_text, x_px, y_px, width, height, border_color);

}	
function addPageFrames(x_shift, y_shift, index_shift, page_number, target_frame){

	//add divs for assigned page numbers
	var target = document.getElementById(target_frame); 
	var target_w = 400;
	var target_h = 50;

	//for(i = 0; i < tabNumber; i++){
		var i = page_number-1;
		var w = 400;
		var h = 30;
		var width = w+"px";
		var height = h+"px";
		var border_color = "#FFFF00";

		var x = x_shift-30;
		var x_px = x+"px";
		//var y = i*(h+10)+y_shift-50;
		var y = (h+10)+y_shift-70;
		var y_px = y+"px";
		//console.log("%x_shift: "+x  +", %y_shift: "+y);	
		addElement.addCanvas(target_frame, "story_point_page_"+index_shift+"_"+i,  "story_point_page", "rgba(255, 255, 255, 0.5)", i+1, x_px, y_px, width, height, border_color);

	frame_name = "story_page_"+index_shift+"_"+i;
	return frame_name;
		//}
}
function find_story_points(){
	//for each page match story points
	//console.log(story_points);
    $.each(story_points, function( sp, e ) {
		//for each page
		first_string = e.split(/[\?!\.\n\r,]/);
		//console.log(e);
		count = 0;
		target = "";
		for(possible_string in first_string){
			if(first_string[count].length <20){
				count = count+1;
			}
			else{
				target = first_string[count];
				break;
			}
		}
		if(target == ""){
			target = first_string[0];
		}
		
		//console.log("point "+sp+", "+target.trim());
		var i =0;
		while(i < g_settings.tabNumber){
			//find the first sentence
			//console.log(text_old[i].trim());
			var regex = new RegExp('('+target.trim()+')', 'ig');
			result = text_old[i].trim().includes(target);
			if(result == false){

				index = ""+sp;
				result = ""+result;
				match_story[sp] = -1;				
				i++;
			}
			else{
				//console.log("point "+sp+", at page "+i);
				index = ""+sp;
				match_story[sp] =i;
				break;
			}			
		}
		

	});
	console.log(match_story);
}