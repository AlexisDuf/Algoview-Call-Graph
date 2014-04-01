function TableView(){};

TableView.prototype = new AbstractView();

TableView.prototype.refreshNode=function(ev){
	if(ev.getNode().getValue().getSelected()===1){

		$('.toDelete').remove(); // On supprime tout ce qu'on ne peut pas savoir le nombre à l'avance (calledFonctions et Variables)
		$('.nodeId').text(ev.getNode().getId());
		if(ev.getNode().getValue().getName()===undefined){
			$('.nodeName').text("Undefined");
		}else{
			$('.nodeName').text(ev.getNode().getValue().getName());
		}
		var currentNode;
		var currentindex=1;
		var neighboorsIterator = ev.getNode().getNeighbors();
		while(neighboorsIterator.hasNextNode()){
			currentNode=neighboorsIterator.getNextNode();
			if(currentindex%2 ===0){
				var next=$('<tr class="even toDelete "><td class="first">Neighboor '+currentindex+':</td><td data="'+currentNode.getId()+'" class="neighbor">'+currentNode.id+'</td></tr>');
			}
			else{
				var next=$('<tr class="odd toDelete "><td class="first">Neighboor '+currentindex+':</td><td data="'+currentNode.getId()+'" class="neighbor">'+currentNode.id+'</td></tr>');
			}
			
			$('#TableView').append(next);
			currentindex++;
		}
	}
}

TableView.prototype.clearView=function(){
	$('#TableView').empty();
}

TableView.prototype.refreshView=function(){
	$('.toDelete').remove();
	$('.nodeId').empty();
	$('.nodeName').empty();
}