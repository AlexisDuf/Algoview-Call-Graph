//fonction permettant de construire un Edge 
function Edge(destNode,weight){  
	if(!Tools.isNode(destNode)){
		throw new InvalidReferenceException(destNode,"destNode","Edge(destNode,weight)");
	}else{
		this.destNode=destNode;
		this.weight=weight;
	}
}
//on retourne le poids d'un arc entre 2 noeuds
Edge.prototype.getWeight = function(){ 
	return this.weight;
}

//on modifie la valeur du poids de l'arc entre 2 noeuds
Edge.prototype.setWeight = function(weight){ 
	this.weight = weight;
	return this;
}

// on recupere la destination d'un arc
Edge.prototype.getDestNode =function(){ 
	return this.destNode;
}
