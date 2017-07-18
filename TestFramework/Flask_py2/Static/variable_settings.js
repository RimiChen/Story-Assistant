/*
--SETTINGS--
number of initial stories--
DEFAULT: 0

number of displayed pages--
ERROR HANDLING:
if page more than total page
	TO DO:
else
	display pages



*/
var g_settings = {
	default_file_folder: "Text_sample/",

	story_number: 0,
	tabNumber: 20,
	dashboard_icon_margin: 200,
	paragraph_word_limit: 2800

};

/*
--CURRENT VARIABLES--

current text file path--
ERROR HANDLING:
if path == null
	set to default sample text.
else
	load files according to assigned file path.


*/

var g_current_variables = {
	current_text_file_path: "",
	current_json_path: "",
	//use this to control the json file length
	list_length_limit: ""
};

/*
TO DO:
	this should be adjusted according to window size. default is 3000
*/


var g_data ={
	opened_story: {},
	story_list: []
}


var total_page_number = -1;
var current_page_number = 1;
var source_text = "../text_sample/austen-sense.txt";

var text_original = new Array();
var text_sentiment = new Array();

var text_separate_result = new Array();

//var max_sentence = 5;


var character_index = new Array();