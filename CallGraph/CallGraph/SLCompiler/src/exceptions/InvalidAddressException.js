/**
 * class InvalidAddressException : raised when the user tries to access to an invalid address
 * @param address : the invalid address
 * @author michael
 */

var InvalidAddressException = function(address) {
	Exception.call(this);
	
	this.address = address;
}

// prototype based inheritance
InvalidAddressException.prototype = new Exception();

InvalidAddressException.prototype.toString = function() {
	return "Trying to access an invalid address in memory: " + this.address;
}
