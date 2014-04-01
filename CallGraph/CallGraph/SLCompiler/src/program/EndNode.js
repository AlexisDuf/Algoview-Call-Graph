function EndNode(tokenType, token) {	
	Node.call(this, tokenType, token); 
}

// prototype based inheritance
EndNode.prototype = new Node();
EndNode.prototype.constructor = EndNode;

EndNode.prototype.execute = function(memory, nodeStack, programRunner) {
	nodeStack.pop();
	return false;
}
