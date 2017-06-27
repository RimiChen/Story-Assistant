function story(name, path) {
	this.name = name;
	this.path = path;
	this.json = path.replace(".txt", ".json");
	this.length = -1;
	this.character_list = [];
	this.location_list = [];
	this.story_point_max = -1;
}