const express       = require("express");
const app           = express();
const cors          = require("cors");
const PORT          = process.env.PORT || 3001;
const dotenv        = require("dotenv");
dotenv.config();

const errorHandler  = require("./handlers/error");
const authRoutes    = require("./routes/auth");
const summaryRoutes     = require("./routes/summaries");
const userSummaryRoutes = require("./routes/user-summaries");
const youtubeChannelRoutes = require("./routes/youtube-channels.js")

const { ensureLogin, ensureLoginAndCorrectUser } = require("./middleware/auth");

app.use(express.json());
app.use(cors());

app.get("/", (req, res, next) => {
    res.send("HI")
})

// Auth routes
app.use("/api/auth", authRoutes);

// Summary routes
app.use(
    "/api/summaries",
    ensureLogin,
    summaryRoutes
)

app.use(
    "/api/users/:user_id/summaries", 
    ensureLoginAndCorrectUser, 
    userSummaryRoutes
);

// Source routes
//  Youtube Channel routes
app.use(
    "/api/users/:user_id/sources/youtube-channels",
    ensureLoginAndCorrectUser,
    youtubeChannelRoutes  
);

// If no routes are good
app.use((req, res, next) => {
    return next({
        status: 404,
        message: "Not found."
    })
})

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})