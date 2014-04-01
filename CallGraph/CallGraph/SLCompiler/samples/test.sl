
/**
* Structures LinkedList
**/

STRUCT LinkedElement
	data:POINTER /* l’utilisation d’un pointeur non typé apporte l’aspect générique de la liste : la donnée peut pointer sur n’importe quoi */
	next:POINTER<STRUCT LinkedElement>
	previous:POINTER<STRUCT LinkedElement>

STRUCT LinkedList
	size:INTEGER
	tail:POINTER<STRUCT LinkedElement>
	head:POINTER<STRUCT LinkedElement>
composition:BOOLEAN

STRUCT ListIterator
	currentElement : POINTER<STRUCT LinkedElement>

/**
* Structures Graph
**/
STRUCT Graph
	directed: BOOLEAN
	nodes : POINTER<STRUCT LinkedList>

STRUCT Edge
	destNode : POINTER<STRUCT Node>
	weight : FLOAT

STRUCT Node
	id : INTEGER
	value : FLOAT
	outEdges : POINTER<STRUCT LinkedList>
    

STRUCT NodeIterator
	adjLi : POINTER<STRUCT ListIterator>
    
STRUCT EdgeIterator
	currentElement : POINTER <STRUCT ListIterator>
    
STRUCT NeighborsIterator
    currentElement: POINTER<STRUCT EdgeIterator>


PROCEDURE main()
BEGIN    
    addNodeTestCampaign()
    addEdgeTestCampaign()
    neighborsTestCampaign()
END

/**
* Subprograms
**/

FUNCTION getIterator(list: POINTER<STRUCT LinkedList>) : POINTER <STRUCT ListIterator>
VAR
    li: POINTER<STRUCT ListIterator>
BEGIN
   
    IF(list = NULL) THEN
   	 RETURN NULL
    END_IF
    
    li <- ALLOC(STRUCT ListIterator)
    li->currentElement <- list->head
    RETURN li
    
END


FUNCTION hasNextElement(li: POINTER<STRUCT ListIterator>) : BOOLEAN
BEGIN
    IF(li = NULL OR li->currentElement = NULL) THEN
   	 RETURN FALSE
    END_IF
    
    RETURN (li->currentElement->next != NULL)
    
END


FUNCTION moveToNextElement(li: POINTER<STRUCT ListIterator>) : BOOLEAN
BEGIN
	IF(li->currentElement != NULL)THEN
    	li->currentElement <- li->currentElement->next
    	RETURN TRUE
	END_IF
    
	RETURN FALSE
END


FUNCTION getCurrentElementData(li: POINTER<STRUCT ListIterator>) : POINTER
BEGIN
	IF(li = NULL OR li->currentElement = NULL) THEN
    	RETURN NULL
	END_IF
    
	RETURN li->currentElement->data
END

FUNCTION removeIterator(li: POINTER<STRUCT ListIterator>) : BOOLEAN
BEGIN
	IF(li != NULL)THEN
    	FREE(li)
    	RETURN TRUE
	END_IF
    
	RETURN FALSE
END

/**
** Fonctions graph
**/

    /**
    **  Node Itterrator
    **/
    
FUNCTION getNodeIterator(g: POINTER<STRUCT Graph>): POINTER<STRUCT NodeIterator>
VAR
    	it: POINTER<STRUCT NodeIterator>
BEGIN
    	IF(g=NULL) THEN
        	RETURN NULL
    	END_IF
   	 
    	it <- ALLOC(STRUCT NodeIterator)
    	it -> adjLi <- getIterator(g->nodes)
  	 
    	RETURN it
END


FUNCTION hasNextNode(ni: POINTER<STRUCT NodeIterator>): BOOLEAN
VAR
    node:POINTER<STRUCT Node>
BEGIN
    IF(ni = NULL)THEN
   	 RETURN FALSE
    END_IF
    
    node<-getCurrentElementData(ni->adjLi)
    RETURN (node!=NULL)
END



