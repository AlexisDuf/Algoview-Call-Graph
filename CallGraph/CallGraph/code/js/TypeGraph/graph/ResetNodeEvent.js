function ResetNodeEvent(sender){
	NodeEvent.call(sender);
}

ResetNodeEvent.prototype=new NodeEvent();