const express       = require("express");
const app           = express();
const bodyParser    = require("body-parser");
const cors          = require("cors");
const PORT          = process.env.PORT || 3001;

const errorHandler  = require("./handlers/error");

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res, next) => {
    res.send("HI")
})



// If no routes are good
app.use((req, res, next) => {
    let err = new Error(404);
    err.message = "Not found."
    next(err)
})

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})