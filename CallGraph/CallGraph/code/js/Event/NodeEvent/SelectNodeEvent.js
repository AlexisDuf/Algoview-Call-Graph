function SelectNodeEvent(sender,node){
	NodeEvent.call(this,sender,node);
}

SelectNodeEvent.prototype = new NodeEvent();