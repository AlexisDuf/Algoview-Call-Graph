/**
 * class EmptyStackException extends Exception: raised when the user tries to pop a variable in an empty stack
 * @author michael
 */
var EmptyStackException = function() {
	Exception.call(this);
}

// prototype based inheritance
EmptyStackException.prototype = new Exception();

EmptyStackException.prototype.toString = function() {
	return "Could not pop a variable: stack is empty.";
}
