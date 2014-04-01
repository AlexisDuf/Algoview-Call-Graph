function TestNode(tokenType, token) {	
	ExpressionNode.call(this, tokenType, token);
	
	this.operator;
}

// Prototype based inheritance
TestNode.prototype = new ExpressionNode();
TestNode.prototype.constructor = TestNode;

TestNode.prototype.setOperator = function(operator) {
		this.operator = operator;
}

TestNode.prototype.execute = function(memory, nodeStack, programRunner) {
	if (this.currentChild == 0) {
		nodeStack.push(this.children[0]);
		this.currentChild++;
	} else if (this.currentChild == 1) {
		nodeStack.push(this.children[1]);
		this.currentChild++;
	} else {
		this.currentChild = 0;
		
		// TODO: Faire les conversions?
		
		var value1;
		var value2;
		var convertedValue1;
		var convertedValue2;
		var resultValue;
		
		value1 = this.children[0].getValue();
		value2 = this.children[1].getValue();
		
		convertedValue1 = value1;
		convertedValue2 = value2;
				
		resultValue = convertedValue1.applyTest(this.operator, convertedValue2);
		
		// TODO: Convertir le résultat en booléen ? -> Non, ça doit être fait dans applyTest
		
		this.setValue(resultValue);
		nodeStack.pop();
	}
	
	return false;
}
