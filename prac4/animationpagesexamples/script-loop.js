let pageButtons = document.querySelectorAll('.change-page-btn');
let pages = document.querySelectorAll('.page');
console.log(pages['0']);

for (let b of pageButtons) {
    b.addEventListener('click', function(){
        hideAllPages(); /* it works even though hideAllPages() is defined only later */
        let pageNum = b.getAttribute('data-pagenum'); /* data-pagenum = '0' for page one */
        pages[pageNum].classList.add('show'); /* somehow pages['0'] just works like pages[0] */
        pages[pageNum].classList.remove('hidden');
  })
}

function hideAllPages() {
    for (let p of pages) {
        p.classList.add('hidden');
        p.classList.remove('show');
    }
}

pageButtons[0].addEventListener('click', function(){
    console.log("extra stuff");
})
