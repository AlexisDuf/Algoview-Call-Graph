function NumberNode(tokenType, token, value) {	
	ExpressionNode.call(this, tokenType, token);

	this.setValue(value);
}

// Prototype based inheritance
NumberNode.prototype = new ExpressionNode();
NumberNode.prototype.constructor = NumberNode;

NumberNode.prototype.execute = function(memory, nodeStack, programRunner) {
	nodeStack.pop();
	return false;
}

