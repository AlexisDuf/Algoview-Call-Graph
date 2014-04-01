var AlgoUtils = {
	
	getTreeLevelsString : function(tree){
	
			if(tree == undefined || tree == null){
				JSUtils.throwException("IllegalArgumentException", tree);		
			}
			
			var queue = [];
			var levels = [];
			var nbNodes = 0;	
			var nblevels = 0;	
			
			queue.push( tree );		// a valid program tree has at least one node : ProgramNode
			tree.visited = true;
			tree.level = 0;
			
			while( queue.length > 0 ){

				nbNodes++;
				
				var node = queue[0];
				queue.splice(0,1);
				
				var nbChildren = node.getChildCount();
				
				if ( levels[ node.level ] == undefined ){
					levels[ node.level ] = node.level + " - ";
					nblevels = node.level + 1;
				}
				
				levels[ node.level ] += node.constructor.name + " ";

	
				
				for(var i=0; i<nbChildren; i++){
					
					var child = node.getChild(i);	
					
					if( !child.visited ){
						child.visited = true;
						child.level = node.level + 1;
						queue.push( child );
					}
					
				}			
				
				
			
			
			}
			
			var levelsStringRepresentation = "The program tree contains " + nbNodes + " nodes split into " + nblevels + " levels.\n";
			levelsStringRepresentation += "Detailed levels :\n";
			
			for(var i=0; i<levels.length; i++){
					levelsStringRepresentation += levels[i];
					levelsStringRepresentation += "\n";
			}
			
			return levelsStringRepresentation;
		
	}
	
	
}
