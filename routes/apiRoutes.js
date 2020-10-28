const fs = require("fs");
const uuid = require("uuid");



module.exports = app => {

    app.get("/api/notes", function (req, res) {
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            let notes = JSON.parse(data);
            return res.json(notes);
        });
    })

    app.post("/api/notes", function (req, res) {
        const newNote = req.body;
        newNote.id = uuid.v1();
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            let notes = JSON.parse(data);
            notes.push(newNote);

            fs.writeFile("./db/db.json", JSON.stringify(notes), err => {
                if (err) throw err;
                res.json(newNote)
            });
        })
    })

    app.delete("/api/notes/:id", function (req, res) {
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            let notes = JSON.parse(data);
            notes = notes.filter(notes => notes.id !== req.params.id)

            fs.writeFile("./db/db.json", JSON.stringify(notes), err => {
                if (err) throw err;
                fs.readFile("./db/db.json", "utf8", (err, data))
            });
        })
    });
};
