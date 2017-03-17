//var story_content = "???";
var file_path;
var story_content;

function newLoadText(filePath){
/*
    $(document).ready(function(){
      $.ajax({
        url : filePath,
        dataType: "text",
        success : function (data) {
          $("#inside_text").text(data);
          //alert(result);
          //this.text_content = result;
          //console.log(text_content);
          //return result;
          getStory(data);
        }
      });
    });
*/
  file_path = filePath;
  $(document).ready(function(){
    $.get(filePath, function(data){
      $('#dialog_title_span').text("new dialog title");
      getStory(data);
    });
    
  });

 // console.log("***"+story_content);

}
function getStory(data){
  story_content = data;
  //console.log(story_content);
  var currentDiv = document.getElementById('inside_text');
  currentDiv.innerHTML = story_content;
  $('#inside_text').trigger('contentchanged');
  //console.log("&&&"+currentDiv.innerHTML);
}

