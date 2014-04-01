function VariablesDeclarationListNode(tokenType, token) {	
	Node.call(this, tokenType, token); 
}

// prototype based inheritance
VariablesDeclarationListNode.prototype = new Node();
VariablesDeclarationListNode.prototype.constructor = VariablesDeclarationListNode;


// specific methods
VariablesDeclarationListNode.prototype.getChildByName = function(childName){
	
	for(var i = 0; i < this.children.length; i++){
	
		var child = this.children[i];
		
		if( child instanceof VariableDeclarationNode ){ 	// also checks undefined
		
			if( child.getVariableName() == childName){
				return child;
			}
		}
		
	}
	
	return undefined;
	
}


VariablesDeclarationListNode.prototype.getChildByIndex = function(childIndex){
	
	return this.children[childIndex];
	
}
