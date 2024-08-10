import React, { useEffect, useRef, useState } from "react";
import "./Book.css";
import FileUpload from "../FileUpload";
import Button from "../Button/Button";

const Book = () => {
  const [currentState, setCurrentState] = useState(1);
  const bookRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const paper1Ref = useRef(null);
  const paper2Ref = useRef(null);
  const paper3Ref = useRef(null);

  const numOfPapers = 3;
  const maxState = numOfPapers + 1;

  const openBook = () => {
    if (bookRef.current && prevBtnRef.current && nextBtnRef.current) {
      bookRef.current.style.transform = "translateX(50%)";
      prevBtnRef.current.style.transform = "translateX(-180px)";
      nextBtnRef.current.style.transform = "translateX(180px)";
    }
  };

  const closeBook = (isFirstPage) => {
    if (bookRef.current && prevBtnRef.current && nextBtnRef.current) {
      bookRef.current.style.transform = isFirstPage
        ? "translateX(0%)"
        : "translateX(100%)";
      prevBtnRef.current.style.transform = "translateX(0px)";
      nextBtnRef.current.style.transform = "translateX(0px)";
    }
  };

  const goNext = () => {
    if (currentState < maxState) {
      switch (currentState) {
        case 1:
          openBook();
          if (paper1Ref.current) {
            paper1Ref.current.classList.add("flipped");
            paper1Ref.current.style.zIndex = 1;
          }
          break;
        case 2:
          if (paper2Ref.current) {
            paper2Ref.current.classList.add("flipped");
            paper2Ref.current.style.zIndex = 2;
          }
          break;
        case 3:
          closeBook(false);
          if (paper3Ref.current) {
            paper3Ref.current.classList.add("flipped");
            paper3Ref.current.style.zIndex = 3;
          }
          break;
        default:
          throw new Error("unknown state");
      }

      setCurrentState((prevState) => prevState + 1);
    }
  };

  const goPrevious = () => {
    if (currentState > 1) {
      switch (currentState) {
        case 2:
          closeBook(true);
          if (paper1Ref.current) {
            paper1Ref.current.classList.remove("flipped");
            paper1Ref.current.style.zIndex = 3;
          }
          break;
        case 3:
          if (paper2Ref.current) {
            paper2Ref.current.classList.remove("flipped");
            paper2Ref.current.style.zIndex = 2;
          }
          break;
        case 4:
          openBook();
          if (paper3Ref.current) {
            paper3Ref.current.classList.remove("flipped");
            paper3Ref.current.style.zIndex = 1;
          }
          break;
        default:
          break;
      }

      setCurrentState((prevState) => prevState - 1);
    }
  };

  return (
    <div className="book-container">
      <button id="prev-btn" className="p-12" ref={prevBtnRef} onClick={goPrevious}>
        <i className="fas fa-arrow-circle-left"></i>
      </button>

      <div id="book" className="book" ref={bookRef}>
        <div id="p1" className="paper" ref={paper1Ref}>
          <div className="front">
            <div id="f1" className="front-content">
              <h3>Filp Page to add books</h3>
            </div>
          </div>
          <div className="back">
            <div id="b1" className="back-content">
              <h2>Tell us about your book!</h2>
              <div className="content">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name-input"
                      >
                        Name
                      </label>
                      <input
                        className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-500 hover:shadow-lg hover:border-blue-300 bg-gray-50"
                        placeholder="Enter book's name"
                        type="text"
                        id="name-input"
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
                        className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-500 hover:shadow-lg hover:border-blue-300 bg-gray-50"
                        placeholder="Enter author's name"
                        type="text"
                        id="author-input"
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
                      className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-500 hover:shadow-lg hover:border-blue-300 bg-gray-50"
                      placeholder="Enter description"
                      type="text"
                      id="description-input"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="genre-input"
                    >
                      Genre
                    </label>
                    <input
                      className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-500 hover:shadow-lg hover:border-blue-300 bg-gray-50"
                      placeholder="Enter genre"
                      type="text"
                      id="genre-input"
                    />
                  </div>
                </div>

                <p className="text-center text-gray-600 mt-4">
                  Want to share more books? Feel free to upload as many as you
                  like!
                </p>
                <Button />
              </div>
            </div>
          </div>
        </div>

        <div id="p2" className="paper" ref={paper2Ref}>
          <div className="front">
            <div id="f2" className="front-content">
            <div className="flex space-x-4 justify-center">
          <FileUpload fileType="coverpage" />
          <FileUpload fileType="book" />
        </div>
              <h2>Upload files here</h2>
            </div>
          </div>
          <div className="back">
            <div id="b2" className="back-content">
              <h1>An Awesome Page</h1>
            </div>
          </div>
        </div>

        <div id="p3" className="paper" ref={paper3Ref}>
          <div className="front">
            <div id="f3" className="front-content">
              <h1>An Amazing Page</h1>
            </div>
          </div>
          <div id="b3" className="back-content">
            <h1>The Good Bye</h1>
          </div>
        </div>
      </div>

      <button id="next-btn" className="p-12" ref={nextBtnRef} onClick={goNext}>
        <i className="fas fa-arrow-circle-right"></i>
      </button>
    </div>
  );
};

export default Book;
