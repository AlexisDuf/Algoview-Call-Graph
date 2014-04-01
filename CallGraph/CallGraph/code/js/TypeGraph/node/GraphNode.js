//fonction permettant de construire un Node
function GraphNode(id,value,name){	
	this.id=id;
	this.value=new NodeValue(value,name);
	this.edges=new Array();
	this.degree=0;
	//this.selected=0; // Permet de savoir si le noeud est actuellemnt sélectionné par l'utilisateur
}
//on fait hériter Node de AbstractNode
GraphNode.prototype = new AbstractNode();

/** 
 * Returns the id of the node
 *
 * @return the id of the node
 */		
// on retourne l'id du noeud 
GraphNode.prototype.getId = function() {   // Check
	return this.id;
}


/** 
 * Returns the degree of the node
 *
 * @return the degree of the node
 */	
 //on retourne le degré du noeud	
GraphNode.prototype.getDegree = function() { // Check 
	return this.degree;
}


/** 
 * Returns the value of the node
 *
 * @return the value of the node
 */		
 //on retourne la valeur du noeud
GraphNode.prototype.getValue = function() { // Check 
	return this.value;
}		// remarque : le nom getNodeValue a Ã©tÃ© simplifiÃ© en getValue car il n'y a pas plus de souci de conflit de nom dans le contexte objet


/** 
 * Updates the value of the node
 * @param value the new value for the node 
 */		
 //on modifie la valeur du noeud
GraphNode.prototype.setValue = function(value) { //Check 
	this.value=value;
	return this;
}		// remarque : le nom setNodeValue a Ã©tÃ© simplifiÃ© en setValue car il n'y a pas plus de souci de conflit de nom dans le contexte objet


/** 
 * Returns an iterator on the neighborhood of the node
 * @return an iterator on the neighborhood of the node (a reference on a AbstractNodeIterator instance)
 */		
 //on recupere un NodeIterator 
GraphNode.prototype.getNeighbors = function() { // Check
	return new NodeIterator(this);
}