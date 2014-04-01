function RandomNode(tokenType, token, produceIntegers) {	
	ExpressionNode.call(this, tokenType, token);
	
	this.produceIntegers = produceIntegers;
}

// Prototype based inheritance
RandomNode.prototype = new ExpressionNode();
RandomNode.prototype.constructor = RandomNode;

RandomNode.prototype.getLimitExpression = function() {
	return this.children[0];
}

RandomNode.prototype.execute = function(memory, nodeStack, programRunner) {
	if (this.currentChild == 0) {
		this.currentChild++;
		nodeStack.push(this.getLimitExpression());
	} else {
		var limitExpressionMemoryValue = this.getLimitExpression().getValue();
		console.log(limitExpressionMemoryValue);
		var limitExpressionMemoryValueAsInteger = limitExpressionMemoryValue.convertTo(MemoryValue.INTEGER);
		
		if (limitExpressionMemoryValueAsInteger == undefined) {
			throw new CannotConvertTo(MemoryValue.INTEGER);
		}
		
		this.setValue(new IntegerMemoryValue(Math.floor(Math.random() * limitExpressionMemoryValueAsInteger)));
		nodeStack.pop();
	}
	

	return false;
}
