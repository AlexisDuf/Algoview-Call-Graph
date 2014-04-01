//fonction de construction d'un type SimpleGraph
function SimpleGraph(directed) {
  AbstractSimpleGraph.call(this,directed);
  AbstractModel.call();

  if(directed===undefined ){
    this.directed=false;
  }
  else{
    this.directed=directed;
  }
  this.nodes = new Array();
  this.order=0;
} 

//on fait hériter SimpleGraph de AbstractSimpleGraph
SimpleGraph.prototype = new AbstractSimpleGraph();
SimpleGraph.prototype = new AbstractModel();

/********************** GRAPH OPERATIONS ************************************************/
//on retourne l'ordre du graph
SimpleGraph.prototype.getOrder = function() { 
  return this.order;
}
 //on retourne si le graph est direct ou pas
SimpleGraph.prototype.isDirected = function() { 
  return this.directed;
}


/********************** NODES OPERATIONS ************************************************/

SimpleGraph.prototype.addNode = function(id,name) { 
  return this.addValuedNode(id,undefined,name);
}

/** 
 * Adds a node in the graph with the specified identifier and value
 *
 * @param id the identifier of the node (strictly positive integer)
 * @param value the value of the node  
 * @throws InvalidIdException if the specified id is not valid (wrong type, <= 0, ...)     
 * @throws AlreadyExistingNodeException if a node with the speficied id already exists
 * @return a reference on the new node
 */   
SimpleGraph.prototype.addValuedNode = function(id, value, name) { 
	//on test si l'id passé n'est pas négatif
  if (id<=0){
    throw new InvalidIdException(id,"id<=0","addValueNode(id,value)");
  }
  //on test si l'id est bien un entier
  if(!Tools.isInteger(id)){
    throw new InvalidIdException(id,"l'id n'est pas un entier","addValueNode(id,value)");
  }
  else{
    if (!Tools.nodeInGraph(id,this)){ // Le noeud n'existe pas on peut le crée
      var newNode=new GraphNode(id,value,name);
      this.nodes["NodeId"+id]=newNode;
      this.order++;
      this.fireEvent("refreshView",new NewNodeEvent(this,newNode));
      return newNode;
    }
    else{ // Le noeud existe déja avec cet id 
      throw new AlreadyExistingNodeException(this.nodes["NodeId"+id],"id","addValueNode(id,value,name)",id);
    }
  }
}


/** 
 * Searchs for a node by its identifier in the graph
 *
 * @return a reference on the searched node (AbstractNode instance) - undefined if not found
 */
SimpleGraph.prototype.getNode = function (id) {            
    //on test si l'id est bien positif
  if (id<=0){
    throw new InvalidIdException(id,"id<=0","getNode(id)");
}
  //si l'id est bien un integer
  if(!Tools.isInteger(id)){
    throw new InvalidIdException(id,"l'id n'est pas un entier","getNode(id)");
  }
  else{
    return this.nodes["NodeId"+id];
  }
}


/** 
 * Removes the specified node in the graph
 *
 * @param node a reference on a node of the graph (AbstractNode instance)
 * @throws InvalidReferenceException if the specified reference is not valid (wrong type, undefined, null, ...)    
 * @throws UnexistingNodeException if the reference is valid but the corresponding node does not exist   
 */
SimpleGraph.prototype.removeNode = function (node) {  
//on regarde si node est bien une instance de Node   
  if (!Tools.isNode(node)){
    throw new InvalidReferenceException(node,"node","removeNode(node)");
  }else{

    var nodeId = node.getId();
    //on regarde si l'id recuperer correspond bien au Node 
    if(this.getNode(nodeId)!= node){

      throw  new UnexistingNodeException(node,"node","removeNode(node)");

    }else{
      for(nodeProp in this.nodes){
          currentNode = this.nodes[nodeProp];
        //on supprime les arcs entre les 2 noeuds s'il existe
        if(currentNode.edges["EdgeTo"+nodeId] != undefined){
          delete currentNode.edges["EdgeTo"+nodeId];
          currentNode.degree --;
        }
      }
      //on supprime le node a la fin
      delete this.nodes["NodeId"+nodeId];
      this.order--;
      this.fireEvent("buildView",new DeleteNodeEvent(this));
    }

  }
}


