const express = require("express");
const zod = require("zod");
const app = express();

const schema = zod.array(zod.number());

app.use(express.json());

app.post("/health-checkup", function (req, res) {
    // kidneys = [1, 2]
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys);

    if (!response.success) {
        res.status(411).json({
            msg: "input is invalid"
        });
    } else {
        res.json({
            msg: `You have ${kidneys.length} kidneys`,
            data: kidneys
        });
    }
});

// Global error handler
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        msg: "Sorry, something is up with our server"
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
