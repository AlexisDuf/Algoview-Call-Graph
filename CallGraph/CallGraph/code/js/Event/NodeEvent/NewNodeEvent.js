function NewNodeEvent(sender,node){
	NodeEvent.call(this,sender,node);
}

NewNodeEvent.prototype = new NodeEvent();