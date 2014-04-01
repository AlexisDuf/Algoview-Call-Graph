/**
 * class Node : models a program node
 * @param filePosition : position infos in the source code
 * @param childNodes (optionnal) : Node... or Node[] : a variable number of child nodes
 * @author michael
 */
function Node(tokenType, token) {

	if (token === undefined) {
		token = new org.antlr.runtime.CommonToken(42);
	}

	org.antlr.runtime.tree.CommonTree.call(this, token); 

	this.currentChild = 0;
	this.executed = false;
	this.children = new Array();
}

org.antlr.lang.extend(Node, org.antlr.runtime.tree.CommonTree, {
});

// Pour l'instant, comme on n'a qu'un seul fichier, on renvoie juste la ligne
Node.prototype.getFilePosition = function() {
	return this.token.line;
}

Node.prototype.setExecuted = function(executed) {
	this.executed = executed;
}

Node.prototype.isExecuted = function() {
	return this.executed;
}

Node.prototype.execute = function(memory, nodeStack, programRunner) {
	console.log('Executing ', this);
	nodeStack.pop();
	return false;
}

// TODO: Faire un clone ad hoc qui ne recopie pas tout l'arbre
Node.prototype.clone = function() {
	var newNode = jQuery.extend(true, {}, this);

	for (var i = 0; i < this.children.length; i++) {
		newNode.children[i] = this.children[i].clone();
	}

	return newNode;
}
