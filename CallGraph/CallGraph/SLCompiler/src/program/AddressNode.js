function AddressNode(tokenType, token) {	
	ExpressionNode.call(this, tokenType, token);
}

// Prototype based inheritance
AddressNode.prototype = new ExpressionNode();
AddressNode.prototype.constructor = AddressNode;

AddressNode.prototype.getVariable = function() {
	return this.children[0];
}

AddressNode.prototype.execute = function(memory, nodeStack, programRunner) {
	if (this.currentChild == 0) {
		this.currentChild++;
		nodeStack.push(this.getVariable());
	} else {
		this.currentChild = 0;
		nodeStack.pop();
		this.setValue(new PointerMemoryValue(this.getVariable().getAddress()));
	}
	return false;
}
