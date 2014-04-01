var Tools=(function(){

	var	callGraph,
		treeGraph,
		currentType="",
		controller;

	return {

		callGraph:{

			setController:function(_controller){
				controller=_controller;
			},

			getController:function(){
				return controller;
			},

			setCurrentType:function(_type){
				currentType=_type;
			},

			getCurrentType:function(){
				return currentType;
			},

			setTreeGraph:function(_treeGraph){
				treeGraph=_treeGraph;
			},

			getTreeGraph:function(){
				return treeGraph;
			},

			setCallGraph:function(_callGraph){
				callGraph=_callGraph;
			},

			getCallGraph:function(){
				return callGraph;
			},

			initSwitchMode:function(){
				$('#choice_program_menu').slideUp('fast');
				$("#legend").css('visibility','visible');
				$("#infos_program").css('visibility','visible');
				$('#canvas').css('visibility','visible');
				$('#rightPage').css('visibility','visible');
				$('#navigation').css('visibility','visible');
			}

		},

		navigation:{

			initializeButtonListenner:function(button, functionName, functionCompile){

			}

		},

		isInteger: function(number){
		  if(number===undefined){
		  	return false;
		  }
		  if(number % 1===0){
		  	return true;
		  }else{
		  	return false;
		  }
		},

		isNode: function(node){
			if(node instanceof AbstractNode && node!==undefined){
				return true;
			}else{
				return false;
			}
		},

		nodeInGraph: function(id,graph){
			if(graph.getNode(id)!==undefined){
				return true;
			}else{
				return false;
			}
		},

		idAlreadyAdd:function(id,array){
			var bool=false;
			for(var i=0;i<array.length;i++){
				if(array[i]==id){
					bool = true;
				}
			}
			return bool;
		},


		convertTreeInGraph:function(root,directed){
			if(root == undefined || root == null){
				JSUtils.throwException("IllegalArgumentException", root);		
			}

			var newGraph=new SimpleGraph(directed),
				i=0,
				currentId=1,
				queue = new Array(),
				currentElement,
				neighbors,
				currentNeighbor;

			queue.unshift(root);
			root.convertionVisited=true;
			newGraph.addNode(currentId,root.constructor.name);
			root.nodeId=currentId;
			currentId++;

			while(queue.length>0){

				currentElement=queue.pop();

				neighbors=currentElement.getChildren();

				for(i=0;i<neighbors.length;i++){
					if(neighbors[i].convertionVisited===undefined){
						queue.unshift(neighbors[i]);
						neighbors[i].convertionVisited=true;
						newGraph.addNode(currentId,neighbors[i].constructor.name);
						neighbors[i].nodeId=currentId;
						currentId++;
					}
					newGraph.addEdge(newGraph.getNode(currentElement.nodeId),newGraph.getNode(neighbors[i].nodeId));
				}
			}
			return newGraph;
		},

		convertTreeInSimplyGraph:function(root,directed){
			if(root===undefined){
				return undefined;
			}

			var queue = new Array(),
				nameFunction = new Array(),
				myGraph = new SimpleGraph(directed);

			this.createNode(root,nameFunction,queue,myGraph);
			
			this.createEdge(queue,nameFunction,myGraph);
			
			return myGraph;
		},
		
		createNode : function(root,nameFunction,queue,myGraph){
			var currentElement,
				index;
			index=2;	
			for(var i=0; i< root.children[1].children.length; i++){
				currentElement=root.children[1].children[i];
				if(currentElement.children[0].name !="main"){
					
					currentElement.NodeId = index;
					nameFunction[currentElement.children[0].name] = currentElement.NodeId;
					queue.push(currentElement);
					myGraph.addNode(index,currentElement.children[0].name);
					index++;
				}else{
					currentElement.NodeId = 1;
					nameFunction[currentElement.children[0].name] = currentElement.NodeId;
					queue.push(currentElement);
					myGraph.addNode(1,currentElement.children[0].name);
				}
			}
		},
		
		createEdge : function(queue,nameFunction,myGraph){
			var currentElement,
			i,
			createEdge = new Array(),
			IdDest,IdSource,nameDest
			;
			while(queue.length >0){
				currentElement = queue.shift();
				createEdge=this.shearchFunctionCall(currentElement);
				
				if (createEdge.length !=0){
					IdSource=currentElement.NodeId;
					for(i=0;i<createEdge.length;i++){
						
						nameDest = createEdge[i].children[0].name; 
						IdDest= nameFunction[nameDest];
						if(IdDest != undefined){
							try{
								myGraph.addEdge(myGraph.getNode(IdSource),myGraph.getNode(IdDest));
							}
							catch(e){
								
							}
						}
					}
				}
			}
		},
		
		shearchFunctionCall:function(root){
			var queue = new Array(),
				functName = new Array(),
				currentElement,
				i,
				createEdge,
				currentNeighbor;
			root.visitedFunctCall=true;
			queue.push(root.children[3]);
			while(queue.length>0){
				
				currentElement = queue.shift();
				
				for( i=0; i< currentElement.children.length; i++){
					
					currentNeighbor = currentElement.children[i]
					
					if(currentNeighbor.constructor.name === "FunctionCallNode" && currentNeighbor.visitedFunctCall !=true){
						currentNeighbor.visitedFunctCall=true;
						functName.push(currentNeighbor);
					}else if(currentNeighbor.visitedFunctCall !=true && currentNeighbor.constructor.name != "FunctionCallNode" ){
						currentNeighbor.visitedFunctCall=true;
						queue.push(currentNeighbor);
					}
				}
			}	
			
			return functName;	
			
		}

	};
})();
