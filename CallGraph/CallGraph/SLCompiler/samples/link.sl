//Afin de tester le programme, on utilise plusieurs programmes qui utilise plusieurs dépendances, mais getNodeIterator ne fonctionne pas et le programme en a absolument besoin

//FUNCTION newStack() : POINTER<STRUCT Stack> 
//FUNCTION push(stack: POINTER<STRUCT Stack>, p: POINTER) : BOOLEAN
//FUNCTION pop(stack: POINTER<STRUCT Stack>) : POINTER
//FUNCTION isStackEmpty(stack: POINTER<STRUCT Stack>) : BOOLEAN
//FUNCTION deleteStack(stack: POINTER<STRUCT Stack>) : BOOLEAN

// Type file générique
//FUNCTION newQueue() : POINTER<STRUCT Queue>
//FUNCTION enqueue(queue: POINTER<STRUCT Queue>, p: POINTER) : BOOLEAN
//FUNCTION dequeue(queue: POINTER<STRUCT Queue>) : POINTER
//FUNCTION isQueueEmpty(queue: POINTER<STRUCT Queue>) : BOOLEAN
//FUNCTION deleteQueue(queue: POINTER<STRUCT Queue>) : BOOLEAN

STRUCT LinkedElement
	data:POINTER /* l’utilisation d’un pointeur non typé apporte l’aspect générique de la liste : la donnée peut pointer sur n’importe quoi */
	next:POINTER<STRUCT LinkedElement>
	previous:POINTER<STRUCT LinkedElement>

STRUCT LinkedList
	size:INTEGER
	tail:POINTER<STRUCT LinkedElement>
	head:POINTER<STRUCT LinkedElement>
composition:BOOLEAN



STRUCT EdgeIterator
	currentElement : POINTER <STRUCT ListIterator>
    
STRUCT NeighborsIterator
    currentElement: POINTER<STRUCT EdgeIterator>

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
	adjacencyListIterator : POINTER<STRUCT ListIterator >

STRUCT ListIterator
	currentElement : POINTER<STRUCT LinkedElement>
	
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

FUNCTION getNodeIterator(g: POINTER<STRUCT Graph>): POINTER<STRUCT NodeIterator>
VAR
    	it: POINTER<STRUCT NodeIterator>
BEGIN
    	IF(g=NULL) THEN
        	RETURN NULL
    	END_IF
   	 
    	it <- ALLOC(STRUCT NodeIterator)
    	it -> adjacencyListIterator <- getIterator(g->nodes)
  	 
    	RETURN it
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

FUNCTION append(list:POINTER<STRUCT LinkedList>,value:POINTER):BOOLEAN
BEGIN
  IF(list=NULL)THEN
  	RETURN FALSE
  ELSE
  	RETURN insert(list,list->size,value)
  END_IF
END
	
FUNCTION addNode(g:POINTER<STRUCT Graph>,i:INTEGER):POINTER<STRUCT Node>
BEGIN
    RETURN addValueNode(g,i,0)
END

FUNCTION newGraph(directed:BOOLEAN):POINTER<STRUCT Graph>
VAR
	g : POINTER<STRUCT Graph>
BEGIN
	g <- ALLOC(STRUCT Graph)
	g->directed <- directed
	g->nodes <- newLinkedList(TRUE)
    
	RETURN g
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

FUNCTION getNodeIterator(g: POINTER<STRUCT Graph>): POINTER<STRUCT NodeIterator>
VAR
    	it: POINTER<STRUCT NodeIterator>
BEGIN
    	IF(g=NULL) THEN
        	RETURN NULL
    	END_IF
   	 
    	it <- ALLOC(STRUCT NodeIterator)
    	it -> adjacencyListIterator <- getIterator(g->nodes)
  	 
    	RETURN it
END

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

FUNCTION breadthFirstTraversal(g:POINTER<STRUCT Graph>, rootId : INTEGER) : INTEGER

VAR
	queue : POINTER< STRUCT Queue >
	neighbors : POINTER< STRUCT NodeIterator >
	currentNode, currentNeighbor : POINTER< STRUCT Node >
	nbVisited : INTEGER // nombre de noeuds visités

BEGIN

	nbVisited <- 0
currentNode <- getNode(g, rootId)

IF(currentNode = NULL) THEN // convention en cas d’erreur
	RETURN -1
END_IF

