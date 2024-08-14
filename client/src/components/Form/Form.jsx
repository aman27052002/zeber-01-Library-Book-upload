import React, { useState, useEffect } from "react";
import FileUpload from "../FileUpload";
import Button from "../Button/Button";
import axios from "axios";
import { X } from 'lucide-react';
import EmailTrackingForm from '../EmailTrackingForm'
export default function Form({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    description: "",
    genre: "",
    bookImage: null,
    bookPDF: null,
  });
  
  const [resetTrigger, setResetTrigger] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (file, type) => {
    setFormData({
      ...formData,
      [type]: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResetTrigger((prev) => !prev);  // Trigger the reset

    const data = new FormData();
    data.append("name", formData.name);
    data.append("author", formData.author);
    data.append("description", formData.description);
    data.append("genre", formData.genre);
    data.append("bookImage", formData.bookImage);
    data.append("bookPDF", formData.bookPDF);

    axios
      .post("http://localhost:3000/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data.message || "Book uploaded successfully!");
        setIsSubmitted(true);  // Set the form as submitted
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        alert("Error uploading book");
      });
  };

  useEffect(() => {
    if (resetTrigger) {
      setFormData({
        name: "",
        author: "",
        description: "",
        genre: "",
        bookImage: null,
        bookPDF: null,
      });

      setResetTrigger(false);  // Reset the trigger
    }
  }, [resetTrigger]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="mt-10 flex flex-col gap-5 ">
        <button 
          onClick={onClose}
          className="place-self-end text-white"
        >
          <X size={30}/>
        </button>
        
        {isSubmitted ? (
          <div className="p-8 rounded-3xl shadow-lg w-full max-w-lg mx-auto space-y-6 border border-gray-200 bg-gray-50">
            <h2 className="text-2xl font-semibold text-center text-gray-800">
              Book Under Review
            </h2>
            <p className="text-center text-lg text-gray-700 mt-4">
              Thank you for your submission. Your book is currently under review.
            </p>
            <EmailTrackingForm/>
          </div>
        ) : (
          <form
            className="p-8 rounded-3xl shadow-lg w-full max-w-lg mx-auto space-y-6 border border-gray-200 bg-gray-50"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-semibold text-center text-gray-800">
              Upload Your Books
            </h2>

            <div className="flex space-x-4 justify-center">
              <FileUpload
                fileType="cover Image"
                file={formData.bookImage}
                onFileChange={(file) => handleFileChange(file, "bookImage")}
              />
              <FileUpload
                fileType="book PDF"
                file={formData.bookPDF}
                onFileChange={(file) => handleFileChange(file, "bookPDF")}
              />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name-input"
                  >
                    Name of the book
                  </label>
                  <input
                    className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition-transform duration-300 ease-in-out focus:outline-blue-500 hover:shadow-xl bg-gray-50"
                    placeholder="Enter book's name"
                    type="text"
                    id="name-input"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="author-input"
                  >
                    Author
                  </label>
                  <input
                    className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition-transform duration-300 ease-in-out focus:outline-blue-500 hover:shadow-xl bg-gray-50"
                    placeholder="Enter author's name"
                    type="text"
                    id="author-input"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description-input"
                >
                  Description
                </label>
                <input
                  className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition-transform duration-300 ease-in-out focus:outline-blue-500 hover:shadow-xl bg-gray-50"
                  placeholder="Enter description"
                  type="text"
                  id="description-input"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="genre-select"
                >
                  Genre
                </label>
                <select
                  className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition-transform duration-300 ease-in-out focus:outline-blue-500 hover:shadow-xl bg-gray-50"
                  id="genre-select"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select genre
                  </option>
                  <option value="fiction">Fiction</option>
                  <option value="non-fiction">Non-Fiction</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="science-fiction">Science Fiction</option>
                  <option value="biography">Biography</option>
                  <option value="mystery">Mystery</option>
                  <option value="thriller">Thriller</option>
                  <option value="romance">Romance</option>
                  <option value="horror">Horror</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <p className="text-center text-lg text-gray-700 mt-4">
              Want to share more books? Feel free to upload as many as you like!
            </p>
            <Button />
          </form>
        )}
      </div>
    </div>
  );
}
