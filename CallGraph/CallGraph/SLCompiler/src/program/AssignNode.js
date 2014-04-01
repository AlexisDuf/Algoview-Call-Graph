function AssignNode(tokenType, token) {	
	ExpressionNode.call(this, tokenType, token);
}

// Prototype based inheritance
AssignNode.prototype = new ExpressionNode();
AssignNode.prototype.constructor = AssignNode;

AssignNode.prototype.getVariable = function() {
	return this.children[0];
}

AssignNode.prototype.getExpression = function() {
	return this.children[1];
}

AssignNode.prototype.execute = function(memory, nodeStack, programRunner) {
	if (this.currentChild == 0) {
		this.currentChild++;
		nodeStack.push(this.getExpression());
	} else if (this.currentChild == 1) {
		this.currentChild++;
		nodeStack.push(this.getVariable());
	} else if (this.currentChild == 2) {
		this.currentChild++;
		if (this.getExpression().containsFunctionCall()) {
			// console.log("AssignNode contains function call.");
			return true;
		} else {
			// console.log("AssignNode does not contain function call.");
			return false;
		}
	} else {
		this.currentChild = 0;
		
		var expressionMemoryValue = this.getExpression().getValue();
		
		var expressionDataType = this.getExpression().dataType;
		// console.log(expressionDataType, expressionMemoryValue);
		if (expressionDataType instanceof ArrayDataType) {
			expressionMemoryValue = new PointerMemoryValue(this.getExpression().getAddress());
		}
		
		var resultType = this.getVariable().memoryValue.type;
		
		var expressionMemoryValueAsResultType = expressionMemoryValue.convertTo(resultType);
		if (expressionMemoryValueAsResultType == undefined) {
			throw new CannotConvertTo(resultType);
		}

		memory.setValue(this.getVariable().getAddress(), expressionMemoryValueAsResultType);
		this.setValue(expressionMemoryValueAsResultType);
		nodeStack.pop();
	}
	return false;
}
