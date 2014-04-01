function PointerDereferenceNode(tokenType, token) {	
	AssignableNode.call(this, tokenType, token);	
}

// prototype based inheritance
PointerDereferenceNode.prototype = new AssignableNode();
PointerDereferenceNode.prototype.constructor = PointerDereferenceNode;

PointerDereferenceNode.prototype.getVariable = function() {
	return this.children[0];
}

PointerDereferenceNode.prototype.getField = function() {
	return this.children[1];
}

PointerDereferenceNode.prototype.execute = function(memory, nodeStack, programRunner) {
	if (this.currentChild == 0) {
		this.currentChild++;
		nodeStack.push(this.getVariable());
	} else {
		this.currentChild = 0;
		nodeStack.pop();

		var parent = this.getVariable();
		var structBaseAddress = parent.getValue();
		var structureMemoryUnit = memory.getUnit(structBaseAddress);
		var elementDataType = structureMemoryUnit.getDataType();
		var structureDeclarationNode = elementDataType.getStructureDeclarationNode();
		var offset = structureDeclarationNode.getFieldOffset(this.getField().getName());

		this.setAddress(structBaseAddress + offset);
		this.setValue(memory.getValue(this.getAddress()));

		// TODO: A revoir car cela ne compile pas
		//this.setDataType(structureDeclarationNode.getFieldByName(this.getField().getName()).getVariableType().getDataType());
	}
	return false;
}
