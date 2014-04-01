/**
 * interface CharacterDataType implements DataType: describes the primitive type INTEGER
 * @author michael
 */
 

  
function CharacterDataType(){

	// @Override(DataType)	
	this.getName = function(){ 
		return "CHARACTER";
	}	
	
	// @Override(DataType)		
	this.getSize = function(){ 
		return 1;	// in bytes
	}		
	
	// @Override(DataType)		
	this.initMemory = function(memory, address){
		memory.setValue(address, new CharacterMemoryValue(), this.getSize() );
	}	
	
	// @Override(DataType)		
	this.buildMemoryValue = function(value){
		return new CharacterMemoryValue(value);
	}		

}

// prototype based inheritance
CharacterDataType.prototype = new DataType();
CharacterDataType.prototype.constructor = CharacterDataType;
