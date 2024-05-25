const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.get('/api/data', async (req, res) => {
    try {
        const response = await axios.get('https://api.jikan.moe/v4/random/anime');
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://api.jikan.moe/v4/random/anime');
        res.render('index', { data: response.data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching posts.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
