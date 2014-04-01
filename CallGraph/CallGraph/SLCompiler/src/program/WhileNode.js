var WhileNode = function(tokenType, token) {	
	Node.call(this, tokenType, token);
	
	this.clonedCondition;
	this.clonedInstructions;
}

// Prototype based inheritance
WhileNode.prototype = new Node();

WhileNode.prototype.getCondition = function() {
	return this.children[0];
}

WhileNode.prototype.cloneCondition = function() {
	this.clonedCondition = this.getCondition().clone();
}

WhileNode.prototype.getInstructions = function() {
	return this.children[1];
}

WhileNode.prototype.cloneInstructions = function() {
	this.clonedInstructions = this.getInstructions().clone();
}

WhileNode.prototype.execute = function(memory, nodeStack, programRunner) {
	if ((this.currentChild == 0) || (this.currentChild == 2)) {
		this.cloneCondition();
		nodeStack.push(this.clonedCondition);
		
		if (this.currentChild == 0) {
			this.currentChild++;
			return false;
        } else {
			this.currentChild--;
			return true;
		}
	} else if (this.currentChild == 1) {
		this.currentChild++;
	
		var testMemoryValue = this.clonedCondition.getValue();
		var testMemoryValueAsBoolean = testMemoryValue.convertTo(MemoryValue.BOOLEAN);
		
		if (testMemoryValueAsBoolean == undefined) {
			throw new CannotConvertTo(MemoryValue.BOOLEAN);
		}
		
		var testValueAsBoolean = testMemoryValueAsBoolean.getPrimitiveValue();
		//console.log("Test value", testValueAsBoolean);
		if (testValueAsBoolean) {
			this.cloneInstructions();
			nodeStack.push(this.clonedInstructions);
		} else {
			nodeStack.pop();
		}
	}
	
	return false;
}
