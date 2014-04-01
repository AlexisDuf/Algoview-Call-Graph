function NodeEvent(sender,node){
	Event.call(this,sender);
	this.node=node;
	this.sender;
}

NodeEvent.prototype=new Event();

NodeEvent.prototype.getNode=function(){
	return this.node;
}