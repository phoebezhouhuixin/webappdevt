const VERSION = 1
async function onloadHomepage() {

    let db = await connect("my-submissions", VERSION);
    // console.log(db.oldVersion); // undefined?
    displayMyEntries(db); // can say this here although we only define the function later
    // because the "function" keyword is 

    let submitbutton = document.getElementById("submit-btn");
    submitbutton.addEventListener("click", async function () {
        let speciesname = document.querySelector("#speciesname").value;
        let location = document.querySelector("#location").value;
        let speciesimg = document.querySelector("#speciesimg").value; // TODO: HOW TO STORE IMG IN IDB?
        let comment = document.querySelector("#comment").value;

        let response = await addEntry(db, speciesname, location, speciesimg, comment, false);
        console.log(response.data);

        displayMyEntries(db);
    })
};
async function displayMyEntries(db) {
    let template = `<div class = "row justify-content-center mb-5">
                    <div class = "col-md-7 text-center">
                        <p>Species name: <span id="submissionName"></span></p>
                        <p>Location of sighting: <span id = "submissionLocation"></span></p>
                        <p>Image: <img id = "submissionImg"></img></p>
                        <p>Additional info: <span id = "submissionComment"></span></p>
                        <button class = "update-btn">Update</button> <!-- not button id -->
                        <button class = "delete-btn">Delete</button>
                    </div>
                    </div>`;
    let contentDiv = document.getElementById("mySubmissions");
    // clear everything from the contentDiv first
    contentDiv.innerHTML = "";

    let entries = await getAllEntries(db);
    for (let e of entries) { // NOT var e , otherwise e will keep being the most recent thing only
        // and thus the delete (and update) button might not delete the e of the time point at which that button itself was created,
        // but instead only delete the most recent e
        let entryElement = document.createElement("div");
        entryElement.innerHTML = template;
        entryElement.querySelector("#submissionName").innerText = e.submissionName;
        entryElement.querySelector("#submissionLocation").innerText = e.submissionLocation;
        entryElement.querySelector("#submissionImg").src = e.submissionImg;
        entryElement.querySelector("#submissionComment").innerText = e.submissionComment;
        console.log(entryElement);
        entryElement.querySelector(".update-btn").addEventListener("click", async function () {
            let newName = prompt("Updated species name:");
            let newLocation = prompt("Updated sighting location:");
            let newComment = prompt("Updated details:");
            e.submissionName = newName;
            e.submissionLocation = newLocation;
            e.submissionComment = newComment;
            await updateEntry(db, e);
            displayMyEntries(db);
        });
        entryElement.querySelector(".delete-btn").addEventListener("click", async function () {
            await deleteEntry(db, e.id);
            displayMyEntries(db);
        });
        contentDiv.appendChild(entryElement);
    }
}
onloadHomepage();