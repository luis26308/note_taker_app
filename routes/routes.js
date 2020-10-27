const fs = require("fs");
const path = require("path");



module.exports = app => {


    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data)

        app.get("/api/notes", function (req, res) {
            res.json(notes); 
        });

        app.post("/api/notes", function (req, res) {
            notes.push(req.body);
            notesDb();            
        });

        app.get("/api/notes/:id", function (req, res) {
            const id = req.params.id
            res.json(notes[id]);
        });

        app.delete("/api/notes/:id", function (req, res) {
            notes.splice(req.params.id, 1);
            notesDb();
            console.log("Added new note: "+newNote.title);           
        });

        // HTML GET Requests
        // Below code handles when users "visit" a page.
        // In each of the below cases the user is shown an HTML page of content
        // ---------------------------------------------------------------------------

        app.get("/notes", function (req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        app.get("*", function (req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"))
        });

        // updates json file whenever notes are added or removed
        function notesDb() {
            fs.writeFile("./db/db.json", JSON.stringify(notes, "/t"), err => {
                if (err) throw err;
                return true;
            })
        }
    });
}
