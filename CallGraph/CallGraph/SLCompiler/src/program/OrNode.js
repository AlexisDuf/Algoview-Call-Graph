function OrNode(tokenType, token) {	
	ExpressionNode.call(this, tokenType, token);
}

// Prototype based inheritance
OrNode.prototype = new ExpressionNode();
OrNode.prototype.constructor = OrNode;

OrNode.prototype.getLeftOperand = function() {
	return this.children[0];
}

OrNode.prototype.getRightOperand = function() {
	return this.children[1];
}

OrNode.prototype.execute = function(memory, nodeStack, programRunner) {
	if (this.currentChild == 0) {
		nodeStack.push(this.getLeftOperand());
		this.currentChild++;
	} else if (this.currentChild == 1) {
		var leftOperandMemoryValue = this.getLeftOperand().getValue();
		var leftOperandMemoryValueAsBoolean = leftOperandMemoryValue.convertTo(MemoryValue.BOOLEAN);
		
		if (leftOperandMemoryValueAsBoolean == undefined) {
			throw new CannotConvertTo(MemoryValue.BOOLEAN);
		}
		
		if (leftOperandMemoryValueAsBoolean.getPrimitiveValue() == true) {
                // No need to continue with the right operand
			this.currentChild = 0;			
			nodeStack.pop();
			this.setValue(new BooleanMemoryValue(true));
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
