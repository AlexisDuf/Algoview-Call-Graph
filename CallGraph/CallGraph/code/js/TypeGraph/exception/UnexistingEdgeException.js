function UnexistingEdgeException(sourceNode,destNode,functionName){
	this.sourceNode = sourceNode;
	this.destNode = destNode;
	this.functionName=functionName;
};

UnexistingEdgeException.prototype = new GraphException();

UnexistingEdgeException.prototype.print = function(){
	console.log('Une erreur est survenue dans la fonction: "'+this.functionName+'" L\'arc entre le noeud source :');
	console.log(this.sourceNode);
	console.log("et le noeud destination: ");
	console.log(this.destNode);
	console.log("n'éxiste pas");
}

UnexistingEdgeException.prototype.getSourceNode = function(){
	return this.sourceNode;
}

UnexistingEdgeException.prototype.getDestNode = function(){
	return this.destNode;
}

UnexistingEdgeException.prototype.getFunctionName = function(){
	return this.functionName;
}