
const VERSION = 1;
async function start() {
	let db = await connect('todo-db', VERSION);

	displayTodo(db);

	// get the button from the DOM (aka, HTML document)
	let addBtn = document.querySelector("#add-btn");
	addBtn.addEventListener('click', async function () {
		let title = document.querySelector("#todo-name").value;
		let priority = document.querySelector("#priority").value;
		await addTodo(db, title, priority, false);
		displayTodo(db); // can say this here even though we only define displayTodo() at the bottom
		
		// reset the form fields so that the user can enter another input
		document.querySelector('#todo-name').value = ""; 
		document.querySelector("#priority").value = "";
	}) // end async function(), end addEventListener()
} // end start()

// Function to display the most current list of todos
async function displayTodo(db) {
	// place the priority in brackets next to the todo title 
	let template = `<span class='todo-title'></span> (<span class="todo-priority"></span>)
	<button class='delete-btn'>Delete</button>
	<button class='update-btn'>Update</button>
	`;

	// get the <div> that stores the todo list
	let todoList = document.querySelector('#todo-display');

	// clear the list
	todoList.innerHTML = "";

	let todos = await getAllTodos(db); // getAllTodos() returns "await store.getAll();" 
	//which is a IDBRequest object
	for (let t of todos) {
		let todoElement = document.createElement("li");
		todoElement.innerHTML = template;
		todoElement.querySelector('.todo-title').innerText = t.title;
		todoElement.querySelector('.todo-priority').innerText = t.priority;

		// add the click event for the delete btn
		todoElement.querySelector('.delete-btn').addEventListener('click', async function () {
			await deleteTodo(db, t.id);
			displayTodo(db); // must be async-await because we must delete before displaying
		});

		// add the click event for the update btn
		todoElement.querySelector('.update-btn').addEventListener('click', async function () {
			let newTitle = prompt("New title");
			let priority = prompt("New priority");
			t.title = newTitle;
			t.priority = parseInt(priority); // parseInt() converts a string to an integer
			// so that we can search by upper bound and lower bound later

			await updateTodo(db, t); 
			// how does updateTodo know which object we want to update? (see db.js)
			displayTodo(db);
		});

		// add the newly created element into the todo list
		todoList.appendChild(todoElement);
	}
}

start();