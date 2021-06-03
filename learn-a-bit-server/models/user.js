const mongoose = require("mongoose"),
    { Schema } = mongoose,
    bcrypt = require("bcrypt"),
    SALT_WORK_FACTOR = 10;

let userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    followers: {
        type: Array,
        default: new Array(),
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    summaries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Summary"
    }],
    youtubeChannels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "YoutubeChannel"
    }]
})

userSchema.pre("save", async function (next) {
    // only hash the password if it has been modified (or new)
    if (!this.isModified("password")) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
})

userSchema.methods.comparePassword = async function (candidatePassword, next) {
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        return next(err);
    }
}

let User = mongoose.model("User", userSchema);

module.exports = User;