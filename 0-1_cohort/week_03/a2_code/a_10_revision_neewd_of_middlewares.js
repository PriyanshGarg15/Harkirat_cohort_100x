// // WITHOUT USING MIDDLE WARE

// const express = require("express");

// const app = express();

// // Function that returns a boolean if the age of the person is more than or equal to 14
// function isOldEnough(age) {
//   // Convert age to a number to handle numeric comparison
//   age = parseInt(age, 10);
//   if (age >= 14) {
//     return true;
//   } else {
//     return false;
//   }
// }

// // Route to check eligibility for ride2
// app.get("/ride2", function (req, res) {
//   const age = req.query.age;

//   if (isOldEnough(age)) {
//     res.json({
//       msg: "You have successfully ridden ride 2",
//     });
//   } else {
//     res.status(411).json({
//       msg: "Sorry, you are not of age yet",
//     });
//   }
// });

// // Route to check eligibility for ride1
// app.get("/ride1", function (req, res) {
//   const age = req.query.age;

//   if (isOldEnough(age)) {
//     res.json({
//       msg: "You have successfully ridden ride 1",
//     });
//   } else {
//     res.status(411).json({
//       msg: "Sorry, you are not of age yet",
//     });
//   }
// });

// // Start the Express server
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });





// USING MIDDLEWARE
// Uisng middleware it says ap apne kam ki cheej karo bak meh sambha luga !

const express = require("express");

const app = express();

// Middleware function to check if the user is old enough
function isOldEnoughMiddleware(req, res, next) {
  const age = parseInt(req.query.age, 10); // Convert age to a number
  if (age >= 14) {
    next(); // Age is sufficient, proceed to the next middleware/route handler
  } else {
    res.status(411).json({
      msg: "Sorry, you are not of age yet",
    });
  }
}

// Apply the middleware to specific routes
app.use('/ride1', isOldEnoughMiddleware);
app.use('/ride2', isOldEnoughMiddleware);

// Route for ride2
app.get("/ride2", function (req, res) {
  res.json({
    msg: "You have successfully ridden ride 2",
  });
});

// Route for ride1
app.get("/ride1", function (req, res) {
  res.json({
    msg: "You have successfully ridden ride 1",
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
