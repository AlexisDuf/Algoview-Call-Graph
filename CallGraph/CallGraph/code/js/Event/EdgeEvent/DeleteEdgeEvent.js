function DeleteEdgeEvent(sender,sourceNode,destNode){
	EdgeEvent.call(this,sender,sourceNode,destNode);
}

DeleteEdgeEvent.prototype = new EdgeEvent();