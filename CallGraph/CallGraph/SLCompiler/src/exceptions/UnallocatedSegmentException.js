/**
 * class UnallocatedSegmentException : raised when the user tries to access to an unallocated memory cell
 * @param address : the start address of the unallocated area
 * @author michael
 */

var UnallocatedSegmentException = function(address) {
	Exception.call(this);
	
	this.address = address;
}

// prototype based inheritance
UnallocatedSegmentException.prototype = new Exception();

UnallocatedSegmentException.prototype.toString = function() {
	return "Trying to read in unallocated memory area at address " + this.address;
}
