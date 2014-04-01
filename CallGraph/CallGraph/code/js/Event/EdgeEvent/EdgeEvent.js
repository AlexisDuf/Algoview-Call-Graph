function EdgeEvent(sender,sourceNode,destNode){
	Event.call(this,sender);
	this.sourceNode=sourceNode;
	this.destNode=destNode;
}

EdgeEvent.prototype=new Event();

EdgeEvent.prototype.getSourceNode=function(){
	return this.sourceNode;
}

EdgeEvent.prototype.getDestNode=function(){
	return this.destNode;
}