var ErrorInstructionException = function(message) {
	Exception.call(this);
	
	this.message = message;
}

// prototype based inheritance
ErrorInstructionException.prototype = new Exception();

ErrorInstructionException.prototype.toString = function() {
	return "Error instruction in Simple Language program: " + this.message;
}
