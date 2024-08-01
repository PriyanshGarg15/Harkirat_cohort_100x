const express = require("express");

const app = express();

app.use(express.json());

app.post("/health-checkup", function (req, res) {
    // kidneys = [1, 2]
    const kidneys = req.body.kidneys;
    const kidneyLength = kidneys.length;
    res.send("You have " + kidneyLength + " kidneys");
});

// Global error handler
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).json({
        msg: "Sorry, something is up with our server"
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
}); 
