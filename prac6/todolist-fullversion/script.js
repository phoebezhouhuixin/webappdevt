const VERSION = 2;
async function start() {

  let db = await connect('todo-db', VERSION); 

  let addBtn = document.querySelector("#add-btn");

  // first render
  displayTodo(db);

  addBtn.addEventListener('click', async function(){
     let title = document.querySelector("#todo-name").value;
     let priority = document.querySelector("#priority").value;
     await addTodo(db, title, priority, false);
     displayTodo(db);
     document.querySelector('#todo-name').value = "";
     document.querySelector("#priority").value = "";
   })

  let filterBtn = document.querySelector("#filter-btn");
  filterBtn.addEventListener('click', function(){
    displayTodo(db);
  });
}

async function displayTodo(db) {

  let template = `<span class='todo-title'></span> (<span class='todo-priority'></span>) <button class="delete-btn">Delete</button>
  <button class="update-btn">Update</button>
  <input type="checkbox" class="todo-checkbox"/>
  `;

  // get the <div> that stores the todo list
  let todoList = document.querySelector('#todo-display');
  
  // clear the list
  todoList.innerHTML="";

  // get all the todos
  
  // are we filtering by priority?
  let lower = document.getElementById('lower').value;
  let upper = document.getElementById('upper').value;
  let todos;
  console.log(lower);
  console.log(upper);
  if (upper == '' && lower == '') {
    console.log("both upper and lower are null");
      todos = await getAllTodos(db); // from db.js
  } else {

     let range;
    if (lower != "" && upper != "") {
      range = IDBKeyRange.bound(parseInt(lower), parseInt(upper)); // parseInt is important for searching later
    } else if (lower ==""){
      range = IDBKeyRange.upperBound(parseInt(upper));
    } else {
      range = IDBKeyRange.lowerBound(parseInt(lower));
    }
  
    todos = await getTodosByRange(db, range);
  }

  for (let t of todos) {
    let todoElement = document.createElement('li');
    todoElement.innerHTML = template;
    todoElement.querySelector('.todo-title').innerText = t.title;
    todoElement.querySelector('.todo-priority').innerText = t.priority;
    todoElement.querySelector('.delete-btn').addEventListener('click', 
      async function(){ // (!) must have async because we want await
      await deleteTodo(db, t.id);
      displayTodo(db); // (!) must have await because displayTodo DEPENDS ON deleteTodo returning
    });

    todoElement.querySelector('.todo-checkbox').addEventListener('click', async function(){
      console.log(db);
        t.done = !t.done;
        await updateTodo(db, t);
        displayTodo(db);
    });
    todoElement.querySelector('.todo-checkbox').checked = t.done;

    todoElement.querySelector('.update-btn').addEventListener('click', async function(){
      let newTitle = prompt("New title");
      let priority = prompt("New priority");
      t.title = newTitle;
      // make sure it is a proper integer so that we can search by upper bound and lower bound later
      t.priority = parseInt(priority);
      await updateTodo(db, t);
      displayTodo(db);
    });
    todoList.appendChild(todoElement);
  }
}

start();
