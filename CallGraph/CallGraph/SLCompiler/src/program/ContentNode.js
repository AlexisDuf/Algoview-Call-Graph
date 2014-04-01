function ContentNode(tokenType, token) {	
	AssignableNode.call(this, tokenType, token);
}

// Prototype based inheritance
ContentNode.prototype = new AssignableNode();
ContentNode.prototype.constructor = ContentNode;

ContentNode.prototype.getVariable = function() {
	return this.children[0];
}

ContentNode.prototype.execute = function(memory, nodeStack, programRunner) {
	if (this.currentChild == 0) {
		this.currentChild++;
		nodeStack.push(this.getVariable());
	} else {
		this.currentChild = 0;
		nodeStack.pop();
		
		var memoryValue = this.getVariable().getValue();
		var address = memoryValue.getPrimitiveValue();
		this.setValue(memory.getValue(address));
		this.setAddress(address);
	}
	return false;
}
