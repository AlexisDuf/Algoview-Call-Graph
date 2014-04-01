function testSvgView(){
	this.shapes = [];
	
};

testSvgView.prototype = new SvgView();

testSvgView.prototype.test=function(){
	var result=0;
	var nbTest=0;
	if(this.testCreationSvgView1(true)){
		result++;
	};
	nbTest++;
	if(this.testCreationSvgView2(true)){
		result++;
	};
	nbTest++;
	if(this.testCreationSvgView3(true)){
		result++;
	};
	nbTest++;
	if(this.testCreationSvgView4(true)){
		result++;
	};
	nbTest++;
	if(this.testCreationSvgView5(true)){
		result++;
	};
	nbTest++;
	if(this.testCreationSvgView6(true)){
		result++;
	};
	nbTest++;

}

testSvgView.prototype.testCreationSvgView1=function(del){
	var myGraph = new SimpleGraph(false);
	
	var node;
	var destNode;
	var nbNodeRaph,nbEdgeRaph;
	for (var i = 1; i <= 4; i++) {
			myGraph.addNode(i,"er"+i);
		};
		
	node = myGraph.getNode(1);
	destNode = myGraph.getNode(2);
	myGraph.addEdge(node,destNode);
	destNode = myGraph.getNode(3);
	myGraph.addEdge(node,destNode);
	destNode = myGraph.getNode(4);
	myGraph.addEdge(node,destNode);
	
	node = myGraph.getNode(2);
	destNode = myGraph.getNode(3);
	myGraph.addEdge(node,destNode);	
	
	Raph = this.buildView(myGraph,"NodeId1",800,800,"hsb(10, 100, 100)","#BF2764");
	nbNodeRaph=0;
	for(var i =0; i < Raph.canvas.childNodes.length; i++){
		if(Raph.canvas.childNodes[i].nodeName=="rect"){
		nbNodeRaph++;
		}
	};
	nbEdgeRaph=0;
	for(var i =0; i < Raph.canvas.childNodes.length; i++){
		if(Raph.canvas.childNodes[i].nodeName=="path"){
		nbEdgeRaph++;
		}
	};


	if(del == true){
		var canvas1=document.getElementById('canvas').children[0];
		$(canvas1).remove();
	}
	if(4 == nbNodeRaph && 4 ==nbEdgeRaph){
		return true;
	}else{
		return false;
	}
	
};

testSvgView.prototype.testCreationSvgView2=function(del){
	var myGraph = new SimpleGraph(true);
	
	var node;
	var destNode;
	var nbNodeRaph,nbEdgeRaph;
	for (var i = 1; i <= 5; i++) {
			myGraph.addNode(i,"er"+i);
		};
		
	node = myGraph.getNode(1);
	destNode = myGraph.getNode(2);
	myGraph.addEdge(node,destNode);
	destNode = myGraph.getNode(5);
	myGraph.addEdge(node,destNode);

	node = myGraph.getNode(2);
	destNode = myGraph.getNode(3);
	myGraph.addEdge(node,destNode);
	destNode = myGraph.getNode(4);
	myGraph.addEdge(node,destNode);

	node = myGraph.getNode(3);
	destNode = myGraph.getNode(2);
	myGraph.addEdge(node,destNode);
	
	node = myGraph.getNode(4);
	destNode = myGraph.getNode(3);
	myGraph.addEdge(node,destNode);	
	destNode = myGraph.getNode(4);
	myGraph.addEdge(node,destNode);	
	destNode = myGraph.getNode(5);
	myGraph.addEdge(node,destNode);	

	
	Raph = this.buildView(myGraph,"NodeId1",800,800,"hsb(10, 100, 100)","#BF2764");
	nbNodeRaph=0;
	for(var i =0; i < Raph.canvas.childNodes.length; i++){
		if(Raph.canvas.childNodes[i].nodeName=="rect"){
		nbNodeRaph++;
		}
	};
	nbEdgeRaph=0;
	
	for(var i =0; i < Raph.canvas.childNodes.length; i++){
		if(Raph.canvas.childNodes[i].nodeName=="path"){
		nbEdgeRaph++;
		}
	};

	if(del == true){
		var canvas1=document.getElementById('canvas').children[0];
		$(canvas1).remove();
	}
	
	if(5 == nbNodeRaph && 8 ==nbEdgeRaph){
		return true;
	}else{
		return false;
	}
	
};