FUNCTION getNextNode(ni: POINTER<STRUCT NodeIterator>):POINTER<STRUCT Node>
VAR
    currentNode:POINTER<STRUCT Node>
BEGIN
    IF(ni=NULL)THEN
   	 RETURN NULL
    END_IF
      currentNode<-getCurrentElementData(ni->adjLi)
      moveToNextElement(ni->adjLi)
      
      RETURN currentNode
END

FUNCTION removeNodeIterator(nodeIt:POINTER<STRUCT NodeIterator>):BOOLEAN
VAR
    bool :BOOLEAN
BEGIN
    bool <- FALSE
    IF(nodeIt = NULL)THEN
   	 RETURN FALSE
    END_IF
    
    bool<-removeIterator(nodeIt->adjLi)
    FREE(nodeIt)
    RETURN bool
END

/**
    ** Edges Iterator
**/

FUNCTION getEdgeIterator(n:POINTER<STRUCT Node>):POINTER<STRUCT EdgeIterator>
VAR
    edgeIt:POINTER<STRUCT EdgeIterator>
BEGIN
    IF(n=NULL)THEN
   	 RETURN NULL
    END_IF
    
    edgeIt<-ALLOC(STRUCT EdgeIterator)
    edgeIt->currentElement<-getIterator(n->outEdges)
    
    RETURN edgeIt
END


FUNCTION hasNextEdge(edgeIt:POINTER<STRUCT EdgeIterator>):BOOLEAN
VAR
    edge:POINTER<STRUCT Edge>
BEGIN
    IF(edgeIt = NULL)THEN
   	 RETURN FALSE
    END_IF
    
    edge<-getCurrentElementData(edgeIt->currentElement)
    RETURN (edge!=NULL)
END

FUNCTION getNextEdge(edgeIt: POINTER<STRUCT EdgeIterator>):POINTER<STRUCT Edge>
VAR
    currentEdge:POINTER<STRUCT Edge>
BEGIN
    IF(edgeIt=NULL)THEN
   	 RETURN NULL
    END_IF
      currentEdge<-getCurrentElementData(edgeIt->currentElement)
      moveToNextElement(edgeIt->currentElement)
      
      RETURN currentEdge
END

FUNCTION removeEdgeIterator(edgeIt:POINTER<STRUCT edgeIterator>):BOOLEAN
VAR
    bool :BOOLEAN
BEGIN
    bool <- FALSE
    IF(edgeIt = NULL)THEN
   	 RETURN FALSE
    END_IF
    
    bool<-removeIterator(edgeIt->currentElement)
    FREE(edgeIt)
    RETURN bool
END

/*
 ** Neighbors Iterator
*/

FUNCTION getNeighbors(n:POINTER<STRUCT Node>):POINTER<STRUCT NeighborsIterator>
VAR
    neighborsIt:POINTER<STRUCT NeighborsIterator>
BEGIN
    IF(n=NULL)THEN
   	 RETURN NULL
    END_IF
    
    neighborsIt<-ALLOC(STRUCT NeighborsIterator)
    neighborsIt->currentElement<-getEdgeIterator(n)
    
    RETURN neighborsIt
END

FUNCTION hasNextNeighbors(it:POINTER<STRUCT NeighborsIterator>):BOOLEAN
BEGIN
    IF(it=NULL)THEN
   	 RETURN FALSE
    END_IF
    
    RETURN hasNextEdge(it->currentElement)
END

FUNCTION getNextNeighbors(it:POINTER<STRUCT NeighborsIterator>):POINTER<STRUCT Node>
VAR
    currentEdge:POINTER<STRUCT Edge>
BEGIN
    IF(it=NULL)THEN
   	 RETURN NULL
    END_IF
    
    currentEdge<-getNextEdge(it->currentElement)
    IF(currentEdge != NULL)THEN
   	 RETURN currentEdge->destNode
    END_IF
END

FUNCTION removeNeighborsIterator(it:POINTER<STRUCT NeighborsIterator>):BOOLEAN
VAR
    bool:BOOLEAN
