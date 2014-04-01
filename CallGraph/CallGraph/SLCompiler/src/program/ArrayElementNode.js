function ArrayElementNode(tokenType, token) {	
	AssignableNode.call(this, tokenType, token);	
}

// prototype based inheritance
ArrayElementNode.prototype = new AssignableNode();
ArrayElementNode.prototype.constructor = ArrayElementNode;

ArrayElementNode.prototype.getVariable = function() {
	return this.children[0];
}

ArrayElementNode.prototype.getIndexExpression = function() {
	return this.children[1];
}

ArrayElementNode.prototype.execute = function(memory, nodeStack, programRunner) {
	if (this.currentChild == 0) {
		this.currentChild++;
		nodeStack.push(this.getVariable());
	} else if (this.currentChild == 1) {
		this.currentChild++;
		nodeStack.push(this.getIndexExpression());
	} else {
		this.currentChild = 0;
		nodeStack.pop();

        var arrayBaseAddress;
        var elementAddress;
        var index;
        var arrayDataType;
		var parent = this.getVariable();
		
		/**
		 *  3 cas : on accède à un élément de tableau 
		 *		- alloué dynamiquement
		 *		- statiquement
		 *		- par une variable pointant vers un tableau alloué statiquement
		 **/
		if (parent.dataType instanceof PointerDataType) {
			// Tableau accédé depuis un pointeur
			// Peut être sur le tas ou sur la pile
			var pointerMemoryValue = parent.getValue();
			if (pointerMemoryValue.isNil()) {
				throw new UseOfNilAsArray();
			}
			arrayBaseAddress = pointerMemoryValue.getPrimitiveValue();
			
			// Recherche sur le tas
			var heapMemoryUnit = memory.getHeap().findMemoryUnit(arrayBaseAddress);
			if (heapMemoryUnit != undefined) {
				// Le tableau est bien dans le tas
				arrayDataType = heapMemoryUnit.getDataType();
			} else {
				// Recherche dans la pile
				var stackMemoryUnit = memory.getStack().findMemoryUnit(arrayBaseAddress);
				if (stackMemoryUnit != undefined) {
					// Le tableau est bien dans la pile
					arrayDataType = stackMemoryUnit.getDataType();
				} else {
					// On n'a trouvé le tableau ni sur le tas ni sur la pile
					throw new InvalidMemoryAddressException();
				}
			}

		} else if (parent.dataType instanceof ArrayDataType) {
			// Tableau alloué statiquement sur la pile
			arrayDataType = parent.getDataType();
			arrayBaseAddress = this.getVariable().getAddress();
		} else {
			throw new NotAnArrayException();
		}
		
		index = this.getIndexExpression().getValue().getPrimitiveValue();
		if ((index < 0) || (index >= arrayDataType.getSize())) {
			throw new TryToAccessIncorrectArrayElementException(null, index);
		}
		
		elementAddress = arrayBaseAddress + (arrayDataType.getElementsSize() * index);
		this.setAddress(elementAddress);
		this.setValue(memory.getValue(elementAddress));
		this.setDataType(arrayDataType.getElementsDataType());
	}
	
	return false;
}
