const mongoose = require("mongoose");
const { Schema } = mongoose;

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