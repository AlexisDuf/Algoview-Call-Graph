/**
 * interface PointerDataType implements DataType: describes the primitive type POINTER
 * @author michael
 */
 

  
function PointerDataType(){

	// @Override(DataType)	
	this.getName = function(){ 
		return "POINTER";
	}	
	
	// @Override(DataType)		
	this.getSize = function(){ 
		return 4;	// in bytes
	}		
	
	// @Override(DataType)		
	this.initMemory = function(memory, address){
		memory.setValue(address, new PointerMemoryValue(), this.getSize());
	}
	
	// @Override(DataType)		
	this.buildMemoryValue = function(value){
		return new PointerMemoryValue(value);
	}	

}

// prototype based inheritance
PointerDataType.prototype = new DataType();
PointerDataType.prototype.constructor = PointerDataType;
