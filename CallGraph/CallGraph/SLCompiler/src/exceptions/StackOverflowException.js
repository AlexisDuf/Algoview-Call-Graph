/**
 * class StackOverflowException extends Exception: raised when the user tries to pop a variable in a full stack
 * @author michael
 */
var StackOverflowException = function() {
	Exception.call(this);
}

// prototype based inheritance
StackOverflowException.prototype = new Exception();

StackOverflowException.prototype.toString = function() {
	return "Stack overflow. Could not allocate new variables.";
}
