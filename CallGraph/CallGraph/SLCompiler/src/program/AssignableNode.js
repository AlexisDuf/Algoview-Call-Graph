function AssignableNode(tokenType, token) {	
	ExpressionNode.call(this, tokenType, token); 

	this.address;
	this.dataType;
}

// prototype based inheritance
AssignableNode.prototype = new ExpressionNode();
AssignableNode.prototype.constructor = AssignableNode;

AssignableNode.prototype.getAddress = function() {
	return this.address;
}

AssignableNode.prototype.setAddress = function(address) {
	this.address = address;
}

AssignableNode.prototype.getDataType = function() {
	return this.dataType;
}

AssignableNode.prototype.setDataType = function(dataType) {
	this.dataType = dataType;
}

