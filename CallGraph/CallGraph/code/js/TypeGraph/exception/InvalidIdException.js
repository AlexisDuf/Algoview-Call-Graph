function InvalidIdException(badId,typeException,functionName) {
	this.functionName=functionName
	this.typeException=typeException;
	this.badId =badId;
};

InvalidIdException.prototype = new GraphException();

InvalidIdException.prototype.print =function(){
	console.log('Une erreur est survenue dans la fonction "'+this.functionName+'" avec l\'id "'+this.badId+'".L\'erreur est du type :"'+this.typeException );
}

InvalidIdException.prototype.getfunctionName = function(){
	return this.functionName;
}

InvalidIdException.prototype.getTypeException=function(){
	return this.typeException;
}

InvalidIdException.prototype.getBadId=function(){
	return this.badId;
}