BEGIN
    IF(it=NULL)THEN
   	 RETURN FALSE
    END_IF
    
    bool<-removeEdgeIterator(it->currentElement)
    FREE(it)
    RETURN bool
END

/**
    **Fonctions graphe **
**/

FUNCTION newGraph(directed:BOOLEAN):POINTER<STRUCT Graph>
VAR
	g : POINTER<STRUCT Graph>
BEGIN
	g <- ALLOC(STRUCT Graph)
	g->directed <- directed
	g->nodes <- newLinkedList(TRUE)
    
	RETURN g
END


FUNCTION deleteGraph(g:POINTER<STRUCT Graph>):BOOLEAN
VAR
    it:POINTER<STRUCT NodeIterator>
    currentNode:POINTER<STRUCT Node>
BEGIN
	IF(g = NULL)THEN
    	RETURN FALSE
	END_IF
    
	it<-getNodeIterator(g)
	WHILE(hasNextNode(it))DO
   	 currentNode<-getNextNode(it)
   	 deleteLinkedList(currentNode->outEdges)
	END_WHILE
    
	deleteLinkedList(g->nodes)
	removeNodeIterator(it)
	FREE (g)
END

FUNCTION getOrder(g:POINTER<STRUCT Graph>):INTEGER
BEGIN
    IF(g=NULL)THEN
   	 RETURN -1
    ELSE
   	 RETURN getSize(g->nodes)
    END_IF
END


FUNCTION isDirected(g:POINTER<STRUCT Graph>):BOOLEAN
BEGIN
    IF(g=NULL)THEN
   	 RETURN FALSE
    ELSE
   	 RETURN g->directed
    END_IF
END


FUNCTION addNode(g:POINTER<STRUCT Graph>,i:INTEGER):POINTER<STRUCT Node>
BEGIN
    RETURN addValueNode(g,i,0)
END


FUNCTION addValueNode(g:POINTER<STRUCT Graph>,i:INTEGER,v:FLOAT):POINTER<STRUCT Node>
VAR
    newNode:POINTER<STRUCT Node>
BEGIN
    IF(g=NULL OR i<0 OR getNode(g,i)!=NULL)THEN
   	 RETURN NULL
    END_IF
    
    newNode<-ALLOC (STRUCT Node)
    newNode->outEdges<-newLinkedList(TRUE)
    newNode->id<-i
    newNode->value<-v
    append(g->nodes,newNode)
    
    RETURN newNode
END

FUNCTION getNode(g:POINTER<STRUCT Graph>,i:INTEGER):POINTER<STRUCT Node>
VAR
    nodeIt:POINTER<STRUCT NodeIterator>
    found:BOOLEAN
    node:POINTER<STRUCT Node>
    currentNode:POINTER<STRUCT Node>
BEGIN
    IF(g=NULL)THEN
   	 RETURN NULL
    END_IF
    node<-NULL
    found<-FALSE
    nodeIt<-getNodeIterator(g)
    
    WHILE (hasNextNode(nodeIt) AND !found) DO
   	 currentNode<-getNextNode(nodeIt)
   	 IF(currentNode->id=i)THEN
   		 node<-currentNode
   		 found<-TRUE
   	 END_IF    
    END_WHILE
    
    removeNodeIterator(nodeIt)
    
    RETURN node // Renverra NULL si le noeud n'a pas été trouvé
END


/*FUNCTION removeNode(g:POINTER<STRUCT Graph>,n:POINTER<STRUCT Node>):BOOLEAN
BEGIN
END*/


FUNCTION resetNodesValue(g:POINTER<STRUCT Graph>,v:FLOAT):BOOLEAN
VAR
    nodeIt:POINTER<STRUCT NodeIterator>
    currentNode:POINTER<STRUCT Node>
