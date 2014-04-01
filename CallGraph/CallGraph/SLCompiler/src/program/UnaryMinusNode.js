function UnaryMinusNode(tokenType, token) {	
	ExpressionNode.call(this, tokenType, token);
}

// Prototype based inheritance
UnaryMinusNode.prototype = new ExpressionNode();
UnaryMinusNode.prototype.constructor = UnaryMinusNode;

UnaryMinusNode.prototype.getExpression = function() {
	return this.children[0];
}

UnaryMinusNode.prototype.execute = function(memory, nodeStack, programRunner) {
	if (this.currentChild == 0) {
		nodeStack.push(this.getExpression());
		this.currentChild++;
	} else {
		this.currentChild = 0;
		nodeStack.pop();
		
		// TODO: Check expression type
		
		this.setValue(this.getExpression().getValue().opposite());
	}
	
	return false;
}
