function StructureElementNameNode(tokenType, token, name) {	
	AssignableNode.call(this, tokenType, token);	
	this.name = name;
}

// prototype based inheritance
StructureElementNameNode.prototype = new AssignableNode();
StructureElementNameNode.prototype.constructor = StructureElementNameNode;

StructureElementNameNode.prototype.getName = function() {
	return this.name;
}
