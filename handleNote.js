const util = require('util');
const {v4 : uuidv4} = require('uuid'); // This package will be used to generate our unique ids.
const fs = require('fs');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
class Store {
    read(){
        return readFileAsync('db/db.json', 'utf8');
    }

    write(note){
        return writeFileAsync('db/db.json', JSON.stringify(note,null,2));
    } 
     
    getNotes(){
        return this.read().then((notes) => {
            var parsedNotes;
            try {
                parsedNotes= [].concat(JSON.parse(notes));
            } 
            catch (err){
                parsedNotes= [];
            }
            return parsedNotes;
        });
    }  
    addNote(note){
        const { title, text } = note;
        if (!title || !text) {
            throw new Error("Note 'title' and 'text' cannot be blank");
        }
        const newNote = { title, text, id: uuidv4()};
        return this.getNotes()
        .then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote);
    }
}

module.exports = new Store();