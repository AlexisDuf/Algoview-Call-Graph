function AlreadyExistingNodeException(badArgument,badArgumentName,functionName,id) {
	this.badArgument=badArgument;
	this.badArgumentName=badArgumentName;
	this.functionName=functionName;
	this.badId=id;
};

AlreadyExistingNodeException.prototype = new GraphException();

AlreadyExistingNodeException.prototype.print = function(){
	console.log('La fonction: "'+this.functionName+'" a rencontré une erreur.Le noeud d\'id: "'+this.badId+'" éxiste déjà dans le graph');
	console.log('L\'erreur est survenue avec l\'argument :"'+this.badArgumentName+'" qui était: ');
	console.log(this.badArgument);
}

AlreadyExistingNodeException.prototype.getBadArgument = function(){
	return badArgument;
}

AlreadyExistingNodeException.prototype.getFunctionName = function(){
	return this.functionName;
}

AlreadyExistingNodeException.prototype.getBadArgumentName = function(){
	return this.badArgumentName;
}

AlreadyExistingNodeException.prototype.getBadId = function(){
	return this.badId;
}
