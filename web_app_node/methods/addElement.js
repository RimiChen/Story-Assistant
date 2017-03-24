var addElement = (function () {
  var addDiv = function(appendTarget, id, divClass, content ){
    var newDiv = document.createElement("div");
    newDiv.id = id;
    newDiv.class = divClass;
    newDiv.innerHTML = content;
    var target_div = document.getElementById(appendTarget);    
    target_div.appendChild(newDiv);

  }

  return {
    addDiv: addDiv
   
  }
})();