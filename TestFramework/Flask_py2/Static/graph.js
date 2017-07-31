//{id: 0, label: "0", group: 'source'},
var nodes = [];
//{from: 1, to: 0},
var edges = [];
  function openGraphNav() {
	  document.getElementById("over_graph_frame").style.width = "100%";

  }
  function closeGraphNav() {
      document.getElementById("over_graph_frame").style.width = "0%";
	  //cleanNodes();
	  //cleanAllNodes();
  }  
function drawGraph(){
	console.log("Test vis");

    // create a network
    var container = document.getElementById('location_graph');
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        nodes: {
            shape: 'dot',
            size: 20,
            font: {
                size: 15,
                color: '#ffffff'
            },
            borderWidth: 2
        },
        edges: {
            width: 2
        },
        groups: {
            diamonds: {
                color: {background:'red',border:'white'},
                shape: 'diamond'
            },
            mints: {color:'rgb(0,255,140)'},
            icons: {
                shape: 'icon',
                icon: {
                    face: 'FontAwesome',
                    code: '\uf0c0',
                    size: 50,
                    color: 'orange'
                }
            },
        }
    };
    var network = new vis.Network(container, data, options);
}
function drawGraph_v3(input_list){
	//add_line(50, 50, 200, 200, "over_graph_frame");
	console.log(input_list)
	location_temp = [];
	count = 1;
	x_count = -1;
	Object.keys(input_list).forEach(function(key) {
		//console.log(key, input_list[key]);
		location_part = key.slice(0, key.lastIndexOf("_"));
		location_part = location_part.slice(location_part.indexOf("_")+1);
		if(location_temp[location_part]!= null){
			count = count +1;
			location_temp[location_part] = count;
			//draw with count to get y position
		}
		else{
			location_temp[location_part] = 0;
			count = 1;
			x_count = x_count+1;
			//draw x_count to get x_position
		}
		//console.log(50*x_count, 50*count)
		w= 100;
		w_px = w+"px";
		h = 50;
		h_px = h+"px";
		x= 300*x_count+30;
		x_px = x+"px";
		y = 150*count+30;
		y_px = y+"px"
		addElement.addCanvas("over_graph_frame", "graph_location_"+key,  "location_canvas", colorList[location_part], key, x_px, y_px, w_px, h_px, "rgba(255,255,255,0.5)");
		
		actor_count = 0;
		x1 = 300*x_count;
		y1 = 150*count+30;
		Object.keys(input_list[key]).forEach(function(key_in){
			//console.log(key_in, input_list[key][key_in])
			actor_part = input_list[key][key_in].slice(0, input_list[key][key_in].lastIndexOf("_"));
			actor_part = actor_part.slice(actor_part.indexOf("_")+1);
			w= 50;
			w_px = w+"px";
			h = 30;
			h_px = h+"px";
			x= 300*x_count+150;
			x_px = x+"px";
			y = 150*count+actor_count*35;
			y_px = y+"px"
			
			x2 = 300*x_count+120;
			y2 = 150*count+actor_count*35;
			addElement.addCanvas("over_graph_frame", "graph_actor_"+key+"_"+input_list[key][key_in],  "actor_canvas", colorList[actor_part], input_list[key][key_in], x_px, y_px, w_px, h_px, "rgba(255,255,255,0.5)");
			//add_line(x1, y1, x2, y2, "over_graph_frame", input_list[key][key_in]);
			actor_count = actor_count+1;
		});
	});
	console.log(location_temp);
	
}
/*
function add_line(x1, y1, x2, y2, target_frame, name){
//Make an SVG Container
	console.log("draw line");
 var svgContainer = d3.select("#over_graph_frame").append("svg")
                                     .attr("width", 2000)
                                     .attr("height", 2000);
 
 //Draw the line
 line_id = "line"+name;
 var circle = svgContainer.append("line")
                          .attr("x1", x1)
                          .attr("y1", y1)
                         .attr("x2", x2)
                         .attr("y2", y2)
                         .attr("stroke-width", 2)
                         .attr("stroke", "white");				 
}
*/
function drawGraph_v2(){
	console.log("Test vis network");
cytoscape({
  container: document.getElementById('over_graph_frame'),

  boxSelectionEnabled: false,
  autounselectify: true,

  layout: {
    name: 'dagre'
  },

  style: [
    {
      selector: 'node',
      style: {
		'color': '#FFFFFF',
        'content': 'data(id)',
        'text-opacity': 0.5,
        'text-valign': 'center',
        'text-halign': 'right',
        'background-color': '#11479e'
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 4,
        'target-arrow-shape': 'triangle',
        'line-color': '#9dbaea',
        'target-arrow-color': '#9dbaea'
      }
    }
  ],

  elements: {
    nodes: nodes,
    edges: edges
  },
});
	console.log(nodes[0]);
	console.log(edges[0]);
}
function editNodes_v2(){
	var finalChara = [];
	var pageNameList = [];
	for(var key in colorList){
		//if(key in charaSelectList && key != "" && !(key in created)){
		//	var tempName ="character_"+ key;
		//	nodes.push({id: tempName, label: key, group: 'icons'});
		//}
		if(key in locationSelectList && key != "" && !(key in created)){
			//check for every page
			var pageLink = [];


			for(i = 1 ; i <= g_settings.tabNumber; i++){
				var tempID = "#story_tab"+i;
				var text = $(tempID).text();
				var inThisPage = text.indexOf(key);
				if(inThisPage >=0){
					var tempLocationName ="location_"+ key+"_"+i;
					var newKey = key+"_"+i;
					pageLink.push(tempLocationName);
					nodes.push( {data: { id: tempLocationName }});
					
					// the character in this page
					var characterLink = [];

					for(name in charaSelectList){
						var nameInThisPage = text.indexOf(name);
						if(nameInThisPage >=0 && name !=""){
							characterLink.push();
							var tempCharaName ="Chara_"+ name+"_"+i;
							var newCharaKey = name+"_"+i;
							characterLink.push(tempCharaName);
							if(finalChara.includes(tempCharaName)){
							}
							else{
								finalChara.push(tempCharaName);
								//console.log(finalChara);
								nodes.push({data: { id: tempCharaName }});
							}
						}
					}
					pageNameList[tempLocationName] = characterLink;
				}
			}
			//create link between locations in different pages
			for(j=0; j < pageLink.length; j++){
				var currentNode = pageLink[j];
				if(j +1 <pageLink.length){
					//not the last one

					var nextNode = pageLink[j+1];
					//data: { source: 'n0', target: 'n1' } 
					edges.push({data: { source: currentNode, target:  nextNode }});

				}
				for(iter = 0; iter < pageNameList[pageLink[j]].length; iter++){
					var nodeName = pageNameList[pageLink[j]][iter];
				edges.push({data: { source: currentNode, target: nodeName }});
				}
				//console.log(pageNameList);
			}
			//console.log(pageNameList);
			//console.log(finalChara);
		}

	}
	
	return pageNameList;
	//console.log(nodes[0]);
	//console.log(edges[0]);
}
function editNodes(){
	var finalChara = [];
	var pageNameList = [];
	for(var key in colorList){
		//if(key in charaSelectList && key != "" && !(key in created)){
		//	var tempName ="character_"+ key;
		//	nodes.push({id: tempName, label: key, group: 'icons'});
		//}
		if(key in locationSelectList && key != "" && !(key in created)){
			//check for every page
			var pageLink = [];


			for(i = 1 ; i <= g_settings.tabNumber; i++){
				var tempID = "#story_tab"+i;
				var text = $(tempID).text();
				var inThisPage = text.indexOf(key);
				if(inThisPage >=0){
					var tempLocationName ="location_"+ key+"_"+i;
					var newKey = key+"_"+i;
					pageLink.push(tempLocationName);
					nodes.push({id: tempLocationName, label: newKey, group: 'mint'});
					
					// the character in this page
					var characterLink = [];

					for(name in charaSelectList){
						var nameInThisPage = text.indexOf(name);
						if(nameInThisPage >=0 && name !=""){
							characterLink.push();
							var tempCharaName ="Chara_"+ name+"_"+i;
							var newCharaKey = name+"_"+i;
							characterLink.push(tempCharaName);
							if(finalChara.includes(tempCharaName)){
							}
							else{
								finalChara.push(tempCharaName);
								//console.log(finalChara);
								nodes.push({id: tempCharaName, label: newCharaKey, group: 'icons'});
							}
						}
					}
					pageNameList[tempLocationName] = characterLink;
				}
			}
			//create link between locations in different pages
			for(j=0; j < pageLink.length; j++){
				var currentNode = pageLink[j];
				if(j +1 <pageLink.length){
					//not the last one

					var nextNode = pageLink[j+1];
					edges.push({from: currentNode, to: nextNode});

				}
				for(iter = 0; iter < pageNameList[pageLink[j]].length; iter++){
					var nodeName = pageNameList[pageLink[j]][iter];
					edges.push({from: currentNode, to: nodeName});
				}
				//console.log(pageNameList);
			}
			//console.log(finalChara);
		}

	}
	console.log(nodes[0]);
	console.log(edges[0]);
}
function cleanNodes(){
	nodes = [];
	edges = [];
}