const fs= require('fs');
const db= require('./handleNote');
const {v4 : uuidv4} = require('uuid');
const path= require('path');
const express= require('express');
const app= express();
const notes= require('./db/db.json');
const { json } = require('express');
const port= process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/notes', (req, res)=> {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req,res)=> {
    db.getNotes()
    .then(data=>{res.json(data)});
});

app.post('/api/notes', (req,res)=> {
    db.addNote(req.body)
    .then((data)=>{res.json(data)})
});


app.get('*', (req,res)=> {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(port,()=> {
    console.log(`App listening on PORT ${port}`);
});