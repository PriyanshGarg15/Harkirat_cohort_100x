const express = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = express.Router();

router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    // check if a user with this username already exists
    await Admin.create({
        username: username,
        password: password
    })

    res.json({
        message: 'Admin created successfully'
    })
    
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    // we should use zod for input validation
    const newCourse = await Course.create({
        title:title,
        description, //we can erite directly in case of same name
        imageLink,
        price
    })

    res.json({
        message: 'Course created successfully', courseId: newCourse._id
    })
});

//promise way:-

// router.post('/courses', adminMiddleware, (req, res) => {
//     // Implement course creation logic
//     const { title, description, imageLink, price } = req.body;

//     // Create a new course
//     Course.create({ title, description, imageLink, price })
//     .then((newCourse) => {
//         res.json({
//             message: 'Course created successfully',
//             courseId: newCourse._id
//         });
//     })
//     .catch((error) => {
//         res.status(500).json({
//             message: 'Error creating course',
//             error: error.message
//         });
//     });
// });


router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({});

    res.json({
        courses: response
    })

});


//with try catch block in async await itself:-

// router.get('/courses', adminMiddleware, async (req, res) => {
//     try {
//         // Fetch all courses
//         const courses = await Course.find({});

//         // Send response with fetched courses
//         res.json({
//             courses
//         });
//     } catch (error) {
//         // Handle any errors that occur during fetching
//         res.status(500).json({
//             message: 'Failed to fetch courses',
//             error: error.message
//         });
//     }
// });


module.exports = router;