BEGIN
    IF(g=NULL)THEN
   	 RETURN FALSE
    END_IF
    
    nodeIt<-getNodeIterator(g)
    
    WHILE(hasNextNode(nodeIt))DO
   	 currentNode<-getNextNode(nodeIt)
   	 currentNode->value<-v
    END_WHILE
    
    removeNodeIterator(nodeIt)
    RETURN TRUE
END


FUNCTION addEdge(g:POINTER<STRUCT Graph>,s:POINTER<STRUCT Node>,d:POINTER<STRUCT Node>):BOOLEAN
BEGIN
    RETURN addWeightedEdge(g,s,d,0)
END


FUNCTION addWeightedEdge(g:POINTER<STRUCT Graph>, s:POINTER<STRUCT Node>,d:POINTER<STRUCT Node>,w:FLOAT):BOOLEAN
VAR
    newEdge:POINTER<STRUCT Edge>
    newEdge2:POINTER<STRUCT Edge>
BEGIN
    IF(g=NULL OR s=NULL OR d=NULL OR getEdgeWeight(g,s,d)!=-1)THEN
   	 RETURN FALSE
    END_IF
    
    newEdge<-ALLOC (STRUCT Edge)
    newEdge->weight<-w
    newEdge->destNode<-d
    append(s->outEdges,newEdge)
    
    IF(!isDirected(g))THEN
   	 newEdge2<-ALLOC(STRUCT Edge)
   	 newEdge2->weight<-w
   	 newEdge2->destNode<-s
   	 append(d->outEdges,newEdge2)
    END_IF
    
    RETURN TRUE
END


FUNCTION getEdgeWeight(g:POINTER<STRUCT Graph>,s:POINTER<STRUCT Node>,d:POINTER<STRUCT Node>):FLOAT
VAR
    currentEdge:POINTER<STRUCT Edge>
BEGIN    

    currentEdge<-getEdge(g,s,d)
    IF(currentEdge!=NULL)THEN
   	 RETURN currentEdge->weight
    ELSE
   	 RETURN -1
    END_IF
    
END



FUNCTION setEdgeWeight(g:POINTER<STRUCT Graph>,s:POINTER<STRUCT Node>,d:POINTER<STRUCT Node>,w:FLOAT):BOOLEAN
VAR
    currentEdge:POINTER<STRUCT Edge>
BEGIN

    currentEdge<-getEdge(g,s,d)
    IF(currentEdge != NULL)THEN
   	 currentEdge->weight<-w
    ELSE
   	 RETURN FALSE
    END_IF
    
    IF(!isDirected(g))THEN
   	 currentEdge<-getEdge(g,d,s)
   	 IF(currentEdge != NULL)THEN
   		 currentEdge->weight<-w
   	 ELSE
   		 RETURN FALSE
   	 END_IF
    END_IF

    RETURN TRUE
END



FUNCTION getEdge(g:POINTER<STRUCT Graph>,s:POINTER<STRUCT Node>,d:POINTER<STRUCT Node>):POINTER<STRUCT Edge>
VAR
    edgeIt:POINTER<STRUCT EdgeIterator>
    found:BOOLEAN
    myEdge:POINTER<STRUCT Edge>
    currentEdge:POINTER<STRUCT Edge>
BEGIN
    IF(g=NULL OR s=NULL OR d=NULL)THEN
   	 RETURN NULL
    END_IF
    myEdge<-NULL
    found<-FALSE
    edgeIt<-getEdgeIterator(s)
    WHILE(hasNextEdge(edgeIt)AND !found)DO
   	 currentEdge<-getNextEdge(edgeIt)
   	 IF(currentEdge->destNode=d)THEN
   		 myEdge<-currentEdge
   		 found<-TRUE
   	 END_IF
   	 
    END_WHILE
    
    RETURN myEdge
END


/*FUNCTION removeEdge(g:POINTER<STRUCT Graph>,s:POINTER<STRUCT Node>,d:POINTER<STRUCT Node>):BOOLEAN
VAR
    edgeIt:POINTER<STRUCT EdgeIterator>
    currentEdge:POINTER<STRUCT Edge>
BEGIN
    IF(g=NULL OR s=NULL OR d=NULL)THEN
   	 RETURN FALSE
    END_IF
   	 
END*/


