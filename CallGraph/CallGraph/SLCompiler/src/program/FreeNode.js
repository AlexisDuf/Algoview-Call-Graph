function FreeNode(tokenType, token) {	
	Node.call(this, tokenType, token);	
}

// prototype based inheritance
FreeNode.prototype = new Node();
FreeNode.prototype.constructor = FreeNode;

FreeNode.prototype.getExpression = function() {
	return this.children[0];
}

FreeNode.prototype.execute = function(memory, nodeStack, programRunner) {
	if (this.currentChild == 0) {
		this.currentChild++;
		nodeStack.push(this.getExpression());
	} else {
		this.currentChild = 0;
		nodeStack.pop();

		var expressionValue = this.getExpression();
		console.log(expressionValue);
		
		// TODO: Vérifier que expressionValue.memoryValue est bien un PointerMemoryValue

		memory.free(expressionValue.getValue());
	}
	return false;
}