/** 
 * Reset the value of all nodes in the graph
 *
 * @param value the new value for all nodes 
 */ 
SimpleGraph.prototype.resetNodesValue = function(value) { 
  for(var propName in this.nodes ){
    this.nodes[propName].value=value;
  }
//  this.fireEvent("buildView",new resetNodeEvent(this,newNode));
}



/********************** EDGES OPERATIONS ************************************************/


/** 
 * Adds an edge between two nodes in the graph with an undefined weight 
 *
 * @param sourceNode a reference on the source node (AbstractNode instance)
 * @param destNode a reference on the destination node (AbstractNode instance)
 * @throws InvalidReferenceException if the specified reference is not valid (wrong type, undefined, null, ...)      
 * @throws UnexistingNodeException if the references are valid but one of the corresponding nodes does not exist
 * @throws AlreadyExistingEdgeException if the specified edge already exists
 */
SimpleGraph.prototype.addEdge = function(sourceNode, destNode) { 
  return this.addWeightedEdge(sourceNode,destNode,undefined);
}

/** 
 * Adds an edge between two nodes in the graph with a specified weight
 *
 * @param sourceNode a reference on the source node (AbstractNode instance)
 * @param destNode a reference on the destination node (AbstractNode instance)
 * @param weight the weight of the edge
 * @throws InvalidReferenceException if the specified reference is not valid (wrong type, undefined, null, ...)      
 * @throws UnexistingNodeException if the references are valid but one of the corresponding nodes does not exist
 * @throws AlreadyExistingEdgeException if the specified edge already exists
 */
SimpleGraph.prototype.addWeightedEdge = function (sourceNode, destNode, weight) {    
//on regarde si sourceNode est bien une instance de Node
  if(!Tools.isNode(sourceNode)){
    throw  new InvalidReferenceException(sourceNode,"sourceNode","addWeightedEdge(sourceNode,destNode,weight)");
}
//on regarde si destNode est bien une instance de Node
  if(!Tools.isNode(destNode)){
    throw new InvalidReferenceException(destNode,"sourceNode","addWeightedEdge(sourceNode,destNode,weight)"); 
  }
  else{
    var sourceNodeId = sourceNode.getId();
    var destNodeId = destNode.getId();
    //on regarde si l'id recuperer correspond bien au noeud 
    if(this.getNode(sourceNodeId)!=sourceNode){
      throw new UnexistingNodeException(sourceNode,"sourceNode","addWeightedEdge(sourceNode,destNode,weight)");
  }
  //on regarde si l'id recuperer correspond bien au noeud
    if(this.getNode(destNodeId)!=destNode){
      throw new UnexistingNodeException(destNode,"sourceNode","addWeightedEdge(sourceNode,destNode,weight)");
    }
  else {
    //on test s'il existe deja un arc entre les 2 noeuds
      if(sourceNode.edges["EdgeTo"+destNodeId] != undefined){
        throw new AlreadyExistingEdgeException(sourceNode,destNode,"addWeightedEdge(sourceNode,destNode,weight)");
    } else {
      //on créé l'arc entre les 2noeuds et met a jours le degré des noeuds
        sourceNode.edges["EdgeTo"+destNodeId] = new Edge(destNode,weight);
        sourceNode.degree++;
        if (!this.directed && sourceNode!== destNode){
          destNode.edges["EdgeTo"+sourceNodeId] = new Edge(sourceNode,weight);
          destNode.degree++;
        }
       this.fireEvent("refreshEdge",new NewEdgeEvent(this,sourceNode,destNode));
      }
    }
  }
}




