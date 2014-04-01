function SvgView(_graph,_root,_tailleX,_tailleY,_colorNode,_colorEdge){
	this.shapes = [];
	this.zoom=0;
	this.currentX=0;
	this.currentY=0;
	this.transX=0;
	this.transY=0;
	this.raphX=0;
	this.raphY=0;

	/* Variable relative à la création de la vue */
	this.graph=_graph;
	this.root=_root;
	this.tailleX=_tailleX;
	this.tailleY=_tailleY;
	this.colorNode=_colorNode;
	this.colorEdge=_colorEdge;

	
	this.posOffSetLeft = 0;
	this.posOffSetTop = 0;
	
};



SvgView.prototype = new AbstractView();

SvgView.prototype.getPosition=function (){
	var left = 0;
	var top = 0;
	/*On récupère l'élément*/
	var e = document.getElementById('canvas');
	
	/*Tant que l'on a un élément parent*/
	while (e.offsetParent != undefined && e.offsetParent != null)
	{
		/*On ajoute la position de l'élément parent*/
		left += e.offsetLeft + (e.clientLeft != null ? e.clientLeft : 0);
		top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
		e = e.offsetParent;
	}
	this.posOffSetLeft = left;
	this.posOffSetTop = top;
	
}

SvgView.prototype.refreshView=function(ev){
	this.graph=ev.getSender();
	this.viewAdded();
}

SvgView.prototype.viewAdded=function(){
	this.clearView();
	this.graph=this.graph.clone();
	this.shapes=[];
	if(this.colorNode == undefined){
		this.colorNode ="hsb(10, 100, 100)";
	}
	if(this.colorEdge == undefined){
		this.colorEdge ="#BF2764";
	}
		var R = Raphael("canvas", this.tailleX, this.tailleY);
		var connections = [];
		
		
		//passage du graph en raphael
		this.createGraphRaphael(R,this.graph,this.root, this.tailleX, this.tailleY,connections,this.colorNode);
		
		//création des arcs entre les nodes
		this.createEdgeRaphael(R,this.graph,connections,this.colorEdge)
		
	//intégration du zoom sur le Raphael
	var canvas1=document.getElementById('canvas');
	var text=document.getElementById('zoom-text');
		this.zoomGraph(R,canvas1,text);
		this.translate(this.shapes,R,connections,canvas1,text);
		return R;
	};
