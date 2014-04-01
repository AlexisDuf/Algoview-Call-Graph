/**
 * class StructureDeclarationNode extends Node
 * @author michael
 */
function StructureDeclarationNode(tokenType, token){

	Node.call(this, tokenType, token);
}

// prototype based inheritance
StructureDeclarationNode.prototype = new Node();
StructureDeclarationNode.prototype.constructor = StructureDeclarationNode;

// static variables
StructureDeclarationNode.STRUCTURE_NAME_CHILD_INDEX = 0;
StructureDeclarationNode.STRUCTURE_ELEMENT_DECLARATION_LIST_CHILD_INDEX = 1;

// methods
StructureDeclarationNode.prototype.getStructureName = function(){
	
	var structureNameNode = this.getChild(StructureDeclarationNode.STRUCTURE_NAME_CHILD_INDEX);

	if( structureNameNode == undefined){
		throw new Error("[StructureDeclarationNode.getStructureName()] Cannot provide the structure name : no StructureNameNode attached.");	// -> Exception to be defined 
	}
		
	return structureNameNode.getName();	

}

StructureDeclarationNode.prototype.getFieldDeclarationList = function(){
	
	var variablesDeclarationListNode = this.getChild(StructureDeclarationNode.STRUCTURE_ELEMENT_DECLARATION_LIST_CHILD_INDEX);
	
	if( variablesDeclarationListNode == undefined){
		throw new Error("[StructureDeclarationNode.getFieldDeclarationList()] Cannot provide the elements declaration list : no VariablesDeclarationListNode attached.");	// -> Exception to be defined 
	}
	
	return variablesDeclarationListNode;

}

StructureDeclarationNode.prototype.setFieldDeclarationList = function(node) {
	this.children[StructureDeclarationNode.STRUCTURE_ELEMENT_DECLARATION_LIST_CHILD_INDEX] = node;
}

StructureDeclarationNode.prototype.getFieldByName = function(fieldName){
	
	var variablesDeclarationListNode = this.getFieldDeclarationList();

	return variablesDeclarationListNode.getChildByName(fieldName);
}

StructureDeclarationNode.prototype.getFieldByIndex = function(fieldName){
	
	var variablesDeclarationListNode = this.getFieldDeclarationList();

	return variablesDeclarationListNode.getChildByIndex(fieldName);
}

StructureDeclarationNode.prototype.getSize = function(){
	
	var size = 0;
	
	var variablesDeclarationListNode = this.getFieldDeclarationList();
	
	for(var i=0; i < variablesDeclarationListNode.children.length; i++){
		size += variablesDeclarationListNode.children[i].getVariableType().getSize();
	}
	
	return size;
	
}

StructureDeclarationNode.prototype.getFieldOffset = function(fieldName){
	
	var offset = 0;
	
	var variablesDeclarationListNode = this.getFieldDeclarationList();
	
	for(var i=0; i < variablesDeclarationListNode.children.length; i++){
		if( variablesDeclarationListNode.children[i].getVariableName() == fieldName ){
			return offset;
		}
		
		offset += variablesDeclarationListNode.children[i].getVariableType().getSize();
		
	}
	
	// TO DO : throw an Exception ??
	return -1;
	
}
