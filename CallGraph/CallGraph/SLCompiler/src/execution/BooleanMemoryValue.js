/**
 * class BooleanMemoryValue extends MemoryValue
 * @param value : the value to store in the superclass field "value"
 * @author Michaël, Cédric
 **/
 
var BooleanMemoryValue = function(value) {

	var typeOfValue = (typeof value);
	var expectedType = "boolean";
	
	if (value != undefined && typeOfValue != expectedType) {
		JSUtils.throwException("IllegalArgumentException"); // "Expected " + expectedType + ", found " + typeOfValue);
	}

	if (value != undefined) {
		MemoryValue.call(this, value, MemoryState.HAS_VALUE);
	} else {
		MemoryValue.call(this, undefined, MemoryState.UNDEFINED);
	}
	
	this.type = MemoryValue.BOOLEAN;
}

// Prototype based inheritance
BooleanMemoryValue.prototype = new MemoryValue();

BooleanMemoryValue.prototype.applyArithmeticOperator = function(operator, secondOperand) {
	JSUtils.throwException("CannotApplyArithmeticOperatorException", operator);
}

BooleanMemoryValue.prototype.applyTest = function(operator, secondOperand) {
	var expressionValue = 0;
	
	var val1 = this.value;
    var val2 = secondOperand.convertTo(MemoryValue.BOOLEAN).value;
	
	switch (operator) {
		case "EQ":
			expressionValue = (val1 == val2);
			break;
		case "NEQ":
			expressionValue = (val1 != val2);
			break;
		case "LT":
			JSUtils.throwException("CannotApplyTestOperatorException", "<");
			break;
		case "LTE":
			JSUtils.throwException("CannotApplyTestOperatorException", "<=");
			break;
		case "GT":
			JSUtils.throwException("CannotApplyTestOperatorException", ">");
			break;
		case "GTE":
			JSUtils.throwException("CannotApplyTestOperatorException", ">=");
			break;
	}
	return new BooleanMemoryValue(expressionValue);
}

BooleanMemoryValue.prototype.convertTo = function(type) {
	switch (type) {
		case MemoryValue.BOOLEAN:
			return this;
			break;
		case MemoryValue.INTEGER:
			if (this.value) {
				return new IntegerMemoryValue(1);
			} else {
				return new IntegerMemoryValue(0);
            }
            break;
        case MemoryValue.CHARACTER:
			break;
		case MemoryValue.FLOAT:
			break;
		case MemoryValue.POINTER:
			break;
	}
}

// @Override
BooleanMemoryValue.prototype.getStringValue = function() { 	
	return this.getPrimitiveValue().toString();	// boolean -> string conversion
} 

// @Override
BooleanMemoryValue.prototype.clone = function() { 	
	return new BooleanMemoryValue(this.value, this.state);
} 



