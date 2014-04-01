function Controller(model){
	this.model=model;
	this.canvas=$('#canvas');
	this.initializeListenners();
};

Controller.prototype.initializeListenners=function(){

	/******* LISTENNERS SVG VIEW ********/

	var controller=this;

    this.canvas.click(function(ev){

		    if(ev.target.tagName=="rect" || ev.target.tagName=="tspan"){

		    	var NodeIdDeselect=$(".selected").attr("nodeid");

		    	if(ev.target.tagName=="rect"){
		    		var NodeIdSelect=$(ev.target).attr("nodeid");
		    	}else{
					var NodeIdSelect=$(ev.target)[0].parentElement.getAttribute("nodeid"); // On récupère l'id du noeud sur lequelle on a cliqué
				}

				if(NodeIdDeselect !== undefined){
					controller.model.deselectNode(NodeIdDeselect);
				}
				controller.model.selectNode(NodeIdSelect);
		    }
	});


	var nivZoom=0;


	this.canvas.click(function(event){
		var text=document.getElementById('zoom-text');
		if (event.ctrlKey ==true && event.shiftKey ==false){
			if (nivZoom+1<10){
				nivZoom++;
				$(text).html("(ZOOM + =click+ctrl, ZOOM - =click+shift)	niveau du ZOOM : "+nivZoom)
					   .attr('zoom',nivZoom);
			}
		}
		if (event.shiftKey ==true && event.ctrlKey ==false){
			if (nivZoom-1 > - 10){
				nivZoom--;
				$(text).html("(ZOOM + =click+ctrl, ZOOM - =click+shift)	niveau du ZOOM : "+nivZoom)
					   .attr('zoom',nivZoom);
			}
		}
	});





	/********* LISTENNERS TABLE VIEW *******/

	$('#TableView').click(function(ev){

	    	if($(ev.target).hasClass("neighbor")){
	    		var NodeIdDeselect=$(".selected").attr("nodeid");
				var NodeIdSelect=parseInt($(ev.target).attr("data"));  // On récupère l'id du noeud sur lequelle on a cliqué

				if(NodeIdDeselect !== undefined){
					controller.model.deselectNode(NodeIdDeselect);
				}

				controller.model.selectNode(NodeIdSelect);
			}
	});


	/******** LISTENNERS TREE VIEW *****/

	$("#TreeView").click(function(ev){

   	if($(ev.target).hasClass("node") || $(ev.target).hasClass("nodeSel")  ){
    	var NodeIdDeselect=$(".selected").attr("nodeid");
		var NodeIdSelect=parseInt($(ev.target).attr("data"));  // On récupère l'id du noeud sur lequelle on a cliqué

		if(NodeIdDeselect != undefined){
			controller.model.deselectNode(NodeIdDeselect);
		}
			controller.model.selectNode(NodeIdSelect);
		}
	
	}
	);

	$('#programTree_button').click(function(){
		if(Tools.callGraph.getCurrentType()==="callGraph"){
			Tools.callGraph.setCurrentType("programTree");
			var programTree=Tools.callGraph.getTreeGraph();
			controller.changeModel(programTree);
		}
	});

	$('#callGraph_button').click(function(){
		if(Tools.callGraph.getCurrentType()==="programTree"){
			Tools.callGraph.setCurrentType("callGraph");
			var callGraph=Tools.callGraph.getCallGraph();
			controller.changeModel(callGraph);
		}
	});

}

Controller.prototype.changeModel=function(_model){
	this.model=_model;
	var ev = new GraphChangeEvent(_model);
	this.model.fireEvent("refreshView",ev);
}
