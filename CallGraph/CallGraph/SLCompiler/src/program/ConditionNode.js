function ConditionNode(tokenType, token) {	
	ExpressionNode.call(this, tokenType, token);
}

// Prototype based inheritance
ConditionNode.prototype = new ExpressionNode();
ConditionNode.prototype.constructor = ConditionNode;

ConditionNode.prototype.getExpression = function() {
	return this.children[0];
}

ConditionNode.prototype.execute = function(memory, nodeStack, programRunner) {
	if (this.currentChild == 0) {
		this.currentChild++;
		nodeStack.push(this.getExpression());
	} else {
		this.currentChild = 0;
		nodeStack.pop();
		
		this.setValue(this.getExpression().getValue());
	}

	return false;
}
