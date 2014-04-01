/**
 * class VariableTypeNode extends Node
 * @param dataType : the type of the variable (DataType instance)
 * @author michael
 */
function VariableTypeNode(tokenType, token, dataType) {	

	Node.call(this, tokenType, token);	
	
	this.dataType = dataType;
}

// prototype based inheritance
VariableTypeNode.prototype = new Node();
VariableTypeNode.prototype.constructor = VariableTypeNode;


// methods
VariableTypeNode.prototype.getDataType = function() {
	return this.dataType;
}

VariableTypeNode.prototype.execute = function(memory, nodeStack, programRunner) {
	var dataType = this.getDataType();
	
	//console.log("Executing variable type node", this);
	
	if (dataType.type == "STRUCTURE_DATA_TYPE") {
		var structureDeclarationNode = programRunner.findStructureDeclarationNode(dataType.getStructureName());
		dataType.setStructureDeclarationNode(structureDeclarationNode);
	}
	
	nodeStack.pop();
	return false;
}
