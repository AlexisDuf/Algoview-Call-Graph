var CompilationError = function(errors) {
	Exception.call(this);
	
	this.errors = errors;
}

// prototype based inheritance
CompilationError.prototype = new Exception();

CompilationError.prototype.toString = function() {
	
	var errorsString = "";
	
	for(var i=0; i<this.errors.length; i++){
		errorsString += this.errors[i];
		errorsString += "\n";
	}
	
	return errorsString;
}