FUNCTION resetEdgesWeight(g:POINTER<STRUCT Graph>,w:FLOAT):BOOLEAN
VAR
    edgeIt:POINTER<STRUCT EdgeIterator>
    nodeIt:POINTER<STRUCT NodeIterator>
    currentEdge:POINTER<STRUCT Edge>
    currentNode:POINTER<STRUCT Node>
BEGIN
    IF(g=NULL)THEN
   	 RETURN FALSE
    END_IF
    
    nodeIt<-getNodeIterator(g)
    WHILE(hasNextNode(nodeIt))DO
   	 currentNode<-getNextNode(nodeIt)
   	 edgeIt<-getEdgeIterator(currentNode)
   	 WHILE(hasNextEdge(edgeIt))DO
   		 currentEdge<-getNexEdge(edgeIt)
   		 currentEdge->weight<-w
   	 END_WHILE
   	 removeEdgeIterator(edgeIt)
    END_WHILE
    removeNodeIterator(nodeIt)
    RETURN TRUE
END



FUNCTION getId(n:POINTER<STRUCT Node>):INTEGER
BEGIN
    IF(n=NULL)THEN
   	 RETURN -1
    ELSE
   	 RETURN n->id
    END_IF
END


FUNCTION getNodeValue(n:POINTER<STRUCT Node>):FLOAT
BEGIN
    IF(n=NULL)THEN
   	 RETURN -1
    ELSE
   	 RETURN n->value
    END_IF
END


FUNCTION getDegree(n:POINTER<STRUCT Node>):INTEGER
BEGIN
    IF(n=NULL)THEN
   	 RETURN -1
    ELSE
   	 RETURN getSize(n->outEdges)
    END_IF
END



FUNCTION setNodeValue(n:POINTER<STRUCT Node>,v:FLOAT):BOOLEAN
BEGIN
    IF(n=NULL)THEN
   	 RETURN FALSE
    ELSE
   	 n->value<-v
   	 RETURN TRUE
    END_IF
END


/*
    **Fonctions de test
**/

PROCEDURE valueAccepted(bool:BOOLEAN)
BEGIN
    IF(bool=TRUE)THEN
   	 PRINTLN("PASSED")
    ELSE
   	 PRINTLN("FAILED")
    END_IF
END

PROCEDURE addNodeTestCampaign()
VAR
    g:POINTER<STRUCT Graph>
    myNode:POINTER<STRUCT Node>
    recupNode:POINTER<STRUCT Node>
BEGIN
    PRINTLN("addNode Test Campaign :")
    g<-newGraph(FALSE) // Graph non dirigé
    
    PRINT("Ajout d'un noeud dans une graph NULL : ")
    valueAccepted(addValueNode(NULL,10,50) = NULL )
    
    PRINT("Ajout d'un noeud avec un id négatif : ")
    valueAccepted(addValueNode(g,-5,50)= NULL)
    
    PRINT("Ajout d'un noeud quelconque : ")
    myNode<-addValueNode(g,1,10)
    recupNode<-getNode(g,1)
    valueAccepted(myNode != NULL AND recupNode=myNode AND getNodeValue(recupNode)=10 )
    
    PRINT("Ajout d'un noeud avec un id déja existant")
    valueAccepted(addValueNode(g,1,50) = NULL )
    
    PRINT("Ajout d'un noeud avec valeur par défaut : ")
    myNode<-addNode(g,2)
    recupNode<-getNode(g,2)
    valueAccepted(myNode != NULL AND recupNode=myNode AND getNodeValue(recupNode)=0 )
    
    deleteGraph(g)
    PRINTLN(" ")
END

PROCEDURE addEdgeTestCampaign()
VAR
    g:POINTER<STRUCT Graph>
    node1:POINTER<STRUCT Node>
    node2:POINTER<STRUCT Node>
    node3:POINTER<STRUCT Node>
    node4:POINTER<STRUCT Node>
