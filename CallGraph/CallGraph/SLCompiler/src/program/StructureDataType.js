/**
 * class StructureDataType implements DataType: models a data structure
 * @author michael
 */
 

function StructureDataType(structureName, structureDeclarationNode) {
	this.name = structureName;									// name of the structure
	this.structureDeclarationNode = structureDeclarationNode;	// instance of StructureDeclarationNode
	
	this.type = "STRUCTURE_DATA_TYPE";
}

// prototype based inheritance
StructureDataType.prototype = new DataType();
StructureDataType.prototype.constructor = StructureDataType;

StructureDataType.prototype.getStructureName = function() { 
	return this.name;	
}	

// @Override(DataType)
StructureDataType.prototype.getName = function() { 
	return "STRUCT " + this.name;	
}	

// @Override(DataType)
StructureDataType.prototype.initMemory = function(memory, address) {
		
	var currentAddress = address;
	var currentDataType;
	
	var fields = this.structureDeclarationNode.getFieldDeclarationList().getChildren();
	
	for(var i=0; i < fields.length; i++) {
		currentDataType = fields[i].getVariableType();
		
		currentDataType.initMemory(memory, currentAddress);
		currentAddress += currentDataType.getSize(); 			
	}
}		

// @Override(DataType)
StructureDataType.prototype.getSize = function() { 

	if( this.structureDeclarationNode == undefined){
		throw new Error("[StructureDataType.getSize()] Cannot determine structure size : no StructureDeclarationNode attached.");	// -> Exception to be defined 
	}
	
	return this.structureDeclarationNode.getSize();
}	


// specific methods
StructureDataType.prototype.setStructureDeclarationNode = function(structureDeclarationNode) {
	this.structureDeclarationNode = structureDeclarationNode;
}

StructureDataType.prototype.getStructureDeclarationNode = function() {
	return this.structureDeclarationNode;
}

StructureDataType.prototype.getFieldOffset = function(fieldName) {
	return this.structureDeclarationNode.getFieldOffset(fieldName);
}

StructureDataType.prototype.getFieldByName = function(fieldName) {
	return this.structureDeclarationNode.getFieldByName(fieldName);
}

StructureDataType.prototype.getFieldByIndex = function(fieldIndex) {
	return this.structureDeclarationNode.getFieldByIndex(fieldIndex);
}








