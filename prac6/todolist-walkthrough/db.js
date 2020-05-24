// Function to connect to the database.
// Each database is identified by a certain dbname and version

async function connect(dbname, version) {
  // "window" refers to your current tab.
  // "window" is a standard object in javascript, just like "document"
  if (!'indexedDB' in window) { // IndexedDB not supported by this browser
    // cannot use idb.js, thus abort connect()
    return false;
  }

  let db = await idb.open(dbname, version, function(db){
    // shows the current version of the database
    console.log(db.oldVersion);
    if (db.oldVersion <=1) { // no database exists yet
      console.log("Creating object store")
      db.createObjectStore('todos', // create a "table" (object store) called todos
          // within the database called dbname.
        { // define the format of each object in the object store
          keyPath:'id',
          autoIncrement:true
        }
      );
    } // end if db.oldVersion <= 1
  }) // end open
  console.log("database opened successfully");
  return db;
} // end connect()

async function addTodo(db, todoName, priority ) { 
  // db is the database object that is returned by connect().
  // Note that connect() created the database object using idb.open().
  
  let tx = db.transaction('todos', 'readwrite');
  // IDBDatabase.transaction()
  // A Transaction object contains the objectStore() method,
  // which you can call to access an object store of a certain object store name ("todos"). 

  // retrieve the object store by calling the objectStore() 
  // method of the transaction object
  let store = tx.objectStore('todos'); 
  // The objectStore() method returns an object store object.
  // The IDBObjectStore object contains methods like add(), get(), clear(), count() etc

  // When adding to the object store, use "await", so that the code 
  // within addTodo() that follows after store.add() will not run yet.
  await store.add({
    'title':todoName,
    'done':false,
    'priority':priority
  });

  // confirm the transaction
  // If a transaction never completes successfully,
  // all changes to the database are discarded because of IDBTransaction.abort().
  // The abort may be due to bad requests, e.g. trying to add() the same key twice, 
  // or put() with a value that has a uniqueness constraint.
  await tx; // Will not run before store.add() returns. If successful, return the event "complete".
  // i.e. tx is either an error or a "complete" or a "still waiting".
  // --> The async keyword means that the function returns a Promise!
}

async function getAllTodos(db) {
  let tx = db.transaction('todos', 'readonly');
  let store = tx.objectStore('todos');
  // getAll() returns all the objects in the datastore 
  return await store.getAll(); // returns an IDBRequest object 
  // containing all objects in the object store.
  // Note: don't just return "await tx" which is
  // "complete"/"fail" rather than IDBRequestobject/"fail"
}

async function deleteTodo(db, idToDelete) {
  let tx = db.transaction('todos', 'readwrite'); 
  // the permisions of this transaction are readwrite, not readonly

  let store = tx.objectStore('todos');
  await store.delete(idToDelete) // Q: how do we define 
  // the primary key of the object store?
  // A: We already defined it in createObjectStore() in connect(), 
  // using "keyPath".
  await tx;
}

async function updateTodo(db, newTodoInfo) {
  let tx = db.transaction('todos', 'readwrite');
  let store = tx.objectStore('todos');
  await store.put(newTodoInfo); // vs add()
  // how does store.put() know which object to update?
  // ohhh because the IDBObjectStore.put() function always occurs by primary key.
  // In our dbname called "todo-db",
  // the primary key of each object in the "todos" object store
  // is "id", which is autoincremented (see connect()).
  // Note that "t.title =newTitle" (in script.js) is NOT the primary key of the object.
  // We have one update button for one object in the todo list, 
  // hence the id of the object is tied to that update button, 
  // therefore we can change the task title and 
  // task priority to anything we want, and yet still update the correct object by id.
  await tx;
}