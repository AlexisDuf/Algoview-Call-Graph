function Event(sender){
	this.sender=sender;
}

Event.prototype.getSender=function(){
	return this.sender;
}