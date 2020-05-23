
let pageOneBtn = document.querySelector('#page1-btn');
let pageTwoBtn = document.querySelector("#page2-btn");
let pageThreeBtn = document.querySelector("#page3-btn");
// eqv. pageOneBtn = document.getElementById("page1-btn")

let page1 = document.querySelector("#page-one");
let page2 = document.querySelector("#page-two");
let page3 = document.querySelector("#page-three");

function hideAllPages() { /* called each time we click the button 
   (i.e. when we want to view a new page) */

  page1.classList.add('hidden');
  page2.classList.add('hidden');
  page3.classList.add('hidden')

  page1.classList.remove('show');
  page2.classList.remove('show');
  page3.classList.remove('show');

}


/* GETting data (HTML) by Promise method
pageOneBtn.addEventListener('click', function(){
 
  hideAllPages();

  axios.get('page-one.html').then(function(response){
    page1.innerHTML = response.data;
    page1.classList.add('show');
    page1.classList.remove('hidden');
  })

})
*/
// GETting data (html) by async-await method
pageOneBtn.addEventListener('click', async function(){
  hideAllPages();
  let response = await axios.get('page-one.html');
  console.log(response)
  console.log(response.data)
  page1.innerHTML = response.data; // this won't run until response is something
  // but the other javascript code that is not in the async function can still run
  // page1.appendChild(response.data) nope not a string literal
  page1.classList.add('show');
  page1.classList.remove('hidden');
})

/* GETting data (json) by Promise method
pageTwoBtn.addEventListener('click', function(){
  hideAllPages();
  let template =`<h1>Title</h1>
    <img src="#" class="responsive-img"/>
  `
  axios.get('data.json').then(function(response){
    console.log(response)
    console.log(response.data)
    for (let item of response.data) {
      console.log(item)
      let itemElement = document.createElement('div');
      itemElement.innerHTML=template;
      itemElement.querySelector('h1').innerText = item.title;
      itemElement.querySelector('img').setAttribute('src', item.photo);
      page2.appendChild(itemElement);
    }
    page2.classList.add('show');
    page2.classList.remove('hidden');
  })
}) */

// GETting data (json) by async-await method
pageTwoBtn.addEventListener('click', async function(){
  hideAllPages();
  // string literal
  let template = `
  <h1></h1>
  <img src="" class="responsive-img"/>`;

  let response = await axios.get('data.json');
  console.log(response)
  let contentDiv = document.querySelector('#content');
  contentDiv.innerHTML = "";
  // loop : to go through each of the artworks
  for (let d of response.data) {
    
    // create a new <div> element for the data
    let entryElement = document.createElement('div');

    // set its children to be whatever html is in the template variable
    entryElement.innerHTML = template;

    // fill in the placeholders
    entryElement.querySelector('h1').innerText = d.title;
    entryElement.querySelector('img').setAttribute('src', d.photo);

    // append to the <div> inside the page
    contentDiv.appendChild(entryElement);

  }

  page2.classList.add('show');
  page2.classList.remove('hidden');
})

pageThreeBtn.addEventListener('click', async function(){
  hideAllPages();
  let template = `<blockquote></blockquote>
    <p></p>
  `;
  // Call API, returns a JSON object
  let response = await axios.get('https://programming-quotes-api.herokuapp.com/quotes/random');
  console.log(response.data);

  page3.innerHTML = template;
  page3.querySelector('blockquote').innerText = response.data.en;
  page3.querySelector('p').innerText = response.data.author;

  page3.classList.add('show');
  page3.classList.remove('hidden');
})