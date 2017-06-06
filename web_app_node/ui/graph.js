//{id: 0, label: "0", group: 'source'},
var nodes = [];
//{from: 1, to: 0},
var edges = [];

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
function drawGraph_v2(){
	console.log("Test vis network");
cytoscape({
  container: document.getElementById('location_graph'),

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


			for(i = 1 ; i <= tabNumber; i++){
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
			//console.log(finalChara);
		}

	}
	console.log(nodes[0]);
	console.log(edges[0]);
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


			for(i = 1 ; i <= tabNumber; i++){
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