let color = "yellow"
let button = document.getElementById("reskin-btn");
button.addEventListener("click", function() { // when button is clicked, do the function
    let intro = document.getElementById("intro");
    intro.style.backgroundColor = color;
    if (color == "yellow") {
        color = "white";
    } else if (color == "white"){
        color = "yellow";
    }

    let tasks = document.getElementsByClassName("urgent");
    tasks[0].style.color = "red";
    tasks[1].style.color = "red";
})    