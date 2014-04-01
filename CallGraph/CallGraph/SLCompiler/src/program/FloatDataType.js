/**
 * Interface FloatDataType implements DataType: describes the primitive type FLOAT
 * @author Cédric
 **/
function FloatDataType() {

	// @Override(DataType)
	this.getName = function() { 
		return "FLOAT";
	}	

	// @Override(DataType)	
	this.getSize = function() { 
		return 4;	// in bytes
	}		
	
	// @Override(DataType)	
	this.initMemory = function(memory, address) {
		memory.setValue(address, new FloatMemoryValue(), this.getSize());
	}
	
	// @Override(DataType)		
	this.buildMemoryValue = function(value) {
		return new FloatMemoryValue(value);
	}

}

// Prototype based inheritance
FloatDataType.prototype = new DataType();
FloatDataType.prototype.constructor = FloatDataType;
