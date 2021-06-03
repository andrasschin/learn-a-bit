const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * ! Book related code are not used anywhere, because books won't be implemented in v1.
 */

let bookSchema = new Schema({
    /** 
     * * This is likely to change, because the data will be coming from the Goodreads API.
     */
    author: String,
    title: String,
    isbn: String
})

let Book = mongoose.model("Book", bookSchema);

module.exports = Book;