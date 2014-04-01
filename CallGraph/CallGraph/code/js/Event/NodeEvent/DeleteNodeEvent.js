function DeleteNodeEvent(sender,node){
	NodeEvent.call(this,sender,node);
}

DeleteNodeEvent.prototype = new NodeEvent();