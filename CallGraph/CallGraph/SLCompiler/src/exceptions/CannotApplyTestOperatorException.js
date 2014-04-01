/**
 * class CannotApplyTestOperatorException extends Exception: raised when the user tries to pop a variable in an empty stack
 * @author Cédric
 */
var CannotApplyTestOperatorException = function(testOperator, operand1, operand2) {
	Exception.call(this);
	
	this.testOperator = testOperator;
	this.operand1 = operand1;
	this.operand2 = operand2;
}

// prototype based inheritance
CannotApplyTestOperatorException.prototype = new Exception();

CannotApplyTestOperatorException.prototype.toString = function() {
	return "Cannot apply test operator '" + this.testOperator + "."; //"' to " + this.operand1 + " and " + this.operand2 + ".";
}
