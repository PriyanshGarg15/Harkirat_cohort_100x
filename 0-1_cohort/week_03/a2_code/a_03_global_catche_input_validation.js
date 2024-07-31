const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.post('/data', (req, res) => {
    // Access the parsed JSON data from the request body
    const data = req.body;
    console.log(data);
    console.log("hi")
    res.send('Data received');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
