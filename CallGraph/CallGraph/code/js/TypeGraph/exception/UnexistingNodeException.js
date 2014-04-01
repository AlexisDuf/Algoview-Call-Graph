function UnexistingNodeException(badArgument,badArgumentName,functionName){
	this.badArgument=badArgument;
	this.badArgumentName=badArgumentName;
	this.functionName=functionName;
};

UnexistingNodeException.prototype = new GraphException();

UnexistingNodeException.prototype.print = function(){
	console.log('Une erreur est survenue dans la fonction: "'+this.functionName+'", l\'argument "'+this.badArgumentName+'" est bien de type "node" mais il n\'existe pas dans le graph');
	console.log("Le noeud en question est : ");
	console.log(this.badArgument);
}

UnexistingNodeException.prototype.getFunctionName = function(){
	return this.functionName;
}

UnexistingNodeException.prototype.getBadArgumentName = function(){
	return this.badArgumentName;
}

UnexistingNodeException.prototype.getBadArgument = function(){
	return this.badArgument;
}