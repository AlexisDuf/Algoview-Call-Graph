function NewEdgeEvent(sender,sourceNode,destNode){
	EdgeEvent.call(this,sender,sourceNode);
}

NewEdgeEvent.prototype = new EdgeEvent();