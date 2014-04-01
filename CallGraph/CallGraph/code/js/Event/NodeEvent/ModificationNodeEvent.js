function ModificationNodeEvent(sender,node){
	NodeEvent.call(this,sender,node);
}

ModificationNodeEvent.prototype = new NodeEvent();