testSvgView.prototype.testCreationSvgView3=function(del){
	var myGraph = new SimpleGraph(true);
	
	var node;
	var destNode;
	var nbNodeRaph,nbEdgeRaph;
	var prof, indice;
	for (var i = 1; i <= Math.pow(2,7)-1; i++) {
			myGraph.addNode(i,"er"+i);
		};
	prof = myGraph.profondeurGraph("NodeId1");	
	
	for(var j=1; j<=62;j++){
		node = myGraph.getNode(j);
		destNode = myGraph.getNode(2*j);
		myGraph.addEdge(node,destNode);
		destNode = myGraph.getNode(2*j+1);
		myGraph.addEdge(node,destNode);
	}
	
	Raph = this.buildView(myGraph,"NodeId1",800,800,"hsb(10, 100, 100)","#BF2764");
	nbNodeRaph=0;
	for(var i =0; i < Raph.canvas.childNodes.length; i++){
		if(Raph.canvas.childNodes[i].nodeName=="rect"){
		nbNodeRaph++;
		}
	};
	nbEdgeRaph=0;
	
	for(var i =0; i < Raph.canvas.childNodes.length; i++){
		if(Raph.canvas.childNodes[i].nodeName=="path"){
		nbEdgeRaph++;
		}
	};


	if(del == true){
		var canvas1=document.getElementById('canvas').children[0];
		$(canvas1).remove();
	}
	
	if( 63== nbNodeRaph && 62 ==nbEdgeRaph){
		return true;
	}else{
		return false;
	}
	
};

testSvgView.prototype.testCreationSvgView4=function(del){
	var myGraph = new SimpleGraph(true);
	
	var node;
	var destNode;
	var nbNodeRaph,nbEdgeRaph;
	for (var i = 1; i <= 5; i++) {
			myGraph.addNode(i,"er"+i);
		};
		
	node = myGraph.getNode(1);
	destNode = myGraph.getNode(2);
	myGraph.addEdge(node,destNode);
	destNode = myGraph.getNode(5);
	myGraph.addEdge(node,destNode);

	node = myGraph.getNode(2);
	destNode = myGraph.getNode(3);
	myGraph.addEdge(node,destNode);
	destNode = myGraph.getNode(4);
	myGraph.addEdge(node,destNode);

	node = myGraph.getNode(3);
	destNode = myGraph.getNode(2);
	myGraph.addEdge(node,destNode);
	
	node = myGraph.getNode(4);
	destNode = myGraph.getNode(3);
	myGraph.addEdge(node,destNode);	
	destNode = myGraph.getNode(4);
	myGraph.addEdge(node,destNode);	
	destNode = myGraph.getNode(5);
	myGraph.addEdge(node,destNode);	

	
	Raph = this.buildViewTestLongName(myGraph,"NodeId1",800,800,"hsb(10, 100, 100)","#BF2764");
	nbNodeRaph=0;
	for(var i =0; i < Raph.canvas.childNodes.length; i++){
		if(Raph.canvas.childNodes[i].nodeName=="rect"){
		nbNodeRaph++;
		}
	};
	nbEdgeRaph=0;
	
	for(var i =0; i < Raph.canvas.childNodes.length; i++){
		if(Raph.canvas.childNodes[i].nodeName=="path"){
		nbEdgeRaph++;
		}
	};


	if(del == true){
		var canvas1=document.getElementById('canvas').children[0];
		$(canvas1).remove();
	}
	
	if(5 == nbNodeRaph && 8 ==nbEdgeRaph){
		return true;
	}else{
		return false;
	}
	
};

testSvgView.prototype.testCreationSvgView5=function(del){
	var myGraph = new SimpleGraph(true);
	
	var node;
	var destNode;
	var nbNodeRaph,nbEdgeRaph;
	for (var i = 1; i <= 25; i++) {
		myGraph.addNode(i,"er"+i);
		};
		
	for(var j=1; j<25;j++){
		node = myGraph.getNode(j);
		destNode = myGraph.getNode(j+1);
		myGraph.addEdge(node,destNode);
	}

	
	
	
	
	Raph = this.buildView(myGraph,"NodeId1",800,800,"hsb(10, 100, 100)","#BF2764");
	nbNodeRaph=0;
	for(var i =0; i < Raph.canvas.childNodes.length; i++){
		if(Raph.canvas.childNodes[i].nodeName=="rect"){
		nbNodeRaph++;
		}
	};
	nbEdgeRaph=0;
	
	for(var i =0; i < Raph.canvas.childNodes.length; i++){
		if(Raph.canvas.childNodes[i].nodeName=="path"){
		nbEdgeRaph++;
		}
	};

	if(del == true){
		var canvas1=document.getElementById('canvas').children[0];
		$(canvas1).remove();
	}
	
	if(25 == nbNodeRaph && 24 ==nbEdgeRaph){
		return true;
	}else{
		return false;
	}
	
};


