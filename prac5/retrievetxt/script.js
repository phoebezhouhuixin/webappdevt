let button = document.getElementById("load-btn")
// alternatively, let button = document querySelector("#load-btn") --> same result
button.addEventListener("click", function(){
    console.log("button clicked");
    // alert("click detected");
    axios.get("data.txt").then(function(response) { /* retrieve data somewhere from the server
        then() returns a Promise (a Promise is asynchronous javascript. 
            JS will go on to do other stuff even if this line hasn't returned
            This means that "hello" is logged before the promise response) */
        console.log(response);
        let contentElement = document.getElementById("content");
        contentElement.innerHTML = response.data;
    })
    console.log("hello");
})

// To not make hello appear first, 
let b2 = document.getElementById("load-btn2")
b2.addEventListener("click", async function(){
    let response = await axios.get("data.txt"); 
    /*The await expression causes async function execution to pause 
    until a Promise is settled (that is, fulfilled or rejected), 
    and to resume execution of the async function after fulfillment */
    console.log(response.data);

    /*await blocks the code execution within the async function, of which it(await statement) is a part.*/
    console.log("hello2") // therefore this done not print first, but only prints AFTER the data. 
    // But things that are not in this async function() can still run even if the data is not returned yet
})
//console.log("hello3")