const fs= require('fs');
const path= require('path');
const express= require('express');
const app= express();
const notes= require('./db/db');
const port= 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/notes', (req, res)=> {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req,res)=> {
    res.json(notes);
});

app.post('/api/notes', (req,res)=> {

});


app.get('*', (req,res)=> {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(port,()=> {
    console.log(`App listening on PORT ${port}`);
});