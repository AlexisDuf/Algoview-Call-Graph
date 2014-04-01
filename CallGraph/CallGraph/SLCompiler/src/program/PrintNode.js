function PrintNode(tokenType, token, newLine) {	
	Node.call(this, tokenType, token); 

	this.newLine = newLine;
}

// prototype based inheritance
PrintNode.prototype = new Node();
PrintNode.prototype.constructor = PrintNode;

PrintNode.prototype.getMessage = function()  {
	var quotedText = this.getParameter().getText();
	return quotedText.substring(1, quotedText.length - 1);
}

PrintNode.prototype.getParameter = function() {
	return this.children[0];
}

PrintNode.prototype.execute = function(memory, nodeStack, programRunner) {
	if (this.currentChild == 0) {
		nodeStack.push(this.getParameter());
		this.currentChild++;
	} else {
		this.currentChild = 0;
		
		var parameter = this.getParameter();
		var outputText;
		if (parameter.type && parameter.type == "STRING") {
			var quotedText = parameter.getText();
			outputText = quotedText.substring(1, quotedText.length - 1);
		} else {
			outputText = parameter.getValue();
		}
		
		// TODO: Protéger les caractères HTML : Attention au mode console
		
		if (this.newLine == true) {
			outputText += "<br />";
		}
		
		var event = new ProgramRunnerEvent(programRunner, "OUTPUT_TEXT", outputText);
		programRunner.notifyListeners(event);
		nodeStack.pop();
	}
	
	return false;
}
