function ModifyEdgeEvent(sender,sourceNode,destNode){
	EdgeEvent.call(this,sender,sourceNode,destNode);
}

ModifyEdgeEvent.prototype=new EdgeEvent();