// initialisation du graphe
resetNodesValue(g, -1) // valeur modélisant le fait que le noeud n’a pas été visité

	queue<-newQueue()
	nbVisited <- nbVisited+1
	setNodeValue(currentNode,nbVisited)
	enqueue(queue,currentNode)


	DO // on sait qu’on a au moins une itération (traiter la racine)
		currentNode <- dequeue(queue)
		neighbors <- getNeighbors(currentNode)
		WHILE(hasNextNode(neighbors)) DO // Pour chaque voisin
			currentNeighbor <- getNextNode(neighbors)
			IF(getNodeValue(currentNeighbor) = -1) THEN // Si il n’a pas été visité
				nbVisited <- nbVisited + 1
				setNodeValue(currentNeighbor, nbVisited) // On l’indique comme visité
				enqueue(queue, currentNeighbor) // Et on l’enfile
END_IF
END_WHILE
removeNodeIterator(neighbors)
		
		
	WHILE (!isQueueEmpty(queue)) // on peut optimiser en stoppant la boucle quand nbVisited = ordre du graphe
		

	deleteQueue(queue) // à ne pas oublier !

	RETURN nbVisited
END



FUNCTION depthFirstTraversal(g:POINTER<STRUCT Graph>, rootId : INTEGER) : INTEGER
VAR
	currentNode, currentNeighbor : POINTER< STRUCT Node >
BEGIN


currentNode <- getNode(g, rootId)

IF(currentNode = NULL) THEN
	RETURN -1
END_IF

// initialisation du graphe
resetNodesValue(g, -1) // valeur modélisant le fait que le noeud n’a pas été visité

RETURN depthFirstTraversalRec(currentNode, 1)


END


FUNCTION depthFirstTraversalRec(currentNode:POINTER<STRUCT Node>, nbVisited : INTEGER) : INTEGER
VAR
	neighbors : POINTER< STRUCT NodeIterator >
	currentNeighbor : POINTER< STRUCT Node >
BEGIN

IF (currentNode = NULL) THEN // cas d’erreur
	RETURN -1
END_IF

// on “tague” le noeud courant avec le moment la visite
setNodeValue(currentNode, nbVisited)

// appel récursif sur les voisins
neighbors <- getNeighbors(currentNode)
	WHILE(hasNextNode(neighbors)) DO // Pour chaque voisin
		currentNeighbor <- getNextNode(neighbors)
		
		IF ( getNodeValue(currentNeighbor) = -1 ) THEN // le noeud n’a jamais été visité
		nbVisited <- depthFirstTraversalRec(currentNeighbor, nbVisited + 1)

		IF(nbVisited = -1) THEN // on fait “remonter” le -1 dans la pile d’exécution
		// TO DO : stopper proprement la boucle
			RETURN -1
		END_IF
		
		END_IF

END_WHILE

removeNodeIterator(neighbors)


RETURN nbVisited


END


FUNCTION getNeighbors( node : POINTER<STRUCT Node> ) : POINTER<STRUCT NodeIterator>
VAR
	nodeIterator : POINTER<STRUCT NodeIterator>

BEGIN
	nodeIterator <- ALLOC(STRUCT NodeIterator)
	nodeIterator->adjacencyListIterator <- getListIterator(node->outEdges)

END


//**********************************
//************* GRAPH **************
//**********************************

// INCLUDE : https://docs.google.com/a/isen-lille.fr/document/d/1o5NCieg158phkx3x6ml7MVGkupUtgXVUSVKgaWfoYi4/edit



//**********************************
//********** NODE ITERATOR *********
//**********************************

//getter qui permet de récupérer le destNode d’un edge
FUNCTION getDestNode(edge : POINTER <STRUCT Edge>):POINTER <STRUCT Node>
VAR

BEGIN
	IF(edge != NULL)THEN
		RETURN edge->destNode
	ELSE
		RETURN NULL
	END_IF	
END



FUNCTION hasNextNode( nodeIterator : POINTER<STRUCT NodeIterator> ) : BOOLEAN
VAR
	nextEdge : POINTER< STRUCT Edge >
	nextNode : POINTER< STRUCT Node>
	adjacencyListIterator : POINTER< STRUCT ListIterator> 
BEGIN
adjacencyListIterator <- nodeIterator->adjacencyListIterator
	nextEdge <- getCurrentElementData(adjacencyListIterator)
	nextNode <- getDestNode(nextEdge)
	IF(nextNode != NULL) THEN
		RETURN TRUE
	END_IF
	RETURN FALSE

	
END


FUNCTION getNextNode( nodeIterator : POINTER<STRUCT NodeIterator> ) : POINTER< STRUCT Node>
VAR
	nextEdge : POINTER< STRUCT Edge >
	nextNode : POINTER< STRUCT Node>
	adjacencyListIterator : POINTER< STRUCT ListIterator> 