BEGIN
    g<-newGraph(FALSE)
    node1<-addNode(g,1)
    node2<-addNode(g,2)
    node3<-addNode(g,3)
    node4<-addNode(g,4)
    
    PRINTLN("addEdge Test Campaign : ")
    
    PRINT("Ajout d'un arc lorsque le graph est NULL : ")
    valueAccepted(addWeightedEdge(NULL,node1,node2,10) = FALSE)
    
    PRINT("Ajout d'un arc lorsque l'un des noeuds est NULL : ")
    valueAccepted(addWeightedEdge(g,node1,NULL,10) = FALSE)
    
    PRINT("Ajout d'un arc quelconque : ")
    valueAccepted(addWeightedEdge(g,node1,node2,5) AND getEdgeWeight(g,node1,node2)=5 AND getEdgeWeight(g,node2,node1)=5)

    PRINT("Ajout d'un arc déja existant : ")
    valueAccepted(addWeightedEdge(g,node1,node2,5)=FALSE)
    
    PRINT("Ajout d'un arc avec valeur par défaut : ")
    valueAccepted(addEdge(g,node1,node3)=TRUE AND getEdgeWeight(g,node1,node3)=0 AND getEdgeWeight(g,node3,node1)=0)
    
    deleteGraph(g)
    PRINTLN(" ")
END

PROCEDURE neighborsTestCampaign()
VAR
    g:POINTER<STRUCT Graph>
    node1:POINTER<STRUCT Node>
    node2:POINTER<STRUCT Node>
    node3:POINTER<STRUCT Node>
    node4:POINTER<STRUCT Node>
    it:POINTER<STRUCT NeighborsIterator>
    currentDestNode:POINTER<STRUCT Node>
BEGIN
    g<-newGraph(TRUE)
    node1<-addNode(g,1)
    node2<-addNode(g,2)
    node3<-addNode(g,3)
    node4<-addNode(g,4)
    
    addEdge(g,node1,node2)
    addEdge(g,node1,node3)
    addEdge(g,node1,node4)
    
    PRINTLN("getNeighbors Test Campaign")
    
    it<-getNeighbors(node1)
    currentDestNode<-getNextNeighbors(it)
    valueAccepted(currentDestNode=node2)
    
    currentDestNode<-getNextNeighbors(it)
    valueAccepted(currentDestNode=node3)
    
    currentDestNode<-getNextNeighbors(it)
    valueAccepted(currentDestNode=node4)
    
    removeNeighborsIterator(it)
    deleteGraph(g)
END


FUNCTION newLinkedList(composition:BOOLEAN):POINTER<STRUCT LinkedList>
VAR
  newList:POINTER<STRUCT LinkedList>
BEGIN
  newList<-ALLOC(STRUCT LinkedList)
  newList->size<-0   
  newList->tail<-NULL
  newList->head<-NULL
  newList->composition<-composition
 
  RETURN newList
END


FUNCTION newLinkedElement(data:POINTER, next:POINTER<STRUCT LinkedElement>, previous:POINTER<STRUCT LinkedElement>):POINTER<STRUCT LinkedElement>
VAR
  newElement:POINTER<STRUCT LinkedElement>
BEGIN
  newElement<-ALLOC(STRUCT LinkedElement)
  newElement->data <- data
  newElement->next <- next
  newElement->previous<-previous
 
  RETURN newElement
END




FUNCTION deleteLinkedList(list:POINTER<STRUCT LinkedList>):BOOLEAN
VAR
BEGIN
  IF(list!=NULL)THEN
 
   WHILE (list->size>0) DO
  	remove(list,0)
   END_WHILE
 	 
	FREE(list)
	RETURN TRUE
	 
  ELSE
	RETURN FALSE
  END_IF
 
END