testSvgView.prototype.testCreationSvgView6=function(del){
	var myGraph = new SimpleGraph(true);
	
	var node;
	var destNode;
	var nbNodeRaph,nbEdgeRaph;
	for (var i = 1; i <= 4; i++) {
			myGraph.addNode(i);
		};
		
	node = myGraph.getNode(1);
	destNode = myGraph.getNode(2);
	myGraph.addEdge(node,destNode);
	destNode = myGraph.getNode(1);
	myGraph.addEdge(node,destNode);
	destNode = myGraph.getNode(3);
	myGraph.addEdge(node,destNode);

	node = myGraph.getNode(2);
	destNode = myGraph.getNode(3);
	myGraph.addEdge(node,destNode);
	destNode = myGraph.getNode(2);
	myGraph.addEdge(node,destNode);
	destNode = myGraph.getNode(4);
	myGraph.addEdge(node,destNode);

	node = myGraph.getNode(3);
	destNode = myGraph.getNode(4);
	myGraph.addEdge(node,destNode);
	destNode = myGraph.getNode(3);
	myGraph.addEdge(node,destNode);
	
	node = myGraph.getNode(4);
	destNode = myGraph.getNode(1);
	myGraph.addEdge(node,destNode);	
	destNode = myGraph.getNode(4);
	myGraph.addEdge(node,destNode);	


	
	Raph = this.buildView(myGraph,"NodeId1",800,800,"hsb(10, 100, 100)","#BF2764");
	nbNodeRaph=0;
	for(var i =0; i < Raph.canvas.childNodes.length; i++){
		if(Raph.canvas.childNodes[i].nodeName=="rect"){
		nbNodeRaph++;
		}
	};
	nbEdgeRaph=0;
	
	for(var i =0; i < Raph.canvas.childNodes.length; i++){
		if(Raph.canvas.childNodes[i].nodeName=="path"){
		nbEdgeRaph++;
		}
	};


	
	if(del == true){
		var canvas1=document.getElementById('canvas').children[0];
		$(canvas1).remove();
	}
	
	if(4 == nbNodeRaph && 10 ==nbEdgeRaph){
		return true;
	}else{
		return false;
	}
	
};