BEGIN
adjacencyListIterator <- nodeIterator->adjacencyListIterator
	nextEdge <- getCurrentElementData(adjacencyListIterator)
	nextNode <- getDestNode(nextEdge)
	moveToNextElement(adjacencyListIterator)

	RETURN nextNode
	
END



FUNCTION removeNodeIterator( nodeIterator : POINTER<STRUCT NodeIterator> ) : BOOLEAN
BEGIN
	IF(nodeIterator != NULL) THEN
		removeIterator(nodeIterator->adjacencyListIterator)
FREE(nodeIterator)
RETURN TRUE
END_IF
RETURN FALSE
END



//**********************************
//********** LIST ITERATOR *********
//**********************************

FUNCTION hasNextElement(li: POINTER<STRUCT ListIterator>) : BOOLEAN
BEGIN
IF(li = NULL OR li->currentElement = NULL) THEN
RETURN FALSE
END_IF

RETURN (li->currentElement->next != NULL)
END

FUNCTION getCurrentElementData(li: POINTER<STRUCT ListIterator>) : POINTER
BEGIN
	IF(li = NULL OR li->currentElement = NULL) THEN
		RETURN NULL
	END_IF
	RETURN li->currentElement->data
END


FUNCTION moveToNextElement(li: POINTER<STRUCT ListIterator>) : BOOLEAN
BEGIN
	IF(hasNextElement(li)) THEN
		li->currentElement <- li->currentElement->next
		RETURN TRUE
	END_IF
	li->currentElement <- NULL //nécessaire pour faire fonctionner le hasNextNode
	RETURN FALSE
END

FUNCTION removeIterator(li: POINTER<STRUCT ListIterator>) : BOOLEAN
BEGIN
	IF(li != NULL)THEN
		FREE(li)
		RETURN TRUE
	END_IF
	RETURN FALSE
END


// Linked Queue of POINTER
STRUCT Queue
	front: POINTER<STRUCT QueueElement>
	rear: POINTER<STRUCT QueueElement>
	
STRUCT QueueElement
	value: POINTER	// non-typed POINTER
	next: POINTER<STRUCT QueueElement>

	
// creates an empty queue
FUNCTION newQueue() : POINTER<STRUCT Queue>
VAR
	queue : POINTER<STRUCT Queue>
BEGIN
	queue <- ALLOC(STRUCT Queue)
	queue->front <- NULL
	queue->rear <- NULL
	RETURN queue
END

// allocates and initializes a QueueElement
FUNCTION newQueueElement(value: POINTER, next: POINTER<STRUCT QueueElement>) : POINTER
VAR
	newElement: POINTER<STRUCT QueueElement>
BEGIN
	newElement <- ALLOC(STRUCT QueueElement)
	newElement->value <- value
	newElement->next <- next

	RETURN newElement
END

// Enqueues a POINTER at the rear of queue. Returns FALSE on error.
FUNCTION enqueue(queue: POINTER<STRUCT Queue>, p: POINTER) : BOOLEAN
VAR
	newRear: POINTER<STRUCT QueueElement>
	oldRear: POINTER<STRUCT QueueElement>
BEGIN
	// error case : NULL queue
	IF(queue = NULL) THEN
		RETURN FALSE
	END_IF
	
	newRear <- newQueueElement(p, NULL)
	
	IF( queue->rear != NULL) THEN
		queue->rear->next <- newRear
	ELSE // empty queue : front update
		queue->front <- newRear
	END_IF
	
	queue->rear <- newRear

	RETURN TRUE
END

// Dequeues the POINTER at the front of queue. Returns NULL on error.
FUNCTION dequeue(queue: POINTER<STRUCT Queue>) : POINTER 
VAR
	oldFront: POINTER<STRUCT QueueElement>
	oldFrontValue: POINTER
BEGIN
	// error cases : NULL or empty queue
	IF(queue = NULL OR queue->front = NULL) THEN
		RETURN FALSE
	END_IF
	
	oldFront <- queue->front
	oldFrontValue <- oldFront->value
	
	// front update
	queue->front <- queue->front->next

	IF( queue->front = NULL ) THEN  // last element removed => front = rear = NULL
		queue->rear <- NULL
	END_IF
	
	// old front removal
	FREE(oldFront)
	
	RETURN oldFrontValue
	
END

