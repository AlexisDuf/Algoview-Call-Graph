var ProgramCompiler = function() {
	this.program = new Program();
	this.programTree = undefined;
	
	this.errors = new Array();

	var self = this;
	
	org.antlr.runtime.BaseRecognizer.prototype.emitErrorMessage = function (msg) {
		self.errors.push(msg);
		JSUtils.throwException("CompilationError", self.errors);		
	};
}

ProgramCompiler.prototype.getProgramTree = function() {
	return this.programTree;
}

ProgramCompiler.prototype.getProgram = function() {
	return this.program;
}

ProgramCompiler.prototype.compile = function() {


	this.errors = new Array();

	var cstream = new org.antlr.runtime.ANTLRStringStream(this.program.text + "\n");
	var lexer = new SimpleLanguageLexer(cstream);
	var tstream = new org.antlr.runtime.CommonTokenStream(lexer);
	var parser = new SimpleLanguageParser(tstream);
	var programTree = parser.program();

	if (this.errors.length != 0) {
		throw new CompilationError(this.errors);
	}

	// console.log("Program tree", programTree.tree);
	
	if (! this.findMainFunction(programTree.tree)) {
		this.programTree = undefined;
		this.errors.push("ERROR: No main function defined");
		JSUtils.throwException("CompilationError", this.errors);
	}

	this.programTree = programTree.tree;

	this.parseVariablesDeclarationNodesForFunctions(programTree.tree);
	this.parseVariablesDeclarationNodesForStructureDeclarations(programTree.tree);
	this.findStructureDeclarations(programTree.tree);

	if (this.errors.length != 0) {
		throw new CompilationError(this.errors);		
	}

}


ProgramCompiler.prototype.findMainFunction = function(program) {
	var functionList = program.getFunctionList();
	for (var i = 0; i < functionList.children.length; ++i) {
		if (functionList.children[i].getName() == "main") {
			program.setMainFunction(functionList.children[i]);
			return true;
		}
	}
	return false;
}

ProgramCompiler.prototype.parseVariablesDeclarationNodesForFunctions = function(program) {
	var functionList = program.getFunctionList();
	for (var i = 0; i < functionList.children.length; ++i) {
		var currentFunctionNode = functionList.children[i];
		var variablesDeclarationListNode = currentFunctionNode.getLocalVariableDeclarations();
		currentFunctionNode.setLocalVariableDeclarations(this.parseVariablesDeclarationNodes(variablesDeclarationListNode));
	}
}

ProgramCompiler.prototype.parseVariablesDeclarationNodesForStructureDeclarations = function(program) {
	var structureDeclarationList = program.getStructureDeclarationList();

	if (structureDeclarationList.children == undefined) {
		return;
	}

	for (var i = 0; i < structureDeclarationList.children.length; ++i) {
		var currentStructureDeclarationNode = structureDeclarationList.children[i];
		var variablesDeclarationListNode = currentStructureDeclarationNode.getFieldDeclarationList();
		currentStructureDeclarationNode.setFieldDeclarationList(this.parseVariablesDeclarationNodes(variablesDeclarationListNode));
	}
}

ProgramCompiler.prototype.parseVariablesDeclarationNodes = function(variablesDeclarationListNode) {
	var newVariablesDeclarationListNode = new VariablesDeclarationListNode();
	for (var j = 0; j < variablesDeclarationListNode.children.length; ++j) {
		var currentVariablesDeclarationNode = variablesDeclarationListNode.children[j];
		var identifierList = currentVariablesDeclarationNode.getIdentifierList();
		for (var k = 0; k < identifierList.children.length; ++k) {
			var newVariableDeclarationNode = new VariableDeclarationNode();
			newVariableDeclarationNode.addChild(new VariableNameNode(undefined, undefined, identifierList.children[k].getText()));
			newVariableDeclarationNode.addChild(currentVariablesDeclarationNode.getVariableType());
			newVariablesDeclarationListNode.addChild(newVariableDeclarationNode);
		}
	}
	return newVariablesDeclarationListNode;
}

ProgramCompiler.prototype.findStructureDeclarations = function(program) {
	var structureDeclarationListNode = program.getStructureDeclarationList();
	var functionList = program.getFunctionList();
	for (var i = 0; i < functionList.children.length; ++i) {
		var currentFunctionNode = functionList.children[i];
		var variablesDeclarationListNode = currentFunctionNode.getLocalVariableDeclarations();
		for (var j = 0; j < variablesDeclarationListNode.children.length; ++j) {
			var currentVariableDeclarationNode = variablesDeclarationListNode.children[j];
			var dataType = currentVariableDeclarationNode.getVariableType();
			if (dataType instanceof StructureDataType) {
				var structureDeclarationNode = this.findStructureDeclarationNode(dataType.getStructureName());
				dataType.setStructureDeclarationNode(structureDeclarationNode);
			}
		}
	}
}

ProgramCompiler.prototype.findStructureDeclarationNode = function(structureName) {
	var structureDeclarationNode = this.programTree.getStructureDeclarationList().getStructureDeclarationByName(structureName);
	if (structureDeclarationNode == undefined) {
		this.errors.push("ERROR: Cannot find structure declaration");
		JSUtils.throwException("CompilationError", this.errors);		
	}
	return structureDeclarationNode;
}



