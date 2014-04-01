function ReturnNode(tokenType, token) {	
	ExpressionNode.call(this, tokenType, token);
}

// Prototype based inheritance
ReturnNode.prototype = new ExpressionNode();
ReturnNode.prototype.constructor = ReturnNode;

ReturnNode.prototype.getReturnExpression = function() {
	return this.children[0];
}

ReturnNode.prototype.execute = function(memory, nodeStack, programRunner) {
	if (this.currentChild == 0) {
		this.currentChild++;
		if (this.getReturnExpression() != undefined) {
			nodeStack.push(this.getReturnExpression());
		}
	} else {
		this.currentChild = 0;
		var currentStackNode;
		while ((currentStackNode = nodeStack.peek()).type != "FUNCTION_NODE") {
			currentStackNode.currentChild = 0;
			nodeStack.pop();
		}
		var functionNode = nodeStack.peek();
		functionNode.returnExecuted = true;
		if (this.getReturnExpression() != undefined) {
			functionNode.setValue(this.getReturnExpression().getValue());
		}
	}
	return false;
}
