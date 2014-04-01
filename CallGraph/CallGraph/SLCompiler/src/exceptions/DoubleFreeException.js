/**
 * class DoubleFreeException : raised when the user tries to deallocate a free memory space
 * @param address : the start address of the free memory space
 * @author michael
 */

var DoubleFreeException = function(address) {
	Exception.call(this);
	
	this.address = address;
}

// prototype based inheritance
DoubleFreeException.prototype = new Exception();

DoubleFreeException.prototype.toString = function() {
	return "Trying to deallocate a free memory segment at address " + this.address + ". Might be a double free problem.";
}
