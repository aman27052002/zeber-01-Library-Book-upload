const { Schema, model } = require('mongoose');

const fileSchema = new Schema({
    name: {
        type: String,
        required: [true, "Book name is required"],
        unique: true,
        trim: true,
        maxlength: [100, "Book name cannot exceed 100 characters"],
    },
    author: {
        type: String,
        required: [true, "Name of author is required"],
        maxlength: [100, "Author name cannot exceed 100 characters"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        maxlength: [500, "Description cannot exceed 500 characters"],
    },
    genre: {
        type: String,
        required: [true, "Genre is required"],
        trim: true,
    },
    imageFilePath: {
        type: String,
        required: [true, "File path is required"],
        trim: true,
    },
    pdfFilePath: {
        type: String,
        required: [true, "pdf File path is required"],
        trim: true,
    }
}, {
    timestamps: true, 
});

const filedata = model('File', fileSchema);

module.exports = filedata;
