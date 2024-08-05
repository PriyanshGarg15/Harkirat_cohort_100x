
// ## JWTs
//  - Write a function that takes in a username and password and returns a JWT token with the username encoded. Should return null if the username is not a valid email or if the password is less than 6 characters. Try using the zod library here
//  - Write a function that takes a jwt as input and returns true if the jwt can be DECODED (not verified). Return false otherwise
//  - Write a function that takes a jwt as input and returns true if the jwt can be VERIFIED. Return false otherewise
//  - To test, go to the 02-jwt folder and run `npx jest ./tests`

const jwt = require('jsonwebtoken');
const jwtPassword = "secret";
const zod = require("zod");

// Define the email and password schemas using Zod
const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

function signJwt(username, password) {
    // Validate username using the email schema
    const usernameResponse = emailSchema.safeParse(username);
    // Validate password using the password schema
    const passwordResponse = passwordSchema.safeParse(password);

    // Check if validation was successful
    if (!usernameResponse.success || !passwordResponse.success) {
        return null; // Return null if validation fails
    }

    // Sign the JWT with the username and a secret password
    const signature = jwt.sign(
        {
            username
        },
        jwtPassword
    );

    return signature; // Return the JWT signature
}

// Call the signJwt function with a valid email and password
const ans = signJwt("harkadsdas@gmail.com", "asddasadsdasdsaads");
console.log(ans);
