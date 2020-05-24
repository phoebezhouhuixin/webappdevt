const menu = document.querySelector('#topbar-menu');
const menuToggles = document.querySelectorAll('.menuToggle');
menuToggles[0].addEventListener('click', (e) => {
    e.preventDefault();
    if (window.getComputedStyle(menu).display === 'none') {
        menu.style.display = 'block';
        menuToggles[0].style.display = 'none';
    };
});
menuToggles[1].addEventListener('click', (e) => {
    e.preventDefault();
    if (window.getComputedStyle(menu).display === 'block') {
        menu.style.display = 'none';
        menuToggles[0].style.display = 'block';
    }; 
});
function narrow_layout(x) {
    if (x.matches){
        if (window.getComputedStyle(menu).display === 'block') { 
            /* if we switch from wide screen to narrow screen, 
            (the switch can be detected by calling addListener(narrow_layout))
            by default the menu should be in "hidden" status */
            menu.style.display = 'none';
            menuToggles[0].style.display = 'block';
        }  
    }
    else {
        document.getElementById("topbar-menu").style.display = "inline-block";
        /* if we switch from narrow screen to wide screen, 
        (the switch can be detected by calling addListener(narrow_layout))
        we want the entire menu to appear as a row, 
        without having to press the "open menu" button */
    }
}
var narrow_screen = window.matchMedia("(max-width: 730px)")
narrow_screen.addListener(narrow_layout) // Attach listener function on state changes