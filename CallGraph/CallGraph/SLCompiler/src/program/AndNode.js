function AndNode(tokenType, token) {	
	ExpressionNode.call(this, tokenType, token);
}

// Prototype based inheritance
AndNode.prototype = new ExpressionNode();
AndNode.prototype.constructor = AndNode;

AndNode.prototype.getLeftOperand = function() {
	return this.children[0];
}

AndNode.prototype.getRightOperand = function() {
	return this.children[1];
}

AndNode.prototype.execute = function(memory, nodeStack, programRunner) {
	if (this.currentChild == 0) {
		nodeStack.push(this.getLeftOperand());
		this.currentChild++;
	} else if (this.currentChild == 1) {
		var leftOperandMemoryValue = this.getLeftOperand().getValue();
		var leftOperandMemoryValueAsBoolean = leftOperandMemoryValue.convertTo(MemoryValue.BOOLEAN);
		
		if (leftOperandMemoryValueAsBoolean == undefined) {
			throw new CannotConvertTo(MemoryValue.BOOLEAN);
		}
		
		if (leftOperandMemoryValueAsBoolean.getPrimitiveValue() == false) {
                // No need to continue with the right operand
			this.currentChild = 0;			
			nodeStack.pop();
			this.setValue(new BooleanMemoryValue(false));
		} else {
			nodeStack.push(this.getRightOperand());
			this.currentChild++;
		}
	} else {
		this.currentChild = 0;
		nodeStack.pop();
		
		var rightOperandMemoryValue = this.getRightOperand().getValue();
		var rightOperandMemoryValueAsBoolean = rightOperandMemoryValue.convertTo(MemoryValue.BOOLEAN);
		
		if (rightOperandMemoryValueAsBoolean == undefined) {
			throw new CannotConvertTo(MemoryValue.BOOLEAN);
		}

		var finalValue = rightOperandMemoryValueAsBoolean.getPrimitiveValue();
		this.setValue(new BooleanMemoryValue(finalValue));
	}
	
	return false;
}
