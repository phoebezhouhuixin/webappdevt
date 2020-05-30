async function connect(dbname, version){
    if (!indexedDB in window){
        console.log("IndexedDB not supported"); 
        // cannot use idb.js, thus abort connect()
        return false;
    };
    let db = await idb.open(dbname, version, function(db){
        console.log(db.oldVersion); // 0 on first load
        if (db.oldVersion<=0){ // This is the first time we are opening the database
            // i.e. we a creating a database with idb.open(),
            // so we need to create a new object store within the new database
            console.log("Creating object store");
            db.createObjectStore("entries", {
                keyPath: "id",
                autoIncrement:true
            });
        } // end if
    }); // end await idb.open()
    console.log("Database opened successfully");
    return db;
} // end connect()
async function addEntry(db, speciesname, location, speciesimg, comment){

    // create transaction and specify the object store used in this transaction on "db"
    let tx = db.transaction("entries", "readwrite");  // IDBDatabase.transaction(storeNames, mode);

    // retrieve the object store
    let store = tx.objectStore("entries"); 
    
    await store.add({
        "submissionName": speciesname,
        "submissionLocation": location,
        "submissionImg": speciesimg,
        "submissionComment": comment
    });
    await tx;
}
async function deleteEntry(db, idToDelete){
    let tx = db.transaction("entries", "readwrite");
    let store = tx.objectStore("entries");
    await store.delete(idToDelete);
    await tx;
}
async function updateEntry(db, newEntry){
    let tx = db.transaction("entries", "readwrite");
    let store = tx.objectStore("entries");
    await store.put(newEntry);
    await tx;
}
async function getAllEntries(db){
    let tx = db.transaction("entries", "readonly");
    let store = tx.objectStore("entries");
    return await store.getAll();
}