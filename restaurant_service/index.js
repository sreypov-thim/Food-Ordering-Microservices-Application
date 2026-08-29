const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

// Task 5.1 APIs
app.get('/viewallrestaurant', (req, res) => {
    res.json({ message: "View all restaurants called successfully" });
});

app.get('/searchrestaurant', (req, res) => {
    res.json({ message: "Search restaurant called successfully" });
});

app.listen(PORT, () => console.log(`Restaurant Service running on port ${PORT}`));