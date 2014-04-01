function AssignStringNode(tokenType, token) {	
	Node.call(this, tokenType, token); 
}

// prototype based inheritance
AssignStringNode.prototype = new Node();
AssignStringNode.prototype.constructor = AssignStringNode;
