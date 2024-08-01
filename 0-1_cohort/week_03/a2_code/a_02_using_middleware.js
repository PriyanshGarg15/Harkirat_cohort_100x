const express = require('express');
const app = express();

function userMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    if (username !== "harkirat" || password !== "pass") {
        res.status(403).json({
            msg: "Incorrect inputs"
        });
    } else {
        next();
    }
}

function kidneyMiddleware(req, res, next) {
    const kidneyId = parseInt(req.query.kidneyId);

    if (kidneyId !== 1 && kidneyId !== 2) {
        res.status(403).json({
            msg: "Incorrect inputs"
        });
    } else {
        next();
    }
}

app.get("/health-checkup", userMiddleware, kidneyMiddleware, function (req, res) {
    // do something with kidney here
    res.send("Your heart is healthy");
});

app.get("/kidney-check", userMiddleware, kidneyMiddleware, function (req, res) {
    // do something with kidney here
    res.send("Your heart is healthy");
});

app.get("/heart-check", userMiddleware, function (req, res) {
    // do something with user here
    res.send("Your heart is healthy");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
