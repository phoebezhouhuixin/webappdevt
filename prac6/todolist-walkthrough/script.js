
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
		displayTodo(db);
		document.querySelector('#todo-name').value = "";
		document.querySelector("#priority").value = "";
	})
} // end start

async function displayTodo(db) {
	let template = `<span class='todo-title'></span> (<span class="todo-priority"></span>)
	<button class='delete-btn'>Delete</button>
	<button class='update-btn'>Update</button>
	`;

	// get the <div> that stores the todo list
	let todoList = document.querySelector('#todo-display');

	// clear the list
	todoList.innerHTML = "";

	let todos = await getAllTodos(db);
	for (let t of todos) {
		let todoElement = document.createElement("li");
		todoElement.innerHTML = template;
		todoElement.querySelector('.todo-title').innerText = t.title;
		todoElement.querySelector('.todo-priority').innerText = t.priority;

		// add the click event for the delete btn
		todoElement.querySelector('.delete-btn').addEventListener('click', async function () {
			await deleteTodo(db, t.id);
			displayTodo(db);
		});

		// add the click event for the update btn
		todoElement.querySelector('.update-btn').addEventListener('click', async function () {
			let newTitle = prompt("New title");
			let priority = prompt("New priority");
			t.title = newTitle;
			// make sure it is a proper integer so that we can search by upper bound and lower bound later
			t.priority = parseInt(priority);
			await updateTodo(db, t);
			displayTodo(db);
		});

		// add the newly created element into the todo list
		todoList.appendChild(todoElement);
	}
}

start();