/** Class representing a Tree. */
class Tree {
  /**
   * Creates a Tree Object
   * Populates a single attribute that contains a list (array) of Node objects to be used by the other functions in this class
   * @param {json[]} json - array of json objects with name and parent fields
   */
   //let permanent_pos=0;
   //permanent_pos=new int;
   permanent_pos=0;
   constructor(json) {
	//console.log("asdfasf",json);
	this.nodes = new Array();
	this.nodes = json.map(N => new Node(N.name,N.parent));
	
	//let permanent_pos=0;
	console.log(this.nodes);

	this.nodes.forEach(element => element.parentNode = this.nodes.find(element2 => element.parentName === element2.name));
	console.log(this.nodes);
  } 

  //let permanent_pos=0;
  /**
   * Assign other required attributes for the nodes.
   */
  buildTree () {
    // note: in this function you will assign positions and levels by making calls to assignPosition() and assignLevel()
	
	//this.nodes.forEach(node => node.children.push(this.nodes.find(child => child.parentName === node.name))); 
	//console.log(this.nodes);
	
	for(let i=0;i<this.nodes.length;i++){
		for(let j=i+1; j<this.nodes.length;j++){
			if(this.nodes[i].name === this.nodes[j].parentName){
				this.nodes[i].children.push(this.nodes[j]);
			}
		}
	}

	console.log(this.nodes);


	this.assignLevel(this.nodes[0],0);
	this.assignPosition(this.nodes[0],this.permanent_pos);
	console.log(this.nodes);
	//let new_level = 0; 
	//let parent_name;

 
  }

  /**
   * Recursive function that assign levels to each node
   */
  assignLevel (node, level) {
	//console.log(node);
	//node.level = level;
	
	node.level = level;
	console.log(node.name,node.level);
	if(node.children.length !== 0){
		//console.log("children");
		
		//this.assignLevel(node.children[0],level+1);
		
		for(let childs=0; childs < node.children.length; childs++){
			this.assignLevel(node.children[childs],level+1);
		}
		//console.log("children null");
		//return node;
	}
	//this.assignLevel(node.children[0],level+1);
	return node;

  }


  /**
   * Recursive function that assign positions to each node
   */
  assignPosition (node, position) {
	//node.position = position;
	
	//let pos = position;
	node.position = position;
	if(node.children.length !== 0){
		for(let child=0; child < node.children.length; child++){
			if(child > 0){
				this.permanent_pos += 1;
				//console.log("if child > 0 ",node.children[child].name,this.permanent_pos);
			}
			this.assignPosition(node.children[child],this.permanent_pos);
		}
	}
	return node;

  }

  /**
   * Function that renders the tree
   */
  renderTree () {
	let width =1200;
	let height = 1200;

	let svg = d3.select("body")
	  .append("svg")
	  .attr("width",width)
	  .attr("height",height);
	  
	let lines = svg.selectAll("line")
		  .data(this.nodes.filter((d,i) => (i!==0) ? d : null));
	lines.join("line")
		.attr("x1", (d,i) => (d.parentNode.level * 200) + 100)
          	.attr("y1", (d,i) => (d.parentNode.position * 150) + 50)
          	.attr("x2", (d,i) => (d.level*200)+100)
          	.attr("y2", (d,i) => (d.position*150)+50);
	
	
	let elem = svg.selectAll("g")
	  		.data(this.nodes);
	
	let elemEnter = elem.enter()
	  			.append("g")
	  			.attr("class","nodeGroup")
                		.attr("transform", function(d,i){
                        		return "translate("+((d.level*200)+100)+","+((d.position*150)+50)+")";
				});
	
	let circles = elemEnter.append("circle")
	  			.attr("r",50)
	elemEnter.append("text")
                     .attr("class","label")
                     .text(d => d.name.toUpperCase());
/*	
/// tests
	let elem = svg.selectAll("g")
                        .data(this.nodes);
			.join("g")

	elem.append("circle")
                 .attr("r",50)
	elem.append()	
*/

	//svg.data(this.nodes.filter(function(d,n){
	//  console.log(d.name,n);
	//}));
	//
	//let c = svg.data(this.nodes.filter((d,i) => i!==0 ? console.log("c: ",d,i):null));	
	
	
/* previously tried using for loop which worked*/	/*
	for(let i=1; i<this.nodes.length;i++){
                let x2 = (this.nodes[i].level*200)+100;
                let y2 = (this.nodes[i].position*150)+50;
                let x1 = (this.nodes[i].parentNode.level * 200) + 100;
                let y1 = (this.nodes[i].parentNode.position * 150) + 50;

                svg.append("line")
                 .attr("x1",x1)
                 .attr("y1",y1)
                 .attr("x2",x2)
                 .attr("y2",y2);

        }

	for(let i=0; i<this.nodes.length;i++){
		let cx = (this.nodes[i].level*200)+100;
		let cy = (this.nodes[i].position*150)+50;
		//console.log(cx,cy);

		let g = svg.append("g")
        	  .attr("class","nodeGroup")
        	  .attr("transform", function(d,i){
        	          return "translate("+cx+","+cy+")";
        	  });
        	g.append("circle")
        	  .attr("r",50);
        	g.append("text")
        	  .attr("class","label")
        	  .text(this.nodes[i].name.toUpperCase());


	}
*/

  }

}
