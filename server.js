const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🍞 Wheat Bunny bakery website is running!`);
    console.log(`📍 Open your browser and visit: http://localhost:${PORT}`);
    console.log(`⏹️  Press Ctrl+C to stop the server`);
});