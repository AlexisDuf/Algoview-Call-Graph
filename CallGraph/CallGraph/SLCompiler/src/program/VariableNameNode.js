/**
 * class VariableNameNode extends Node
 * @param tokenType : the type of the token below
 * @param token : the associated token 
 * @param name : the structure name
 * @author michael
 */
 
function VariableNameNode(tokenType, token, name) {	

	AssignableNode.call(this, tokenType, token);	

	this.name = name;
}

// prototype based inheritance
VariableNameNode.prototype = new AssignableNode();
VariableNameNode.prototype.constructor = VariableNameNode;

// methods
VariableNameNode.prototype.getName = function() {
	return this.name;
}

VariableNameNode.prototype.setName = function(name) {
	this.name = name;
}

VariableNameNode.prototype.execute = function(memory, nodeStack, programRunner) {
	var variableName = this.getName();
	var variable = memory.getStack().findVariable(variableName);

	this.setAddress(variable.getAddress());
	this.setDataType(variable.getDataType());

	var value = variable.getValue();
	this.setValue(value);

	nodeStack.pop();

	return false;
}

