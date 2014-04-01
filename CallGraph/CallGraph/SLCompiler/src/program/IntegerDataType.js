/**
 * Interface IntegerDataType implements DataType: describes the primitive type INTEGER
 * @author Michaël
 **/
function IntegerDataType() {

	// @Override(DataType)
	this.getName = function() { 
		return "INTEGER";
	}	

	// @Override(DataType)	
	this.getSize = function() { 
		return 4;	// in bytes
	}		
	
	// @Override(DataType)	
	this.initMemory = function(memory, address) {
		memory.setValue(address, new IntegerMemoryValue(), this.getSize());
	}
	
	// @Override(DataType)		
	this.buildMemoryValue = function(value) {
		return new IntegerMemoryValue(value);
	}	

}

// Prototype based inheritance
IntegerDataType.prototype = new DataType();
IntegerDataType.prototype.constructor = IntegerDataType;