//fonction pour la campagne de test, nom tres long
testSvgView.prototype.buildViewTestLongName=function(graph,racine, tailleX, tailleY,colorNode, colorEdge){
		var pro, lar, nbN, nbP, tailleProfondeur, tailleLargeur,indiceDecallage, decallageY;
		var AccesEdge;
		var remplac,cop1,cop2,cop3,mem,temp;
		var nowX, nowY, R = Raphael("canvas", tailleX, tailleY);
		var connections = [];
		var dest, source;
		var Prev,nbC;
		var currentText;
		
		indiceDecallage=-1;
		//on recupere la profondeur du graph a partir dun noeud
		pro = graph.profondeurGraph(racine);
		
		//on recupere la largeur du graph a partir dun noeud
		lar = graph.largeurGraph(racine);
		
		//on recupere le nombre de noeud dans le graph
		nbN=graph.getOrder();

		//correspond a la distance permettant de dessiner un element suivant la profondeur du graph
		tailleProfondeur = tailleY / (pro+1);
		
		decallageY= tailleProfondeur/4;
	//fonction permettant de bouger les formes
		
			// start, move, and up are the drag functions
		var	start = function () {
			//event : quand on sélectionne la forme,
			
			// on recupere les coordonnées du rectangle
			this.ox = this.attr("x");
			this.oy = this.attr("y");
			
			//on recupere les coordonnées du champ text
			this.sizer.ox = this.sizer.attr("x");
			this.sizer.oy = this.sizer.attr("y");
			 
			},
			move = function (dx, dy) {
			//event :quand on la bouge. on met a jours les coordonnées du rectangle mais aussi celles du champ text
			this.attr({x: this.ox + dx, y: this.oy + dy});
			this.sizer.attr({x: this.sizer.ox + dx, y: this.sizer.oy + dy});
			for (var i = connections.length; i--;) {
				R.connection(connections[i]);
			}
			R.safari();     
			};
		
		
	//création des formes correspondant au graph passé en argument	
		for(var i = 1; i <= pro; i++){
			nbP = graph.getprofondeur(i);

			//correspond a la distance permettant de dessiner un element suivant la largeur d'une profondeur donnée dans le graph
			tailleLargeur = tailleX / (nbP.length+1);
			
			for(var j = 1; j<= nbP.length; j++){
				indiceDecallage= Math.pow(-1,j);
				//on y ajoute un champ text permettant de visualiser l'id du noeud
				var	k=R.text(10,10,"nom de la fonction qui est tres tres tres tres tres tres tres tres tres tres tres tres tres tres tres tres tres tres tres tres grand");

				temp=k._getBBox().height;
				mem=k._getBBox().width;
				//si on depasse la taille prevu pour le text alors on fait un retour a la ligne 
				if(	mem > tailleLargeur-tailleLargeur/10){
					mem/=2;
					temp*=2;
					remplac = k[0].textContent;
					cop1=remplac.substring(0,(k[0].textContent.length)/2);
					cop2=remplac.substring((k[0].textContent.length)/2, k[0].textContent.length) ;
					cop3="\n";
					remplac=cop1.concat(cop3);
					remplac=remplac.concat(cop2);
					k[0].textContent=remplac;
				}
				if(	mem <tailleLargeur-tailleLargeur/10){
					//on créé la forme rectangle
					var	c = R.rect((j*tailleLargeur)-((mem)/2)-5, (i*tailleProfondeur), mem+10, temp+30).attr({
						fill: "hsb(10, 100, 100)",
						stroke: 2,
						opacity: .8,
						cursor: "move"
					});
					var s=R.text((j*tailleLargeur),(i*tailleProfondeur)+0.5*c._getBBox().height,k[0].textContent);
					k.remove();
				}else{
					if(indiceDecallage==-1){
						//on créé la forme rectangle avec un decallage par rapport a Y pour eviter des colisions de rectangles
						var	c = R.rect((j*tailleLargeur)-((mem)/2)-5, (i*tailleProfondeur)+decallageY, mem+10, temp+30).attr({
							fill: "hsb(10, 100, 100)",
							stroke: 2,
							opacity: .8,
							cursor: "move"
						});
						var s=R.text((j*tailleLargeur),(i*tailleProfondeur)+0.5*c._getBBox().height+decallageY,k[0].textContent);
						k.remove();
					}else if(indiceDecallage==1){
						//on créé la forme rectangle avec un decallage par rapport a Y pour eviter des colisions de rectangles
						var	c = R.rect((j*tailleLargeur)-((mem)/2)-5, (i*tailleProfondeur)-decallageY, mem+10, temp+30).attr({
							fill: "hsb(10, 100, 100)",
							stroke: 2,
							opacity: .8,
							cursor: "move"
						});
						var s=R.text((j*tailleLargeur),(i*tailleProfondeur)+0.5*c._getBBox().height-decallageY,k[0].textContent);
						k.remove();
					}
				}
				
					//on met dans le champ id l'id du noeud dans le graph
				c.id= nbP[j-1].id;
				$(c[0]).attr('nodeid',c.id);
				c.drag(move, start);
				c.sizer = s;
				this.shapes.push(c);		
			}
			
		}
	//création des arcs entre les nodes
		for(var propName in graph.nodes ){
				for(var propEdge in graph.nodes[propName].edges){
					source = this.rechercheById(graph.nodes[propName].id);
					dest=this.rechercheById(graph.nodes[propName].edges[propEdge].destNode.id);
					AccesEdge = this.rechercheExistenceEdge(connections,this.shapes[source].id,this.shapes[dest].id,graph);

						if( AccesEdge == true){
							//fonction permettant la création des arcs en fonction du graph (direct/ non direct/ cycle)
								connections.push(R.connection(this.shapes[source], this.shapes[dest], "#BF2764",graph));
						}

			}
		}
		
	//intégration du zoom sur le Raphael
		this.zoomGraph(R);
		this.translate(this.shapes,R,connections);
		return R;
};



