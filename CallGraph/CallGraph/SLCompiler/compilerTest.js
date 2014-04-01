var programCompiler = new ProgramCompiler();



buildProgramTree = function(fileName) {
	
	$.ajax({
   		type: "GET",
		url: "samples/" + fileName + ".sl",
		error: function(){ loadErrorHandler(fileName) },
		success: compileProgram,
		dataType: "text",
	});
}


loadErrorHandler = function(fileName){
		$('#compilerOutput').html( "Unable to load file : " + fileName + ".js");	
}


compileProgram = function(programText) {

	$('#programCode').html( programText.replace(/\n/g,"<br/>") );
		
	programCompiler.getProgram().setText(programText);
	
	try{
		programCompiler.compile();
		$('#compilerOutput').html( AlgoUtils.getTreeLevelsString( programCompiler.getProgramTree() ).replace(/\n/g,"<br/>")  );

	}catch(e){

		var errorHTML = e.toString();
		
		if( e.getWrappedException() != undefined ){
			errorHTML += "<br/> Wrapped Exception : <br/>" + e.getWrappedException().toString().replace(/\n/g,"<br/>");
		}
		
		$('#compilerOutput').html( errorHTML );
	}

	var callGraph,
		programTree;

	Tools.callGraph.setCallGraph(Tools.convertTreeInSimplyGraph(programCompiler.getProgramTree(),true));
	Tools.callGraph.setTreeGraph(Tools.convertTreeInGraph(programCompiler.getProgramTree(),true));

	callGraph=Tools.callGraph.getCallGraph();
	Tools.callGraph.setCurrentType("callGraph");

	node = callGraph.getNode(1);

	var svgView= new SvgView(callGraph,"NodeId"+node.id,800,800,"hsb(10, 100, 100)","#BF2764");
	callGraph.addView(svgView);

	var tableView = new TableView();
	callGraph.addView(tableView);

	var treeView = new dTree("treeView",callGraph,1);
	callGraph.addView(treeView);
	

	/******* INITIALISATION DU CONTROLEUR ****/
	var myController = new Controller(callGraph);

}

// buildProgramTree takes a program name without extension
// the corresponding file is supposed to be in the /samples folder and to have the extension .sl

//buildProgramTree("test");




