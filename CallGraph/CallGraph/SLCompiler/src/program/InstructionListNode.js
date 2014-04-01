function InstructionListNode(tokenType, token) {	
	Node.call(this, tokenType, token);
}

// Prototype based inheritance
InstructionListNode.prototype = new Node();
InstructionListNode.prototype.constructor = InstructionListNode;

InstructionListNode.prototype.execute = function(memory, nodeStack, programRunner) {

	if (this.currentChild > 0) {
		if (programRunner.stopAfterInstructionExecution
				&& this.children[this.currentChild - 1].isExecuted()) {
			--this.currentChild;
		}
	}

	if (this.currentChild < this.children.length) {
		nodeStack.push(this.children[this.currentChild]);
		++this.currentChild;
		return true;
	} else {
		this.currentChild = 0;
		nodeStack.pop();
		return false;
	}
	
}
