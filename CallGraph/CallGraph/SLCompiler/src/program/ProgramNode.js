function ProgramNode(tokenType, token) {	
	Node.call(this, tokenType, token); 
}

// prototype based inheritance
ProgramNode.prototype = new Node();
ProgramNode.prototype.constructor = ProgramNode;

ProgramNode.prototype.getStructureDeclarationList = function() {
	return this.children[0];
}

ProgramNode.prototype.getFunctionList = function() {
	return this.children[1];
}

ProgramNode.prototype.getMainFunction = function() {
	return this.children[2];
}

ProgramNode.prototype.setMainFunction = function(mainFunction) {
	this.children[2] = mainFunction;
}

ProgramNode.prototype.getFunction = function(functionName, numberOfParameters) {
	var functionList = this.getFunctionList();
	for (var i = 0; i < functionList.children.length; ++i) {
		if (functionList.children[i].getName() === functionName) {
			var currentFunction = functionList.children[i];
			if (currentFunction.getNumberOfParameters() == numberOfParameters) {
				return currentFunction;
			}
		}
	}
	return undefined;
}

ProgramNode.prototype.execute = function(memory, nodeStack, programRunner) {
	if (this.currentChild == 0) {
		this.currentChild++;
		nodeStack.push(this.getMainFunction());
        programRunner.notifyListeners(new ProgramRunnerEvent(programRunner, "STARTED_PROGRAM"));
        return false;
	} else {
		this.currentChild = 0;
		nodeStack.pop();
		programRunner.state = "STOPPED";
        programRunner.notifyListeners(new ProgramRunnerEvent(programRunner, "STOPPED_PROGRAM"));
        return false;
	}
}
