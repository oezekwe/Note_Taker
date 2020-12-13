const fs= require('fs');
const {v4 : uuidv4} = require('uuid')
const path= require('path');
const express= require('express');
const app= express();
const notes= require('./db/db.json');
const { json } = require('express');
const port= 3001;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/notes', (req, res)=> {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req,res)=> {
    res.send(notes);
});

app.post('/api/notes', (req,res)=> {
    req.body.id= uuidv4();
    const note= {title: req.body.title, text: req.body.text, id: req.body.id};
    fs.readFile('./db/db.json', (err, Dtext)=>{
        if(err) throw err;
        let collectionNotes= JSON.parse(Dtext);
        collectionNotes.push(note);
        fs.writeFile('./db/db.json', JSON.stringify(collectionNotes,null,2), err=>{
            if(err) throw err;
            res.send(notes);
        });
    });
});


app.get('*', (req,res)=> {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(port,()=> {
    console.log(`App listening on PORT ${port}`);
});