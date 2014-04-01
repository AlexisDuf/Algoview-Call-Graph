/**
 * class Exception
 * @author michael
 */
var Exception = function() {
}

Exception.prototype.toString = function() {
	return "Exception";
}

Error.prototype.getWrappedException = function(){
	return this.wrappedException;
}
