const todoTemplate = {
  title:"",
  done:false,
  priority:0
}

const dbName="todo-db";

async function connect(dbname, version) { // await-async function 
  // check if supports indexedDB
  if (! "indexedDB" in window) { // window refers to the current tab
    return false;
  }
  console.log("setting up db")
  let db = await idb.open(dbname, version, function(db){ // open up a new database with this name and this version
    console.log("open db");
    console.log("version= " + db.oldVersion); // show the current version of the database

    // incrementally create the database
    // careful to use a non-mutually-exclusive if-block
    if (db.oldVersion<=1) { // when we create the object store for the first time
      console.log("Create the object store");
      // create the todo structure
      db.createObjectStore('todos', {
        keyPath:'id', // primary key
        autoIncrement:true // When you add in new objects to the object store, 
        // automatically give each object an id. The id will increment by one for every object
      }); 
    } // end if

  })// end await idb.open()
  console.log("database opened successfully");
  return db;

} // end connect()

async function addTodo(db, title, priority, done)
{
  let newTodo = {...todoTemplate};
  newTodo.title = title,
  // make sure this is an integer or it will affect search later
  newTodo.priority = parseInt(priority);
  newTodo.done = done;

  // add to the store
  let tx = db.transaction('todos', 'readwrite');
  // a transaction is like a process
  // if a transaction never completes successfully,
  // all changes to the database is discarded
  let store = tx.objectStore('todos'); // retrieve the data store
  await store.add(newTodo);
  await tx;
  return newTodo;
}

async function getAllTodos(db) {
 let tx = db.transaction('todos', 'readonly'); // must create a transaction, i.e. a process
 let store = tx.objectStore('todos');
 return await store.getAll();
}

async function getTodosByRange(db, range) {
  let tx = db.transaction('todos', 'readonly');
  let store = tx.objectStore('todos');
  let index = store.index('priority_index');
  
  let cursor = await index.openCursor(range);
  console.log(cursor);
  let items = [];
 while (cursor && cursor !== undefined) {
    console.log(cursor.value);
    items.push(cursor.value);
    try {
       await cursor.continue();
    } catch (e) {
      break;
    }
  } 
  console.log(items);
  return items;
}

async function deleteTodo(db, idToDelete) {
   let tx = db.transaction('todos', 'readwrite');
   let store = tx.objectStore('todos');
   await store.delete(idToDelete); // no need to be within async function() {...} because there is no code after this function
   return tx.complete;
}

async function updateTodo(db, newTodoInfo) {
  let tx = db.transaction('todos', 'readwrite');
  let store = tx.objectStore('todos');
  await store.put(newTodoInfo);
  return tx.complete;
}