async function connect(dbname, version){
    if (!indexedDB in window){
        console.log("IndexedDB not supported"); 
        // cannot use idb.js, thus abort connect()
        return false;
    };
    let db = await idb.open(dbname, version, function(db){
        console.log(db.oldVersion);
        if (oldVersion<=1){ // This is the first time we are opening the database
            // i.e. we a creating a database with idb.open(),
            // so we need to create a new object store within the new database
            console.log("Creating object store");
            db.createObjectStore("entries'", {
                keyPath: "id",
                autoIncrement:true
            });
        } // end if
    }); // end await idb.open()
    console.log("Database opened successfully");
    return db;
} // end connect()
async function addEntry(db, speciesname, location, speciesimg, comment){
    let tx = db.transaction("entries", "readwrite"); // transaction on this database

}