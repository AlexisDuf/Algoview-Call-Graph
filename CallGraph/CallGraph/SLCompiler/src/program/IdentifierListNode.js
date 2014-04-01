function IdentifierListNode(tokenType, token) {	
	Node.call(this, tokenType, token); 
}

// prototype based inheritance
IdentifierListNode.prototype = new Node();
IdentifierListNode.prototype.constructor = IdentifierListNode;
