function ErrorNode(tokenType, token) {	
	Node.call(this, tokenType, token);
}

// Prototype based inheritance
ErrorNode.prototype = new Node();
ErrorNode.prototype.constructor = ErrorNode;

ErrorNode.prototype.getMessage = function() {
	return this.children[0];
}

ErrorNode.prototype.execute = function(memory, nodeStack, programRunner) {
	var message = this.getMessage();
	
	console.log(message.getText());
	JSUtils.throwException("ErrorInstructionException", message.getText());
	
	return false;
}
