/**
 * interface BooleanDataType implements DataType: describes the primitive type BOOLEAN
 * @author Cédric
 **/
function BooleanDataType() {

	// @Override(DataType)
	this.getName = function() { 
		return "BOOLEAN";
	}	

	// @Override(DataType)	
	this.getSize = function() { 
		return 1;	// in bytes
	}		
	
	// @Override(DataType)	
	this.initMemory = function(memory, address) {
		memory.setValue(address, new BooleanMemoryValue(), this.getSize());
	}
	
	// @Override(DataType)		
	this.buildMemoryValue = function(value) {
		return new BooleanMemoryValue(value);
	}

}

// Prototype based inheritance
BooleanDataType.prototype = new DataType();
BooleanDataType.prototype.constructor = BooleanDataType;
