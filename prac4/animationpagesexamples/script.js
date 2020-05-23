
let pageOneBtn = document.querySelector('#page1-btn');
let pageTwoBtn = document.querySelector("#page2-btn");
let pageThreeBtn = document.querySelector("#page3-btn");
// eqv. pageOneBtn = document.getElementById("page1-btn")

let page1 = document.querySelector("#page-one");
let page2 = document.querySelector("#page-two");
let page3 = document.querySelector("#page-three"); /* <a href = "#"...> still works with
the pageThreeBtn.addEventListener("click", function(){...}) */

function hideAllPages() {

  page1.classList.add('hidden');
  page2.classList.add('hidden');
  page3.classList.add('hidden')

  page1.classList.remove('show');
  page2.classList.remove('show');
  page3.classList.remove('show');

}


pageOneBtn.addEventListener('click', function(){
 
  hideAllPages();

  page1.classList.add('show');
  page1.classList.remove('hidden');
})

pageTwoBtn.addEventListener('click', function(){

  hideAllPages();

  page2.classList.add('show');
  page2.classList.remove('hidden');
})

pageThreeBtn.addEventListener('click', function(){

  hideAllPages();

  page3.classList.add('show');
  page3.classList.remove('hidden');
})