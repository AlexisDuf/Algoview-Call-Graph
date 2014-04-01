var StructureElementNode = function(tokenType, token) {	
	AssignableNode.call(this, tokenType, token);	
}

// prototype based inheritance
StructureElementNode.prototype = new AssignableNode();
StructureElementNode.prototype.constructor = StructureElementNode;

StructureElementNode.prototype.getVariable = function() {
	return this.children[0];
}

StructureElementNode.prototype.getField = function() {
	return this.children[1];
}

StructureElementNode.prototype.execute = function(memory, nodeStack, programRunner) {
	if (this.currentChild == 0) {
		this.currentChild++;
		nodeStack.push(this.getVariable());
	} else {
		this.currentChild = 0;
		nodeStack.pop();

		var parent = this.getVariable();
		var structBaseAddress = parent.getAddress();
		var elementDataType = parent.getDataType();
		var structureDeclarationNode = elementDataType.getStructureDeclarationNode();
		var offset = structureDeclarationNode.getFieldOffset(this.getField().getName());

		this.setAddress(structBaseAddress + offset);
		this.setValue(memory.getValue(this.getAddress()));

	}
	return false;
}
