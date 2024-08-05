try {
    let a;
    console.log(a.length); // This will throw an error because 'a' is undefined
    console.log("hi there from inside"); // This line will not execute
} catch (e) {
    console.log("inside catch statement"); // This will execute because of the error above
    console.log("hi there");
}