// Returns TRUE if queue is empty, FALSE otherwise (or on error)
FUNCTION isQueueEmpty(queue: POINTER<STRUCT Queue>) : BOOLEAN
BEGIN
	RETURN (queue != NULL AND queue->front = NULL)
END


// Deallocates queue, returns FALSE on error
FUNCTION deleteQueue(queue: POINTER<STRUCT Queue>) : BOOLEAN
VAR
	currentElement, nextElement : POINTER<STRUCT QueueElement>
BEGIN

	IF(queue = NULL) THEN
		RETURN FALSE
	END_IF
	
	currentElement <- queue->front
	
	WHILE(currentElement != NULL) DO
		nextElement <- currentElement->next
		FREE(currentElement)
		currentElement <- nextElement
	END_WHILE
	
	FREE(queue)
	
	RETURN TRUE
END

// Prints PASSED if the value obtained is equal to the expected value, FAILED otherwise
PROCEDURE printTestStatus(valueAsExpected : BOOLEAN)
BEGIN
	IF(valueAsExpected) THEN
		PRINTLN("PASSED")
	ELSE
		PRINTLN("FAILED")
	END_IF
END


// Linked Stack of POINTER
STRUCT Stack
	top: POINTER<STRUCT StackElement>
	
STRUCT StackElement
	value: POINTER	// non-typed POINTER
	next: POINTER<STRUCT StackElement>


FUNCTION newStack() : POINTER<STRUCT Stack>
VAR
	stack : POINTER<STRUCT Stack>
BEGIN
	stack <- ALLOC(STRUCT Stack)
	stack->top <- NULL
	RETURN stack
END

// allocates and initialize a StackElement
FUNCTION newStackElement(value: POINTER, next: POINTER<STRUCT StackElement>) : POINTER
VAR
	newElement: POINTER<STRUCT StackElement>
BEGIN
	newElement <- ALLOC(STRUCT StackElement)
	newElement->value <- value
	newElement->next <- next

	RETURN newElement
END

// Pushes a POINTER at the top of stack. Returns FALSE on error
FUNCTION push(stack: POINTER<STRUCT Stack>, p: POINTER) : BOOLEAN
VAR
	newTop: POINTER<STRUCT StackElement>
	oldTop: POINTER<STRUCT StackElement>
BEGIN
	// error case : NULL stack
	IF(stack = NULL) THEN
		RETURN FALSE
	END_IF
	
	newTop <- newStackElement( p, stack->top )
	stack->top <- newTop

	RETURN TRUE
END

// Pops the POINTER at the top of stack. Returns NULL on error.
FUNCTION pop(stack: POINTER<STRUCT Stack>) : POINTER 
VAR
	oldTop: POINTER<STRUCT StackElement>
	oldTopValue: POINTER
BEGIN
	// error cases : NULL or empty stack
	IF(stack = NULL OR stack->top = NULL) THEN
		RETURN NULL
	END_IF
	
	oldTop <- stack->top
	oldTopValue <- oldTop->value
	
	// top update
	stack->top <- stack->top->next

	// old top removal
	FREE(oldTop)
	
	RETURN oldTopValue
	
END

// Returns TRUE if stack is empty, FALSE otherwise (or on error)
FUNCTION isStackEmpty(stack: POINTER<STRUCT Stack>) : BOOLEAN
BEGIN
	RETURN (stack != NULL AND stack->top = NULL)
END


// Deallocates stack, returns FALSE on error
FUNCTION deleteStack(stack: POINTER<STRUCT Stack>) : BOOLEAN
VAR
	currentElement, nextElement : POINTER<STRUCT StackElement>
BEGIN

	IF(stack = NULL) THEN
		RETURN FALSE
	END_IF
	
	currentElement <- stack->top
	
	WHILE(currentElement != NULL) DO
		nextElement <- currentElement->next
		FREE(currentElement)
		currentElement <- nextElement
	END_WHILE
	
	FREE(stack)
	
	RETURN TRUE
END

// Prints PASSED if the value obtained is equal to the expected value, FAILED otherwise
PROCEDURE printTestStatus(valueAsExpected : BOOLEAN)
BEGIN
	IF(valueAsExpected) THEN
		PRINTLN("PASSED")
	ELSE
		PRINTLN("FAILED")
	END_IF
END

PROCEDURE main()
VAR
g : POINTER<STRUCT Graph>

BEGIN
g<-newGraph(TRUE)
addNode(g,0)
addNode(g,1)
addNode(g,2)
addNode(g,3)
addNode(g,4)

addValueNode(g,1,15.6)


END










