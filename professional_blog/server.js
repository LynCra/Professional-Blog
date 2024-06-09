const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 8080;

let posts = [];

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/posts', (req, res) => {
    res.json(posts);
});

app.post('/api/posts', (req, res) => {
    const { title, content } = req.body;
    const newPost = { id: uuidv4(), title, content };
    posts.push(newPost);
    res.status(201).json(newPost);
});

app.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    posts = posts.filter(post => post.id !== id);
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
