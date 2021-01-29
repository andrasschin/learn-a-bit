const express       = require("express");
const app           = express();
const bodyParser    = require("body-parser");
const cors          = require("cors");
const PORT          = process.env.PORT || 3001;
const dotenv        = require("dotenv");
dotenv.config();

const errorHandler  = require("./handlers/error");
const authRoutes    = require("./routes/auth");

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res, next) => {
    res.send("HI")
})

app.use(authRoutes);

// If no routes are good
app.use((req, res, next) => {
    let err = new Error(404);
    err.message = "Not found."
    next(err)
})

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})