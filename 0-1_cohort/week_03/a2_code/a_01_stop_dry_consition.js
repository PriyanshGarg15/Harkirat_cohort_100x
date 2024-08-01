function usernameValidator(username, password) {
    return username === 'harkirat' && password === 'pass';
}

function kidneyValidator(kidneyId) {
    return kidneyId === 1 || kidneyId === 2;
}

const express = require('express');
const app = express();

app.get("/health-checkup", function (req, res) {
    const username = req.headers.username;
    const password = req.headers.password;
    const kidneyId = parseInt(req.query.kidneyId);

    if (!usernameValidator(username, password)) {
        res.status(403).json({
            msg: "User doesn't exist"
        });
        return;
    }

    if (!kidneyValidator(kidneyId)) {
        res.status(411).json({
            msg: "wrong inputs"
        });
        return;
    }

    // do something with kidney here
    res.send("Your heart is healthy");
});

app.put("/replace-kidney", function (req, res) {
    const username = req.headers.username;
    const password = req.headers.password; 
    const kidneyId = parseInt(req.query.kidneyId);

    if (!usernameValidator(username, password)) {
        res.status(403).json({
            msg: "User doesn't exist"
        });
        return;
    }

    if (!kidneyValidator(kidneyId)) {
        res.status(411).json({
            msg: "wrong inputs"
        });
        return;
    }

    // do kidney replacement logic here
    res.send("Your kidney has been replaced");
});


app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
