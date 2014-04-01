
/************** PROGRAMME PRINCIPAL **********/
PROCEDURE main()
VAR
	myList: POINTER

BEGIN

	myList <- newLinkedList()

	// unitary tests of the function: insert

	PRINT( insert(myList, 0, 1) )		// TEST11: inserts 1 in an empty list; expected list: 1 - /
	PRINT( insert(myList, 0, 2) )		// TEST12: inserts 2 at the head of the list; expected list: 2 - 1 - /
	PRINT( insert(myList, 2, 3) )		// TEST13: inserts 3 at the tail of the list; expected list: 2 - 1 - 3 - /
	PRINT( insert(myList, 2, 4) )		// TEST14: inserts 4 in the middle of the list; expected list: 2 - 1 - 4 - 3 - /
	PRINT( insert(myList, 8, 5) )		// TEST15: tries to insert at a bad index; expected list: 2 - 1 - 4 - 3 - /

	// unitary tests of the function: remove

	PRINT( remove(myList, 8) )		// TEST21: tries to remove at a bad index; expected list 2 - 1 - 4 - 3 - /
	PRINT( remove(myList, 1) )		// TEST22: removes an element in the middle of the list (index 1, value 1); expected list 2 - 4 - 3 - /
	PRINT( remove(myList, 2) )		// TEST23: removes an element at the tail of the list (index 2, value 3); expected list 2 - 4 - /
	PRINT( remove(myList, 0) )		// TEST24: removes an element at the head of the list (index 0, value 2); expected list 4 - /
	PRINT( remove(myList, 0) )		// TEST25: removes the last element of the list (head + tail, value 4); expected list - /
	PRINT( remove(myList, 0) ) 		// TEST26: tries to remove in an empty list; expected list - /
END



/************** STRUCTURES  DE DONNEES  **********/

// a linked list
STRUCT LinkedList
	head: POINTER
	tail: POINTER
	size: INTEGER



// a linked element
STRUCT LinkedElement
	data: INTEGER
	next: POINTER
























/************ INSERTION  ************/

// inserts a new element at the specified index with the specified value in a linked list
FUNCTION insert(list: POINTER, i: INTEGER, value: INTEGER)  : BOOLEAN
VAR
	newElement: POINTER
	oldElement: POINTER
BEGIN
	IF( list = NULL OR i < 0 OR i > list->size) THEN
		RETURN FALSE
	END_IF

	IF( i = 0 ) THEN // insert ion at the head
		
		oldElement <- list->head
		newElement <- newLinkedElement( value, oldElement )
		list->head <- newElement

		IF( list->size = 0) THEN
			list->tail <- newElement
		END_IF

	ELSE

		IF( i = list->size ) THEN // insertion at the tail of the list

			newElement <- newLinkedElement( value, NULL )
			list->tail->next <- newElement
			list->tail <- newElement
		ELSE

			oldElement <- getElementAt(list, i - 1) // beware of the -1
			newElement <- newLinkedElement(value, oldElement->next)
			oldElement->next <- newElement
		END_IF

	END_IF

	list->size <- list->size + 1
	RETURN TRUE
END


/************ REMOVAL  ************/


// removes the element at the specified index in a linked list
FUNCTION remove(list: POINTER, i: INTEGER) : BOOLEAN
VAR
	toDelete: POINTER
	previousElement: POINTER
BEGIN
	IF( list = NULL OR i < 0 OR i >= list->size) THEN  // beware of the >=
		RETURN FALSE
	END_IF

	IF( i = 0 ) THEN // removal at the head

		// Note: list->head can NOT be NULL (i >= 0 and i < 0 impossible)
		toDelete <- list->head
		list->head <- list->head->next

		IF( list->size = 1 ) THEN  // last element removed
			list->tail <- NULL
		END_IF

	ELSE

		// note: at least 2 elements in the list here (i> 0 => list->size = 2)

		previousElement <- getElementAt(list, i - 1) // beware of the -1
		toDelete <- previousElement->next

		// node: previousElement->next can NOT be NULL
		previousElement->next <- previousElement->next->next

		IF( i = list->size - 1) THEN // removal at the tail of the list
			list->tail <- previousElement
		END_IF

	END_IF

	list->size <- list->size - 1
	FREE( toDelete )
	RETURN TRUE
END






/************* REST OF THE CODE ****************/



// allocates and initialize a new linked list
FUNCTION newLinkedList() : POINTER
VAR
	newList : POINTER
BEGIN
	newList <- ALLOC(STRUCT LinkedList)
	newList->head <- NULL
	newList->tail <- NULL	
	newList->size <- 0

	RETURN newList
END


// allocates and initialize a new linked element
FUNCTION newLinkedElement(data: INTEGER, next: POINTER) : POINTER
VAR
	newElement: POINTER
BEGIN
	newElement <- ALLOC(STRUCT LinkedElement)
	newElement->data <- data
	newElement->next <- next

	RETURN newElement
END


// searchs for a linked element in a linked list at a specified index
FUNCTION getElementAt(list: POINTER, index: INTEGER) : POINTER
VAR
	element: POINTER
	i: INTEGER
BEGIN
	IF(list = NULL) THEN
		RETURN NULL
	END_IF
	
	element <- list->head		// automatically handles an empty list
	i <- 0
	
	WHILE ( element != NULL AND i < index ) DO
		element <- element->next
		i <- i + 1
	END_WHILE

	RETURN element

	
END


	

