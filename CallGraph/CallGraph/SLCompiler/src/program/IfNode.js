function IfNode(tokenType, token) {	
	Node.call(this, tokenType, token);
}

// Prototype based inheritance
IfNode.prototype = new Node();
IfNode.prototype.constructor = IfNode;

IfNode.prototype.getCondition = function() {
		return this.children[0];
}

IfNode.prototype.getThenInstructions = function() {
		return this.children[1];
}

IfNode.prototype.getElseInstructions = function() {
		return this.children[2];
}

IfNode.prototype.execute = function(memory, nodeStack, programRunner) {
	if (this.currentChild == 0) {
		this.currentChild++;
		nodeStack.push(this.getCondition());
	} else if (this.currentChild == 1) {
		this.currentChild++;
	
		var testValue = this.getCondition().getValue();
		// TODO: Vérifier si la conversion s'est bien passée
		var testValueAsBoolean = testValue.convertTo(MemoryValue.BOOLEAN).getPrimitiveValue();
		// console.log("Test value", testValue);
		if (testValueAsBoolean) {
			nodeStack.push(this.getThenInstructions());
		} else {
			nodeStack.push(this.getElseInstructions());
		}
	} else {
		this.currentChild = 0;
		nodeStack.pop();
	}
	
	return false;
}