var test= new testSvgView();
test.test();



function accueil(){
	for(var i =0; i< document.getElementById('canvas').children.length; i++){
		var canvas1=document.getElementById('canvas').children[i];
		$(canvas1).remove();
	}
	for(var i =0; i< document.getElementById('canvas').children.length; i++){
		var canvas1=document.getElementById('canvas').children[i];
		$(canvas1).remove();
	}
	var text=document.getElementById('resum');
	$(text).html("");
}
function test1(){
	var canvas=document.getElementById('canvas');
	for(var i =0; i< document.getElementById('canvas').children.length; i++){
		var canvas1=document.getElementById('canvas').children[i];
		$(canvas1).remove();
	}
	var zoom = document.createElement('div');
	$(zoom).addClass('zoom-text')
			.appendTo(canvas);
	var text=document.getElementById('resum');
	var test = new testSvgView();
	$(text).html("<p>Test de creation d'un graph simple non dirigé</p><p>On affiche un graph non direct comportant 4 Nodes et 4 Edges</p>");
	test.testCreationSvgView1(false);
	}
function test2(){
	var canvas=document.getElementById('canvas');
	for(var i =0; i< document.getElementById('canvas').children.length; i++){
		var canvas1=document.getElementById('canvas').children[i];
		$(canvas1).remove();
	}
	var zoom = document.createElement('div');
	$(zoom).addClass('zoom-text')
			.appendTo(canvas);
	var text=document.getElementById('resum');
	var test = new testSvgView();
	$(text).html("<p>Test de creation d'un graph simple dirigé</p><p>On affiche un graph direct comportant 5 Nodes et 8 Edges</p>");
	test.testCreationSvgView2(false);
}
function test3(){
	var canvas=document.getElementById('canvas');
	for(var i =0; i< document.getElementById('canvas').children.length; i++){
		var canvas1=document.getElementById('canvas').children[i];
		$(canvas1).remove();
	}
	var zoom = document.createElement('div');
	$(zoom).addClass('zoom-text')
			.appendTo(canvas);
	var text=document.getElementById('resum');
	var test = new testSvgView();
	$(text).html("<p>Test de creation d'un graph selon le max de Node a l'horizontale</p><p>On affiche un graph direct comportant 63 Nodes et 62 Edges</p>");
	test.testCreationSvgView3(false);
}
function test4(){
	var canvas=document.getElementById('canvas');
	for(var i =0; i< document.getElementById('canvas').children.length; i++){
		var canvas1=document.getElementById('canvas').children[i];
		$(canvas1).remove();
	}
	var zoom = document.createElement('div');
	$(zoom).addClass('zoom-text')
			.appendTo(canvas);
	var text=document.getElementById('resum');
	var test = new testSvgView();
	$(text).html("<p>Test de creation d'un graph ayant des noms de Node long</p><p>On affiche un graph direct comportant 5 Nodes et 8 Edges</p>");
	test.testCreationSvgView4(false);
}
function test5(){
	var canvas=document.getElementById('canvas');
	for(var i =0; i< document.getElementById('canvas').children.length; i++){
		var canvas1=document.getElementById('canvas').children[i];
		$(canvas1).remove();
	}
	var zoom = document.createElement('div');
	$(zoom).addClass('zoom-text')
			.appendTo(canvas);
	var text=document.getElementById('resum');
	var test = new testSvgView();
	$(text).html("<p>Test de creation d'un graph selon le max de Node a la verticale</p><p>On affiche un graph direct comportant 24 Nodes et 25 Edges</p>");
	test.testCreationSvgView5(false);
}
function test6(){
	var canvas=document.getElementById('canvas');
	for(var i =0; i< document.getElementById('canvas').children.length; i++){
		var canvas1=document.getElementById('canvas').children[i];
		$(canvas1).remove();
	}
	var zoom = document.createElement('div');
	$(zoom).addClass('zoom-text')
			.appendTo(canvas);
	var text=document.getElementById('resum');
	var test = new testSvgView();
	$(text).html("<p>Test de creation d'un graph cyclique</p><p>On affiche un graph direct comportant 4 Nodes et 10 Edges</p>");
	test.testCreationSvgView6(false);
}


