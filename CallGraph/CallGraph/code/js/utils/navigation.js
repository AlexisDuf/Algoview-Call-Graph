$('#choice_program').click(function(){
	window.location.reload(true);
});

$('#compile_link').click(function(){
	buildProgramTree("linkedList");
	Tools.callGraph.initSwitchMode();
});

$('#compile_if').click(function(){
	buildProgramTree("if");
	Tools.callGraph.initSwitchMode();
});

$('#compile_fact').click(function(){
	buildProgramTree("fact");
	Tools.callGraph.initSwitchMode();
});

$('#compile_graph').click(function(){
	buildProgramTree("test");
	Tools.callGraph.initSwitchMode();
});