//passage du graph en raphael
SvgView.prototype.createGraphRaphael= function(R,graph,racine, tailleX, tailleY,connections,colorNode){
		var pro, lar, nbN, nbP, tailleProfondeur, tailleLargeur,indiceDecallage, decallageY;
		var remplac,cop1,cop2,cop3,mem,temp;
		var nowX, nowY, Prev,nbC;
		var currentText;
		
		indiceDecallage=-1;
		//on recupere la profondeur du graph a partir dun noeud
		pro = graph.profondeurGraph(racine);
		
		//on recupere la largeur du graph a partir dun noeud
		lar = graph.largeurGraph(racine);
		
		//on recupere le nombre de noeud dans le graph
		nbN=graph.getOrder();

		//correspond a la distance permettant de dessiner un element suivant la profondeur du graph
		 tailleProfondeur= tailleY / 4;
		
		
		
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
		for(var i = 0; i <= pro-1; i++){
			nbP = graph.getprofondeur(i+1);

			
			
			for(var j = 0; j<= nbP.length-1; j++){
				indiceDecallage= Math.pow(-1,j);
				//on y ajoute un champ text permettant de visualiser l'id du noeud
				var	k=R.text(10,10,nbP[j].getValue().getName());

				temp=k._getBBox().height;
				mem=k._getBBox().width;
				//si on depasse la taille prevu pour le text alors on fait un retour a la ligne 
				if(	mem >100){
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
				if(	mem <110){
					//on créé la forme rectangle
					var	c = R.rect((tailleX/2)+indiceDecallage*j*100-((mem)/2)-5, (i*130)+tailleProfondeur, mem+10, temp+30).attr({
						fill: colorNode,
						stroke: 2,
						opacity: .8,
						cursor: "move"
					});
					var s=R.text((tailleX/2)+indiceDecallage*j*100,(i*130)+tailleProfondeur+0.5*c._getBBox().height,k[0].textContent);
					k.remove();
				}else{
					if(indiceDecallage==-1){
						//on créé la forme rectangle avec un decallage par rapport a Y pour eviter des colisions de rectangles
						var	c = R.rect((tailleX/2)+indiceDecallage*j*100-((mem)/2)-5, (i*130)+tailleProfondeur+75, mem+10, temp+30).attr({
							fill: colorNode,
							stroke: 2,
							opacity: .8,
							cursor: "move"
						});
						var s=R.text((tailleX/2)+indiceDecallage*j*100,(i*130)+tailleProfondeu+0.5*c._getBBox().height,k[0].textContent);
						k.remove();
					}else if(indiceDecallage==1){
						//on créé la forme rectangle avec un decallage par rapport a Y pour eviter des colisions de rectangles
						var	c = R.rect((tailleX/2)+indiceDecallage*j*100-((mem)/2)-5, (i*130)+tailleProfondeur-75, mem+10, temp+30).attr({
							fill: colorNode,
							stroke: 2,
							opacity: .8,
							cursor: "move"
						});
						var s=R.text((tailleX/2)+indiceDecallage*j*100,(i*130)+tailleProfondeur+0.5*c._getBBox().height-decallageY,k[0].textContent);
						
						k.remove();
					}
				}
					//on met dans le champ id l'id du noeud dans le graph
				c.name= nbP[j].getValue().getName();
				c.id= nbP[j].getId();
				$(c[0]).attr('nodeid',c.id);
				$(c[0]).attr('nodename',c.name);
				$(s[0]).attr('nodeid',c.id);
				c.drag(move, start);
				s.drag(move, start);
				
				c.sizer = s;
				s.sizer = c;
				this.shapes.push(c);		
			}
			
		}

		
}

//création des arcs raphael
SvgView.prototype.createEdgeRaphael= function(R,graph,connections,colorEdge){
	var dest, source;
	var AccesEdge;
	for(var propName in graph.nodes ){
				for(var propEdge in graph.nodes[propName].edges){
					source = this.rechercheById(graph.nodes[propName].getId());
					dest=this.rechercheById(graph.nodes[propName].edges[propEdge].destNode.getId());
					if(this.shapes[source] != undefined && this.shapes[dest] !=undefined && source != undefined && dest !=undefined){
						AccesEdge = this.rechercheExistenceEdge(connections,this.shapes[source].id,this.shapes[dest].id,graph);
	
							if( AccesEdge == true){
								//fonction permettant la création des arcs en fonction du graph (direct/ non direct/ cycle)
									connections.push(R.connection(this.shapes[source], this.shapes[dest],colorEdge ,graph));
							}
						}

			}
		}
}	
//fonction permettant de retourner l'index ou ce trouve l'element "index"
SvgView.prototype.rechercheById= function( index){
	
		var taille=this.shapes.length;
		var i;
		for( i =0; i <taille; i++){
			if(this.shapes[i].id == index){
				return i;
			}
		}
	};
//fonction permettant de tester l'existance d'un edge entre deux nodes
SvgView.prototype.rechercheExistenceEdge= function(tab, first, last, graph){
		var taille=tab.length;
		var i;
		for( i =0; i <taille; i++){
			if(((tab[i].from.id == first && tab[i].to.id == last)|| (tab[i].to.id == first && tab[i].from.id == last)) && graph.directed == false ){

				return false;
			}else if((tab[i].from.id == first && tab[i].to.id == last) && graph.directed == true ){
				
			}
		}
		return true;
	};
//fonction permettant la refresh de la vu svg
SvgView.prototype.refreshNode=function(ev){
		var indexShape;
		indexShape = this.rechercheById(ev.getNode().id);
		if(ev.getNode().value.getSelected()==0){
			$(this.shapes[indexShape][0]).removeAttr("class");
		}
		else if(ev.getNode().value.getSelected()==1){
			$(this.shapes[indexShape][0]).attr('class','selected');//[0] correspond au code html de l'objet.  attr pour ajouter la classe sur l'element svg
		}
		else if(ev.getNode().value.getSelected()==2){
			$(this.shapes[indexShape][0]).attr('class','neighborhood');
		}
	};
	
//fonction zoom	
SvgView.prototype.zoomGraph = function(R,canvas1,text){
	//on recupere la balise canvas permettant l'affichage du raphael
	var zoom=0 ;
	var Min,coefZoom;
	if(R.width> R.height){
		Min = R.height;
	}else{
		Min = R.width;
	}
	coefZoom= Min/10;
	$(text).attr('value', Min).attr('zoom',zoom);
	$(text).html("(ZOOM + =click+ctrl, ZOOM - =click+shift)	niveau du ZOOM : 0");
	$(text).attr('transX',0);
	$(text).attr('transY',0);
	function listenerBuilder(canvas1,svgView,coefZoom,zoom,R){

	
		//pour la fonction permettant le translate, on exploite Raphael, la fonction setViewBox.
		var listener = function(event){
			
			
				
			
			svgView.transX=parseInt($(text).attr('transX'));
			svgView.transY=parseInt($(text).attr('transY'));
			var lastX=0;
			var lastY=0;
			var decalX=0;
			var decalY=0;
			var centerX,centerY;
			svgView.getPosition();
				
			
			if(zoom>0){
				
				//on calcule la distance initiale(sur le canvas initial) separant le centre du zoom sur raphael et le click passé 
				decalX= ((((event.pageX+svgView.transX) -svgView.posOffSetLeft)-(svgView.currentX))*((R.width-(coefZoom*zoom))/(R.width)));
				decalY= ((((event.pageY+svgView.transY) -svgView.posOffSetTop)-(svgView.currentY))*((R.height-(coefZoom*zoom))/(R.height)));
				svgView.currentX+=decalX;
				svgView.currentY+=decalY;
			}else if(zoom==0){
				svgView.currentX=event.pageX-svgView.posOffSetLeft+svgView.transX;
				svgView.currentY=event.pageY-svgView.posOffSetTop+svgView.transY;
			}else if(zoom<0){
				//on calcule la distance initiale(sur le canvas initial) separant le centre du zoom sur raphael et le click passé 
				decalX= ((((event.pageX+svgView.transX) -svgView.posOffSetLeft)-(svgView.currentX))*((R.width-(coefZoom*zoom))/(R.width)));
				decalY= ((((event.pageY+svgView.transY) -svgView.posOffSetTop)-(svgView.currentY))*((R.height-(coefZoom*zoom))/(R.height)));
				svgView.currentX+=decalX;
				svgView.currentY+=decalY;
			}
			//si l'utilisateur a fait un ctrl+click alors...
			if (event.ctrlKey ==true && event.shiftKey ==false){
				if(zoom+1>0 && zoom+1< 10){
					++zoom;
					svgView.raphX=svgView.currentX-((svgView.currentX-svgView.transX)*((R.width-(coefZoom*zoom))/(R.width)));
					svgView.raphY= svgView.currentY-((svgView.currentY-svgView.transY)*((R.height-(coefZoom*zoom))/(R.height)));
					//on déplace la viewBox du raphael la ou l'utilisateur a cliquer avec un coefficient de zoom
					R.setViewBox(svgView.raphX,svgView.raphY, R.width-(coefZoom*zoom), R.height-(coefZoom*zoom), true);
				}else if( zoom+1 ==0){
					//position du canvas initial
					++zoom;
					R.setViewBox(0, 0, R.width, R.height, true);
				}else if(zoom+1 <0){
					++zoom;
					svgView.raphX=svgView.currentX-((svgView.currentX-svgView.transX)*((R.width-(coefZoom*zoom))/(R.width)));
					svgView.raphY= svgView.currentY-((svgView.currentY-svgView.transY)*((R.height-(coefZoom*zoom))/(R.height)));
					//on déplace la viewBox du raphael la ou l'utilisateur a cliquer avec un coefficient de zoom
					R.setViewBox(svgView.raphX,svgView.raphY, R.width-(coefZoom*zoom), R.height-(coefZoom*zoom), true);
					}
			}
			//si l'utilisateur a fait un ctrl+shift alors...-
			else if (event.shiftKey ==true && event.ctrlKey ==false){
							
				if(zoom-1 >0){
					--zoom;
					svgView.raphX=svgView.currentX-((svgView.currentX-svgView.transX)*((R.width-(coefZoom*zoom))/(R.width)));
					svgView.raphY= svgView.currentY-((svgView.currentY-svgView.transY)*((R.height-(coefZoom*zoom))/(R.height)));
					//on déplace la viewBox du raphael la ou l'utilisateur a cliquer avec un coefficient de zoom
					R.setViewBox(svgView.raphX,svgView.raphY, R.width-(coefZoom*zoom), R.height-(coefZoom*zoom), true);
					
					//retour au canvas initial
				}else if(zoom-1 ==0){
					//position du canvas initial
					--zoom;
					R.setViewBox(0, 0, R.width, R.height, true);
				}else if(0>zoom-1 && zoom-1 > -20){
					--zoom;
					svgView.raphX=svgView.currentX-((svgView.currentX-svgView.transX)*((R.width-(coefZoom*zoom))/(R.width)));
					svgView.raphY= svgView.currentY-((svgView.currentY-svgView.transY)*((R.height-(coefZoom*zoom))/(R.height)));
					//on déplace la viewBox du raphael la ou l'utilisateur a cliquer avec un coefficient de zoom
					R.setViewBox(svgView.raphX,svgView.raphY, R.width-(coefZoom*zoom), R.height-(coefZoom*zoom), true);
					}
			}
				
			}
			return listener;
	}
	
	var listener = listenerBuilder(canvas1,this,coefZoom,zoom,R);
	
	//on y ajoute un écouteur
	$(canvas1).click(listener);
			
		
	
}
//fonction translate permettant de se déplacer sur le canvas.
SvgView.prototype.translate=function(forme,Raph,connections,canvas1,text){
	
	//on exploite le principe d'encapsulation pour créer la fonction du mouvement
	function listenerBuilder(Raph,canvas1,text,svgView){
		
		//pour la fonction permettant le translate, on exploite Raphael, la fonction setViewBox.
		var listener = function(ev){
			var decalX, decalY, X, Y;
			
			var coef=parseInt($(text).attr('value'));
			var baseX=parseInt($(text).attr('startX'));
			var baseY=parseInt($(text).attr('startY'));
			var agrand=parseInt($(text).attr('zoom'));
			var coeftaille = coef/10;
			decalX= parseInt((baseX - ev.clientX )*((Raph.width-(agrand*coeftaille))/(Raph.width)));
			decalY= parseInt((baseY - ev.clientY )*((Raph.height-(agrand*coeftaille))/(Raph.height)));
			X= parseInt(svgView.raphX+decalX);
			Y= parseInt(svgView.raphY+decalY);
			Raph.setViewBox(X, Y, Raph.width-(agrand*coeftaille), Raph.height-(agrand*coeftaille), true);
			$(text).attr('transX',decalX);
			$(text).attr('transY',decalY);
			
		}
		return listener;
	}
	
	//on exploite le principe d'encapsulation pour créer la fonction du mouvement
	function unlistenerBuilder(canvas1,text,svgView){
		//pour la fonction permettant le translate, on exploite Raphael, la fonction setViewBox.
		var unlistener = function(ev){
			svgView.transX=parseInt($(text).attr('transX'));
			svgView.transY=parseInt($(text).attr('transY'));
			svgView.raphX+=parseInt(svgView.transX);
			svgView.raphY+=parseInt(svgView.transY);
			
			$(canvas1).off('mousemove');
		}
		return unlistener;
	}

	var listener = listenerBuilder(Raph,canvas1,text,this);
	var unlistener = unlistenerBuilder(canvas1,text,this);
	
	$(canvas1).mousedown( function(event){
			if(event.target.tagName=="svg"){
				var text=document.getElementById('zoom-text');
				$(text).attr('startX',(event.clientX));
				$(text).attr('startY',(event.clientY));
				$(canvas1).mousemove(listener);
			}
		});
	$(canvas1).mouseup(unlistener);
	
}




SvgView.prototype.clearView=function(){
	$("#canvas").empty();
}
