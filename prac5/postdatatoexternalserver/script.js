let addBtn = document.querySelector("#add-btn");
addBtn.addEventListener('click', async function(){
  let taskName = document.querySelector('#task-name').value;
  let taskDesc = document.querySelector('#task-desc').value;
  let response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
    userId: 1,
    title: taskName,
    body: taskDesc
  });
  console.log(response.data);
})