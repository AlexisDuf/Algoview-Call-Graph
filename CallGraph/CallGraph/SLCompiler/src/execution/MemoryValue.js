/**
 * class MemoryValue : provides an uniform way to manipulate the value of all supported data types
 * @param value : the wrapped primitive type
 * @param state : an symbol of the MemoryState "enum"
 * @author michael
 */
 
var MemoryValue = function(value, state) {

	this.state = MemoryState.UNUSED;
		
	if (value != undefined) {
		this.state = MemoryState.HAS_VALUE;
		this.value = value;
	} else if (state != undefined) {
		this.state = state;
		this.value = undefined;
	}

	this.changed = true;
	this.accessibleFromStack = false;
	
	this.pointedBy = {};		// memory units pointing towards this
}

	
MemoryValue.prototype.clonePointers = function(otherValue) {	
	this.pointedBy = otherValue.pointedBy;
}

MemoryValue.prototype.getPointerCount = function() {
	return Object.keys(this.pointedBy).length;
}
	
MemoryValue.prototype.addPointer = function(memoryUnit) {	
	this.pointedBy["@" + memoryUnit.getAddress()] = memoryUnit;
}

MemoryValue.prototype.removePointer = function(memoryUnit) {	
	delete this.pointedBy["@" + memoryUnit.getAddress()];
}

MemoryValue.prototype.getPointers = function() {
	return this.pointedBy;
}

MemoryValue.prototype.toString = function() {
	if (this.state == MemoryState.HAS_VALUE) {
		return this.getStringValue();
	} else {
		return this.state;
	}
}

MemoryValue.prototype.isAccessibleFromStack = function() {
	return this.accessibleFromStack;
}

MemoryValue.prototype.setAccessibleFromStack = function(accessible) {
	return this.accessibleFromStack = accessible;
}

MemoryValue.prototype.setChanged = function(changed) {
	this.changed = changed;
}

MemoryValue.prototype.hasChanged = function() {
	return this.changed;
}

MemoryValue.prototype.getState = function() {
	return this.state;
}
	
MemoryValue.prototype.getPrimitiveValue = function() {
	return this.value;
}

MemoryValue.prototype.getStringValue = function() { 	// this method can be overridden if necessary
	return this.getPrimitiveValue();
} 

MemoryValue.prototype.clone = function() { 	// this method can be overridden if necessary
	return new MemoryValue(this.value, this.state);
} 

MemoryValue.INTEGER = "INTEGER";
MemoryValue.BOOLEAN = "BOOLEAN";
MemoryValue.CHARACTER = "CHARACTER";
MemoryValue.POINTER = "POINTER";
MemoryValue.FLOAT = "FLOAT";
