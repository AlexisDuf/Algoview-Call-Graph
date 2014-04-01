var SimpleGraphQUnitTestCampaign = {

	// test campaign definition ---------------------------------------------------------------------------------------------------------------------------------

	invalidIds : [-2, 0, 1.1, "bar"],
	
	invalidRefs : [undefined, null, 1, "foo", AbstractSimpleGraph, this],
	
	launch : function(directed){
		
		var graphTypeString = directed ? "Directed" : "Undirected";
		
		module(graphTypeString + " Graph");	
		
		
		// Nodes Creation
		
		test("Graph Creation : Nominal Case", function(){
			SimpleGraphQUnitTestCampaign.graphCreationTests(directed);
		});	


		// Nodes Insertion
		
		test("Node Insertion : Nominal Case : Default Value", function(){
			SimpleGraphQUnitTestCampaign.nodeInsertionTestsWithValidId(directed, 42);
		});	
		
		test("Node Insertion : Nominal Case : Fixed Value", function(){
			SimpleGraphQUnitTestCampaign.nodeInsertionTestsWithValidId(directed, 42, "Foo");
		});			

		test("Node Insertion : Error Cases : Invalid Id : Default Value", function(){
			for(var i=0; i<SimpleGraphQUnitTestCampaign.invalidIds.length; i++){
				SimpleGraphQUnitTestCampaign.nodeInsertionTestsWithInvalidId(directed, SimpleGraphQUnitTestCampaign.invalidIds[i]);
			}
		});	
		
		test("Node Insertion : Error Cases : Invalid Id : Fixed Value", function(){
			for(var i=0; i<SimpleGraphQUnitTestCampaign.invalidIds.length; i++){
				SimpleGraphQUnitTestCampaign.nodeInsertionTestsWithInvalidId(directed, SimpleGraphQUnitTestCampaign.invalidIds[i], "Foo");
			}
		});		

		test("Node Insertion : Error Cases : Already Existing Node ", function(){
			SimpleGraphQUnitTestCampaign.nodeInsertionTestsWithExistingId(directed, 42);
			SimpleGraphQUnitTestCampaign.nodeInsertionTestsWithExistingId(directed, 42, "Foo");			
		});	
	
	
		// Nodes Reset

		test("Nodes Reset : Nominal Case ", function(){
			SimpleGraphQUnitTestCampaign.resetNodeValuesTests(directed, 42, "bar", "foo");
		});	
			
			
		// Edge Insertion 		
		
		test("Edge Insertion : NominalCase : Default Weight", function(){
			SimpleGraphQUnitTestCampaign.edgeInsertionTestsWithValidIds(directed, 42, 3);		
		});		
		
		test("Edge Insertion : NominalCase : Fixed Weight", function(){
			SimpleGraphQUnitTestCampaign.edgeInsertionTestsWithValidIds(directed, 42, 3, 1.0);
		});				
		
		
		test("Edge Insertion : Error Cases : Invalid Reference : Default Weight", function(){
			for(var i=0; i<SimpleGraphQUnitTestCampaign.invalidRefs.length; i++){
				
				SimpleGraphQUnitTestCampaign.edgeOperationTestsWithInvalidRefs("addEdge", "add", directed, SimpleGraphQUnitTestCampaign.invalidRefs[i]);
			}
		});			
		
		test("Edge Insertion : Error Cases : Invalid Reference : Fixed Weight", function(){
			for(var i=0; i<SimpleGraphQUnitTestCampaign.invalidRefs.length; i++){
				
				SimpleGraphQUnitTestCampaign.edgeOperationTestsWithInvalidRefs("addWeightedEdge", "add", directed, SimpleGraphQUnitTestCampaign.invalidRefs[i], 1.0);
			}
		});	
		
		
		test("Edge Insertion : Error Cases : Unexisting Node ", function(){
			SimpleGraphQUnitTestCampaign.edgeOperationTestsWithUnexistingNodes("addEdge", "add", directed);			
			SimpleGraphQUnitTestCampaign.edgeOperationTestsWithUnexistingNodes("addWeightedEdge", "add", directed, 1.0);
		});		
		
		
		test("Edge Insertion : Error Cases : Already Existing Edge ", function(){
			SimpleGraphQUnitTestCampaign.edgeInsertionTestsWithAlreadyExistingEdge(directed);			
			SimpleGraphQUnitTestCampaign.edgeInsertionTestsWithAlreadyExistingEdge(directed, 1.0);
		});		
		
		
		// Edge Access 	
				
		test("Edge Access : Error Cases : Unexisting Node ", function(){
			SimpleGraphQUnitTestCampaign.edgeOperationTestsWithUnexistingNodes("getEdgeWeight", "get the weight of", directed);			
			SimpleGraphQUnitTestCampaign.edgeOperationTestsWithUnexistingNodes("setEdgeWeight", "set the weight of", directed, 1.0);

		});		
		
		test("Edge Access : Error Cases : Unexisting Edge ", function(){
			SimpleGraphQUnitTestCampaign.edgeOperationTestsWithUnexistingEdge("getEdgeWeight", "get the weight of", directed, 42);	
			SimpleGraphQUnitTestCampaign.edgeOperationTestsWithUnexistingEdge("setEdgeWeight", "set the weight of", directed, 42, 1.0);
		});	
				
		test("Edge Access : Getter : Error Cases : Invalid Reference", function(){
			for(var i=0; i<SimpleGraphQUnitTestCampaign.invalidRefs.length; i++){
				SimpleGraphQUnitTestCampaign.edgeOperationTestsWithInvalidRefs("getEdgeWeight", "get the weight of", directed, SimpleGraphQUnitTestCampaign.invalidRefs[i]);
			}
		});		
		
		test("Edge Access : Setter : Nominal Case", function(){
			SimpleGraphQUnitTestCampaign.edgeSetterTestsWithValidIds(directed, 42, 1.0, 2.0);
		});					

		test("Edge Access : Setter : Error Cases : Invalid Reference", function(){
			for(var i=0; i<SimpleGraphQUnitTestCampaign.invalidRefs.length; i++){
				SimpleGraphQUnitTestCampaign.edgeOperationTestsWithInvalidRefs("setEdgeWeight", "get the weight of", directed, SimpleGraphQUnitTestCampaign.invalidRefs[i], 1.0);
			}
		});		


		// Edges Reset

		test("Edges Reset : Nominal Case ", function(){
			SimpleGraphQUnitTestCampaign.resetEdgesWeightTests(directed, 42, 1.0);
			SimpleGraphQUnitTestCampaign.resetEdgesWeightTests(directed, 42, 1.0, 0.0);	

		});	
		
		
		
		// Edge Removal 
		
		test("Edge Removal : Nominal Case : Default Weight", function(){
			SimpleGraphQUnitTestCampaign.edgeRemovalTestsWithValidIds(directed, 42);	
		});		

		test("Edge Removal : Nominal Case : Fixed Weight", function(){
			SimpleGraphQUnitTestCampaign.edgeRemovalTestsWithValidIds(directed, 42, 1.0);	
		});				
		
		test("Edge Removal : Error Cases : Invalid Reference ", function(){
			for(var i=0; i<SimpleGraphQUnitTestCampaign.invalidRefs.length; i++){
				SimpleGraphQUnitTestCampaign.edgeOperationTestsWithInvalidRefs("removeEdge", "remove", directed, SimpleGraphQUnitTestCampaign.invalidRefs[i]);
			}
		});			
		
		test("Edge Removal : Error Cases : Unexisting Node ", function(){
			SimpleGraphQUnitTestCampaign.edgeOperationTestsWithUnexistingNodes("removeEdge", "remove", directed);			
		});	
		
		test("Edge Removal : Error Cases : Unexisting Edge ", function(){
			SimpleGraphQUnitTestCampaign.edgeOperationTestsWithUnexistingEdge("removeEdge", "remove", directed, 42);			
		});		
			
			
		// Node Removal 		
		
		test("Node Removal : Nominal Case ", function(){
			SimpleGraphQUnitTestCampaign.nodeRemovalTestsWithExistingId(directed, 42);
		});	

		test("Node Removal : Error Cases : Invalid Reference ", function(){
			for(var i=0; i<SimpleGraphQUnitTestCampaign.invalidRefs.length; i++){
				SimpleGraphQUnitTestCampaign.nodeRemovalTestsWithInvalidRefs(directed, SimpleGraphQUnitTestCampaign.invalidRefs[i]);
			}			
		});	

		test("Node Removal : Error Cases : Unexisting Node ", function(){
			SimpleGraphQUnitTestCampaign.nodeRemovalTestsWithUnexistingNode(directed);	

		});		
	},

	// graph creation tests ---------------------------------------------------------------------------------------------------------------------------------

	graphCreationTests : function(directed){
		
		var graph = new SimpleGraph(directed); 
		var notString = directed ? "" : "not";
		
		strictEqual( graph.getOrder(), 0, "The order of an empty graph is 0");	
		strictEqual( graph.isDirected(), directed, "The graph is " + notString + " directed");	
	},


	// node insertion tests ---------------------------------------------------------------------------------------------------------------------------------


	nodeInsertionTestsWithValidId : function(directed, validId, value){
		
		// Test set up : an empty graph
		
		// Test description : a node identified by validId is added ; its properties are retrieved
		
		// Dependencies : SimpleGraph Constructor, getOrder

		var graph = new SimpleGraph(directed); 

		var graphOrder = graph.getOrder();
		
		strictEqual( graph.getNode(validId), undefined, "The node of id " + validId + " does not exist before beeing added");	
		
		var valueDescriptionString = this.getValueDescriptionString(value);
		
		var operator = (value === undefined) ? graph["addNode"] : graph["addValuedNode"];	
		
		var newNode = operator.apply(graph, [validId, value]);		// node insertion
		
		notEqual(newNode, undefined, "The node of id " + validId + " has been successfully added with " + valueDescriptionString + " (the returned reference is defined)");	

		var newGraphOrder = graph.getOrder();
		var expectedOrderEvol = 1;
		
		strictEqual( newGraphOrder - graphOrder, expectedOrderEvol, "The order of the graph " + this.getEvolDescriptionString(expectedOrderEvol));
	
		var retreivedNode = graph.getNode(validId);
		
		notEqual(retreivedNode, undefined, "The node of id " + validId + " exists after beeing added");	
		
		strictEqual(retreivedNode.getId(), validId, "Getting the id of the node of id " + validId + " gives " + validId);	
		
		var expectedDegree = 0;
		
		strictEqual(retreivedNode.getDegree(), expectedDegree, "Getting the degree of the node of id " + validId + " gives " + expectedDegree);	

		strictEqual(this.getNeighborhoodSize(retreivedNode), expectedDegree, "Counting the neighbors of the node of id " + validId + " also gives " + expectedDegree);	

		strictEqual(retreivedNode.getValue(), value, "Getting the value of the node of id " + validId + " gives " + value);	
	},

	nodeInsertionTestsWithInvalidId : function(directed, invalidId, value){
		
		// Test set up : a empty graph
		// Dependencies : SimpleGraph Constructor, getOrder
			
		var graph = new SimpleGraph(directed); 
		var graphOrder = graph.getOrder();
		
		var operator = (value === undefined) ? graph["addNode"] : graph["addValuedNode"];			
		var valueDescriptionString = this.getValueDescriptionString(value);

		throws( function(){ operator.apply(graph, [invalidId, value]); }, InvalidIdException, "An InvalidIdException is thrown when trying to insert a node with the invalid id " + invalidId + " and " + valueDescriptionString);
		
		throws( function(){ graph.getNode(invalidId); }, InvalidIdException, "An InvalidIdException is thrown when trying to get the node with the invalid id " + invalidId );
			
		var newGraphOrder = graph.getOrder();
		
		strictEqual( newGraphOrder - graphOrder, 0, "The order of the graph has not changed after this trial");
	},

	nodeInsertionTestsWithExistingId : function(directed, id, value){
		
		// Test set up : an empty graph
		// Dependencies : SimpleGraph Constructor, addNode[nominal]
		
		var graph = new SimpleGraph(directed); 
		var valueDescriptionString = this.getValueDescriptionString(value);		
		var operator = (value === undefined) ? graph["addNode"] : graph["addValuedNode"];	
				
		graph.addNode(id);

		throws( function(){ operator.apply(graph, [id, value]); }, AlreadyExistingNodeException, "An AlreadyExistingNodeException is thrown when trying to insert a node with the already existing id " + id + " and " + valueDescriptionString);
	},


	// resetNodeValues tests ------------------------------------------------------------------------------------------------------------------------------


	resetNodeValuesTests : function(directed, nbNodes, value, initValue){
		
		// Test set up : a graph with 42 nodes 1, 2, ..., 42 
		// Dependencies : SimpleGraph Constructor, addNode[nominal]
			
		var graph = new SimpleGraph(directed); 

		var minId = 1;
		var maxId = nbNodes;
		
		var operator = (initValue === undefined) ? graph["addNode"] : graph["addValuedNode"];
		
		
		for(var i=minId; i<=maxId; i++){
			operator.apply(graph, [i, initValue]);
		}
		

		graph.resetNodesValue(value);
		
		var initValueDescription = this.getValueDescriptionString(initValue); 
		ok( this.checkNodesValues(graph, minId, maxId, value), "After reset, the value of nodes from id " + minId + " to id " + maxId + " (initialized to " + initValueDescription + ") is " + value);	
	},


	// node removal tests ---------------------------------------------------------------------------------------------------------------------------------


	nodeRemovalTestsWithExistingId : function(directed, id){
		
		// Test set up : a graph with :
		// 	* 5 nodes id(N), id+1(P1), id+2(P2), id+3(S1), id+4(S2)
		//	* 10 edges : P1 -> (S1, S2, P2, N), N -> (S1, S2), P2 -> (S1, N), S2 -> (S1, P2)
		// id is assumed valid in the graph
		// Dependencies : SimpleGraph Constructor, getOrder, addNode[nominal], getDegree, NodeIterator, addEdge[nominal]
		
		var graph = new SimpleGraph(directed); 
		
		var N = graph.addNode(id);
		var P1 = graph.addNode(id+1);
		var P2 = graph.addNode(id+2);
		var S1 = graph.addNode(id+3);
		var S2 = graph.addNode(id+4);	
		
		graph.addEdge(P1, S1);
		graph.addEdge(P1, P2);
		graph.addEdge(P1, N);	
		graph.addEdge(N, S1);
		graph.addEdge(N, S2);
		graph.addEdge(P2, N);	
		graph.addEdge(S2, S1);	
		graph.addEdge(S2, P2);
		graph.addEdge(P1, S2);
		graph.addEdge(P2, S1);
		

		var graphOrder = graph.getOrder();
		var P1Degree = P1.getDegree();
		var P2Degree = P2.getDegree();
		var S1Degree = S1.getDegree();
		var S2Degree = S2.getDegree();
			
		graph.removeNode(N);
		
		
		strictEqual( graph.getNode(id), undefined, "The node of id " + id + " does not exist after removal");	
			
		var newGraphOrder = graph.getOrder();
		
		var expectedOrderEvol = -1;
		
		strictEqual( newGraphOrder - graphOrder, expectedOrderEvol, "The order of the graph " + this.getEvolDescriptionString(expectedOrderEvol));

		// predecessors checks
		this.checkDegree(P1, P1Degree, P1.getDegree(), -1, "P1", "a predecessor of the node of id " + id);
		ok( !this.isNeighbor(P1, N), "The node of id " + id + " is not in the neighborhood of P1 anymore");
		
		this.checkDegree(P2, P2Degree, P2.getDegree(), -1, "P2", "a predecessor of the node of id " + id);
		ok( !this.isNeighbor(P2, N), "The node of id " + id + " is not in the neighborhood of P2 anymore");		

		// successors checks
		var expectedDegreeEvol = directed ? 0 : -1;

		this.checkDegree(S1, S1Degree, S1.getDegree(), expectedDegreeEvol, "S1", "a successor of the node of id " + id);		
		this.checkDegree(S2, S2Degree, S2.getDegree(), expectedDegreeEvol, "S2", "a successor of the node of id " + id);	
		
		// edges checks
		throws( function(){ graph.getEdgeWeight(P1, N); }, UnexistingNodeException, "An UnexistingNodeException is thrown when trying to get the value of the incoming edge P1->N");
		throws( function(){ graph.getEdgeWeight(P2, N); }, UnexistingNodeException, "An UnexistingNodeException is thrown when trying to get the value of the incoming edge P2->N");
		throws( function(){ graph.getEdgeWeight(N, S1); }, UnexistingNodeException, "An UnexistingNodeException is thrown when trying to get the value of the outgoing edge N->S1");
		throws( function(){ graph.getEdgeWeight(N, S2); }, UnexistingNodeException, "An UnexistingNodeException is thrown when trying to get the value of the incoming edge N->S2");
	},
	
	
	nodeRemovalTestsWithInvalidRefs : function(directed, nodeRef){
		
		// Test set up : an empty graph

		// Dependencies : SimpleGraph Constructor		

		var graph = new SimpleGraph(directed); 		

		throws( function(){ graph.removeNode(nodeRef); }, InvalidReferenceException, "An InvalidReferenceException is thrown when trying to remove a node with a reference on the type " + this.getObjectType(nodeRef));
	},	
	
	
	// node removal tests ---------------------------------------------------------------------------------------------------------------------------------


	nodeRemovalTestsWithUnexistingNode : function(directed){
		
		// Test set up : a graph G1 with one node N1, and a graph G2 with one node N2
		
		// Test description : tries to remove to the node N2 in G1 or N1 in G2

		// Dependencies : SimpleGraph Constructor, addNode[nominal]		

		var G1 = new SimpleGraph(directed); 
		var N1 = G1.addNode(42);		
		
		var G2 = new SimpleGraph(directed); 
		var N2 = G2.addNode(42);

		throws( function(){ G1.removeNode(N2); }, UnexistingNodeException, "An UnexistingNodeException is thrown when trying to remove a node N2 in G1, which belongs to another graph G2");						
		throws( function(){ G1.removeNode(N2); }, UnexistingNodeException, "An UnexistingNodeException is thrown when trying to remove a node N1 in G2, which belongs to another graph G1");							
	},
		

	// edge insertion tests ---------------------------------------------------------------------------------------------------------------------------------


	edgeInsertionTestsWithValidIds : function(directed, validId, nbEdges, weight){

		// Test set up : an empty graph
		
		// Test description : 
		//  * nbEdges nodes are created : N, S[1], ..., S[nbEdges]
		//	* 2*nbEdges + 1 edges are created : N->N, N->S[1], ... N->S[nbEdges] and S[1]->N, ... S[nbEdges]->N
		//  * weights of edges and nodes degrees are checked
		//  * results must differ on directed and undirected graphs
		
		// Assumptions : validId is a valid id and weight a number
		// Dependencies : SimpleGraph Constructor, addNode[nominal], getDegree, NodeIterator

		var graph = new SimpleGraph(directed); 
		var weightDescriptionString;
		
		var N = graph.addNode(validId);
		var NDegree = N.getDegree();
		
		var S = [];
		var SDegree = [];
		var operator = (weight === undefined) ? graph["addEdge"] : graph["addWeightedEdge"];	
		
		// loop N->N
		operator.apply(graph, [N, N, weight]);		// edge insertion
		weightDescriptionString = this.getValueDescriptionString(weight);
		strictEqual( graph.getEdgeWeight(N, N), weight, "The edge N->N has been successfully added and its weight is equal to " + weightDescriptionString);		
		
		//outgoing edges N->Si
		for(var i=1; i<=nbEdges; i++){	
			S[i] = graph.addNode(validId+i);				// node insertion
			SDegree[i] = S[i].getDegree();
		}
		
		for(var i=1; i<=nbEdges; i++){	
			weight = this.increment(weight);
			operator.apply(graph, [N, S[i], weight]);		// edge insertion
			weightDescriptionString = this.getValueDescriptionString(weight);
			strictEqual( graph.getEdgeWeight(N, S[i]), weight, "The edge N->S" + i + " has been successfully added and its weight is equal to " + weightDescriptionString);
		}

		//incoming edges Si->N
		for(var i=1; i<=nbEdges; i++){	
			
			weight = this.increment(weight);
			weightDescriptionString = this.getValueDescriptionString(weight);	
							
			// if the graph is not directed, we don't try to add the edge B->A when the edge A->B exists
			// this case, which should lead to an AlreadyExistingEdgeException, is tested in the appropriate Error Case							
			if(directed){
				operator.apply(graph, [S[i], N, weight]);		// edge insertion
				strictEqual( graph.getEdgeWeight(S[i], N), weight, "The edge S" + i + "->N has been successfully added and its weight is equal to " + weightDescriptionString);
			}
		}	
		
		//nodes degrees
		this.checkDegree(N, NDegree, N.getDegree(), nbEdges+1, "N", "");

		for(var i=1; i<=nbEdges; i++){	
			this.checkDegree(S[i], SDegree[i], S[i].getDegree(), 1, "S"+i, "");			
		}
		
		//nodes neighborhood 
		for(var i=1; i<=nbEdges; i++){	
			ok( this.isNeighbor(N, S[i]), "S" + i + " is in the neighborhood of N");				
		}
		
		for(var i=1; i<=nbEdges; i++){	
			ok( this.isNeighbor(S[i], N), "N is in the neighborhood of S" + i);		
		}		
	},
	
	

	// edge removal tests ---------------------------------------------------------------------------------------------------------------------------------

	
	edgeRemovalTestsWithValidIds : function(directed, validId, weight){

		// Test set up : a graph with the edges N1->N1 (loop), N1->N2, N1->N3, N3->N1 (if directed)
		
		// Test description : the consequences of the edge removals must be different on directed/undidrected graphs
		
		// Assumptions : validId is a valid id and weight a number
		// Dependencies : SimpleGraph Constructor, addNode[nominal], addEdge[nominal], getDegree, NodeIterator		
		

		var graph = new SimpleGraph(directed); 
		
		var N1 = graph.addNode(validId);
		var N2 = graph.addNode(validId+1);
		var N3 = graph.addNode(validId+2);

		var weightDescriptionString = this.getValueDescriptionString(weight);	

		var operator = (weight === undefined) ? graph["addEdge"] : graph["addWeightedEdge"];	
	
		operator.apply(graph, [N1, N1, weight]);
		operator.apply(graph, [N1, N2, weight]);	
		
		if(directed === true){			
			operator.apply(graph, [N3, N1, weight]);
			operator.apply(graph, [N1, N3, weight]);
		}
	
		// loop N1 -> N1 removal

		var N1Degree = N1.getDegree();
		var N2Degree = N2.getDegree();
		var N3Degree = N3.getDegree();		
		graph.removeEdge(N1, N1);
		throws( function(){ graph.getEdgeWeight(N1,N1);  }, UnexistingEdgeException, "The loop N1->N1 with a weight equal to " + weightDescriptionString + " does not exist after removal of N1->N1" );
		this.checkDegree(N1, N1Degree, N1.getDegree(), -1, "N1", "");			
		ok( !this.isNeighbor(N1, N1), "N1 is not in the neighborhood of N1");							

		// edge N1 -> N2 removal
		N1Degree = N1.getDegree();
		N2Degree = N2.getDegree();
		N3Degree = N3.getDegree();
		graph.removeEdge(N1, N2);
		
		throws( function(){ graph.getEdgeWeight(N1,N2);  }, UnexistingEdgeException, "The edge N1->N2 with a weight equal to " + weightDescriptionString + " does not exist after removal of N1->N2");
		this.checkDegree(N1, N1Degree, N1.getDegree(), -1, "N1", "");			
		ok( !this.isNeighbor(N1, N2), "N2 is not in the neighborhood of N1");		
				
		throws( function(){ graph.getEdgeWeight(N2,N1);  }, UnexistingEdgeException, "The edge N2->N1 with a weight equal to " + weightDescriptionString + " does not exist after removal of N1->N2");
		
		var expectedDegreeEvol = directed ? 0 : -1;
		
		this.checkDegree(N2, N2Degree, N2.getDegree(), expectedDegreeEvol, "N2", "");			
		
		ok( !this.isNeighbor(N2, N1), "N1 is not in the neighborhood of N2");	
		ok( !this.isNeighbor(N1, N2), "N2 is not in the neighborhood of N1");	

		// edge N1 -> N3 removal
	
		if(directed === true){
			graph.removeEdge(N1, N3);
			strictEqual( graph.getEdgeWeight(N3, N1), weight, "The edge N3->N1 with a weight equal to " + weightDescriptionString + " still exists after removal of N1->N3");
			this.checkDegree(N3, N3Degree, N3.getDegree(), 0, "N3", "");			
			ok( !this.isNeighbor(N1, N3), "N1 is not in the neighborhood of N3");
			ok( this.isNeighbor(N3, N1), "N3 is still in the neighborhood of N1");	
		}
	},	
	
	// edgeSetterTests tests ------------------------------------------------------------------------------------------------------------------------------
	
	edgeSetterTestsWithValidIds : function(directed, validId, initWeight, newWeight){

		// Test set up : a graph with a edge N1->N2
		
		// Dependencies : SimpleGraph Constructor, addNode[nominal], addWeightedEdge[nominal]
		
		var graph = new SimpleGraph(directed); 
		
		var N1 = graph.addNode(validId);
		
		var N2 = graph.addNode(validId+1);		
		
		graph.addWeightedEdge(N1, N2, initWeight);
		
		if(directed === true){
			graph.addWeightedEdge(N2, N1, initWeight);
		}
		
		graph.setEdgeWeight(N1, N2, newWeight);
		
		strictEqual( graph.getEdgeWeight(N1, N2), newWeight, "The edge N1->N2 (with an initial weight equal to  " + initWeight + ") has a weight equal to " + newWeight + " after calling the setter on N1->N2");
		
		if(directed === true){
			strictEqual( graph.getEdgeWeight(N2, N1), initWeight, "The edge N2->N1 (with an initial weight equal to  " + initWeight + ") has still a weight equal to " + initWeight + " after calling the setter on N1->N2");
		}else{
			strictEqual( graph.getEdgeWeight(N2, N1), newWeight, "The edge N2->N1 (with an initial weight equal to  " + initWeight + ") has a weight equal to " + newWeight + " after calling the setter on N1->N2");
		}
	},
	
	// resetEdgesWeight tests ------------------------------------------------------------------------------------------------------------------------------

	checkEdgesWeight : function(graph, reverse, source, S, nbEdges, weight){

		if(reverse === true){
			for(var i=0; i<nbEdges; i++){
				if( graph.getEdgeWeight( S[i], source  ) != weight ){
					return false;
				}
			}				
			
		}
		else{	
			for(var i=0; i<nbEdges; i++){
				if( graph.getEdgeWeight( source, S[i] ) != weight ){
					return false;
				}
			}	
		}
		
		return true;
	},

	resetEdgesWeightTests : function(directed, nbEdges, weight, initWeight){
		
		// Test set up : a graph weight edges N -> (S1, S2, ..., SnbEdges)
		 
		// Dependencies : SimpleGraph Constructor, addNode[nominal], addEdge[nominal], getNode[nominal]
			
		var graph = new SimpleGraph(directed); 
		var initWeightDescription = this.getValueDescriptionString(initWeight);


		var source = graph.addNode(1);
		var minId = 2;
		var maxId = nbEdges+1;
		var S = [];
		
		for(var i=minId; i<=maxId; i++){
			S[i - minId] = graph.addNode(i);
		}

		var operator = (initWeight === undefined) ? graph["addEdge"] : graph["addWeightedEdge"];
		
		for(var i=0; i<nbEdges; i++){
			operator.apply(graph, [ source, S[i], initWeight ]);
		}	

		graph.resetEdgesWeight(weight);
		
		ok( this.checkEdgesWeight(graph, false, directed, source, S, nbEdges, weight), "After reset, the weight of all the edges N -> Si, i in [" + minId + "," + maxId + "] (initialized to " + initWeightDescription + ") is " + weight);	

		if(!directed === false){
			ok( this.checkEdgesWeight(graph, true, directed, source, S, nbEdges, weight), "After reset, the weight of all the edges Si, i in [" + minId + "," + maxId + "] (initialized to " + initWeightDescription + ") -> N is " + weight);				
		}
	},
	
	// generic tests on edges operations generating errors ---------------------------------------------------------------------------------------------------------------------------------
	
	edgeOperationTestsWithUnexistingEdge : function(operatorString, operationDescription, directed, validId, weight){
		
		// Test set up : a graph G1 with two nodes N1 and N2 but no edge between them
		
		// Test description : tries to perform an operation on the unexisting edge N1->N2

		// Dependencies : SimpleGraph Constructor, addNode[nominal]		

		var graph = new SimpleGraph(directed); 
		var N1 = graph.addNode(validId);		
		var N2 = graph.addNode(validId+1);
		
		var weightDescriptionString = (weight === undefined) ? "" : "to " + weight;	
		
		var graphOperator = graph[operatorString];			

		
		throws( function(){ graphOperator.apply(graph, [N1, N2, weight]); }, UnexistingEdgeException, "An UnexistingEdgeException is thrown when trying to " + operationDescription + " an unexisting edge " + weightDescriptionString);						
	},
	

	edgeOperationTestsWithInvalidRefs : function(operatorString, operationDescription, directed, invalidRef, weight){

		// Test set up : a graph with one node (valid ref)
		
		// Test description : tries to perform an operation on edges in the following cases : InvalidRef-InvalidRef, ValidRef-InvalidRef,  InvalidRef-ValidRef
		
		// Assumptions : invalidRef is an invalid reference (not a reference on an AbstractNode instance)
		// Dependencies : SimpleGraph Constructor, addNode[nominal]
		
		var graph = new SimpleGraph(directed); 
		var node = graph.addNode(42);
		
		this.checkNodeRefsInEdgeOperation(operatorString, operationDescription, graph, node, invalidRef, weight);
		this.checkNodeRefsInEdgeOperation(operatorString, operationDescription, graph, invalidRef, node, weight);
		this.checkNodeRefsInEdgeOperation(operatorString, operationDescription, graph, invalidRef, invalidRef, weight);
	},


	edgeOperationTestsWithUnexistingNodes : function(operatorString, operationDescription, directed, weight){
		
		// Test set up : a graph G1 with one node N1, and a graph G2 with one node N2
		
		// Test description : tries to access to edge N1->N2 in G1

		// Dependencies : SimpleGraph Constructor, addNode[nominal]		

		var G1 = new SimpleGraph(directed); 
		var G1operator;
		var weightDescription = (weight === undefined) ? "" : weightDescription = " with a weight equal to " + this.getValueDescriptionString(weight);	
		
		var G1operator = G1[operatorString];
					
		var N1 = G1.addNode(42);		
		
		var G2 = new SimpleGraph(directed); 
		var N2 = G2.addNode(42);

		throws( function(){ G1operator.apply(G1, [N1, N2, weight]); }, UnexistingNodeException, "An UnexistingNodeException is thrown when trying to " + operationDescription + " an edge between nodes of differents graphs " + weightDescription);						
	},
	
	edgeInsertionTestsWithAlreadyExistingEdge : function(directed, weight){
		
		// Test set up : a graph G1 with two nodes N1 and N2 and an edge N1->N2
		
		// Test description : tries to add the edge N1->N2 again, then N2->N1

		// Dependencies : SimpleGraph Constructor, addNode[nominal]		
			
		var graph = new SimpleGraph(directed); 
		
		var N1 = graph.addNode(42);
		var N2 = graph.addNode(43);
		var weightDescriptionString = this.getValueDescriptionString(weight);	
		
		graph.addEdge(N1, N2);
		
		var operator = (weight === undefined) ? graph["addEdge"] : graph["addWeightedEdge"];	
					
		throws( function(){ operator.apply(graph, [N1, N2, weight]); }, AlreadyExistingEdgeException, "An AlreadyExistingEdgeException is thrown when trying to add the already exising edge N1->N2 with a weight equal to " + weightDescriptionString );				
	},

	// Utility functions --------------------------------------------------------------------------------------------------


	increment : function(n){
		if(n != undefined){
				n++;
		}
		
		return n;
	},
	
	getNeighborhoodSize : function(refNode){
		
			var neighbors = refNode.getNeighbors();
			var neighborhoodSize = 0;
			var currentNgb;
			
			while( neighbors.hasNextNode() ){
					neighborhoodSize++;
					currentNgb = neighbors.getNextNode();
			}
			
			return neighborhoodSize;
	},


	isNeighbor : function(refNode, potentialNgb){
		
			var neighbors = refNode.getNeighbors();
			var currentNgb;
			
			while( neighbors.hasNextNode() ){
			
					currentNgb = neighbors.getNextNode();
					
					if( potentialNgb == currentNgb ){
							return true;
					}
			}
			
			return false;
	},

	getValueDescriptionString : function(value){
		
			return ( value === undefined ) ? "the default value" : "the value " + value;
	},

	checkNodesValues : function(graph, minId, maxId, nodesValues){

			for(var i=minId; i<=maxId; i++){
				
				if(graph.getNode(i).getValue() != nodesValues){
						return false;
				}
			}
			
			return true;
	},

	getEvolDescriptionString : function(n){
		
		if(n == 0){
			return "has not changed";
		}
		else if(n > 0){
			return "has been increased of " + n;
		}
		else{
			return "has been decreased of " + (n * -1);
		}
	},

	checkDegree : function(node, oldDegree, newDegree, degreeEvol, nodeName, nodeDescription){
		var degreeEvolDescriptionString = this.getEvolDescriptionString(degreeEvol);
		
		nodeDescription = (nodeDescription == "") ? nodeDescription : "(" + nodeDescription + ")";
		
		strictEqual(newDegree - oldDegree, degreeEvol, "The degree of " + nodeName + " " + nodeDescription + " " + degreeEvolDescriptionString + " (equal to " + newDegree + ")");
		strictEqual(this.getNeighborhoodSize(node), newDegree, "Counting the neighbors of " + nodeName + " gives " + newDegree);			
	},
	
	checkNodeRefsInEdgeOperation : function(operatorString, operationDescription, graph, nodeRef1, nodeRef2, weight){
		
		var weightDescriptionString = (weight === undefined) ? "" : " with a weight equal to " + this.getValueDescriptionString(weight);	
		
		var graphOperator = graph[operatorString];		
		
		throws( function(){ graphOperator.apply(graph, [nodeRef1, nodeRef2, weight]); }, InvalidReferenceException, "An InvalidReferenceException is thrown when trying to " + operationDescription + " an edge with references on the types " + this.getObjectType(nodeRef1) + " and " + this.getObjectType(nodeRef2) + weightDescriptionString);
	},
	
	getObjectType : function(obj) { 
		
	   if(obj == null || obj == undefined){
			return obj;
		}
		
	   return obj.constructor.name;
	}
};


// test campaign execution ---------------------------------------------------------------------------------------------------------------------------------

SimpleGraphQUnitTestCampaign.launch(true);	// directed graphs
SimpleGraphQUnitTestCampaign.launch(false);  // undirected graphs