/** 
 * Returns the weight of the edge between two nodes in the graph
 *
 * @param sourceNode a reference on the source node (AbstractNode instance)
 * @param destNode a reference on the destination node (AbstractNode instance)
 * @return the weight of the specified edge
 * @throws InvalidReferenceException if the specified reference is not valid (wrong type, undefined, null, ...)      
 * @throws UnexistingNodeException if the references are valid but one of the corresponding nodes does not exist
 * @throws UnexistingEdgeException if the references are valid, the corresponding nodes exists, but the corresponding edge does not exist  
 */
SimpleGraph.prototype.getEdgeWeight = function (sourceNode, destNode) {
    //on regarde si sourceNode est bien une instance de Node
  if(!Tools.isNode(sourceNode)){
    throw new InvalidReferenceException(sourceNode,"sourceNode","addWeightedEdge(sourceNode,destNode,weight)");
}
//on regarde si destNode est bien une instance de Node
  if(!Tools.isNode(destNode)){
    throw new InvalidReferenceException(destNode,"sourceNode","addWeightedEdge(sourceNode,destNode,weight)");
  }
  else{
    var sourceNodeId = sourceNode.getId(),
        destNodeId = destNode.getId();
    //on regarde si l'id recuperer correspond bien au noeud 
    if(this.getNode(sourceNodeId)!= sourceNode){
      throw new UnexistingNodeException(sourceNode,"sourceNode","getEdgeWeight(sourceNode,destNode)");
  }
  //on regarde si l'id recuperer correspond bien au noeud 
    if(this.getNode(destNodeId)!=destNode){
      throw new UnexistingNodeException(destNode,"sourceNode","getEdgeWeight(sourceNode,destNode)");
    }
    else{
      if(sourceNode.edges["EdgeTo"+destNodeId]===undefined){
          throw new UnexistingEdgeException(sourceNode, destNode, "getEdgeWeight(sourceNode,destNode)");
        //on recupere la valeur du poids de l'arc entre les 2 noeuds
      }else{
        return sourceNode.edges["EdgeTo"+destNodeId].weight;
      }
    }
  }
}


/** 
 * Updates the weight of the edge between nodes two nodes in the graph
 *
 * @param sourceNode a reference on the source node (AbstractNode instance)
 * @param destNode a reference on the destination node (AbstractNode instance)
 * @param weight the new weight for the specified edge 
 * @throws InvalidReferenceException if the specified reference is not valid (wrong type, undefined, null, ...)      
 * @throws UnexistingNodeException if the references are valid but one of the corresponding nodes does not exist
 * @throws UnexistingEdgeException if the references are valid, the corresponding nodes exists, but the corresponding edge does not exist 

 */
SimpleGraph.prototype.setEdgeWeight = function (sourceNode, destNode, weight) {
    //on regarde si sourceNode est bien une instance de Node
  if(!Tools.isNode(sourceNode)){
    throw new InvalidReferenceException(sourceNode,"sourceNode","setEdgeWeight(sourceNode,destNode,weight)");
}
//on regarde si destNode est bien une instance de Node
  if(!Tools.isNode(destNode)){
    throw new InvalidReferenceException(destNode,"sourceNode","setEdgeWeight(sourceNode,destNode,weight)");
  }
  else{
    var sourceNodeId = sourceNode.getId(),
        destNodeId = destNode.getId();
    //on regarde si l'id recuperer correspond bien au noeud 
    if(this.getNode(sourceNodeId)!= sourceNode){
      throw new UnexistingNodeException(sourceNode,"sourceNode","setEdgeWeight(sourceNode,destNode,weight)");
  }
  //on regarde si l'id recuperer correspond bien au noeud 
    if(this.getNode(destNodeId)!=destNode){
      throw new UnexistingNodeException(destNode,"sourceNode","setEdgeWeight(sourceNode,destNode,weight)");
    }
    else{
      if(sourceNode.edges["EdgeTo"+destNodeId]===undefined){
        throw new UnexistingEdgeException(sourceNode,destNode,"setEdgeWeight(sourceNode,destNode,weight)");
      }else{
        sourceNode.edges["EdgeTo" + destNodeId].weight = weight;
        //on modifie la valeur du poids de l'arc
        if(!this.directed){
          destNode.edges["EdgeTo"+sourceNodeId].weight=weight;
        }
      }
    }
  }
}


