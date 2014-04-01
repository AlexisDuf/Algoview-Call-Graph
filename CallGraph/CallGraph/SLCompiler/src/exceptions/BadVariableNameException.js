/**
 * class BadVariableNameException : raised when the user tries to access to an invalid address
 * @param variableName : the invalid variable name
 * @author michael
 */

var BadVariableNameException = function(variableName) {
	Exception.call(this);
	
	this.variableName = variableName;
}

// prototype based inheritance
BadVariableNameException.prototype = new Exception();

BadVariableNameException.prototype.toString = function() {
	return "Unable to find the variable named '" + this.variableName + "'";
}
