function AlreadyExistingEdgeException(sourceNode,destNode,functionName){
	this.sourceNode=sourceNode;
	this.destNode=destNode;
	this.functionName=functionName;
};

AlreadyExistingEdgeException.prototype = new GraphException();

AlreadyExistingEdgeException.prototype.print = function(){
	console.log('Une erreur est survenue dans la fonction: "'+this.functionName+'".L\'arc entre le noeud source:');
	console.log(this.sourceNode);
	console.log("et le noeud destination: ");
	console.log(this.destNode);
	console.log("éxiste déjà");

}

AlreadyExistingEdgeException.prototype.getFunctionName = function(){
	return this.functionName;
}

AlreadyExistingEdgeException.prototype.getSourceNode = function(){
	return this.sourceNode;
}

AlreadyExistingEdgeException.prototype.getDestNode = function(){
	return this.destNode;
}
