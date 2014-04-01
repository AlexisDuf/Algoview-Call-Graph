//fonction permettant la création d'un NodeIterator
function NodeIterator(node){ 
	if(node===undefined || !(node instanceof AbstractNode)){
		throw new InvalidReferenceException();
	}else{
		this.neighbors = node.edges;
		this.currentIndex=0;
		this.neighborsProp = Object.keys(node.edges);

	}
}
//on fait hériter NodeIterator de AbstractNodeIterator
NodeIterator.prototype = new AbstractNodeIterator();
/** 
 * Returns true if the specified iterator has some nodes left, false otherwise
 *
 * @return true if the specified iterator has some nodes left, false otherwise
 */		
NodeIterator.prototype.hasNextNode = function() { // Check
	//on test si le noeud a des voisins
	if(this.neighborsProp.length <= 0 || this.currentIndex>=this.neighborsProp.length){
		return false;
	}else{
		//on recupere le nom du voisin désiré
		var NameValue = this.neighborsProp[this.currentIndex];
		return (this.neighbors[NameValue].destNode != undefined);
	}
}


/** 
 * Moves to the next node in the specified iterator and returns a reference on it
 *
 * @return a reference on the current node in the iteration
 */		
NodeIterator.prototype.getNextNode = function() {  // Check 
	//on recupere le nom du prochain voisin et on va dessus
	var NameValue = this.neighborsProp[this.currentIndex];
	var toReturn = this.neighbors[NameValue].destNode;
	// on incrémente le nombre de voisin visité
	this.currentIndex++;
	return toReturn;
}