/** 
 * Removes the edge between nodes two nodes in the graph
 *
 * @param sourceNode a reference on the source node (AbstractNode instance)
 * @param destNode a reference on the destination node (AbstractNode instance)
 * @throws InvalidReferenceException if the specified reference is not valid (wrong type, undefined, null, ...)      
 * @throws UnexistingNodeException if the references are valid but one of the corresponding nodes does not exist
 * @throws UnexistingEdgeException if the references are valid, the corresponding nodes exists, but the corresponding edge does not exist 

 */
SimpleGraph.prototype.removeEdge = function (sourceNode, destNode) {
    //on regarde si sourceNode et destNode sont bien définit et sont une instance de Node
  if(sourceNode===undefined || destNode===undefined || !(sourceNode instanceof AbstractNode) || !(destNode instanceof AbstractNode) ){
    throw new InvalidReferenceException();
  }else{
    var sourceNodeId = sourceNode.getId(),
        destNodeId = destNode.getId();
    //on regarde si les id recuperer correspond bien aux noeuds 
    if(this.getNode(sourceNodeId)!= sourceNode || this.getNode(destNodeId)!= destNode){
      throw new UnexistingNodeException();
    }else{
      if(sourceNode.edges["EdgeTo"+destNodeId]===undefined){
        throw new UnexistingEdgeException();
    } else {
      //et on supprime l'arc entre les 2noeuds
        delete sourceNode.edges["EdgeTo"+destNodeId];
        sourceNode.degree--;
        //si le graph n'est pas dirigé alors on supprime aussi l'arc dans destNode
        if(!this.directed && sourceNode!==destNode){
          delete destNode.edges["EdgeTo"+sourceNodeId];
          destNode.degree--;
        }
        this.fireEvent("refreshEdge",new DeleteEdgeEvent(this,sourceNode,destNode));
      }
    }
  }
}



/** 
 * Reset the weight of all edges in the graph
 *
 * @param value the new weight for all edges 
 */   
SimpleGraph.prototype.resetEdgesWeight = function(weight) {
  var nodeProp,
      edgeProp;
      //on recupere tout les noeuds du graph
  for (nodeProp in this.nodes) {
  //puis tout les arcs des noeuds
      for (edgeProp in this.nodes[nodeProp].edges) {
    //et on modifie un a un la valeur du poids de l'arc
      this.nodes[nodeProp].edges[edgeProp].weight=weight;
    }
  }
}



