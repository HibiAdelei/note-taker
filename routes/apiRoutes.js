// dependencies
const fs = require("fs");

// import npm package for unique id
const { v4: uuidv4 } = require('uuid');

// routes
module.exports = function (app) {

    // api get
    app.get("/api/notes", (request, response) => {
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        response.json(data);
    });


    // api post
    app.post("/api/notes", (request, response) => {
        const newNote = request.body;
        newNote.id = uuidv4();
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        data.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(data));
        response.json(data);
    });


    // api delete
    app.delete("/api/notes/:id", (request, response) => {
        let noteId = request.params.id.toString();
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        const newData = data.filter( note => note.id.toString() !== noteId );
        fs.writeFileSync('./db/db.json', JSON.stringify(newData));
        response.json(newData);
    });
};