FUNCTION getSize(list:POINTER<STRUCT LinkedList>):INTEGER
VAR
BEGIN
  IF(list != NULL)THEN
  	RETURN list->size
  ELSE
  	RETURN NULL
  END_IF
END





FUNCTION get(list:POINTER<STRUCT LinkedList>,index:INTEGER):POINTER
VAR
  element:POINTER<STRUCT LinkedElement>
BEGIN
  IF(list=NULL OR index >= list->size OR index<0)THEN
  	RETURN NULL
  END_IF
 
  element<-getElementAt(list,index)
 
  RETURN element->data
END





FUNCTION set(list:POINTER<STRUCT LinkedList>,index:INTEGER,value:POINTER):BOOLEAN
VAR
  element:POINTER<STRUCT LinkedElement>
BEGIN
  IF(list=NULL OR index>=list->size OR index<0)THEN
  	RETURN FALSE
  END_IF
 
  element<-getElementAt(list,index)
  element->data<-value
 
  RETURN TRUE
END





FUNCTION insert(list : POINTER<STRUCT LinkedList>, index : INTEGER, value : POINTER ):BOOLEAN
VAR
  i: INTEGER
  currentElement : POINTER<STRUCT LinkedElement>
  newElement : POINTER<STRUCT LinkedElement>    
BEGIN

  IF (list = NULL OR index < 0 OR index > list->size)THEN  // Cas d’erreurs
  	RETURN FALSE    
  END_IF

  newElement <- newLinkedElement(value,NULL,NULL)
 
  IF (list->size = 0) THEN  // Si la liste est vide
  	list->head <- newElement
  	list->tail <- newElement
  	list->size <- (list->size) + 1
  	RETURN TRUE
  END_IF
 	 
  IF (index = 0) THEN  // Insertion en tête
 	newElement->next<-list->head
 	list->head->previous<- newElement
 	list->head <- newElement
 	list->size <- (list->size) + 1
 	RETURN TRUE
  END_IF

  IF (index = (list->size) ) THEN  // Si on se trouve en fin de liste
 	newElement->previous <- list->tail
  	list->tail->next <- newElement
  	list->tail <- newElement
  	list->size <- (list->size) + 1
  	RETURN TRUE
  END_IF
 
  // cas général
  currentElement <- getElementAt(list,index)
  newElement->previous <- currentElement->previous
  newElement->next <-currentElement
  currentElement->previous->next <- newElement
  currentElement->previous <- newElement
 	 
 
  list->size <- (list->size) + 1  // Incrémentation de la taille de la liste
 
  RETURN TRUE
END



FUNCTION remove (list:POINTER<STRUCT LinkedList>,index:INTEGER):BOOLEAN
VAR
 toDelete:POINTER<STRUCT LinkedElement>
 currentElement:POINTER<STRUCT LinkedList>
BEGIN
 IF (list = NULL OR index < 0 OR index > (list->size-1)) THEN //Cas d’erreur
 	RETURN FALSE
 END_IF

 IF(list->size = 1)THEN  // Cas de la liste à 1 élément
    	toDelete <- list->head
    	list->tail <- NULL
    	list->head <- NULL
 END_IF

 IF(index = 0 AND list->size != 1)THEN //On enlève le début
	toDelete <- list->head
 	list->head <- list->head->next
	list->head->previous <- NULL

 END_IF

 IF(index > 0)THEN //Cas général
 	currentElement <- getElementAt(list,index)
 	toDelete <- currentElement
 	currentElement->previous->next <- currentElement->next

 	IF(index = (list->size)-1) THEN //Cas de l’index en fin de liste
     	list->tail <- currentElement->previous
     	list->tail->next <- NULL
       	 
 	ELSE
     	currentElement->next->previous <- currentElement->previous
	END_IF
	 
 END_IF


 list->size <- (list->size)-1

 IF (list->composition = TRUE) THEN // Permet de supprimer ce que pointe le pointeur data de l’élèment
	FREE(toDelete->data)
 END_IF

 FREE(toDelete)
 RETURN TRUE

