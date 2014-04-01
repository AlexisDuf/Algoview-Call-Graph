function InvalidReferenceException(badArgument,badArgumentName,functionName){
	this.badArgument=badArgument;
	this.badArgumentName=badArgumentName;
	this.functionName=functionName;
};

InvalidReferenceException.prototype = new GraphException();

InvalidReferenceException.prototype.print = function(){
	console.log('Une erreur est survenue dans la fonction: "'+this.functionName+'". L\'argument: "'+this.badArgumentName+'" n\'est pas valide (type incorrect, undefined...)' );
	console.log("L'argument à ce moment avait pour valeur :");
	console.log(this.badArgument);
}

InvalidReferenceException.prototype.getFunctionName = function(){
	return this.functionName;
}

InvalidReferenceException.prototype.getBadArgument = function(){
	return this.badArgument;
}

InvalidReferenceException.prototype.getBadArgumentName = function(){
	return this.badArgumentName;
}