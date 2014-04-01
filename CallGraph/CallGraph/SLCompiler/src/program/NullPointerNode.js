function NullPointerNode(tokenType, token) {	
	ExpressionNode.call(this, tokenType, token);	
}

// prototype based inheritance
NullPointerNode.prototype = new ExpressionNode();
NullPointerNode.prototype.constructor = NullPointerNode;

NullPointerNode.prototype.execute = function(memory, nodeStack, programRunner) {
	this.setValue(NIL);
	nodeStack.pop();
	return false;
}
