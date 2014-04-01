/**
 * class IllegalArgumentException : raised when an illegal argument is provided as parameter of a function
 * @param argument : the illegal argument 
 * @author michael
 */
var IllegalArgumentException = function(argument) {
	Exception.call(this);
	
	this.argument = argument;
}

// prototype based inheritance
IllegalArgumentException.prototype = new Exception();

IllegalArgumentException.prototype.toString = function() {
	return "Illegal argument: " + this.argument;
}

