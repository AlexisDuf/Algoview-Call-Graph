function NodeValue(data,name){
	this.data=data;
	this.selected=0;
	this.name=name;
}

	/******* VALEURS DE SELECTED *****

	0: Non sélectioné
	1: Noeud actuellement sélectioné
	2: Voisin d'un noeud sélectioné

	*******************************/

NodeValue.prototype.getSelected=function(){
	return this.selected;
}

NodeValue.prototype.getData=function(){
	return this.data;
}

NodeValue.prototype.getName=function(){
	return this.name;
}
