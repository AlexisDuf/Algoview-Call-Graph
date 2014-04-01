function ForNode(tokenType, token) {	
	Node.call(this, tokenType, token);
	
	this.clonedVariable;
	this.clonedEndExpression;
	this.clonedStepExpression;
	this.clonedInstructions;
	this.testNode;
}

// Prototype based inheritance
ForNode.prototype = new Node();
ForNode.prototype.constructor = ForNode;


ForNode.prototype.getVariable = function() {
	return this.children[0];
}

ForNode.prototype.cloneVariable = function() {
	this.clonedVariable = this.getVariable().clone();
}

ForNode.prototype.getBeginExpression = function() {
	return this.children[1];
}

ForNode.prototype.getEndExpression = function() {
	return this.children[2];
}

ForNode.prototype.cloneEndExpression = function() {
	this.clonedEndExpression = this.getEndExpression().clone();
}

ForNode.prototype.getStepExpression = function() {
	return this.children[3];
}

ForNode.prototype.cloneStepExpression = function() {
	this.clonedStepExpression = this.getStepExpression().clone();
}

ForNode.prototype.getInstructions = function() {
	return this.children[4];
}

ForNode.prototype.cloneInstructions = function() {
	this.clonedInstructions = this.getInstructions().clone();
}


ForNode.prototype.execute = function(memory, nodeStack, programRunner) {
	// console.log("ForNode", this.currentChild);
	if (this.currentChild == 0) {
		// Affectation de la valeur initiale à la variable de boucle
		var assignInitValueNode = new AssignNode(undefined, undefined);
		this.cloneVariable();
		assignInitValueNode.addChild(this.clonedVariable);
		assignInitValueNode.addChild(this.getBeginExpression());
		nodeStack.push(assignInitValueNode);

		this.currentChild++;
		return false;
		
	} else if (this.currentChild == 1) {
		// Evaluation du pas (nécessaire pour choisir le sens du test)
		this.cloneStepExpression();
		nodeStack.push(this.clonedStepExpression);
		this.currentChild++;
		return false;
		
	} else if (this.currentChild == 2) {
		// Création et empilement du test de fin de boucle
		this.testNode = new TestNode(undefined, undefined);
		this.cloneVariable();
		this.testNode.addChild(this.clonedVariable);
		this.cloneEndExpression();
		this.testNode.addChild(this.clonedEndExpression);
		
		// Mise à jour du sens du test...
		
		var stepMemoryValue = this.clonedStepExpression.getValue();
		// On convertir en entier juste pour récupérer le signe
		var stepMemoryValueAsInteger = stepMemoryValue.convertTo(MemoryValue.INTEGER);
		
		// Si ce n'est pas convertible en entier, c'est que ce n'est pas un pas valide
		if (stepMemoryValueAsInteger == undefined) {
			throw new InvalidExpressionException();
		}
		
		var stepValue = stepMemoryValueAsInteger.getPrimitiveValue();
		if (stepValue >= 0) {
			this.testNode.setOperator("GT");
		} else {
			this.testNode.setOperator("LT");
		}
		nodeStack.push(this.testNode);
		this.currentChild++;
		return false;
		
	} else if (this.currentChild == 3) {
		// Evaluation du test de fin de boucle
		var endLoopTestMemoryValue = this.testNode.getValue();
		var endLoopTestValueAsBoolean = endLoopTestMemoryValue.convertTo(MemoryValue.BOOLEAN);
		
		// Vérification de la bonne conversion en booléen du résultat du test
		if (endLoopTestValueAsBoolean == undefined) {
			// Ca ne devrait jamais arriver car le test doit toujours être un booléen
			throw new InternalError();
		}
		
		if (endLoopTestValueAsBoolean.getPrimitiveValue() == true) {
			// On est arrivé à la fin de la boucle
			nodeStack.pop();
			return false;
		} else {
			// On doit encore boucler
			// Empilement des instructions
			this.cloneInstructions();
			nodeStack.push(this.clonedInstructions);
			this.currentChild++;
			return false;
		}
		
	} else if (this.currentChild == 4) {
		// On reste sur ce noeud pour afficher correctement le numéro de ligne avant l'incrémentation de la variable de boucle
		this.currentChild++;
		return true;
		
	} else if (this.currentChild == 5) {
		// Après les instructions  : Lancement de l'incrémentation de la variable de boucle
		var assignNewValue = new AssignNode(undefined, undefined);
		this.cloneVariable();
		assignNewValue.addChild(this.clonedVariable);
		
		var plusNode = new ArithmeticExpressionNode(undefined, undefined);
		plusNode.setOperator("+");
		plusNode.addChild(this.clonedVariable);
		plusNode.addChild(this.clonedStepExpression); // Attention, le step n'est pas réévalué
		assignNewValue.addChild(plusNode);
		nodeStack.push(assignNewValue);
			
		// Au retour, on retourne à l'évaluation du test de fin de boucle
		this.currentChild = 2;
		return false;
	}
}
