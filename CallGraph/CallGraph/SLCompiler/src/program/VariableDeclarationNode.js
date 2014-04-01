/**
 * class VariableDeclarationNode extends Node
 * @param tokenType : the type of the token below
 * @param token : the associated token
 * @author michael
 */
function VariableDeclarationNode(tokenType, token){

	Node.call(this, tokenType, token);
}

// prototype based inheritance
VariableDeclarationNode.prototype = new Node();
VariableDeclarationNode.prototype.constructor = VariableDeclarationNode;

// static variables
VariableDeclarationNode.VARIABLE_NAME_CHILD_INDEX = 0;
VariableDeclarationNode.VARIABLE_TYPE_CHILD_INDEX = 1;

// methods
VariableDeclarationNode.prototype.getVariableType = function() {
	
	var variableTypeNode = this.getChild(VariableDeclarationNode.VARIABLE_TYPE_CHILD_INDEX);
	
	if( variableTypeNode == undefined){
		throw new Error("[VariableDeclarationNode.getVariableType()] Cannot determine the variable type : no VariableTypeNode attached.");	// -> Exception to be defined 
	}
	
	return variableTypeNode.getDataType();
}

VariableDeclarationNode.prototype.getVariableName = function() {
	
	var variableNameNode = this.getChild(VariableDeclarationNode.VARIABLE_NAME_CHILD_INDEX);
	
	if( variableNameNode == undefined){
		throw new Error("[VariableDeclarationNode.getVariableName()] Cannot provide the variable name : no VariableNameNode attached.");	// -> Exception to be defined 
	}
		
	return variableNameNode.getName();
}