END






FUNCTION append(list:POINTER<STRUCT LinkedList>,value:POINTER):BOOLEAN
BEGIN
  IF(list=NULL)THEN
  	RETURN FALSE
  ELSE
  	RETURN insert(list,list->size,value)
  END_IF
END



FUNCTION concat(list1:POINTER<STRUCT LinkedList>,list2:POINTER<STRUCT LinkedList>):POINTER<STRUCT LinkedList>
VAR
  list3:POINTER<STRUCT LinkedList>
BEGIN
 
END





FUNCTION swap(list: POINTER<STRUCT LinkedList>, index1:INTEGER, index2:INTEGER):BOOLEAN

VAR
  currentElement1: POINTER<STRUCT LinkedElement>
  currentElement2: POINTER<STRUCT LinkedElement>
  tmp:POINTER<STRUCT LinkedElement>

BEGIN

 IF (index1 > index2) THEN
 	RETURN swap(list, index2, index1)
 END_IF

 IF ((list=NULL) OR (index1<0) OR (index2<0) OR (index1>=list->size) OR (index2 >= list->size )) THEN   	// Cas d'erreurs
 	RETURN FALSE
 END_IF

 IF (index1 = index2)THEN 	// Inutile d'effectuer le swap
 	RETURN TRUE
 END_IF

 currentElement1 <- getElementAt(list, index1)
 currentElement2 <- getElementAt(list, index2)

 IF (index1=0) THEN        	// Cas de la tête
 	list->head <- currentElement2
 ELSE
 	currentElement1->previous->next <- currentElement2
 END_IF

 IF (index2= (list->size)-1) THEN	//Cas de la queue
 	list->tail <- currentElement1
 ELSE
 	currentElement2->next->previous <- currentElement1
 END_IF


 swapPointers(currentElement1, currentElement2, (index2=index1+1))//on intervertit les deux éléments

 RETURN TRUE

END


PROCEDURE swapPointers(element1 : POINTER<STRUCT LinkedElement>, element2 : POINTER<STRUCT LinkedElement>, adjacent : BOOLEAN)
VAR
 tmpElement : POINTER<STRUCT LinkedElement>
BEGIN


 IF((element1!=NULL) AND(element1!=NULL))THEN
	 
 	IF(!adjacent)THEN	//le cas où les éléments ne se suivent pas
	 
     	element1->next->previous<-element2 // il y a au moins un élement entre //element1 et element2 dont les champs previous et next

     	element2->previous->next<-element1 //doivent être redirigés.
    	 
     	tmpElement<-element2->previous //on échange les champs previous des //éléments 1 et 2
     	element2->previous<-element1->previous
     	element1->previous<-tmpElement

     	tmpElement<-element2->next// même chose pour les champs next
     	element2->next<-element1->next
     	element1->next<-tmpElement
	 
 	ELSE	//Cas où les élèments sont adjacents
     	element2->previous <- element1->previous
     	element1->previous <- element2
     	element1->next <- element2->next
     	element2->next <- element1
 	END_IF
 	 
 END_IF

END






FUNCTION getElementAt(list: POINTER<STRUCT LinkedList>, index: INTEGER) : POINTER<STRUCT LinkedElement>
VAR
	element: POINTER<STRUCT LinkedElement>
	i: INTEGER
BEGIN
	element <- NULL
  IF (list != NULL AND index > -1 AND index < list->size) THEN
  	IF(index < ((list->size)/2) + 1)THEN
         	element <- list->head
         	i <- 0
      	WHILE ( element != NULL AND i < index ) DO
             	element <- element->next
             	i <- i + 1
      	END_WHILE  
  	ELSE
     	element <- list->tail
     	i <- list->size - 1
	 
     	WHILE ( element != NULL AND i > index ) DO
	 
         	element <- element->previous
         	i <- i - 1
    	 
  	END_WHILE
 	END_IF
  END_IF

	RETURN element

END







/*
 ** Main program
*/

