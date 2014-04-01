/**
 * class AlreadyAllocatedSegmentException extends Exception: raised when the user tries to allocate a same memory cell several times
 * @param address : the start address of the already allocated segment
 * @author michael
 */
var AlreadyAllocatedSegmentException = function(address) {
	Exception.call(this);
	
	this.address = address;
}

// prototype based inheritance
AlreadyAllocatedSegmentException.prototype = new Exception();

AlreadyAllocatedSegmentException.prototype.toString = function() {
	return "Trying to realloc a memory area already in use at address " + this.address;
}
