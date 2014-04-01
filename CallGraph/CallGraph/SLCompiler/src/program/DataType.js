/**
 * interface DataType : describes a data type
 * @author michael
 **/
function DataType() {

}

DataType.prototype.toString = function(value) {
	return this.getName();
}	

// should be overridden
DataType.prototype.getName = function() {
	return "Abstract DataType";
}	

// should be overridden
DataType.prototype.getSize = function() {
	
}	

// should be overridden
DataType.prototype.initMemory = function(memory, address) {
	
}	

// should be overridden
DataType.prototype.buildMemoryValue = function(value) {
	
}	



