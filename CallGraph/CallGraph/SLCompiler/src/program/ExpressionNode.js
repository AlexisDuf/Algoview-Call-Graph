function ExpressionNode(tokenType, token) {	
	Node.call(this, tokenType, token); 

	this.memoryValue;
}

// Prototype based inheritance
ExpressionNode.prototype = new Node();
ExpressionNode.prototype.constructor = ExpressionNode;

ExpressionNode.prototype.getValue = function() {
	return this.memoryValue;
}

ExpressionNode.prototype.setValue = function(memoryValue) {
	this.memoryValue = memoryValue;
}

ExpressionNode.prototype.containsFunctionCall = function() {
	for (var i in this.children) {
		var currentChild = this.children[i];
		
		if (currentChild.type == "FUNCTION_CALL") {
			return true;
		}

		if ((typeof currentChild.containsFunctionCall) == "function") {
			if (currentChild.containsFunctionCall()) {
				return true;
			}
		}
	}
	return false;
}