//return la profondeur du graph
SimpleGraph.prototype.profondeurGraph= function(firstNode){

 
	var queue = new Array();
	var prof = 0;
	var neighbors ;
	var currentneighbors;
	var current = this.nodes[firstNode];
	prof += 1;
	queue.push(current);
	current.profondeur = prof;
	do{
		// on sait qu’on a au moins une itération (traiter la racine)
		current = queue.shift();
		neighbors =current.getNeighbors();
		while( neighbors.hasNextNode() ){
			currentneighbors = neighbors.getNextNode();
			// on regarde si on l'a deja traité et la profondeur du noeud	
			if ( (current.profondeur+1) < currentneighbors.profondeur || currentneighbors.profondeur ==undefined){
				currentneighbors.profondeur = current.profondeur+1;
				queue.push(currentneighbors);
				//et on met a jours la profondeur si on a obtenue une plus élevée
				if(prof < currentneighbors.profondeur){
					prof =currentneighbors.profondeur;
				}
			}
			
		delete neighbors;
		}
	}while(queue.length >0)
	delete queue;
	
	return prof;
}
// retourne la largeur du graph
SimpleGraph.prototype.largeurGraph= function(firstNode){
	var largeur = 1;
	var list = new Array();
	var current = this.nodes[firstNode];
	var neighbors ;
	var currentneighbors;
	var NbVoisin = 1;
	var voisin = 0;

	list.push(current);
	current.visit=1;
	current.largeur=1;
	do{
		// on sait qu’on a au moins une itération (traiter la racine)
		// le but etant de traiter les noeuds niveau par niveau et de regarder la ou on en a le plus
		for(var i=0; i<  NbVoisin; i++){  
			current = list.shift();
			current.largeur= NbVoisin;
			neighbors =current.getNeighbors();
			while( neighbors.hasNextNode() ){
				currentneighbors = neighbors.getNextNode();
				//on regarde si le voisin est deja dans list ou deja visité
				if(list.indexOf(currentneighbors) == -1 && currentneighbors.visit == undefined){
					currentneighbors.visit = 1;
					list.push(currentneighbors);
					voisin += 1;
				}
			}
			delete neighbors;

		}
		//et on met a jours la largeur si on a obtenue une plus élevée
		if( list.length > largeur){
			largeur = list.length;
		}
		NbVoisin = voisin;
		voisin = 0;
	}while(list.length >0);
	delete list;
	
	return largeur;
}


//return la largeur d'un noeud
SimpleGraph.prototype.getlargeurGraph= function(Nb){
	return this.getNode(Nb).largeur;
}



//return la profondeur d'un noeud
SimpleGraph.prototype.getprofondeurGraph= function(Nb){
	return this.getNode(Nb).profondeur;
}


//return l'ensemble des noeuds d'une profondeur donnée
SimpleGraph.prototype.getprofondeur= function(profond){
	var solution = new Array();

	for(var propName in this.nodes ){
    		if(this.nodes[propName].profondeur==profond){
			solution.push(this.nodes[propName]);
		}
  	}

	return solution;
}


SimpleGraph.prototype.selectNode=function(id){
  // Test si l'id existe sinon renvoie une exception, ne pas oublier de mettre le try/catch quad on l'utilisera
  var currentNode=this.nodes["NodeId"+id];
  var neighbors=currentNode.getNeighbors();
  var currentneighbors;

  while(neighbors.hasNextNode()){
    currentneighbors=neighbors.getNextNode();
    currentneighbors.value.selected=2;
    this.fireEvent("refreshNode", new SelectNodeEvent(this,currentneighbors) );
  }

  currentNode.value.selected=1;
  this.fireEvent("refreshNode", new SelectNodeEvent(this,currentNode));
}


SimpleGraph.prototype.deselectNode=function(id){
  var currentNode=this.nodes["NodeId"+id];
  var neighbors=currentNode.getNeighbors();
  var currentneighbors;

  while(neighbors.hasNextNode()){
    currentneighbors=neighbors.getNextNode();
    currentneighbors.value.selected=0;
    this.fireEvent("refreshNode", new SelectNodeEvent(this,currentneighbors) );
  }

  currentNode.value.selected=0;
  this.fireEvent("refreshNode", new SelectNodeEvent(this,currentNode));
}

SimpleGraph.prototype.clone=function(){
  var cloneGraph =new SimpleGraph(this.directed);
  var dest;
  cloneGraph.disconnectViews();
  //~ cloneGraph.order= 0;
  for(var propName in this.nodes ){

    cloneGraph.addNode(this.nodes[propName].getId(),this.nodes[propName].getValue().getName());
  }
  for(var propName in cloneGraph.nodes ){
    for(var propEdge in this.nodes[propName].edges ){
      dest=cloneGraph.getNode(this.nodes[propName].edges[propEdge].getDestNode().getId());
      try{
        cloneGraph.addEdge(cloneGraph.nodes[propName],dest);
      }
      
      catch(e){
                
      }
    }
  }
  cloneGraph.connectViews();
  return cloneGraph;
  
}